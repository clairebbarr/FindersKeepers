"use client";

import { createElement, useState, useTransition, type FocusEvent } from "react";
import { useRouter } from "next/navigation";
import { useEditMode } from "./EditModeContext";
import { updateSiteContent } from "@/lib/site-content/actions";

export function EditableText({
  page,
  section,
  field,
  initialValue,
  as = "span",
  className = "",
}: {
  page: string;
  section: string;
  field: string;
  initialValue: string;
  as?: string;
  className?: string;
}) {
  const { isAdmin, editMode } = useEditMode();
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [justSaved, setJustSaved] = useState(false);
  const router = useRouter();

  if (!isAdmin || !editMode) {
    return createElement(as, { className }, value);
  }

  function handleBlur(e: FocusEvent<HTMLElement>) {
    const newValue = e.currentTarget.textContent ?? "";
    setValue(newValue);
    if (newValue !== initialValue) {
      startTransition(async () => {
        await updateSiteContent(page, section, field, newValue);
        // Force Next to drop its client-side Router Cache for this route —
        // otherwise navigating away and back can briefly show the old value.
        router.refresh();
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 1200);
      });
    }
  }

  const outline = justSaved ? "outline outline-2 outline-fk-mint" : "outline-dashed outline-2 outline-fk-rust/60";

  return createElement(
    as,
    {
      className: `${className} rounded-sm ${outline} outline-offset-4 ${isPending ? "opacity-50" : ""}`,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: handleBlur,
    },
    value
  );
}

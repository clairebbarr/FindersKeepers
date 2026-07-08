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
  const { isAdmin, editMode, styleMode } = useEditMode();
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [justSaved, setJustSaved] = useState(false);
  const router = useRouter();

  // Stable identity for this element — used both to apply saved colour
  // overrides (global CSS injected in the layout targets this attribute) and
  // as the key the colour editor writes to.
  const editKey = `${page}:${section}:${field}`;

  // Public / non-editing render: still tag it so saved colours show for everyone.
  if (!isAdmin || !editMode) {
    return createElement(as, { className, "data-fk-edit": editKey }, value);
  }

  // Colour-editing sub-mode: not text-editable; the global ElementStyleEditor
  // catches the click via the data-fk-edit attribute.
  if (styleMode) {
    return createElement(
      as,
      {
        className: `${className} cursor-pointer rounded-sm outline-dashed outline-2 outline-fk-dustyblue outline-offset-4`,
        "data-fk-edit": editKey,
      },
      value
    );
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
      "data-fk-edit": editKey,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: handleBlur,
    },
    value
  );
}

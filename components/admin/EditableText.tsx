"use client";

import { createElement, useState, useTransition, type FocusEvent } from "react";
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

  if (!isAdmin || !editMode) {
    return createElement(as, { className }, value);
  }

  function handleBlur(e: FocusEvent<HTMLElement>) {
    const newValue = e.currentTarget.textContent ?? "";
    setValue(newValue);
    if (newValue !== initialValue) {
      startTransition(() => {
        updateSiteContent(page, section, field, newValue);
      });
    }
  }

  return createElement(
    as,
    {
      className: `${className} rounded-sm outline-dashed outline-2 outline-fk-rust/60 outline-offset-4 ${
        isPending ? "opacity-50" : ""
      }`,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onBlur: handleBlur,
    },
    value
  );
}

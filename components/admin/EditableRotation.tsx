"use client";

import { useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEditMode } from "./EditModeContext";
import { updateSiteContent } from "@/lib/site-content/actions";

/**
 * Wraps a card so admins can nudge its tilt in place — the card never
 * changes position in the grid/flow, only its rotation angle. Saves are
 * debounced so mashing the nudge buttons doesn't fire a write per click.
 */
export function EditableRotation({
  page,
  section,
  field,
  initialDeg,
  children,
  className = "",
  editKey,
}: {
  page: string;
  section: string;
  field: string;
  initialDeg: number;
  children: ReactNode;
  className?: string;
  /** Optional data-fk-edit tag so this card is stylable in colour mode. */
  editKey?: string;
}) {
  const { isAdmin, editMode } = useEditMode();
  const [deg, setDeg] = useState(initialDeg);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const degRef = useRef(initialDeg);

  function nudge(delta: number) {
    setDeg((prev) => {
      const next = prev + delta;
      degRef.current = next;
      return next;
    });
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      startTransition(async () => {
        await updateSiteContent(page, section, field, String(degRef.current));
        router.refresh();
      });
    }, 500);
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ transform: `rotate(${deg}deg)` }}
      data-fk-edit={editKey}
    >
      {children}
      {isAdmin && editMode ? (
        <div className="absolute -bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border-2 border-fk-plum bg-fk-cream px-1.5 py-0.5 shadow-[2px_2px_0_0_var(--color-fk-plum)]">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nudge(-1);
            }}
            aria-label="Rotate left"
            className="flex h-5 w-5 items-center justify-center text-xs text-fk-plum"
          >
            ↺
          </button>
          <span className="font-body text-[10px] text-fk-ink/60">{deg}°</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              nudge(1);
            }}
            aria-label="Rotate right"
            className="flex h-5 w-5 items-center justify-center text-xs text-fk-plum"
          >
            ↻
          </button>
        </div>
      ) : null}
    </div>
  );
}

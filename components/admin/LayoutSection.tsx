"use client";

import { useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEditMode } from "./EditModeContext";
import { setLayoutOrder, setHiddenSections } from "@/lib/site-content/layout-actions";

/** Wraps one page section so admins can move it up/down or hide it in edit
 *  mode. For everyone else it's transparent (hidden sections render nothing). */
export function LayoutSection({
  pageKey,
  id,
  label,
  hidden,
  orderedIds,
  hiddenIds,
  children,
}: {
  pageKey: string;
  id: string;
  label: string;
  hidden: boolean;
  orderedIds: string[];
  hiddenIds: string[];
  children: ReactNode;
}) {
  const { isAdmin, editMode } = useEditMode();
  const [pending, start] = useTransition();
  const router = useRouter();

  // Public / not-editing: hidden sections vanish, visible ones render as-is.
  if (!isAdmin || !editMode) {
    if (hidden) return null;
    return <>{children}</>;
  }

  const idx = orderedIds.indexOf(id);

  function move(dir: -1 | 1) {
    const next = [...orderedIds];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    start(async () => {
      await setLayoutOrder(pageKey, next);
      router.refresh();
    });
  }

  function toggleHide() {
    const next = hidden ? hiddenIds.filter((h) => h !== id) : [...hiddenIds, id];
    start(async () => {
      await setHiddenSections(pageKey, next);
      router.refresh();
    });
  }

  return (
    <div className={`relative ${hidden ? "opacity-40" : ""} ${pending ? "pointer-events-none" : ""}`}>
      <div className="absolute left-1/2 top-2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border-2 border-fk-plum bg-fk-cream px-2 py-1 shadow-[2px_2px_0_0_var(--color-fk-plum)]">
        <span className="mr-1 font-body text-[11px] font-semibold uppercase tracking-wide text-fk-plum">
          {label}
          {hidden ? " · hidden" : ""}
        </span>
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={idx <= 0}
          aria-label="Move section up"
          className="flex h-6 w-6 items-center justify-center rounded-full text-fk-plum disabled:opacity-30"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={idx >= orderedIds.length - 1}
          aria-label="Move section down"
          className="flex h-6 w-6 items-center justify-center rounded-full text-fk-plum disabled:opacity-30"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={toggleHide}
          className="ml-1 rounded-full bg-fk-rust px-2 py-0.5 font-body text-[11px] font-semibold text-fk-cream"
        >
          {hidden ? "Show" : "Hide"}
        </button>
      </div>
      {children}
    </div>
  );
}

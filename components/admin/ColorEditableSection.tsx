"use client";

import { createElement, useState, useTransition, type ReactNode } from "react";
import { useEditMode } from "./EditModeContext";
import { updateGlobalColor, updateBlockColor } from "@/lib/site-content/color-actions";
import type { BrandColorTokenKey } from "@/lib/site-content/color-tokens";

/**
 * Wraps a section so its background colour is click-to-edit for admins, with
 * a choice of scope: override just this one block, or change the underlying
 * brand colour token everywhere it's used sitewide.
 */
export function ColorEditableSection({
  as = "section",
  className = "",
  tokenKey,
  page,
  section,
  field,
  effectiveHex,
  blockOverrideHex,
  children,
}: {
  as?: string;
  className?: string;
  tokenKey: BrandColorTokenKey;
  page: string;
  section: string;
  field: string;
  /** the colour currently rendering (token default, token override, or block override) */
  effectiveHex: string;
  /** this block's own override, if any — used to know whether to show it as active */
  blockOverrideHex: string | null;
  children: ReactNode;
}) {
  const { isAdmin, editMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(effectiveHex);
  const [isPending, startTransition] = useTransition();

  const style = blockOverrideHex ? { backgroundColor: blockOverrideHex } : undefined;

  if (!isAdmin || !editMode) {
    return createElement(as, { className, style }, children);
  }

  function applyBlock() {
    startTransition(async () => {
      await updateBlockColor(page, section, field, hex);
      setOpen(false);
    });
  }

  function applyGlobal() {
    startTransition(async () => {
      await updateGlobalColor(tokenKey, hex);
      setOpen(false);
    });
  }

  return createElement(
    as,
    { className: `relative ${className}`, style },
    <>
      {children}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Edit this block's colour"
        className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border-2 border-fk-cream bg-fk-ink/80 text-base shadow-[2px_2px_0_0_var(--color-fk-ink)]"
      >
        🎨
      </button>
      {open ? (
        <div className="absolute right-3 top-14 z-30 w-60 rounded-2xl border-2 border-fk-plum bg-fk-cream p-4 text-left shadow-[3px_3px_0_0_var(--color-fk-plum)]">
          <label className="font-body text-xs uppercase tracking-wide text-fk-ink/60">
            Pick a colour
          </label>
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="mt-1 h-10 w-full cursor-pointer rounded border border-fk-ink/20"
          />
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={applyBlock}
              className="rounded-full bg-fk-plum px-3 py-2 font-body text-xs font-semibold text-fk-cream disabled:opacity-50"
            >
              Just this block
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={applyGlobal}
              className="rounded-full bg-fk-rust px-3 py-2 font-body text-xs font-semibold text-fk-cream disabled:opacity-50"
            >
              Everywhere on the site
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

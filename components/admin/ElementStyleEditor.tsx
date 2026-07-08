"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useEditMode } from "./EditModeContext";
import { updateElementStyle } from "@/lib/site-content/element-style-actions";

type Target = { key: string; x: number; y: number; color: string; background: string };

function rgbToHex(rgb: string): string {
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return "#000000";
  return (
    "#" +
    m
      .slice(0, 3)
      .map((n) => Number(n).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Rendered once in the root layout for admins. When colour-editing mode is on,
 *  clicking any element tagged with data-fk-edit opens a small colour popover. */
export function ElementStyleEditor() {
  const { styleMode } = useEditMode();
  const [target, setTarget] = useState<Target | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Clear any open popover when colour mode is switched off (adjust-during-render
  // pattern, avoids a setState-in-effect cascade).
  const [prevStyleMode, setPrevStyleMode] = useState(styleMode);
  if (prevStyleMode !== styleMode) {
    setPrevStyleMode(styleMode);
    if (!styleMode) setTarget(null);
  }

  useEffect(() => {
    if (!styleMode) return;
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest?.("[data-fk-edit]") as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      const key = el.getAttribute("data-fk-edit")!;
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      setTarget({
        key,
        x: Math.min(rect.left, window.innerWidth - 260),
        y: rect.bottom + 8,
        color: rgbToHex(cs.color),
        background: rgbToHex(cs.backgroundColor),
      });
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [styleMode]);

  if (!styleMode || !target) return null;

  function save(prop: "color" | "backgroundColor", value: string) {
    if (!target) return;
    startTransition(async () => {
      await updateElementStyle(target.key, prop, value);
      router.refresh();
    });
  }

  return (
    <div
      className="fixed z-50 w-56 rounded-2xl border-2 border-fk-plum bg-fk-cream p-4 text-left shadow-[3px_3px_0_0_var(--color-fk-plum)]"
      style={{ left: target.x, top: Math.min(target.y, window.innerHeight - 220) }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <p className="font-body text-xs uppercase tracking-wide text-fk-ink/60">Colour this element</p>
        <button
          type="button"
          onClick={() => setTarget(null)}
          className="font-body text-sm text-fk-ink/50"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <label className="mt-3 block font-body text-xs text-fk-ink/70">Text colour</label>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="color"
          defaultValue={target.color}
          disabled={isPending}
          onChange={(e) => save("color", e.target.value)}
          className="h-9 w-full cursor-pointer rounded border border-fk-ink/20"
        />
        <button
          type="button"
          onClick={() => save("color", "")}
          className="shrink-0 font-body text-[11px] text-fk-rust underline"
        >
          reset
        </button>
      </div>

      <label className="mt-3 block font-body text-xs text-fk-ink/70">Background colour</label>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="color"
          defaultValue={target.background}
          disabled={isPending}
          onChange={(e) => save("backgroundColor", e.target.value)}
          className="h-9 w-full cursor-pointer rounded border border-fk-ink/20"
        />
        <button
          type="button"
          onClick={() => save("backgroundColor", "")}
          className="shrink-0 font-body text-[11px] text-fk-rust underline"
        >
          reset
        </button>
      </div>
    </div>
  );
}

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

  function save(prop: string, value: string) {
    if (!target) return;
    startTransition(async () => {
      await updateElementStyle(target.key, prop, value);
      router.refresh();
    });
  }

  function saveBorderWidth(value: string) {
    if (!value) return;
    save("borderWidth", value);
    // A width is invisible without a style, so pair them automatically.
    save("borderStyle", value === "0px" ? "none" : "solid");
  }

  const WIDTHS: [string, string][] = [["0px", "none"], ["1px", "thin"], ["2px", "medium"], ["4px", "thick"]];
  const RADII: [string, string][] = [["0px", "square"], ["8px", "soft"], ["24px", "round"], ["9999px", "pill"]];
  const SHADOWS: [string, string][] = [
    ["none", "none"],
    ["3px 3px 0 0 var(--color-fk-plum)", "soft"],
    ["5px 5px 0 0 var(--color-fk-plum)", "bold"],
    ["0 8px 24px rgba(0,0,0,0.18)", "float"],
  ];

  return (
    <div
      className="fixed z-50 max-h-[80vh] w-60 overflow-auto rounded-2xl border-2 border-fk-plum bg-fk-cream p-4 text-left shadow-[3px_3px_0_0_var(--color-fk-plum)]"
      style={{ left: target.x, top: Math.min(target.y, Math.max(16, window.innerHeight - 440)) }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <p className="font-body text-xs uppercase tracking-wide text-fk-ink/60">Style this element</p>
        <button
          type="button"
          onClick={() => setTarget(null)}
          className="font-body text-sm text-fk-ink/50"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {(
        [
          ["color", "Text colour", target.color],
          ["backgroundColor", "Background", target.background],
          ["borderColor", "Border colour", "#4a214b"],
        ] as const
      ).map(([prop, label, initial]) => (
        <div key={prop}>
          <label className="mt-3 block font-body text-xs text-fk-ink/70">{label}</label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="color"
              defaultValue={initial}
              disabled={isPending}
              onChange={(e) => save(prop, e.target.value)}
              className="h-9 w-full cursor-pointer rounded border border-fk-ink/20"
            />
            <button
              type="button"
              onClick={() => save(prop, "")}
              className="shrink-0 font-body text-[11px] text-fk-rust underline"
            >
              reset
            </button>
          </div>
        </div>
      ))}

      <label className="mt-3 block font-body text-xs text-fk-ink/70">Border thickness</label>
      <select
        disabled={isPending}
        defaultValue=""
        onChange={(e) => (e.target.value === "reset" ? (save("borderWidth", ""), save("borderStyle", "")) : saveBorderWidth(e.target.value))}
        className="mt-1 w-full rounded border border-fk-ink/20 bg-white px-2 py-1.5 font-body text-sm"
      >
        <option value="" disabled>
          choose…
        </option>
        {WIDTHS.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
        <option value="reset">reset</option>
      </select>

      <label className="mt-3 block font-body text-xs text-fk-ink/70">Corner radius</label>
      <select
        disabled={isPending}
        defaultValue=""
        onChange={(e) => save("borderRadius", e.target.value === "reset" ? "" : e.target.value)}
        className="mt-1 w-full rounded border border-fk-ink/20 bg-white px-2 py-1.5 font-body text-sm"
      >
        <option value="" disabled>
          choose…
        </option>
        {RADII.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
        <option value="reset">reset</option>
      </select>

      <label className="mt-3 block font-body text-xs text-fk-ink/70">Shadow</label>
      <select
        disabled={isPending}
        defaultValue=""
        onChange={(e) => save("boxShadow", e.target.value === "reset" ? "" : e.target.value)}
        className="mt-1 w-full rounded border border-fk-ink/20 bg-white px-2 py-1.5 font-body text-sm"
      >
        <option value="" disabled>
          choose…
        </option>
        {SHADOWS.map(([v, label]) => (
          <option key={v} value={v}>
            {label}
          </option>
        ))}
        <option value="reset">reset</option>
      </select>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { updateGlobalColor } from "@/lib/site-content/color-actions";
import type { BrandColorTokenKey } from "@/lib/site-content/color-tokens";

export function ColorTokenRow({
  tokenKey,
  label,
  currentHex,
}: {
  tokenKey: BrandColorTokenKey;
  label: string;
  currentHex: string;
}) {
  const [hex, setHex] = useState(currentHex);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function save() {
    startTransition(async () => {
      await updateGlobalColor(tokenKey, hex);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-fk-plum/15 py-4 last:border-b-0">
      <span
        className="h-10 w-10 shrink-0 rounded-full border-2 border-fk-ink/20"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-[10rem] flex-1">
        <p className="font-body text-sm font-semibold text-fk-ink">{label}</p>
        <p className="font-body text-xs uppercase tracking-wide text-fk-ink/50">bg-fk-{tokenKey}</p>
      </div>
      <input
        type="color"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        className="h-10 w-14 cursor-pointer rounded border border-fk-ink/20"
      />
      <input
        type="text"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
        className="w-28 border border-fk-ink/20 bg-fk-cream px-2 py-1.5 font-body text-sm uppercase"
      />
      <button
        type="button"
        disabled={isPending}
        onClick={save}
        className="rounded-full bg-fk-plum px-4 py-1.5 font-body text-xs font-semibold text-fk-cream disabled:opacity-50"
      >
        {saved ? "Saved!" : isPending ? "Saving..." : "Save everywhere"}
      </button>
    </div>
  );
}

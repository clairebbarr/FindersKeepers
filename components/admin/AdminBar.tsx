"use client";

import { useState } from "react";
import Link from "next/link";
import { useEditMode } from "./EditModeContext";
import { signOut } from "@/lib/auth/actions";
import { Star4 } from "@/components/brand/icons";

export function AdminBar({ name }: { name: string }) {
  const { isAdmin, editMode, toggleEditMode } = useEditMode();
  const [open, setOpen] = useState(false);
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {open ? (
        <div className="w-56 rounded-2xl border-2 border-fk-plum bg-fk-cream p-4 shadow-[4px_4px_0_0_var(--color-fk-plum)]">
          <p className="font-body text-xs uppercase tracking-wide text-fk-ink/60">Hi {name}</p>
          <button
            type="button"
            onClick={toggleEditMode}
            className={`mt-3 w-full rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors ${
              editMode ? "bg-fk-rust text-fk-cream" : "bg-fk-plum text-fk-cream"
            }`}
          >
            {editMode ? "Editing — click to stop" : "Edit this site"}
          </button>
          <div className="mt-3 flex items-center justify-between">
            <Link href="/account" className="font-body text-xs text-fk-ink/60 underline underline-offset-2">
              Account
            </Link>
            <form action={signOut}>
              <button type="submit" className="font-body text-xs text-fk-ink/60 underline underline-offset-2">
                Sign out
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close admin panel" : "Open admin panel"}
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-fk-plum shadow-[3px_3px_0_0_var(--color-fk-plum)] transition-colors ${
          editMode ? "bg-fk-rust" : "bg-fk-cream"
        }`}
      >
        <Star4 className={`h-5 w-5 ${editMode ? "text-fk-cream" : "text-fk-plum"}`} />
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEditMode } from "./EditModeContext";
import { signOut } from "@/lib/auth/actions";

export function AdminBar({ name }: { name: string }) {
  const { isAdmin, editMode, toggleEditMode } = useEditMode();
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 rounded-full border-2 border-fk-plum bg-fk-cream px-5 py-2.5 shadow-[4px_4px_0_0_var(--color-fk-plum)]">
      <span className="font-body text-xs uppercase tracking-wide text-fk-ink/60">Hi {name}</span>
      <button
        type="button"
        onClick={toggleEditMode}
        className={`rounded-full px-4 py-1.5 font-body text-sm font-semibold transition-colors ${
          editMode ? "bg-fk-rust text-fk-cream" : "bg-fk-plum text-fk-cream"
        }`}
      >
        {editMode ? "Editing — click to stop" : "Edit this site"}
      </button>
      <Link href="/account" className="font-body text-xs text-fk-ink/60 underline underline-offset-2">
        Account
      </Link>
      <form action={signOut}>
        <button type="submit" className="font-body text-xs text-fk-ink/60 underline underline-offset-2">
          Sign out
        </button>
      </form>
    </div>
  );
}

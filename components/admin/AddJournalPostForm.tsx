"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEditMode } from "./EditModeContext";
import { createJournalPost, type JournalPostState } from "@/lib/journal/actions";
import { Label, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const CATEGORIES = [
  "Things We Noticed",
  "Things We Collected",
  "Things We Found",
  "Things We Made",
  "Things Worth Keeping",
];

const initialState: JournalPostState = { status: "idle" };

export function AddJournalPostForm() {
  const { isAdmin, editMode } = useEditMode();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createJournalPost, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      router.refresh();
    }
  }, [state.status, router]);

  if (!isAdmin || !editMode) return null;

  if (!open) {
    return (
      <div className="mb-10 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border-2 border-dashed border-fk-rust px-5 py-2 font-body text-sm font-semibold text-fk-rust"
        >
          + Add Journal Post
        </button>
      </div>
    );
  }

  return (
    <div className="mb-10 border-2 border-fk-rust bg-fk-rust/5 p-6">
      <h3 className="font-display text-lg font-semibold text-fk-plum">New Journal Post</h3>
      <form action={formAction} className="mt-4 space-y-4">
        <div>
          <Label htmlFor="jp-title">Title</Label>
          <Input id="jp-title" name="title" required />
        </div>
        <div>
          <Label htmlFor="jp-subtitle">Subtitle</Label>
          <Input id="jp-subtitle" name="subtitle" />
        </div>
        <div>
          <Label htmlFor="jp-category">Category</Label>
          <select
            id="jp-category"
            name="category"
            required
            className="w-full border border-fk-ink/30 bg-fk-cream px-4 py-2.5 font-body text-fk-ink"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="jp-body">Body (leave a blank line between paragraphs)</Label>
          <textarea
            id="jp-body"
            name="body"
            required
            rows={6}
            className="w-full border border-fk-ink/30 bg-fk-cream px-4 py-2.5 font-body text-fk-ink"
          />
        </div>
        <p className="font-body text-xs text-fk-ink/50">
          Posted date and author are set automatically from today&apos;s date and your account.
        </p>
        {state.status === "error" ? <p className="font-body text-sm text-fk-rust">{state.message}</p> : null}
        {state.status === "success" ? (
          <p className="font-body text-sm text-fk-plum">Post published!</p>
        ) : null}
        <div className="flex gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Publishing..." : "Publish post"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

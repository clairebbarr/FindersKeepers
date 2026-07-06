"use client";

import { useActionState } from "react";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/site-copy";
import { subscribeToNewsletter, type NewsletterState } from "@/lib/newsletter/actions";

const initialState: NewsletterState = { status: "idle" };

export function NewsletterDrawer() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <section className="bg-fk-paper px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust">Little discoveries</p>
        <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-5xl">
          {home.newsletterHeading}
        </h2>
        <p className="mt-3 font-body text-fk-ink/75">{home.newsletterBody}</p>

        {state.status === "success" ? (
          <p className="mt-8 border border-fk-mint bg-fk-mint/20 px-6 py-4 font-body text-fk-plum">
            Thank you — your name is in the drawer. Watch your inbox for occasional notes.
          </p>
        ) : (
          <form action={formAction} className="mt-8 flex flex-col gap-3 text-left sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="newsletter-email">Email address</Label>
              <Input id="newsletter-email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Leave your name"}
            </Button>
          </form>
        )}
        {state.status === "error" ? (
          <p className="mt-3 font-body text-sm text-fk-rust">{state.message}</p>
        ) : null}
      </div>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { home } from "@/content/site-copy";

export function NewsletterDrawer() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitted");
  }

  return (
    <section className="bg-fk-paper px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust">Little discoveries</p>
        <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-5xl">
          {home.newsletterHeading}
        </h2>
        <p className="mt-3 font-body text-fk-ink/75">{home.newsletterBody}</p>

        {status === "submitted" ? (
          <p className="mt-8 border border-fk-mint bg-fk-mint/20 px-6 py-4 font-body text-fk-plum">
            Thank you — we&apos;ve noted your name. (Newsletter signups aren&apos;t connected to a mailing
            list yet; this arrives with Stage 2.)
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 text-left sm:flex-row sm:items-end">
            <div className="flex-1">
              <Label htmlFor="newsletter-email">Email address</Label>
              <Input id="newsletter-email" type="email" required placeholder="you@example.com" />
            </div>
            <Button type="submit">Leave your name</Button>
          </form>
        )}
      </div>
    </section>
  );
}

"use client";

import { useActionState } from "react";
import { Label, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { submitContactMessage, type ContactState } from "@/lib/contact/actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  if (state.status === "success") {
    return (
      <p className="border border-fk-mint bg-fk-mint/20 px-6 py-4 text-center font-body text-fk-plum">
        Thank you for your message — we&apos;ll be in touch within 24 hours.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" name="name" required />
      </div>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" name="email" type="email" required />
      </div>
      <div>
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full border border-fk-ink/30 bg-fk-cream px-4 py-2.5 font-body text-fk-ink placeholder:text-fk-ink/40 focus:border-fk-plum focus:outline-none"
        />
      </div>
      {state.status === "error" ? (
        <p className="font-body text-sm text-fk-rust">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

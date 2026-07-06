"use client";

import { useTransition } from "react";
import { setMessageHandled } from "@/lib/contact/actions";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  handled: boolean;
};

export function MessageRow({ message }: { message: Message }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="border-2 border-fk-plum bg-fk-paper p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold text-fk-plum">{message.name}</p>
          <a href={`mailto:${message.email}`} className="font-body text-sm text-fk-ink/70 underline">
            {message.email}
          </a>
          <p className="mt-1 font-body text-xs uppercase tracking-wide text-fk-ink/50">
            {new Date(message.created_at).toLocaleString("en-GB")}
          </p>
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(() => setMessageHandled(message.id, !message.handled))}
          className={`shrink-0 rounded-full px-4 py-1.5 font-body text-xs font-semibold ${
            message.handled ? "bg-fk-ink/10 text-fk-ink/60" : "bg-fk-rust text-fk-cream"
          }`}
        >
          {message.handled ? "Handled" : "Mark handled"}
        </button>
      </div>
      <p className="mt-4 whitespace-pre-wrap border-t border-fk-plum/15 pt-4 font-body text-sm text-fk-ink/85">
        {message.message}
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Finders, Keepers.",
};

export default function ContactPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl">Contact</h1>
          <p className="mt-4 font-body text-lg text-fk-ink/75">
            Questions about an order, a Lost Letter, or just want to say hello — we&apos;d love to hear from
            you.
          </p>
        </div>

        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

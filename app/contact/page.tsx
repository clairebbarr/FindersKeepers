import type { Metadata } from "next";
import { EditableText } from "@/components/admin/EditableText";
import { getSiteContentMap } from "@/lib/site-content/get";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Finders, Keepers.",
};

export default async function ContactPage() {
  const contentMap = await getSiteContentMap("contact");

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl">Contact</h1>
          <EditableText
            page="contact"
            section="intro"
            field="subheading"
            as="p"
            className="mt-4 font-body text-lg text-fk-ink/75"
            initialValue={
              contentMap["intro.subheading"] ??
              "Questions about an order, a Lost Letter, or just want to say hello — we'd love to hear from you."
            }
          />
        </div>

        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

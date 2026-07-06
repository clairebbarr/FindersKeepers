import type { Metadata } from "next";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { LinkButton } from "@/components/ui/Button";
import { brand } from "@/content/site-copy";

export const metadata: Metadata = {
  title: "Follow Along",
  description: "Find Finders, Keepers on Instagram.",
};

export default function SocialsPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl">Follow Along</h1>
        <p className="mt-4 font-body text-lg text-fk-ink/75">
          Behind-the-scenes finds, edition previews, and the occasional Lost Letter clue.
        </p>

        <ArchivalFrame className="mt-12">
          <p className="font-display text-2xl font-semibold text-fk-plum">{brand.instagram}</p>
          <LinkButton
            href="https://instagram.com/finderskeepersletters"
            variant="secondary"
            className="mt-6"
          >
            Follow on Instagram
          </LinkButton>
        </ArchivalFrame>
      </div>
    </div>
  );
}

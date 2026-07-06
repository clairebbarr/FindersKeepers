import type { Metadata } from "next";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { Key } from "@/components/brand/icons";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Account" };

const upcoming = [
  "Subscription status and billing portal",
  "Address management",
  "Edition and order history",
  "Saved Lost Letters",
  "Newsletter preferences",
];

export default function AccountPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <Key className="mx-auto h-8 w-8 text-fk-rust" />
        <h1 className="mt-4 font-display text-4xl font-semibold text-fk-plum">Account</h1>

        <ArchivalFrame className="mt-10 text-left">
          <p className="font-body text-sm text-fk-ink/70">
            The account dashboard arrives with Stage 2 (Supabase auth) and Stage 3 (Stripe billing) of the
            build. Once live, this page will include:
          </p>
          <ul className="mt-4 space-y-2">
            {upcoming.map((item) => (
              <li key={item} className="font-body text-sm text-fk-ink/80">
                &bull; {item}
              </li>
            ))}
          </ul>
        </ArchivalFrame>

        <LinkButton href="/" variant="ghost" className="mt-8">
          Back to home
        </LinkButton>
      </div>
    </div>
  );
}

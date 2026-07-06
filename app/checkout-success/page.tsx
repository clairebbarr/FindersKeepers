import type { Metadata } from "next";
import { ArchivalFrame } from "@/components/brand/ArchivalFrame";
import { WaxSeal } from "@/components/brand/icons";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Checkout Success" };

export default function CheckoutSuccessPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-lg text-center">
        <WaxSeal className="mx-auto h-10 w-10 text-fk-rust" />
        <h1 className="mt-4 font-display text-4xl font-semibold text-fk-plum">You&apos;re in.</h1>

        <ArchivalFrame className="mt-10">
          <p className="font-body text-sm text-fk-ink/70">
            This is a placeholder for the post-checkout confirmation page. Real order confirmation arrives
            with Stage 3 of the build, once Stripe Checkout and webhooks are connected.
          </p>
        </ArchivalFrame>

        <LinkButton href="/" variant="ghost" className="mt-8">
          Back to home
        </LinkButton>
      </div>
    </div>
  );
}

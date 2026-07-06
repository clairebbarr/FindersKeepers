import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" updated="Placeholder — set before launch">
      <p>
        By subscribing to or purchasing from Finders, Keepers you agree to these terms. They cover how
        subscriptions renew, how cancellations work, and what happens if an edition sells out.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Subscriptions</h2>
      <p>
        Subscriptions renew automatically at the interval you chose at checkout, and can be cancelled at
        any time from your account before the next billing date. Cancelling stops future renewals; it does
        not refund editions already dispatched.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Limited editions</h2>
      <p>
        One-off editions are produced in limited print runs. Once an edition sells out it may not be
        available again, though it may return to a future archive sale.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Liability</h2>
      <p>
        Finders, Keepers is provided as a small independent publication. We aren&apos;t liable for indirect
        or consequential loss arising from delayed post, courier issues, or events outside our control.
      </p>
      <p className="text-sm text-fk-ink/60">
        Replace this page with solicitor-reviewed terms specific to your company structure and Stripe
        configuration before accepting real payments.
      </p>
    </LegalPage>
  );
}

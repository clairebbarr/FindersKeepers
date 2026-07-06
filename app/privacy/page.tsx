import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Placeholder — set before launch">
      <p>
        Finders, Keepers (&quot;we&quot;, &quot;us&quot;) collects the personal information necessary to
        process orders, manage subscriptions, and send the communications you&apos;ve asked for — typically
        your name, delivery address, email address, and payment details (handled directly by our payment
        provider; we never store full card numbers ourselves).
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">What we collect it for</h2>
      <p>
        To fulfil orders and subscriptions, to send account and dispatch emails, and — only with your
        consent — to send occasional newsletter updates. You can withdraw newsletter consent at any time
        using the unsubscribe link in any email.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Your rights</h2>
      <p>
        Under UK GDPR you can request a copy of the data we hold about you, ask us to correct it, or ask us
        to delete it. Once account features launch, a data-deletion request route will be available directly
        from your account settings.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Who we share data with</h2>
      <p>
        Only the service providers required to run the business — our payment processor, our email
        provider, and our hosting/database provider — none of whom are permitted to use your data for their
        own marketing.
      </p>
      <p className="text-sm text-fk-ink/60">
        Replace this page with a solicitor-reviewed policy naming your actual providers before accepting
        real payments.
      </p>
    </LegalPage>
  );
}

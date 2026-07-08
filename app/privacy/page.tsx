import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { EditableText } from "@/components/admin/EditableText";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Privacy Policy" };

const P = "block font-body";
const H = "block font-display text-xl font-semibold text-fk-plum";

export default async function PrivacyPage() {
  const c = await getSiteContentMap("legal-privacy");
  const t = (section: string, field: string, cls: string, v: string) => (
    <EditableText
      page="legal-privacy"
      section={section}
      field={field}
      as={field === "heading" ? "h2" : "p"}
      className={cls}
      initialValue={c[`${section}.${field}`] ?? v}
    />
  );

  return (
    <LegalPage
      title={
        <EditableText
          page="legal-privacy"
          section="intro"
          field="title"
          as="h1"
          className="font-display text-4xl font-semibold text-fk-plum"
          initialValue={c["intro.title"] ?? "Privacy Policy"}
        />
      }
      updated="Placeholder — set before launch"
    >
      {t("intro", "body", P, "Finders, Keepers (\"we\", \"us\") collects the personal information necessary to process orders, manage subscriptions, and send the communications you've asked for — typically your name, delivery address, email address, and payment details (handled directly by our payment provider; we never store full card numbers ourselves).")}
      {t("collect", "heading", H, "What we collect it for")}
      {t("collect", "body", P, "To fulfil orders and subscriptions, to send account and dispatch emails, and — only with your consent — to send occasional newsletter updates. You can withdraw newsletter consent at any time using the unsubscribe link in any email.")}
      {t("rights", "heading", H, "Your rights")}
      {t("rights", "body", P, "Under UK GDPR you can request a copy of the data we hold about you, ask us to correct it, or ask us to delete it. Once account features launch, a data-deletion request route will be available directly from your account settings.")}
      {t("share", "heading", H, "Who we share data with")}
      {t("share", "body", P, "Only the service providers required to run the business — our payment processor, our email provider, and our hosting/database provider — none of whom are permitted to use your data for their own marketing.")}
      {t("note", "body", `${P} text-sm text-fk-ink/60`, "Replace this page with a solicitor-reviewed policy naming your actual providers before accepting real payments.")}
    </LegalPage>
  );
}

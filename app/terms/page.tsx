import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { EditableText } from "@/components/admin/EditableText";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Terms and Conditions" };

const P = "block font-body";
const H = "block font-display text-xl font-semibold text-fk-plum";

export default async function TermsPage() {
  const c = await getSiteContentMap("legal-terms");
  const t = (section: string, field: string, cls: string, v: string) => (
    <EditableText
      page="legal-terms"
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
          page="legal-terms"
          section="intro"
          field="title"
          as="h1"
          className="font-display text-4xl font-semibold text-fk-plum"
          initialValue={c["intro.title"] ?? "Terms and Conditions"}
        />
      }
      updated="Placeholder — set before launch"
    >
      {t("intro", "body", P, "By subscribing to or purchasing from Finders, Keepers you agree to these terms. They cover how subscriptions renew, how cancellations work, and what happens if an edition sells out.")}
      {t("subs", "heading", H, "Subscriptions")}
      {t("subs", "body", P, "Subscriptions renew automatically at the interval you chose at checkout, and can be cancelled at any time from your account before the next billing date. Cancelling stops future renewals; it does not refund editions already dispatched.")}
      {t("limited", "heading", H, "Limited editions")}
      {t("limited", "body", P, "One-off editions are produced in limited print runs. Once an edition sells out it may not be available again, though it may return to a future archive sale.")}
      {t("liability", "heading", H, "Liability")}
      {t("liability", "body", P, "Finders, Keepers is provided as a small independent publication. We aren't liable for indirect or consequential loss arising from delayed post, courier issues, or events outside our control.")}
      {t("note", "body", `${P} text-sm text-fk-ink/60`, "Replace this page with solicitor-reviewed terms specific to your company structure and Stripe configuration before accepting real payments.")}
    </LegalPage>
  );
}

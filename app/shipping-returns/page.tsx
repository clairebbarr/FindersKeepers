import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { EditableText } from "@/components/admin/EditableText";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Shipping and Returns" };

const P = "block font-body";
const H = "block font-display text-xl font-semibold text-fk-plum";

export default async function ShippingReturnsPage() {
  const c = await getSiteContentMap("legal-shipping");
  const t = (section: string, field: string, cls: string, v: string) => (
    <EditableText
      page="legal-shipping"
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
          page="legal-shipping"
          section="intro"
          field="title"
          as="h1"
          className="font-display text-4xl font-semibold text-fk-plum"
          initialValue={c["intro.title"] ?? "Shipping and Returns"}
        />
      }
      updated="Placeholder — set before launch"
    >
      {t("where", "heading", H, "Where we ship")}
      {t("where", "body", P, "UK only for now. We hope to ship further afield as the club grows.")}
      {t("dispatch", "heading", H, "Dispatch windows")}
      {t("dispatch", "body", P, "Each edition has its own dispatch window, shown on its Editions page. Physical post can occasionally be delayed by the postal service — we'll flag any known widespread delays by email.")}
      {t("damaged", "heading", H, "Damaged or missing items")}
      {t("damaged", "body", P, "If an edition arrives damaged, or doesn't arrive at all within a reasonable window, contact us and we'll make it right — a replacement where stock allows, or a credit toward the next edition.")}
      {t("returns", "heading", H, "Returns")}
      {t("returns", "body", P, "Because each edition contains perishable and one-off items (recipe cards, keepsakes, prints), we can't accept returns once an edition has been opened, except where the item is faulty.")}
      {t("note", "body", `${P} text-sm text-fk-ink/60`, "Replace this page with returns terms that comply with UK Consumer Contracts Regulations before accepting real payments.")}
    </LegalPage>
  );
}

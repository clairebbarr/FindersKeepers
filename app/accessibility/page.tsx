import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { EditableText } from "@/components/admin/EditableText";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Accessibility Statement" };

const P = "block font-body";
const H = "block font-display text-xl font-semibold text-fk-plum";

const doneItems = [
  "Semantic headings and landmarks throughout the site",
  "Colour combinations chosen for readable contrast",
  "Full keyboard navigation for menus, forms and links",
  "Reduced-motion support for anyone with that system preference set",
  "Descriptive alt text on meaningful images",
];

export default async function AccessibilityPage() {
  const c = await getSiteContentMap("legal-accessibility");
  const t = (section: string, field: string, cls: string, v: string) => (
    <EditableText
      page="legal-accessibility"
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
          page="legal-accessibility"
          section="intro"
          field="title"
          as="h1"
          className="font-display text-4xl font-semibold text-fk-plum"
          initialValue={c["intro.title"] ?? "Accessibility Statement"}
        />
      }
      updated="Placeholder — set before launch"
    >
      {t("intro", "body", P, "We want finderskeepersletters.com to be usable by as many people as possible, including if you use a screen reader, navigate by keyboard, or need reduced motion.")}
      {t("done", "heading", H, "What we've done")}
      <ul className="list-disc space-y-2 pl-5">
        {doneItems.map((item, j) => (
          <EditableText
            key={j}
            page="legal-accessibility"
            section="done"
            field={`item-${j}`}
            as="li"
            initialValue={c[`done.item-${j}`] ?? item}
          />
        ))}
      </ul>
      {t("gaps", "heading", H, "Known gaps")}
      {t("gaps", "body", P, "This is an early-stage build. Some pages (account, login, checkout) are still placeholders and haven't had a full accessibility pass yet — that happens before launch, alongside a real assistive-technology test.")}
      {t("contact", "heading", H, "Contact us")}
      {t("contact", "body", P, "If you hit an accessibility barrier anywhere on the site, please tell us via the Contact page and we'll prioritise a fix.")}
    </LegalPage>
  );
}

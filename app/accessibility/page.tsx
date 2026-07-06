import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" updated="Placeholder — set before launch">
      <p>
        We want finderskeepersletters.com to be usable by as many people as possible, including if you use a
        screen reader, navigate by keyboard, or need reduced motion.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">What we&apos;ve done</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Semantic headings and landmarks throughout the site</li>
        <li>Colour combinations chosen for readable contrast</li>
        <li>Full keyboard navigation for menus, forms and links</li>
        <li>Reduced-motion support for anyone with that system preference set</li>
        <li>Descriptive alt text on meaningful images</li>
      </ul>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Known gaps</h2>
      <p>
        This is an early-stage build. Some pages (account, login, checkout) are still placeholders and
        haven&apos;t had a full accessibility pass yet — that happens before launch, alongside a real
        assistive-technology test.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Contact us</h2>
      <p>
        If you hit an accessibility barrier anywhere on the site, please tell us via the Contact page and
        we&apos;ll prioritise a fix.
      </p>
    </LegalPage>
  );
}

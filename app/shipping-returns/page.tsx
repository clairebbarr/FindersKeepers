import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Shipping and Returns" };

export default function ShippingReturnsPage() {
  return (
    <LegalPage title="Shipping and Returns" updated="Placeholder — set before launch">
      <h2 className="font-display text-xl font-semibold text-fk-plum">Where we ship</h2>
      <p>UK only for now. We hope to ship further afield as the club grows.</p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Dispatch windows</h2>
      <p>
        Each edition has its own dispatch window, shown on its Editions page. Physical post can occasionally
        be delayed by the postal service — we&apos;ll flag any known widespread delays by email.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Damaged or missing items</h2>
      <p>
        If an edition arrives damaged, or doesn&apos;t arrive at all within a reasonable window, contact us
        and we&apos;ll make it right — a replacement where stock allows, or a credit toward the next
        edition.
      </p>
      <h2 className="font-display text-xl font-semibold text-fk-plum">Returns</h2>
      <p>
        Because each edition contains perishable and one-off items (recipe cards, keepsakes, prints), we
        can&apos;t accept returns once an edition has been opened, except where the item is faulty.
      </p>
      <p className="text-sm text-fk-ink/60">
        Replace this page with returns terms that comply with UK Consumer Contracts Regulations before
        accepting real payments.
      </p>
    </LegalPage>
  );
}

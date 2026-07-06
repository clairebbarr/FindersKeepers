import type { Metadata } from "next";
import { Card, Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { EditableText } from "@/components/admin/EditableText";
import { pricingPlans } from "@/content/pricing-plans";
import { pricingFaq } from "@/content/faq";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Join the Finders, Keepers waitlist — bimonthly subscriptions, memberships, gifts and one-off editions.",
};

export default async function PricingPage() {
  const contentMap = await getSiteContentMap("pricing");

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl">Pricing</h1>
        <EditableText
          page="pricing"
          section="intro"
          field="subheading"
          as="p"
          className="mt-4 font-body text-lg text-fk-ink/75"
          initialValue={
            contentMap["intro.subheading"] ??
            "Real dispatch dates and prices are being finalised — join the waitlist now and we'll let you know the moment checkout opens."
          }
        />
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pricingPlans.map((plan) => (
          <Card key={plan.slug} className="flex flex-col">
            <h2 className="font-display text-xl font-semibold text-fk-plum">{plan.name}</h2>
            <p className="mt-2 font-display text-3xl font-semibold text-fk-ink">{plan.price}</p>
            <p className="font-body text-xs uppercase tracking-[0.15em] text-fk-ink/50">{plan.interval}</p>
            <p className="mt-4 font-body text-sm text-fk-ink/75">{plan.description}</p>
            <ul className="mt-4 flex-1 space-y-2">
              {plan.perks.map((perk) => (
                <li key={perk} className="font-body text-sm text-fk-ink/70">
                  &bull; {perk}
                </li>
              ))}
            </ul>
            {plan.waitlistOnly ? <Badge className="mt-4 w-fit">Waitlist</Badge> : null}
            <LinkButton href="/contact" className="mt-6">
              {plan.waitlistOnly ? "Ask to join the waitlist" : "Subscribe"}
            </LinkButton>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-2xl">
        <h2 className="text-center font-display text-2xl font-semibold text-fk-plum">Questions</h2>
        <div className="mt-8 space-y-6">
          {pricingFaq.map((item) => (
            <div key={item.question} className="border-b border-fk-ink/10 pb-4">
              <h3 className="font-display text-lg font-semibold text-fk-ink">{item.question}</h3>
              <p className="mt-1 font-body text-sm text-fk-ink/75">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

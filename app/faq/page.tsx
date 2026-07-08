import type { Metadata } from "next";
import { EditableText } from "@/components/admin/EditableText";
import { generalFaq, pricingFaq } from "@/content/faq";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Finders, Keepers.",
};

export default async function FaqPage() {
  const contentMap = await getSiteContentMap("faq");

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="mx-auto mt-14 max-w-2xl space-y-10">
        <div>
          <EditableText
            page="faq"
            section="general"
            field="heading"
            as="h2"
            className="font-display text-2xl font-semibold text-fk-plum"
            initialValue={contentMap["general.heading"] ?? "General"}
          />
          <div className="mt-4 space-y-6">
            {generalFaq.map((item, i) => (
              <div key={item.question} className="border-b border-fk-ink/10 pb-4">
                <EditableText
                  page="faq"
                  section={`general-${i}`}
                  field="question"
                  as="h3"
                  className="font-display text-lg font-semibold text-fk-ink"
                  initialValue={contentMap[`general-${i}.question`] ?? item.question}
                />
                <EditableText
                  page="faq"
                  section={`general-${i}`}
                  field="answer"
                  as="p"
                  className="mt-1 font-body text-sm text-fk-ink/75"
                  initialValue={contentMap[`general-${i}.answer`] ?? item.answer}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <EditableText
            page="faq"
            section="pricing"
            field="heading"
            as="h2"
            className="font-display text-2xl font-semibold text-fk-plum"
            initialValue={contentMap["pricing.heading"] ?? "Subscriptions and Pricing"}
          />
          <div className="mt-4 space-y-6">
            {pricingFaq.map((item, i) => (
              <div key={item.question} className="border-b border-fk-ink/10 pb-4">
                <EditableText
                  page="faq"
                  section={`pricing-${i}`}
                  field="question"
                  as="h3"
                  className="font-display text-lg font-semibold text-fk-ink"
                  initialValue={contentMap[`pricing-${i}.question`] ?? item.question}
                />
                <EditableText
                  page="faq"
                  section={`pricing-${i}`}
                  field="answer"
                  as="p"
                  className="mt-1 font-body text-sm text-fk-ink/75"
                  initialValue={contentMap[`pricing-${i}.answer`] ?? item.answer}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

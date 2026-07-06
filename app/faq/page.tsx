import type { Metadata } from "next";
import { generalFaq, pricingFaq } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Finders, Keepers.",
};

export default function FaqPage() {
  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="mx-auto mt-14 max-w-2xl space-y-10">
        <div>
          <h2 className="font-display text-2xl font-semibold text-fk-plum">General</h2>
          <div className="mt-4 space-y-6">
            {generalFaq.map((item) => (
              <div key={item.question} className="border-b border-fk-ink/10 pb-4">
                <h3 className="font-display text-lg font-semibold text-fk-ink">{item.question}</h3>
                <p className="mt-1 font-body text-sm text-fk-ink/75">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-fk-plum">Subscriptions and Pricing</h2>
          <div className="mt-4 space-y-6">
            {pricingFaq.map((item) => (
              <div key={item.question} className="border-b border-fk-ink/10 pb-4">
                <h3 className="font-display text-lg font-semibold text-fk-ink">{item.question}</h3>
                <p className="mt-1 font-body text-sm text-fk-ink/75">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

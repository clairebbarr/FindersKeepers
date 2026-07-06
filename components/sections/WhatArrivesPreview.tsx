import { LinkButton } from "@/components/ui/Button";
import { Star8, Key, PressedFlower, Envelope, WaxSeal } from "@/components/brand/icons";
import { whatArrivesCategories } from "@/content/site-copy";

const icons = [Star8, Key, PressedFlower, Envelope, WaxSeal];
const tilts = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg"];

export function WhatArrivesPreview() {
  return (
    <section className="bg-fk-paper px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-fk-rust">Inside every envelope</p>
          <h2 className="mt-3 font-display text-4xl font-semibold uppercase tracking-tight text-fk-plum sm:text-5xl">
            What Arrives
          </h2>
          <p className="mt-3 font-body text-fk-ink/75">
            Not every envelope contains the same things. That is the point.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whatArrivesCategories.map((cat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={cat.key}
                className="flex flex-col items-start gap-3 border-2 border-fk-plum bg-fk-cream p-5 shadow-[4px_4px_0_0_var(--color-fk-plum)] transition-transform duration-150 hover:rotate-0"
                style={{ transform: `rotate(${tilts[i % tilts.length]})` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-fk-plum bg-fk-mint">
                  <Icon className="h-6 w-6 text-fk-plum" />
                </span>
                <h3 className="font-display text-lg font-semibold uppercase text-fk-plum">{cat.title}</h3>
                <p className="font-body text-sm text-fk-ink/75">{cat.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <LinkButton href="/what-arrives">See what arrives in full</LinkButton>
        </div>
      </div>
    </section>
  );
}

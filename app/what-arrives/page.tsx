import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Star8, Key, PressedFlower, Envelope, WaxSeal } from "@/components/brand/icons";
import { LinkButton } from "@/components/ui/Button";
import { EditableText } from "@/components/admin/EditableText";
import { whatArrivesCategories } from "@/content/site-copy";
import { getSiteContentMap } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "What Arrives",
  description: "Not every envelope contains the same things. That is the point.",
};

const icons = [Star8, Key, PressedFlower, Envelope, WaxSeal];

export default async function WhatArrivesPage() {
  const contentMap = await getSiteContentMap("what-arrives");

  return (
    <div className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <EditableText
          page="what-arrives"
          section="intro"
          field="heading"
          as="h1"
          className="font-display text-4xl font-semibold text-fk-plum sm:text-5xl"
          initialValue={contentMap["intro.heading"] ?? "What Arrives"}
        />
        <EditableText
          page="what-arrives"
          section="intro"
          field="subheading"
          as="p"
          className="mt-4 font-body text-lg text-fk-ink/75"
          initialValue={contentMap["intro.subheading"] ?? "Not every envelope contains the same things. That is the point."}
        />
      </div>

      <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-8">
        {whatArrivesCategories.map((cat, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Card key={cat.key} className="sm:flex sm:items-start sm:gap-6">
              <Icon className="h-10 w-10 shrink-0 text-fk-rust" />
              <div className="mt-4 sm:mt-0">
                <EditableText
                  page="what-arrives"
                  section={`cat-${cat.key}`}
                  field="title"
                  as="h2"
                  className="font-display text-2xl font-semibold text-fk-plum"
                  initialValue={contentMap[`cat-${cat.key}.title`] ?? cat.title}
                />
                <EditableText
                  page="what-arrives"
                  section={`cat-${cat.key}`}
                  field="description"
                  as="p"
                  className="mt-2 block font-body text-fk-ink/80"
                  initialValue={contentMap[`cat-${cat.key}.description`] ?? cat.description}
                />
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.examples.map((ex, j) => (
                    <EditableText
                      key={j}
                      page="what-arrives"
                      section={`cat-${cat.key}`}
                      field={`example-${j}`}
                      as="li"
                      className="rounded-full border border-fk-ink/20 px-3 py-1 font-body text-xs text-fk-ink/70"
                      initialValue={contentMap[`cat-${cat.key}.example-${j}`] ?? ex}
                    />
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <LinkButton href="/pricing">Join the next edition</LinkButton>
      </div>
    </div>
  );
}

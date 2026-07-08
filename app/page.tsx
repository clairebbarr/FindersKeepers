import type { ReactNode } from "react";
import { Hero } from "@/components/sections/Hero";
import { PromiseSection } from "@/components/sections/PromiseSection";
import { WhatArrivesPreview } from "@/components/sections/WhatArrivesPreview";
import { CurrentEditionSection } from "@/components/sections/CurrentEditionSection";
import { AllEditionsStrip } from "@/components/sections/AllEditionsStrip";
import { OurWhyTeaser } from "@/components/sections/OurWhyTeaser";
import { MeetKeepersTeaser } from "@/components/sections/MeetKeepersTeaser";
import { LostLettersTeaser } from "@/components/sections/LostLettersTeaser";
import { LatestDiscoveries } from "@/components/sections/LatestDiscoveries";
import { NewsletterDrawer } from "@/components/sections/NewsletterDrawer";
import { LayoutSection } from "@/components/admin/LayoutSection";
import { getSiteContentMap, getMediaMap, getColorOverrides, getLayoutConfig } from "@/lib/site-content/get";
import { founders } from "@/content/founders";
import { editions } from "@/content/editions";

export default async function Home() {
  const [contentMap, mediaMap, colorOverrides, layout] = await Promise.all([
    getSiteContentMap("home"),
    getMediaMap([
      ...founders.map((f) => `founder-${f.slug}`),
      ...editions.map((e) => `edition-${e.slug}`),
    ]),
    getColorOverrides(),
    getLayoutConfig("home"),
  ]);

  // The home page as an ordered, hideable, reorderable list of sections.
  const sections: { id: string; label: string; node: ReactNode }[] = [
    { id: "hero", label: "Hero", node: <Hero contentMap={contentMap} colorOverrides={colorOverrides} /> },
    { id: "promise", label: "Promise", node: <PromiseSection contentMap={contentMap} /> },
    {
      id: "what-arrives",
      label: "What Arrives",
      node: <WhatArrivesPreview contentMap={contentMap} colorOverrides={colorOverrides} />,
    },
    { id: "current-edition", label: "Current Edition", node: <CurrentEditionSection mediaMap={mediaMap} /> },
    {
      id: "all-editions",
      label: "Editions Strip",
      node: <AllEditionsStrip mediaMap={mediaMap} contentMap={contentMap} />,
    },
    {
      id: "our-why",
      label: "Our Why",
      node: <OurWhyTeaser contentMap={contentMap} colorOverrides={colorOverrides} />,
    },
    {
      id: "keepers-teaser",
      label: "Keepers",
      node: <MeetKeepersTeaser mediaMap={mediaMap} contentMap={contentMap} colorOverrides={colorOverrides} />,
    },
    {
      id: "lost-letters",
      label: "Lost Letters",
      node: <LostLettersTeaser contentMap={contentMap} colorOverrides={colorOverrides} />,
    },
    { id: "discoveries", label: "Discoveries", node: <LatestDiscoveries contentMap={contentMap} /> },
    {
      id: "newsletter",
      label: "Newsletter",
      node: <NewsletterDrawer contentMap={contentMap} colorOverrides={colorOverrides} />,
    },
  ];

  // Apply the saved order (ids listed first, any new section appended in place).
  const byId = new Map(sections.map((s) => [s.id, s]));
  const ordered: typeof sections = [];
  for (const id of layout.order) {
    const s = byId.get(id);
    if (s) {
      ordered.push(s);
      byId.delete(id);
    }
  }
  for (const s of sections) if (byId.has(s.id)) ordered.push(s);

  const orderedIds = ordered.map((s) => s.id);

  return (
    <>
      {ordered.map((s) => (
        <LayoutSection
          key={s.id}
          pageKey="home"
          id={s.id}
          label={s.label}
          hidden={layout.hidden.includes(s.id)}
          orderedIds={orderedIds}
          hiddenIds={layout.hidden}
        >
          {s.node}
        </LayoutSection>
      ))}
    </>
  );
}

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
import { getSiteContentMap, getMediaMap, getColorOverrides } from "@/lib/site-content/get";
import { founders } from "@/content/founders";
import { editions } from "@/content/editions";

export default async function Home() {
  const [contentMap, mediaMap, colorOverrides] = await Promise.all([
    getSiteContentMap("home"),
    getMediaMap([
      ...founders.map((f) => `founder-${f.slug}`),
      ...editions.map((e) => `edition-${e.slug}`),
    ]),
    getColorOverrides(),
  ]);

  return (
    <>
      <Hero contentMap={contentMap} colorOverrides={colorOverrides} />
      <PromiseSection contentMap={contentMap} />
      <WhatArrivesPreview contentMap={contentMap} colorOverrides={colorOverrides} />
      <CurrentEditionSection mediaMap={mediaMap} />
      <AllEditionsStrip mediaMap={mediaMap} contentMap={contentMap} />
      <OurWhyTeaser contentMap={contentMap} colorOverrides={colorOverrides} />
      <MeetKeepersTeaser mediaMap={mediaMap} contentMap={contentMap} colorOverrides={colorOverrides} />
      <LostLettersTeaser contentMap={contentMap} colorOverrides={colorOverrides} />
      <LatestDiscoveries contentMap={contentMap} />
      <NewsletterDrawer contentMap={contentMap} colorOverrides={colorOverrides} />
    </>
  );
}

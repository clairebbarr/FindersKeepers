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
import { getSiteContentMap, getMediaMap } from "@/lib/site-content/get";
import { founders } from "@/content/founders";
import { editions } from "@/content/editions";

export default async function Home() {
  const [contentMap, mediaMap] = await Promise.all([
    getSiteContentMap("home"),
    getMediaMap([
      ...founders.map((f) => `founder-${f.slug}`),
      ...editions.map((e) => `edition-${e.slug}`),
    ]),
  ]);

  return (
    <>
      <Hero contentMap={contentMap} />
      <PromiseSection contentMap={contentMap} />
      <WhatArrivesPreview />
      <CurrentEditionSection mediaMap={mediaMap} />
      <AllEditionsStrip mediaMap={mediaMap} />
      <OurWhyTeaser />
      <MeetKeepersTeaser mediaMap={mediaMap} />
      <LostLettersTeaser />
      <LatestDiscoveries />
      <NewsletterDrawer />
    </>
  );
}

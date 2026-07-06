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

export default function Home() {
  return (
    <>
      <Hero />
      <PromiseSection />
      <WhatArrivesPreview />
      <CurrentEditionSection />
      <AllEditionsStrip />
      <OurWhyTeaser />
      <MeetKeepersTeaser />
      <LostLettersTeaser />
      <LatestDiscoveries />
      <NewsletterDrawer />
    </>
  );
}

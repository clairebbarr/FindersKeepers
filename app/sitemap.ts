import type { MetadataRoute } from "next";
import { editions } from "@/content/editions";
import { getAllJournalPosts } from "@/lib/journal/get";

const baseUrl = "https://finderskeepersletters.com";

const staticRoutes = [
  "",
  "/about",
  "/what-arrives",
  "/editions",
  "/pricing",
  "/keepers",
  "/lost-letters",
  "/journal",
  "/socials",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/shipping-returns",
  "/accessibility",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const editionEntries = editions.map((e) => ({
    url: `${baseUrl}/editions/${e.slug}`,
    lastModified: new Date(),
  }));

  const journalPosts = await getAllJournalPosts();
  const journalEntries = journalPosts.map((p) => ({
    url: `${baseUrl}/journal/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticEntries, ...editionEntries, ...journalEntries];
}

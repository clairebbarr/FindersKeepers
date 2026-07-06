import type { Metadata } from "next";
import { displayFont, bodyFont, scriptFont } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://finderskeepersletters.com"),
  title: {
    default: "Finders, Keepers — Letters from curious collectors",
    template: "%s — Finders, Keepers",
  },
  description:
    "Physical post for people who still notice small things. A curated, seasonal mail club of art, stories, recipes and keepsakes. We do the finding. You do the keeping.",
  openGraph: {
    title: "Finders, Keepers",
    description: "Physical post for people who still notice small things.",
    siteName: "Finders, Keepers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finders, Keepers",
    description: "Physical post for people who still notice small things.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-fk-cream font-body text-fk-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

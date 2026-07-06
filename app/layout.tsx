import type { Metadata } from "next";
import { displayFont, bodyFont, scriptFont } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EditModeProvider } from "@/components/admin/EditModeContext";
import { AdminBar } from "@/components/admin/AdminBar";
import { getCurrentProfile, isAdminRole } from "@/lib/auth/current-profile";
import { getColorOverrides } from "@/lib/site-content/get";
import { BRAND_COLOR_TOKENS } from "@/lib/site-content/color-tokens";
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

const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const VALID_TOKEN_KEYS: Set<string> = new Set(BRAND_COLOR_TOKENS.map((t) => t.key));

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [profile, colorOverrides] = await Promise.all([getCurrentProfile(), getColorOverrides()]);
  const isAdmin = isAdminRole(profile?.role);

  // whitelist token names + validate hex before ever writing into a <style> tag
  const safeVars = Object.entries(colorOverrides)
    .filter(([key, value]) => VALID_TOKEN_KEYS.has(key) && HEX_RE.test(value))
    .map(([key, value]) => `--color-fk-${key}:${value};`)
    .join("");

  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable} h-full antialiased`}
    >
      <head>{safeVars ? <style dangerouslySetInnerHTML={{ __html: `:root{${safeVars}}` }} /> : null}</head>
      <body className="flex min-h-full flex-col bg-fk-cream font-body text-fk-ink">
        <EditModeProvider isAdmin={isAdmin}>
          <SiteHeader loggedIn={!!profile} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          {profile ? <AdminBar name={profile.full_name || profile.email || "there"} /> : null}
        </EditModeProvider>
      </body>
    </html>
  );
}

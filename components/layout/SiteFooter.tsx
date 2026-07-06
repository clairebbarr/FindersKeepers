import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Star8 } from "@/components/brand/icons";
import { ColorEditableSection } from "@/components/admin/ColorEditableSection";
import { brand, nav, footerLinks } from "@/content/site-copy";
import { getSiteContentMap, getColorOverrides } from "@/lib/site-content/get";

export async function SiteFooter() {
  const [contentMap, colorOverrides] = await Promise.all([
    getSiteContentMap("global"),
    getColorOverrides(),
  ]);
  const blockOverride = contentMap["footer.bgColor"] ?? null;
  const effectiveHex = blockOverride ?? colorOverrides["plum"] ?? "#4a214b";

  return (
    <ColorEditableSection
      as="footer"
      className="border-t border-fk-ink/10 bg-fk-plum text-fk-cream"
      tokenKey="plum"
      page="global"
      section="footer"
      field="bgColor"
      effectiveHex={effectiveHex}
      blockOverrideHex={blockOverride}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark className="text-xl" />
            <p className="mt-4 max-w-xs font-body text-sm text-fk-cream/75">{brand.tagline}</p>
            <p className="mt-2 max-w-xs font-body text-sm text-fk-cream/60">{brand.secondaryLine}</p>
          </div>

          <div>
            <h3 className="font-body text-xs uppercase tracking-[0.25em] text-fk-cream/50">Explore</h3>
            <ul className="mt-4 space-y-2">
              {nav.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-fk-cream/80 hover:text-fk-mint">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs uppercase tracking-[0.25em] text-fk-cream/50">Support</h3>
            <ul className="mt-4 space-y-2">
              {nav.slice(6).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-fk-cream/80 hover:text-fk-mint">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/signup" className="font-body text-sm text-fk-cream/80 hover:text-fk-mint">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-xs uppercase tracking-[0.25em] text-fk-cream/50">Legal</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-body text-sm text-fk-cream/80 hover:text-fk-mint">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={footerLinks.socials[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-body text-sm text-fk-cream/80 hover:text-fk-mint"
            >
              {brand.instagram}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-fk-cream/15 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="flex items-center gap-2 font-body text-xs text-fk-cream/50">
            <Star8 className="h-3 w-3" />
            &copy; {new Date().getFullYear()} {brand.name}. {brand.domain}
          </p>
          <p className="font-body text-xs text-fk-cream/50">{brand.tagline}</p>
        </div>
      </div>
    </ColorEditableSection>
  );
}

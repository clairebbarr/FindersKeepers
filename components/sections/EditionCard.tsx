import Link from "next/link";
import { Badge } from "@/components/ui/Card";
import { Star4 } from "@/components/brand/icons";
import type { Edition } from "@/content/editions";
import { getPalette } from "@/content/palettes";

export function EditionCard({ edition, compact = false }: { edition: Edition; compact?: boolean }) {
  const palette = getPalette(edition.paletteKey);

  return (
    <Link href={`/editions/${edition.slug}`} className="block">
      <div
        className="flex h-full flex-col border p-5 transition-transform duration-150 hover:-translate-y-0.5"
        style={{ borderColor: palette.colors.primary, backgroundColor: palette.colors.paper }}
      >
        <div
          className="flex aspect-[4/3] items-center justify-center"
          style={{ backgroundColor: palette.colors.primary }}
        >
          <Star4 className="h-8 w-8" style={{ color: palette.colors.accent }} />
        </div>
        <Badge
          className="mt-4 w-fit"
          style={{ borderColor: palette.colors.primary, color: palette.colors.primary }}
        >
          Edition {edition.number} &middot; {edition.status}
        </Badge>
        <h3
          className={`mt-3 font-display font-semibold ${compact ? "text-lg" : "text-xl"}`}
          style={{ color: palette.colors.primary }}
        >
          {edition.name}
        </h3>
        {!compact ? (
          <p className="mt-2 font-body text-sm" style={{ color: palette.colors.ink }}>
            {edition.theme}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

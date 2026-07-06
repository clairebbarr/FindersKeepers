import type { SVGProps } from "react";

const CENTER = 100;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + r * Math.sin(rad), y: CENTER - r * Math.cos(rad) };
}

/**
 * Places one word's letters evenly around an arc, each letter individually
 * positioned and rotated (rather than relying on <textPath>, whose glyph
 * ascenders/descenders don't reliably stay within a given radius band and
 * whose per-letter spacing looks uneven on a curve).
 *
 * `flip` reverses the reading direction and adds a 180° rotation offset, for
 * words that sit along the bottom of the circle (so they read upright,
 * left-to-right, rather than upside down).
 */
function CircularWord({
  word,
  r,
  centerAngle,
  spread,
  flip = false,
}: {
  word: string;
  r: number;
  centerAngle: number;
  spread: number;
  flip?: boolean;
}) {
  const letters = word.split("");
  const n = letters.length;
  const step = n > 1 ? spread / (n - 1) : 0;

  return (
    <>
      {letters.map((ch, i) => {
        const angle = flip
          ? centerAngle + spread / 2 - i * step
          : centerAngle - spread / 2 + i * step;
        const { x, y } = polar(angle, r);
        const rotation = flip ? angle - 180 : angle;
        return (
          <text
            key={i}
            x={x}
            y={y}
            dy="0.35em"
            textAnchor="middle"
            transform={`rotate(${rotation} ${x} ${y})`}
          >
            {ch}
          </text>
        );
      })}
    </>
  );
}

/**
 * Circular "publisher's mark" seal — FINDERS around the top, KEEPERS around
 * the bottom, both upright and evenly spaced, with a compass star at the
 * centre.
 */
export function PublisherMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" {...props}>
      <circle cx={CENTER} cy={CENTER} r="94" stroke="currentColor" strokeWidth="2" />
      <circle cx={CENTER} cy={CENTER} r="65" stroke="currentColor" strokeWidth="1" />

      <g fill="currentColor" className="font-display uppercase" style={{ fontSize: "13px", fontWeight: 600 }}>
        <CircularWord word="FINDERS" r={79.5} centerAngle={0} spread={84} />
        <CircularWord word="KEEPERS" r={79.5} centerAngle={180} spread={84} flip />
      </g>

      {/* side dots separating the two words, on the same radius as the text */}
      <circle cx="20" cy={CENTER} r="2" fill="currentColor" />
      <circle cx="180" cy={CENTER} r="2" fill="currentColor" />

      {/* compass star */}
      <path
        d="M100 64 L105.5 94.5 L136 100 L105.5 105.5 L100 136 L94.5 105.5 L64 100 L94.5 94.5 Z"
        fill="currentColor"
      />
      <circle cx={CENTER} cy={CENTER} r="3.5" fill="var(--color-fk-cream)" />
    </svg>
  );
}

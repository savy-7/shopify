import Image from "next/image";
import { MARKETPLACES } from "@/lib/brand/content";

const SIZES = {
  default: { tile: "h-12 w-28", logo: "max-h-7", label: "text-[0.62rem] tracking-[0.22em]", gap: "mt-4 gap-2.5" },
  sm: { tile: "h-8 w-[4.75rem]", logo: "max-h-4", label: "text-[0.56rem] tracking-[0.18em]", gap: "mt-2.5 gap-1.5" },
} as const;

/**
 * "We are available on" — the other places the range is sold, as a row of
 * equal tiles so four very differently shaped marks (a square app icon, two
 * wordmarks, a name) still read as one set. `size="sm"` is for tucking this
 * into a slim strip (the hero) rather than giving it its own section.
 */
export default function AvailableOn({
  className = "",
  size = "default",
  label = true,
  align = "start",
}: {
  className?: string;
  size?: keyof typeof SIZES;
  label?: boolean;
  align?: "start" | "center";
}) {
  const s = SIZES[size];

  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {label && (
        <p className={`font-numeral ${s.label} text-ink/40 uppercase`}>We are available on</p>
      )}
      <ul
        className={`flex flex-wrap items-center ${align === "center" ? "justify-center" : ""} ${s.gap}`}
      >
        {MARKETPLACES.map((market) => {
          const tile = (
            <span
              className={`flex ${s.tile} items-center justify-center rounded-xl border border-ink/10 bg-white px-3`}
              style={market.tile ? { backgroundColor: market.tile, borderColor: "transparent" } : undefined}
            >
              {market.logo ? (
                <Image
                  src={market.logo.src}
                  alt={market.name}
                  width={market.logo.width}
                  height={market.logo.height}
                  // SVGs from /public: nothing for the optimiser to do.
                  unoptimized
                  className={`${s.logo} w-auto max-w-full object-contain`}
                />
              ) : (
                <span className="font-display text-[0.8rem] font-semibold tracking-[-0.01em] text-ink/80">
                  {market.name}
                </span>
              )}
            </span>
          );

          return (
            <li key={market.name}>
              {market.url ? (
                <a
                  href={market.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Goodness Crafted on ${market.name}`}
                  className="block transition-opacity hover:opacity-80"
                >
                  {tile}
                </a>
              ) : (
                tile
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

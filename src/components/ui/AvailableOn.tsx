import Image from "next/image";
import { MARKETPLACES } from "@/lib/brand/content";

/**
 * "We are available on" — the other places the range is sold, as a row of
 * equal white tiles so four very differently shaped marks (a square app icon,
 * two wordmarks, a name) still read as one set.
 */
export default function AvailableOn({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="font-numeral text-[0.62rem] uppercase tracking-[0.22em] text-ink/40">
        We are available on
      </p>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {MARKETPLACES.map((market) => {
          const tile = (
            <span
              className="flex h-12 w-28 items-center justify-center rounded-xl border border-ink/10 bg-white px-3"
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
                  className="max-h-7 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-ink/80">
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

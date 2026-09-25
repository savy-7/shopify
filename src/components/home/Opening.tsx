import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import {
  ACCENT_HEX,
  ACCENT_TEXT_HEX,
  accentFor,
  packClassName,
  shortNameFor,
} from "@/lib/brand/palette";
import { formatMoney } from "@/lib/format";
import RotatingSeal from "@/components/ui/RotatingSeal";

/**
 * Page opening: the table banner as a set, with the range standing on the
 * marble as if it were part of the photograph. Every pack is a link.
 *
 * Two coordinate sets, because the scene changes shape:
 * - wide (lg+): the banner at its own 2048:768 ratio, uncropped, so spots are
 *   percentages of the photograph itself and stay pinned to the tabletop at
 *   any width;
 * - compact: a taller crop of the empty middle of the table, where the text
 *   moves above the scene and names move to a row of chips beneath it.
 *
 * Packs must never overlap one another. Their photographs sit on opaque white,
 * which only drops out through `mix-blend-mode: multiply` — and multiply makes
 * one pack show through another wherever they cross. So the arrangement is a
 * staggered two-depth row (back row smaller and higher) with clear air
 * between neighbours, and it keeps off the bowls on the right.
 *
 * For the same reason nothing between a pack and the photograph may create a
 * stacking context (no transform, opacity or z-index on the link): the blend
 * would then happen against a transparent box and show a white rectangle.
 * Motion and dimming are applied to the image element itself.
 */

type Spot = {
  /** Centre, as % of scene width. */
  x: number;
  /** Where the pack stands, as % of scene height from the top. */
  b: number;
  /** Pack height, as % of scene height. */
  h: number;
  /** Resting tilt in degrees; straightens on hover. */
  tilt: number;
};

// Alternating front / back. The table's back edge is at 69% of the photo's
// height; back-row packs stand just in front of it.
const WIDE: Spot[] = [
  { x: 19, b: 95, h: 31, tilt: -3 },
  { x: 26, b: 80, h: 26, tilt: 2 },
  { x: 32.5, b: 96, h: 31, tilt: 1.5 },
  { x: 40.5, b: 79, h: 26, tilt: -2 },
  { x: 47.8, b: 95, h: 31, tilt: -1 },
  { x: 54.8, b: 80, h: 26, tilt: 2.5 },
  { x: 61.6, b: 96, h: 31, tilt: -2 },
];

const COMPACT: Spot[] = [
  { x: 14, b: 96, h: 28, tilt: -3 },
  { x: 26, b: 72, h: 23, tilt: 2 },
  { x: 38, b: 97, h: 28, tilt: 1.5 },
  { x: 50, b: 72, h: 23, tilt: -2 },
  { x: 62, b: 96, h: 28, tilt: -1 },
  { x: 74, b: 72, h: 23, tilt: 2.5 },
  { x: 86, b: 97, h: 28, tilt: -2 },
];

/**
 * Wall tone along the photograph's top edge, sampled from the banner, so the
 * faded top of the photo runs into the page without a seam.
 */
const WALL_WIDE =
  "linear-gradient(90deg, #f8f0e3 0%, #f1e7d8 25%, #eaddcc 45%, #e2d2bd 62%, #e4d5c1 100%)";
const WALL_COMPACT = "#e9dccb";

export default function Opening({ products }: { products: Product[] }) {
  // Only as many packs as there are places on the table. The chips beneath
  // the compact scene, and the plates and grid further down, list everything.
  const placed = products.filter((p) => p.featuredImage).slice(0, WIDE.length);

  return (
    <section
      className="relative overflow-hidden bg-[var(--wall-compact)] lg:bg-[image:var(--wall-wide)]"
      style={{
        ["--wall-compact" as string]: WALL_COMPACT,
        ["--wall-wide" as string]: WALL_WIDE,
      }}
    >
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 z-30 opacity-[0.3]"
      />

      {/* Copy. In flow above the scene when compact; laid over the empty wall
          on the left of the photograph when wide. */}
      <div className="relative z-20 px-5 pt-10 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-[2.4vw] lg:pl-[3vw]">
        <p
          className="animate-rise font-numeral text-[0.62rem] uppercase tracking-[0.42em] text-ink/45"
          style={{ animationDelay: "780ms" }}
        >
          Crafting goodness in every bite
        </p>

        <h1 className="mt-5 text-[clamp(2.7rem,11vw,4.2rem)] leading-[0.98] font-normal tracking-[-0.015em] lg:mt-[1.1vw] lg:text-[4vw] lg:leading-[1.02]">
          <span className="animate-rise block" style={{ animationDelay: "880ms" }}>
            Goodness,
          </span>
          <span
            className="animate-rise block italic lg:inline"
            style={{ animationDelay: "990ms", color: "var(--color-olive-deep)" }}
          >
            thoughtfully{" "}
          </span>
          <span
            className="animate-rise block lg:inline"
            style={{
              animationDelay: "1100ms",
              WebkitTextStroke: "clamp(0.75px, 0.08vw, 1.5px) var(--color-ink)",
              color: "transparent",
            }}
          >
            crafted.
          </span>
        </h1>

        <div
          className="animate-rise mt-8 flex flex-wrap items-center gap-7 lg:mt-[1.5vw]"
          style={{ animationDelay: "1200ms" }}
        >
          <Link
            href="/shop"
            className="rounded-full bg-ink px-8 py-4 font-numeral text-[0.68rem] uppercase tracking-[0.22em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
          >
            Shop the range
          </Link>
          <Link
            href="/about"
            className="font-numeral text-[0.68rem] uppercase tracking-[0.22em] underline decoration-ink/25 underline-offset-[7px] transition-colors hover:decoration-ink"
          >
            Our story
          </Link>
        </div>

        <p
          className="animate-rise mt-6 hidden items-center gap-3 font-numeral text-[0.6rem] uppercase tracking-[0.28em] text-ink/45 xl:flex"
          style={{ animationDelay: "2300ms" }}
        >
          Pick a pack off the table
          <svg
            viewBox="0 0 24 12"
            aria-hidden="true"
            className="h-3 w-6 animate-[nudge_1.8s_ease-in-out_infinite]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 6h21M17 1.5 22 6l-5 4.5" />
          </svg>
        </p>
      </div>

      {/* The scene. */}
      <div className="pack-scene relative -mt-6 aspect-[5/6] sm:aspect-[16/11] lg:mt-[5vw] lg:aspect-[2048/768]">
        <Image
          src="/brand/table-banner.webp"
          alt="Bowls of almonds, mixed nuts, cashews and raisins on a wooden board, on a sunlit marble table beneath olive branches"
          fill
          priority
          sizes="(max-width: 640px) 220vw, (max-width: 1024px) 200vw, 100vw"
          className="object-cover object-[46%_50%] [mask-image:linear-gradient(to_bottom,transparent,black_16%)] sm:object-[28%_50%] lg:object-fill"
        />

        {/* On the wall, centred, clear of the copy and above the packs. */}
        <RotatingSeal
          className="animate-rise absolute top-[22%] left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper/90 shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--color-ink)_60%,transparent)] backdrop-blur-sm sm:h-28 sm:w-28 lg:top-[24%] lg:h-[8.5vw] lg:w-[8.5vw] lg:max-h-40 lg:max-w-40"
          style={{ animationDelay: "1500ms" }}
        />

        <ul>
          {placed.map((product, i) => (
            <PackSpot key={product.handle} product={product} index={i} />
          ))}
        </ul>
      </div>

      {/* Compact: names beneath the scene, since labels would collide over
          packs this close together. */}
      <div className="relative z-20 lg:hidden">
        <p className="px-5 pt-5 font-numeral text-[0.6rem] uppercase tracking-[0.28em] text-ink/45 sm:px-8">
          Tap a pack to explore
        </p>
        <ul className="scrollbar-none flex gap-2 overflow-x-auto px-5 pt-3 pb-8 sm:px-8">
          {products.map((product) => {
            const amount = Number(product.priceRange.minVariantPrice.amount);
            return (
              <li key={product.handle} className="shrink-0">
                <Link
                  href={`/products/${product.handle}`}
                  className="flex items-center gap-2 rounded-full bg-paper/80 px-3.5 py-2 backdrop-blur-sm"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full"
                    style={{ background: ACCENT_HEX[accentFor(product.handle)] }}
                  />
                  <span className="font-serif text-[0.95rem] italic">
                    {shortNameFor(product.handle, product.title)}
                  </span>
                  {amount > 0 && (
                    <span className="font-numeral text-[0.66rem] tabular-nums text-ink/55">
                      {formatMoney(product.priceRange.minVariantPrice)}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PackSpot({ product, index }: { product: Product; index: number }) {
  const image = product.featuredImage!;
  const accent = accentFor(product.handle);
  const wide = WIDE[index];
  const compact = COMPACT[index];
  const name = shortNameFor(product.handle, product.title);
  const amount = Number(product.priceRange.minVariantPrice.amount);
  const price = amount > 0 ? formatMoney(product.priceRange.minVariantPrice) : null;
  const delay = 1300 + index * 90;

  return (
    <li>
      {/* Zero-width anchor at the pack's centre line: the image overflows it
          and is centred with its own transform, so the link itself carries no
          transform (see the stacking-context note above). */}
      <Link
        href={`/products/${product.handle}`}
        aria-label={`${product.title}${price ? `, ${price}` : ""}`}
        className="pack-spot group absolute bottom-[var(--bc)] left-[var(--xc)] h-[var(--hc)] w-0 outline-none lg:bottom-[var(--bw)] lg:left-[var(--xw)] lg:h-[var(--hw)]"
        style={{
          ["--xc" as string]: `${compact.x}%`,
          ["--bc" as string]: `${100 - compact.b}%`,
          ["--hc" as string]: `${compact.h}%`,
          ["--xw" as string]: `${wide.x}%`,
          ["--bw" as string]: `${100 - wide.b}%`,
          ["--hw" as string]: `${wide.h}%`,
          ["--tilt" as string]: `${wide.tilt}deg`,
          ["--accent" as string]: ACCENT_HEX[accent],
          ["--accent-ink" as string]: ACCENT_TEXT_HEX[accent],
        }}
      >
        <Image
          src={image.url}
          alt=""
          width={image.width}
          height={image.height}
          sizes="(max-width: 1024px) 30vw, 14vw"
          className={`${packClassName(product.handle)} pack-spot-img animate-settle absolute bottom-0 left-0 h-full w-auto max-w-none origin-bottom -translate-x-1/2 rotate-[var(--tilt)] transition-[translate,rotate,scale,opacity] duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-[6%] group-hover:scale-[1.04] group-hover:rotate-0 group-focus-visible:-translate-y-[6%] group-focus-visible:rotate-0`}
          style={{ animationDelay: `${delay}ms` }}
        />

        {/* Wide: a name tag above each pack. */}
        <span
          className="animate-rise absolute bottom-[calc(100%+0.55rem)] left-0 z-10 hidden -translate-x-1/2 items-center gap-1.5 rounded-full bg-paper/85 py-1 pr-2.5 pl-2 whitespace-nowrap xl:gap-2 xl:py-1.5 xl:pr-3 xl:pl-2.5 shadow-[0_10px_24px_-16px_color-mix(in_oklab,var(--color-ink)_70%,transparent)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[var(--accent-ink)] group-hover:text-paper group-focus-visible:bg-[var(--accent-ink)] group-focus-visible:text-paper group-focus-visible:ring-2 group-focus-visible:ring-ink lg:flex"
          style={{ animationDelay: `${delay + 350}ms` }}
          aria-hidden="true"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-[var(--accent)] ring-1 ring-paper/70" />
          </span>
          <span className="font-serif text-[clamp(0.8rem,1vw,1rem)] italic">{name}</span>
          {/* Price and arrow open out on hover. */}
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-brand)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
            <span className="flex items-center gap-1.5 overflow-hidden font-numeral text-[0.62rem] tabular-nums">
              <span className="pl-1">{price ?? "View"}</span>
              <span>&rarr;</span>
            </span>
          </span>
        </span>

        {/* Compact: a pulsing marker in place of the tag. */}
        <span
          aria-hidden="true"
          className="absolute bottom-[calc(100%+0.35rem)] left-0 flex h-3 w-3 -translate-x-1/2 lg:hidden"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
          <span className="relative h-3 w-3 rounded-full border-2 border-paper bg-[var(--accent)]" />
        </span>
      </Link>
    </li>
  );
}

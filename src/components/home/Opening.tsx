import Image, { getImageProps } from "next/image";
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

/**
 * Page opening: the range set into a photograph, every pack a link.
 *
 * Two scenes, served with <picture> so each device downloads only its own:
 * - wide (lg+): the podium banner at its full 2048:768 ratio, uncropped, one
 *   pack standing on each of its seven podiums, copy centred on the wall
 *   above and a name plaque on the marble in front of each podium;
 * - compact: a taller crop of the table banner, packs in a staggered
 *   two-depth row, copy above, names in a row of chips beneath.
 * Spots are percentages of the scene, so on wide screens they are
 * percentages of the photograph itself and stay on their podiums at any width.
 *
 * Packs must never overlap one another. Their photographs sit on opaque white,
 * which only drops out through `mix-blend-mode: multiply` — and multiply makes
 * one pack show through another wherever they cross.
 *
 * For the same reason nothing between a pack and the photograph may create a
 * stacking context (no transform, opacity or z-index on the link): the blend
 * would then happen against a transparent box and show a white rectangle.
 * Motion and dimming are applied to the image element itself.
 */

type Spot = {
  /** Centre, as % of scene width. */
  x: number;
  /** Bottom of the product photo, as % of scene height from the top. */
  b: number;
  /** Product photo height, as % of scene height. */
  h: number;
};

/**
 * The pack's base sits ~7.5% of the photo's height above its bottom edge (the
 * rest is the soft shadow), so each photo drops that far below the surface it
 * stands on. Measured across all seven product shots.
 */
const BASE_OFFSET = 0.075;
const PACK_H = 35;

/**
 * Centre and top-surface height of each podium in the podium banner, measured
 * off a 1% grid. Left to right: stone, wood, stone, wood, stone, wood, stone.
 */
const PODIUMS: [x: number, surface: number][] = [
  [18.7, 71.8],
  [29.6, 73.2],
  [39.8, 74.0],
  [49.5, 73.0],
  [59.4, 73.6],
  [69.6, 75.0],
  [80.1, 72.1],
];

const WIDE: Spot[] = PODIUMS.map(([x, surface]) => ({
  x,
  b: surface + PACK_H * BASE_OFFSET,
  h: PACK_H,
}));

// Table banner, alternating front / back rows. Its table edge is at 69%.
const COMPACT: (Spot & { tilt: number })[] = [
  { x: 14, b: 96, h: 28, tilt: -3 },
  { x: 26, b: 72, h: 23, tilt: 2 },
  { x: 38, b: 97, h: 28, tilt: 1.5 },
  { x: 50, b: 72, h: 23, tilt: -2 },
  { x: 62, b: 96, h: 28, tilt: -1 },
  { x: 74, b: 72, h: 23, tilt: 2.5 },
  { x: 86, b: 97, h: 28, tilt: -2 },
];

/**
 * Wall tone along each photograph's top edge, sampled from the banners, so the
 * faded top of the photo runs into the page without a seam.
 */
const WALL_WIDE =
  "linear-gradient(90deg, #faf3e4 0%, #f3e5d1 20%, #dcc4a8 40%, #d3b99c 60%, #d8c2a6 80%, #dfccb3 100%)";
const WALL_COMPACT = "#e9dccb";

const SCENE_ALT = "Nuts and dry fruits in wooden bowls on a sunlit marble table";

export default function Opening({ products }: { products: Product[] }) {
  // Only as many packs as there are places. The chips beneath the compact
  // scene, and the plates and grid further down, list everything.
  const placed = products.filter((p) => p.featuredImage).slice(0, WIDE.length);

  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({
    alt: SCENE_ALT,
    src: "/brand/podium-banner.webp",
    width: 2048,
    height: 768,
    sizes: "100vw",
  });
  const { props: compactImg } = getImageProps({
    alt: SCENE_ALT,
    src: "/brand/table-banner.webp",
    width: 2048,
    height: 768,
    sizes: "(max-width: 640px) 220vw, 200vw",
  });

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

      {/* Copy. In flow above the scene when compact; centred on the wall above
          the podiums when wide. */}
      <div className="relative z-20 px-5 pt-10 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-[2.2vw] lg:text-center">
        {/* A soft pool of wall-coloured light behind the copy. The olive
            branches reach in from the right at headline height, and the
            outlined "crafted." is unreadable over leaves without it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -z-10 hidden h-[17vw] w-[66vw] -translate-x-1/2 lg:block"
          style={{
            background:
              "radial-gradient(closest-side, rgb(248 241 229 / 0.88), rgb(248 241 229 / 0.6) 55%, transparent)",
          }}
        />
        <p
          className="animate-rise font-numeral text-[0.62rem] uppercase tracking-[0.42em] text-ink/45"
          style={{ animationDelay: "780ms" }}
        >
          Crafting goodness in every bite
        </p>

        <h1 className="mt-5 text-[clamp(2.7rem,11vw,4.2rem)] leading-[0.98] font-normal tracking-[-0.015em] lg:mt-[0.9vw] lg:text-[3.3vw] lg:leading-[1.05]">
          <span className="animate-rise block lg:inline" style={{ animationDelay: "880ms" }}>
            Goodness,{" "}
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
          className="animate-rise mt-8 flex flex-wrap items-center gap-7 lg:mt-[1.3vw] lg:justify-center"
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
      </div>

      {/* The scene. */}
      <div className="pack-scene relative -mt-6 aspect-[5/6] sm:aspect-[16/11] lg:mt-[3vw] lg:aspect-[2048/768]">
        <picture>
          <source media="(min-width: 1024px)" srcSet={wideSrcSet} sizes="100vw" />
          {/* next/image cannot switch sources by breakpoint; this is the
              documented art-direction pattern (getImageProps + <picture>). */}
          <img
            {...compactImg}
            alt={SCENE_ALT}
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[46%_50%] [mask-image:linear-gradient(to_bottom,transparent,black_16%)] sm:object-[28%_50%] lg:object-fill lg:[mask-image:linear-gradient(to_bottom,transparent,black_10%)]"
          />
        </picture>

        {/* Compact: in the wall space above the packs. */}
        <p
          className="animate-rise absolute top-[24%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-numeral text-[0.6rem] whitespace-nowrap uppercase tracking-[0.28em] text-ink/50 lg:hidden"
          style={{ animationDelay: "1900ms" }}
        >
          Tap a pack to explore
          <svg
            viewBox="0 0 12 24"
            aria-hidden="true"
            className="h-5 w-2.5 animate-[bob_1.8s_ease-in-out_infinite]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 1v21M1.5 17 6 22l4.5-5" />
          </svg>
        </p>

        <ul>
          {placed.map((product, i) => (
            <PackSpot key={product.handle} product={product} index={i} />
          ))}
        </ul>
      </div>

      {/* Compact: names beneath the scene, since labels would collide over
          packs this close together. */}
      <ul className="scrollbar-none relative z-20 flex gap-2 overflow-x-auto px-5 pt-5 pb-8 sm:px-8 lg:hidden">
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
      {/* Zero-width anchor on the pack's centre line: the image overflows it
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
          ["--tilt" as string]: `${compact.tilt}deg`,
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
          className={`${packClassName(product.handle)} pack-spot-img animate-settle absolute bottom-0 left-0 h-full w-auto max-w-none origin-bottom -translate-x-1/2 rotate-[var(--tilt)] transition-[translate,rotate,scale,opacity] duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-[7%] group-hover:scale-[1.04] group-hover:rotate-0 group-focus-visible:-translate-y-[7%] group-focus-visible:rotate-0 lg:rotate-0`}
          style={{ animationDelay: `${delay}ms` }}
        />

        {/* Wide: a name plaque on the marble in front of the podium. Anchored
            to the pack's base, so it moves with the podium spot. */}
        <span
          className="animate-rise absolute top-[calc(100%+var(--plaque-gap))] left-0 z-10 hidden -translate-x-1/2 flex-col items-center rounded-xl bg-paper/80 px-3 pt-1.5 pb-1.5 whitespace-nowrap shadow-[0_10px_24px_-16px_color-mix(in_oklab,var(--color-ink)_70%,transparent)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[var(--accent-ink)] group-hover:text-paper group-focus-visible:bg-[var(--accent-ink)] group-focus-visible:text-paper group-focus-visible:ring-2 group-focus-visible:ring-ink lg:flex xl:px-3.5"
          style={{
            animationDelay: `${delay + 350}ms`,
            // Clears the podium's front face, which varies slightly by podium.
            ["--plaque-gap" as string]: "1.6vw",
          }}
          aria-hidden="true"
        >
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--accent)] ring-1 ring-paper/70" />
            </span>
            <span className="font-serif text-[clamp(0.82rem,1vw,1.05rem)] leading-tight italic">
              {name}
            </span>
          </span>
          <span className="mt-0.5 flex items-center gap-1 font-numeral text-[0.58rem] tracking-[0.08em] tabular-nums opacity-70 group-hover:opacity-100">
            {price ?? "View"}
            {/* The arrow opens out on hover. */}
            <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-brand)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
              <span className="overflow-hidden">&nbsp;&rarr;</span>
            </span>
          </span>
        </span>

        {/* Compact: a pulsing marker in place of the plaque. */}
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

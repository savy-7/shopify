import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { ACCENT_HEX, accentFor, packClassName } from "@/lib/brand/palette";
import { MISSION } from "@/lib/brand/content";
import NutIcon, { type NutIconName } from "@/components/ui/NutIcon";
import RotatingSeal from "@/components/ui/RotatingSeal";

/**
 * Icons set around the photograph. Hand-placed rather than distributed evenly —
 * an even ring reads as a loading spinner. Each drifts on its own delay so the
 * group never pulses in unison.
 */
const FLOATERS: {
  name: NutIconName;
  accent: keyof typeof ACCENT_HEX;
  className: string;
  tilt: number;
  delay: number;
}[] = [
  { name: "almond", accent: "almond", className: "-left-5 top-[12%] h-10 w-10", tilt: -14, delay: 0 },
  { name: "pistachio", accent: "pistachio", className: "-right-4 top-[38%] h-11 w-11", tilt: 12, delay: 900 },
  { name: "date", accent: "date", className: "-right-2 -bottom-4 h-9 w-9", tilt: -9, delay: 1800 },
];

/**
 * Page opening: brand line beside the table photograph, then the range as a
 * shelf of clickable packs.
 *
 * The photograph runs at its own 1312:1199 ratio with no crop — an earlier
 * version cut a wide banner into a portrait arch and showed about a fifth of
 * the scene, which is the mistake this avoids.
 *
 * Everything is above the fold, so entrances run on load rather than on scroll,
 * with delays offset past the intro curtain so the sequence continues where it
 * ends.
 */
export default function Opening({ products }: { products: Product[] }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 z-30 opacity-[0.35]"
      />

      <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
        <div className="grid items-center gap-14 pt-12 lg:grid-cols-[1fr_0.95fr] lg:gap-12 lg:pt-14">
          <div>
            <p
              className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45"
              style={{ animationDelay: "780ms" }}
            >
              Est. India — Nuts, dry fruits &amp; blends
            </p>

            <h1 className="mt-6 text-[clamp(2.9rem,6.4vw,5.8rem)] leading-[0.89] font-extrabold tracking-[-0.045em]">
              <span className="animate-rise block" style={{ animationDelay: "880ms" }}>
                Goodness,
              </span>
              <span
                className="animate-rise block font-serif text-[0.95em] font-normal italic text-ink/45"
                style={{ animationDelay: "990ms" }}
              >
                thoughtfully
              </span>
              {/* Outlined, echoing the specimen nameplate below — the two
                  sections share one typographic device, not two unrelated ones. */}
              <span
                className="animate-rise block"
                style={{
                  animationDelay: "1100ms",
                  WebkitTextStroke: "clamp(1px, 0.12vw, 2px) var(--color-ink)",
                  color: "transparent",
                }}
              >
                crafted.
              </span>
            </h1>

            <p
              className="animate-rise mt-8 max-w-md text-lg leading-relaxed text-ink/65"
              style={{ animationDelay: "1210ms" }}
            >
              {MISSION}
            </p>

            <div
              className="animate-rise mt-9 flex flex-wrap items-center gap-6"
              style={{ animationDelay: "1300ms" }}
            >
              <Link
                href="/shop"
                className="rounded-full bg-ink px-8 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
              >
                Shop the range
              </Link>
              <Link
                href="/about"
                className="font-numeral text-[0.7rem] uppercase tracking-[0.2em] underline decoration-ink/25 underline-offset-[7px] transition-colors hover:decoration-ink"
              >
                Our story
              </Link>
            </div>
          </div>

          {/* Shown whole at its own ratio: a plain rounded frame rather than a
              cut-out shape, so none of the scene is hidden. */}
          <div className="relative mx-auto w-full max-w-[600px]">
            <div
              className="relative aspect-[1312/1199] w-full overflow-hidden rounded-[2rem]"
              style={{ animation: "unveil 1.05s var(--ease-brand) 0.75s both" }}
            >
              <Image
                src="/brand/table-scene.webp"
                alt="Goodness Crafted almonds, nuts and seeds mix, cashews and raisins on a wooden table with bowls of nuts"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 600px"
                className="object-cover"
              />
            </div>

            {FLOATERS.map((floater) => (
              <span
                key={floater.name}
                aria-hidden="true"
                className={`animate-rise pointer-events-none absolute hidden lg:block ${floater.className}`}
                style={{ animationDelay: `${1450 + floater.delay / 6}ms` }}
              >
                <span
                  className="animate-drift block h-full w-full"
                  style={{
                    ["--drift-tilt" as string]: `${floater.tilt}deg`,
                    animationDelay: `${floater.delay}ms`,
                    color: ACCENT_HEX[floater.accent],
                  }}
                >
                  <NutIcon name={floater.name} className="h-full w-full" strokeWidth={1.3} />
                </span>
              </span>
            ))}

            <RotatingSeal
              className="animate-rise absolute bottom-5 -left-6 hidden h-24 w-24 sm:block lg:-left-10 lg:h-28 lg:w-28"
              style={{ animationDelay: "1500ms" }}
            />
          </div>
        </div>
      </div>

      {/* The shelf. Packs are cropped by the section edge so the row reads as
          continuing past the fold, which is also the scroll invitation. */}
      <div className="relative mt-8 h-[clamp(105px,13vw,180px)]">
        {/* Six packs do not fit a phone at a readable size. Rather than shrink
            them to thumbnails or clip the outer two out of reach, the row
            scrolls below sm and centres once there is room. */}
        <ul className="scrollbar-none absolute inset-x-0 bottom-0 flex snap-x items-end gap-[1.5vw] overflow-x-auto px-4 sm:justify-center sm:overflow-visible">
          {products.map((product, i) => {
            if (!product.featuredImage) return null;

            return (
              <li key={product.handle} className="shrink-0 snap-center">
                <Link
                  href={`/products/${product.handle}`}
                  className="group block"
                  title={product.title}
                  style={{ ["--accent" as string]: ACCENT_HEX[accentFor(product.handle)] }}
                >
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText ?? `${product.title} 250 g pack`}
                    width={product.featuredImage.width}
                    height={product.featuredImage.height}
                    sizes="(max-width: 640px) 26vw, 14vw"
                    className={`animate-rise ${packClassName(product.handle)} h-[clamp(120px,16vw,215px)] w-auto origin-bottom transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-3`}
                    style={{
                      animationDelay: `${1500 + i * 80}ms`,
                      // Alternating drop, so the row reads as an arrangement
                      // rather than a grid of equal boxes.
                      marginBottom: i % 2 === 1 ? "-1.4vw" : "0",
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <p
          className="animate-rise absolute right-5 bottom-6 hidden items-center gap-3 font-numeral text-[0.6rem] uppercase tracking-[0.28em] text-ink/35 sm:right-8 lg:flex"
          style={{ animationDelay: "2000ms" }}
        >
          Scroll
          <span className="h-px w-12 bg-ink/20" />
        </p>
      </div>
    </section>
  );
}

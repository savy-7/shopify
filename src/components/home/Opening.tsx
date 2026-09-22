import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { ACCENT_HEX, accentFor, packClassName } from "@/lib/brand/palette";
import { MISSION } from "@/lib/brand/content";
import NutIcon, { type NutIconName } from "@/components/ui/NutIcon";
import RotatingSeal from "@/components/ui/RotatingSeal";

/**
 * Icons scattered around the hero image. Positions are hand-placed rather than
 * distributed evenly — an even ring reads as a loading spinner. Each drifts on
 * its own delay so the group never pulses in unison.
 */
const FLOATERS: {
  name: NutIconName;
  accent: keyof typeof ACCENT_HEX;
  className: string;
  tilt: number;
  delay: number;
}[] = [
  { name: "almond", accent: "almond", className: "-left-3 top-[6%] h-11 w-11", tilt: -14, delay: 0 },
  { name: "pistachio", accent: "pistachio", className: "-right-2 top-[22%] h-10 w-10", tilt: 12, delay: 900 },
  { name: "cashew", accent: "mix", className: "-left-7 top-[48%] h-12 w-12", tilt: 8, delay: 1800 },
  { name: "date", accent: "date", className: "-right-5 top-[64%] h-9 w-9", tilt: -9, delay: 2600 },
  { name: "raisin", accent: "raisin", className: "right-[14%] -bottom-5 h-9 w-9", tilt: 10, delay: 3400 },
];

/**
 * Page opening. Sits above the specimen sheet and carries the brand line only —
 * no product detail, so the two sections do different jobs.
 *
 * Everything here is above the fold, so entrances run on load rather than on
 * scroll; a scroll reveal would resolve instantly and be wasted. Delays are
 * offset past the intro curtain so the sequence continues where it ends.
 */
export default function Opening({ products }: { products: Product[] }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 z-30 opacity-[0.35]"
      />

      <div className="mx-auto w-full max-w-[110rem] px-5 sm:px-8">
        <div className="grid items-center gap-14 pt-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:pt-16">
          <div>
            <p
              className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45"
              style={{ animationDelay: "780ms" }}
            >
              Est. India — Nuts, dry fruits &amp; blends
            </p>

            <h1 className="mt-7 text-[clamp(3rem,7.4vw,6.6rem)] leading-[0.88] font-extrabold tracking-[-0.045em]">
              <span className="animate-rise block" style={{ animationDelay: "880ms" }}>
                Goodness,
              </span>
              <span
                className="animate-rise block font-serif text-[0.94em] font-normal italic text-ink/45"
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

          {/* Arch panel. Fills the space the type leaves empty and brings the
              warm studio photography in against the flat paper. */}
          <div className="relative mx-auto w-full max-w-[390px]">
            <div
              className="relative aspect-[3/5] w-full overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-cashew/30"
              style={{ animation: "unveil 1.05s var(--ease-brand) 0.75s both" }}
            >
              <Image
                src="/brand/hero-scene.webp"
                alt="Goodness Crafted packs with bowls of nuts and olive branches"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 390px"
                className="object-cover"
              />
            </div>

            {FLOATERS.map((floater) => (
              <span
                key={floater.name}
                className={`animate-rise absolute hidden lg:block ${floater.className}`}
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

            <RotatingSeal className="animate-rise absolute -bottom-5 -left-3 hidden h-28 w-28 sm:block lg:-left-8 lg:h-32 lg:w-32" />
          </div>
        </div>
      </div>

      {/* The shelf. Packs are cropped by the section edge so the row reads as
          continuing past the fold, which is also the scroll invitation. */}
      <div className="relative mt-10 h-[clamp(110px,15vw,200px)]">
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
                  style={{ ["--accent" as string]: ACCENT_HEX[accentFor(product.handle)] }}
                >
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText ?? `${product.title} 250 g pack`}
                    width={product.featuredImage.width}
                    height={product.featuredImage.height}
                    sizes="(max-width: 640px) 26vw, 14vw"
                    className={`animate-rise ${packClassName(product.handle)} h-[clamp(120px,17vw,230px)] w-auto origin-bottom transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-3`}
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

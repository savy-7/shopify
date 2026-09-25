import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { ACCENT_HEX, accentFor, packClassName } from "@/lib/brand/palette";
import { MISSION, PACK_LINE } from "@/lib/brand/content";
import Botanical from "@/components/ui/Botanical";
import RotatingSeal from "@/components/ui/RotatingSeal";

/**
 * Page opening.
 *
 * Reworked around the botanical-plate reference: a letterspaced line, a serif
 * statement, hand-drawn linework framing the photograph, and the range laid
 * out below as a shelf of clickable packs. The photograph runs at its own
 * 1312:1199 ratio with no crop.
 *
 * Everything is above the fold, so entrances run on load rather than on
 * scroll, offset past the intro curtain so the sequence continues where it
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
        <div className="grid items-center gap-14 pt-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16 lg:pt-16">
          <div>
            <p
              className="animate-rise font-numeral text-[0.62rem] uppercase tracking-[0.42em] text-ink/40"
              style={{ animationDelay: "780ms" }}
            >
              {PACK_LINE.replace(/\.$/, "")}
            </p>

            <Botanical
              name="sprig-pair"
              className="animate-rise mt-6 h-[14px] w-[140px] text-ink/30"
              style={{ animationDelay: "840ms" }}
            />

            <h1 className="mt-7 text-[clamp(3.1rem,7vw,6.2rem)] leading-[0.98] font-normal tracking-[-0.015em]">
              <span className="animate-rise block" style={{ animationDelay: "880ms" }}>
                Goodness,
              </span>
              <span
                className="animate-rise block italic"
                style={{ animationDelay: "990ms", color: "var(--color-olive-deep)" }}
              >
                thoughtfully
              </span>
              {/* Outlined, echoing the specimen nameplate below — the two
                  sections share one typographic device, not two unrelated ones. */}
              <span
                className="animate-rise block"
                style={{
                  animationDelay: "1100ms",
                  WebkitTextStroke: "clamp(0.75px, 0.09vw, 1.5px) var(--color-ink)",
                  color: "transparent",
                }}
              >
                crafted.
              </span>
            </h1>

            <p
              className="animate-rise mt-9 max-w-md text-lg leading-relaxed text-ink/60"
              style={{ animationDelay: "1210ms" }}
            >
              {MISSION}
            </p>

            <div
              className="animate-rise mt-10 flex flex-wrap items-center gap-7"
              style={{ animationDelay: "1300ms" }}
            >
              <Link
                href="/shop"
                className="rounded-full bg-ink px-9 py-4 font-numeral text-[0.68rem] uppercase tracking-[0.22em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
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

          {/* Photograph, framed by linework rather than a hard container edge. */}
          <div className="relative mx-auto w-full max-w-[600px]">
            <Botanical
              name="branch"
              className="animate-rise pointer-events-none absolute -top-14 right-2 hidden h-[70px] w-[140px] text-ink/30 lg:block"
              style={{ animationDelay: "1500ms" }}
            />

            <div
              className="relative aspect-[1312/1199] w-full overflow-hidden rounded-[2rem]"
              style={{
                animation: "unveil 1.05s var(--ease-brand) 0.75s both",
                boxShadow: "0 30px 70px -40px color-mix(in oklab, var(--color-ink) 55%, transparent)",
              }}
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

            {/* Centred on the seam between the two halves of the opening:
                the photograph's top edge when stacked, its left edge beside
                the text. The paper disc keeps the ring legible over the photo. */}
            <RotatingSeal
              className="animate-rise absolute top-0 left-1/2 z-20 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--color-ink)_60%,transparent)] lg:top-1/2 lg:left-0 lg:h-32 lg:w-32 xl:h-36 xl:w-36"
              style={{ animationDelay: "1500ms" }}
            />
          </div>
        </div>
      </div>

      {/* The shelf. Packs are cropped by the section edge so the row reads as
          continuing past the fold, which is also the scroll invitation. */}
      <div className="relative mt-12 h-[clamp(105px,13vw,180px)]">
        {/* The full range does not fit a phone at a readable size. Rather than shrink
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

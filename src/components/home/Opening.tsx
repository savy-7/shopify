import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { ACCENT_HEX, accentFor, packClassName } from "@/lib/brand/palette";
import { MISSION } from "@/lib/brand/content";

/**
 * Page opening. Sits above the specimen sheet and carries the brand line only —
 * no product detail, so the two sections do different jobs.
 *
 * Everything here is above the fold, so entrances run on load rather than on
 * scroll; a scroll reveal would resolve instantly and be wasted.
 */
export default function Opening({ products }: { products: Product[] }) {
  return (
    <section className="relative flex min-h-[92svh] flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 z-30 opacity-[0.35]"
      />

      <div className="mx-auto flex w-full max-w-[110rem] flex-1 flex-col justify-center px-5 pt-14 sm:px-8">
        <p
          className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45"
          style={{ animationDelay: "60ms" }}
        >
          Est. India — Nuts, dry fruits &amp; blends
        </p>

        <h1 className="mt-7 text-[3.1rem] leading-[0.88] font-extrabold tracking-[-0.045em] sm:text-[5.5rem] lg:text-[8.5rem]">
          <span className="animate-rise block" style={{ animationDelay: "150ms" }}>
            Goodness,
          </span>
          <span
            className="animate-rise block font-serif text-[0.92em] font-normal italic text-ink/45"
            style={{ animationDelay: "260ms" }}
          >
            thoughtfully
          </span>
          {/* Outlined, echoing the specimen nameplate below — the two sections
              share one typographic device rather than two unrelated ones. */}
          <span
            className="animate-rise block"
            style={{
              animationDelay: "370ms",
              WebkitTextStroke: "clamp(1px, 0.12vw, 2px) var(--color-ink)",
              color: "transparent",
            }}
          >
            crafted.
          </span>
        </h1>

        <p
          className="animate-rise mt-9 max-w-md text-lg leading-relaxed text-ink/65"
          style={{ animationDelay: "480ms" }}
        >
          {MISSION}
        </p>
      </div>

      {/* The shelf. Packs are cropped by the section edge so the row reads as
          continuing past the fold, which is also the scroll invitation. */}
      <div className="relative mt-10 h-[clamp(120px,19vw,250px)]">
        {/* Six packs do not fit a phone at a readable size. Rather than shrink them
            to thumbnails or clip the outer two out of reach, the row scrolls
            below sm and centres once there is room. */}
        <ul className="scrollbar-none absolute inset-x-0 bottom-0 flex snap-x items-end gap-[1.5vw] overflow-x-auto px-4 sm:justify-center sm:overflow-visible">
          {products.map((product, i) => {
            if (!product.featuredImage) return null;
            const accent = ACCENT_HEX[accentFor(product.handle)];

            return (
              <li key={product.handle} className="shrink-0 snap-center">
                <Link
                  href={`/products/${product.handle}`}
                  className="group block"
                  style={{ ["--accent" as string]: accent }}
                >
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText ?? `${product.title} 250 g pack`}
                    width={product.featuredImage.width}
                    height={product.featuredImage.height}
                    priority={i < 3}
                    sizes="(max-width: 640px) 22vw, 15vw"
                    className={`animate-rise ${packClassName(product.handle)} h-[clamp(130px,20vw,270px)] w-auto origin-bottom transition-transform duration-500 ease-[var(--ease-brand)] group-hover:-translate-y-3`}
                    style={{
                      animationDelay: `${600 + i * 80}ms`,
                      // Alternating drop, so the row reads as an arrangement
                      // rather than a grid of equal boxes.
                      marginBottom: i % 2 === 1 ? "-1.6vw" : "0",
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <p
          className="animate-rise absolute right-5 bottom-6 hidden items-center gap-3 font-numeral text-[0.6rem] uppercase tracking-[0.28em] text-ink/35 sm:right-8 lg:flex"
          style={{ animationDelay: "900ms" }}
        >
          Scroll
          <span className="h-px w-12 bg-ink/20" />
        </p>
      </div>
    </section>
  );
}

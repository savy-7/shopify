import Image from "next/image";
import Link from "next/link";
import { getProductByHandle } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/format";

/** The pack shown in the hero. Almonds is the one SKU currently priced and in stock. */
const HERO_PRODUCT_HANDLE = "premium-almonds";

/** Split across lines so each can rise independently. */
const HEADLINE_LINES = [
  ["Crafting"],
  ["goodness", { highlight: true }],
  ["in every bite."],
] as const;

export default async function Hero() {
  const product = await getProductByHandle(HERO_PRODUCT_HANDLE);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-14 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-20 lg:pb-24">
        <div>
          <p
            className="animate-rise font-numeral text-[0.7rem] uppercase tracking-[0.3em] text-ink/50"
            style={{ animationDelay: "0ms" }}
          >
            Goodness Crafted — est. India
          </p>

          <h1 className="mt-6 font-display text-[3.25rem] leading-[0.95] font-extrabold tracking-[-0.03em] sm:text-7xl lg:text-[5.25rem]">
            {HEADLINE_LINES.map(([text, opts], i) => (
              <span
                key={text}
                className="animate-rise block"
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                {opts?.highlight ? (
                  <span className="relative inline-block">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[-0.1em] top-[0.2em] bottom-[0.1em] -rotate-1 bg-lime"
                    />
                    <span className="relative">{text}</span>
                  </span>
                ) : (
                  text
                )}
              </span>
            ))}
          </h1>

          <p
            className="animate-rise mt-7 max-w-md text-lg leading-relaxed text-ink/70"
            style={{ animationDelay: "420ms" }}
          >
            Premium almonds, cashews, pistachios, dates and crafted mixes —
            selected with care and packed fresh in 250&nbsp;g.
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "510ms" }}
          >
            <Link
              href="/shop"
              className="rounded-full bg-ink px-8 py-4 text-sm font-semibold text-paper transition-transform duration-300 ease-out hover:scale-[1.04]"
            >
              Shop the range
            </Link>

            {product && (
              <Link
                href={`/products/${product.handle}`}
                className="text-sm font-semibold underline decoration-ink/25 underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                Start with {product.title}
              </Link>
            )}
          </div>

          <ul
            className="animate-rise mt-10 flex flex-wrap gap-2.5"
            style={{ animationDelay: "600ms" }}
          >
            {["250 g packs", "Resealable zip pack"].map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-ink/15 px-4 py-1.5 font-numeral text-[0.7rem] uppercase tracking-[0.18em] text-ink/65"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Pack stage. The colour block is deliberately a light tint: pack shots
            carry an opaque near-white backdrop that `pack-blend` multiplies
            away, which only reads correctly over light surfaces. */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div className="absolute inset-x-0 top-8 bottom-0 rounded-[2.5rem] bg-cashew/45" />

          {product?.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? `${product.title} 250 g pack`}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
              priority
              sizes="(max-width: 1024px) 75vw, 460px"
              style={{ ["--float-tilt" as string]: "-2.5deg" }}
              className="pack-blend animate-float relative z-10 mx-auto w-full max-w-[380px] lg:max-w-[460px]"
            />
          ) : (
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[380px] lg:max-w-[460px]" />
          )}

          {/* Seals sit above the pack: `pack-blend` would otherwise multiply
              them into the artwork and dull the colour. */}
          <div className="absolute top-1 right-0 z-20 flex h-20 w-20 -rotate-8 items-center justify-center rounded-full bg-lime text-center sm:h-24 sm:w-24">
            <span className="font-numeral text-[0.6rem] leading-tight font-medium uppercase tracking-[0.15em] text-ink">
              100%
              <br />
              Veg
            </span>
          </div>

          {product && (
            <div className="absolute bottom-4 left-0 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-ink text-center sm:h-28 sm:w-28">
              <span className="font-numeral text-[0.6rem] uppercase tracking-[0.2em] text-paper/60">
                From
              </span>
              <span className="font-display text-xl font-extrabold text-paper">
                {formatMoney(product.priceRange.minVariantPrice)}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

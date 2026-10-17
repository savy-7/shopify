import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Botanical from "@/components/ui/Botanical";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format";

/**
 * Festive hampers. Takes whichever hampers Shopify has published — when
 * there are none it still runs, as a teaser for the gifting page, so the
 * section never claims something is for sale that isn't.
 */
export default function Gifting({ hampers = [] }: { hampers?: Product[] }) {
  const onSale = hampers.filter((h) => h.availableForSale);
  const from = onSale
    .map((h) => Number(h.priceRange.minVariantPrice.amount))
    .filter((amount) => amount > 0)
    .sort((a, b) => a - b)[0];
  const fromLabel =
    from !== undefined
      ? formatMoney({ amount: String(from), currencyCode: onSale[0].priceRange.minVariantPrice.currencyCode })
      : null;

  return (
    <section className="relative overflow-hidden bg-olive text-paper">
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative mx-auto max-w-[110rem] px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-paper/60">
              Festive gifting
            </p>
            <Botanical name="sprig-pair" className="mt-5 h-[12px] w-[120px] text-paper/40" />
            <h2 className="mt-6 text-[2.4rem] leading-[0.95] font-semibold tracking-[-0.012em] sm:text-5xl lg:text-[3.4rem]">
              Hampers for{" "}
              <span className="font-serif font-normal italic">Diwali.</span>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-paper/80">
              Four premium packs, boxed in an elegant gift case with gold
              accents. Made for celebrations, family, and corporate gifting.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/gifting"
                className="rounded-full bg-paper px-8 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-ink transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
              >
                {fromLabel ? "Shop the hampers" : "See the hampers"}
              </Link>
              {fromLabel && (
                <p className="font-numeral text-[0.7rem] uppercase tracking-[0.18em] text-paper/70">
                  From {fromLabel}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <Link href="/gifting" className="group block">
              <Image
                src="/brand/hampers-diwali.webp"
                alt="Goodness Crafted festive hampers: four premium 250 g packs boxed in a gold-trimmed gift case"
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 92vw, 640px"
                className="w-full rounded-[1.75rem] shadow-[0_30px_70px_-45px_rgb(0_0_0/0.7)] transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.02]"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

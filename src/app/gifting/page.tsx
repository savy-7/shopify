import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Botanical from "@/components/ui/Botanical";
import ProductCard from "@/components/product/ProductCard";
import WaitlistForm from "@/components/gifting/WaitlistForm";
import { getProducts } from "@/lib/shopify/products";
import { isPack } from "@/lib/brand/palette";

export const metadata: Metadata = {
  title: "Gifting & Hampers",
  description:
    "Festive hampers from Goodness Crafted — four premium packs, boxed and ready to gift. Made for Diwali, celebrations and corporate gifting.",
};

/**
 * Hampers. The ones Shopify has published are sold here like any other
 * product; the rest are named honestly as still to come, with a waitlist
 * rather than a button that goes nowhere.
 */
export default async function GiftingPage() {
  const hampers = (await getProducts()).filter((product) => !isPack(product.handle));

  return (
    <div>
      <header className="mx-auto max-w-[110rem] px-5 pt-16 sm:px-8 lg:pt-24">
        <p className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
          Festive gifting
        </p>
        <Botanical
          name="sprig-pair"
          className="animate-rise mt-5 h-[12px] w-[120px] text-ink/25"
          style={{ animationDelay: "40ms" }}
        />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h1
            className="animate-rise max-w-3xl text-[2.8rem] leading-[0.92] font-semibold tracking-[-0.015em] sm:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            Gifting &amp;{" "}
            <span className="font-serif font-normal italic text-olive-deep">hampers.</span>
          </h1>
          <p
            className="animate-rise text-lg leading-relaxed text-ink/70"
            style={{ animationDelay: "170ms" }}
          >
            Four premium packs, boxed in an elegant gift case with gold accents.
            Made for Diwali, for celebrations, and for corporate gifting.
          </p>
        </div>
      </header>

      {/* The hampers as photographed for this year's festive range. Prices and
          contents are part of the artwork, so nothing is overlaid on it. */}
      <section className="mx-auto mt-12 max-w-[110rem] px-5 sm:px-8 lg:mt-16">
        <Reveal>
          <Image
            src="/brand/hampers-diwali.webp"
            alt="Two Goodness Crafted hampers: Signature Selection with nuts and seeds mix, pistachios, cashews and almonds at ₹1,799, and Festive Delight with almonds, raisins, nuts and seeds mix and cashews at ₹1,399. Four 250 g packs each, in a gold-trimmed gift box."
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="w-full rounded-[2rem] shadow-[0_30px_70px_-50px_color-mix(in_oklab,var(--color-ink)_70%,transparent)]"
          />
        </Reveal>
      </section>

      {/* Whatever is actually purchasable. */}
      {hampers.length > 0 && (
        <section className="mx-auto mt-16 max-w-[110rem] px-5 sm:px-8 lg:mt-20">
          <Reveal className="border-b border-ink/10 pb-6">
            <h2 className="text-[1.8rem] leading-[1] font-semibold tracking-[-0.012em] sm:text-4xl">
              Available now
            </h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {hampers.map((hamper, i) => (
              <Reveal as="li" key={hamper.handle} delay={i * 110}>
                <ProductCard product={hamper} priority={i === 0} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {/* Still to come. */}
      <section className="mx-auto mt-20 max-w-[110rem] px-5 sm:px-8 lg:mt-28">
        <div className="rounded-[2rem] bg-stone px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <Reveal className="max-w-xl">
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
              In preparation
            </p>
            <h2 className="mt-5 text-[1.8rem] leading-[1.05] font-semibold tracking-[-0.012em] sm:text-4xl">
              More hampers,{" "}
              <span className="font-serif font-normal italic text-ink/50">on the way.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-ink/65">
              We&rsquo;re putting together more combinations of the range,
              including larger sets for corporate gifting. Leave your email and
              we&rsquo;ll tell you the moment they&rsquo;re ready.
            </p>
            <div className="mt-8">
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-[110rem] px-5 pb-24 sm:px-8 lg:pb-32">
        <Reveal>
          <Link
            href="/shop"
            className="font-numeral text-[0.68rem] uppercase tracking-[0.2em] underline decoration-ink/25 underline-offset-[7px] transition-colors hover:decoration-ink"
          >
            Or shop the packs individually
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

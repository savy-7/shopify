import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/product/ProductCard";
import Botanical from "@/components/ui/Botanical";
import type { Product } from "@/lib/shopify/types";

export default function Range({ products }: { products: Product[] }) {
  return (
    <section id="range" className="mx-auto max-w-[110rem] px-5 py-24 sm:px-8 lg:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-8">
        <div>
          <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
            The range
          </p>
          <Botanical name="sprig-pair" className="mt-4 h-[12px] w-[120px] text-ink/25" />
          <h2 className="mt-5 text-[2.4rem] leading-[0.95] font-semibold tracking-[-0.012em] sm:text-5xl">
            Six packs. One standard.
          </h2>
        </div>

        <Link
          href="/shop"
          className="font-numeral text-[0.68rem] uppercase tracking-[0.2em] underline decoration-ink/25 underline-offset-[7px] transition-colors hover:decoration-ink"
        >
          View all
        </Link>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
        {products.map((product, i) => (
          <Reveal as="li" key={product.handle} delay={(i % 3) * 110}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

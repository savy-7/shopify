import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/product/ProductCard";
import { getProducts, orderProducts } from "@/lib/shopify/products";
import { INTRO } from "@/lib/brand/content";

export const metadata: Metadata = {
  title: "Shop",
  description: INTRO,
};

export default async function ShopPage() {
  const products = orderProducts(await getProducts(48));

  return (
    <div className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 lg:py-24">
      <header className="border-b border-ink/10 pb-10">
        <p className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
          The range — {String(products.length).padStart(2, "0")} products
        </p>
        <h1
          className="animate-rise mt-6 text-[2.8rem] leading-[0.92] font-semibold tracking-[-0.015em] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "90ms" }}
        >
          Everything we{" "}
          <span className="font-serif font-normal italic text-ink/45">make.</span>
        </h1>
        <p
          className="animate-rise mt-7 max-w-xl leading-relaxed text-ink/65"
          style={{ animationDelay: "170ms" }}
        >
          {INTRO}
        </p>
      </header>

      {products.length === 0 ? (
        <p className="py-24 text-center text-ink/50">
          Products are temporarily unavailable. Please try again shortly.
        </p>
      ) : (
        <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product, i) => (
            <Reveal as="li" key={product.handle} delay={(i % 3) * 110}>
              <ProductCard product={product} priority={i < 3} />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}

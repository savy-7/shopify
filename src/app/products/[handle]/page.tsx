import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/product/ProductCard";
import BuyBar from "@/components/product/BuyBar";
import ProductGallery from "@/components/product/ProductGallery";
import { getProductByHandle, getProducts, orderProducts } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/format";
import {
  ACCENT_HEX,
  ACCENT_TEXT_HEX,
  SPECIMEN_ORDER,
  accentFor,
} from "@/lib/brand/palette";

export function generateStaticParams() {
  return SPECIMEN_ORDER.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description.slice(0, 200) || undefined,
    openGraph: {
      title: product.title,
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[handle]">) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const accent = accentFor(product.handle);
  const accentHex = ACCENT_HEX[accent];
  const accentInk = ACCENT_TEXT_HEX[accent];

  const variant = product.variants.edges[0]?.node;
  const amount = Number(product.priceRange.minVariantPrice.amount);
  const images = product.images.edges.map((e) => e.node);

  const related = orderProducts(await getProducts(24)).filter(
    (p) => p.handle !== product.handle
  );

  return (
    <div
      style={{
        ["--accent" as string]: accentHex,
        ["--accent-ink" as string]: accentInk,
      }}
    >
      <div className="mx-auto max-w-[110rem] px-5 pt-8 sm:px-8">
        <Link
          href="/shop"
          className="font-numeral text-[0.66rem] uppercase tracking-[0.22em] text-ink/45 transition-colors hover:text-ink"
        >
          &larr; All products
        </Link>
      </div>

      <div className="mx-auto grid max-w-[110rem] gap-12 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-14">
        <ProductGallery
          images={images}
          handle={product.handle}
          title={product.title}
          accent={accentHex}
        />

        {/* Info. Sticks alongside the gallery on desktop so the buy action stays
            reachable while the images scroll. */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="font-numeral text-[0.66rem] uppercase tracking-[0.26em] text-ink/45">
            Net wt. 250 g — 100% veg
          </p>

          <h1 className="mt-5 text-[2.4rem] leading-[0.95] font-semibold tracking-[-0.012em] sm:text-5xl">
            {product.title}
          </h1>

          <p
            className="mt-6 font-numeral text-3xl font-bold tabular-nums"
            style={{ color: "var(--accent-ink)" }}
          >
            {amount > 0 ? formatMoney(product.priceRange.minVariantPrice) : "Price coming soon"}
          </p>

          {variant && amount > 0 ? (
            <BuyBar
              variantId={variant.id}
              available={product.availableForSale}
              accentInk={accentInk}
            />
          ) : (
            <div className="mt-9 rounded-full border border-ink/15 px-7 py-4 text-center font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-ink/45">
              Not yet available
            </div>
          )}

          <p className="mt-4 font-numeral text-[0.6rem] uppercase tracking-[0.18em] text-ink/35">
            Secure checkout on Shopify
          </p>

          {product.descriptionHtml ? (
            <div
              className="prose-brand mt-12 border-t border-ink/10 pt-10"
              // Merchant-authored content from their own Shopify admin.
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="mt-12 border-t border-ink/10 pt-10 text-ink/50">
              A full description for this product is coming soon.
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-[110rem] px-5 py-20 sm:px-8 lg:py-28">
          <Reveal className="border-b border-ink/10 pb-8">
            <h2 className="text-[2rem] leading-[0.95] font-semibold tracking-[-0.005em] sm:text-4xl">
              More from the range
            </h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {related.slice(0, 4).map((item, i) => (
              <Reveal as="li" key={item.handle} delay={i * 100}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

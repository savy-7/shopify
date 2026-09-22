import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import {
  ACCENT_HEX,
  ACCENT_TEXT_HEX,
  accentFor,
  packClassName,
  shortNameFor,
} from "@/lib/brand/palette";
import { formatMoney } from "@/lib/format";
import NutIcon, { iconForHandle } from "@/components/ui/NutIcon";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const accent = accentFor(product.handle);
  const amount = Number(product.priceRange.minVariantPrice.amount);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      style={{
        ["--accent" as string]: ACCENT_HEX[accent],
        ["--accent-ink" as string]: ACCENT_TEXT_HEX[accent],
      }}
    >
      {/* The tint is mixed toward paper rather than set as a flat alpha, so the
          panel stays light enough for the pack's multiply composite to work. */}
      <div
        className="relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[1.75rem] transition-colors duration-500 ease-[var(--ease-brand)]"
        style={{
          backgroundColor: "color-mix(in oklab, var(--accent) 9%, var(--color-paper))",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-4 left-5 flex items-center gap-2 font-numeral text-[0.6rem] uppercase tracking-[0.2em] opacity-60"
          style={{ color: "var(--accent-ink)" }}
        >
          <NutIcon
            name={iconForHandle(product.handle)}
            className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:rotate-12"
            strokeWidth={1.5}
          />
          {shortNameFor(product.handle, product.title)}
        </span>

        {!product.availableForSale && (
          <span className="absolute top-4 right-5 rounded-full bg-ink/85 px-2.5 py-1 font-numeral text-[0.55rem] uppercase tracking-[0.15em] text-paper">
            Restocking
          </span>
        )}

        {product.featuredImage && (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? `${product.title} 250 g pack`}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            priority={priority}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            className={`${packClassName(product.handle)} h-[86%] w-auto object-contain transition-transform duration-600 ease-[var(--ease-brand)] group-hover:-translate-y-2 group-hover:scale-[1.03]`}
          />
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-base font-bold tracking-[-0.015em]">
          {product.title}
        </h3>
        <p className="shrink-0 font-numeral text-sm tabular-nums" style={{ color: "var(--accent-ink)" }}>
          {amount > 0 ? formatMoney(product.priceRange.minVariantPrice) : "Soon"}
        </p>
      </div>
      <p className="mt-1 font-numeral text-[0.62rem] uppercase tracking-[0.18em] text-ink/35">
        250 g
      </p>
    </Link>
  );
}

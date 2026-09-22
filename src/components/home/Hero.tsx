import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/shopify/types";
import {
  ACCENT_HEX,
  ACCENT_TEXT_HEX,
  accentFor,
  packClassName,
  shortNameFor,
} from "@/lib/brand/palette";
import HeroSpecimen, { type Specimen } from "./HeroSpecimen";

export default function Hero({ products }: { products: Product[] }) {
  const specimens: Specimen[] = products.map((product) => {
    const amount = Number(product.priceRange.minVariantPrice.amount);
    const accent = accentFor(product.handle);

    return {
      handle: product.handle,
      title: product.title,
      shortName: shortNameFor(product.handle, product.title),
      accent: ACCENT_HEX[accent],
      accentInk: ACCENT_TEXT_HEX[accent],
      available: product.availableForSale,
      packClass: packClassName(product.handle),
      // Four SKUs are still priced at 0 in Shopify. Showing "₹0" would be worse
      // than showing nothing, so the badge falls back until they're set.
      price: amount > 0 ? formatMoney(product.priceRange.minVariantPrice) : null,
      image: product.featuredImage
        ? {
            url: product.featuredImage.url,
            width: product.featuredImage.width,
            height: product.featuredImage.height,
            alt: product.featuredImage.altText ?? `${product.title} 250 g pack`,
          }
        : null,
    };
  });

  if (specimens.length === 0) return null;

  return <HeroSpecimen specimens={specimens} />;
}

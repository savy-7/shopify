import { getProducts } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/format";
import {
  ACCENT_HEX,
  ACCENT_TEXT_HEX,
  SPECIMEN_ORDER,
  accentFor,
  shortNameFor,
} from "@/lib/brand/palette";
import HeroSpecimen, { type Specimen } from "./HeroSpecimen";

export default async function Hero() {
  const products = await getProducts(24);
  const byHandle = new Map(products.map((p) => [p.handle, p]));

  const specimens: Specimen[] = SPECIMEN_ORDER.flatMap((handle) => {
    const product = byHandle.get(handle);
    if (!product) return [];

    const amount = Number(product.priceRange.minVariantPrice.amount);
    const accent = accentFor(handle);

    return [
      {
        handle,
        title: product.title,
        shortName: shortNameFor(handle, product.title),
        accent: ACCENT_HEX[accent],
        accentInk: ACCENT_TEXT_HEX[accent],
        available: product.availableForSale,
        // Four SKUs are still priced at 0 in Shopify. Showing "₹0" would be
        // worse than showing nothing, so the badge falls back until they're set.
        price: amount > 0 ? formatMoney(product.priceRange.minVariantPrice) : null,
        image: product.featuredImage
          ? {
              url: product.featuredImage.url,
              width: product.featuredImage.width,
              height: product.featuredImage.height,
              alt: product.featuredImage.altText ?? `${product.title} 250 g pack`,
            }
          : null,
      },
    ];
  });

  if (specimens.length === 0) return null;

  return <HeroSpecimen specimens={specimens} />;
}

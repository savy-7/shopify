import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/shopify/types";
import {
  ACCENT_HEX,
  ACCENT_TEXT_HEX,
  accentFor,
  botanicalFor,
  packClassName,
  shortNameFor,
} from "@/lib/brand/palette";
import SpecimenPlate, { type Specimen } from "./SpecimenPlate";

export default function Specimens({ products }: { products: Product[] }) {
  const specimens: Specimen[] = products.map((product) => {
    const amount = Number(product.priceRange.minVariantPrice.amount);
    const accent = accentFor(product.handle);

    return {
      handle: product.handle,
      title: product.title,
      shortName: shortNameFor(product.handle, product.title),
      botanical: botanicalFor(product.handle),
      accent: ACCENT_HEX[accent],
      accentInk: ACCENT_TEXT_HEX[accent],
      available: product.availableForSale,
      packClass: packClassName(product.handle),
      // Unpriced SKUs read as ₹0 in Shopify. Showing that would be worse than
      // showing nothing, so the caption falls back until a price is set.
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

  return <SpecimenPlate specimens={specimens} />;
}

import { NextResponse } from "next/server";
import { getProducts, orderProducts } from "@/lib/shopify/products";
import { accentFor, shortNameFor, packClassName, ACCENT_HEX } from "@/lib/brand/palette";
import { formatMoney } from "@/lib/format";

/**
 * The whole catalogue is seven products, so search runs client-side against
 * this one small payload rather than round-tripping a query to Shopify on
 * every keystroke. Reuses the same cached product fetch (and therefore the
 * same freshness window) as the rest of the site — see PRODUCTS_TAG.
 */
export async function GET() {
  const products = orderProducts(await getProducts());

  const results = products.map((product) => ({
    handle: product.handle,
    title: product.title,
    shortName: shortNameFor(product.handle, product.title),
    accent: ACCENT_HEX[accentFor(product.handle)],
    packClass: packClassName(product.handle),
    image: product.featuredImage,
    price:
      Number(product.priceRange.minVariantPrice.amount) > 0
        ? formatMoney(product.priceRange.minVariantPrice)
        : null,
    availableForSale: product.availableForSale,
  }));

  return NextResponse.json({ results });
}

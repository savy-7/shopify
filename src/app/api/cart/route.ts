import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify/cart";
import { CART_COOKIE_NAME } from "@/lib/shopify/cart-cookie";

/**
 * The one deliberately dynamic read in the app. `CartProvider` calls this on
 * mount to pick up whatever cart the visitor's cookie points at.
 *
 * Isolated in its own route rather than read in the root layout, so this is
 * the only thing that opts out of caching — every page keeps the static/SSG
 * generation that would otherwise be lost if `cookies()` were called
 * somewhere every route depends on.
 */
export async function GET() {
  const store = await cookies();
  const cartId = store.get(CART_COOKIE_NAME)?.value;
  const cart = cartId ? await getCart(cartId) : null;

  return NextResponse.json({ cart }, { headers: { "Cache-Control": "no-store" } });
}

"use server";

import { cookies } from "next/headers";
import { addCartLine, createCart, removeCartLine, updateCartLine } from "@/lib/shopify/cart";
import { CART_COOKIE_NAME, CART_COOKIE_MAX_AGE } from "@/lib/shopify/cart-cookie";
import type { Cart } from "@/lib/shopify/types";

async function readCartId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE_NAME)?.value ?? null;
}

async function writeCartId(cartId: string) {
  const store = await cookies();
  store.set(CART_COOKIE_NAME, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_COOKIE_MAX_AGE,
  });
}

async function clearCartId() {
  const store = await cookies();
  store.delete(CART_COOKIE_NAME);
}

export type CartActionResult = { cart: Cart | null; error: string | null };

/**
 * Every mutation is called directly from a client component (the cart
 * drawer, the product page's buy bar, a card's quick-add), each wrapped in
 * its own `useTransition`. The updated cart comes back as the action's
 * return value — the client syncs its own state from that rather than
 * relying on a full page re-render, since the drawer needs to update without
 * navigating away from wherever the visitor is.
 */
export async function addToCart(
  merchandiseId: string,
  quantity: number
): Promise<CartActionResult> {
  const cartId = await readCartId();

  if (!cartId) {
    const result = await createCart(merchandiseId, quantity);
    if (result.cart) await writeCartId(result.cart.id);
    return result;
  }

  const result = await addCartLine(cartId, merchandiseId, quantity);
  if (result.cart) return result;

  // The cookie's cart id is stale — expired, or completed at checkout.
  // Starting a fresh cart is the correct recovery, not a hard failure.
  const fresh = await createCart(merchandiseId, quantity);
  if (fresh.cart) await writeCartId(fresh.cart.id);
  return fresh;
}

export async function changeCartLineQuantity(
  lineId: string,
  quantity: number
): Promise<CartActionResult> {
  const cartId = await readCartId();
  if (!cartId) return { cart: null, error: "Your cart has expired. Please add the item again." };

  if (quantity <= 0) {
    return removeCartLine(cartId, lineId);
  }
  return updateCartLine(cartId, lineId, quantity);
}

export async function removeFromCart(lineId: string): Promise<CartActionResult> {
  const cartId = await readCartId();
  if (!cartId) return { cart: null, error: "Your cart has expired." };
  return removeCartLine(cartId, lineId);
}

/** Not currently wired to a control, but the clean way to abandon a broken cart. */
export async function resetCart() {
  await clearCartId();
}

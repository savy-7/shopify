import { shopifyFetch } from "./client";
import {
  CART_QUERY,
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from "./cart-queries";
import type { Cart } from "./types";

/**
 * A cart is per-visitor and changes on every mutation, so none of these calls
 * are cached — `revalidate: 0` marks the request dynamic, the same effect as
 * `cache: "no-store"`.
 */
const DYNAMIC = 0;

type UserError = { field: string[] | null; message: string };

function firstError(userErrors: UserError[]): string | null {
  return userErrors[0]?.message ?? null;
}

/**
 * The store ships to India only, so every cart is created with that buyer
 * identity up front — it affects tax and any future country-specific pricing,
 * and matches the Shopify-side shipping restriction rather than fighting it.
 */
const BUYER_COUNTRY = "IN";

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<{ cart: Cart | null }, { id: string }>({
      query: CART_QUERY,
      variables: { id: cartId },
      revalidate: DYNAMIC,
    });
    return data.cart;
  } catch (error) {
    // A cart id from an old cookie can point at an expired or deleted cart.
    // Treating that as "no cart" lets the caller start a fresh one instead of
    // failing the page.
    console.error(`[shopify] getCart(${cartId}) failed:`, error);
    return null;
  }
}

export async function createCart(
  merchandiseId: string,
  quantity: number
): Promise<{ cart: Cart | null; error: string | null }> {
  try {
    const data = await shopifyFetch<
      { cartCreate: { cart: Cart | null; userErrors: UserError[] } },
      { lines: { merchandiseId: string; quantity: number }[]; countryCode: string }
    >({
      query: CART_CREATE_MUTATION,
      variables: { lines: [{ merchandiseId, quantity }], countryCode: BUYER_COUNTRY },
      revalidate: DYNAMIC,
    });
    return {
      cart: data.cartCreate.cart,
      error: firstError(data.cartCreate.userErrors),
    };
  } catch (error) {
    console.error("[shopify] createCart failed:", error);
    return { cart: null, error: "Could not create cart. Please try again." };
  }
}

export async function addCartLine(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<{ cart: Cart | null; error: string | null }> {
  try {
    const data = await shopifyFetch<
      { cartLinesAdd: { cart: Cart | null; userErrors: UserError[] } },
      { cartId: string; lines: { merchandiseId: string; quantity: number }[] }
    >({
      query: CART_LINES_ADD_MUTATION,
      variables: { cartId, lines: [{ merchandiseId, quantity }] },
      revalidate: DYNAMIC,
    });
    return {
      cart: data.cartLinesAdd.cart,
      error: firstError(data.cartLinesAdd.userErrors),
    };
  } catch (error) {
    console.error(`[shopify] addCartLine(${cartId}) failed:`, error);
    return { cart: null, error: "Could not add that item. Please try again." };
  }
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<{ cart: Cart | null; error: string | null }> {
  try {
    const data = await shopifyFetch<
      { cartLinesUpdate: { cart: Cart | null; userErrors: UserError[] } },
      { cartId: string; lines: { id: string; quantity: number }[] }
    >({
      query: CART_LINES_UPDATE_MUTATION,
      variables: { cartId, lines: [{ id: lineId, quantity }] },
      revalidate: DYNAMIC,
    });
    return {
      cart: data.cartLinesUpdate.cart,
      error: firstError(data.cartLinesUpdate.userErrors),
    };
  } catch (error) {
    console.error(`[shopify] updateCartLine(${cartId}) failed:`, error);
    return { cart: null, error: "Could not update quantity. Please try again." };
  }
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<{ cart: Cart | null; error: string | null }> {
  try {
    const data = await shopifyFetch<
      { cartLinesRemove: { cart: Cart | null; userErrors: UserError[] } },
      { cartId: string; lineIds: string[] }
    >({
      query: CART_LINES_REMOVE_MUTATION,
      variables: { cartId, lineIds: [lineId] },
      revalidate: DYNAMIC,
    });
    return {
      cart: data.cartLinesRemove.cart,
      error: firstError(data.cartLinesRemove.userErrors),
    };
  } catch (error) {
    console.error(`[shopify] removeCartLine(${cartId}) failed:`, error);
    return { cart: null, error: "Could not remove that item. Please try again." };
  }
}

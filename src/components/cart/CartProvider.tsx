"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { addToCart, changeCartLineQuantity, removeFromCart } from "@/app/cart/actions";
import type { Cart } from "@/lib/shopify/types";

type CartContextValue = {
  cart: Cart | null;
  /** False until the initial /api/cart fetch resolves — lets the header badge
   *  avoid flashing "0" before the real count is known. */
  hasLoaded: boolean;
  isOpen: boolean;
  /** True while any mutation is in flight — used to disable buttons globally. */
  isPending: boolean;
  /** Line ids currently being changed, so only that row shows a local spinner. */
  pendingLineIds: Set<string>;
  error: string | null;
  open: () => void;
  close: () => void;
  addItem: (merchandiseId: string, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [pendingLineIds, setPendingLineIds] = useState<Set<string>>(new Set());

  // Picks up whatever cart the visitor's cookie points at. Kept out of the
  // root layout (see /api/cart) so the rest of the app stays statically
  // generated; the cost is this one client round trip on first load.
  useEffect(() => {
    let cancelled = false;

    fetch("/api/cart", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { cart: Cart | null }) => {
        if (cancelled) return;
        setCart(data.cart);
        setHasLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setHasLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const markPending = (lineId: string, pending: boolean) => {
    setPendingLineIds((current) => {
      const next = new Set(current);
      if (pending) next.add(lineId);
      else next.delete(lineId);
      return next;
    });
  };

  const addItem = useCallback(
    (merchandiseId: string, quantity = 1) => {
      setError(null);
      // Captured before the mutation: if this item is already in the cart,
      // Shopify returns the line's new *total*, not how much this call
      // actually added, so the shortfall has to be worked out from the delta.
      const previousQuantity =
        cart?.lines.edges.find((e) => e.node.merchandise.id === merchandiseId)?.node.quantity ?? 0;

      startTransition(async () => {
        const result = await addToCart(merchandiseId, quantity);
        if (result.cart) {
          setCart(result.cart);
          setHasLoaded(true);
          setIsOpen(true);

          // Same silent inventory cap as updateQuantity: Shopify adds as many
          // as are in stock and returns no userError for the shortfall.
          const line = result.cart.lines.edges.find(
            (e) => e.node.merchandise.id === merchandiseId
          )?.node;
          const added = (line?.quantity ?? 0) - previousQuantity;
          if (line && added < quantity) {
            setError(
              line.quantity > previousQuantity
                ? `Only ${line.quantity - previousQuantity} more available for ${line.merchandise.product.title}.`
                : `${line.merchandise.product.title} just sold out.`
            );
          }
        } else if (result.error) {
          setError(result.error);
        }
      });
    },
    [cart]
  );

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setError(null);
    markPending(lineId, true);
    startTransition(async () => {
      const result = await changeCartLineQuantity(lineId, quantity);
      if (result.cart) {
        setCart(result.cart);

        // Shopify caps a line at available inventory without a userError —
        // it just returns the cart with the quantity unchanged. Silently
        // doing nothing on a click reads as broken, so the mismatch is
        // surfaced as the same inline note a real error would show.
        const line = result.cart.lines.edges.find((e) => e.node.id === lineId)?.node;
        if (line && quantity > 0 && line.quantity < quantity) {
          setError(
            line.quantity > 0
              ? `Only ${line.quantity} left in stock for ${line.merchandise.product.title}.`
              : `${line.merchandise.product.title} just sold out.`
          );
        }
      } else if (result.error) {
        setError(result.error);
      }
      markPending(lineId, false);
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setError(null);
    markPending(lineId, true);
    startTransition(async () => {
      const result = await removeFromCart(lineId);
      if (result.cart) setCart(result.cart);
      else if (result.error) setError(result.error);
      markPending(lineId, false);
    });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        hasLoaded,
        isOpen,
        isPending,
        pendingLineIds,
        error,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        addItem,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

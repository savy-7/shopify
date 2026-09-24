"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/format";
import { ACCENT_HEX, accentFor, packClassName } from "@/lib/brand/palette";
import NutIcon, { iconForHandle } from "@/components/ui/NutIcon";

export default function CartDrawer() {
  const { cart, isOpen, isPending, pendingLineIds, error, close, updateQuantity, removeItem } =
    useCart();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Escape closes the drawer, and body scroll is locked while it's open —
  // otherwise the page behind it scrolls along with the line-item list.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    headingRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close]);

  const lines = cart?.lines.edges.map((edge) => edge.node) ?? [];
  const isEmpty = lines.length === 0;

  return (
    // `inset-0` covers the full viewport even while visually hidden — a plain
    // div still captures hit-testing at opacity 0, so without this the closed
    // drawer silently blocks every click on the rest of the site underneath it.
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-500 ease-[var(--ease-brand)] ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-500 ease-[var(--ease-brand)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-lg font-extrabold tracking-[-0.02em] outline-none"
          >
            Your cart{cart && cart.totalQuantity > 0 ? ` (${cart.totalQuantity})` : ""}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
          >
            ✕
          </button>
        </div>

        {error && (
          <p className="border-b border-ink/10 bg-mix/10 px-6 py-3 text-sm text-mix">{error}</p>
        )}

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-ink/50">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={close}
              className="rounded-full bg-ink px-7 py-3.5 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper"
            >
              Shop the range
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
            {lines.map((line) => {
              const handle = line.merchandise.product.handle;
              const accent = ACCENT_HEX[accentFor(handle)];
              const image = line.merchandise.product.featuredImage;
              const rowPending = pendingLineIds.has(line.id);

              return (
                <li key={line.id} className="flex gap-4 py-5">
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${accent} 9%, var(--color-paper))`,
                    }}
                  >
                    {image && (
                      <Image
                        src={image.url}
                        alt={image.altText ?? line.merchandise.product.title}
                        width={image.width}
                        height={image.height}
                        sizes="80px"
                        className={`${packClassName(handle)} h-[88%] w-auto object-contain`}
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="flex items-center gap-1.5 font-display text-sm font-bold tracking-[-0.01em]">
                          <NutIcon
                            name={iconForHandle(handle)}
                            className="h-3.5 w-3.5 shrink-0"
                            strokeWidth={1.5}
                            style={{ color: accent }}
                          />
                          {line.merchandise.product.title}
                        </p>
                        <p className="mt-0.5 font-numeral text-xs text-ink/40">250 g</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        disabled={rowPending}
                        aria-label={`Remove ${line.merchandise.product.title}`}
                        className="font-numeral text-[0.62rem] uppercase tracking-[0.15em] text-ink/40 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          disabled={rowPending}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-ink/5 disabled:opacity-30"
                        >
                          &minus;
                        </button>
                        <span className="w-6 text-center font-numeral text-xs tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          disabled={rowPending || line.quantity >= 20}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-sm transition-colors hover:bg-ink/5 disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-numeral text-sm tabular-nums">
                        {formatMoney(line.cost.totalAmount)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {!isEmpty && cart && (
          <div className="border-t border-ink/10 px-6 py-5">
            <div className="flex items-center justify-between font-numeral text-sm">
              <span className="text-ink/50 uppercase tracking-[0.15em]">Subtotal</span>
              <span className="text-base font-bold tabular-nums">
                {formatMoney(cart.cost.subtotalAmount)}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-ink/40">
              Shipping and taxes calculated at checkout. Ships within India only.
            </p>

            <a
              href={cart.checkoutUrl}
              className="mt-5 block rounded-full bg-ink px-7 py-4 text-center font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-90"
              aria-disabled={isPending}
            >
              Checkout — {formatMoney(cart.cost.totalAmount)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import Search from "./Search";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/gifting", label: "Gifting" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, hasLoaded, open: openCart } = useCart();
  const quantity = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Goodness Crafted — home">
          {/* The supplied logo is a low-resolution JPEG on an opaque white
              background. Multiply drops the white out against the light bar,
              and it is rendered small so the soft edges never show. */}
          <Image
            src="/brand/logo.jpg"
            alt="Goodness Crafted"
            width={1600}
            height={929}
            priority
            sizes="120px"
            className="h-9 w-auto mix-blend-multiply sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-numeral text-[0.68rem] uppercase tracking-[0.22em] text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-[400ms] ease-[var(--ease-brand)] group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Search />

          <Link
            href="/account"
            aria-label="Your account"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
          >
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="6.5" r="3.5" />
              <path d="M3.5 17c1.2-3.6 4-5.3 6.5-5.3s5.3 1.7 6.5 5.3" />
            </svg>
          </Link>

          <button
            type="button"
            aria-label={`Open cart${quantity > 0 ? `, ${quantity} items` : ""}`}
            onClick={openCart}
            className="group flex items-center gap-2.5 rounded-full border border-ink/15 py-2 pr-2 pl-4 transition-colors hover:border-ink/40"
          >
            <span className="font-numeral text-[0.68rem] uppercase tracking-[0.18em]">
              Cart
            </span>
            <span
              key={quantity}
              className="animate-specimen flex h-6 w-6 items-center justify-center rounded-full bg-ink font-numeral text-[0.68rem] text-paper transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-110"
            >
              {hasLoaded ? quantity : ""}
            </span>
          </button>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-ink/15 md:hidden"
          >
            <span
              className={`h-px w-4 bg-ink transition-transform duration-300 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-ink transition-transform duration-300 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-ink/10 px-5 py-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-ink/5 py-3.5 font-numeral text-[0.72rem] uppercase tracking-[0.22em] last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

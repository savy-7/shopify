import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";
import { SHOP_QUERY, type ShopQueryResult } from "@/lib/shopify/queries";
import { ADDRESS, SOCIALS, TAGLINE } from "@/lib/brand/content";

async function getShopName(): Promise<string> {
  try {
    const data = await shopifyFetch<ShopQueryResult>({ query: SHOP_QUERY, revalidate: 3600 });
    return data.shop.name;
  } catch {
    return "Goodness Crafted";
  }
}

const SHOP_LINKS = [
  { href: "/shop", label: "All products" },
  { href: "/gifting", label: "Gifting & hampers" },
];

const BRAND_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export default async function Footer() {
  const shopName = await getShopName();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10">
      <div className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-[-0.03em]">
              Goodness Crafted
            </p>
            <p className="mt-3 max-w-xs leading-relaxed text-ink/55">{TAGLINE}</p>
          </div>

          <nav aria-label="Shop">
            <p className="font-numeral text-[0.62rem] uppercase tracking-[0.22em] text-ink/40">
              Shop
            </p>
            <ul className="mt-5 space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink/70 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Brand">
            <p className="font-numeral text-[0.62rem] uppercase tracking-[0.22em] text-ink/40">
              Brand
            </p>
            <ul className="mt-5 space-y-2.5">
              {BRAND_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink/70 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-numeral text-[0.62rem] uppercase tracking-[0.22em] text-ink/40">
              Delhi, India
            </p>
            <address className="mt-5 text-sm leading-relaxed text-ink/55 not-italic">
              {ADDRESS.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            {/* Listed without links: the live site names these platforms but
                does not publish their URLs. */}
            <p className="mt-5 font-numeral text-[0.62rem] uppercase tracking-[0.18em] text-ink/35">
              {SOCIALS.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-7">
          <p className="font-numeral text-[0.62rem] tracking-[0.15em] text-ink/40">
            © {year} {shopName}
          </p>
          <p className="font-numeral text-[0.62rem] uppercase tracking-[0.18em] text-ink/30">
            Crafting goodness in every bite
          </p>
        </div>
      </div>
    </footer>
  );
}

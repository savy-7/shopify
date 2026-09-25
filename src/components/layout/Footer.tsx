import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";
import { SHOP_QUERY, type ShopQueryResult } from "@/lib/shopify/queries";
import { ADDRESS, INSTAGRAM, SUPPORT_EMAIL, TAGLINE } from "@/lib/brand/content";
import AvailableOn from "@/components/ui/AvailableOn";
import InstagramGlyph from "@/components/ui/InstagramGlyph";

async function getShop(): Promise<ShopQueryResult["shop"]> {
  try {
    const data = await shopifyFetch<ShopQueryResult>({ query: SHOP_QUERY, revalidate: 3600 });
    return data.shop;
  } catch {
    // Falls back to a shop with no policies rather than no footer at all —
    // the policy row below already tolerates missing entries.
    return {
      name: "Goodness Crafted",
      privacyPolicy: null,
      termsOfService: null,
      shippingPolicy: null,
      refundPolicy: null,
    };
  }
}

export default async function Footer() {
  const shop = await getShop();
  const year = new Date().getFullYear();

  // External (Shopify-hosted) policy links, plus Contact, which is on this
  // site. A policy not yet written in Shopify admin comes back null and is
  // simply left out, rather than linking to a page with nothing on it.
  const policyLinks = [
    { label: "Privacy Policy", url: shop.privacyPolicy?.url },
    { label: "Terms", url: shop.termsOfService?.url },
    { label: "Shipping", url: shop.shippingPolicy?.url },
    { label: "Returns/Refunds", url: shop.refundPolicy?.url },
  ].filter((link): link is { label: string; url: string } => Boolean(link.url));

  return (
    <footer className="relative overflow-hidden border-t border-ink/10">
      <div className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[-0.005em]">
              Goodness Crafted
            </p>
            <p className="mt-3 max-w-xs leading-relaxed text-ink/55">{TAGLINE}</p>
            <ul className="mt-5 space-y-2">
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-ink/70 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                >
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink/70 transition-colors hover:text-ink"
                >
                  <InstagramGlyph />
                  {INSTAGRAM.handle}
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:text-right">
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
          </div>
        </div>

        <AvailableOn className="mt-12" />

        <div className="mt-16 flex flex-col gap-5 border-t border-ink/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-numeral text-[0.62rem] tracking-[0.15em] text-ink/40">
            © {year} {shop.name}
          </p>

          <nav aria-label="Policies">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {policyLinks.map((link) => (
                <li key={link.label} className="border-ink/15 first:border-l-0 sm:border-l sm:pl-5">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-numeral text-[0.62rem] uppercase tracking-[0.15em] text-ink/50 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-ink/15 first:border-l-0 sm:border-l sm:pl-5">
                <Link
                  href="/contact"
                  className="font-numeral text-[0.62rem] uppercase tracking-[0.15em] text-ink/50 transition-colors hover:text-ink"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

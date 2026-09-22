import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify/client";
import { SHOP_QUERY, type ShopQueryResult } from "@/lib/shopify/queries";

async function getShopName(): Promise<string> {
  try {
    const data = await shopifyFetch<ShopQueryResult>({ query: SHOP_QUERY, revalidate: 3600 });
    return data.shop.name;
  } catch {
    return "Goodness Crafted";
  }
}

export default async function Footer() {
  const shopName = await getShopName();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-extrabold">Goodness Crafted</p>
            <p className="mt-2 text-sm text-ink/60">Goodness, thoughtfully crafted.</p>
          </div>

          <div>
            <p className="text-sm font-semibold">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              <li><Link href="/shop">All products</Link></li>
              <li><Link href="/gifting">Gifting</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Stay in the loop</p>
            <p className="mt-3 text-sm text-ink/70">Newsletter signup coming soon.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-ink/10 pt-6 text-xs text-ink/50">
          © {year} {shopName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

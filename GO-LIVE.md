# Go-live checklist — Goodness Crafted

Everything outstanding before this storefront can replace goodnesscrafted.com.

Findings marked **(verified)** were read from your live Shopify store via the
Storefront API, not assumed. Anything marked **(check)** I could not see from
outside the admin and you need to confirm.

**Status as of 2026-09-24:** persistent cart and customer accounts are built
(§5). Code is pushed to `github.com/savy-7/shopify`. Still needed from you:
restrict shipping to India (§0.1), connect Razorpay (§0.2), import the repo
into Vercel and set env vars (§7), then set real prices/stock (§1).

---

## 0. Things only you can do in Shopify/Vercel/Razorpay — do these first

### 0.1 Restrict shipping to India only

*Shopify admin → Settings → Shipping and delivery.*

1. Under **Shipping profiles**, open the profile that currently has your
   international zones (§4 below lists the 29 countries it's set to).
2. For every zone that isn't India: click the **⋮** menu on that zone →
   **Delete** → **Save**.
3. If there's no India-only zone yet: **Add zone** → name it "India" → select
   only India → **Done**.
4. On the India zone, **Add shipping option** and set your rate (flat,
   weight-based, or order-amount-based) → **Done** → **Save**.
5. Test: add a product to cart and go to checkout with an Indian address —
   only your India rate should show.

The cart already sends `buyerIdentity.countryCode: "IN"` on every order
(built this session), so the frontend side of this is done — this is the
Shopify-side restriction to match it.

### 0.2 Connect Razorpay

1. Shopify admin → **Settings → Payments** → find **Razorpay** under
   third-party providers (or install it from the Shopify App Store first if
   it's not listed).
2. Razorpay will ask for your own business KYC — PAN, GST (if applicable),
   bank account, business proof. This is between you and Razorpay; I have no
   access to it and can't do it for you.
3. Once approved and connected, place one real order end-to-end on the live
   site and refund it, to confirm money actually moves before relying on it.

### 0.3 Deploy to Vercel

Code is already pushed to `github.com/savy-7/shopify` (branch `master`).

1. Go to [vercel.com/new](https://vercel.com/new), sign in, **Import** the
   `savy-7/shopify` repo.
2. Before the first deploy, add these environment variables (Project
   Settings → Environment Variables):
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `NEXT_PUBLIC_SITE_URL` — your Vercel URL once you have it (e.g.
     `https://shopify-savy-7.vercel.app`), or your real domain once DNS is
     pointed. Customer accounts (§0.4) need this to be correct.
   - Leave the five `SHOPIFY_CUSTOMER_ACCOUNT_*` variables blank for now —
     the site works without them; sign-in just shows a "not set up yet"
     message until §0.4 is done.
3. Deploy. Send me the resulting URL and I'll do another pass of visual and
   functional verification against the real deployment.

### 0.4 Set up customer accounts (once §0.3 has given you a URL)

1. Shopify admin → **Settings → Customer accounts** → turn accounts on.
2. **Sales channels → Headless** → your storefront → **Customer Account API
   settings**.
3. Under **Application setup**, add:
   - **Callback URL:** `{your Vercel/domain URL}/api/auth/callback`
   - **Logout URL:** `{your Vercel/domain URL}`
4. Copy the **Client ID** and the **Authorization**, **Token**, and **Logout**
   endpoint URLs shown there — verbatim, don't retype them.
5. Add all five as Vercel environment variables (see `.env.local.example` for
   the exact names) and redeploy.
6. Test signing in at `/account`.

---

## 1. Blockers — the store cannot take a real order until these are done

### 1.1 Prices are ₹0 on four of six products **(verified)**

| Product | Price now |
|---|---|
| Premium Almonds | ₹399 ✅ |
| Nuts & Seeds Mix | ₹400 ✅ |
| Premium Cashews | **₹0** |
| Premium Raisins | **₹0** |
| Premium Arabian Dates | **₹0** |
| Roasted & Salted Pistachios | **₹0** |

A ₹0 product can be checked out for free. The storefront currently hides the
price and shows "Soon" instead of printing ₹0, but that is a guard, not a fix.

### 1.2 Five of six products are out of stock **(verified)**

Only Premium Almonds is purchasable. Either restock, or set
*Inventory → Continue selling when out of stock* per variant if you fulfil
to order.

### 1.3 Shipping weights are wrong or unset **(verified)**

Shipping is priced off weight, so these will produce wrong postage.

| Product | Weight in Shopify | Should be |
|---|---|---|
| Premium Almonds | **1 kg** | 250 g + packaging |
| Nuts & Seeds Mix | **0 kg** | 250 g + packaging |
| Premium Cashews | **0 kg** | 250 g + packaging |
| Premium Raisins | **0 kg** | 250 g + packaging |
| Premium Arabian Dates | **0 kg** | 250 g + packaging |
| Roasted & Salted Pistachios | 250 g ✅ | — |

### 1.4 Three of four store policies are missing **(verified)**

Present: Privacy Policy.
Missing: **Refund policy**, **Terms of service**, **Shipping policy**.

Shopify links these from checkout. A refund/returns policy is also a consumer
requirement for selling in India. *Settings → Policies.*

### 1.5 Payment provider — confirm a live one is connected **(check)**

The Storefront API reports **no accepted card brands and no digital wallets**.
That may simply be because Indian gateways (Razorpay, Cashfree, PayU) don't
report through that field — so it is not proof of a problem, but it must be
confirmed. Shopify Payments is not available in India.

**Test:** place one real order end-to-end and refund it.

### 1.6 Your Pistachios description contains leaked AI assistant text **(verified)**

It currently ends with:

> "One important point I've deliberately not used claims like 'no preservatives'
> or 'healthy for your heart' in the main description unless they are clearly
> supported by your final product formulation/label… If you want, next I'll give
> you the exact Shopify product description formatting…"

This is live on your site now and renders on the new product page.

### 1.7 Premium Arabian Dates has no description at all **(verified)**

The product page shows a "coming soon" placeholder.

---

## 2. Content you need to supply

The storefront does not invent copy. These are blank because your sources are
blank.

- [ ] **Support email address** — nothing published anywhere. Needed on Contact
      and for order queries.
- [ ] **Phone number** — optional, but expected for Indian D2C.
- [ ] **Social media URLs.** Your live footer names Instagram, YouTube, TikTok,
      Twitter and Threads but links to none. The new footer lists the platform
      names without links for the same reason. Send the five URLs.
- [ ] **Dates product description** (see 1.7).
- [ ] **SEO descriptions** — only Pistachios has one **(verified)**. The other
      five fall back to the first 200 characters of the body copy.
- [ ] **Image alt text — all 15 product images have none (verified).** Affects
      SEO and screen-reader users. Best fixed in Shopify so it flows everywhere.
- [ ] **Higher-resolution logo.** Current file is a 1600×929 JPEG on opaque
      white. It works because it is composited with `multiply` and rendered
      small, but a transparent PNG or SVG would be materially better.
- [ ] **Re-export the Nuts & Seeds Mix pack shot on pure white.** It was shot on
      cream (#FBF8F0) while the other five are on white, so it needs a
      brightness correction to sit cleanly on the page. Details in
      `src/lib/brand/palette.ts` → `NON_WHITE_BACKDROP`; re-export and the
      workaround can be deleted.

---

## 3. Gifting & hampers

Currently a placeholder section on the homepage and a placeholder `/gifting`
page. Nothing is faked — both say the sets aren't ready.

- [ ] Decide what each hamper contains and what it costs.
- [ ] Create them as real Shopify products (the four archived SKUs), with their
      own photography.
- [ ] Publish them to the **Headless** sales channel, or the storefront will not
      see them.
- [ ] Tell me the handles and I'll wire `/gifting` to list them.

---

## 4. Shopify housekeeping

- [ ] **Delete the demo collection "Food And Beverage example products"**
      **(verified)** — left over from the Shopify theme.
- [ ] **Three collections are empty (verified):** `frontpage` (Home page),
      `nuts-seeds-mixes`, `gifting-hampers`. Only `our-collection` has the six
      products. Either populate them or delete them.
- [ ] **Add SKUs.** Only Pistachios has one (`GCPIS250`) **(verified)**. Add for
      the other five so orders and stock are traceable.
- [ ] **Add product tags or product type** (e.g. `family:almond`). The
      storefront currently maps each product to its pack colour from a hardcoded
      table in `src/lib/brand/palette.ts` because Shopify has neither
      **(verified)**. With tags, that table can read from the API and new
      products will pick up colours automatically.
- [ ] **Confirm international shipping is intended.** The store is set to ship
      to **29 countries** including the US, UK, EU, Australia and Japan
      **(verified)**. Shipping food internationally carries customs and import
      restrictions. If you only intend to ship within India, restrict it.
- [ ] **Shipping rates** — confirm a rate exists for every zone you ship to, or
      checkout will fail for those customers. **(check)**
- [ ] **GST / tax settings** for India. **(check)**
- [ ] **Brand the Shopify checkout** (*Settings → Checkout → Branding*) with the
      logo, and the ink/paper/lime colours so it doesn't look like a different
      company. Customers leave the custom frontend at checkout, so this is the
      one Shopify-styled screen they see.

---

## 5. Frontend — build work

Done this session:

- [x] **Persistent cart** — Storefront Cart API, drawer, quantity/remove,
      live header badge, direct multi-item Shopify checkout. Ships every cart
      with `buyerIdentity.countryCode: "IN"`.
- [x] **Customer accounts** — sign in, order history, sign out, via the
      Customer Account API (OAuth 2.0 + PKCE). Built but **not yet tested
      against a live store** — needs §0.3 and §0.4 done first. Degrades to a
      clear "not set up yet" message rather than an error page until then.

Still outstanding:

- [ ] **Search.** Not built.
- [ ] **Collection filtering and sorting** on `/shop`. Not built — it lists all
      products unfiltered. Fine for six SKUs, needed as the range grows.
- [ ] **Newsletter signup.** Footer says "coming soon"; nothing is wired.
- [ ] **Policy pages** — `/privacy`, `/terms`, `/shipping`, `/refund`. These
      exist in Shopify (once written) and should be pulled through the API
      rather than retyped.
- [ ] **Product reviews.** Not built.
- [ ] **Contact form.** Contact page currently shows the address only.

## 6. Frontend — technical and SEO gaps **(verified: all missing)**

- [ ] `sitemap.ts` — no sitemap is generated.
- [ ] `robots.ts` — no robots.txt.
- [ ] `not-found.tsx` — 404s render the unstyled Next.js default.
- [ ] `error.tsx` / `global-error.tsx` — no error boundary. A Shopify outage
      degrades gracefully per section, but an unexpected render error shows the
      default screen.
- [ ] `opengraph-image.tsx` — no social share image. Links posted to WhatsApp,
      Instagram or X will have no preview card.
- [ ] **Favicon is still the Next.js default** (`src/app/favicon.ico` is the
      create-next-app file). Replace with the brand mark.
- [ ] **Analytics** — nothing installed. Decide on GA4 / Shopify analytics /
      Plausible.
- [ ] **Decide on the intro curtain.** The lime page-load wipe occludes the hero
      for ~0.85s and defers largest-contentful-paint by roughly that much.
      Deleting `src/components/home/IntroCurtain.tsx` and its single call site in
      `src/app/page.tsx` removes it entirely.
- [ ] **Run Lighthouse** against the deployed build and fix what it flags.

---

## 7. Deployment

Hosting steps are in §0.3 above. Remaining once that's live:

- [ ] **Rotate the Storefront token** if it has ever been pasted anywhere shared.
- [ ] **Staging first.** Test on the Vercel preview URL — full cart, checkout,
      and sign-in flow — before touching DNS.
- [ ] **DNS cutover.** `goodnesscrafted.com` currently points at the Shopify
      theme. Moving it to the new frontend is the switch. Checkout stays on
      Shopify either way.
- [ ] **Redirects.** Product URLs keep the same `/products/{handle}` shape, so
      those survive. Old `/collections/...` and `/pages/...` URLs will 404 —
      map them.
- [ ] **Set `metadataBase`** — already set to `https://goodnesscrafted.com` in
      `src/app/layout.tsx`; confirm before launch.

---

## 8. Compliance — confirm with whoever handles your labelling **(check)**

Not legal advice; flagging because this is packaged food sold in India.

- [ ] **FSSAI licence number** displayed on the site.
- [ ] **Nutritional information** per product.
- [ ] **Country of origin** and packer/importer details.
- [ ] **Health claims.** Your banner says *"No preservatives"*, while that leaked
      note in the Pistachios description says you deliberately avoided that claim
      because it wasn't supported. **Your own materials disagree.** The banner is
      no longer on the homepage, but resolve which is correct — claims like this
      are regulated.

---

## Suggested order

1. Section 0 — restrict shipping to India, connect Razorpay, deploy to
   Vercel, then set up customer accounts.
2. Section 1 — prices, stock, weights, policies, the two description problems.
3. Section 2 — send me the email, socials and any missing copy.
4. Section 5 — search and collection filtering, once the range grows.
5. Section 6 — sitemap, robots, 404, OG image, favicon, analytics.
6. DNS cutover.

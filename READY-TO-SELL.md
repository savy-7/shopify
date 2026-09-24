# Ready to sell — what's left in Shopify before this is a real business

The website is live and working. This list is everything else — the
commerce, legal, and operational side that has nothing to do with code, and
that only you (or your accountant/compliance advisor) can do.

Items already covered in detail in [GO-LIVE.md](GO-LIVE.md) are referenced,
not repeated.

---

## 1. Sell something real

- [ ] **Set real prices** on all six products. Four are currently ₹0.
- [ ] **Set real stock quantities.** Five of six show "Restocking" right now.
      *Inventory → Continue selling when out of stock* only if you genuinely
      fulfil to order without holding stock.
- [ ] **Add a SKU to every product.** Only Pistachios has one. Without them,
      you can't reliably match orders to stock in your own head once volume
      picks up, and some accounting/inventory tools require them.
- [ ] **Weigh and set real shipping weights** — see GO-LIVE.md §1.3. Wrong
      weight means wrong postage charged, on every single order until fixed.
- [ ] **Fix the two broken product descriptions** — GO-LIVE.md §1.6–1.7
      (leaked AI text on Pistachios; empty description on Dates).

## 2. Get paid

- [ ] **Finish connecting Razorpay** (or your chosen gateway) — GO-LIVE.md
      §0.2. Business KYC, PAN, bank account, all on their end, not mine.
- [ ] **Place one real order yourself and refund it.** Don't take this on
      faith — actually watch money leave your account and land in your
      Razorpay balance before a stranger's card is on the line.
- [ ] **Decide your refund/cancellation window** and put a number on it —
      needed for §4 below and for the policy page itself.

## 3. Legal minimums for selling packaged food in India

Not legal advice — flagging what's typically required; confirm with someone
who handles your compliance.

- [ ] **FSSAI licence/registration number**, displayed on the site (usually
      footer or an About/Legal page) and on your packaging labels. Selling
      packaged food in India without this is the one item on this whole list
      that's a legal exposure, not just good practice.
- [ ] **Nutritional information** per product, on-pack and ideally on the
      product page.
- [ ] **Net weight, batch/lot number, manufacture and best-before dates,
      country of origin, and manufacturer/packer/importer name+address** —
      standard packaged-food labelling requirements. Check your current
      packs actually carry all of these.
- [ ] **GST registration**, and GST correctly configured in Shopify
      (*Settings → Taxes and duties*) so it's charged and reported correctly.
      GO-LIVE.md §4 flags this as unconfirmed.
- [ ] **Resolve the "No preservatives" claim** — GO-LIVE.md §8. Your banner
      says it; a since-removed note in your own product copy said you'd
      deliberately avoided that exact claim as unsupported. Food claims are
      regulated (FSSAI has specific rules on what "no preservatives",
      "natural", etc. actually require) — pick one position and make sure
      your labels agree with your marketing.

## 4. The four policy pages Shopify expects you to have

*Shopify admin → Settings → Policies.* Only Privacy exists right now.

- [ ] **Refund policy** — needs the cancellation window from §2.
- [ ] **Shipping policy** — needs real rates/timelines, which follow from
      restricting shipping to India (GO-LIVE.md §0.1, done) and picking
      carriers.
- [ ] **Terms of service**
- [ ] Once written, tell me and I'll pull them onto the actual site rather
      than just linking Shopify's own page — right now there's nowhere on
      the frontend for a customer to find them.

## 5. Shipping and fulfilment — the operational side, not the DNS side

- [ ] **Pick a courier/fulfilment method.** Self-ship, or a partner
      (Shiprocket, Delhivery, etc.)? This decides what rates you can
      actually offer in §shipping policy above.
- [ ] **Set real shipping rates** for the India zone (GO-LIVE.md §0.1 covers
      restricting *to* India; this is what you actually charge within it).
- [ ] **Decide your processing time** — same-day, next-day, 2–3 days — and
      say so on the shipping policy and probably near the buy button.
- [ ] **Packaging beyond the product pouch itself** — outer box, tape,
      any insert/thank-you card. Not required, but worth deciding before
      the first order ships, not during it.

## 6. Customer-facing basics still missing

- [ ] **A real support email address.** Nothing is published anywhere right
      now (GO-LIVE.md §2) — needed for the Contact page and for anyone who
      has an order problem to be able to reach you.
- [ ] **Phone number**, if you want one listed — common expectation for
      Indian D2C, not strictly required.
- [ ] **The five social media URLs** — your footer names the platforms with
      no links behind them.

## 7. Before you tell people it's live

- [ ] **Finish customer accounts** (steps above) and test signing in.
- [ ] **Place a full test order end to end** on the real domain — browse,
      add to cart, checkout, pay with a real (small) amount, watch the order
      land in Shopify admin, confirm you'd know how to fulfil it.
- [ ] **Check the order confirmation email** that Shopify sends — it's
      auto-generated from your Shopify settings, not something I've touched;
      make sure it has correct branding and contact info
      (*Settings → Notifications*).
- [ ] **Decide whether the gifting/hampers section goes live empty**
      (as it is now — clearly marked "coming soon") or waits until real
      hamper products exist (GO-LIVE.md §3).

---

## What's already done and doesn't need your attention

- The site itself: hero, product pages, cart, checkout handoff, customer
  accounts, all built and live on `goodnesscrafted.com`.
- Shipping restricted to India (§0.1 in GO-LIVE.md) — you already did this.
- The domain/DNS/Storefront-API issue from earlier today — fixed and
  documented so it can't recur silently.

## Suggested order

1. §3 (FSSAI + labelling) and §2 (Razorpay) — these gate you legally and
   financially, independent of everything else, so start them now since
   they involve waiting on other parties.
2. §1 (real prices, stock, weights, SKUs) — you can do this yourself, any time.
3. §4 (policies) — needs §2's refund window decided first.
4. §5 (shipping/fulfilment) — needs a courier decision.
5. §6 (email, phone, socials) — quick, send me the details and I'll wire
   them in.
6. Customer accounts (above) — whenever convenient, not blocking a launch.
7. §7 — the final real-order test, right before telling anyone it's live.

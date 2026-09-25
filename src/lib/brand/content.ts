/**
 * Brand copy, quoted verbatim from the live storefront, the Shopify
 * "About Us" / "Contact" pages, or supplied directly by the brand. Nothing
 * here is invented — if a claim is not in this file, it is not on the site.
 *
 * Source of truth is still Shopify; this exists because the current theme holds
 * this copy in section settings the Storefront API does not expose.
 */

export const TAGLINE = "Goodness, thoughtfully crafted.";

/** Printed on every pack. */
export const PACK_LINE = "Crafting goodness in every bite.";

export const MISSION = "We believe good food doesn't need to be complicated.";

export const PROMISE = "When the ingredients are good, every bite feels better.";

export const INTRO =
  "At Goodness Crafted, we bring together carefully selected nuts, dry fruits and thoughtfully curated blends — with a focus on quality, taste and the simple goodness of real ingredients.";

export const CLOSING =
  "Goodness worth coming back to. Thoughtfully chosen ingredients, carefully crafted products and a simple belief — when you start with good, you can create something truly worth enjoying.";

export const PILLARS = [
  {
    title: "Carefully Selected",
    body: "Ingredients chosen with attention to quality, taste and consistency.",
  },
  {
    title: "Crafted with Care",
    body: "Thoughtful sourcing and careful handling from selection to pack.",
  },
  {
    title: "Made to Be Enjoyed",
    body: "Beautifully simple products created for everyday moments.",
  },
] as const;

/** Homepage "From us to you". */
export const STORY = {
  heading: "It started with a simple idea.",
  body: [
    "Goodness Crafted began with a quiet belief — that good ingredients, thoughtfully chosen, don't need much to shine.",
    "What started as an idea slowly became a journey of choosing the right products, getting the little details right and creating something we could truly call our own.",
    "We're only at the beginning, but every pack carries a little piece of that journey.",
  ],
} as const;

/** "Why shop Goodness Crafted?" — reassurance at the point of purchase. */
export const TRUST = [
  {
    title: "Carefully Selected",
    body: "Quality-focused sourcing across our range.",
  },
  {
    title: "Thoughtfully Packed",
    body: "Packed with care to preserve quality.",
  },
  {
    title: "100% Vegetarian",
    body: "Made for vegetarian households.",
  },
  {
    title: "Secure Payments",
    body: "Safe and convenient checkout.",
  },
] as const;

/** About page, in page order. */
export const ABOUT = {
  intro: {
    heading: "Goodness, thoughtfully crafted.",
    body: [
      "Goodness Crafted was created with a simple idea — to make everyday nuts and dry fruits feel a little more thoughtful.",
      "Carefully chosen products, considered details and a whole lot of care go into everything we create.",
    ],
  },
  founder: {
    name: "Chhavi",
    role: "Founder, Goodness Crafted",
    quote:
      "Goodness Crafted started with a simple idea — to create something of my own that felt thoughtful, beautiful and genuinely good.",
    body: [
      "What began as an idea slowly became a journey of choosing the right products, getting the little details right and building a brand I could truly call my own.",
      "I wanted Goodness Crafted to be about more than just nuts and dry fruits. I wanted every product to feel carefully chosen, thoughtfully presented and made to be enjoyed.",
      "We're only at the beginning, but every pack carries a little piece of that journey.",
      "Thank you for being here.",
    ],
  },
  journey: {
    heading: "From an idea to something of our own.",
    body: [
      "What started as an idea slowly became Goodness Crafted — shaped by countless little decisions, from the products we choose to the details you see in every pack.",
      "We're still at the beginning, and there's plenty more to come.",
    ],
  },
  beginning: {
    heading: "We're only at the beginning.",
    line: "And we're excited to have you with us.",
  },
} as const;

/**
 * The founder's portrait, served from /public. Null until the photograph is
 * supplied; the About page holds its space either way, so dropping a file in
 * and setting this path is the whole change.
 */
export const FOUNDER_PHOTO: { src: string; alt: string } | null = {
  src: "/brand/founder.webp",
  alt: "Chhavi, founder of Goodness Crafted, smiling in a garden",
};

export const PHILOSOPHY = [
  {
    title: "Pure by Intention",
    body: "We keep things simple — choosing ingredients in their most natural form.",
  },
  {
    title: "Crafted with Care",
    body: "Every pack reflects thoughtful selection and genuine attention to detail.",
  },
  {
    title: "Comfort in Every Bite",
    body: "We create products that bring quiet joy through honest, uncomplicated goodness.",
  },
] as const;

export const ADDRESS = [
  "Plot no. 3, Top floor, Office no. 404",
  "Jaina Complex, Veer Savarkar Block",
  "Shakarpur, New Delhi",
  "East Delhi 110092",
] as const;

/** Platforms linked from the live footer. URLs are unknown, so they are not guessed. */
export const SOCIALS = ["Instagram", "YouTube", "TikTok", "Twitter", "Threads"] as const;

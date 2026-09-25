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
  "At Goodness Crafted, we believe everyday snacking can be simple and still feel special. We bring together quality nuts, dry fruits and blends chosen for their taste, texture and everyday appeal.";

/** hello@ is a real, checked inbox — this is the one support address the
 *  site should show anywhere it names a way to reach the brand. */
export const SUPPORT_EMAIL = "hello@goodnesscrafted.com";

export const CLOSING =
  "Goodness worth coming back to. Thoughtfully chosen ingredients, carefully crafted products and a simple belief — when you start with good, you can create something truly worth enjoying.";

export const PILLARS = [
  {
    title: "Quality You Can See",
    body: "From the ingredients we choose to the details on every pack, we pay attention to what makes a product feel worth bringing home.",
  },
  {
    title: "Simple by Choice",
    body: "Straightforward products made with ingredients you know and enjoy.",
  },
  {
    title: "Made for Everyday",
    body: "For your morning bowl, afternoon snack, travel bag or the table you share with others.",
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
    eyebrow: "A note from our founder",
    heading: "Why I started Goodness Crafted",
    name: "Chhavi",
    role: "Founder, Goodness Crafted",
    body: [
      "I've always loved the simplicity of good ingredients — something you can enjoy every day, share with family, or simply keep close.",
      "I wanted to make everyday nuts and dry fruits feel a little more special, from what's inside the pack to how it reaches you.",
      "That idea became Goodness Crafted.",
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

/** The brand's one social account. */
export const INSTAGRAM = {
  handle: "@goodnesscrafted",
  url: "https://www.instagram.com/goodnesscrafted",
} as const;

/**
 * Where else the range is sold. Logos are the platforms' own marks, used only
 * to say "available here". `logo: null` renders the name instead — used for
 * Instamart until its official logo file is supplied (the only public copies
 * found were a different company's). `url` is null until the listing links
 * are supplied; the tiles aren't links until then rather than guessing.
 */
export const MARKETPLACES: {
  name: string;
  logo: { src: string; width: number; height: number } | null;
  /** Tile colour, when the mark belongs on its brand colour rather than white. */
  tile?: string;
  url: string | null;
}[] = [
  // Blinkit's own logo is a yellow app-icon square; cropped to its wordmark
  // and set on the same yellow so it stays legible at tile size.
  {
    name: "Blinkit",
    logo: { src: "/brand/marketplaces/blinkit-wordmark.svg", width: 3015, height: 884 },
    tile: "#F8CB46",
    url: null,
  },
  { name: "Amazon", logo: { src: "/brand/marketplaces/amazon.svg", width: 603, height: 182 }, url: null },
  { name: "Instamart", logo: null, url: null },
  { name: "Zepto", logo: { src: "/brand/marketplaces/zepto.svg", width: 90, height: 30 }, url: null },
];

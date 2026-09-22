/**
 * Brand copy, quoted verbatim from the live storefront and the Shopify
 * "About Us" / "Contact" pages. Nothing here is invented — if a claim is not
 * in this file, it is not on the site.
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

export const FOUNDER_MESSAGE = [
  "Goodness Crafted began with a quiet desire for something simple yet meaningful — food that feels pure, trustworthy, and close to its natural truth.",
  "We started by choosing the finest nuts and seeds for ourselves, valuing their freshness and integrity. As we shared them with the people around us, we realised how something so natural could bring such genuine comfort. That moment of connection became the heart of our brand.",
  "Every pack of Goodness Crafted carries that intention — thoughtfully selected, minimally touched, and offered with sincerity. Our hope is that it brings you the same sense of calm and honest goodness it brought to us.",
  "From us to you, thank you for welcoming Goodness Crafted into your day.",
] as const;

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

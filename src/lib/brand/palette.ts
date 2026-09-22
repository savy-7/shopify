/**
 * Every product ships in a colour-coded pack. These accents are sampled from
 * the real packaging so on-screen colour blocks agree with the photography.
 *
 * Shopify carries no productType or tags yet, so the mapping lives here. Once
 * products are tagged (e.g. `family:almond`), this can read from the API
 * instead and the hardcoded table goes away.
 */
export type Accent = "almond" | "mix" | "cashew" | "raisin" | "date" | "pistachio";

export const DEFAULT_ACCENT: Accent = "pistachio";

/**
 * Hex rather than Tailwind classes: the hero transitions the accent colour on
 * every specimen change, which needs an interpolatable inline value.
 */
export const ACCENT_HEX: Record<Accent, string> = {
  almond: "#471b14",
  mix: "#c74408",
  cashew: "#c9ab77",
  raisin: "#68334b",
  date: "#1b2436",
  pistachio: "#738b1d",
};

/**
 * Text-safe counterparts, for accents used as type or as a fill behind paper
 * type. Cashew's sand sits at roughly 1.9:1 on paper — fine as a hairline or a
 * letterform outline, unreadable as words — so it darkens here; pistachio is
 * nudged down for the same reason. The rest are already dark enough to reuse.
 */
export const ACCENT_TEXT_HEX: Record<Accent, string> = {
  ...ACCENT_HEX,
  cashew: "#7d5f2a",
  pistachio: "#5c6f16",
};

type BrandProduct = {
  accent: Accent;
  /** Set enormous in the hero, so it has to be one short word. */
  shortName: string;
};

const BRAND: Record<string, BrandProduct> = {
  "premium-almonds": { accent: "almond", shortName: "Almonds" },
  "roasted-salted-pistachios": { accent: "pistachio", shortName: "Pistachios" },
  "premium-cashews": { accent: "cashew", shortName: "Cashews" },
  "nuts-seeds-mix": { accent: "mix", shortName: "Mix" },
  "premium-raisins": { accent: "raisin", shortName: "Raisins" },
  "premium-arabian-dates": { accent: "date", shortName: "Dates" },
};

/** Display order for the hero rotator, sequenced so adjacent accents contrast. */
export const SPECIMEN_ORDER = Object.keys(BRAND);

export function accentFor(handle: string): Accent {
  return BRAND[handle]?.accent ?? DEFAULT_ACCENT;
}

export function shortNameFor(handle: string, fallback: string): string {
  return BRAND[handle]?.shortName ?? fallback;
}

/**
 * `cashew` is a pale sand, so it alone needs ink type on top; the rest are dark
 * enough to take paper. Used wherever an accent becomes a filled surface.
 */
export function isPaleAccent(accent: Accent): boolean {
  return accent === "cashew";
}

/**
 * Pack shots are composited with `mix-blend-mode: multiply`, which assumes a
 * pure-white backdrop. Five of the six sit on #FEFEFE and disappear cleanly.
 * The Nuts & Seeds Mix shot was taken on cream (#FBF8F0) and leaves a visible
 * warm rectangle, so it gets a brightness lift that pushes its backdrop to
 * white. Measured: 1.045 clears the box with no visible change to the artwork.
 *
 * This is a workaround for a source asset. Re-export that image on white and
 * the handle can come out of this list.
 */
const NON_WHITE_BACKDROP = new Set(["nuts-seeds-mix"]);

export function packClassName(handle: string): string {
  return NON_WHITE_BACKDROP.has(handle) ? "pack-blend pack-normalize" : "pack-blend";
}

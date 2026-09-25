/**
 * Every product ships in a colour-coded pack. These accents are sampled from
 * the real packaging so on-screen colour blocks agree with the photography.
 *
 * Shopify carries no productType or tags yet, so the mapping lives here. Once
 * products are tagged (e.g. `family:almond`), this can read from the API
 * instead and the hardcoded table goes away.
 */
export type Accent =
  | "almond"
  | "mix"
  | "cashew"
  | "raisin"
  | "date"
  | "pistachio"
  | "walnut";

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
  walnut: "#7a0a19",
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
  /** Set enormous in the specimen plate, so it has to be one short word. */
  shortName: string;
  /**
   * Species name for the plate caption. The mix is a blend of several, so it
   * gets a plain description rather than an invented binomial.
   */
  botanical: string;
};

const BRAND: Record<string, BrandProduct> = {
  "premium-almonds": { accent: "almond", shortName: "Almonds", botanical: "Prunus dulcis" },
  "roasted-salted-pistachios": { accent: "pistachio", shortName: "Pistachios", botanical: "Pistacia vera" },
  "premium-cashews": { accent: "cashew", shortName: "Cashews", botanical: "Anacardium occidentale" },
  "nuts-seeds-mix": { accent: "mix", shortName: "Mix", botanical: "Nuts & seeds, blended" },
  "premium-raisins": { accent: "raisin", shortName: "Raisins", botanical: "Vitis vinifera" },
  "premium-arabian-dates": { accent: "date", shortName: "Dates", botanical: "Phoenix dactylifera" },
  "premium-walnuts": { accent: "walnut", shortName: "Walnuts", botanical: "Juglans regia" },
};

/** Display order for the hero rotator, sequenced so adjacent accents contrast. */
export const SPECIMEN_ORDER = Object.keys(BRAND);

export function accentFor(handle: string): Accent {
  return BRAND[handle]?.accent ?? DEFAULT_ACCENT;
}

export function shortNameFor(handle: string, fallback: string): string {
  return BRAND[handle]?.shortName ?? fallback;
}

export function botanicalFor(handle: string): string | null {
  return BRAND[handle]?.botanical ?? null;
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
 * pure-white backdrop. All but one sit on #FEFEFE and disappear cleanly.
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

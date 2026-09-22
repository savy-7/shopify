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

const ACCENT_BY_HANDLE: Record<string, Accent> = {
  "premium-almonds": "almond",
  "nuts-seeds-mix": "mix",
  "premium-cashews": "cashew",
  "premium-raisins": "raisin",
  "premium-arabian-dates": "date",
  "roasted-salted-pistachios": "pistachio",
};

export function accentFor(handle: string): Accent {
  return ACCENT_BY_HANDLE[handle] ?? DEFAULT_ACCENT;
}

/**
 * Tailwind cannot build class names at runtime, so each accent lists its
 * classes explicitly.
 *
 * `surface` is the light tint safe to place a pack shot on: product images
 * have an opaque near-white backdrop that we drop out with `mix-blend-mode:
 * multiply`, which only reads correctly over light colours. `solid` is the
 * full-strength colour, reserved for type, chips and small blocks.
 */
export const ACCENT_CLASSES: Record<
  Accent,
  { solid: string; onSolid: string; surface: string; text: string }
> = {
  almond: {
    solid: "bg-almond",
    onSolid: "text-paper",
    surface: "bg-almond/10",
    text: "text-almond",
  },
  mix: {
    solid: "bg-mix",
    onSolid: "text-paper",
    surface: "bg-mix/10",
    text: "text-mix",
  },
  cashew: {
    solid: "bg-cashew",
    onSolid: "text-ink",
    surface: "bg-cashew/40",
    text: "text-ink",
  },
  raisin: {
    solid: "bg-raisin",
    onSolid: "text-paper",
    surface: "bg-raisin/10",
    text: "text-raisin",
  },
  date: {
    solid: "bg-date",
    onSolid: "text-paper",
    surface: "bg-date/10",
    text: "text-date",
  },
  pistachio: {
    solid: "bg-pistachio",
    onSolid: "text-paper",
    surface: "bg-pistachio/10",
    text: "text-pistachio",
  },
};

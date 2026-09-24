/**
 * Hand-drawn line icons for the range. Drawn on a 24px grid at a single stroke
 * weight so they read as one family, and checked at 26px as well as display
 * size — the wrinkle and split details have to survive the small end.
 */
export type NutIconName =
  | "almond"
  | "cashew"
  | "pistachio"
  | "raisin"
  | "date"
  | "seed"
  | "leaf"
  | "sprig";

const PATHS: Record<NutIconName, React.ReactNode> = {
  almond: (
    <>
      <path d="M12 2.2c3.7 3.4 5.2 7.6 5.2 11 0 4.6-2.3 8.6-5.2 8.6s-5.2-4-5.2-8.6c0-3.4 1.5-7.6 5.2-11Z" />
      <path d="M12 6.4v12.2" />
    </>
  ),
  cashew: (
    <path d="M17.1 3.9C10.2 5.4 5.6 10 5.6 14.4c0 3.7 3 6.3 6.7 6.3 3 0 5.1-1.9 5.1-4 0-1.9-1.4-3.2-3.3-3.2-1.2 0-2 .4-2.6.4-.7 0-1.1-.4-1.1-1.1 0-2.2 2.7-4.4 5.7-5.4Z" />
  ),
  pistachio: (
    <>
      <path d="M12 2.6c4 0 6.8 3.6 6.8 8.3 0 5.6-3.3 10.9-6.8 10.9S5.2 16.5 5.2 10.9C5.2 6.2 8 2.6 12 2.6Z" />
      <path d="M12.2 5.3c1.9 1.9 2.9 4.5 2.9 7.1 0 2.5-1 4.7-2.9 6.4" />
    </>
  ),
  raisin: (
    <>
      <path d="M12 3.2c4.3 0 7.4 3.4 7.4 8.2 0 5.4-3.3 9.4-7.4 9.4s-7.4-4-7.4-9.4c0-4.8 3.1-8.2 7.4-8.2Z" />
      <path d="M7.6 8.6c1.8 1 3.2 1 5 0s3.2-1 4.4-.2" />
      <path d="M7.2 13.4c1.8 1 3.2 1 5 0s3.2-1 4.6-.2" />
    </>
  ),
  date: (
    <>
      <path d="M12 3.6c2.9 0 4.9 3.4 4.9 8.2s-2 9-4.9 9-4.9-4.2-4.9-9 2-8.2 4.9-8.2Z" />
      <path d="M12 3.6V1.4" />
      <path d="M10.2 2.2c.7.6 1.2 1 1.8 1.4" />
    </>
  ),
  seed: (
    <>
      <path d="M12 2.6c3.7 3 5.6 6.6 5.6 10.2 0 4.7-2.4 8.6-5.6 8.6s-5.6-3.9-5.6-8.6c0-3.6 1.9-7.2 5.6-10.2Z" />
      <path d="M12 5.9c2.4 2.2 3.6 4.7 3.6 7.2 0 3.3-1.6 5.9-3.6 5.9s-3.6-2.6-3.6-5.9c0-2.5 1.2-5 3.6-7.2Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M4.4 20.2C3.6 11 9.4 4.4 19.8 3.6c.9 9.6-5.2 16.2-15.4 16.6Z" />
      <path d="m4.4 20.2 9.8-9.8" />
    </>
  ),
  sprig: (
    <>
      <path d="M12 21.5V9" />
      <path d="M12 12.6c-3.4 0-5.2-2-5.4-5.6 3.6.2 5.4 2.2 5.4 5.6Z" />
      <path d="M12 12.6c3.4 0 5.2-2 5.4-5.6-3.6.2-5.4 2.2-5.4 5.6Z" />
    </>
  ),
};

/** Which icon stands for which product. */
export const ICON_BY_HANDLE: Record<string, NutIconName> = {
  "premium-almonds": "almond",
  "roasted-salted-pistachios": "pistachio",
  "premium-cashews": "cashew",
  "nuts-seeds-mix": "seed",
  "premium-raisins": "raisin",
  "premium-arabian-dates": "date",
};

export function iconForHandle(handle: string): NutIconName {
  return ICON_BY_HANDLE[handle] ?? "sprig";
}

export default function NutIcon({
  name,
  className = "",
  strokeWidth = 1.4,
  style,
}: {
  name: NutIconName;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}

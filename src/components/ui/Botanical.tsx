/**
 * Hand-drawn botanical linework, drawn to sit alongside the nut icons in
 * NutIcon — same stroke language, larger and looser. These are decorative
 * framing elements rather than product marks: a branch to hang off a corner,
 * a sprig to sit under a heading, and a ring to frame a pack the way a
 * botanical plate frames its specimen.
 */
export type BotanicalName = "branch" | "sprig-pair" | "ring";

export default function Botanical({
  name,
  className = "",
  strokeWidth = 1,
  style,
}: {
  name: BotanicalName;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  const shared = {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false as const,
    className,
    style,
  };

  if (name === "branch") {
    // A long arcing stem with alternating leaves — hangs off a corner.
    return (
      <svg viewBox="0 0 120 60" {...shared}>
        <path d="M2 54C24 50 52 40 74 26 88 17 100 10 118 6" />
        <path d="M28 47c-1-7 2-13 9-16 2 7-1 13-9 16Z" />
        <path d="M30 46c5-5 12-7 19-5-4 6-11 8-19 5Z" />
        <path d="M56 36c-2-7 1-14 8-17 2 7-1 14-8 17Z" />
        <path d="M58 35c5-5 12-7 19-6-4 6-11 9-19 6Z" />
        <path d="M84 21c-2-6 1-12 7-15 2 6-1 12-7 15Z" />
        <path d="M86 20c5-4 11-6 17-5-3 6-10 8-17 5Z" />
      </svg>
    );
  }

  if (name === "sprig-pair") {
    // A long rule with a leaf pair at its centre — a section divider.
    // Drawn wide natively (10:1) so it isn't stretched when used as a rule;
    // an earlier 2:1 viewBox squashed the leaves badly at this width.
    return (
      <svg viewBox="0 0 240 24" {...shared}>
        <path d="M2 14h104" />
        <path d="M134 14h104" />
        <path d="M120 14c-5-3-7-8-6-13 6 1 9 7 6 13Z" />
        <path d="M120 14c5-3 7-8 6-13-6 1-9 7-6 13Z" />
      </svg>
    );
  }

  // A broken ring of leaves — frames a pack without closing around it.
  // Each leaf is the same path rotated about the centre, so every one sits
  // tangentially on the arc instead of being placed (and mis-angled) by hand.
  const leaf = "M100 14c-5.5-5-8-11-7-18 7 2 11 9 7 18Z";
  return (
    <svg viewBox="0 0 200 200" {...shared}>
      <path d="M100 18a82 82 0 0 1 82 82 82 82 0 0 1-24 58" />
      <path d="M100 182a82 82 0 0 1-82-82 82 82 0 0 1 24-58" />
      {[0, 55, 125, 180, 235, 305].map((angle) => (
        <path key={angle} d={leaf} transform={`rotate(${angle} 100 100)`} />
      ))}
    </svg>
  );
}

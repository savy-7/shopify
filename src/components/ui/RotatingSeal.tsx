import NutIcon from "./NutIcon";

/**
 * Circular seal: the pack line set around a ring, turning slowly, with the
 * brand sprig at the centre. Text runs on an SVG circle path rather than being
 * positioned letter by letter, so it stays evenly spaced at any size.
 */
export default function RotatingSeal({
  text = "Crafting goodness in every bite",
  className = "",
  style,
}: {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  // A trailing separator keeps the loop from butting the first word against the last.
  const ring = `${text} • `.toUpperCase();

  // `relative` only when the caller hasn't positioned it: both classes at once
  // resolve by stylesheet order, not by which was written last, and an
  // absolute seal silently fell back into the document flow.
  const positioned = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <div
      className={`${positioned ? "" : "relative "}${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="animate-seal h-full w-full">
        <defs>
          <path
            id="seal-ring"
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
          />
        </defs>
        <text className="fill-ink font-numeral text-[8.4px] tracking-[0.18em]">
          <textPath href="#seal-ring">{ring}</textPath>
        </text>
      </svg>

      <NutIcon
        name="sprig"
        strokeWidth={1.6}
        className="absolute top-1/2 left-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 text-ink/70"
      />
    </div>
  );
}

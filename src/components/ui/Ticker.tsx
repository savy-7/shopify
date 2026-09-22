/**
 * Infinite horizontal marquee.
 *
 * The item list is rendered twice and translated by -50%, so the second copy
 * lands exactly where the first began and the loop is seamless. Decorative
 * only — hidden from assistive tech, since duplicated text reads as noise.
 * The global `prefers-reduced-motion` rule caps the iteration count, which
 * parks the strip instead of scrolling it.
 */
export default function Ticker({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden bg-ink py-3.5" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center font-numeral text-[0.7rem] uppercase tracking-[0.3em] text-paper"
              >
                <span className="px-7">{item}</span>
                <span className="text-lime">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

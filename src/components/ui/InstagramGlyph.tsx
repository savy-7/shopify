/** Instagram's camera glyph, drawn in the site's line style. */
export default function InstagramGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" />
      <circle cx="10" cy="10" r="3.4" />
      <circle cx="14.6" cy="5.4" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

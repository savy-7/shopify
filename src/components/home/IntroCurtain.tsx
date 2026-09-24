/**
 * Page-load curtain: two olive panels that split apart and clear the viewport.
 *
 * Deliberately pure CSS with no JavaScript. A curtain driven by state could be
 * left covering the whole site if hydration fails, and one mounted after
 * hydration would flash over content that had already painted. As plain
 * animation it always resolves, and `prefers-reduced-motion` removes it
 * outright rather than merely speeding it up.
 *
 * It occludes the hero for roughly 0.85s, which does defer the largest
 * contentful paint by about that much. Deleting this component and its call
 * site is the whole revert.
 */
export default function IntroCurtain() {
  return (
    <div aria-hidden="true" className="intro-curtain">
      <span className="intro-panel intro-panel--top" />
      <span className="intro-panel intro-panel--bottom" />
      <span className="intro-mark">Goodness Crafted</span>
    </div>
  );
}

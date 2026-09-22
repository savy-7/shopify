"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger within a group, in ms. */
  delay?: number;
  /** `lift` settles upward with a slight scale; used for the pack shelf. */
  variant?: "slide" | "lift";
  as?: ElementType;
  className?: string;
};

/**
 * Releases its children when they first scroll into view.
 *
 * One observer per element, disconnected after the first hit — the reveal is a
 * one-way entrance, so there is nothing to watch for afterwards. Content is
 * present in the HTML either way; only its opacity is deferred, so crawlers and
 * screen readers are unaffected.
 *
 * `prefers-reduced-motion` is handled in CSS rather than here, which keeps this
 * effect free of synchronous state updates and guarantees the content is
 * visible even before hydration.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "slide",
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      // Fires a little before the element is fully on screen, so the motion
      // reads as part of the scroll rather than a delayed reaction to it.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${variant === "lift" ? "reveal-lift" : "reveal"} ${className}`}
    >
      {children}
    </Tag>
  );
}

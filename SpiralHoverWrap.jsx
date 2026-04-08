import { useState, useEffect } from "react";
import { SpiralAnimation } from "./SpiralAnimation.jsx";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const fn = () => setReduce(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduce;
}

/**
 * Hover/focus spiral backdrop behind links & buttons (compact canvas, GSAP spiral).
 */
export function SpiralHoverAnchor({
  href,
  className = "",
  children,
  target,
  rel,
  canvasW = 340,
  canvasH = 64,
  starCount = 420,
  onClick,
  ...rest
}) {
  const [hot, setHot] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <a
      {...rest}
      href={href}
      className={`spiral-wrap ${className}`}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseEnter={() => {
        if (!reduceMotion) setHot(true);
      }}
      onMouseLeave={() => setHot(false)}
      onFocus={() => {
        if (!reduceMotion) setHot(true);
      }}
      onBlur={() => setHot(false)}
    >
      {hot && !reduceMotion ? (
        <span className="spiral-wrap__canvas">
          <SpiralAnimation width={canvasW} height={canvasH} starCount={starCount} />
        </span>
      ) : null}
      <span className="spiral-wrap__content">{children}</span>
    </a>
  );
}

export function SpiralHoverButton({
  className = "",
  children,
  type = "button",
  onClick,
  ariaLabel,
  id,
  canvasW = 52,
  canvasH = 52,
  starCount = 280,
  ...rest
}) {
  const [hot, setHot] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <button
      {...rest}
      type={type}
      id={id}
      className={`spiral-wrap ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => {
        if (!reduceMotion) setHot(true);
      }}
      onMouseLeave={() => setHot(false)}
      onFocus={() => {
        if (!reduceMotion) setHot(true);
      }}
      onBlur={() => setHot(false)}
    >
      {hot && !reduceMotion ? (
        <span className="spiral-wrap__canvas spiral-wrap__canvas--round">
          <SpiralAnimation width={canvasW} height={canvasH} starCount={starCount} />
        </span>
      ) : null}
      <span className="spiral-wrap__content">{children}</span>
    </button>
  );
}

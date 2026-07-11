import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

function SpiralBackdrop({ hot, reduceMotion, canvasW, canvasH, starCount, round }) {
  if (!hot || reduceMotion) return null;
  return (
    <span className={`spiral-wrap__canvas${round ? " spiral-wrap__canvas--round" : ""}`}>
      <SpiralAnimation width={canvasW} height={canvasH} starCount={starCount} />
    </span>
  );
}

/**
 * Hover/focus spiral backdrop behind links & buttons.
 * Pass `to` for in-app React Router navigation; `href` for external / mailto.
 */
export function SpiralHoverAnchor({
  to,
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

  const hoverHandlers = {
    onMouseEnter: () => { if (!reduceMotion) setHot(true); },
    onMouseLeave: () => setHot(false),
    onFocus: () => { if (!reduceMotion) setHot(true); },
    onBlur: () => setHot(false),
  };

  const content = (
    <>
      <SpiralBackdrop
        hot={hot}
        reduceMotion={reduceMotion}
        canvasW={canvasW}
        canvasH={canvasH}
        starCount={starCount}
      />
      <span className="spiral-wrap__content">{children}</span>
    </>
  );

  if (to != null) {
    return (
      <Link
        {...rest}
        to={to}
        className={`spiral-wrap ${className}`.trim()}
        onClick={onClick}
        {...hoverHandlers}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      {...rest}
      href={href}
      className={`spiral-wrap ${className}`.trim()}
      target={target}
      rel={rel}
      onClick={onClick}
      {...hoverHandlers}
    >
      {content}
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
      className={`spiral-wrap ${className}`.trim()}
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
      <SpiralBackdrop
        hot={hot}
        reduceMotion={reduceMotion}
        canvasW={canvasW}
        canvasH={canvasH}
        starCount={starCount}
        round
      />
      <span className="spiral-wrap__content">{children}</span>
    </button>
  );
}

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SpiralHoverAnchor } from "../SpiralHoverWrap.jsx";
import { NAV_LINKS } from "../data/portfolio.js";

export function Nav({ scrolled }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 600) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <div
        className={`nav-backdrop${open ? " open" : ""}`}
        onClick={close}
        aria-hidden={!open}
      />
      <nav className={scrolled ? "scrolled" : ""}>
        <SpiralHoverAnchor
          to="/"
          className="nav-logo"
          canvasW={200}
          canvasH={44}
          starCount={220}
          onClick={close}
        >
          Su <span>✦</span>
        </SpiralHoverAnchor>
        <button
          type="button"
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map(([to, label]) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? "active" : undefined)}
                onClick={close}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

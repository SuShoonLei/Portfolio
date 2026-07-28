import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SpiralHoverButton } from "../SpiralHoverWrap.jsx";
import { BgCanvas } from "./BgCanvas.jsx";
import { Nav } from "./Nav.jsx";
import { useScrollReveal } from "./useScrollReveal.js";
import { DEFAULT_CONFIG } from "../data/portfolio.js";
import "../styles/portfolio.css";

const PAGE_TITLES = {
  "/": "Home",
  "/skills": "Skills",
  "/experience": "Experience",
  "/certifications": "Certifications",
  "/projects": "Projects",
  "/games": "Games",
  "/now": "Currently Up To",
  "/contact": "Contact",
};

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const { pathname } = useLocation();

  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const label = PAGE_TITLES[pathname] || "Portfolio";
    document.title = `${label} · Su Shoon Lei Khaing`;
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      const max = document.body.scrollHeight - innerHeight;
      const pct = max > 0 ? (scrollY / max) * 100 : 0;
      setProgress(pct);
      setScrolled(scrollY > 10);
      setShowTop(scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    let ignore = false;
    async function loadConfig() {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore && data?.links) {
          setConfig({
            links: { ...DEFAULT_CONFIG.links, ...data.links },
            certifications: {
              ...DEFAULT_CONFIG.certifications,
              ...(data.certifications || {}),
            },
            projects: { ...DEFAULT_CONFIG.projects, ...(data.projects || {}) },
          });
        }
      } catch {
        // Keep defaults if backend is unavailable.
      }
    }
    loadConfig();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      <BgCanvas />
      <div id="progress-bar" style={{ width: progress + "%" }} />
      <Nav scrolled={scrolled} />
      <SpiralHoverButton
        id="back-top"
        className={showTop ? "visible" : ""}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        ariaLabel="Back to top"
        canvasW={52}
        canvasH={52}
        starCount={260}
      >↑</SpiralHoverButton>
      <main className="page-shell" key={pathname}>
        <Outlet context={{ config }} />
      </main>
    </>
  );
}

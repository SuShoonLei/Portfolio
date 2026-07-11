import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    const els = document.querySelectorAll(
      ".skill-card, .project-card, .timeline-item, .cert-card, .reveal, .reveal-scale"
    );
    els.forEach((el, i) => {
      el.classList.remove("visible");
      if (el.classList.contains("skill-card")) el.style.transitionDelay = (i % 6) * 0.07 + "s";
      if (el.classList.contains("project-card")) el.style.transitionDelay = (i % 4) * 0.1 + "s";
      // Experience: zoom in as each item enters view (no stagger — tied to scroll)
      if (el.classList.contains("timeline-item")) el.style.transitionDelay = "0s";
      if (el.classList.contains("cert-card")) el.style.transitionDelay = (i % 4) * 0.09 + "s";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);
}

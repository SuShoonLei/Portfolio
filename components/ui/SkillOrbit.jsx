import { useEffect, useState } from "react";
import { FaJava } from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiVite,
  SiNodedotjs,
  SiPython,
  SiCplusplus,
  SiMysql,
  SiDotnet,
  SiGnubash,
  SiUnity,
  SiGit,
  SiGithub,
  SiLinux,
  SiGithubactions,
  SiIntellijidea,
} from "react-icons/si";

/** Tech stack icons (colors ≈ brand) — matches portfolio skills focus */
const iconConfigs = [
  { Icon: SiReact, color: "#61DAFB" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiHtml5, color: "#E34F26" },
  { Icon: SiCss, color: "#1572B6" },
  { Icon: SiVite, color: "#646CFF" },
  { Icon: SiNodedotjs, color: "#339933" },
  { Icon: SiPython, color: "#3776AB" },
  { Icon: FaJava, color: "#ED8B00" },
  { Icon: SiCplusplus, color: "#00599C" },
  { Icon: SiMysql, color: "#4479A1" },
  { Icon: SiDotnet, color: "#512BD4" },
  { Icon: SiGnubash, color: "#4EAA25" },
  { Icon: SiUnity, color: "#FFFFFF" },
  { Icon: SiGit, color: "#F05032" },
  { Icon: SiGithub, color: "#A78BFA" },
  { Icon: SiLinux, color: "#FCC624" },
  { Icon: SiGithubactions, color: "#2088FF" },
  { Icon: SiIntellijidea, color: "#e2e8f0" },
];

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
 * Orbiting skill icons (ported from stack-feature-section for Vite + JSX).
 * Styling lives in portfolio_v2.jsx (`.skill-orbit-*`).
 */
export default function SkillOrbit() {
  const reduceMotion = usePrefersReducedMotion();
  const orbitCount = 3;
  const orbitGapRem = 5;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <div className="skill-orbit-viewport" aria-hidden="true">
      <div className="skill-orbit-shifted">
        <div className="skill-orbit-hub">
          <SiReact className="skill-orbit-hub-icon" style={{ color: "#61DAFB" }} />
        </div>
        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const sizeRem = 9 + orbitGapRem * (orbitIdx + 1);
          const angleStep = (2 * Math.PI) / iconsPerOrbit;
          const slice = iconConfigs.slice(
            orbitIdx * iconsPerOrbit,
            orbitIdx * iconsPerOrbit + iconsPerOrbit
          );
          const duration = 20 + orbitIdx * 8;

          return (
            <div
              key={orbitIdx}
              className="skill-orbit-ring"
              style={{
                width: `${sizeRem}rem`,
                height: `${sizeRem}rem`,
                animation: reduceMotion ? "none" : `skill-orbit-spin ${duration}s linear infinite`,
                animationDirection: orbitIdx === 1 ? "reverse" : "normal",
              }}
            >
              {slice.map((cfg, iconIdx) => {
                const angle = iconIdx * angleStep;
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);
                const Icon = cfg.Icon;
                return (
                  <div
                    key={`${orbitIdx}-${iconIdx}`}
                    className="skill-orbit-node"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <Icon className="skill-orbit-node-icon" style={{ color: cfg.color }} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

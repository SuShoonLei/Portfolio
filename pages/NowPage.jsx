import { SpiralHoverAnchor } from "../SpiralHoverWrap.jsx";
import { SectionTitleDecrypt } from "../components/SectionTitleDecrypt.jsx";

export default function NowPage() {
  return (
    <section id="now">
      <div className="sec-label">Right now</div>
      <SectionTitleDecrypt prefix="Currently" accent="Up To" />
      <div className="sec-divider" />
      <div className="now-grid">
        <div className="now-card reveal">
          <h3>$ ls current_ops/</h3>
          <div className="terminal">
            <span className="prompt">→ </span>🎮&nbsp; Building <strong style={{ color: "var(--purple)" }}>Out You Run! 2D platformer</strong> — Unity group project (C#) with classmates.{" "}
            <SpiralHoverAnchor href="https://github.com/Min1322003/GroupGame" target="_blank" rel="noreferrer" className="now-terminal-link" canvasW={200} canvasH={40} starCount={240}>
              GitHub ↗
            </SpiralHoverAnchor>
            <br />
            <span className="prompt">→ </span>🤖&nbsp; Building AI-powered projects<br />
            <span className="prompt">→ </span>🔐&nbsp; Learning cybersecurity fundamentals<br />
            <span className="prompt">→ </span>🎓&nbsp; Finishing strong — graduating Dec 2026<br />
            <span className="prompt">→ </span>🌏&nbsp; Dreaming up the next travel destination ✈️
          </div>
        </div>
        <div className="now-card reveal">
          <h3>✦ Fun Facts</h3>
          <ul className="fun-list">
            {[
              ["🕯️", "I make candles, lip gloss & resin art — creativity doesn't stop at the IDE"],
              ["🍜", "I will travel anywhere for great food"],
              ["🎮", "Games are the most underrated form of creative engineering"],
              ["💡", <>My superpower: making things both <strong style={{ color: "var(--control)" }}>beautiful</strong> and <strong style={{ color: "var(--type)" }}>functional</strong></>],
            ].map(([icon, text]) => (
              <li key={icon}><span className="icon">{icon}</span>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

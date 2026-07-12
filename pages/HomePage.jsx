import { useState, useEffect } from "react";
import DecryptedText from "../DecryptedText.jsx";
import { SpiralHoverAnchor } from "../SpiralHoverWrap.jsx";
import SkillOrbit from "../components/ui/SkillOrbit.jsx";
import { FlipCard } from "../components/FlipCard.jsx";
import ShapeBlur from "../components/ShapeBlur.jsx";
import { PHRASES } from "../data/portfolio.js";
import { useOutletContext } from "react-router-dom";

function HeroDecryptTagline() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % PHRASES.length), 10800);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="hero-tagline">
      <DecryptedText
        key={i}
        text={PHRASES[i]}
        animateOn="view"
        sequential
        revealDirection="start"
        speed={56}
        className="hero-dt-rev"
        encryptedClassName="hero-dt-enc"
        parentClassName="hero-dt-wrap"
      />
    </p>
  );
}

export default function HomePage() {
  const { config } = useOutletContext();
  const links = config.links;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  return (
    <section id="hero">
      <div className="hero-text">
        <div className="pronouns-badge"><span>✦</span> she / her</div>
        <p className="hero-greeting">👋 Hi, I&apos;m</p>
        <h1 className="hero-name">Su Shoon Lei<br /><em>Khaing</em></h1>
        <p className="hero-welcome">
          Code is how I solve problems. Curiosity is why I keep doing it.
        </p>
        <HeroDecryptTagline />
        <p className="hero-bio">
          A graduating CS senior at <strong>SUNY Oswego</strong> with a love for building things at the intersection of <em>creativity and code</em>. Whether it&apos;s a game, web app, AI tool, or handmade craft, I put the same passion into everything I create.
        </p>
        <div className="code-snippet">
          <div className="code-snippet-border" aria-hidden="true">
            <ShapeBlur
              variation={0}
              pixelRatioProp={dpr}
              shapeSize={0.5}
              roundness={0.5}
              borderSize={0.05}
              circleSize={0.5}
              circleEdge={1}
            />
          </div>
          <div className="code-snippet-body">
            <span className="cm"># su.py</span><br />
            <span className="ck">su</span> = {"{"}<br />
            &nbsp;&nbsp;<span className="cs">"school"</span>{"     "}: <span className="cv">"SUNY Oswego - CS (Dec 2026)"</span>,<br />
            &nbsp;&nbsp;<span className="cs">"interests"</span>{"  "}: [<span className="cv">"Game Dev"</span>, <span className="cv">"Web Dev"</span>, <span className="cv">"AI/ML"</span>, <span className="cv">"App Dev"</span>, <span className="cv">"Cybersecurity"</span>],<br />
            &nbsp;&nbsp;<span className="cs">"crafts"</span>{"     "}: [<span className="cv">"Resin 🎨"</span>, <span className="cv">"Lip Gloss 💄"</span>, <span className="cv">"Candles 🕯️"</span>],<br />
            &nbsp;&nbsp;<span className="cs">"also_loves"</span>{" "}: [<span className="cv">"Cooking 🍳"</span>, <span className="cv">"Traveling ✈️"</span>],<br />
            &nbsp;&nbsp;<span className="cs">"fun_fact"</span>{"   "}: <span className="cv">"Creates things digitally AND with her hands 💻🤲"</span><br />
            {"}"}
          </div>
        </div>
        <div className="hero-btns">
          <SpiralHoverAnchor to="/projects" className="btn-primary" canvasW={380} canvasH={72} starCount={480}>
            View My Work →
          </SpiralHoverAnchor>
          <SpiralHoverAnchor href={links.linkedin} target="_blank" rel="noreferrer" className="btn-outline" canvasW={320} canvasH={64} starCount={420}>
            LinkedIn ↗
          </SpiralHoverAnchor>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-visual-wrap">
          <FlipCard />
          <SkillOrbit />
        </div>
      </div>
    </section>
  );
}

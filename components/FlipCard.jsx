import { useState } from "react";
import profileBackUrl from "../assets/profile-back.png?url";

function showCardPlaceholder(imgEl) {
  const wrap = imgEl?.closest?.(".card-face");
  imgEl.style.display = "none";
  const ph = wrap?.querySelector?.(".card-face-placeholder");
  if (ph) ph.style.display = "flex";
}

export function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div className={`card-scene ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(f => !f)}>
        <div className="card-inner">
          <div className="card-face card-front">
            <img
              key="front-avatar"
              src="https://github.com/SuShoonLei.png"
              alt="Su Shoon Lei Khaing — profile"
              draggable={false}
              onError={e => showCardPlaceholder(e.target)}
            />
            <div className="card-face-placeholder" style={{ display: "none" }}>👩‍💻</div>
          </div>
          <div className="card-face card-back">
            <img
              key="back-portrait"
              src={profileBackUrl}
              alt="Su Shoon Lei Khaing — portrait outdoors"
              draggable={false}
              onError={e => showCardPlaceholder(e.target)}
            />
            <div className="card-face-placeholder" style={{ display: "none" }}>✨</div>
          </div>
        </div>
      </div>
      <div className="flip-hint">{flipped ? "click to flip back ↺" : "click to flip ↻"}</div>
      <div className="float-card fc1"><span className="dot dg" /> Open to Opportunities</div>
      <div className="float-card fc2">🎓 CS Senior @ SUNY Oswego</div>
      <div className="float-card fc4">Vice President @ WiC</div>
      <div className="float-card fc3"><span className="dot dp" />Expected Graduation: Dec 2026</div>
    </div>
  );
}

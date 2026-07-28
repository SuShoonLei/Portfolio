import { useOutletContext } from "react-router-dom";
import DecryptedText from "../DecryptedText.jsx";
import { SpiralHoverAnchor } from "../SpiralHoverWrap.jsx";
import { Tag } from "../components/Tag.jsx";
import { CERTS, DT_SECTION } from "../data/portfolio.js";

export default function CertificationsPage() {
  const { config } = useOutletContext();
  const credentialUrl = config.certifications.credentialUrl;

  return (
    <section id="certifications">
      <div className="sec-label">Always learning</div>
      <h2 className="sec-title">
        Licenses &amp;{" "}
        <span className="sec-title-accent-inline">
          <DecryptedText text="Certifications" {...DT_SECTION} />
        </span>
      </h2>
      <div className="sec-divider" />
      <div className="certs-grid">
        {CERTS.map(({ logo, name, issuer, date, tags, credentialHref }) => (
          <div className="cert-card" key={name}>
            <div className="cert-logo">{logo}</div>
            <div className="cert-info">
              <div className="cert-name">{name}</div>
              <div className="cert-issuer">{issuer}</div>
              <div className="cert-date">{date}</div>
              <div className="cert-skills">
                {tags.map(([l, c]) => <Tag key={l} label={l} cls={c} />)}
              </div>
              <SpiralHoverAnchor href={credentialHref || credentialUrl} target="_blank" rel="noreferrer" className="cert-link" canvasW={300} canvasH={52} starCount={360}>
                Show credential ↗
              </SpiralHoverAnchor>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

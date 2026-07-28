import { useOutletContext } from "react-router-dom";
import { SpiralHoverAnchor } from "../SpiralHoverWrap.jsx";
import { Tag } from "../components/Tag.jsx";
import { SectionTitleDecrypt } from "../components/SectionTitleDecrypt.jsx";
import { WEBSITES } from "../data/portfolio.js";

function WebsiteCard({ banner, bannerBg, title, desc, tags, links, linksByTitle }) {
  return (
    <div className="project-card">
      <div className="p-banner-wrap">
        <div className="p-banner" style={{ background: bannerBg }}>{banner}</div>
      </div>
      <div className="p-body">
        <div className="p-title">{title}</div>
        <p className="p-desc">{desc}</p>
        <div className="tags" style={{ marginBottom: ".8rem" }}>
          {tags.map(([l, c]) => <Tag key={l} label={l} cls={c} />)}
        </div>
        <div className="p-links">
          {(linksByTitle?.[title] || links).map(({ label, cls, href }) => (
            <SpiralHoverAnchor key={label} href={href} target="_blank" rel="noreferrer" className={`pl ${cls}`} canvasW={300} canvasH={52} starCount={340}>
              {label}
            </SpiralHoverAnchor>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WebsitesPage() {
  const { config } = useOutletContext();
  const { allProjectsUrl, linksByTitle } = config.projects;

  return (
    <section id="websites">
      <div className="sec-label">Sites I've designed & shipped</div>
      <SectionTitleDecrypt prefix="Web" accent="Sites" />
      <div className="sec-divider" />
      <div className="projects-grid">
        {WEBSITES.map(site => (
          <WebsiteCard key={site.title} {...site} linksByTitle={linksByTitle} />
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "2.2rem", fontSize: ".87rem", color: "var(--text3)" }}>
        See all projects on &nbsp;
        <SpiralHoverAnchor href={allProjectsUrl} target="_blank" rel="noreferrer" className="projects-all-gh" canvasW={280} canvasH={56} starCount={380}>
          GitHub ↗
        </SpiralHoverAnchor>
      </p>
    </section>
  );
}

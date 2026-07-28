import { useOutletContext } from "react-router-dom";
import DecryptedText from "../DecryptedText.jsx";
import { SpiralHoverAnchor } from "../SpiralHoverWrap.jsx";
import { Tag } from "../components/Tag.jsx";
import { SectionTitleDecrypt } from "../components/SectionTitleDecrypt.jsx";
import { PROJECTS, BUILT_PROJECTS, WEBSITES, DT_SECTION } from "../data/portfolio.js";

function ProjectCard({ banner, bannerBg, hackathon, title, desc, tags, links, linksByTitle }) {
  return (
    <div className="project-card">
      <div className="p-banner-wrap">
        <div className="p-banner" style={{ background: bannerBg }}>{banner}</div>
        {hackathon && <span className="hackathon-badge">🏆 Hackathon</span>}
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

function ProjectBlock({ label, prefix, accent, title, items, linksByTitle }) {
  if (!items?.length) return null;
  return (
    <div className="projects-built-block">
      <div className="sec-label">{label}</div>
      {title ? (
        <h2 className="sec-title">
          <span className="sec-title-accent-inline">
            <DecryptedText text={title} {...DT_SECTION} />
          </span>
        </h2>
      ) : (
        <SectionTitleDecrypt prefix={prefix} accent={accent} />
      )}
      <div className="sec-divider" />
      <div className="projects-grid">
        {items.map(project => (
          <ProjectCard key={project.title} {...project} linksByTitle={linksByTitle} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { config } = useOutletContext();
  const { allProjectsUrl, linksByTitle } = config.projects;

  return (
    <section id="projects">
      <div className="sec-label">Things I've built</div>
      <SectionTitleDecrypt prefix="Featured" accent="Projects" />
      <div className="sec-divider" />
      <div className="projects-grid">
        {PROJECTS.map(project => (
          <ProjectCard key={project.title} {...project} linksByTitle={linksByTitle} />
        ))}
      </div>

      <ProjectBlock
        label="More of my work"
        prefix="Built"
        accent="Projects"
        items={BUILT_PROJECTS}
        linksByTitle={linksByTitle}
      />

      <ProjectBlock
        label="Sites I've designed & shipped"
        title="Websites"
        items={WEBSITES}
        linksByTitle={linksByTitle}
      />

      <p style={{ textAlign: "center", marginTop: "2.2rem", fontSize: ".87rem", color: "var(--text3)" }}>
        See all projects on &nbsp;
        <SpiralHoverAnchor href={allProjectsUrl} target="_blank" rel="noreferrer" className="projects-all-gh" canvasW={280} canvasH={56} starCount={380}>
          GitHub ↗
        </SpiralHoverAnchor>
      </p>
    </section>
  );
}

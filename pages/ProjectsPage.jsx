import { useOutletContext } from "react-router-dom";
import { SpiralHoverAnchor } from "../SpiralHoverWrap.jsx";
import { Tag } from "../components/Tag.jsx";
import { SectionTitleDecrypt } from "../components/SectionTitleDecrypt.jsx";
import { PROJECTS, BUILT_PROJECTS } from "../data/portfolio.js";

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

      <div className="projects-built-block">
        <div className="sec-label">More of my work</div>
        <SectionTitleDecrypt prefix="Built" accent="Projects" />
        <div className="sec-divider" />
        <div className="projects-grid">
          {BUILT_PROJECTS.map(project => (
            <ProjectCard key={project.title} {...project} linksByTitle={linksByTitle} />
          ))}
        </div>
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

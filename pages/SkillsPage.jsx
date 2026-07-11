import { Tag } from "../components/Tag.jsx";
import { SectionTitleDecrypt } from "../components/SectionTitleDecrypt.jsx";
import { SKILLS } from "../data/portfolio.js";

export default function SkillsPage() {
  return (
    <section id="skills">
      <div className="sec-label">What I work with</div>
      <SectionTitleDecrypt prefix="Tech" accent="Stack" />
      <div className="sec-divider" />
      <div className="skills-grid">
        {SKILLS.map(({ icon, title, tags }) => (
          <div className="skill-card" key={title}>
            <div className="skill-icon">{icon}</div>
            <h3>{title}</h3>
            <div className="tags">
              {tags.map(([label, cls]) => <Tag key={label} label={label} cls={cls} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

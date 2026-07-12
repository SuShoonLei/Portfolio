import { Tag } from "../components/Tag.jsx";
import { SectionTitleDecrypt } from "../components/SectionTitleDecrypt.jsx";
import ElectricBorder from "../components/ElectricBorder.jsx";
import { SKILLS } from "../data/portfolio.js";

const BORDER_COLORS = [
  "#b8d4f0",
  "#f5c6d0",
  "#ffe6a7",
  "#b8f2e6",
  "#e2d1f9",
  "#ffd6ba",
];

export default function SkillsPage() {
  return (
    <section id="skills">
      <div className="sec-label">What I work with</div>
      <SectionTitleDecrypt prefix="Tech" accent="Stack" />
      <div className="sec-divider" />
      <div className="skills-grid">
        {SKILLS.map(({ icon, title, tags }, i) => (
          <ElectricBorder
            key={title}
            className="skill-card"
            color={BORDER_COLORS[i % BORDER_COLORS.length]}
            speed={1}
            chaos={0.12}
            thickness={2}
            borderRadius={18}
            style={{ borderRadius: 18 }}
          >
            <div className="skill-card-body">
              <div className="skill-icon">{icon}</div>
              <h3>{title}</h3>
              <div className="tags">
                {tags.map(([label, cls]) => <Tag key={label} label={label} cls={cls} />)}
              </div>
            </div>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
}

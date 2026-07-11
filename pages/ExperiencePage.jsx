import { Tag } from "../components/Tag.jsx";
import { SectionTitleDecrypt } from "../components/SectionTitleDecrypt.jsx";

export default function ExperiencePage() {
  return (
    <section id="experience">
      <div className="sec-label">Where I've been</div>
      <SectionTitleDecrypt prefix="Work" accent="Experience" />
      <div className="sec-divider" />
      <div className="timeline">
        <div className="timeline-item">
          <div className="tl-dot" />
          <div className="tl-date">June 2026 — Present · Leadership · On-campus</div>
          <div className="tl-role">Vice President — Founder</div>
          <div className="tl-org">Women In Computing [WiC] · SUNY Oswego</div>
          <p className="tl-desc">
            Lead and grow a student organization that promotes the participation and success of women in computing and technology-related fields through workshops, networking, and community building.
          </p>
          <ul className="tl-bullets">
            <li>Lead and coordinate organization initiatives that promote the participation and success of women in computing and technology-related fields</li>
            <li>Collaborate with executive board members to plan workshops, networking events, and professional development opportunities for students</li>
            <li>Support member engagement and organizational growth by fostering an inclusive and welcoming community for students interested in computing</li>
          </ul>
          <div className="tl-tags">
            {[["Leadership","tg"],["Community Building","tp"],["Event Planning","tc"],["Mentorship","tv"],["Public Speaking","ti"],["Team Collaboration","ty"]].map(([l,c])=><Tag key={l} label={l} cls={c}/>)}
          </div>
        </div>
        <div className="timeline-item">
          <div className="tl-dot" />
          <div className="tl-date">Aug 2024 · Move-in season · On-campus</div>
          <div className="tl-role">Laker Move-In Captain</div>
          <div className="tl-org">Hart Hall &amp; Riggs Hall · Residential Life · SUNY Oswego</div>
          <p className="tl-desc">
            Team captain for two residence halls during new-student arrival: set the tone for a welcoming move-in, keep volunteers organized under busy timelines, and coordinate roles across the building.
          </p>
          <ul className="tl-bullets">
            <li>Greeted students and families and helped create a calm, positive first impression for both hall communities</li>
            <li>Led volunteer teams with clear role assignments, check-ins, and on-the-spot adjustments during peak traffic</li>
            <li>Balanced competing priorities with strong time management—keeping lines, elevators, and floor flow moving smoothly</li>
            <li>Partnered with hall staff to align expectations, solve issues quickly, and support a coordinated building-wide effort</li>
          </ul>
          <div className="tl-tags">
            {[["Leadership","tg"],["Team Management","ti"],["Time Management","tc"],["Communication","tv"],["Event Operations","tp"],["Customer Service","ty"]].map(([l,c])=><Tag key={l} label={l} cls={c}/>)}
          </div>
        </div>
        <div className="timeline-item">
          <div className="tl-dot" />
          <div className="tl-date">May 2024 — Present · Part-time · On-site</div>
          <div className="tl-role">Student Ambassador</div>
          <div className="tl-org">ISSS Office (International Student &amp; Scholar Services) · SUNY Oswego</div>
          <p className="tl-desc">Serve as a welcoming face and cultural bridge for international students and visitors at SUNY Oswego. Campus tours, orientation support, and ongoing community engagement.</p>
          <ul className="tl-bullets">
            <li>Guide tour groups from foreign countries visiting campus — immersive, culturally aware experiences that help visitors feel informed and welcomed</li>
            <li>Support high-traffic student events alongside Residential Life and campus partners during key arrival periods</li>
            <li>Build cross-cultural connections and help international students navigate campus resources and life in the US</li>
          </ul>
          <div className="tl-tags">
            {[["Leadership","tg"],["Communication","tc"],["Community Engagement","tp"],["Cross-Cultural Relations","tv"],["Customer Service","ty"],["Team Management","ti"]].map(([l,c])=><Tag key={l} label={l} cls={c}/>)}
          </div>
        </div>
        <div className="timeline-item">
          <div className="tl-dot" />
          <div className="tl-date">Aug 2023 — Dec 2026</div>
          <div className="tl-role">BS Computer Science · GPA 3.6</div>
          <div className="tl-org">State University of New York at Oswego</div>
          <p className="tl-desc">Building a strong foundation across data structures, algorithms, OS, networking, and software engineering while growing a passion for game dev and creative technology. Exploring multiple programming paradigms from OOP to functional.</p>
          <div className="tl-tags">
            {[["C","ti"],["Java","ty"],["Scala","tv"],["Algorithms","tc"],["Computer Networks","tg"]].map(([l,c])=><Tag key={l} label={l} cls={c}/>)}
          </div>
        </div>
      </div>
    </section>
  );
}

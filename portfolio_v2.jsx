import { useState, useEffect, useRef } from "react";

const ACCENT = "#b48fe0";
const ACCENT2 = "#c96b8a";
const ACCENT3 = "#6dcfda";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --pink:#f472b6; --purple:#8b5cf6; --indigo:#6366f1; --cyan:#06b6d4; --green:#22c55e; --yellow:#f59e0b;
    --bg:#0b1020; --bg2:#10172a; --bg3:#141d34; --surface:#1a2440;
    --border:rgba(148,163,184,.18); --border-accent:rgba(99,102,241,.35);
    --text:#e2e8f0; --text2:#94a3b8; --text3:#64748b;
    --accent:#8b5cf6; --accent2:#ec4899; --accent3:#06b6d4;
    --glow:rgba(99,102,241,.24);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: radial-gradient(circle at top right, rgba(99,102,241,.12), transparent 40%), var(--bg); color: var(--text); overflow-x: hidden; }

  /* Progress bar */
  #progress-bar { position:fixed; top:0; left:0; height:2px; background:linear-gradient(90deg,var(--accent2),var(--accent),var(--accent3)); z-index:9998; border-radius:0 2px 2px 0; transition:width .1s; }

  /* Nav */
  nav { position:fixed; top:0; left:0; right:0; z-index:500; display:flex; justify-content:space-between; align-items:center; padding:1.1rem 3.5rem; background:rgba(28,28,30,.82); backdrop-filter:blur(22px) saturate(1.4); border-bottom:1px solid var(--border); transition:box-shadow .3s; }
  nav.scrolled { box-shadow:0 4px 32px rgba(0,0,0,.4); }
  .nav-logo { font-family:'Space Grotesk',sans-serif; font-size:1.2rem; font-weight:700; color:var(--text); text-decoration:none; letter-spacing:.02em; text-transform:uppercase; }
  .nav-logo span { color:var(--accent); }
  .nav-links { display:flex; gap:2.2rem; list-style:none; }
  .nav-links a { font-size:.78rem; font-weight:500; color:var(--text2); text-decoration:none; letter-spacing:.1em; text-transform:uppercase; position:relative; transition:color .25s; padding:.2rem 0; cursor:pointer; }
  .nav-links a::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1.5px; background:var(--accent); border-radius:2px; transition:width .35s cubic-bezier(.16,1,.3,1); }
  .nav-links a:hover, .nav-links a.active { color:var(--text); }
  .nav-links a:hover::after, .nav-links a.active::after { width:100%; }

  /* Noise overlay */
  .noise-overlay { position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E"); pointer-events:none; z-index:9999; }

  /* Back to top */
  #back-top { position:fixed; bottom:2rem; right:2rem; width:42px; height:42px; border-radius:50%; background:var(--bg3); color:var(--accent); border:1px solid var(--border-accent); font-size:1rem; box-shadow:0 4px 18px rgba(0,0,0,.4); opacity:0; transform:translateY(10px); transition:opacity .3s,transform .3s,background .2s,color .2s; z-index:400; cursor:pointer; }
  #back-top.visible { opacity:1; transform:translateY(0); }
  #back-top:hover { transform:translateY(-3px); background:var(--accent); color:#111; }

  /* Sections */
  section { padding:5.5rem 5rem; position:relative; z-index:1; }
  .sec-label { font-family:'JetBrains Mono',monospace; font-size:.8rem; color:var(--accent3); margin-bottom:.4rem; letter-spacing:.1em; text-transform:uppercase; }
  .sec-title { font-family:'Space Grotesk',sans-serif; font-size:clamp(1.9rem,3vw,2.8rem); color:var(--text); margin-bottom:2.8rem; line-height:1.2; }
  .sec-title em { font-style:normal; background:linear-gradient(135deg,var(--accent2),var(--accent)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .sec-divider { width:60px; height:1.5px; background:linear-gradient(90deg,var(--accent2),var(--accent)); border-radius:2px; margin-bottom:2.8rem; margin-top:-.5rem; }

  /* Reveal animations */
  .reveal { opacity:0; transform:translateY(32px); transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1); }
  .reveal.visible { opacity:1; transform:none; }
  .reveal-scale { opacity:0; transform:scale(.9) translateY(20px); transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1); }
  .reveal-scale.visible { opacity:1; transform:none; }

  /* Tags */
  .tags { display:flex; flex-wrap:wrap; gap:.4rem; }
  .tag { font-size:.7rem; font-weight:500; padding:.25rem .65rem; border-radius:50px; transition:transform .2s; cursor:default; }
  .tag:hover { transform:scale(1.1); }
  .tp { background:rgba(201,107,138,.15); color:#e8a0bf; }
  .tv { background:rgba(180,143,224,.15); color:#b48fe0; }
  .ti { background:rgba(139,156,245,.15); color:#8b9cf5; }
  .tc { background:rgba(109,207,218,.15); color:#6dcfda; }
  .tg { background:rgba(125,212,168,.15); color:#7dd4a8; }
  .ty { background:rgba(212,184,122,.15); color:#d4b87a; }

  /* Hero */
  #hero { min-height:100vh; display:grid; grid-template-columns:1.1fr .9fr; align-items:center; padding:7rem 5rem 4rem; position:relative; overflow:hidden; }
  .hero-text { position:relative; z-index:2; }
  .pronouns-badge { display:inline-flex; align-items:center; gap:.4rem; background:rgba(180,143,224,.1); border:1px solid rgba(180,143,224,.2); color:var(--accent); font-size:.7rem; font-weight:500; letter-spacing:.12em; text-transform:uppercase; padding:.3rem .9rem; border-radius:50px; margin-bottom:1.2rem; animation:fadeUp .7s ease both; }
  .hero-greeting { font-family:'JetBrains Mono',monospace; font-size:.9rem; color:var(--accent3); margin-bottom:.5rem; animation:fadeUp .7s .1s ease both; text-transform:uppercase; letter-spacing:.08em; }
  .hero-name { font-family:'Space Grotesk',sans-serif; font-size:clamp(2.6rem,4.5vw,4.4rem); line-height:1.08; color:var(--text); margin-bottom:.3rem; animation:fadeUp .7s .15s ease both; }
  .hero-name em { font-style:normal; background:linear-gradient(135deg,var(--accent2),var(--accent)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .hero-tagline { font-family:'JetBrains Mono',monospace; font-size:.86rem; color:var(--accent); letter-spacing:.04em; margin-bottom:1.4rem; animation:fadeUp .7s .22s ease both; min-height:1.4em; }
  .tw-cursor { display:inline-block; width:2px; height:.9em; background:var(--accent); margin-left:1px; animation:blink 1s step-end infinite; vertical-align:middle; }
  @keyframes blink { 0%,100%{opacity:1;}50%{opacity:0;} }
  .hero-bio { font-size:.95rem; line-height:1.9; color:var(--text2); max-width:500px; margin-bottom:1.6rem; animation:fadeUp .7s .3s ease both; }
  .hero-bio strong { color:var(--text); }
  .code-snippet { background:#0a0f1f; border-radius:12px; padding:1.1rem 1.4rem; font-family:'JetBrains Mono',monospace; font-size:.73rem; line-height:1.85; color:#cbd5e1; margin-bottom:2rem; border:1px solid var(--border); position:relative; animation:fadeUp .7s .38s ease both; }
  .code-snippet::before { content:'python'; position:absolute; top:.5rem; right:1rem; font-size:.62rem; color:rgba(180,143,224,.35); letter-spacing:.08em; text-transform:uppercase; }
  .ck{color:var(--accent);} .cv{color:var(--accent3);} .cs{color:var(--green);} .cm{color:#555;}
  .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; animation:fadeUp .7s .46s ease both; }
  .btn-primary { background:linear-gradient(135deg,var(--accent2),var(--accent)); color:white; padding:.8rem 1.8rem; border-radius:50px; text-decoration:none; font-weight:500; font-size:.86rem; box-shadow:0 6px 22px rgba(180,143,224,.25); transition:transform .3s,box-shadow .3s; display:inline-block; cursor:pointer; }
  .btn-primary:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(180,143,224,.38); }
  .btn-outline { border:1.5px solid rgba(180,143,224,.4); color:var(--accent); padding:.78rem 1.8rem; border-radius:50px; text-decoration:none; font-weight:500; font-size:.86rem; transition:all .3s; background:rgba(180,143,224,.06); display:inline-block; }
  .btn-outline:hover { background:rgba(180,143,224,.14); transform:translateY(-3px); border-color:var(--accent); }
  @keyframes fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }

  /* Flip card */
  .hero-visual { position:relative; z-index:2; display:flex; justify-content:center; align-items:center; animation:fadeUp .7s .2s ease both; }
  .card-scene { width:300px; height:380px; perspective:1000px; cursor:pointer; }
  .card-inner { width:100%; height:100%; position:relative; transform-style:preserve-3d; transition:transform .75s cubic-bezier(.4,0,.2,1); transform:rotate(-4deg) rotateY(0deg); filter:drop-shadow(0 30px 50px rgba(0,0,0,.7)); }
  .card-scene:hover .card-inner { transform:rotate(-1deg) rotateY(0deg) scale(1.03); }
  .card-scene.flipped .card-inner { transform:rotate(2deg) rotateY(180deg); }
  .card-scene.flipped:hover .card-inner { transform:rotate(2deg) rotateY(180deg) scale(1.03); }
  .card-face { position:absolute; inset:0; backface-visibility:hidden; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,.09); }
  .card-face img { width:100%; height:100%; object-fit:cover; display:block; }
  .card-face-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:5rem; background:#1a1a1c; }
  .card-front { background:#1a1a1c; }
  .card-front::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom,rgba(0,0,0,.35) 0%,transparent 30%,transparent 65%,rgba(0,0,0,.55) 100%),linear-gradient(to right,rgba(0,0,0,.2) 0%,transparent 20%,transparent 80%,rgba(0,0,0,.2) 100%); border-radius:20px; pointer-events:none; }
  .card-back { transform:rotateY(180deg); background:#1a1a1c; }
  .card-back::after { content:''; position:absolute; inset:0; background:linear-gradient(to bottom,rgba(0,0,0,.3) 0%,transparent 25%,transparent 65%,rgba(0,0,0,.5) 100%); border-radius:20px; pointer-events:none; }
  .flip-hint { position:absolute; bottom:-2.2rem; left:50%; transform:translateX(-50%); font-size:.68rem; color:var(--text3); letter-spacing:.1em; text-transform:uppercase; font-family:'JetBrains Mono',monospace; white-space:nowrap; transition:color .3s; }
  .card-scene:hover .flip-hint { color:var(--accent); }
  .float-card { position:absolute; background:rgba(36,36,38,.92); backdrop-filter:blur(10px); border-radius:12px; padding:.6rem 1rem; font-size:.72rem; font-weight:500; color:var(--text); box-shadow:0 8px 28px rgba(0,0,0,.4); display:flex; align-items:center; gap:.5rem; border:1px solid var(--border); z-index:3; }
  .fc1 { top:-10px; right:-30px; animation:bob 4s ease-in-out infinite; }
  .fc2 { bottom:60px; left:-45px; animation:bob 4s 1.5s ease-in-out infinite; }
  .fc3 { bottom:-5px; right:-10px; animation:bob 4s 3s ease-in-out infinite; }
  @keyframes bob { 0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);} }
  .dot { width:7px; height:7px; border-radius:50%; display:inline-block; }
  .dg { background:#6dcf9f; }
  .dp { background:var(--accent); }

  /* Skills */
  #skills { background:var(--bg); }
  .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(265px,1fr)); gap:1.3rem; }
  .skill-card { background:var(--bg2); border-radius:18px; padding:1.6rem; border:1px solid var(--border); box-shadow:0 2px 12px rgba(0,0,0,.3); opacity:0; transform:translateY(32px); transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1),box-shadow .3s; }
  .skill-card.visible { opacity:1; transform:none; }
  .skill-card:hover { transform:translateY(-6px) !important; box-shadow:0 12px 36px rgba(0,0,0,.45),0 0 0 1px var(--border-accent); }
  .skill-card:hover .skill-icon { animation:wiggle .5s ease; }
  @keyframes wiggle { 0%,100%{transform:rotate(0);}25%{transform:rotate(-12deg);}75%{transform:rotate(12deg);} }
  .skill-icon { font-size:1.8rem; margin-bottom:.7rem; display:inline-block; }
  .skill-card h3 { font-family:'Space Grotesk',sans-serif; font-size:1rem; color:var(--text); margin-bottom:.7rem; }

  /* Experience */
  #experience { background:var(--bg2); }
  .timeline { padding-left:2.4rem; position:relative; }
  .timeline::before { content:''; position:absolute; left:0; top:0; bottom:0; width:1.5px; background:linear-gradient(to bottom,var(--accent2),var(--accent),var(--accent3)); border-radius:2px; opacity:.5; }
  .timeline-item { position:relative; margin-bottom:2.8rem; opacity:0; transform:translateX(-40px); transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1); }
  .timeline-item.visible { opacity:1; transform:none; }
  .tl-dot { position:absolute; left:-2.7rem; top:7px; width:13px; height:13px; border-radius:50%; background:linear-gradient(135deg,var(--accent2),var(--accent)); border:2.5px solid var(--bg2); box-shadow:0 0 0 3px rgba(180,143,224,.2); transition:transform .3s,box-shadow .3s; }
  .timeline-item:hover .tl-dot { transform:scale(1.5); box-shadow:0 0 0 6px rgba(180,143,224,.12),0 0 18px rgba(180,143,224,.35); }
  .tl-date { font-size:.72rem; font-weight:500; color:var(--accent); letter-spacing:.08em; text-transform:uppercase; margin-bottom:.3rem; }
  .tl-role { font-family:'Space Grotesk',sans-serif; font-size:1.2rem; color:var(--text); margin-bottom:.15rem; }
  .tl-org { font-size:.85rem; color:var(--accent2); font-weight:500; margin-bottom:.7rem; }
  .tl-desc { font-size:.88rem; line-height:1.85; color:var(--text2); max-width:640px; }
  .tl-bullets { list-style:none; margin:.5rem 0 0; display:flex; flex-direction:column; gap:.5rem; }
  .tl-bullets li { font-size:.86rem; line-height:1.75; color:var(--text2); padding-left:1.4rem; position:relative; }
  .tl-bullets li::before { content:'→'; position:absolute; left:0; color:var(--accent); font-size:.75rem; }
  .tl-tags { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.7rem; }

  /* Certifications */
  #certifications { background:var(--bg); }
  .certs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(285px,1fr)); gap:1.3rem; }
  .cert-card { background:var(--bg2); border-radius:16px; padding:1.4rem 1.5rem; border:1px solid var(--border); box-shadow:0 2px 12px rgba(0,0,0,.25); display:flex; gap:.9rem; align-items:flex-start; opacity:0; transform:translateY(24px) scale(.97); transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1),box-shadow .3s; }
  .cert-card.visible { opacity:1; transform:none; }
  .cert-card:hover { transform:translateY(-5px) !important; box-shadow:0 10px 32px rgba(0,0,0,.4),0 0 0 1px var(--border-accent); }
  .cert-logo { width:42px; height:42px; border-radius:10px; background:linear-gradient(135deg,#0e76a8,#094d6e); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.2rem; }
  .cert-info { flex:1; }
  .cert-name { font-family:'Space Grotesk',sans-serif; font-size:.93rem; color:var(--text); margin-bottom:.2rem; line-height:1.35; }
  .cert-issuer { font-size:.72rem; color:var(--text3); margin-bottom:.35rem; }
  .cert-date { font-size:.68rem; font-weight:500; color:var(--accent); letter-spacing:.06em; text-transform:uppercase; margin-bottom:.45rem; }
  .cert-link { display:inline-flex; align-items:center; gap:.3rem; font-size:.7rem; font-weight:500; color:var(--accent2); text-decoration:none; background:rgba(201,107,138,.1); padding:.2rem .55rem; border-radius:50px; transition:all .22s; }
  .cert-link:hover { background:var(--accent2); color:white; }
  .cert-skills { display:flex; flex-wrap:wrap; gap:.35rem; margin-top:.45rem; }

  /* Projects */
  #projects { background:var(--bg2); }
  .projects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(310px,1fr)); gap:1.7rem; }
  .project-card { background:var(--bg3); border-radius:20px; overflow:hidden; border:1px solid var(--border); box-shadow:0 4px 20px rgba(0,0,0,.35); opacity:0; transform:translateY(40px) scale(.96); transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1),box-shadow .35s; }
  .project-card.visible { opacity:1; transform:none; }
  .project-card:hover { transform:translateY(-8px) scale(1.01) !important; box-shadow:0 18px 48px rgba(0,0,0,.55),0 0 0 1px var(--border-accent); }
  .p-banner-wrap { position:relative; }
  .p-banner { height:145px; display:flex; align-items:center; justify-content:center; font-size:3rem; transition:transform .4s cubic-bezier(.34,1.56,.64,1); }
  .project-card:hover .p-banner { transform:scale(1.14); }
  .hackathon-badge { position:absolute; top:.7rem; right:.7rem; background:linear-gradient(135deg,var(--accent2),var(--accent)); color:white; font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:.25rem .65rem; border-radius:50px; font-family:'Fira Code',monospace; }
  .p-body { padding:1.4rem; }
  .p-title { font-family:'Space Grotesk',sans-serif; font-size:1.1rem; color:var(--text); margin-bottom:.4rem; }
  .p-desc { font-size:.83rem; line-height:1.75; color:var(--text2); margin-bottom:.9rem; }
  .p-links { display:flex; gap:.6rem; flex-wrap:wrap; }
  .pl { font-size:.72rem; font-weight:500; text-decoration:none; padding:.35rem .8rem; border-radius:50px; transition:all .22s; }
  .pl-gh { background:rgba(180,143,224,.14); color:var(--accent); border:1px solid rgba(180,143,224,.2); }
  .pl-gh:hover { background:var(--accent); color:#111; transform:translateY(-2px); }
  .pl-live { background:rgba(201,107,138,.14); color:var(--accent2); border:1px solid rgba(201,107,138,.2); }
  .pl-live:hover { background:var(--accent2); color:white; transform:translateY(-2px); }

  /* Now */
  #now { background:#111113; }
  .now-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.8rem; }
  .now-card { background:rgba(255,255,255,.03); border:1px solid var(--border); border-radius:18px; padding:1.7rem; transition:border-color .3s,background .3s; }
  .now-card:hover { background:rgba(255,255,255,.05); border-color:rgba(180,143,224,.25); }
  .now-card h3 { font-family:'Space Grotesk',sans-serif; font-size:1.1rem; margin-bottom:1.1rem; color:var(--accent2); }
  .terminal { background:#0a0f1f; border-radius:10px; padding:1.2rem 1.4rem; font-family:'JetBrains Mono',monospace; font-size:.75rem; line-height:2; color:#a8a29e; border:1px solid rgba(255,255,255,.05); }
  .prompt { color:var(--green); }
  .fun-list { list-style:none; display:flex; flex-direction:column; gap:.85rem; }
  .fun-list li { font-size:.88rem; line-height:1.7; color:var(--text2); padding-left:1.6rem; position:relative; transition:color .2s; }
  .fun-list li:hover { color:var(--text); }
  .fun-list li .icon { position:absolute; left:0; }

  /* Contact */
  #contact { background:var(--bg); text-align:center; }
  .contact-sub { font-size:.94rem; color:var(--text2); max-width:440px; margin:0 auto 2.6rem; line-height:1.85; }
  .contact-grid { display:flex; justify-content:center; gap:.9rem; flex-wrap:wrap; margin-bottom:2rem; }
  .cl { display:flex; align-items:center; gap:.55rem; text-decoration:none; padding:.8rem 1.6rem; border-radius:50px; font-size:.85rem; font-weight:500; color:var(--text); background:var(--bg2); border:1px solid var(--border); backdrop-filter:blur(6px); transition:all .28s; }
  .cl:hover { transform:translateY(-4px); background:var(--bg3); border-color:var(--border-accent); box-shadow:0 10px 28px rgba(0,0,0,.4); }
  .footer-sig { font-family:'JetBrains Mono',monospace; font-size:.8rem; color:var(--text3); margin-top:3rem; text-transform:uppercase; letter-spacing:.08em; }

  @media(max-width:900px) {
    #hero { grid-template-columns:1fr; padding:7rem 2rem 4rem; text-align:center; }
    .hero-bio, .code-snippet { margin-left:auto; margin-right:auto; }
    .hero-btns { justify-content:center; }
    .hero-visual { margin-top:3rem; }
    .fc1,.fc2,.fc3 { display:none; }
    .card-scene { width:240px; height:300px; }
    section { padding:4rem 1.8rem; }
    .now-grid { grid-template-columns:1fr; }
    nav { padding:1rem 1.5rem; }
  }
  @media(max-width:600px) {
    .nav-links { display:none; }
    .projects-grid,.skills-grid,.certs-grid { grid-template-columns:1fr; }
  }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────
const SKILLS = [
  { icon:"🎨", title:"Frontend", tags:[["HTML5","tp"],["CSS3","ti"],["JavaScript","ty"],["React","tc"]] },
  { icon:"⚙️", title:"Backend & Languages", tags:[["Python","tc"],["Java","ty"],["C","ti"],["NodeJS","tg"],["Clojure","tv"],["MySQL","tg"]] },
  { icon:"🎮", title:"Game Development", tags:[["Unity","tp"],["libGDX","ty"],["C#","tg"]] },
  { icon:"⚡", title:"DevOps & Tools", tags:[["Git","ty"],["GitHub","tv"],["GitHub Actions","tc"],["Linux","tg"],["Terminal","ti"]] },
  { icon:"🧰", title:"IDEs & Editors", tags:[["VS Code","tc"],["IntelliJ IDEA","tv"],["Xcode","ti"],["Cursor","tp"]] },
  { icon:"🤝", title:"Soft Skills", tags:[["Communication","tp"],["Customer Service","tg"],["Leadership","tv"],["Mentoring","tc"]] },
];

const CERTS = [
  { logo:"🗄️", name:"SQL for Non-Programmers", issuer:"LinkedIn Learning Community", date:"Issued Jan 2026", tags:[["SQL","tc"]] },
  { logo:"🤖", name:"Prompt Engineering: How to Talk to the AIs", issuer:"LinkedIn Learning Community", date:"Issued Jan 2026", tags:[["Prompt Engineering","tv"],["AI","tg"],["LLM","tc"]] },
  { logo:"⚡", name:"Advanced C Programming: Optimize Performance and Efficiency", issuer:"LinkedIn Learning Community", date:"Issued Jan 2026", tags:[["C","ti"]] },
  { logo:"🔷", name:"Introduction to Scala", issuer:"LinkedIn Learning Community", date:"Issued Feb 2025", tags:[["Scala","tv"]] },
];

const PROJECTS = [
  {
    banner:"📡",
    bannerBg:"linear-gradient(135deg,#0f172a,#1e1b4b)",
    title:"SocketBench",
    desc:"Java TCP/UDP benchmarking suite: client-server pairs measure RTT and throughput across payload sizes, warm-up rounds, optional XOR obfuscation, and JSON export for plotting.",
    tags:[["Java","ty"],["TCP/UDP","tc"],["Sockets","tv"],["Networking","ti"],["Benchmarking","tg"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/SocketBench" }],
  },
  {
    banner:"🧩",
    bannerBg:"linear-gradient(135deg,#134e4a,#164e63)",
    title:"Sudoku Game (API + Swing)",
    desc:"Desktop Sudoku with Swing UI, Dosuku API puzzles, validation and hints via backtracking, plus distributed hint servers for harder cases.",
    tags:[["Java","ty"],["Swing","tp"],["REST API","tc"],["Concurrency","tv"],["Maven","tg"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/two--player-game-puzzle-using-parallel-move-evaluation" }],
  },
  {
    banner:"🧬",
    bannerBg:"linear-gradient(135deg,#1a1033,#312e81)",
    title:"Factory Layout Optimizer (GA)",
    desc:"Parallel genetic algorithm that places factory stations on a 2D grid to maximize pairwise affinity—multi-worker evolution with live visualization.",
    tags:[["Java","ty"],["Genetic Algorithm","tv"],["Parallel","tc"],["Optimization","ti"],["Swing/GUI","tp"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/GeneticAlgorithm" }],
  },
];

const PHRASES = [
  "CS Student @ SUNY Oswego 🎓",
  "Game Dev | Web Dev | AI | Cybersecurity 🚀",
  "Coder by day, Foodie by night",
  "Crafting code & food with equal passion ✨",
  "Building cool things, one commit at a time 💜",
];

const DEFAULT_CONFIG = {
  links: {
    linkedin: "https://www.linkedin.com/in/su-shoon-lei-khaing-k280825",
    github: "https://github.com/SuShoonLei",
    email: "sushoonleikhaing04@gmail.com",
  },
  certifications: {
    credentialUrl: "https://www.linkedin.com/in/su-shoon-lei-khaing-k280825",
  },
  projects: {
    allProjectsUrl: "https://github.com/SuShoonLei",
    linksByTitle: {},
  },
};

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    const els = document.querySelectorAll(
      ".skill-card, .project-card, .timeline-item, .cert-card, .reveal, .reveal-scale"
    );
    els.forEach((el, i) => {
      if (el.classList.contains("skill-card")) el.style.transitionDelay = (i % 6) * 0.07 + "s";
      if (el.classList.contains("project-card")) el.style.transitionDelay = (i % 4) * 0.1 + "s";
      if (el.classList.contains("timeline-item")) el.style.transitionDelay = (i % 5) * 0.14 + "s";
      if (el.classList.contains("cert-card")) el.style.transitionDelay = (i % 4) * 0.09 + "s";
      observer.observe(el);
    });
    return () => observer.disconnect();
  });
}

// ─── Small components ─────────────────────────────────────────────────────────
function Tag({ label, cls }) {
  return <span className={`tag ${cls}`}>{label}</span>;
}

function BgCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let W, H, raf;
    function resize() { W = c.width = innerWidth; H = c.height = innerHeight; }
    resize();
    window.addEventListener("resize", resize);
    const orbs = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * 1.4 - 0.2, y: Math.random() * 1.4 - 0.2,
      r: 0.25 + Math.random() * 0.3, vx: (Math.random() - 0.5) * 0.00012, vy: (Math.random() - 0.5) * 0.0001,
      hue: [270, 290, 200, 180, 240, 310][i], sat: 35 + Math.random() * 20,
      lit: 18 + Math.random() * 10, alpha: 0.04 + Math.random() * 0.05,
    }));
    const dust = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025, vy: -0.0001 - Math.random() * 0.00015,
      r: 0.4 + Math.random() * 0.9, alpha: 0.12 + Math.random() * 0.25,
    }));
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#1c1c1e"; ctx.fillRect(0, 0, W, H);
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -0.3) o.vx = Math.abs(o.vx); if (o.x > 1.3) o.vx = -Math.abs(o.vx);
        if (o.y < -0.3) o.vy = Math.abs(o.vy); if (o.y > 1.3) o.vy = -Math.abs(o.vy);
        const px = o.x * W, py = o.y * H, pr = o.r * Math.min(W, H);
        const g = ctx.createRadialGradient(px, py, 0, px, py, pr);
        g.addColorStop(0, `hsla(${o.hue},${o.sat}%,${o.lit}%,${o.alpha})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
      });
      dust.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.y < -0.01) d.y = 1.01; if (d.x < -0.01) d.x = 1.01; if (d.x > 1.01) d.x = -0.01;
        ctx.beginPath(); ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,190,220,${d.alpha})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }} />;
}

function Typewriter() {
  const [text, setText] = useState("");
  const state = useRef({ pi: 0, ci: 0, del: false });
  useEffect(() => {
    let timeout;
    function loop() {
      const { pi, ci, del } = state.current;
      const w = PHRASES[pi];
      if (!del) {
        const next = ci + 1;
        setText(w.slice(0, next));
        if (next === w.length) {
          state.current = { pi, ci: next, del: true };
          timeout = setTimeout(loop, 1900);
        } else {
          state.current = { pi, ci: next, del: false };
          timeout = setTimeout(loop, 72 + Math.random() * 42);
        }
      } else {
        const next = ci - 1;
        setText(w.slice(0, next));
        if (next === 0) {
          state.current = { pi: (pi + 1) % PHRASES.length, ci: 0, del: false };
          timeout = setTimeout(loop, 300);
        } else {
          state.current = { pi, ci: next, del: true };
          timeout = setTimeout(loop, 40);
        }
      }
    }
    timeout = setTimeout(loop, 400);
    return () => clearTimeout(timeout);
  }, []);
  return <span>{text}<span className="tw-cursor" /></span>;
}

function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div className={`card-scene ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(f => !f)}>
        <div className="card-inner">
          <div className="card-face card-front">
            <img
              src="https://github.com/SuShoonLei.png"
              alt="Su Shoon Lei Khaing"
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div className="card-face-placeholder" style={{ display: "none" }}>👩‍💻</div>
          </div>
          <div className="card-face card-back">
            <img
              src="https://github.com/SuShoonLei.png"
              alt="Su Shoon Lei Khaing — back"
              onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div className="card-face-placeholder" style={{ display: "none" }}>✨</div>
          </div>
        </div>
      </div>
      <div className="flip-hint">{flipped ? "click to flip back ↺" : "click to flip ↻"}</div>
      <div className="float-card fc1"><span className="dot dg" /> Open to Opportunities</div>
      <div className="float-card fc2">🎓 CS Senior @ SUNY Oswego</div>
      <div className="float-card fc3"><span className="dot dp" /> Dec 2026</div>
    </div>
  );
}

// ─── Section components ───────────────────────────────────────────────────────
function Hero({ links }) {
  return (
    <section id="hero">
      <div className="hero-text">
        <div className="pronouns-badge"><span>✦</span> she / her</div>
        <p className="hero-greeting">👋 Hi, I&apos;m</p>
        <h1 className="hero-name">Su Shoon Lei<br /><em>Khaing</em></h1>
        <p className="hero-tagline"><Typewriter /></p>
        <p className="hero-bio">
          A graduating CS senior at <strong>SUNY Oswego</strong> with a love for building things at the intersection of <em>creativity and code</em>. Whether it&apos;s a game, web app, AI tool, or handmade craft, I put the same passion into everything I create.
        </p>
        <div className="code-snippet">
          <span className="cm"># su.py</span><br />
          <span className="ck">su</span> = {"{"}<br />
          &nbsp;&nbsp;<span className="cs">"school"</span>{"     "}: <span className="cv">"SUNY Oswego - CS (Dec 2026)"</span>,<br />
          &nbsp;&nbsp;<span className="cs">"interests"</span>{"  "}: [<span className="cv">"Game Dev"</span>, <span className="cv">"Web Dev"</span>, <span className="cv">"AI/ML"</span>, <span className="cv">"App Dev"</span>, <span className="cv">"Cybersecurity"</span>],<br />
          &nbsp;&nbsp;<span className="cs">"crafts"</span>{"     "}: [<span className="cv">"Resin 🎨"</span>, <span className="cv">"Lip Gloss 💄"</span>, <span className="cv">"Candles 🕯️"</span>],<br />
          &nbsp;&nbsp;<span className="cs">"also_loves"</span>{" "}: [<span className="cv">"Cooking 🍳"</span>, <span className="cv">"Traveling ✈️"</span>],<br />
          &nbsp;&nbsp;<span className="cs">"fun_fact"</span>{"   "}: <span className="cv">"Creates things digitally AND with her hands 💻🤲"</span><br />
          {"}"}
        </div>
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">View My Work →</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-outline">LinkedIn ↗</a>
        </div>
      </div>
      <div className="hero-visual">
        <FlipCard />
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="sec-label">What I work with</div>
      <h2 className="sec-title">Tech <em>Stack</em></h2>
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

function Experience() {
  return (
    <section id="experience">
      <div className="sec-label">Where I've been</div>
      <h2 className="sec-title">Work <em>Experience</em></h2>
      <div className="sec-divider" />
      <div className="timeline">
        <div className="timeline-item">
          <div className="tl-dot" />
          <div className="tl-date">May 2024 — Present · Part-time · On-site</div>
          <div className="tl-role">Student Ambassador</div>
          <div className="tl-org">ISSS Office (International Student &amp; Scholar Services) · SUNY Oswego</div>
          <p className="tl-desc">Serve as a welcoming face and cultural bridge for international students and visitors at SUNY Oswego. Responsibilities span campus tours, student move-in leadership, and ongoing community engagement.</p>
          <ul className="tl-bullets">
            <li>Guide tour groups from foreign countries visiting campus — leading immersive, culturally-aware campus experiences that help international visitors feel welcomed and informed</li>
            <li>Served as <strong style={{ color: "var(--text)" }}>Laker Move-In Captain</strong> for Hart Hall and Riggs Hall — leading a team of volunteers to welcome and assist new students moving into the residence halls</li>
            <li>Build cross-cultural connections and provide ongoing support to international students navigating campus resources and life in the US</li>
          </ul>
          <div className="tl-tags">
            {[["Leadership","tg"],["Communication","tc"],["Community Engagement","tp"],["Cross-Cultural Relations","tv"],["Customer Service","ty"],["Team Management","ti"]].map(([l,c])=><Tag key={l} label={l} cls={c}/>)}
          </div>
        </div>
        <div className="timeline-item">
          <div className="tl-dot" />
          <div className="tl-date">Aug 2023 — Dec 2026</div>
          <div className="tl-role">BS Computer Science · GPA 3.3</div>
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

function Certifications({ credentialUrl }) {
  return (
    <section id="certifications">
      <div className="sec-label">Always learning</div>
      <h2 className="sec-title">Licenses &amp; <em>Certifications</em></h2>
      <div className="sec-divider" />
      <div className="certs-grid">
        {CERTS.map(({ logo, name, issuer, date, tags }) => (
          <div className="cert-card" key={name}>
            <div className="cert-logo">{logo}</div>
            <div className="cert-info">
              <div className="cert-name">{name}</div>
              <div className="cert-issuer">{issuer}</div>
              <div className="cert-date">{date}</div>
              <div className="cert-skills">
                {tags.map(([l, c]) => <Tag key={l} label={l} cls={c} />)}
              </div>
              <a href={credentialUrl} target="_blank" rel="noreferrer" className="cert-link">Show credential ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects({ allProjectsUrl, linksByTitle }) {
  return (
    <section id="projects">
      <div className="sec-label">Things I've built</div>
      <h2 className="sec-title">Featured <em>Projects</em></h2>
      <div className="sec-divider" />
      <div className="projects-grid">
        {PROJECTS.map(({ banner, bannerBg, hackathon, title, desc, tags, links }) => (
          <div className="project-card" key={title}>
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
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={`pl ${cls}`}>{label}</a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", marginTop: "2.2rem", fontSize: ".87rem", color: "var(--text3)" }}>
        See all projects on &nbsp;
        <a href={allProjectsUrl} target="_blank" rel="noreferrer" style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "none" }}>GitHub ↗</a>
      </p>
    </section>
  );
}

function Now() {
  return (
    <section id="now">
      <div className="sec-label">Right now</div>
      <h2 className="sec-title">Currently <em>Up To</em></h2>
      <div className="sec-divider" />
      <div className="now-grid">
        <div className="now-card reveal">
          <h3>$ ls current_ops/</h3>
          <div className="terminal">
            <span className="prompt">→ </span>🎮&nbsp; Exploring game dev &amp; interactive design<br />
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
              ["💡", <>My superpower: making things both <strong style={{ color: "var(--pink)" }}>beautiful</strong> and <strong style={{ color: "var(--green)" }}>functional</strong></>],
            ].map(([icon, text]) => (
              <li key={icon}><span className="icon">{icon}</span>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact({ links }) {
  return (
    <section id="contact">
      <div className="sec-label">Say hello ✉️</div>
      <h2 className="sec-title">Let's <em>Connect</em></h2>
      <div className="sec-divider" style={{ margin: "0 auto 2.8rem" }} />
      <p className="contact-sub">Whether it's a project collab, an internship opportunity, or just a friendly hello — I'd love to hear from you! ✨</p>
      <div className="contact-grid">
        <a href={`mailto:${links.email}`} className="cl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Email Me
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="cl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
        <a href={links.github} target="_blank" rel="noreferrer" className="cl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub
        </a>
      </div>
      <p className="footer-sig">Made with 💜 by Su Shoon Lei Khaing · SUNY Oswego '26 · she/her ✨</p>
    </section>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  ["#skills","Skills"],["#experience","Experience"],["#certifications","Certs"],
  ["#projects","Projects"],["#now","Now"],["#contact","Contact"],
];

function Nav({ scrolled, active }) {
  function scrollTo(id) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo("#hero"); }}>
        Su <span>✦</span>
      </a>
      <ul className="nav-links">
        {NAV_LINKS.map(([href, label]) => (
          <li key={href}>
            <a
              href={href}
              className={active === href ? "active" : ""}
              onClick={e => { e.preventDefault(); scrollTo(href); }}
            >{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useScrollReveal();

  useEffect(() => {
    function onScroll() {
      const pct = scrollY / (document.body.scrollHeight - innerHeight) * 100;
      setProgress(pct);
      setScrolled(scrollY > 10);
      setShowTop(scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let ignore = false;
    async function loadConfig() {
      try {
        const res = await fetch("/api/portfolio");
        if (!res.ok) return;
        const data = await res.json();
        if (!ignore && data?.links) {
          setConfig({
            links: { ...DEFAULT_CONFIG.links, ...data.links },
            certifications: {
              ...DEFAULT_CONFIG.certifications,
              ...(data.certifications || {}),
            },
            projects: { ...DEFAULT_CONFIG.projects, ...(data.projects || {}) },
          });
        }
      } catch {
        // Keep defaults if backend is unavailable.
      }
    }
    loadConfig();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const ids = ["hero","skills","experience","certifications","projects","now","contact"];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection("#" + e.target.id); });
    }, { rootMargin: "-35% 0px -60% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="noise-overlay" />
      <BgCanvas />
      <div id="progress-bar" style={{ width: progress + "%" }} />
      <Nav scrolled={scrolled} active={activeSection} />
      <button
        id="back-top"
        className={showTop ? "visible" : ""}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >↑</button>
      <Hero links={config.links} />
      <Skills />
      <Experience />
      <Certifications credentialUrl={config.certifications.credentialUrl} />
      <Projects
        allProjectsUrl={config.projects.allProjectsUrl}
        linksByTitle={config.projects.linksByTitle}
      />
      <Now />
      <Contact links={config.links} />
    </>
  );
}
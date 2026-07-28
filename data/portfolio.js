export const SKILLS = [
  { icon:"🎨", title:"Frontend", tags:[["HTML5","tp"],["CSS3","ti"],["JavaScript","ty"],["React","tc"]] },
  { icon:"⚙️", title:"Backend & Languages", tags:[["Python","tc"],["Java","ty"],["C","ti"],["NodeJS","tg"],["Clojure","tv"],["MySQL","tg"]] },
  { icon:"🎮", title:"Game Development", tags:[["Unity","tp"],["libGDX","ty"],["C#","tg"]] },
  { icon:"⚡", title:"DevOps & Tools", tags:[["Git","ty"],["GitHub","tv"],["GitHub Actions","tc"],["Linux","tg"],["Terminal","ti"]] },
  { icon:"🧰", title:"IDEs & Editors", tags:[["VS Code","tc"],["IntelliJ IDEA","tv"],["Xcode","ti"],["Cursor","tp"]] },
  { icon:"🤝", title:"Soft Skills", tags:[["Communication","tp"],["Customer Service","tg"],["Leadership","tv"],["Mentoring","tc"]] },
];

export const CERTS = [
  { logo:"🗄️", name:"SQL for Non-Programmers", issuer:"LinkedIn Learning Community", date:"Issued Jan 2026", tags:[["SQL","tc"]] },
  { logo:"🤖", name:"Prompt Engineering: How to Talk to the AIs", issuer:"LinkedIn Learning Community", date:"Issued Jan 2026", tags:[["Prompt Engineering","tv"],["AI","tg"],["LLM","tc"]] },
  { logo:"⚡", name:"Advanced C Programming: Optimize Performance and Efficiency", issuer:"LinkedIn Learning Community", date:"Issued Jan 2026", tags:[["C","ti"]] },
  { logo:"🔷", name:"Introduction to Scala", issuer:"LinkedIn Learning Community", date:"Issued Feb 2025", tags:[["Scala","tv"]] },
];

export const PROJECTS = [
  {
    banner:"🎭",
    bannerBg:"linear-gradient(135deg,#2a2438,#3d4a5c)",
    title:"Camrades",
    desc:"Multiplayer charades where a CLIP vision model is the judge. Teams submit words, performers act on camera, and on-device AI guesses live from a decoy pool—React, Socket.IO, and Transformers.js, no server-side inference.",
    tags:[["React","tc"],["TypeScript","ti"],["Socket.IO","tv"],["CLIP / AI","tg"],["Vite","ty"],["In Progress","tp"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/Camrades" }],
  },
  {
    banner:"📡",
    bannerBg:"linear-gradient(135deg,#2a2430,#3d4a5c)",
    title:"SocketBench",
    desc:"Java TCP/UDP benchmarking suite: client-server pairs measure RTT and throughput across payload sizes, warm-up rounds, optional XOR obfuscation, and JSON export for plotting.",
    tags:[["Java","ty"],["TCP/UDP","tc"],["Sockets","tv"],["Networking","ti"],["Benchmarking","tg"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/SocketBench" }],
  },
  {
    banner:"🧩",
    bannerBg:"linear-gradient(135deg,#243530,#2f4a48)",
    title:"Sudoku Game (API + Swing)",
    desc:"Desktop Sudoku with Swing UI, Dosuku API puzzles, validation and hints via backtracking, plus distributed hint servers for harder cases.",
    tags:[["Java","ty"],["Swing","tp"],["REST API","tc"],["Concurrency","tv"],["Maven","tg"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/two--player-game-puzzle-using-parallel-move-evaluation" }],
  },
  {
    banner:"🧬",
    bannerBg:"linear-gradient(135deg,#2e2438,#3a3550)",
    title:"Factory Layout Optimizer (GA)",
    desc:"Parallel genetic algorithm that places factory stations on a 2D grid to maximize pairwise affinity—multi-worker evolution with live visualization.",
    tags:[["Java","ty"],["Genetic Algorithm","tv"],["Parallel","tc"],["Optimization","ti"],["Swing/GUI","tp"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/GeneticAlgorithm" }],
  },
];

export const BUILT_PROJECTS = [
  {
    banner:"🛒",
    bannerBg:"linear-gradient(135deg,#24302e,#3a4a48)",
    title:"SHOP — Students Helping Oz Peers",
    desc:"Full-stack web app for the SUNY Oswego student food pantry: public inventory browser, staff dashboard, checkouts, donations, requests, and SQL-backed reports—React, Express, and PostgreSQL.",
    tags:[["React","tc"],["Node.js","tg"],["Express","ty"],["PostgreSQL","ti"],["Tailwind","tv"]],
    links:[{ label:"⭐ GitHub", cls:"pl-gh", href:"https://github.com/SuShoonLei/SHOP_SUNY_Oswego" }],
  },
];

export const PHRASES = [
  "CS Student @ SUNY Oswego 🎓",
  "Game Dev | Web Dev | AI | Cybersecurity 🚀",
  "Coder by day, Foodie by night",
  "Crafting code & food with equal passion ✨",
  "Building cool things, one commit at a time 💜",
];

export const DT_SECTION = {
  animateOn: "view",
  sequential: true,
  revealDirection: "start",
  speed: 60,
  className: "sec-title-dt-rev",
  encryptedClassName: "sec-title-dt-enc",
  parentClassName: "sec-title-dt-wrap",
};

export const DEFAULT_CONFIG = {
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

export const NAV_LINKS = [
  ["/skills", "Skills"],
  ["/experience", "Experience"],
  ["/certifications", "Certs"],
  ["/projects", "Projects"],
  ["/now", "Now"],
  ["/contact", "Contact"],
];

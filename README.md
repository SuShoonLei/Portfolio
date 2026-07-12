# Su Shoon Lei Khaing — Portfolio

Personal portfolio site for **Su Shoon Lei Khaing**, CS senior at SUNY Oswego.

**Live site:** [https://sushoonlei.github.io/Portfolio/](https://sushoonlei.github.io/Portfolio/)

## Features

- Interactive flip profile card and orbiting skill icons
- GSAP spiral hover effects on links and buttons
- Decrypted text animations
- Sections: skills, experience, certifications, projects, currently up to, contact
- Multi-page routing (React Router) with shared layout and mobile nav
- Optional Spring Boot API for portfolio config (links / projects)

## Tech stack

| Layer | Tools |
|--------|--------|
| Frontend | React, Vite, React Router, GSAP, Motion, React Icons |
| Backend (optional) | Java, Spring Boot, Maven |
| Deploy | Vercel (root `/`) · GitHub Pages (`/Portfolio/`) |

## Quick start

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:5173/Portfolio/](http://localhost:5173/Portfolio/)  
(Local/dev and GitHub Pages use `base: /Portfolio/`. Vercel builds use `/` automatically.)

Pages: `/`, `/skills`, `/experience`, `/certifications`, `/projects`, `/now`, `/contact`

### Deploy on Vercel

Connect the GitHub repo in Vercel. Framework preset **Vite**, output **`dist`**, build **`npm run build`**.  
`vercel.json` rewrites all routes to `index.html` so React Router deep links work.

### Backend (optional)

Needs **Java** and **Maven**. The UI works without it and falls back to built-in defaults.

```bash
npm run backend
```

API runs on [http://localhost:8080](http://localhost:8080). In development, Vite proxies `/api` to the backend.

### Production build

```bash
npm run build
npm run preview
```

`npm run build` also copies `dist/index.html` → `dist/404.html` so GitHub Pages deep links refresh correctly.

## Project structure

```
Portfolio/
├── App.jsx                   # Router + routes
├── main.jsx
├── pages/                    # One page per section
├── components/               # Layout, Nav, FlipCard, etc.
├── data/portfolio.js         # Skills, projects, nav links, defaults
├── styles/portfolio.css      # Site styles
├── DecryptedText.jsx
├── SpiralAnimation.jsx
├── SpiralHoverWrap.jsx
├── assets/                   # Images
├── backend/                  # Spring Boot API
└── .github/workflows/        # GitHub Pages deploy
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` (+ `404.html`) |
| `npm run preview` | Preview production build |
| `npm run backend` | Run Spring Boot API |

## License

ISC

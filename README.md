# Su Shoon Lei Khaing — Portfolio

Personal portfolio site for **Su Shoon Lei Khaing**, CS senior at SUNY Oswego.

**Live site:** [https://sushoonlei.github.io/Portfolio/](https://sushoonlei.github.io/Portfolio/)

## Features

- Interactive flip profile card and orbiting skill icons
- GSAP spiral hover effects on links and buttons
- Decrypted text animations
- Sections: skills, experience, certifications, projects, currently up to, contact
- Optional Spring Boot API for portfolio config (links / projects)

## Tech stack

| Layer | Tools |
|--------|--------|
| Frontend | React, Vite, GSAP, Motion, React Icons |
| Backend (optional) | Java, Spring Boot, Maven |
| Deploy | GitHub Pages (`base: /Portfolio/`) |

## Quick start

### Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:5173/Portfolio/](http://localhost:5173/Portfolio/)  
(Vite is configured with `base: "/Portfolio/"`, so that path is required.)

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

## Project structure

```
Portfolio/
├── portfolio_v2.jsx          # Main portfolio UI
├── DecryptedText.jsx
├── SpiralAnimation.jsx
├── SpiralHoverWrap.jsx
├── components/ui/            # Reusable UI (e.g. SkillOrbit)
├── assets/                   # Images
├── backend/                  # Spring Boot API
└── .github/workflows/        # GitHub Pages deploy
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run backend` | Run Spring Boot API |

## License

ISC

# Lucky ME! — Portfolio

A tri-mode portfolio with Frontend (vibrant), Backend (monochrome), and Full-Stack (chaos animations) views.

## Structure

```
src/
├── components/
│   ├── hero/          # Terminal intro, typing animations, whoami
│   ├── nav/           # Mode switcher, dark/light toggle, main nav
│   ├── projects/      # Project cards per mode
│   └── shared/        # Reusable UI (Button, Badge, Tag, etc.)
├── data/
│   └── projects.ts    # ← ADD NEW PROJECTS HERE
├── hooks/
│   ├── useMode.ts     # frontend | backend | fullstack state
│   └── useTheme.ts    # light | dark state
├── styles/
│   ├── globals.css    # CSS variables, base reset
│   ├── frontend.css   # Frontend mode styles
│   ├── backend.css    # Backend mode styles (B&W skeletal)
│   └── fullstack.css  # Full-stack mode styles (crazy animations)
├── types/
│   └── index.ts       # Project, Mode, Theme types
└── views/
    ├── FrontendView.tsx
    ├── BackendView.tsx
    └── FullStackView.tsx
```

## Adding a New Project

Open `src/data/projects.ts` and add to the array:

```ts
{
  id: "your-project-id",
  title: "Project Name",
  description: "What it does",
  tags: ["React", "TypeScript"],
  category: "frontend" | "backend" | "fullstack",
  repo: "https://github.com/Luckingz/...",
  liveUrl: "https://...",          // optional
  demoVideo: "GOOGLE_DRIVE_FILE_ID", // optional — just the ID, not full URL
  demoImage: "https://...",        // optional
  year: 2025,
  featured: true,                  // optional
}
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS Modules + custom properties
- **Animations**: CSS keyframes + Framer Motion
- **Build**: Vite

## Running Locally

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
# Deploy /dist folder to Vercel, Netlify, or GitHub Pages
```

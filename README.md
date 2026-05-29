# Lucky ME! — Portfolio

A tri-mode portfolio with Frontend (vibrant), Backend (monochrome), and Full-Stack (chaos animations) views.


## File Structure

```
lucky-portfolio-v3/
├── index.html                      ← Entry point + static FE cards (SEO-friendly)
├── README.md
└── src/
    ├── styles/
    │   ├── globals.css             ← Tokens, nav, hero, layout, footer
    │   ├── terminal.css            ← Whoami + AI terminal styles
    │   ├── frontend.css            ← Frontend mode cards
    │   ├── backend.css             ← Backend mode (desaturate, mono grid)
    │   ├── fullstack.css           ← Full-stack mode (matrix, flying cards)
    │   └── chat.css                ← "Chat with Lucky" modal
    ├── data/
    │   └── projects-data.js        ← ★ ADD PROJECTS HERE ★
    ├── components/
    │   ├── matrix.js               ← Canvas matrix rain
    │   ├── whoami.js               ← Scroll-triggered typewriter
    │   ├── ai-terminal.js          ← Groq AI chat
    │   └── chat.js                 ← Terminal email form (FormSubmit)
    └── portfolio.js                ← Core: modes, rendering, hero, theme
```

---

## Adding a New Project

1. Open `src/data/projects-data.js`, push to `window.PROJECTS`
2. Add a static HTML card in `index.html` inside `.fe-grid` (copy any `.fc` block)
3. The AI terminal auto-learns about it — no other file needs changing

```js
{
  id: 'my-project',
  title: 'My Project',
  role: 'Backend Engineer',
  desc: 'What it does.',
  tags: ['Go', 'PostgreSQL'],
  repo: 'https://github.com/Luckingz/my-project',
  live: null,
  drive: null, // or 'GOOGLE_DRIVE_FILE_ID'
},
```

---

## Setup

### 1. Groq API Key (AI Terminal)
- Sign up free at https://console.groq.com
- Get your API key
- Open `src/components/ai-terminal.js`
- Set: `window.GROQ_KEY = 'gsk_your_key_here';`

**For production** — use a backend proxy (Vercel Function):
```js
// api/chat.js (Vercel)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_KEY}` },
    body: JSON.stringify(req.body),
  });
  res.json(await r.json());
}
```
Then change the fetch URL in `ai-terminal.js` to `/api/chat`.

### 2. Contact Form (Chat with Lucky)
- Open `src/data/projects-data.js`
- Set `email` in `window.PERSONAL` to your real email
- FormSubmit will email you on first use, asking you to confirm your address (one-time)
- No backend or account needed

### 3. Run Locally
```bash
npx serve .
# or
python3 -m http.server 8080
```

### 4. Deploy to Vercel
```bash
vercel --prod
```

---

## Mode Behaviour

| Mode | Filter | Hero | Projects | AI Terminal |
|------|--------|------|----------|-------------|
| Frontend | None | Typed gradient | Asymmetric 12-col grid | Groq-powered |
| Backend | `saturate(0)` | Monochrome | Tight mono grid | Same (desaturated) |
| Full-Stack | None | Matrix rain → reveals | Flying cards + video embeds | Same |

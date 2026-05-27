// src/data/projects-data.js
// ─────────────────────────────────────────────────────────────
//  ADD NEW PROJECTS HERE — push to window.PROJECTS array.
//
//  Fields:
//    id        — unique slug (no spaces)
//    title     — project name
//    role      — your role on the project
//    desc      — short description (2-3 sentences)
//    tags      — array of tech strings
//    category  — 'frontend' | 'backend' | 'fullstack'
//    repo      — GitHub URL (optional)
//    liveUrl   — live/demo URL (optional)
//    driveId   — Google Drive FILE ID only, e.g. "11ml1Adk82T6..."
//                (for video embeds; get from the share URL)
//    year      — number
//    featured  — boolean (optional)
// ─────────────────────────────────────────────────────────────

window.PROJECTS = [
  {
    id: 'studyinnaija',
    title: 'StudyinNaija Assessments',
    role: 'Full-Stack AI Engineer',
    desc: 'AI-powered assessment platform for students targeting Nigerian universities. Generates personalised test questions, scores responses, and surfaces study recommendations in real time.',
    tags: ['AI', 'NLP', 'JavaScript', 'Python'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/studyinnaija-assessments',
    liveUrl: 'https://www.studyinnaija.com/p/ai-powered-assessments.html',
    driveId: null,
    year: 2025,
    featured: true,
  },
  {
    id: 'shoutout',
    title: 'ShoutOUT!',
    role: 'Full-Stack Developer',
    desc: 'Real-time social shoutout app that lets users broadcast appreciation messages across a live feed — think Twitter meets a hype machine.',
    tags: ['React', 'Node.js', 'WebSockets', 'TypeScript'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/shoutOUT',
    liveUrl: null,
    driveId: '11ml1Adk82T6Mfhft71qBAcXkR-RQvVhy',
    year: 2025,
    featured: true,
  },
  {
    id: 'yotouch',
    title: 'YoTouch',
    role: 'AI Engineer',
    desc: 'Decentralised blockchain identity verification powered by ArcFace facial recognition and real-time liveness detection. Off-chain biometric storage on Cardano — NDPR & GDPR compliant.',
    tags: ['Python', 'ArcFace', 'OpenCV', 'Cardano', 'Node.js', 'PostgreSQL'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/yotouch',
    liveUrl: null,
    driveId: '1TKfnWxra9Zv66PtesuVLK8JP9LtVcjm7',
    year: 2025,
    featured: true,
  },
  {
    id: 'energizeai',
    title: 'EnergizeAI 🏆',
    role: 'Lead AI Engineer',
    desc: 'Award-winning AI tool that automates solar PV system blueprint design for engineers and field technicians. Won Best Project (Nationwide) at 3MTT June Knowledge Showcase 2025.',
    tags: ['Flutter', 'Dart', 'AI/ML', 'Python', 'FastAPI'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/energize-ai',
    liveUrl: 'https://www.linkedin.com/posts/lucky-ajidoku_energizeai-energizeai-3mttlearningcommunity-activity-7336376892599459840-Yi3a',
    driveId: null,
    year: 2025,
    featured: true,
  },

  // ── ADD NEW PROJECTS BELOW THIS LINE ─────────────────────
  // {
  //   id: 'my-new-project',
  //   title: 'My New Project',
  //   role: 'Backend Developer',
  //   desc: 'Description here.',
  //   tags: ['Go', 'PostgreSQL', 'Docker'],
  //   category: 'backend',
  //   repo: 'https://github.com/Luckingz/my-new-project',
  //   liveUrl: null,
  //   driveId: null,
  //   year: 2025,
  // },
];

window.PERSONAL = {
  name: 'Lucky Ajidoku',
  alias: 'Lucky ME!',
  title: 'AI Engineer · Software Developer',
  location: 'Abuja, Nigeria 🇳🇬',
  education: 'B.Eng. Computer Engineering, BUK 2024',
  github: 'https://github.com/Luckingz',
  linkedin: 'https://www.linkedin.com/in/lucky-ajidoku/',
  cv: 'https://luckyajidoku.cv/',
  stacks: {
    languages: ['Python', 'TypeScript', 'Go', 'Dart', 'JS', 'C'],
    aiml:      ['TensorFlow', 'PyTorch', 'OpenCV', 'ArcFace', 'NLP'],
    web:       ['React', 'Node.js', 'FastAPI', 'Flutter', 'PostgreSQL', 'Docker', 'Cardano'],
  },
  awards: ['🏆 Best Project (Nationwide) — 3MTT June Knowledge Showcase 2025'],
};

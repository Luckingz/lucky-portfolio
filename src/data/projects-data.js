// src/data/projects-data.js
// ═══════════════════════════════════════════════════════
//  ADD NEW PROJECTS HERE — push to window.PROJECTS.
//
//  Fields:
//    id     — unique slug, no spaces (used for DOM ids)
//    title  — display name (no emojis)
//    role   — your role
//    desc   — 2–3 sentence description
//    tags   — array of tech strings
//    repo   — GitHub URL (optional)
//    live   — live/demo URL (optional)
//    drive  — Google Drive FILE ID only (for video embed)
//             e.g. "11ml1Adk82T6Mfhft71qBAcXkR-RQvVhy"
//
//  FRONTEND GRID LAYOUT SLOTS (12-col asymmetric):
//    c1 = 7/12 wide  |  c2 = 5/12
//    c3, c4, c5 = thirds
//    c6 = 5/12  |  c7 = 7/12
//    Pattern repeats every 7 cards.
//    Static HTML cards are in index.html — add new ones
//    there AND push here so the AI terminal knows about them.
// ═══════════════════════════════════════════════════════

window.PROJECTS = [
  {
    id: 'studyinnaija',
    title: 'StudyinNaija Assessments',
    role: 'Full-Stack AI Engineer',
    desc: 'AI-powered assessment platform for students targeting Nigerian universities. Generates personalised test questions and surfaces real-time study recommendations via NLP.',
    tags: ['AI', 'NLP', 'JavaScript', 'Python'],
    repo: 'https://github.com/Luckingz/studyinnaija-assessments',
    live: 'https://www.studyinnaija.com/p/ai-powered-assessments.html',
    drive: null,
  },
  {
    id: 'shoutout',
    title: 'ShoutOUT',
    role: 'Full-Stack AI Developer',
    desc: 'Real-time crime-monitoring and reporting app designed to improve community safety through fast, intelligent, and accessible incident reporting.',
    tags: ['React', 'WebSockets', 'Node.js', 'TypeScript'],
    repo: 'https://github.com/Luckingz/shoutOUT',
    live: null,
    drive: '11ml1Adk82T6Mfhft71qBAcXkR-RQvVhy',
  },
  {
    id: 'yotouch',
    title: 'YoTouch',
    role: 'AI Engineer',
    desc: 'Blockchain identity verification via ArcFace facial recognition and liveness detection. Off-chain on Cardano, NDPR compliant.',
    tags: ['Python', 'ArcFace', 'OpenCV', 'Cardano', 'Node.js', 'PostgreSQL'],
    repo: 'https://github.com/Luckingz/yotouch',
    live: null,
    drive: '1TKfnWxra9Zv66PtesuVLK8JP9LtVcjm7',
  },
  {
    id: 'energizeai',
    title: 'EnergizeAI',
    role: 'Lead AI Engineer',
    desc: 'National Best Project winner. AI tool automating solar PV system blueprint design for engineers. Won 3MTT June Knowledge Showcase 2025.',
    tags: ['Flutter', 'Dart', 'AI/ML', 'Python', 'FastAPI'],
    repo: 'https://github.com/Luckingz/energize-ai',
    live: 'https://www.linkedin.com/posts/lucky-ajidoku_energizeai-energizeai-3mttlearningcommunity-activity-7336376892599459840-Yi3a',
    drive: null,
  },
  {
    id: 'gpmp',
    title: 'GPMP',
    role: 'AI/ML Engineer',
    desc: 'Gas Prediction & Maintenance Prediction — ML for predictive maintenance in industrial gas systems. Live on Streamlit with interactive dashboards.',
    tags: ['Python', 'Machine Learning', 'Streamlit', 'Pandas', 'scikit-learn'],
    repo: 'https://github.com/Luckingz/gas-prediction-maintenance',
    live: 'https://gas-prediction-maintenance-3peuwgeird5tyhv5rpswej.streamlit.app/',
    drive: null,
  },
  {
    id: 'complyng',
    title: 'ComplyNG',
    role: 'Full-Stack AI Engineer',
    desc: 'Regulatory compliance platform for Nigerian SMEs — automated checks and reporting dashboard. Built at a hackathon.',
    tags: ['Figma', 'React', 'RegTech', 'Nigeria'],
    repo: 'https://github.com/olayinkaojo/hackaton',
    live: 'https://chute-stack-74315615.figma.site/',
    drive: null,
  },
  {
    id: 'trafficmon',
    title: 'TrafficMonitor',
    role: 'Computer Vision Engineer',
    desc: 'Real-time vehicle detection, tracking, and classification from video feeds using YOLO and OpenCV. Configurable ROI zones.',
    tags: ['Python', 'OpenCV', 'YOLO', 'Computer Vision', 'Google Colab'],
    repo: 'https://github.com/Luckingz/traffic-monitoring-system',
    live: 'https://colab.research.google.com/drive/1ggW_GF5JR53lFpia0E7I5RUKYnGTotB0?usp=sharing',
    drive: null,
  },

  // ── ADD NEW PROJECTS BELOW ──────────────────────────
  // {
  //   id: 'my-project',
  //   title: 'My Project',
  //   role: 'Backend Engineer',
  //   desc: 'What it does and why it matters.',
  //   tags: ['Go', 'PostgreSQL', 'Docker'],
  //   repo: 'https://github.com/Luckingz/my-project',
  //   live: null,
  //   drive: null,
  // },
];

window.PERSONAL = {
  name: 'Lucky Ajidoku',
  alias: 'LuckyME!',
  title: 'AI Engineer · Software Developer',
  location: 'Abuja, Nigeria',
  education: 'B.Eng. Computer Engineering, Bayero University Kano (BUK), 2024',
  github:   'https://github.com/Luckingz',
  linkedin: 'https://www.linkedin.com/in/lucky-ajidoku/',
  cv:       'https://luckyajidoku.cv/',
  email:    'me@luckyajidoku.cv',
  stacks: {
    languages: ['Python', 'TypeScript', 'Go', 'Dart', 'JavaScript', 'C'],
    aiml: ['TensorFlow', 'PyTorch', 'ArcFace', 'OpenCV', 'NLP', 'YOLO', 'scikit-learn'],
    web:  ['React', 'Node.js', 'FastAPI', 'Flutter', 'PostgreSQL', 'Docker', 'Cardano', 'Streamlit'],
  },
  awards: ['Best Project (Nationwide) — 3MTT June Knowledge Showcase 2025 (EnergizeAI)'],
  certifications: [
    'AI and Machine Learning — 3MTT / NITDA',
    'Project Management — Skill Development Council, Canada',
    'Train-The-Trainer — Data Science Nigeria x Microsoft',
    'AI for Energy Hackathon — DSN x NNPC',
  ],
};

// src/data/projects.ts
// ─────────────────────────────────────────────────────────────
//  ADD NEW PROJECTS HERE — just push to this array.
//  For demoVideo, paste only the Google Drive FILE ID
//  e.g. "11ml1Adk82T6Mfhft71qBAcXkR-RQvVhy"  (not the full URL)
// ─────────────────────────────────────────────────────────────

import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'studyinnaija-assessments',
    title: 'StudyinNaija Assessments',
    description:
      'AI-powered assessment platform for students targeting Nigerian universities. Generates personalised test questions, scores responses, and surfaces study recommendations in real time.',
    tags: ['AI', 'NLP', 'JavaScript', 'Python'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/studyinnaija-assessments',
    liveUrl: 'https://www.studyinnaija.com/p/ai-powered-assessments.html',
    year: 2025,
    featured: true,
    role: 'Full-Stack AI Engineer',
  },
  {
    id: 'shoutout',
    title: 'ShoutOUT!',
    description:
      'Real-time social shoutout app that lets users broadcast appreciation messages across a live feed — think Twitter meets a hype machine.',
    tags: ['React', 'Node.js', 'WebSockets', 'TypeScript'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/shoutOUT',
    demoVideo: '11ml1Adk82T6Mfhft71qBAcXkR-RQvVhy',
    year: 2025,
    featured: true,
    role: 'Full-Stack Developer',
  },
  {
    id: 'yotouch',
    title: 'YoTouch',
    description:
      'Decentralised blockchain identity verification powered by ArcFace facial recognition and real-time liveness detection. Prevents spoofing with challenge-response biometrics stored off-chain on Cardano.',
    tags: ['Python', 'ArcFace', 'OpenCV', 'Cardano', 'Node.js', 'PostgreSQL'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/yotouch',
    demoVideo: '1TKfnWxra9Zv66PtesuVLK8JP9LtVcjm7',
    year: 2025,
    featured: true,
    role: 'AI Engineer',
  },
  {
    id: 'energize-ai',
    title: 'EnergizeAI',
    description:
      'Award-winning AI tool that automates solar PV system blueprint design for engineers and field technicians. Won Best Project (Nationwide) at the 3MTT June Knowledge Showcase 2025.',
    tags: ['Flutter', 'Dart', 'AI/ML', 'Python', 'FastAPI'],
    category: 'fullstack',
    repo: 'https://github.com/Luckingz/energize-ai',
    liveUrl:
      'https://www.linkedin.com/posts/lucky-ajidoku_energizeai-energizeai-3mttlearningcommunity-activity-7336376892599459840-Yi3a',
    year: 2025,
    featured: true,
    role: 'Lead AI Engineer',
  },
];

export const personalInfo = {
  name: 'Lucky Ajidoku',
  alias: 'Lucky ME!',
  title: 'AI Engineer · Software Developer',
  location: 'Abuja, Nigeria',
  bio: 'Highly accomplished AI Engineer and Computer Engineering graduate (B.Eng., 2024) with proven expertise in AI systems — from biometric facial recognition to award-winning energy solutions. Adept at full ML stack development including data preprocessing, model deployment, and microservice architecture.',
  github: 'https://github.com/Luckingz',
  linkedin: 'https://www.linkedin.com/in/lucky-ajidoku/',
  cv: 'https://luckyajidoku.cv/',
  stacks: [
    { label: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Dart', 'C'] },
    { label: 'AI/ML', items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'ArcFace', 'OpenCV', 'NLP', 'Computer Vision'] },
    { label: 'Web', items: ['React', 'Node.js', 'Express', 'FastAPI', 'Flutter'] },
    { label: 'Data & Tools', items: ['PostgreSQL', 'Supabase', 'Docker', 'Git', 'Power BI', 'Jupyter'] },
    { label: 'Blockchain & Biometrics', items: ['Cardano', 'Biometric Facial Recognition', 'Liveness Detection'] },
  ],
  awards: [
    {
      title: '🏆 Best Project (Nationwide) — EnergizeAI',
      org: '3MTT June Knowledge Showcase',
      year: 'Jun 2025',
      description: 'AI-powered solar PV system design tool recognised nationally for innovation and real-world impact.',
    },
  ],
  certifications: [
    'AI and Machine Learning — 3MTT / NITDA',
    'Project Management — Skill Development Council, Canada',
    'Train-The-Trainer — Data Science Nigeria × Microsoft',
    'AI for Energy Hackathon — DSN × NNPC',
  ],
};

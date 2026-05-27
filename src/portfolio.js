// src/portfolio.js
// ─────────────────────────────────────────────────────────
//  Core portfolio logic. Works with:
//    - window.PROJECTS  (from src/data/projects-data.js)
//    - window.PERSONAL  (from src/data/projects-data.js)
//  Relies on CSS classes from src/styles/*.css
// ─────────────────────────────────────────────────────────

'use strict';

/* ── STATE ──────────────────────────────────────────────── */
let currentMode = 'frontend';
let isDark = true;

/* ── THEME ──────────────────────────────────────────────── */
function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
  isDark = !isDark;
  applyTheme();
}
window.toggleTheme = toggleTheme;

/* ── MODE ───────────────────────────────────────────────── */
function setMode(m) {
  currentMode = m;

  // Body class
  const main = document.getElementById('main');
  main.className = '';
  if (m === 'backend')   main.classList.add('be-mode');
  if (m === 'fullstack') main.classList.add('fs-mode');

  // Mode button active states
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  const map = { frontend: '.fe', backend: '.be', fullstack: '.fs' };
  document.querySelector('.mode-btn' + map[m]).classList.add('active');

  // Hero background
  const hero = document.getElementById('hero');
  hero.className = 'hero';
  hero.classList.add({
    frontend:  'hero-bg-fe',
    backend:   'hero-bg-be',
    fullstack: 'hero-bg-fs',
  }[m]);

  // Hello World style
  const hw = document.getElementById('hw');
  hw.className = 'line-hw';
  hw.classList.add({ frontend: 'fe-hw', backend: 'be-hw', fullstack: 'fs-hw' }[m]);

  // Section & footer text
  document.getElementById('sectionTitle').textContent = {
    frontend:  'Projects',
    backend:   '// projects',
    fullstack: '✦ Projects',
  }[m];
  document.getElementById('footerTxt').textContent = {
    frontend:  'Built with React + TypeScript · Lucky ME! © 2025',
    backend:   '// built with Go + React + TypeScript — Lucky ME! © 2025',
    fullstack: '✦ Full-Stack · React · TypeScript · Go · Lucky ME! © 2025',
  }[m];

  renderProjects();
}
window.setMode = setMode;

/* ── HERO SEQUENCE ──────────────────────────────────────── */
function buildWhoami() {
  const p = window.PERSONAL;
  const el = document.getElementById('whoami-out');
  if (!el) return;

  const makeTag = (txt, cls) => `<span class="tag ${cls}">${txt}</span>`;
  const langTags  = p.stacks.languages.map(t => makeTag(t, 'lang')).join('');
  const aiTags    = p.stacks.aiml.map(t => makeTag(t, 'ai')).join('');
  const webTags   = p.stacks.web.map(t => makeTag(t, '')).join('');
  const awardTags = p.awards.map(a => makeTag(a, 'award')).join('');

  el.innerHTML = `
    <div><span class="key">name       </span><span class="val"> ${p.name}</span></div>
    <div><span class="key">alias      </span><span class="val"> ${p.alias} 🚀</span></div>
    <div><span class="key">role       </span><span class="val"> ${p.title}</span></div>
    <div><span class="key">location   </span><span class="val"> ${p.location}</span></div>
    <div><span class="key">education  </span><span class="val"> ${p.education}</span></div>
    <div style="margin-top:8px"><span class="key">stack      </span></div>
    <div style="margin:4px 0 8px">${langTags}</div>
    <div style="margin:4px 0 8px">${aiTags}</div>
    <div style="margin:4px 0 8px">${webTags}</div>
    <div style="margin-top:8px"><span class="key">awards     </span></div>
    <div style="margin:4px 0">${awardTags}</div>
    <div style="margin-top:8px"><span class="key">github     </span><span class="val"> github.com/Luckingz</span></div>
    <div><span class="key">linkedin   </span><span class="val"> in/lucky-ajidoku</span></div>
  `;
}

function fadeIn(id, delay) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = '1';
    if (id === 'whoami-out') el.style.display = 'block';
  }, delay);
}

function runHeroSequence() {
  buildWhoami();
  fadeIn('hw',         300);
  fadeIn('name',       900);
  fadeIn('welcome',   1400);
  fadeIn('whoami-cmd',2000);
  fadeIn('whoami-out',2600);
  fadeIn('cursor-line',3200);
  fadeIn('ctas',      3600);
  setTimeout(() => {
    const ps = document.getElementById('projectsSection');
    if (ps) ps.classList.add('revealed');
  }, 4200);
}

/* ── VIDEO LOADER ───────────────────────────────────────── */
function loadVideo(id, driveId) {
  const wrap = document.getElementById('wrap-' + id);
  if (!wrap) return;
  const iframe = document.createElement('iframe');
  iframe.src = `https://drive.google.com/file/d/${driveId}/preview`;
  iframe.title = 'Project demo';
  iframe.allow = 'autoplay';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none';
  wrap.innerHTML = '';
  wrap.appendChild(iframe);
}
window.loadVideo = loadVideo;

/* ── CARD RENDERERS ─────────────────────────────────────── */
function makeFrontendCard(p) {
  const links = [];
  if (p.liveUrl)   links.push(`<a href="${p.liveUrl}" target="_blank" class="card-link link-primary">↗ Live Demo</a>`);
  else if (p.driveId) links.push(`<a href="https://drive.google.com/file/d/${p.driveId}/view" target="_blank" class="card-link link-primary">▶ Watch Demo</a>`);
  if (p.repo) links.push(`<a href="${p.repo}" target="_blank" class="card-link link-outline">⬡ Repo</a>`);

  const d = document.createElement('div');
  d.className = 'card-fe';
  d.innerHTML = `
    <div class="year-badge">${p.year}</div>
    <div class="card-role">${p.role}</div>
    <div class="card-title">${p.title}</div>
    <div class="card-desc">${p.desc}</div>
    <div class="tags-row">${p.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>
    <div class="card-links">${links.join('')}</div>
  `;
  return d;
}

function makeBackendCard(p) {
  const links = [];
  if (p.repo)    links.push(`<a href="${p.repo}" target="_blank" class="be-link">REPO</a>`);
  if (p.liveUrl) links.push(`<a href="${p.liveUrl}" target="_blank" class="be-link">LIVE</a>`);
  else if (p.driveId) links.push(`<a href="https://drive.google.com/file/d/${p.driveId}/view" target="_blank" class="be-link">DEMO</a>`);

  const d = document.createElement('div');
  d.className = 'card-be';
  d.innerHTML = `
    <div class="be-status">STATUS: DEPLOYED · ${p.year}</div>
    <div class="be-title">${p.title.replace('🏆', '')}</div>
    <div class="be-desc">${p.desc}</div>
    <div class="be-tags">${p.tags.map(t => `<span class="be-tag">${t}</span>`).join('')}</div>
    <div class="be-links">${links.join('')}</div>
  `;
  return d;
}

function makeFullStackCard(p) {
  const links = [];
  if (p.liveUrl) links.push(`<a href="${p.liveUrl}" target="_blank" class="fs-link fs-link-pri">↗ Live</a>`);
  if (p.repo)    links.push(`<a href="${p.repo}" target="_blank" class="fs-link fs-link-out">⬡ Repo</a>`);

  let mediaHtml = '';
  if (p.driveId) {
    mediaHtml = `
      <div class="card-fs-body">
        <div class="embed-wrap" id="wrap-${p.id}">
          <div class="embed-placeholder" id="ph-${p.id}">
            <button class="play-btn" onclick="loadVideo('${p.id}','${p.driveId}')" aria-label="Play demo video">▶</button>
            <div class="embed-label">Click to play demo</div>
          </div>
        </div>
      </div>`;
  } else if (p.liveUrl) {
    // Attempt iframe embed, fallback button
    mediaHtml = `
      <div class="card-fs-body">
        <div class="embed-wrap">
          <div class="embed-placeholder">
            <button class="play-btn" onclick="window.open('${p.liveUrl}','_blank')" aria-label="Open project">↗</button>
            <div class="embed-label">Open in new tab</div>
          </div>
        </div>
      </div>`;
  } else {
    mediaHtml = `
      <div class="card-fs-body">
        <div class="embed-wrap">
          <div class="embed-placeholder">
            <button class="play-btn" onclick="window.open('${p.repo}','_blank')" aria-label="View repo">⬡</button>
            <div class="embed-label">View repository</div>
          </div>
        </div>
      </div>`;
  }

  const d = document.createElement('div');
  d.className = 'card-fs';
  d.innerHTML = `
    <div class="card-fs-header">
      <div class="card-fs-title">${p.title}</div>
      <div class="card-fs-desc">${p.desc}</div>
      <div class="fs-tags-row">${p.tags.map(t => `<span class="fs-tag">${t}</span>`).join('')}</div>
    </div>
    ${mediaHtml}
    <div class="card-fs-footer">${links.join('')}</div>
  `;
  return d;
}

/* ── RENDER ─────────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const projects = window.PROJECTS || [];
  const renderer = {
    frontend:  makeFrontendCard,
    backend:   makeBackendCard,
    fullstack: makeFullStackCard,
  }[currentMode];
  projects.forEach(p => grid.appendChild(renderer(p)));
}

/* ── SCROLL REVEAL ──────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProjects();
  runHeroSequence();
  initScrollReveal();
});

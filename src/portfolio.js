// src/portfolio.js
// Core portfolio logic — mode switching, project rendering,
// hero typewriter sequence, theme, scroll reveal.
'use strict';

let _mode   = 'fe';
let _isDark = true;
let _beRendered = false;
let _fsRendered = false;

// ── THEME ──────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('lme-theme');
  _isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme:dark)').matches;
  _applyTheme();
}

function _applyTheme() {
  document.documentElement.setAttribute('data-theme', _isDark ? 'dark' : 'light');
  const icon  = document.getElementById('tIcon');
  const label = document.getElementById('tLbl');
  if (icon)  icon.textContent  = _isDark ? '\u{1F319}' : '\u2600\uFE0F';
  if (label) label.textContent = _isDark ? 'Night Walker' : 'Sunshine';
  localStorage.setItem('lme-theme', _isDark ? 'dark' : 'light');
}

function toggleTheme() { _isDark = !_isDark; _applyTheme(); }
window.toggleTheme = toggleTheme;

// ── MODE ───────────────────────────────────────────────
function setMode(m) {
  _mode = m;

  document.querySelectorAll('.mbtn').forEach(b => b.classList.remove('on'));
  document.querySelector('.mbtn.' + m).classList.add('on');

  document.querySelectorAll('.mode-c').forEach(c => c.classList.remove('on'));
  document.getElementById(m + 'Content').classList.add('on');

  document.body.classList.remove('be-mode', 'fs-mode');
  if (m === 'be') document.body.classList.add('be-mode');
  if (m === 'fs') { document.body.classList.add('fs-mode'); startMatrix(); }
  else stopMatrix();

  const footMap = {
    fe: 'Lucky ME! \u00A9 2025 \u00B7 React + TypeScript',
    be: '// Lucky ME! \u00A9 2025 \u00B7 Go \u00B7 REST',
    fs: '\u2736 Lucky ME! \u00A9 2025 \u00B7 Full-Stack',
  };
  const ftxt = document.getElementById('ftxt');
  if (ftxt) ftxt.textContent = footMap[m];

  if (m === 'be' && !_beRendered) { _renderBE(); _beRendered = true; }
  if (m === 'fs' && !_fsRendered) { _renderFS(); _fsRendered = true; }
}
window.setMode = setMode;

// ── BACKEND RENDER ─────────────────────────────────────
function _renderBE() {
  const grid = document.getElementById('beGrid');
  if (!grid || grid.children.length) return;
  (window.PROJECTS || []).forEach((p, i) => {
    const links = [];
    if (p.repo)  links.push(`<a href="${p.repo}" target="_blank" class="bc-lnk">REPO</a>`);
    if (p.live)  links.push(`<a href="${p.live}" target="_blank" class="bc-lnk">LIVE</a>`);
    else if (p.drive) links.push(`<a href="https://drive.google.com/file/d/${p.drive}/view" target="_blank" class="bc-lnk">DEMO</a>`);
    const card = document.createElement('div');
    card.className = 'bc';
    card.innerHTML = `
      <div class="bc-num">PROJECT_${String(i+1).padStart(3,'0')}</div>
      <div class="bc-title">${p.title}</div>
      <div class="bc-desc">${p.desc}</div>
      <div class="bc-tags">${p.tags.map(t=>`<span class="bc-tag">${t}</span>`).join('')}</div>
      <div class="bc-links">${links.join('')}</div>
    `;
    grid.appendChild(card);
  });
}

// ── FULLSTACK RENDER ───────────────────────────────────
function _renderFS() {
  const grid = document.getElementById('fsGrid');
  if (!grid || grid.children.length) return;
  (window.PROJECTS || []).forEach(p => {
    const links = [];
    if (p.live)       links.push(`<a href="${p.live}" target="_blank" class="fsl p">Live</a>`);
    else if (p.drive) links.push(`<span class="fsl p" onclick="ldrive('${p.id}','${p.drive}')">Play</span>`);
    if (p.repo)       links.push(`<a href="${p.repo}" target="_blank" class="fsl">Repo</a>`);

    let media = '';
    if (p.drive) {
      media = `<div class="ez" id="ez-${p.id}">
        <div class="ez-ph" onclick="ldrive('${p.id}','${p.drive}')">
          <button class="play-c" aria-label="Play demo video">&#9654;</button>
          <div class="ez-lbl">Click to play demo</div>
        </div>
      </div>`;
    } else if (p.live) {
      media = `<div class="ez">
        <div class="ez-ph" onclick="window.open('${p.live}','_blank')">
          <button class="play-c" aria-label="Open live demo">&#8599;</button>
          <div class="ez-lbl">Open live demo</div>
        </div>
      </div>`;
    } else {
      media = `<div class="ez">
        <div class="ez-ph" onclick="window.open('${p.repo}','_blank')">
          <button class="play-c" aria-label="View repository">&#9645;</button>
          <div class="ez-lbl">View repository</div>
        </div>
      </div>`;
    }

    const card = document.createElement('div');
    card.className = 'fsc';
    card.innerHTML = `
      <div class="fsc-hd">
        <div class="fsc-title">${p.title}</div>
        <div class="fsc-role">${p.role}</div>
        <div class="fsc-desc">${p.desc}</div>
        <div class="fsc-tags">${p.tags.map(t=>`<span class="fsc-tag">${t}</span>`).join('')}</div>
      </div>
      ${media}
      <div class="fsc-ft">${links.join('')}</div>
    `;
    grid.appendChild(card);
  });
}

// ── GOOGLE DRIVE EMBED ─────────────────────────────────
function ldrive(id, driveId) {
  const ez = document.getElementById('ez-' + id);
  if (!ez) return;
  const iframe = document.createElement('iframe');
  iframe.src = `https://drive.google.com/file/d/${driveId}/preview`;
  iframe.allow = 'autoplay';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none';
  ez.innerHTML = '';
  ez.appendChild(iframe);
}
window.ldrive = ldrive;

// ── HERO TYPEWRITER SEQUENCE ───────────────────────────
function _typeInto(elId, txt, speed, cb) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = '';
  let i = 0;
  function go() {
    if (i < txt.length) { el.textContent += txt[i++]; setTimeout(go, speed); }
    else if (cb) cb();
  }
  go();
}

function runHero() {
  const hw = document.getElementById('hw');
  const nm = document.getElementById('nm');

  // Start invisible + slightly down
  if (hw) { hw.style.transform = 'translateY(20px)'; }
  if (nm) { nm.style.transform = 'translateY(20px)'; }

  setTimeout(() => {
    if (hw) { hw.style.opacity = '1'; hw.style.transition = 'opacity .5s, transform .5s'; hw.style.transform = 'none'; }

    _typeInto('hwTxt', 'Hello World', 60, () => {
      if (nm) { nm.style.opacity = '1'; nm.style.transition = 'opacity .5s, transform .5s'; nm.style.transform = 'none'; }

      setTimeout(() => _typeInto('nmTxt', 'LuckyME', 55, () => {

        // Fade in sub-heading
        const hs = document.getElementById('hs');
        if (hs) { hs.style.transition = 'opacity .5s'; hs.style.opacity = '1'; }

        // Fade in hero grid
        setTimeout(() => {
          const hg = document.getElementById('heroGrid');
          if (hg) { hg.style.transition = 'opacity .6s'; hg.style.opacity = '1'; }

          // Start whoami after grid appears
          setTimeout(() => { if (window.initWhoami) window.initWhoami(); }, 600);
        }, 300);

      }), 300);
    });
  }, 300);
}

// ── SCROLL REVEAL ──────────────────────────────────────
function initScrollReveal() {
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  runHero();
  initScrollReveal();
});

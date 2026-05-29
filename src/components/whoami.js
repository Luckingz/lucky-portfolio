// src/components/whoami.js
// Whoami box — lines typed in progressively as user scrolls.
// First few lines appear on initial load, rest reveal on scroll.
'use strict';

const WHOAMI_LINES = [
  { t: 'cmd' },
  { t: 'kv',    k: 'name',      v: 'Lucky Ajidoku' },
  { t: 'kv',    k: 'alias',     v: 'LuckyME!' },
  { t: 'kv',    k: 'role',      v: 'AI Engineer · Software Developer' },
  { t: 'kv',    k: 'location',  v: 'Abuja, Nigeria' },
  { t: 'kv',    k: 'education', v: 'B.Eng. Computer Engineering, BUK 2024' },
  { t: 'label', txt: 'stack ──' },
  { t: 'chips', items: ['Python','TypeScript','Go','Dart','JavaScript','C'], cls: 'lang' },
  { t: 'chips', items: ['TensorFlow','PyTorch','ArcFace','OpenCV','NLP','YOLO'], cls: 'ai' },
  { t: 'chips', items: ['React','Node.js','FastAPI','Flutter','PostgreSQL','Docker','Cardano','Streamlit'] },
  { t: 'award' },
  { t: 'ctas' },
];

let _wIdx = 0;
let _wDone = false;

// ── Render one line into the whoami body ──
function _renderLine(line) {
  const body = document.getElementById('whoamiBody');
  if (!body) return;

  const d = document.createElement('div');

  switch (line.t) {
    case 'cmd':
      d.innerHTML = `<span style="color:var(--acc2);font-family:var(--font-m)">root:~$</span> <span style="color:var(--acc)">whoami</span>`;
      body.appendChild(d);
      break;

    case 'kv': {
      d.style.cssText = 'display:flex;gap:0;align-items:baseline';
      const keyEl = document.createElement('span');
      keyEl.className = 'wb-key';
      keyEl.style.minWidth = '100px';
      keyEl.textContent = line.k;
      const sep = document.createElement('span');
      sep.className = 'wb-sep';
      sep.textContent = ' \u2500\u2500 ';
      const val = document.createElement('span');
      val.className = 'wb-val';
      val.id = 'wv-' + line.k;
      d.appendChild(keyEl);
      d.appendChild(sep);
      d.appendChild(val);
      body.appendChild(d);
      _typeInto(val, line.v, 22);
      break;
    }

    case 'label':
      d.className = 'wb-section';
      d.textContent = line.txt;
      body.appendChild(d);
      break;

    case 'chips': {
      d.style.cssText = 'margin:3px 0';
      line.items.forEach(it => {
        const s = document.createElement('span');
        s.className = 'chip' + (line.cls ? ' ' + line.cls : '');
        s.textContent = it;
        d.appendChild(s);
      });
      body.appendChild(d);
      break;
    }

    case 'award':
      d.className = 'wb-award';
      d.textContent = 'Best Project (Nationwide) \u2014 3MTT June Knowledge Showcase 2025';
      body.appendChild(d);
      break;

    case 'ctas': {
      const r = document.createElement('div');
      r.className = 'wb-ctas';
      r.innerHTML = `
        <a href="https://luckyajidoku.cv/" target="_blank" class="wb-cta p">CV</a>
        <a href="mailto:hello@luckyajidoku.cv" target="_blank" class="wb-cta">Email</a>
        <a href="https://github.com/Luckingz" target="_blank" class="wb-cta">GitHub</a>
        <a href="https://www.linkedin.com/in/lucky-ajidoku/" target="_blank" class="wb-cta">LinkedIn</a>
      `;
      body.appendChild(r);
      break;
    }
  }

  body.scrollTop = body.scrollHeight;
}

function _typeInto(el, txt, speed) {
  let i = 0;
  function step() {
    if (i < txt.length) { el.textContent += txt[i++]; setTimeout(step, speed); }
  }
  step();
}

// ── Advance one line ──
function advanceWhoami() {
  if (_wDone || _wIdx >= WHOAMI_LINES.length) return;
  _renderLine(WHOAMI_LINES[_wIdx]);
  _wIdx++;
  if (_wIdx >= WHOAMI_LINES.length) _wDone = true;
}

// ── Init: first 4 lines on load, rest on scroll ──
function initWhoami() {
  // Seed first block immediately
  const seedCount = 4;
  for (let i = 0; i < seedCount; i++) advanceWhoami();

  // Intersection observer on the whoami box
  const box = document.getElementById('whoamiBody');
  if (!box) return;

  const obs = new IntersectionObserver(() => {
    if (!_wDone) advanceWhoami();
  }, { threshold: Array.from({ length: 20 }, (_, i) => i * 0.05) });
  obs.observe(box.parentElement);

  // Also fire on window scroll (belt + suspenders)
  window.addEventListener('scroll', () => {
    if (!_wDone) advanceWhoami();
  }, { passive: true });
}

window.initWhoami    = initWhoami;
window.advanceWhoami = advanceWhoami;

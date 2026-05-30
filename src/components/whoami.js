// src/components/whoami.js
// Whoami terminal — each line typed char-by-char with blinking cursor.
// First 3 lines appear on hero load, rest triggered by scroll.
'use strict';

const WHOAMI_LINES = [
  { t: 'cmd' },
  { t: 'kv', k: 'name',      v: 'Lucky Ajidoku' },
  { t: 'kv', k: 'alias',     v: 'LuckyME!' },
  { t: 'kv', k: 'role',      v: 'AI Engineer & Software Developer' },
  { t: 'kv', k: 'location',  v: 'Abuja, Nigeria' },
  { t: 'kv', k: 'education', v: 'B.Eng. Computer Engineering, BUK 2024' },
  { t: 'sec', txt: 'stack' },
  { t: 'chips', items: ['Python','TypeScript','Go','Dart','JavaScript','C'], cls: 'lang' },
  { t: 'chips', items: ['TensorFlow','PyTorch','ArcFace','OpenCV','NLP','YOLO'], cls: 'ai' },
  { t: 'chips', items: ['React','Node.js','FastAPI','Flutter','PostgreSQL','Docker','Cardano','Streamlit'] },
  { t: 'award' },
  { t: 'ctas' },
];

let _wIdx  = 0;
let _wBusy = false;
let _wDone = false;

function _typer(el, txt, speed, cb) {
  let i = 0;
  function go() {
    if (i < txt.length) { el.textContent += txt[i++]; setTimeout(go, speed); }
    else if (cb) cb();
  }
  go();
}

function _makeCursor() {
  const c = document.createElement('span');
  c.className = 'wbcur';
  return c;
}

function _renderLine(line, cb) {
  const body = document.getElementById('whoamiBody');
  if (!body) return cb && cb();

  const row = document.createElement('div');
  row.style.marginBottom = '2px';

  switch (line.t) {

    case 'cmd': {
      const pr = document.createElement('span');
      pr.className = 'wb-prompt'; pr.textContent = 'root:~$ ';
      const cm = document.createElement('span');
      cm.className = 'wb-cmd';
      const cu = _makeCursor();
      row.appendChild(pr); row.appendChild(cm); row.appendChild(cu);
      body.appendChild(row);
      _typer(cm, 'whoami', 55, () => {
        // simulate Enter pause then cursor disappears
        setTimeout(() => { cu.remove(); body.scrollTop = body.scrollHeight; cb && cb(); }, 500);
      });
      break;
    }

    case 'kv': {
      const kEl = document.createElement('span');
      kEl.className = 'wb-key';
      const sEl = document.createElement('span');
      sEl.className = 'wb-sep';
      const vEl = document.createElement('span');
      vEl.className = 'wb-val';
      const cu = _makeCursor();
      row.appendChild(kEl); row.appendChild(sEl); row.appendChild(vEl); row.appendChild(cu);
      body.appendChild(row);
      _typer(kEl, line.k, 45, () => {
        sEl.textContent = ': ';           // colon separator
        _typer(vEl, line.v, 25, () => {
          cu.remove(); body.scrollTop = body.scrollHeight; cb && cb();
        });
      });
      break;
    }

    case 'sec': {
      const sEl = document.createElement('span');
      sEl.className = 'wb-sec';
      const cu = _makeCursor();
      row.appendChild(sEl); row.appendChild(cu);
      body.appendChild(row);
      _typer(sEl, line.txt + ' :', 40, () => { cu.remove(); cb && cb(); });
      break;
    }

    case 'chips': {
      row.style.margin = '3px 0';
      line.items.forEach(it => {
        const s = document.createElement('span');
        s.className = 'chip' + (line.cls ? ' ' + line.cls : '');
        s.textContent = it;
        row.appendChild(s);
      });
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;
      cb && cb();
      break;
    }

    case 'award': {
      const a = document.createElement('span');
      a.className = 'wb-award';
      const cu = _makeCursor();
      row.appendChild(a); row.appendChild(cu);
      body.appendChild(row);
      _typer(a, 'Best Project (Nationwide) — 3MTT June Knowledge Showcase 2025', 18, () => {
        cu.remove(); body.scrollTop = body.scrollHeight; cb && cb();
      });
      break;
    }

    case 'ctas': {
      const ctas = document.createElement('div');
      ctas.className = 'wb-ctas';
      ctas.innerHTML = `
        <a href="https://luckyajidoku.cv/" target="_blank" class="wb-cta p">CV</a>
        <a href="mailto:hello@luckyajidoku.cv" target="_blank" class="wb-cta">E-Mail</a>
        <a href="https://github.com/Luckingz" target="_blank" class="wb-cta">GitHub</a>
        <a href="https://www.linkedin.com/in/lucky-ajidoku/" target="_blank" class="wb-cta">LinkedIn</a>
      `;
      body.appendChild(ctas);
      body.scrollTop = body.scrollHeight;
      cb && cb();
      break;
    }

    default: cb && cb();
  }
}

function advanceWhoami() {
  if (_wBusy || _wDone || _wIdx >= WHOAMI_LINES.length) return;
  _wBusy = true;
  _renderLine(WHOAMI_LINES[_wIdx], () => {
    _wIdx++;
    _wBusy = false;
    if (_wIdx >= WHOAMI_LINES.length) _wDone = true;
  });
}

function initWhoami() {
  // 1. Set the busy flag to true so the scroll/observer listeners wait
  _wBusy = true; 

  function seed(i) {
    if (i >= 3) {
      // 3. Seeding is finished! Turn busy off so user can scroll to load the rest
      _wBusy = false; 
      return;
    }
    // We bypass _wBusy checking inside our manual seeding step
    _renderLine(WHOAMI_LINES[i], () => { 
      _wIdx = i + 1; 
      seed(i + 1); 
    });
  }
  
  // 2. Start seeding line 0, 1, and 2 safely
  seed(0);

  // Remaining lines reveal safely on scroll/intersection only after seeding completes
  window.addEventListener('scroll', () => { if (!_wDone) advanceWhoami(); }, { passive: true });

  const body = document.getElementById('whoamiBody');
  if (body) {
    const obs = new IntersectionObserver(
      () => { if (!_wDone) advanceWhoami(); },
      { threshold: Array.from({ length: 10 }, (_, i) => i * 0.1) }
    );
    obs.observe(body.parentElement);
  }
}

window.initWhoami    = initWhoami;
window.advanceWhoami = advanceWhoami;

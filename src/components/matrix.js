// src/components/matrix.js
// Theme-aware matrix rain — dark bg in Night Walker, light bg in Sun Summoner.
// Multi-layer: fast foreground, slow background, glowing lead chars.
'use strict';

let _mAnim = null, _mActive = false;

function _isLight() {
  return document.documentElement.getAttribute('data-theme') === 'light';
}

function startMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const hero   = document.getElementById('hero');
  if (!canvas || !hero) return;

  canvas.width  = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
  canvas.classList.add('vis');
  _mActive = true;

  const ctx  = canvas.getContext('2d');
  const W    = canvas.width;
  const H    = canvas.height;
  const SIZE = 15;
  const cols = Math.floor(W / SIZE);

  // Two independent drop layers — foreground fast, background slow & dim
  const fg = Array.from({ length: cols },       () => (Math.random() * H / SIZE) | 0);
  const bg = Array.from({ length: cols >> 1 }, () => (Math.random() * H / SIZE) | 0);

  const CHARS_JP  = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
  const CHARS_EN  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]|@#$%&*';
  const ALL_CHARS = CHARS_JP + CHARS_EN;

  function rch() { return ALL_CHARS[Math.random() * ALL_CHARS.length | 0]; }

  let frame = 0;

  function draw() {
    if (!_mActive) return;

    const light = _isLight();

    // Theme-aware trail fade
    ctx.fillStyle = light ? 'rgba(242,242,232,0.22)' : 'rgba(6,6,10,0.18)';
    ctx.fillRect(0, 0, W, H);

    // Colour palette
    const colLead  = light ? '#1a1a1a'           : '#ffffff';     // very top char
    const colBright= light ? '#3a7c00'           : '#c8f03c';     // fresh lime / dark green
    const colMid   = light ? 'rgba(58,124,0,.6)' : 'rgba(200,240,60,.45)';
    const colDim   = light ? 'rgba(58,124,0,.25)': 'rgba(150,200,20,.18)';

    // ── Background layer (slow, dim, smaller) ──
    if (frame % 2 === 0) {               // only update every other frame → half speed
      ctx.font = '11px IBM Plex Mono,monospace';
      bg.forEach((y, i) => {
        const x = (i * 2 + 1) * SIZE;   // offset so it doesn't overlap fg perfectly
        if (x >= W) return;
        ctx.fillStyle = colDim;
        ctx.fillText(rch(), x, y * SIZE);
        if (y * SIZE > H && Math.random() > 0.96) bg[i] = 0; else bg[i]++;
      });
    }

    // ── Foreground layer (normal speed) ──
    ctx.font = `${SIZE - 1}px IBM Plex Mono,monospace`;
    fg.forEach((y, i) => {
      const x  = i * SIZE;
      const px = y * SIZE;

      // Lead char: glowing / high contrast
      if (y < 2) {
        ctx.fillStyle = colLead;
        ctx.shadowColor  = light ? '#3a7c00' : '#c8f03c';
        ctx.shadowBlur   = 8;
        ctx.fillText(rch(), x, px);
        ctx.shadowBlur   = 0;
      } else if (y < 5) {
        ctx.fillStyle = colBright;
        ctx.fillText(rch(), x, px);
      } else {
        ctx.fillStyle = colMid;
        ctx.fillText(rch(), x, px);
      }

      if (px > H && Math.random() > 0.97) fg[i] = 0; else fg[i]++;
    });

    // ── Random horizontal flash (glitch) — every ~80 frames ──
    if (Math.random() < 0.012) {
      const gy = (Math.random() * H) | 0;
      ctx.fillStyle = light ? 'rgba(58,124,0,.12)' : 'rgba(200,240,60,.08)';
      ctx.fillRect(0, gy, W, 2);
    }

    frame++;
    _mAnim = requestAnimationFrame(draw);
  }

  draw();

  // Fade out after 4s, clear after 5.5s
  setTimeout(() => {
    canvas.style.transition = 'opacity 1.5s';
    canvas.style.opacity    = '0';
    setTimeout(() => {
      stopMatrix();
      canvas.classList.remove('vis');
      canvas.style.opacity    = '';
      canvas.style.transition = '';
    }, 1600);
  }, 4000);
}

function stopMatrix() {
  _mActive = false;
  if (_mAnim) { cancelAnimationFrame(_mAnim); _mAnim = null; }
  const c = document.getElementById('matrixCanvas');
  if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
}

window.startMatrix = startMatrix;
window.stopMatrix  = stopMatrix;

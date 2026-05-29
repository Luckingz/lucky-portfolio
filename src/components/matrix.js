// src/components/matrix.js
// Matrix rain canvas — fires on Full-Stack mode, clears after ~3.5s
'use strict';

let _matAnim = null;
let _matActive = false;

function startMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const hero   = document.getElementById('hero');
  if (!canvas || !hero) return;

  canvas.width  = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
  canvas.classList.add('vis');
  _matActive = true;

  const ctx  = canvas.getContext('2d');
  const cols = Math.floor(canvas.width / 16);
  const drops = Array.from({ length: cols }, () => Math.random() * (canvas.height / 16) | 0);
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]|\\/@#$%';

  function draw() {
    if (!_matActive) return;

    // Faded trail
    ctx.fillStyle = 'rgba(6,6,10,0.18)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '14px IBM Plex Mono, monospace';

    drops.forEach((y, i) => {
      const ch = chars[Math.random() * chars.length | 0];
      const x  = i * 16;
      // Top char bright white, rest lime green
      ctx.fillStyle = y < 3 ? '#ffffff' : '#c8f03c';
      ctx.fillText(ch, x, y * 16);
      if (y * 16 > canvas.height && Math.random() > 0.97) drops[i] = 0;
      else drops[i]++;
    });

    _matAnim = requestAnimationFrame(draw);
  }

  draw();

  // Fade out after 3.5s, clear after 5s
  setTimeout(() => {
    canvas.style.transition = 'opacity 1.5s';
    canvas.style.opacity    = '0';
    setTimeout(() => {
      stopMatrix();
      canvas.classList.remove('vis');
      canvas.style.opacity     = '';
      canvas.style.transition  = '';
    }, 1600);
  }, 3500);
}

function stopMatrix() {
  _matActive = false;
  if (_matAnim) { cancelAnimationFrame(_matAnim); _matAnim = null; }
  const canvas = document.getElementById('matrixCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

window.startMatrix = startMatrix;
window.stopMatrix  = stopMatrix;

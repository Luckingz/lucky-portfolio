// src/components/matrix.js
'use strict';
let _mAnim = null, _mActive = false;

function startMatrix() {
  const canvas = document.getElementById('matrixCanvas');
  const hero   = document.getElementById('hero');
  if (!canvas || !hero) return;
  canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight;
  canvas.classList.add('vis'); _mActive = true;
  const ctx = canvas.getContext('2d');
  const cols = Math.floor(canvas.width / 16);
  const drops = Array.from({ length: cols }, () => Math.random() * (canvas.height / 16) | 0);
  const chars = 'ABCDEFGHIJKLMN0PQRSTUVWXYZ123456789<>{}[]@#$%';
  function draw() {
    if (!_mActive) return;
    ctx.fillStyle = 'rgba(6,6,10,.18)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px IBM Plex Mono,monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.random() * chars.length | 0];
      ctx.fillStyle = y < 3 ? '#ffffff' : '#c8f03c';
      ctx.fillText(ch, i * 16, y * 16);
      if (y * 16 > canvas.height && Math.random() > .97) drops[i] = 0; else drops[i]++;
    });
    _mAnim = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(() => {
    canvas.style.transition = 'opacity 1.5s'; canvas.style.opacity = '0';
    setTimeout(() => { stopMatrix(); canvas.classList.remove('vis'); canvas.style.opacity = ''; canvas.style.transition = ''; }, 1600);
  }, 3500);
}

function stopMatrix() {
  _mActive = false;
  if (_mAnim) { cancelAnimationFrame(_mAnim); _mAnim = null; }
  const c = document.getElementById('matrixCanvas');
  if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
}

window.startMatrix = startMatrix;
window.stopMatrix  = stopMatrix;

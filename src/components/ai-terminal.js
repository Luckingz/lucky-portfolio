// src/components/ai-terminal.js
// All suggestion answers are prefilled — no API calls needed.
// Typing "send" redirects user to the Chat with Lucky modal.
'use strict';

const PREFILLED = {
  python:
`Python is Lucky's most-used language. Five projects run on it:

  1. YoTouch        — ArcFace + OpenCV biometric engine
  2. EnergizeAI     — FastAPI backend for the solar PV AI tool
  3. GPMP           — scikit-learn ML pipeline for gas maintenance
  4. StudyinNaija   — NLP question generation engine
  5. TrafficMonitor — YOLO + OpenCV vehicle detection

Python handles all heavy AI/ML workloads across the stack.`,

  energize:
`EnergizeAI is Lucky's award-winning project.

It automates solar PV system blueprint design for engineers
and field technicians using AI. Instead of hours of manual
calculation, the tool generates a complete system layout
in minutes.

Stack: Flutter (mobile), Dart, Python, FastAPI
Role:  Lead AI Engineer

Won Best Project (Nationwide) at the 3MTT June Knowledge
Showcase 2025, competing against projects from across Nigeria.`,

  awards:
`Lucky's national award:

  Best Project (Nationwide)
  3MTT June Knowledge Showcase 2025
  Project: EnergizeAI

Certifications:
  - AI & Machine Learning — 3MTT / NITDA
  - Project Management   — SDC Canada
  - Train-The-Trainer    — DSN x Microsoft
  - AI for Energy Hackathon — DSN x NNPC`,

  blockchain:
`That would be YoTouch.

YoTouch uses the Cardano blockchain for decentralised
identity verification. Biometric data (ArcFace face
embeddings + liveness scores) is processed off-chain.
Only a tamper-proof hash is stored on-chain, keeping
the system NDPR and GDPR compliant.

Stack: Python, ArcFace, OpenCV, Cardano, Node.js, PostgreSQL
Role:  AI Engineer`,

  gpmp:
`GPMP stands for Gas Prediction & Maintenance Prediction.

It's an ML system built to predict equipment failures in
industrial gas systems before they happen, reducing
downtime and maintenance costs.

Deployed as a live Streamlit app with interactive dashboards.

Stack: Python, scikit-learn, Pandas, Streamlit
Role:  AI/ML Engineer`,

  vision:
`Two projects use computer vision:

  1. YoTouch
     ArcFace facial recognition + OpenCV for real-time
     liveness detection (blink, head-turn challenges).

  2. TrafficMonitor
     YOLO object detection + OpenCV tracking for vehicle
     classification and counting from live video feeds.
     Deployed as a Google Colab notebook.`,
};

function _typer(el, txt, speed, cb) {
  let i = 0;
  function go() {
    if (i < txt.length) { el.textContent += txt[i++]; setTimeout(go, speed); }
    else if (cb) cb();
  }
  go();
}

function _esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function _appendUser(q) {
  const out = document.getElementById('atOut');
  if (!out) return;
  const d = document.createElement('div');
  d.className = 'at-msg-u';
  d.innerHTML = `<span style="color:var(--acc)">&#10095;</span> ${_esc(q)}`;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}

function _appendTyped(txt, cb) {
  const out = document.getElementById('atOut');
  if (!out) return;
  const d = document.createElement('div');
  d.className = 'at-msg-a';
  const ps  = document.createElement('span');
  ps.className = 'at-ps'; ps.textContent = 'Lucky~$ ';
  const body = document.createElement('span');
  const cur  = document.createElement('span');
  cur.className = 'wbcur';
  d.appendChild(ps); d.appendChild(body); d.appendChild(cur);
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
  _typer(body, txt, 11, () => {
    cur.remove();
    out.scrollTop = out.scrollHeight;
    if (cb) cb();
  });
}

// Called when user clicks a suggestion chip
function answerQ(el, key) {
  el.classList.add('used');
  const q   = el.textContent;
  const ans = PREFILLED[key] || 'I only know about Lucky ME! Ask about his projects, skills, or background.';
  _appendUser(q);
  _appendTyped(ans, null);
}

// Called when user presses SEND or hits Enter in the text field
function sendAI() {
  const inp = document.getElementById('atIn');
  const q   = (inp ? inp.value : '').trim();
  if (!q) return;
  if (inp) inp.value = '';

  _appendUser(q);

  const msg = 'Why waste AI tokens when you could chat with the man himself?';
  _appendTyped(msg, () => {
    const out = document.getElementById('atOut');
    if (!out) return;
    const nudge = document.createElement('div');
    nudge.className = 'at-redirect-nudge';
    nudge.innerHTML = `Talk to Lucky directly &rarr;<br/>
      <button class="at-redirect-btn" onclick="openChat()">&#9654; Chat with Lucky</button>`;
    out.appendChild(nudge);
    out.scrollTop = out.scrollHeight;
  });
}

window.answerQ = answerQ;
window.sendAI  = sendAI;

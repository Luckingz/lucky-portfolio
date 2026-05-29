// src/components/ai-terminal.js
// Live AI terminal — swap GROQ_KEY with your real key.
// Model: llama-3.1-8b-instant (free tier, very fast)
'use strict';

// ── SET YOUR GROQ KEY HERE (or via env in your backend proxy) ──
// For local dev: paste your key below.
// For production (Vercel/Netlify): use a serverless function proxy
// and change the fetch URL to '/api/chat'. Never expose keys in prod.
window.GROQ_KEY = 'YOUR_GROQ_KEY_HERE';

let _atHistory = [];

function _buildSystemPrompt() {
  const P = window.PERSONAL || {};
  const projects = window.PROJECTS || [];

  const projectLines = projects.map((p, i) => {
    const links = [p.repo && `repo:${p.repo}`, p.live && `live:${p.live}`].filter(Boolean).join(' | ');
    return `${i+1}. ${p.title} — ${p.desc} Stack: ${p.tags.join(', ')}. Role: ${p.role}. ${links}`;
  }).join('\n');

  return `You are the AI assistant embedded in Lucky Ajidoku's portfolio website.
Answer questions about Lucky ONLY. Refuse anything unrelated politely.

ABOUT LUCKY:
- Full name: Lucky Ajidoku | Alias: LuckyME!
- Role: AI Engineer & Software Developer
- Location: Abuja, Nigeria
- Education: ${P.education || 'B.Eng. Computer Engineering, BUK 2024'}
- GitHub: github.com/Luckingz | LinkedIn: in/lucky-ajidoku | CV: luckyajidoku.cv

TECH STACK:
  Languages : Python, TypeScript, Go (learning), Dart, JavaScript, C
  AI/ML     : TensorFlow, PyTorch, ArcFace, OpenCV, NLP, YOLO, scikit-learn
  Web/Mobile: React, Node.js, FastAPI, Flutter, PostgreSQL, Docker, Cardano, Streamlit

AWARDS:
- Best Project (Nationwide) — 3MTT June Knowledge Showcase 2025 (EnergizeAI)

CERTIFICATIONS:
- AI and Machine Learning — 3MTT / NITDA
- Project Management — Skill Development Council, Canada
- Train-The-Trainer — Data Science Nigeria x Microsoft
- AI for Energy Hackathon — DSN x NNPC

PROJECTS (${projects.length}):
${projectLines}

PROJECT CROSS-REFERENCES:
- Python projects: YoTouch, EnergizeAI, GPMP, StudyinNaija, TrafficMonitor
- Blockchain: YoTouch (Cardano)
- Computer Vision: YoTouch (ArcFace), TrafficMonitor (YOLO/OpenCV)
- Flutter: EnergizeAI
- Award-winning: EnergizeAI
- Hackathon: ComplyNG

RULES:
- Under 120 words per response. Concise, terminal-style.
- If asked about a project, mention its stack, role, link.
- If asked which projects use a tech, list them clearly.
- If the question is not about Lucky, say: "I only know about Lucky ME! Ask me about his projects, skills, or background."
- Never fabricate.`;
}

async function sendAI() {
  const inp = document.getElementById('atIn');
  const q   = (inp.value || '').trim();
  if (!q) return;
  inp.value = '';

  _appendUser(q);
  _appendThinking();

  try {
    const messages = [..._atHistory, { role: 'user', content: q }];

    // ── SWAP URL TO '/api/chat' WHEN USING A BACKEND PROXY ──
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 300,
        messages: [
          { role: 'system', content: _buildSystemPrompt() },
          ...messages,
        ],
      }),
    });

    const data  = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'Something went wrong. Try again!';
    _removeThinking();
    _appendAI(reply);

    _atHistory.push({ role: 'user', content: q }, { role: 'assistant', content: reply });
    if (_atHistory.length > 20) _atHistory = _atHistory.slice(-20);

  } catch (err) {
    _removeThinking();
    _appendAI("Can't connect right now. Try the Chat with Lucky button to reach Lucky directly!");
  }
}

function askTerm(q) {
  const inp = document.getElementById('atIn');
  if (inp) inp.value = q;
  sendAI();
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

function _appendAI(txt) {
  const out = document.getElementById('atOut');
  if (!out) return;
  const d = document.createElement('div');
  d.className = 'at-msg-a';
  d.innerHTML = `<span class="at-ps">Lucky~$</span>${_esc(txt).replace(/\n/g, '<br>')}`;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}

function _appendThinking() {
  const out = document.getElementById('atOut');
  if (!out) return;
  const d = document.createElement('div');
  d.id = 'at-thinking';
  d.className = 'at-thinking';
  d.textContent = 'thinking...';
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}

function _removeThinking() {
  const t = document.getElementById('at-thinking');
  if (t) t.remove();
}

function _esc(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

window.sendAI  = sendAI;
window.askTerm = askTerm;

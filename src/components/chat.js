// src/components/chat.js
// "Chat with Lucky" — terminal-style email form.
// Sends via FormSubmit (free, no backend needed).
// Replace 'me@luckyajidoku.cv' with your real email.
'use strict';

// ── CONFIG ──────────────────────────────────────────────
const LUCKY_EMAIL = (window.PERSONAL && window.PERSONAL.email) || 'me@luckyajidoku.cv';

// ── FORM STEPS ──────────────────────────────────────────
// Each step: field name, terminal prompt label, question typed out to user
const STEPS = [
  { field: 'name',    prompt: 'whoareyou',     question: 'What is your name?' },
  { field: 'email',   prompt: 'email-address', question: 'What is your email address?' },
  { field: 'subject', prompt: 'subject',       question: "What's this about? (subject line)" },
  { field: 'message', prompt: 'message',       question: 'Write your message to Lucky:' },
  { field: 'confirm', prompt: 'confirm',       question: 'Ready to send? Type yes to confirm or no to cancel.' },
];

let _step    = 0;
let _data    = {};
let _sending = false;

// ── OPEN / CLOSE ────────────────────────────────────────
function openChat() {
  _step    = 0;
  _data    = {};
  _sending = false;

  const body = document.getElementById('cmBody');
  if (body) body.innerHTML = '';

  document.getElementById('chatOverlay').classList.add('open');

  _cmTypeOut('lucky@mail:~$ init contact_form', () => {
    setTimeout(() => _cmTypeOut("Hey! I'll relay your message directly to Lucky. Let's go.", () => {
      setTimeout(_askStep, 400);
    }), 200);
  }, 'acc');
}

function closeChat() {
  document.getElementById('chatOverlay').classList.remove('open');
}

// ── ADVANCE STEP ─────────────────────────────────────────
function cmNext() {
  if (_sending) return;
  const inp = document.getElementById('cmInput');
  const val = (inp ? inp.value : '').trim();
  if (!val) return;
  if (inp) inp.value = '';

  const step = STEPS[_step];

  // Echo user input
  _cmPrint(`[${step.prompt}]  ${val}`, 'acc2');

  if (step.field === 'confirm') {
    if (val.toLowerCase().startsWith('y')) {
      _sending = true;
      _cmTypeOut('Sending your message to Lucky...', () => {
        _doSend().then(ok => {
          _sending = false;
          if (ok) {
            _cmTypeOut('Message sent! Lucky will get back to you soon.', null, 'acc3');
            setTimeout(closeChat, 2800);
          } else {
            _cmTypeOut(`Could not send automatically. Email Lucky directly at ${LUCKY_EMAIL}`, null, 'red');
          }
        });
      });
    } else {
      _cmTypeOut('Message cancelled. Come back anytime!', () => setTimeout(closeChat, 1400), 'acc3');
    }
    return;
  }

  _data[step.field] = val;
  _step++;
  if (_step < STEPS.length) setTimeout(_askStep, 300);
}

// ── ASK CURRENT STEP ─────────────────────────────────────
function _askStep() {
  if (_step >= STEPS.length) return;
  const step = STEPS[_step];
  _cmTypeOut(step.question, () => {
    const inp = document.getElementById('cmInput');
    if (inp) {
      inp.placeholder = step.prompt;
      inp.focus();
    }
  });
}

// ── SEND VIA FORMSUBMIT ──────────────────────────────────
async function _doSend() {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${LUCKY_EMAIL}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({
        name:      _data.name,
        email:     _data.email,
        subject:   _data.subject,
        message:   _data.message,
        _captcha:  'false',
        _template: 'table',
      }),
    });
    const d = await res.json();
    return d.success === 'true' || d.success === true;
  } catch (e) {
    return false;
  }
}

// ── DOM HELPERS ───────────────────────────────────────────
function _cmPrint(txt, colorVar) {
  const body = document.getElementById('cmBody');
  if (!body) return;
  const d = document.createElement('div');
  d.className = 'cm-line';
  if (colorVar) d.style.color = `var(--${colorVar})`;
  d.textContent = txt;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}

function _cmTypeOut(txt, onDone, colorVar) {
  const body = document.getElementById('cmBody');
  if (!body) return;
  const d = document.createElement('div');
  d.className = 'cm-line';
  if (colorVar) d.style.color = `var(--${colorVar})`;
  body.appendChild(d);
  let i = 0;
  function go() {
    if (i < txt.length) {
      d.textContent += txt[i++];
      body.scrollTop = body.scrollHeight;
      setTimeout(go, 16);
    } else if (onDone) {
      onDone();
    }
  }
  go();
}

window.openChat  = openChat;
window.closeChat = closeChat;
window.cmNext    = cmNext;

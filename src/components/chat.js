// src/components/chat.js
// Terminal-style email form via FormSubmit (free, no backend).
// Replace LUCKY_EMAIL with your real address.
'use strict';

const LUCKY_EMAIL = 'hello@luckyajidoku.cv';

const STEPS = [
  { field: 'name',    prompt: 'whoareyou',     question: 'What is your name?' },
  { field: 'email',   prompt: 'email-address', question: 'What is your email address?' },
  { field: 'subject', prompt: 'subject',       question: "What's this about? (subject line)" },
  { field: 'message', prompt: 'message',       question: 'Your message to Lucky:' },
  { field: 'confirm', prompt: 'confirm',       question: 'Ready to send? Type yes to confirm or no to cancel.' },
];

let _step    = 0;
let _data    = {};
let _sending = false;

function openChat() {
  _step = 0; _data = {}; _sending = false;
  const body = document.getElementById('cmBody');
  if (body) body.innerHTML = '';
  document.getElementById('chatOverlay').classList.add('open');
  _cmType('lucky@mail:~$ init contact_form', 'var(--acc)', () => {
    setTimeout(() => _cmType("Hey! I'll relay your message directly to Lucky. Let's go.", 'var(--txt2)', () => {
      setTimeout(_askStep, 400);
    }), 300);
  });
}

function closeChat() {
  document.getElementById('chatOverlay').classList.remove('open');
}

function cmNext() {
  if (_sending) return;
  const inp = document.getElementById('cmInput');
  const val = (inp ? inp.value : '').trim();
  if (!val) return;
  if (inp) inp.value = '';

  const step = STEPS[_step];
  _cmPrint('[' + step.prompt + ']  ' + val, 'var(--acc2)');

  if (step.field === 'confirm') {
    if (val.toLowerCase().startsWith('y')) {
      _sending = true;
      _cmType('Sending your message to Lucky...', 'var(--txt2)', () => {
        _doSend().then(ok => {
          _sending = false;
          if (ok) {
            _cmType('Message sent! Lucky will get back to you soon.', 'var(--acc3)', () => setTimeout(closeChat, 2800));
          } else {
            _cmType('Could not send automatically. Email hello@luckyajidoku.cv directly.', 'var(--red)', null);
          }
        });
      });
    } else {
      _cmType('Message cancelled. Come back anytime!', 'var(--acc3)', () => setTimeout(closeChat, 1400));
    }
    return;
  }

  _data[step.field] = val;
  _step++;
  if (_step < STEPS.length) setTimeout(_askStep, 300);
}

function _askStep() {
  if (_step >= STEPS.length) return;
  const step = STEPS[_step];
  _cmType(step.question, 'var(--txt2)', () => {
    const inp = document.getElementById('cmInput');
    if (inp) { inp.placeholder = step.prompt; inp.focus(); }
  });
}

async function _doSend() {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${LUCKY_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: _data.name, email: _data.email,
        subject: _data.subject, message: _data.message,
        _captcha: 'false', _template: 'table',
      }),
    });
    const d = await res.json();
    return d.success === 'true' || d.success === true;
  } catch (e) { return false; }
}

function _cmPrint(txt, color) {
  const body = document.getElementById('cmBody');
  if (!body) return;
  const d = document.createElement('div');
  d.className = 'cm-line';
  d.style.color = color;
  d.textContent = txt;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}

function _cmType(txt, color, cb) {
  const body = document.getElementById('cmBody');
  if (!body) return;
  const d = document.createElement('div');
  d.className = 'cm-line';
  d.style.color = color;
  body.appendChild(d);
  let i = 0;
  function go() {
    if (i < txt.length) { d.textContent += txt[i++]; body.scrollTop = body.scrollHeight; setTimeout(go, 16); }
    else if (cb) cb();
  }
  go();
}

window.openChat  = openChat;
window.closeChat = closeChat;
window.cmNext    = cmNext;

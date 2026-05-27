(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),window.PROJECTS=[{id:`studyinnaija`,title:`StudyinNaija Assessments`,role:`Full-Stack AI Engineer`,desc:`AI-powered assessment platform for students targeting Nigerian universities. Generates personalised test questions, scores responses, and surfaces study recommendations in real time.`,tags:[`AI`,`NLP`,`JavaScript`,`Python`],category:`fullstack`,repo:`https://github.com/Luckingz/studyinnaija-assessments`,liveUrl:`https://www.studyinnaija.com/p/ai-powered-assessments.html`,driveId:null,year:2025,featured:!0},{id:`shoutout`,title:`ShoutOUT!`,role:`Full-Stack Developer`,desc:`Real-time social shoutout app that lets users broadcast appreciation messages across a live feed — think Twitter meets a hype machine.`,tags:[`React`,`Node.js`,`WebSockets`,`TypeScript`],category:`fullstack`,repo:`https://github.com/Luckingz/shoutOUT`,liveUrl:null,driveId:`11ml1Adk82T6Mfhft71qBAcXkR-RQvVhy`,year:2025,featured:!0},{id:`yotouch`,title:`YoTouch`,role:`AI Engineer`,desc:`Decentralised blockchain identity verification powered by ArcFace facial recognition and real-time liveness detection. Off-chain biometric storage on Cardano — NDPR & GDPR compliant.`,tags:[`Python`,`ArcFace`,`OpenCV`,`Cardano`,`Node.js`,`PostgreSQL`],category:`fullstack`,repo:`https://github.com/Luckingz/yotouch`,liveUrl:null,driveId:`1TKfnWxra9Zv66PtesuVLK8JP9LtVcjm7`,year:2025,featured:!0},{id:`energizeai`,title:`EnergizeAI 🏆`,role:`Lead AI Engineer`,desc:`Award-winning AI tool that automates solar PV system blueprint design for engineers and field technicians. Won Best Project (Nationwide) at 3MTT June Knowledge Showcase 2025.`,tags:[`Flutter`,`Dart`,`AI/ML`,`Python`,`FastAPI`],category:`fullstack`,repo:`https://github.com/Luckingz/energize-ai`,liveUrl:`https://www.linkedin.com/posts/lucky-ajidoku_energizeai-energizeai-3mttlearningcommunity-activity-7336376892599459840-Yi3a`,driveId:null,year:2025,featured:!0}],window.PERSONAL={name:`Lucky Ajidoku`,alias:`Lucky ME!`,title:`AI Engineer · Software Developer`,location:`Abuja, Nigeria 🇳🇬`,education:`B.Eng. Computer Engineering, BUK 2024`,github:`https://github.com/Luckingz`,linkedin:`https://www.linkedin.com/in/lucky-ajidoku/`,cv:`https://luckyajidoku.cv/`,stacks:{languages:[`Python`,`TypeScript`,`Go`,`Dart`,`JS`,`C`],aiml:[`TensorFlow`,`PyTorch`,`OpenCV`,`ArcFace`,`NLP`],web:[`React`,`Node.js`,`FastAPI`,`Flutter`,`PostgreSQL`,`Docker`,`Cardano`]},awards:[`🏆 Best Project (Nationwide) — 3MTT June Knowledge Showcase 2025`]};var e=`frontend`,t=!0;function n(){let e=localStorage.getItem(`portfolio-theme`);t=e?e===`dark`:window.matchMedia(`(prefers-color-scheme: dark)`).matches,r()}function r(){document.documentElement.setAttribute(`data-theme`,t?`dark`:`light`);let e=document.getElementById(`themeBtn`);e&&(e.textContent=t?`🌙`:`☀️`),localStorage.setItem(`portfolio-theme`,t?`dark`:`light`)}function i(){t=!t,r()}window.toggleTheme=i;function a(t){e=t;let n=document.getElementById(`main`);n.className=``,t===`backend`&&n.classList.add(`be-mode`),t===`fullstack`&&n.classList.add(`fs-mode`),document.querySelectorAll(`.mode-btn`).forEach(e=>e.classList.remove(`active`)),document.querySelector(`.mode-btn`+{frontend:`.fe`,backend:`.be`,fullstack:`.fs`}[t]).classList.add(`active`);let r=document.getElementById(`hero`);r.className=`hero`,r.classList.add({frontend:`hero-bg-fe`,backend:`hero-bg-be`,fullstack:`hero-bg-fs`}[t]);let i=document.getElementById(`hw`);i.className=`line-hw`,i.classList.add({frontend:`fe-hw`,backend:`be-hw`,fullstack:`fs-hw`}[t]),document.getElementById(`sectionTitle`).textContent={frontend:`Projects`,backend:`// projects`,fullstack:`✦ Projects`}[t],document.getElementById(`footerTxt`).textContent={frontend:`Built with React + TypeScript · Lucky ME! © 2025`,backend:`// built with Go + React + TypeScript — Lucky ME! © 2025`,fullstack:`✦ Full-Stack · React · TypeScript · Go · Lucky ME! © 2025`}[t],p()}window.setMode=a;function o(){let e=window.PERSONAL,t=document.getElementById(`whoami-out`);if(!t)return;let n=(e,t)=>`<span class="tag ${t}">${e}</span>`,r=e.stacks.languages.map(e=>n(e,`lang`)).join(``),i=e.stacks.aiml.map(e=>n(e,`ai`)).join(``),a=e.stacks.web.map(e=>n(e,``)).join(``),o=e.awards.map(e=>n(e,`award`)).join(``);t.innerHTML=`
    <div><span class="key">name       </span><span class="val"> ${e.name}</span></div>
    <div><span class="key">alias      </span><span class="val"> ${e.alias} 🚀</span></div>
    <div><span class="key">role       </span><span class="val"> ${e.title}</span></div>
    <div><span class="key">location   </span><span class="val"> ${e.location}</span></div>
    <div><span class="key">education  </span><span class="val"> ${e.education}</span></div>
    <div style="margin-top:8px"><span class="key">stack      </span></div>
    <div style="margin:4px 0 8px">${r}</div>
    <div style="margin:4px 0 8px">${i}</div>
    <div style="margin:4px 0 8px">${a}</div>
    <div style="margin-top:8px"><span class="key">awards     </span></div>
    <div style="margin:4px 0">${o}</div>
    <div style="margin-top:8px"><span class="key">github     </span><span class="val"> github.com/Luckingz</span></div>
    <div><span class="key">linkedin   </span><span class="val"> in/lucky-ajidoku</span></div>
  `}function s(e,t){setTimeout(()=>{let t=document.getElementById(e);t&&(t.style.transition=`opacity 0.5s`,t.style.opacity=`1`,e===`whoami-out`&&(t.style.display=`block`))},t)}function c(){o(),s(`hw`,300),s(`name`,900),s(`welcome`,1400),s(`whoami-cmd`,2e3),s(`whoami-out`,2600),s(`cursor-line`,3200),s(`ctas`,3600),setTimeout(()=>{let e=document.getElementById(`projectsSection`);e&&e.classList.add(`revealed`)},4200)}function l(e,t){let n=document.getElementById(`wrap-`+e);if(!n)return;let r=document.createElement(`iframe`);r.src=`https://drive.google.com/file/d/${t}/preview`,r.title=`Project demo`,r.allow=`autoplay`,r.allowFullscreen=!0,r.style.cssText=`position:absolute;top:0;left:0;width:100%;height:100%;border:none`,n.innerHTML=``,n.appendChild(r)}window.loadVideo=l;function u(e){let t=[];e.liveUrl?t.push(`<a href="${e.liveUrl}" target="_blank" class="card-link link-primary">↗ Live Demo</a>`):e.driveId&&t.push(`<a href="https://drive.google.com/file/d/${e.driveId}/view" target="_blank" class="card-link link-primary">▶ Watch Demo</a>`),e.repo&&t.push(`<a href="${e.repo}" target="_blank" class="card-link link-outline">⬡ Repo</a>`);let n=document.createElement(`div`);return n.className=`card-fe`,n.innerHTML=`
    <div class="year-badge">${e.year}</div>
    <div class="card-role">${e.role}</div>
    <div class="card-title">${e.title}</div>
    <div class="card-desc">${e.desc}</div>
    <div class="tags-row">${e.tags.map(e=>`<span class="card-tag">${e}</span>`).join(``)}</div>
    <div class="card-links">${t.join(``)}</div>
  `,n}function d(e){let t=[];e.repo&&t.push(`<a href="${e.repo}" target="_blank" class="be-link">REPO</a>`),e.liveUrl?t.push(`<a href="${e.liveUrl}" target="_blank" class="be-link">LIVE</a>`):e.driveId&&t.push(`<a href="https://drive.google.com/file/d/${e.driveId}/view" target="_blank" class="be-link">DEMO</a>`);let n=document.createElement(`div`);return n.className=`card-be`,n.innerHTML=`
    <div class="be-status">STATUS: DEPLOYED · ${e.year}</div>
    <div class="be-title">${e.title.replace(`🏆`,``)}</div>
    <div class="be-desc">${e.desc}</div>
    <div class="be-tags">${e.tags.map(e=>`<span class="be-tag">${e}</span>`).join(``)}</div>
    <div class="be-links">${t.join(``)}</div>
  `,n}function f(e){let t=[];e.liveUrl&&t.push(`<a href="${e.liveUrl}" target="_blank" class="fs-link fs-link-pri">↗ Live</a>`),e.repo&&t.push(`<a href="${e.repo}" target="_blank" class="fs-link fs-link-out">⬡ Repo</a>`);let n=``;n=e.driveId?`
      <div class="card-fs-body">
        <div class="embed-wrap" id="wrap-${e.id}">
          <div class="embed-placeholder" id="ph-${e.id}">
            <button class="play-btn" onclick="loadVideo('${e.id}','${e.driveId}')" aria-label="Play demo video">▶</button>
            <div class="embed-label">Click to play demo</div>
          </div>
        </div>
      </div>`:e.liveUrl?`
      <div class="card-fs-body">
        <div class="embed-wrap">
          <div class="embed-placeholder">
            <button class="play-btn" onclick="window.open('${e.liveUrl}','_blank')" aria-label="Open project">↗</button>
            <div class="embed-label">Open in new tab</div>
          </div>
        </div>
      </div>`:`
      <div class="card-fs-body">
        <div class="embed-wrap">
          <div class="embed-placeholder">
            <button class="play-btn" onclick="window.open('${e.repo}','_blank')" aria-label="View repo">⬡</button>
            <div class="embed-label">View repository</div>
          </div>
        </div>
      </div>`;let r=document.createElement(`div`);return r.className=`card-fs`,r.innerHTML=`
    <div class="card-fs-header">
      <div class="card-fs-title">${e.title}</div>
      <div class="card-fs-desc">${e.desc}</div>
      <div class="fs-tags-row">${e.tags.map(e=>`<span class="fs-tag">${e}</span>`).join(``)}</div>
    </div>
    ${n}
    <div class="card-fs-footer">${t.join(``)}</div>
  `,r}function p(){let t=document.getElementById(`projectsGrid`);if(!t)return;t.innerHTML=``;let n=window.PROJECTS||[],r={frontend:u,backend:d,fullstack:f}[e];n.forEach(e=>t.appendChild(r(e)))}function m(){let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`revealed`)})},{threshold:.1});document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t))}document.addEventListener(`DOMContentLoaded`,()=>{n(),p(),c(),m()});
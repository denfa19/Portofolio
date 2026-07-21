// Renders the public portfolio page from content.json.
// Cache-bust so edits saved via the admin panel show up immediately.
const DATA_URL = 'content.json?t=' + Date.now();

function esc(str){
  const d = document.createElement('div');
  d.textContent = str == null ? '' : String(str);
  return d.innerHTML;
}

function laddderSVG(label){
  return `<svg viewBox="0 0 900 34"><g class="rail"><line x1="20" y1="4" x2="20" y2="30"/><line x1="880" y1="4" x2="880" y2="30"/></g>
  <g class="rung">
    <line x1="20" y1="17" x2="880" y2="17"/>
    <line x1="120" y1="10" x2="120" y2="24"/><line x1="240" y1="10" x2="240" y2="24"/>
    <line x1="360" y1="10" x2="360" y2="24"/><line x1="480" y1="10" x2="480" y2="24"/>
    <line x1="600" y1="10" x2="600" y2="24"/><line x1="720" y1="10" x2="720" y2="24"/>
  </g>
  <text class="label" x="20" y="12">${esc(label)}</text>
  </svg>`;
}

function render(data){
  const p = data.profile || {};
  document.title = `${p.name || 'Portfolio'} — ${p.title || ''}`;

  // header / nameplate
  document.getElementById('header-slot').innerHTML = `
    <div class="plate nameplate reveal">
      <span class="rm-bl"></span><span class="rm-br"></span>
      <div class="nameplate-top">
        <div>
          <h1>${esc(p.name)}</h1>
          <span class="role-tag">${esc(p.title)}</span>
        </div>
        <div class="plate-id mono">
          UNIT&nbsp;PLATE&nbsp;NO. <span class="id-val">${esc(p.plateNo)}</span><br>
          ${esc(p.rev)}
        </div>
      </div>
      <div class="spec-fields">
        <div class="spec-field"><div class="k">Domicile</div><div class="v">${esc(p.domicile)}</div></div>
        <div class="spec-field"><div class="k">Status</div><div class="v">${esc(p.status)}</div></div>
        <div class="spec-field"><div class="k">Phone</div><div class="v"><a href="tel:${esc(p.phoneHref)}">${esc(p.phoneDisplay)}</a></div></div>
        <div class="spec-field"><div class="k">Email</div><div class="v"><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></div></div>
        <div class="spec-field"><div class="k">LinkedIn</div><div class="v"><a href="${esc(p.linkedinUrl)}" target="_blank" rel="noopener">${esc(p.linkedinDisplay)}</a></div></div>
      </div>
    </div>`;

  // hero chart
  const pts = (data.hero && data.hero.points) || [];
  const slotX = [150, 380, 560, 780];
  const slotY = [235, 150, 95, 80];
  let polyPoints = '', ptMarkup = '';
  pts.slice(0,4).forEach((pt, i) => {
    const x = slotX[i], y = slotY[i];
    polyPoints += `${x},${y} `;
    ptMarkup += `
      <g>
        <circle class="trace-pt" cx="${x}" cy="${y}" r="6"></circle>
        <text class="pt-metric" x="${x}" y="${y-20}" text-anchor="middle">${esc(pt.metric)}</text>
        <text class="pt-label" x="${x}" y="292" text-anchor="middle">${esc(pt.label)}</text>
        <text class="axis-label" x="${x}" y="308" text-anchor="middle">${esc(pt.year)}</text>
      </g>`;
  });
  document.getElementById('hero-slot').innerHTML = `
    <div class="section-head reveal">
      <span class="idx">01</span><h2>Process Capability — Career Trace</h2><span class="rule"></span>
    </div>
    <p class="chart-intro reveal">${esc(data.hero && data.hero.intro)}</p>
    <div class="plate chart-box reveal">
      <span class="rm-bl"></span><span class="rm-br"></span>
      <svg viewBox="0 0 900 340" id="chart-svg" role="img" aria-label="Control chart of career improvement metrics, all within spec limits.">
        <g stroke="#d7d5c8" stroke-width="1">
          <line x1="70" y1="40" x2="70" y2="270"/>
          <line x1="70" y1="270" x2="860" y2="270"/>
        </g>
        <line class="limit-line" x1="70" y1="70" x2="860" y2="70"/>
        <text class="limit-label" x="800" y="63">UCL</text>
        <line class="limit-line" x1="70" y1="250" x2="860" y2="250"/>
        <text class="limit-label" x="800" y="264">LCL</text>
        <line x1="70" y1="160" x2="860" y2="160" stroke="#767d87" stroke-width="1" stroke-dasharray="2 4"/>
        <polyline class="trace-line" id="trace-poly" points="${polyPoints.trim()}"></polyline>
        ${ptMarkup}
        <text class="axis-label" x="12" y="45">&#916; IMPROVEMENT</text>
      </svg>
    </div>`;

  // experience
  const exp = data.experience || [];
  document.getElementById('experience-slot').innerHTML = `
    <div class="section-head reveal"><span class="idx">02</span><h2>Work History</h2><span class="rule"></span></div>
    <div class="plate reveal" style="padding:8px 28px;">
      <span class="rm-bl"></span><span class="rm-br"></span>
      ${exp.map(e => `
        <div class="station">
          <div class="when">${esc(e.when)}</div>
          <div>
            <p class="co">${esc(e.company)}</p>
            <p class="loc">${esc(e.location)}</p>
            <span class="role">${esc(e.role)}</span>
            <ul>${(e.bullets||[]).map(b => `<li>${esc(b)}</li>`).join('')}</ul>
          </div>
        </div>`).join('')}
    </div>`;

  // skills
  const bins = data.skillBins || [];
  document.getElementById('skills-slot').innerHTML = `
    <div class="section-head reveal"><span class="idx">03</span><h2>Toolboard</h2><span class="rule"></span></div>
    <div class="toolboard reveal">
      ${bins.map(b => `
        <div class="bin">
          <div class="bin-head"><h3>${esc(b.title)}</h3><span class="no">${esc(b.no)}</span></div>
          <div class="chips">${(b.chips||[]).map(c => `<span class="chip">${esc(c)}</span>`).join('')}</div>
        </div>`).join('')}
    </div>`;

  // education + certifications
  const edu = data.education || [];
  const certs = data.certifications || [];
  document.getElementById('education-slot').innerHTML = `
    <div class="section-head reveal"><span class="idx">04</span><h2>Education &amp; Credentials</h2><span class="rule"></span></div>
    <div class="two-col">
      <div class="plate reveal" style="padding:20px 24px;">
        <span class="rm-bl"></span><span class="rm-br"></span>
        ${edu.map(e => `
          <div class="edu-card">
            <div class="school">${esc(e.school)}</div>
            <div class="deg">${esc(e.deg)}</div>
            <div class="meta">${esc(e.meta)}</div>
          </div>`).join('')}
      </div>
      <div class="plate reveal" style="padding:20px 24px;">
        <span class="rm-bl"></span><span class="rm-br"></span>
        ${certs.map(c => `
          <div class="cred">
            <a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title)}</a>
            <span class="date">${esc(c.date)}</span>
          </div>`).join('')}
      </div>
    </div>`;

  // projects
  const projs = data.projects || [];
  document.getElementById('projects-slot').innerHTML = `
    <div class="section-head reveal"><span class="idx">05</span><h2>Project Travelers</h2><span class="rule"></span></div>
    <div class="travelers">
      ${projs.map(pr => `
        <div class="traveler reveal">
          <span class="wo">${esc(pr.code)}</span>
          <h3>${esc(pr.title)}</h3>
          <div class="dates">${esc(pr.dates)}</div>
          <ul>${(pr.bullets||[]).map(b => `<li>${esc(b)}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>`;

  // achievements
  const ach = data.achievements || [];
  document.getElementById('achievements-slot').innerHTML = `
    <div class="section-head reveal"><span class="idx">06</span><h2>Organization &amp; Competition Record</h2><span class="rule"></span></div>
    <div class="plate reveal" style="padding:6px 24px;">
      <span class="rm-bl"></span><span class="rm-br"></span>
      <ul class="ach-list">
        ${ach.map(a => `<li><span class="tag">${esc(a.tag)}</span>${esc(a.text)}</li>`).join('')}
      </ul>
    </div>`;

  // footer
  const f = data.footer || {};
  document.getElementById('footer-slot').innerHTML = `
    <div class="wrap">
      <div>
        <h2>${esc(f.tagline)}</h2>
        <div class="contact-line">
          <a href="mailto:${esc(p.email)}">${esc(p.email)}</a> ·
          <a href="tel:${esc(p.phoneHref)}">${esc(p.phoneDisplay)}</a> ·
          <a href="${esc(p.linkedinUrl)}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
      <div class="plate-foot">${esc(p.name)} · ${esc(f.plateFoot)}</div>
    </div>`;

  // ladder dividers
  document.getElementById('ladder-1').innerHTML = laddderSVG('RUNG 02 — WORK HISTORY');
  document.getElementById('ladder-2').innerHTML = laddderSVG('RUNG 03 — TOOLBOARD');
  document.getElementById('ladder-3').innerHTML = laddderSVG('RUNG 04 — PROJECT TRAVELERS');

  // reveal-on-scroll
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
  }, {threshold:0.12});
  els.forEach(el=>io.observe(el));

  const poly = document.getElementById('trace-poly');
  if(poly){
    const len = poly.getTotalLength();
    poly.style.strokeDasharray = len;
    poly.style.strokeDashoffset = len;
    const heroObs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          poly.style.transition = 'stroke-dashoffset 1.4s ease';
          poly.style.strokeDashoffset = 0;
          heroObs.disconnect();
        }
      });
    }, {threshold:0.3});
    heroObs.observe(document.getElementById('hero-slot'));
  }
}

fetch(DATA_URL)
  .then(r => r.json())
  .then(render)
  .catch(err => {
    document.getElementById('header-slot').innerHTML =
      `<p style="padding:40px; color:#B0472B;">Could not load content.json — ${esc(err.message)}</p>`;
  });

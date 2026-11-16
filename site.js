/* ── Shared behaviour for every page ──
   theme toggle · mobile nav · scroll reveal · project cards · mailto form
   (The <html data-theme> attribute is set earlier by the inline snippet in <head>
   so there is no flash of the wrong theme; this file only wires the controls.) */
(function () {
  'use strict';

  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  /* ── Theme ── */
  function currentTheme() {
    return root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light');
  }
  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) { try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ } }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f0f0e' : '#faf9f7');
    document.querySelectorAll('.theme-toggle').forEach(b => {
      b.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  applyTheme(currentTheme(), false);
  mq.addEventListener('change', e => {
    let saved = null; try { saved = localStorage.getItem('theme'); } catch (err) {}
    if (!saved) applyTheme(e.matches ? 'dark' : 'light', false);
  });
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true));
  });

  /* ── Mobile nav ── */
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  if (nav && burger) {
    const setOpen = open => {
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  /* ── Scroll reveal ── */
  const pending = new Set();
  const show = el => { el.classList.add('visible'); pending.delete(el); };
  // Reveal anything at or above the viewport's lower edge. Handles fast scrolls that jump
  // past an element between frames, which an IntersectionObserver alone can miss.
  const sweep = () => {
    if (!pending.size) return;
    const limit = window.innerHeight + 60;
    pending.forEach(el => { if (el.getBoundingClientRect().top < limit) show(el); });
  };
  const io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } }),
        { threshold: 0.05, rootMargin: '0px 0px 60px 0px' })
    : null;
  const reveal = () => {
    document.querySelectorAll('.fade-up:not(.visible)').forEach(el => { pending.add(el); if (io) io.observe(el); });
    if (!io) pending.forEach(show); else sweep();
  };
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep, { passive: true });
  window.addEventListener('load', sweep);
  reveal();

  /* ── Helpers shared by pages ── */
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const GH_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.337-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>';

  const isUrl = u => typeof u === 'string' && /^https?:\/\//.test(u);

  /** Build a project card element. opts.featured → larger card, opts.clamp → clamp text with "Read more". */
  function projectCard(p, opts) {
    opts = opts || {};
    const card = document.createElement('article');
    card.className = 'project-card' + (opts.featured ? ' featured' : '');
    card.dataset.category = p.category || 'Other';
    const tech = (p.tags || []).slice(0, 4).map(t => window.techIcon ? window.techIcon.html(t, 22) : '').join('')
      + ((p.tags || []).length > 4 ? `<span class="project-card-tech-more">+${p.tags.length - 4}</span>` : '');
    const highlights = (p.highlights || []).map(h => `<span class="hl">${esc(h)}</span>`).join('');
    const clamp = opts.clamp !== false;
    const repo = isUrl(p.github) ? p.github : (isUrl(p.link) ? p.link : null);
    const footerRight = repo
      ? `<a href="${esc(repo)}" target="_blank" rel="noopener" class="btn-github">${GH_ICON} GitHub</a>`
      : `<span class="badge-muted" title="Built as part of coursework at Trinity College Dublin">${esc(p.context || 'Coursework · TCD')}</span>`;
    card.innerHTML = `
      <div class="project-card-head">
        <div class="project-card-tech">${tech}</div>
        <span class="project-card-cat">${esc(p.category || '')}</span>
      </div>
      <h3 class="project-card-title">${esc(p.title)}</h3>
      ${highlights ? `<div class="project-highlights">${highlights}</div>` : ''}
      <p class="project-card-desc${clamp ? ' clamp' : ''}">${esc(p.description)}</p>
      ${clamp ? '<button type="button" class="project-more" aria-expanded="false">Read more</button>' : ''}
      <div class="project-card-tags">${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="project-card-footer">
        <span class="project-card-date">${esc(p.date || '')}</span>
        ${footerRight}
      </div>`;
    const more = card.querySelector('.project-more');
    if (more) {
      const desc = card.querySelector('.project-card-desc');
      // hide the button if the text is not actually clamped
      requestAnimationFrame(() => { if (desc.scrollHeight <= desc.clientHeight + 2) more.remove(); });
      more.addEventListener('click', () => {
        const open = desc.classList.toggle('clamp') === false;
        more.textContent = open ? 'Show less' : 'Read more';
        more.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    return card;
  }

  /** Contact form → opens the visitor's mail client with the message pre-filled. */
  function mailtoForm(form, to) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const msg = form.querySelector('[name="message"]').value.trim();
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { const t = btn.textContent; btn.textContent = 'Opening your mail app…'; setTimeout(() => btn.textContent = t, 2500); }
    });
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /** Skills, grouped. Edit here to update both the home page and about.html. */
  const SKILLS = [
    { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'SQL', 'C'] },
    { label: 'AI & Machine Learning', items: ['PyTorch', 'Transformers', 'scikit-learn', 'spaCy', 'NumPy', 'NLP', 'LLMs', 'LLM Agents', 'Reinforcement Learning'] },
    { label: 'Backend & Web', items: ['React', 'Node.js', 'Spring Boot', 'FastAPI', 'Express.js', 'REST APIs'] },
    { label: 'Data, Cloud & Tooling', items: ['PostgreSQL', 'MongoDB', 'Kafka', 'AWS', 'GCP', 'Azure', 'Git', 'Selenium', 'Postman'] },
    { label: 'Specialisations', items: ['Knowledge Graphs', 'SPARQL', 'Information Retrieval', 'Recommendation Systems', 'Multi-Agent Systems'] }
  ];
  function renderSkills(container) {
    container.innerHTML = SKILLS.map(g => `
      <div class="skills-group">
        <div class="skills-group-label">${esc(g.label)}</div>
        <div class="skills-grid">${g.items.map(s => `<span class="skill-chip">${window.techIcon ? window.techIcon.html(s, 16) : ''}${esc(s)}</span>`).join('')}</div>
      </div>`).join('');
    container.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });
  }

  window.site = { projectCard, mailtoForm, reveal, esc, isUrl, fmtDate, renderSkills, SKILLS, GH_ICON };
})();

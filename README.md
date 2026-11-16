# Portfolio — Bhathrinaathan

> Personal portfolio of **Bhathrinaathan Muthuramalingam Bhanumathi** — MSc Computer Science (Intelligent Systems), Trinity College Dublin (completed September 2026).

🔗 **Live site:** [bhathrinaathan.github.io](https://bhathrinaathan.github.io)

---

## ✨ About

A minimalist, JSON-driven portfolio site built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Designed to be lightweight, fast, and easy to maintain: all project, certification, and blog content lives in JSON files, so adding new entries doesn't require touching any HTML.

## 🎨 Features

- **Dark & light mode** — follows the OS preference, with a toggle in the nav that remembers the choice (no flash on load)
- **Terminal hero** — a typed `profile.json` panel next to the intro, plus a proof strip of headline metrics
- **Featured projects** on the home page with metric chips; full grid with category filters on `projects.html`
- **JSON-driven content** — update entries without editing HTML
- **Responsive** — mobile menu, fluid type, no horizontal scroll at 375px
- **Accessible** — keyboard focus rings, `aria-*` on controls, `prefers-reduced-motion` respected
- **Fast** — 35 KB WebP profile photo (down from 5 MB), preconnected fonts, no framework
- **SEO** — Open Graph image, canonical URLs, JSON-LD Person schema, `robots.txt`, `sitemap.xml`
- **Contact form** that opens a pre-filled email draft (no backend, nothing stored)

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 with custom properties + flex/grid |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Space Grotesk + DM Sans + JetBrains Mono (Google Fonts) |
| Hosting | GitHub Pages |

No frameworks. No build tools. Just the web platform.

## 📂 Project Structure

```
portfolio/
├── index.html             # Homepage with all sections
├── projects.html          # Full projects grid
├── about.html             # Detailed about page
├── experience.html        # Career timeline
├── blog.html              # Blog listing
├── contact.html           # Contact page
├── styles.css             # Design system: light/dark tokens + all components
├── site.js                # Theme toggle, mobile nav, project cards, skills list, mailto form
├── tech-icons.js          # Tag → icon lookup (Simple Icons CDN + custom SVGs)
├── projects.json          # ← Edit to add projects
├── certifications.json    # ← Edit to add certifications
├── blogs.json             # ← Edit to add blog posts
├── robots.txt / sitemap.xml
└── assets/
    ├── Bhathrinaathan-Resume.pdf
    ├── profile.webp / profile-800.jpg
    └── og-image.png       # Social share card
```

## ✏️ Adding Content

### New project

Append an entry to **`projects.json`**:

```json
{
  "id": "project-new",
  "title": "Project Name",
  "description": "What the problem was, what you built, and what it scored.",
  "tags": ["Python", "PyTorch"],
  "category": "AI / ML",
  "featured": false,
  "highlights": ["0.91 F1", "12k samples"],
  "context": "Coursework · TCD",
  "image": null,
  "link": "https://github.com/Bhathrinaathan/repo",
  "github": "https://github.com/Bhathrinaathan/repo",
  "date": "May 2026"
}
```

- `category` drives the filter pills on `projects.html` (`AI / ML`, `Agents & RL`, `Data & IR`, `Software`, or add your own).
- `featured: true` puts the project in the home-page grid (first four featured entries are shown).
- `highlights` are short metric chips shown above the description. Keep them to real numbers.
- The GitHub button appears automatically when `github` is a real URL (not `"#"`); otherwise the `context` label is shown.
- Skills live in the `SKILLS` array at the bottom of `site.js` and render on both the home page and `about.html`.

### New certification

Append to **`certifications.json`**:

```json
{
  "id": "cert-new",
  "title": "Certification Name",
  "issuer": "Issuer",
  "date": "2026",
  "description": "What the certification covers.",
  "tags": ["AI", "Cloud"],
  "link": "#"
}
```

### New blog post

Append to **`blogs.json`**. Posts whose `link` is not a real URL are treated as drafts and hidden; the Writing section on the home page only appears once at least one post is published.

```json
{
  "id": "blog-new",
  "title": "Post Title",
  "summary": "Short preview text.",
  "date": "2026-05-15",
  "tags": ["AI", "Tutorial"],
  "link": "https://your-post-url"
}
```

## 🚀 Running Locally

Because the site fetches JSON files, opening `index.html` directly with `file://` won't work — use a local server:

```bash
# Python 3
python3 -m http.server 8000

# or Node.js
npx serve
```

Then open `http://localhost:8000`.

## 🌐 Deployment

The site is deployed via **GitHub Pages** from the `main` branch. Any push to `main` auto-rebuilds the live site within ~1 minute.

```bash
git add .
git commit -m "Add new project"
git push
```

## 📬 Contact

- **Email** — [bhathrinaathan@gmail.com](mailto:bhathrinaathan@gmail.com)
- **LinkedIn** — [bhathrinaathan](https://linkedin.com/in/bhathrinaathan)
- **GitHub** — [@Bhathrinaathan](https://github.com/Bhathrinaathan)
- **Location** — Dublin, Ireland

---

<sub>© 2026 Bhathrinaathan. Built with HTML, CSS, and a lot of curiosity.</sub>

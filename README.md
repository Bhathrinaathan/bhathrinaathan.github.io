# Portfolio — Bhathrinaathan

> Personal portfolio of **Bhathrinaathan Muthuramalingam Bhanumathi** — MSc Computer Science (Intelligent Systems) at Trinity College Dublin.

🔗 **Live site:** [bhathrinaathan.github.io](https://bhathrinaathan.github.io)

---

## ✨ About

A minimalist, JSON-driven portfolio site built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Designed to be lightweight, fast, and easy to maintain: all project, certification, and blog content lives in JSON files, so adding new entries doesn't require touching any HTML.

## 🎨 Features

- **Single-page experience** with smooth scroll navigation and live scroll-spy
- **Animated tagline** that cycles through roles (AI Engineer, Software Developer, MSc Student, AI Enthusiast)
- **Horizontally scrollable cards** for projects, certifications, and blog posts
- **JSON-driven content** — update entries without editing HTML
- **Responsive design** that adapts cleanly to mobile and desktop
- **Floating geometric illustrations** in the hero section
- **Contact form** + direct social links (GitHub, LinkedIn, Email)
- **Resume download** built in

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 with custom properties + flex/grid |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | Space Grotesk + DM Sans (Google Fonts) |
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
├── styles.css             # Shared design system
├── projects.json          # ← Edit to add projects
├── certifications.json    # ← Edit to add certifications
├── blogs.json             # ← Edit to add blog posts
└── assets/
    ├── Bhathrinaathan-Resume.pdf
    └── profile.jpg
```

## ✏️ Adding Content

### New project

Append an entry to **`projects.json`**:

```json
{
  "id": "project-new",
  "title": "Project Name",
  "description": "Short 1–2 sentence summary.",
  "tags": ["Python", "PyTorch"],
  "image": null,
  "link": "https://github.com/Bhathrinaathan/repo",
  "github": "https://github.com/Bhathrinaathan/repo",
  "date": "May 2026"
}
```

The GitHub button appears automatically when `github` is a real URL (not `"#"`).

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

Append to **`blogs.json`**:

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

- **Email** — [muthurab@tcd.ie](mailto:muthurab@tcd.ie)
- **LinkedIn** — [bhathrinaathan-muthuramalingam](https://linkedin.com/in/bhathrinaathan-muthuramalingam)
- **GitHub** — [@Bhathrinaathan](https://github.com/Bhathrinaathan)
- **Location** — Dublin, Ireland

---

<sub>© 2026 Bhathrinaathan. Built with HTML, CSS, and a lot of curiosity.</sub>

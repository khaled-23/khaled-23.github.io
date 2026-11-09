# Khaled Alkuhaily — Portfolio

**Live site:** https://khaled-23.github.io

## About

Personal portfolio of Khaled Alkuhaily, a Unity developer focused on gameplay programming, with backend experience in Java, Spring Boot and MySQL. The site presents my game projects, skills and contact details.

## Built with

- Angular 22 (standalone components, signals, new control flow)
- TypeScript
- HTML
- CSS (no UI framework)

## Features

- Responsive design for desktop, tablet and mobile, with a sticky frosted header
- Work page with filters (Unity, Unreal Engine, web and backend) that stay selected when you come back
- Project pages at `/projects/:id` with previous/next links, **←/→ keyboard navigation** and a "Copy link" button
- Contact page with a validated form that opens the visitor's email app, a live character count,
  an auto-saved draft and a <kbd>Ctrl</kbd> + <kbd>Enter</kbd> shortcut
- One-click "Copy email" buttons and a back-to-top button
- Smooth page transitions (View Transitions API) and sections that fade in as you scroll
- Friendly 404 page for unknown URLs
- Lazy-loaded pages that preload in the background, per-page titles and meta descriptions
- Print-friendly styles
- Accessible: semantic HTML, skip link, visible keyboard focus, reduced-motion support

## Getting started

Requirements: Node.js 24 (LTS) and npm.

```bash
npm install
npm start
```

Then open http://localhost:4200.

To create a production build:

```bash
npm run build
```

The output is written to `dist/khaled-alkuhaily-portfolio/browser`.

## Project structure

```
src/
├── index.html                 Page shell, meta tags, font
├── styles.css                 Design tokens and shared styles
└── app/
    ├── app.ts / app.html      App shell: navbar, <router-outlet>, footer
    ├── app.routes.ts          URL → page mapping (lazy-loaded)
    ├── app.config.ts          Router setup
    ├── layout/                Navbar and footer
    ├── pages/                 One component per URL
    │   ├── home/
    │   ├── about/
    │   ├── projects/
    │   ├── project-details/
    │   └── contact/
    ├── components/            Reusable building blocks
    ├── models/                TypeScript interfaces (Project, SkillGroup…)
    ├── data/                  Site content: profile and projects
    └── services/              ProjectService, SEO title strategy
public/
├── favicon.svg
└── images/projects/<project-id>/   Project covers and screenshots
```

## Editing content

- **Name, email, links, skills:** `src/app/data/profile.data.ts`. Links left empty (`''`) are hidden automatically.
- **Projects:** `src/app/data/projects.data.ts`
- **Images:** put files in `public/images/projects/<project-id>/`, then set `cover` and `screenshots` on the project, for example `cover: 'images/projects/yourfarm/cover.jpg'` (the main image) and `screenshots: ['images/projects/yourfarm/screenshot-1.jpg']` (the sub images). Use 16:9 images around 1600×900, saved as `.jpg` or `.webp`. While `ng serve` is running, empty dashed slots on each project page show where sub images go; they never appear on the live site.

## Author

**Khaled Alkuhaily**

- Email: khaledalkuhaily@gmail.com
- GitHub: https://github.com/khaled-23
- LinkedIn: https://www.linkedin.com/in/khaled-alkuhaily/
- Portfolio: _add link_

## Deployment

The site is published to GitHub Pages by `.github/workflows/deploy.yml`. Every push to `main` builds the app and publishes it; nothing else is needed.

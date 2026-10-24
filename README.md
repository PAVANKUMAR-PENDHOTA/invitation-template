# Profile Page

A polished, invitation-style personal profile website built with React, Vite, and Material UI. It is designed to feel modern and personal, with animated sections, a custom gallery, editable profile data, and music-driven presentation.

## Overview

This project is intended as a portfolio/profile landing page that can be customized for a person, couple, brand, or creative business. It includes:

- Opening cover section with a floral animation and action button
- Background audio toggle with floating controls
- Profile summary with biography, skills, and stats
- Gallery and image carousel using Swiper
- Social links and contact actions
- Editable profile form for live customization
- Smooth scrolling and motion-based reveal effects
- Responsive layout for desktop and mobile screens

## Tech Stack

- React 18
- Vite
- Material UI
- Framer Motion
- Swiper

## Prerequisites

- Node.js 18 or newer
- npm

## Getting Started

Use Node.js 18 or newer. Install the locked dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

The app will typically run at:

```text
http://localhost:5173
```

Create and preview the production build:

```bash
npm run build
npm run preview
```

Vite writes the production-ready static site to `dist/`.

## Deploying to Vercel

1. Import this repository in Vercel and keep the detected Vite framework preset.
2. Use `npm ci` as the install command and `npm run build` as the build command.
3. Set the output directory to `dist`, then deploy.

No server-side runtime or environment variables are required for the current frontend. Guestbook entries and RSVP drafts are stored in each visitor's browser; they are not shared with other visitors or devices. The background music is served from an external audio host and requires an internet connection.

## Project Structure

```text
profile-page/
├── public/
│   ├── audio/
│   └── images/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── App.jsx
│   ├── index.css
│   └── theme.js
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── package-lock.json
```

## Customization

Key customization points:

| Area | File |
|------|------|
| Profile text, social links, stats | `src/data/defaultProfile.js` |
| Theme colors, fonts, and palette | `src/theme.js` |
| Cover content and opening layout | `src/components/Cover.jsx` |
| Global styles and responsive rules | `src/index.css` |
| Audio source | `public/audio/` or `src/App.jsx` |
| Gallery/portrait assets | `public/images/` |

You can also update profile content from the built-in Edit Profile form, which stores changes in `localStorage` for quick personalization.

## Notes for Future Reference

- The app is intentionally built as a front-end-only experience; no backend is required for core usage.
- If you replace or add media assets, keep filenames consistent with the existing references in the code.
- Production build output is generated into the `dist/` folder by Vite.
- For deployment, the project can be hosted on static hosting providers such as Vercel, Netlify, or GitHub Pages.

## License

This project is for personal or demo use unless otherwise specified by the project owner.

# LiveCV website

A responsive, buildless HTML/CSS/JavaScript marketing site for LiveCV: a home page plus Features, Pricing, About Us, Contact, For Institutions and Look up a CVID. Everything in `dist/` is served as-is; there is no build step.

Live preview: https://gireeshkumarreddy.github.io/Livecv/ (deployed by GitHub Pages on every push to `main`, see `.github/workflows/pages.yml`).

## Pages

- `dist/index.html`: home page. Logo intro, hero, the 30-second launch video, what LiveCV is (GID and CVIDs), PDF vs. LiveCV, how to start, what you get, example profiles, sharing, who it's for, FAQ.
- `dist/features.html`, `dist/pricing.html`, `dist/about.html`, `dist/contact.html`, `dist/for-institutions.html`, `dist/cvid.html`: inner pages with content from livecv.dev, in the same design.

## Code

- `styles.css`: layout, type (DM Sans), header, footer and home page sections.
- `motion.css` / `motion.js`: scroll reveals, word-by-word headings, the growing 16:9 video, the blue color switch and pointer effects.
- `intro.css` / `intro.js`: home page intro (resumes fly into the CV mark, the logo lands in the header). Skips on any click, key or scroll, and for reduced motion.
- `video-player.js`: the launch video autoplays muted on a loop when it comes into view.
- `app.js`: example profiles, dialogs, mobile menu and header state. Safe to load on every page.
- `pages.css` / `pages.js`: inner-page layouts and interactions (contact tabs, CVID lookup, placements walkthrough, consent demo).
- `profile-details.css`: example-profile dialog details.
- `assets/`: fonts, logos, the launch video and poster, and illustrative images (prompts in `docs/`).

## Product boundaries

- Create, Builder, Log in and Upload links open the official product at livecv.dev. This site has no account, payment or file-processing backend.
- The contact and demo-request forms open the visitor's email app addressed to support@livecv.work or partners@livecv.work.
- The CVID lookup opens livecv.work/id/… for GIDs and livecv.work/cv/… for CVIDs.
- Pricing shows the plans livecv.dev publishes (currently the Free plan).
- Example people, portraits, projects and dashboard data are illustrative and labelled as such.

## Run locally

Serve `dist/` with any static web server, for example `python -m http.server 8137 --directory dist`.

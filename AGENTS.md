# AGENTS.md — instructions for any agent working on this repo

This is **Vijay Ram's personal site** — a public showcase of his side projects with an
understated bio. It's a static Vite + React + TypeScript SPA deployed to GitHub Pages.
Read this before making changes. (Human contributors: this doubles as the contributor guide.)

**Live:** https://theonenonlyvj.github.io/personal-site/ · **auto-deploys** on push to `main`.

---

## What this site is (and isn't)

- **Is:** a playful project showcase + a low-key "here's who I am" bio. Vibe = "oh cool, this
  person builds fun stuff," not a sales pitch.
- **Isn't:** a résumé or a hiring page. Keep the bio understated.

## Hard rules — DO NOT VIOLATE (this repo is PUBLIC)

Everything here is world-readable. Never add:

1. **Private/personal data** — no home address, financial, health, or family-private detail.
2. **Real contact info** — no email or phone anywhere. **Contact = LinkedIn only**
   (`https://www.linkedin.com/in/ramvijay`).
3. **Employer names** or any current/past-employer-identifying detail in the bio copy.
   *(One deliberate exception already shipped: a product screenshot Vijay explicitly approved.
   Don't add more employer branding without his say-so.)*
4. **Job-seeking language** — no "open to work" / "seeking" / "available for hire" / "hire me" /
   "résumé"/"CV". The bio is a portrait, not an availability notice.
5. **Data pulled from other local folders.** Build only from what a task gives you. Do not read
   other repositories on the machine into anything shipped here.

These are enforced by a test: **`src/__tests__/stealth.test.tsx`** fails the build if any route
renders availability/job-seeking language, an email, or a phone number. Keep it green; don't
weaken it.

## Project structure

```
src/
  pages/          Home, Projects, About, Contact  (one file each)
  components/     Layout, Footer, ProjectCard, ContactForm
  data/projects.ts  the project list (single source of truth for cards)
  types.ts        the Project interface
  config.ts       CONTACT_ENDPOINT (contact-form backend URL)
  __tests__/      Vitest + Testing Library specs (incl. the privacy guardrail)
public/           static assets served as-is (screenshots/, favicon.svg, og-image.png)
apps-script/      the contact-form backend (Google Apps Script) + its setup README
index.html        <head>: title, favicon, Open Graph / Twitter link-preview tags
.github/workflows/deploy.yml   builds + publishes to GitHub Pages on push to main
```

## Commands

Default `node` on this machine is too old to run the toolchain — **prefix with the Homebrew
node path**:

```bash
PATH="/opt/homebrew/opt/node/bin:$PATH" npm install
PATH="/opt/homebrew/opt/node/bin:$PATH" npm run dev     # http://localhost:5174/
PATH="/opt/homebrew/opt/node/bin:$PATH" npm run test    # vitest run — keep ALL green
PATH="/opt/homebrew/opt/node/bin:$PATH" npm run build   # tsc + vite build
```

**Always run `npm run test` and `npm run build` before committing.** Tests assert facts, links,
and the privacy guardrail — not exact prose, so copy can be tuned freely.

## Deploy / verify loop

Push to `main` → the Actions workflow builds and publishes (~40–60s). To verify a change is
actually live: watch the workflow run **for the new commit SHA** (`gh run list` may show the
previous run right after a push — match the SHA), then curl the live URL. The app is a JS
bundle, so grep the built `assets/index-*.js`, not the HTML, to confirm shipped content.

## GitHub Pages base-path gotcha (bites everyone once)

The site is served under **`/personal-site/`**, not `/`. So:

- **Asset paths built from JS strings** (e.g. project thumbnails) must be prefixed at runtime
  with `import.meta.env.BASE_URL` — see `ProjectCard.tsx`. A root-absolute `/screenshots/x.png`
  will **404** in production.
- **`index.html` refs** (favicon, og:image) must be absolute URLs or Vite-rewritten.
- `vite.config.ts` sets `base` to `/personal-site/` for builds only (local dev stays at `/`).

## Common tasks

- **Add / edit a project card:** edit `src/data/projects.ts` (array order = display order).
  Fields are documented in `src/types.ts` (`cta`, `thumbPosition`, `thumbFit`, `secondaryLink`,
  `renamePending`, …). Drop a screenshot at `public/screenshots/<slug>.png`; a missing one falls
  back to a gradient poster.
- **Edit bio copy:** `src/pages/About.tsx` and `src/pages/Home.tsx`. Voice = plainspoken,
  specific, confident; no corporate-speak, no metric-recitation, no fabricated credentials.
- **Contact form:** `src/components/ContactForm.tsx` posts to `CONTACT_ENDPOINT` (`src/config.ts`),
  a Google Apps Script that appends each message to a private Google Sheet. Backend + setup
  instructions live in **`apps-script/README.md`**. It uses `mode: 'no-cors'` (can't read the
  response → optimistic "sent"); a hidden honeypot field drops bots.
- **Link previews (WhatsApp/iMessage/Slack):** Open Graph + Twitter tags in `index.html` +
  `public/og-image.png` (1200×630). `og:image` must be an absolute URL.

## Portfolio-wide briefs (for agents working on Vijay's OTHER apps)

- **[docs/portfolio-footer-brief.md](docs/portfolio-footer-brief.md)** — instructions to add a
  "Have Feedback? … Click here." footer (→ this site's `/contact` and home) to Vijay's other
  public apps (see-me-fly, vjaipur, war_cards, viota-if-applicable). Each app matches its **own**
  theme, not a shared style. Park-and-run: don't auto-run without Vijay's go-ahead. Note §7:
  **personal-site itself should NOT link to itself** — skip or confirm with Vijay.

## Open / known TODOs

- `public/screenshots/friend-ranker.png` is still the gradient-poster fallback.
- The `jaipur` and `iota` cards are clones of trademarked games (`renamePending: true` in the
  data) — rename before doing anything promotional.
- Optional: a custom domain.

---

*Agents with local access to Vijay's private working notes: see the gitignored
`ORIENTATION.local.md` in this folder for pointers — never copy its referenced content into
anything shipped here.*

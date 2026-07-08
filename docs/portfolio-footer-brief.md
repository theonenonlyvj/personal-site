# Brief: Add a "Feedback / other projects" footer to Vijay's apps

**For:** another agent (park-and-run; do NOT auto-run without Vijay's go-ahead).
**Author:** Claude (Mundial26 session, 2026-07-02). Reference implementation already
shipped in `mundial26` — copy the *idea*, not the exact colors.

---

## 1. Objective

Add a small footer to every public web app of Vijay's, containing two links —
**Feedback** (→ his contact page) and **Click here** (→ his bio/portfolio home).
The footer must appear on **every page/view** of each app and must **match that
app's own visual theme** (NOT Mundial26's ink+gold — that was Mundial's local
branding; each app gets its own).

## 2. The exact copy — DO NOT REWORD

Render this sentence verbatim (only the two link targets and the styling change
per app):

> Have **Feedback**? Want to see my other projects? **Click here.**

- The word **"Feedback"** is a link → `https://theonenonlyvj.github.io/personal-site/contact`
- The words **"Click here"** are a link → `https://theonenonlyvj.github.io/personal-site`
- The trailing period is **outside** the "Click here" link.
- Keep the capitalization exactly: "Have Feedback? Want to see my other projects? Click here."

Both links MUST:
- open in a new tab: `target="_blank"`
- be safe: `rel="noopener noreferrer"`
- be real, focusable `<a>` elements with visible focus states.

## 3. Which apps (verify current state before touching each)

Confirmed candidates (all `github.com/theonenonlyvj/*`, mostly Vite + React):

| App dir (`~/Cursor/…`) | Repo / deploy | Do it? |
|---|---|---|
| `flight_visualizer` | see-me-fly · GitHub Pages | **Yes** |
| `vjaipur` | vjaipur · (Jaipur card game) | **Yes** — place below the game UI, unobtrusive |
| `war_cards` | war_cards | **Yes** — same note as vjaipur |
| `viota` | viota (no Vite build detected) | **Check first** — only if it's a real web app with pages |
| `mundial26` | Mundial26 | **Skip — already done** (use as the reference) |
| `personal-site` | personal-site · GitHub Pages | **Special case — see §7** |

Before editing an app: `git -C <dir> status` must be clean; work on a branch if it
isn't the default; confirm the app is actually a **public, deployed** web app (skip
private/local-only tools). If an app isn't in the list above but is public and
deployed, apply the same treatment.

## 4. Where to put it (so it's on ALL pages)

- **Single-page apps with in-app view switching (most of these — React `useState`
  view state):** put the footer in the **app shell**, below `<main>` / the view
  switch, so it renders once regardless of the active view. In Mundial it went in
  `App.jsx` right after `</main>`.
- **Apps with real routing (react-router, multiple HTML pages, or a shared
  layout):** put it in the **shared layout/template** that wraps every route/page —
  never in a single page.
- **Games / full-viewport canvas apps (vjaipur, war_cards):** put it at the bottom
  of the document, below the play area. Keep it small and out of the way; if the
  board is fixed-height/full-screen, ensure the page can scroll to reveal the footer
  (or dock a slim footer bar). Do not overlap gameplay.

It must appear **exactly once per page**.

## 5. Match the LOCAL branding (the important part)

Do **not** paste Mundial's ink-bar + gold styling. For each app:

1. **Find the app's design language first.** Look for: a theme/tokens file
   (`tokens.css`, `theme.*`, CSS custom properties like `--bg/--fg/--accent`), a
   Tailwind config, styled-components theme, or — failing that — read the
   **header/nav** component and copy its palette + font.
2. **Reuse the app's own tokens**, not hardcoded hex where tokens exist:
   - Footer background: either match the app's header/nav treatment (a matching bar
     bookends a bold header nicely) OR a subtle top-border footer on the page bg for
     minimal apps.
   - Text: a muted variant of the app's foreground color.
   - **Links: the app's own accent/primary color**, adjusted for contrast (below).
   - Typography: the app's body font, its border-radius / spacing scale.
3. **Contrast is non-negotiable.** Link text vs the footer background must meet WCAG
   AA (**≥ 4.5:1**). Pitfall from Mundial: a light accent (gold) on a light bg
   fails — I fixed it by putting the footer on a dark bar so gold reads. So: if the
   app's accent is light, either darken it for the link or place the footer on a dark
   surface; if dark, the inverse. Verify the ratio (any contrast checker / formula),
   don't eyeball it.
4. **Center + constrain.** Centered text, `max-width` + horizontal padding, no
   horizontal overflow at 320px width. Responsive.

The goal: a visitor should feel the footer was designed *with* that app, not bolted on.

## 6. Per-app workflow

For each target app:

1. Read `README`/`package.json` for its stack, scripts, and deploy method.
2. Locate the shell/layout and the theme tokens (§5.1).
3. Add the footer markup (§2) in the shell/layout (§4), styled from the app's tokens
   (§5). Prefer a small dedicated `Footer` component + its own CSS/module if the app
   is component-based; otherwise match the app's styling convention.
4. **Add/adjust a test** (if the app has tests): assert BOTH links exist with the
   correct `href`, `target="_blank"`, `rel` containing `noopener`, and that the
   footer is present after switching views/routes (proves "all pages"). Example
   (Testing Library):
   ```js
   const fb = screen.getByRole('link', { name: /feedback/i });
   expect(fb).toHaveAttribute('href', 'https://theonenonlyvj.github.io/personal-site/contact');
   const cta = screen.getByRole('link', { name: /click here/i });
   expect(cta).toHaveAttribute('href', 'https://theonenonlyvj.github.io/personal-site');
   ```
5. Run the app's **full test suite + production build**. Both must pass.
6. **Visually verify** (render/screenshot or run it): footer on-theme, links readable
   (contrast), no layout break, no horizontal scroll on mobile widths.
7. **Commit + push** per the app's convention (most auto-deploy on push to `main` —
   GitHub Pages via Actions, or Render). Use a clear message, e.g.
   `feat(ui): add feedback/portfolio footer on every view`.
   End the commit message with the Co-Authored-By trailer if that's the house style.
8. **Verify live** after deploy (curl the deployed bundle for the footer text / the
   two hrefs, or load the page) before calling it done.

## 7. Special case — `personal-site` (the destination itself)

`personal-site` is what the links point at. Do **NOT** add a footer that links the
site to itself ("see my other projects → this same site" is nonsense, and
"Feedback → /contact" may duplicate existing nav).

Options, in order of preference:
1. **Skip it** (recommended) — a portfolio site doesn't need this footer.
2. If Vijay wants *a* footer there, adapt the copy: drop the self-referential
   "Click here → personal-site"; keep only a **Feedback → /contact** link, or link
   "other projects" to that site's own projects section/anchor.

**Do not guess — confirm with Vijay for personal-site specifically.**

## 8. Definition of done (per app)

- [ ] Footer with the exact copy (§2), on **every** page/view.
- [ ] "Feedback" → `…/personal-site/contact`; "Click here" → `…/personal-site`; both
      new-tab + `noopener`.
- [ ] Styled from the app's **own** tokens; link contrast ≥ 4.5:1; responsive, no
      mobile overflow.
- [ ] Test added/updated (if the app tests) and passing; production build passes.
- [ ] Committed, pushed, **deployed, and verified live**.
- [ ] `personal-site` handled per §7 (skipped or confirmed with Vijay).

## 9. Reference implementation (Mundial26 — adapt, don't copy the colors)

JSX (in the app shell, below `</main>`):

```jsx
<footer className="app__footer">
  <p className="app__footer-text">
    Have{' '}
    <a className="app__footer-link" href="https://theonenonlyvj.github.io/personal-site/contact"
       target="_blank" rel="noopener noreferrer">Feedback</a>? Want to see my other projects?{' '}
    <a className="app__footer-link" href="https://theonenonlyvj.github.io/personal-site"
       target="_blank" rel="noopener noreferrer">Click here</a>.
  </p>
</footer>
```

CSS (Mundial's tokens — **replace with the target app's** palette/font):

```css
.app__footer { margin-top: 40px; padding: 22px 20px 30px; background: var(--ink); text-align: center; }
.app__footer-text { margin: 0 auto; max-width: 1240px; font-family: var(--font-body); font-size: 14px; line-height: 1.5; color: #cdbf9b; }
.app__footer-link { color: var(--gold); font-weight: 800; text-decoration: none; border-bottom: 2px solid var(--gold); padding-bottom: 1px; white-space: nowrap; }
.app__footer-link:hover, .app__footer-link:focus-visible { color: var(--gold-sheen); border-bottom-color: var(--gold-sheen); outline: none; }
```

Mundial commits for reference: `c2c30df` (footer) + `03d8353` (Feedback link).

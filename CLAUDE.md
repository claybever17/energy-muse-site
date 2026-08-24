# Energy Muse rebrand — context for AI sessions

**Read `HANDOFF.md` first** — it is the full project handoff (setup, site map, design
system, asset pipelines, gotchas, backlog). This file is just the working rules.

Static prototype site, no framework. **32 live pages** — a landing, a shop with real
products throughout (`/shop/`, `/jewelry/`, `/gems/`, `/frequency/`, `/sets/`, `/systems/`),
one product template serving all 39 products (`/product/?id=`), a Learning Center with four
guides, the written pages from the copy rewrite, and three interactive tools (`/designer/`
Atelier, `/box/`, `/home/cascade/` Frequency Room).

No build step: no `package.json`, no framework, no install. Files are served as they are.

## Working rules

- Keep code readable: external assets in `assets/`, no inlining, no minified app code.
- Brand vision: **"the fanciest resort-hotel of crystals"** — quiet luxury, no promo
  noise, materials-forward. When in doubt, remove elements rather than add.
- Logo is now VECTOR (assets/img/logo.svg + mark.svg; inline sprite `#em-logo` on the
  landing). The wordmark rides `currentColor` and adapts per skin — midnight gets a dark
  nav with a light wordmark. Mark colors stay brand-fixed (teal #44b891 / swirl #e0e0e0);
  only tune them via the `--logo-*` vars. The old "never recolor" rule applied to the
  navy PNG, which other pages (gems/generator/tools) still use on ivory strips.
- "Rigorous" voice for anything about the frequency generator — precise, zero mystical
  language; the non-medical-device disclaimer stays on device/shop pages.
- Copy comes from the creative brief PDF (see HANDOFF.md → Source documents); don't
  invent new marketing copy when the brief already has approved language.
- **Never invent a product.** Every name, price and photograph must exist in Energy Muse's
  catalogue. A fabricated copper 528 generator at $219.88 reached four live surfaces before it
  was caught — see HANDOFF.md → Backlog. If you cannot find it on their store, it does not ship.
- **A dead control is worse than no control.** `<a href="#">Search</a>` sat in the nav of every
  page for months. Search now injects its own button so it cannot exist without the code behind
  it. Apply the same test to anything new.
- **A price lives in one file.** `em-catalog.js` for products, `em-frequencies.js` for the seven
  frequencies. Never copy a price into markup.
- three.js r160: `mesh.position` is read-only — `.position.set(...)` only. The shop
  uses ES modules + importmap; the generator uses the UMD build (`assets/three.min.js`).
- Desktop layout holds to 840px; phone collapse below. Keep the viewport meta on ALL pages.
- Drop-in pipelines (GLBs, thumbnails, product photos, story reels, OG cards) are
  documented in HANDOFF.md — extend those rather than inventing parallel ones.

## Deploy

Vercel **is** connected to GitHub now. Pushing to `main` deploys:

```bash
git push origin main
```

The site is public. It was behind an edge password gate during the build
(`middleware.js` + `package.json`, reading `SITE_PASSWORD`); both are removed and are in git
history if it is ever wanted again.

Never push without being asked. Clay says "push".

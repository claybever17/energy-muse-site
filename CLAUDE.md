# Energy Muse rebrand — context for AI sessions

**Read `HANDOFF.md` first** — it is the full project handoff (setup, site map, design
system, asset pipelines, gotchas, backlog). This file is just the working rules.

Static prototype site, no build step, no framework. Three pages:
`/` landing · `/generator` 3D device showcase · `/gems` shop (Stone Gallery).

## Working rules

- Keep code readable: external assets in `assets/`, no inlining, no minified app code.
- Brand vision: **"the fanciest resort-hotel of crystals"** — quiet luxury, no promo
  noise, materials-forward. When in doubt, remove elements rather than add.
- The navy logo always sits on a white/ivory strip. Never recolor the logo.
- "Rigorous" voice for anything about the frequency generator — precise, zero mystical
  language; the non-medical-device disclaimer stays on device/shop pages.
- Copy comes from the creative brief PDF (see HANDOFF.md → Source documents); don't
  invent new marketing copy when the brief already has approved language.
- three.js r160: `mesh.position` is read-only — `.position.set(...)` only. The shop
  uses ES modules + importmap; the generator uses the UMD build (`assets/three.min.js`).
- Desktop layout holds to 840px; phone collapse below. Keep the viewport meta on ALL pages.
- Drop-in pipelines (GLBs, thumbnails, product photos, story reels, OG cards) are
  documented in HANDOFF.md — extend those rather than inventing parallel ones.

## Deploy

```bash
git push origin main
vercel deploy --prod --scope claybever17s-projects
```
(Vercel Git auto-deploy not connected; CLI JSON "next" hints may require running the
suggested command twice.)

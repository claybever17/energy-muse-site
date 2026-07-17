# Energy Muse Rebrand — Project Handoff

> Give this file to any AI session or developer picking up the project cold.
> Last updated: July 2026.

## What this is

A static prototype site for the **Energy Muse rebrand** — evolving a 20+ year crystal/jewelry
brand into a guided energy-wellness ecosystem (crystals, jewelry, **frequency generators**,
personalized guidance, and the coming **Veza** app). Design goal, in the owner's words:
**"the fanciest resort-hotel of crystals"** — quiet luxury, zero promo noise, materials-forward.

- **Live:** https://energy-muse-workingfolder.vercel.app
- **Repo:** https://github.com/claybever17/energy-muse-site (private)
- **Owner:** Clay (GitHub/Vercel: `claybever17`)

## Setting up on a new machine

```bash
git clone https://github.com/claybever17/energy-muse-site.git
cd energy-muse-site
python3 -m http.server 8080        # static site, no build step — any server works
```

Deploying (after `gh auth login` / `vercel login` as claybever17):

```bash
git push origin main
vercel deploy --prod --scope claybever17s-projects
# Vercel CLI in non-interactive shells prints JSON "next" hints — run the suggested
# command; sometimes it takes two invocations (link, then promote).
```

> Vercel's Git auto-deploy IS connected (since July 2026): `git push origin main`
> auto-builds and promotes production at energy-muse-workingfolder.vercel.app.
> The CLI route above still works but is no longer required.

### Source documents (bring these!)

The creative brief and wireframes live OUTSIDE the repo on the original Mac:
- `~/Desktop/Energy Muse Creative Brief and Website Copy.pdf` — 31 pages, complete approved
  copy for every future page (homepage, quiz, intention pages, PDPs, About, FAQ, footer).
- `~/Desktop/Energy_Muse_Wireframe_Pack.pdf` — 16 pages, 14 page templates.
Copy them to the new machine; they are the source of truth for copy and IA.

## Site map

| Route | File | What it is |
|---|---|---|
| `/` | `index.html` | Landing. Wireframe-faithful homepage: lifestyle hero, intention finder, ways-to-begin, quiz feature, jewelry, founders, frequency (device render), ritual steps, Learn+Veza duo cards, 9:16 story reels, final CTA, waitlist/email, footer. Has the 3-skin theme system. |
| `/generator` | `generator/index.html` | Apple-style scroll showcase. Hand-built three.js replica of the frequency generator that floats, then opens on scroll to reveal the gold coil. 4 scroll beats; mobile-optimized. |
| `/gems` | `gems/index.html` | **The Stone Gallery** (shop). 16 real products, even 4×4 grid. Dual viewer: WebGL for 3D-scanned stones, front-facing "tilt card" for photo stones. |
| — | `home-v1.html`, `home-v2.html` | Frozen early mockups (single-file). Reference only. |

## Design system

- **Fonts (self-hosted, `assets/fonts/`):** Fraunces 300/400/600 (display serif) +
  Instrument Sans 400/500/600 (body). Never swap to CDN links.
- **Skins** (landing only, `html[data-skin]`, persisted in localStorage `em-skin`):
  - `ivory` (DEFAULT) — warm white #FBF8F2, navy ink #1D2739, copper #A9683E. The favorite.
  - `midnight` — fully dark #0E1826, copper #C4855A. Nav strip stays WHITE so the navy logo reads.
  - `sage` — pale sage #F0F3EC, teal accent #257E6F (from the logo mark), pill buttons.
- **Logo:** `assets/img/logo.png` (navy, transparent bg). ALWAYS on white/ivory surfaces —
  every nav has a white strip for this reason. Never recolor the logo (tried; rejected).
  Mark-only: `assets/img/mark.png` (used for favicon/touch icon).
- **Brand motif:** concentric copper "resonance rings" derived from the device's spiral coil.
  Derive decoration from this; don't invent new motifs.
- **Voice:** "Rigorous" register for anything about the frequency generator — precise,
  materials-forward, zero mystical language, and the **non-medical-device disclaimer must
  stay** on device/shop pages. See the creative brief for the other registers.
- **Layout rules:** desktop layout holds down to 840px (deliberate — half-screen desktop
  windows shouldn't collapse to mobile); phone collapse below that. Landing must keep the
  `<meta name="viewport">` tag (it was once missing; phones rendered desktop).

## Asset pipelines (all drop-in / auto-upgrading)

### 3D scans (GLB)
Drop `assets/gems/<slug>.glb` → the shop auto-detects it (HEAD request), the card's chip
flips to green "3D scan", and the viewer streams it (auto-centered/scaled via `fit()`).
Raw scans run 60MB+; ALWAYS optimize first:
```bash
npx @gltf-transform/cli optimize in.glb out.glb \
  --compress false --texture-compress false --texture-size 1024 \
  --simplify true --simplify-error 0.001     # → ~7-12MB, visually lossless
```
Slugs: `calm, protection, wellness` (have scans) · `spirituality, wealth, love,
fresh-start, power, trapiche, blue-agate, rose-heart, malachite, merkaba, labradorite,
blue-opal, himalayan` (awaiting scans; currently photo products).
Per-stone opening angle: `yaw`/`pitch` fields in the GEMS catalog (gems/index.html).

### Gallery thumbnails (for scanned stones)
`tools/thumbs.html` renders stones to a sprite; `?only=<slug>&yaw=N&pitch=N` renders one
stone for angle-tuning. To save renders directly to disk, run the save-server pattern:
a tiny local HTTP server accepting `PUT /save?f=<repo-path>` with a canvas dataURL body
(see git history / memory: `save_server.py`) — then in the page console:
`fetch('http://localhost:8890/save?f=assets/img/thumbs/calm.jpg',{method:'PUT',body:window.__sprite})`.

### Product photos
Shopify product images → alpha-cut via **flood-fill from borders** (keeps interior whites,
e.g. the logo's disc), trim, **+7% transparent margin** (so nothing touches tile edges),
max 900px → `assets/img/products/<slug>.png`. Scraped catalog data lives at
`energymuse.com/collections/crystals/products.json` (public Shopify endpoint; 117 products).

### Story reels (landing)
Drop `assets/video/story-1.mp4`, `story-2.mp4`, `story-3.mp4` (9:16, muted-loop-friendly)
→ placeholders auto-upgrade to playing reels (IntersectionObserver-driven).

### OG / social card
`tools/og-template.html` — `?brand=1` renders the ivory brand card (current `assets/og.jpg`);
`?clean=1` renders a device-only image (used for the landing's frequency section,
`assets/img/generator-render.jpg`).

## Known gotchas

- **three.js r160 UMD:** `mesh.position` is READ-ONLY — use `.position.set(...)`.
  `examples/js` UMD addons are gone; the shop uses ES modules + an importmap
  (`assets/three.module.min.js`, `assets/jsm/loaders/GLTFLoader.js` + its
  `assets/jsm/utils/BufferGeometryUtils.js` dependency — keep that folder layout).
- Artifacts of headless testing: `loading="lazy"` images never fetch in a hidden tab;
  requestAnimationFrame pauses in hidden tabs (tilt/3D verification needs a visible window).
- The generator page's WebGL glass: transparent-glass-over-dark-objects is a tar pit;
  the shipped design shows the coil through a genuine circular window in the lid instead.
- Landing HTML began life as a fragment; it now has doctype-less structure with meta tags
  at top — don't add `<html>/<body>` wrappers casually; test after structural edits.

## Backlog (agreed with Clay, in priority order)

1. **Trust photo galleries** — multiple real photos per stone in the shop viewer
   (candidate URLs already gathered from Shopify: up to 4 per product; AUDIT them first —
   skip the AI-generated-looking lifestyle shots, keep authentic studio/hand photos).
2. **Frequency-section render breathing room** — re-render `?clean=1` with camera pulled
   back (z≈3.6-3.7) so device corners have margin; currently slightly tight.
3. **Landing block-by-block polish** — make each section feel special without breaking
   the wireframe (hover states, ring accents, staggered reveals).
4. **The Energy Quiz** (wireframes 8-9; full copy in the brief) — the brief's #1
   conversion engine.
5. Intention pages ×5, PDP templates, Learn hub, About (all copy exists in the brief).
6. Remaining GLB scans from Clay; real store mechanics (cart → Shopify headless).
7. Rename Vercel project (`energy-muse-workingfolder` → `energy-muse-site`), custom domain,
   connect Vercel Git integration.

## Taste notes (hard-won, don't relitigate)

- No promo banners on the landing. No "SCROLL" cues. Quiet luxury.
- Photo-to-3D "slab" trick for flat product photos was tried and REJECTED ("looks like a
  coin") — GLBs or the front-facing tilt card only.
- The tilt card (photo viewer) is front-facing ONLY by design; never rotate past the face.
- Every stone card must show the stone's best face — scans have tuned yaw/pitch.
- Placeholder anything must be labeled honestly (the reels say "Film coming soon").

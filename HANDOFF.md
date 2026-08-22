# Energy Muse Rebrand — Project Handoff

> Give this file to any AI session or developer picking up the project cold.
> Last updated: August 2026. Verify against `git log` — this file describes the
> state as of the "Current" film build; trust the commits over the prose.

## What this is

A static prototype site for the **Energy Muse rebrand** — evolving a 20+ year crystal/jewelry
brand into a guided energy-wellness ecosystem (crystals, jewelry, **frequency generators**,
personalized guidance, and the coming **Veza** app). Design goal, in the owner's words:
**"the fanciest resort-hotel of crystals"** — quiet luxury, zero promo noise, materials-forward.

- **Live:** https://energy-muse-workingfolder.vercel.app
- **Repo:** https://github.com/claybever17/energy-muse-site (private)
- **Owner:** Clay (GitHub/Vercel: `claybever17`)
- Clay works across **two machines** (PC + MacBook at `~/energy-muse-workingfolder`).
  **Always `git fetch` and check `git status -sb` for "behind N" before trusting local files.**

## Setting up on a new machine

```bash
git clone https://github.com/claybever17/energy-muse-site.git
cd energy-muse-site
python3 -m http.server 8090        # static site, no build step — any server works
```

**Deploying: `git push origin main` — Vercel Git auto-deploy IS connected** and promotes
production automatically. (The CLI route `vercel deploy --prod --scope claybever17s-projects`
still works but is not needed.)

### Source documents

- **Copy source of truth:** *Website Copy - Re-write* PDFs (Mac: `~/Downloads/Website Copy - Re-write (1).pdf`,
  and `…(1) (1).pdf` which carries the stakeholder comments — real testimonials, chart to-dos,
  and a flag that copy from the quiz section onward was "not yet reviewed"). The homepage +
  intention-page copy currently live comes from this rewrite.
- Earlier creative brief + wireframe pack: Mac `~/Desktop/enrgymuse/`.
- **Skip Shirley's testimonial** (menopause/medical claims — conflicts with the non-medical mandate).

## Site map

| Route | What it is |
|---|---|
| `/` | **Classic** — the production homepage. Approved rewrite copy, logo-left nav (Start Here · Shop · By Intention · Learn), dismissible announcement bar, alternating image/text splits, **the seven generator photographs cross-fading on the Hz ticker** (the WebGL device was removed — it rendered one generic body with no notion of frequency, so it could never follow the readout), live scanned crystal, day-photo hero, `foldCut()` scroll invitation, Versions popup (bottom-right, includes the 3 color skins). |
| `/home/` | Chooser for the concept films. **Nothing links to it** — the concepts are an archive, reachable only by typing the URL. `/home/cascade/` is the exception: it is the live Frequency Room, listed in the Try-it panel. |
| `/home/current/` | **Current** — the concept film. One continuous scene; scroll scrubs the timeline: the **brand mark, drawn in copper outline and breathing, unravels into the energy line** → five intention strands → winds into the live 3D generator's coil (Hz ticker 7.83→1111) → through a duotone photo → closes into a ring around the quiz CTA, all under a **day→dusk color grade**. The mark's strokes are sampled at runtime from the real `#em-markline` geometry (`getPointAtLength`). Test hook: `window.__film.go(p)` (0..1). Static fallback for reduced-motion/no-JS. |
| `/home/cascade/` | **Cascade** — an *experiment* on Current (boss asked to try "crystals rain down as you scroll"). Canvas 2D film: **scroll is gravity** — 12 alpha-cut product stones sink snow-globe slow (position is a pure function of progress + seed: reversible, resize-safe) over a far layer of copper line-art facets. Stones pre-render at two focus tiers (far = lens blur). Each intention chapter **catches its two stones and docks them as labeled products** (real catalog names; a soft light band sweeps each stone as it settles), then the rain gathers into the same finale ring as Current (identical geometry). Grade is **paper→earth (depth, not time)**. **No hands / no stands / no baked backgrounds in stone art** — himalayan, labradorite (now the tumbled "Labradorite Stone") and rose-heart were re-cut with `rembg`; amethyst-on-stand stays out of the cast until a clean shot exists. **3D:** baked turntable sprite sheets were tried first and rejected (they ghosted/stepped between frames — Clay: "glitchy as hell"). The working answer is **live geometry**: a WebGL layer (`#live3d`) mounts `calm.glb` with an **orthographic camera in pixel space** (1 world unit = 1 CSS px), so the real scan falls, docks and turns in the same physics as the painted stones — perfectly smooth, and it loads lazily only when its chapter nears. glTF materials export with alpha blending on and read as a ghost over the paper: **force `transparent=false` on load** or the stone looks see-through. Driven via `window.__live`. Only one scan is live because the GLBs are 7–12MB each — **optimise them before adding more**. **Motion:** stones keep a slow float/tilt driven by time, not scroll, so nothing freezes when the reader stops (damped by depth; docked stones keep a gentler breath). **Chapter text:** never cross-fade the intention captions — that put two intentions on screen at once mid-transition. `capInt()` gives each chapter a clean handoff (out finishes before the next starts, with an empty beat), and the words settle up out of focus / sink away downward with the eyebrow, line and link staggered. Verified by sweeping 541 scroll positions for zero double-visibility; **re-run that check if you retime `CW`/`DW`**. Same `window.__film` hook, same fallback pattern. Not part of the official trio — listed in Versions as "experiment". |
| `/home/crystallize/` | **Crystallize** — the synthesis of Current and Cascade, and the strongest of the concepts. Not the two stacked: **one physics**. A frequency passing through a medium makes solid form precipitate out of it (which is how a crystal actually grows, and what this brand sells). The mark unravels into one line of energy → the line meets the **live 3D generator** and resonates (Hz ticker) → at the crests, stones **precipitate out of the line itself** → they fall and **settle into a bed** on the floor → five strands each shed their own intention's stones, docking as labeled products → the settled bed **lifts and closes into the ring**, with the mark seated inside it (full on mobile, a ghost on desktop so it never fights the headline). Landing is a centred title card — type first, then the mark — and it bookends the finale. Day→dusk grade. Every stone is a pure function of progress + seed, so scrubbing back **un-crystallises**. Ends in a **brand-film slot** (`assets/video/brand.mp4`), honestly labelled. **Edge rule learned here:** the strands used to stop dead at the frame and read as cropped — they now run past it *and* stroke with a gradient that goes transparent at both ends, and the bed is clamped so no stone is ever sliced by an edge. |
| `/designer/` | **Atelier** — the bracelet builder (our answer to myastris.com/designer, "way cooler"). Intention-first: five tabs of real stones, **"Compose for me"** tiles a per-intention recipe around the whole wrist, tap to add, **drag beads around the ring to reorder, fling one outward to remove**. Canvas strand on the etched true-scale ring, copper pulse travels the ring on each add (the Current energy line), live wrist math (`beads = wrist_in × 25.4 / 8mm`), in/cm toggle, energy-signature bars, and **Add to Bag via `EMBag.add()`** with a hashed design id so identical designs stack. Beads are **Python-rendered spheres** (`assets/img/beads/*.png`): an opaque texture patch is sampled from each product photo, then sphere-mapped with lambert + tight specular + copper rim — this replaced a three.js bake that rendered flat squares. Pricing is **illustrative** and labeled as such; swap in real numbers when the client supplies them. **Mobile perf (hard-won):** repainting 21 beads with `ctx.shadowBlur` every frame made phones lag. The canvas now uses a **pre-baked contact-shadow sprite**, a **dirty flag** (idle costs zero frames; animations run then return to rest), and a **1.5× backing store cap** on coarse pointers. Nothing floats over the strand on mobile — wrist and total mirror into the sizer/footer rows. **A design is a link:** the strand encodes to one-character stone codes — `/designer/?s=gghgg…&w=6.5&n=For%20Mom` — so a whole 21-stone bracelet fits in ~73 characters, restores exactly on load (order, wrist, name), and "Copy share link" also rewrites the address bar so plain copy-paste works. Test hooks: `window.__atelier` (`url()`, `paints()`, `tick()` — drive `tick()` manually when verifying, since a hidden preview pane throttles rAF and makes paint counts read as zero). |
| `/shop/` | **Shop landing.** Four doorways (arched frames, staggered, each carrying the verb that is true of it — wear it · place it · tune the room · begin with a set), eight real products wired to the bag, the five intentions, the generator on black, and the two build-your-own tools. |
| `/frequency/` | Generator shop — the seven, from `em-frequencies.js`. `/generator/` is the film; this is the shop. |
| `/jewelry/` | Eight real pieces, real prices, all linking to their product pages. |
| `/sets/` | **Kits & Sets** — seven real ritual kits and bundles from Energy Muse's own catalogue. |
| `/systems/` | **Frequency Systems** — the two Frequency Formulas (each layered clear / stabilize / direct, which is a real sequence and is set as one), the two bundles, and the copper and accessories you add to them. |
| `/product/?id=<id>` | **One product template for all 39 products**, driven by `em-catalog.js`. Large image, description, price, add-to-bag, four related. Unknown id gets a real "couldn't find that" with a way out; out-of-stock gets the unavailable state, not a dead button. |
| `/learn/` | **Learning Center** hub. Five paths, all of which now go somewhere — this section shipped once with five plain `<div>`s styled like navigation and linked to nothing. |
| `/learn/{start,crystals,frequency,jewelry}/` | The four guides. Crystals and frequency are **built from `em-catalog.js` / `em-frequencies.js`**, so a guide cannot drift out of agreement with the shop it explains. |
| `/faq/` | 25 questions in five groups with jump links. |
| `/box/` | Build a Box of Crystals. |
| `/about/`, `/craft/`, `/veza/`, `/heather/`, `/support/`, `/affiliates/`, `/intention/` | Written pages from the approved copy rewrite. The affiliate and quiz capture forms validate and confirm in the browser and are **labelled as not connected to a mailbox**. |
| `/quiz` | The Energy Quiz funnel (3 questions → intention → 3 matches → email capture stub). Unified chrome, no announcement bar (it advertises the quiz). |
| `/gems` | The Crystal Gallery shop — 16 products, WebGL viewer for the three scanned stones, tilt-card for photos. Dark theme. |
| `/generator` | Apple-style 3D scroll showcase of the device. Dark theme. |
| `/intention/{protection,abundance,calm,connection,clarity}` | Intention pages with approved rewrite heroes. **`connection` is labeled "Love"** everywhere (URL unchanged). Ladders titled "Founder favorites for …". |
| — | `home-v1.html`, `home-v2.html` — frozen early mockups; archives only (still contain old fonts/octagons — leave them). |

**Retired** (deleted in the "Narrow the lineup" commit; recoverable from git history):
`/home/editorial`, `/home/grid`, `/home/boutique`, `/home/cinematic` — four style studies
that read as "one design with minor variations" (boss feedback).

## Shared components (`assets/`)

Self-injecting scripts, all following the same pattern (inject own CSS + DOM):

- **`em-bag.js`** — localStorage cart + slide-over drawer, shared by every page. Binds any `a.bag`.
- **`em-header.js`** — unified header/footer for **inner pages** (quiz/gems/generator/intentions):
  announcement bar (skipped on `/quiz/`), logo-left nav, Bag (Search is injected by `em-search.js`), fullscreen mobile menu,
  compact footer with the non-medical disclaimer. Light/dark palette auto-picked from body
  background (dark pages get the warm-silver mark `#C6BFB2/#EFE7D9/#E0A878`).
  **Must be included BEFORE `em-bag.js`** so the injected Bag link gets bound by the cart.
  Root-absolute links → works at any depth and with Vercel's no-trailing-slash serving.
- **`em-depth.js`** — site-wide depth (brief: "the whole site feels too flat"). Injects an ambient
  overhead key + floor vignette, a three-tier **warm** elevation scale (never neutral grey — grey on
  cream reads as dirt), and contact shadows that ground cut-out product photos. **Elevation is applied
  by a JS pass that first checks the element owns an opaque background** — a shadow on a transparent
  caption draws a visible box around the words, which is exactly the bug this replaced. Included on all
  36 pages.
- **`em-versions.js`** — the floating "Versions" pill + popup (Classic / Motion / Current,
  plus Cascade labeled "experiment"). On the chooser, Current and Cascade. Classic and Motion
  have a richer inline version (includes the ivory/midnight/sage skin dots). All lists must
  stay in sync when versions change: `em-versions.js`, Classic's popup, Motion (via regen),
  `/home/` chooser.
- **`em-catalog.js`** — **the one place a product exists.** 39 products: id, name, category,
  intention, price, image, description, and where it lives. Prices used to sit in the markup of
  whichever page happened to sell the thing — jewelry in eight `data-` attributes, crystals inside
  the 3D viewer's array, kits and systems in two more inline lists. A price in four files is a price
  that will eventually disagree with itself. **Generators are NOT copied in**: they already have a
  source in `em-frequencies.js` and are folded in at load. `all()`, `get(id)`, `related(id, n)`.
- **`em-frequencies.js`** — the seven frequencies, and the only place a frequency is described.
  `EM_FREQ`, plus `EM_FREQ_BY.hz(...)`. **Load it in `<head>`**: it has been loaded below its
  inline consumers twice, and both times a grid rendered one card instead of seven.
- **`em-search.js`** — site search over the catalogue plus twenty written pages (half of what people
  search for is not a product — "sizing", "cleansing"). **It injects its own control**, so a Search
  button cannot exist unless the code behind it loaded. The nav previously carried
  `<a href="#">Search</a>` on every page for months. Neither the catalogue nor the frequencies are
  fetched until the first time someone opens search. `/` or Cmd-K opens.
- **`em-prices.js`** — holds generator prices at `$—` while they are unconfirmed. `MODE='hold'`;
  `?prices=live` to preview. The live store currently agrees with our numbers ($99.88), so this can
  be lifted whenever the client confirms.
- **`em-device.js` / `em-crystal.js`** — live 3D (device, scanned GLB crystal). ES modules via
  importmap (`three` → `assets/three.module.min.js`). **`em-device` is only used by `/generator/`
  now** — it was removed from the homepage and the Frequency Room, where it rendered one generic
  device that could never match the dial and cost 666KB of three.js to do it.
- **`middleware.js` + `package.json`** — the password gate. Edge Basic Auth on every path, reading
  `SITE_PASSWORD` from Vercel's environment. **It fails open**: with no variable set the site behaves
  normally, so deploying it cannot lock anyone out. Vercel's own Deployment Protection will not cover
  a production URL on this plan without the $150/month add-on. **Delete both files to make the site
  public at launch.**

## Fonts — the wonky-f story (important)

The original Fraunces woff2s were instanced from the variable font with the **WONK axis left at
its default of 1**, baking hooked/wonky letterforms (the weird ƒ) into the glyphs — no CSS fixes
that. Current files are re-cut static instances: **WONK=0, SOFT=0, opsz=24**, wght 300/400/600,
latin subset, ~16KB each. Recipe (fontTools + brotli, source `google/fonts` OFL Fraunces
variable TTF): `instantiateVariableFont(f, {wght:W, opsz:24, SOFT:0, WONK:0})` → subset →
woff2. Font URLs are cache-busted (`fraunces_*.woff2?v=3`) — **bump the `?v=` in all pages if
you ever re-cut**, or browsers keep serving the old glyphs.

## Design system rules (current)

- **No arched photos.** The "open door" arch treatment (`999px 999px …` radii) is retired —
  photo frames are squared with a small fixed radius, deliberately *not* the skin's `--radius`,
  because one skin uses a 999px pill and would round them right back into circles.
- **Classic carries a fine paper grain** (`body::after`, opacity .055) and photos rest on a slight
  3D tilt that squares up on hover — richness without borrowing Motion's choreography.
- **Motion's depth layer is v3:** a shared `perspective` on body, and photographs arrive from
  *behind* the page (translateZ + rotateY, blurred) rather than sliding across it.
- **The mark closes every film** — Current, Cascade and Crystallize all seat it inside the finale
  ring (full strength on mobile, a ghost on desktop so it never fights the headline).
- **No octagon buttons anywhere.** The old emerald-cut `clip-path` treatment is dead site-wide
  (including the cart's checkout button). Corner radius follows the skin (`--radius`).
- **Typographic hygiene, site-wide:** `p{text-wrap:pretty}` (no orphan words) and
  `.lead,.head p{text-wrap:balance}`. Keep this on any new page.
- **No faux italics for emphasis in UI copy** — no italic font files are loaded, so
  `font-style:italic` on Instrument/Fraunces is synthesized. For emphasis use weight-600 +
  copper (see trust-band author line). Display serif italic (hero gemwords, captions) is an
  accepted stylistic fake — don't add more.
- **foldCut()** (Classic + Motion): sizes the hero so the first fold slices the trust caption
  mid-line on every screen — the scroll invitation. It re-runs on load/fonts/resize/announcement
  dismissal. **Do not replace with fixed vh constants** — that was tried and fails per-screen.
- **Frequency must be *shown*:** the freq section's rings are wavy near-circular **SVG paths**
  (layered-sine wobble, alternating slow rotation as they expand, hairline non-scaling strokes),
  z-above the device canvas, plus a breathing copper field behind. Circles/ellipses were
  rejected; keep the organic wobble.
- **Announcement bar** is shared-dismissed via `sessionStorage['em-ann']` across all surfaces.
- The three color **skins** (ivory default / midnight / sage) exist on Classic + Motion only,
  inside the Versions popup; persisted as `localStorage['em-skin']`.
- Logo: vector sprite `#em-logo`, wordmark rides `currentColor`, mark body `--logo-body`.
  Dark surfaces use the warm-silver mark (Clay's own recolor).

## Motion — retired

`/home/motion/` no longer exists. It was a generated clone of the homepage plus a motion layer,
regenerated by a python pipeline after any change to Classic. The pipeline is unrunnable as
written — its final step extracted the motion block from `home/motion/index.html` — so the
instructions are removed rather than left to mislead. Both are recoverable from git history if
the direction is ever revived.

## Asset pipelines (unchanged, all drop-in)

- **GLB scans:** drop `assets/gems/<slug>.glb` → shop auto-detects. Optimize first:
  `npx @gltf-transform/cli optimize in.glb out.glb --compress false --texture-compress false
  --texture-size 1024 --simplify true --simplify-error 0.001` (~7–12MB). Have: calm,
  protection, wellness. Awaiting: the other 13.
- **Product photos:** flood-fill alpha-cut, +7% margin, ≤900px → `assets/img/products/<slug>.png`.
  Source: `energymuse.com/collections/crystals/products.json`.
- **Story reels:** drop `assets/video/story-{1..5}.mp4` → landing placeholders auto-upgrade
  (their HEAD probes 404 harmlessly until then — expected console noise).
- **OG cards:** `tools/og-template.html` (`?brand=1` / `?clean=1`).

## Known gotchas

- **three.js r160:** `mesh.position` read-only → `.position.set(...)`. Shop uses ES modules +
  importmap; generator uses UMD `assets/three.min.js`.
- Hidden-tab testing: `loading="lazy"` images don't fetch; rAF + IntersectionObserver throttle
  (the Current film also binds a `scroll` listener so scrubbing works regardless).
- Vercel serves paths **without trailing slashes as 200** (no redirect) — relative links break
  from `/home` vs `/home/`. Use root-absolute links in shared components (already done).
- The landing (`index.html`) is doctype-less with meta at top — don't casually wrap it.
- `em-header.js` before `em-bag.js`, always.
- **Cart ids are unified** (was: the quiz used name-derived ids while shop/intention used slugs, so
  the same stone added from two surfaces double-counted). The canonical id is the **catalog slug**,
  and `gen-<hz>` for devices; the quiz derives it from its image path via `bagId()`. Atelier is the
  one deliberate exception — a custom bracelet is a hashed design id, since two different strands
  are genuinely different products. **Any new surface must key on the slug.**
- **Horizontal overflow reads as a "spacing/box issue" on iPhone, not as a scrollbar.**
  `body{overflow-x:hidden}` contains an over-wide element in Chrome and does **not** on iOS
  Safari — Safari sizes the layout viewport to the content instead, so the whole page renders
  zoomed out with dead space down the right and the user can pinch out further. Two real causes
  found so far: `.sinemark` decorative waves at `width:210%` on the landing, and cascade's
  `.roomin .device{transform:translateX(9%)}` reveal, which overflows only *during* the
  animation — a transient overflow counts. Fix at the element's own container with
  `overflow-x:clip` (not `hidden`: clip creates no scroll container, so `position:sticky`
  survives). **Check with `document.documentElement.scrollWidth - clientWidth === 0` at 320,
  390 and 430 across every page** — iframes at a fixed width make this a one-shot sweep, and a
  page can be clean at 390 and broken at 320.

## Backlog

Most of the old backlog is done: the PDP template shipped (`/product/`), quiz bag-ids are
unified through `em-catalog.js`, the Learn hub and About pages are written, and the shop
sells real products throughout.

**Before this is handed over:**

1. **Checkout is deliberately not wired.** The bag collects real products at real prices and
   says "Checkout — coming soon". This build is a design prototype to be set up on Shopify
   later, so the handoff is the point, not a gap. 37 of the 38 catalogue products already map
   to live Shopify variant ids if a cart hand-off is ever wanted.
2. **Remove the password gate at launch** — delete `middleware.js` and `package.json`.
3. **Confirm generator pricing**, then flip `MODE` in `em-prices.js` to `'live'`. Their store
   says $99.88, which is what `em-frequencies.js` already carries.
4. **Three forms are not connected to a mailbox** — affiliate application, quiz result capture,
   Veza waitlist. All three say so on the page. Point them at the Energy Muse system.
5. **`Agate Geode Slice`** is the one catalogue item with no match in the live Shopify
   catalogue. Worth asking whether it is discontinued or named differently there.
6. Localize the remaining **Shopify CDN hotlinks** on `/gems/` via the photo pipeline.
7. Quiz deep-links / shareable results (`/quiz/?intent=…`).
8. Vercel project rename + custom domain. The project is called `energy-muse-workingfolder`,
   after the folder rather than the brand.

**A rule this project learned the hard way:** never invent a product. A copper-bodied 528
generator at $219.88, marked down from $248.88, reached `/frequency/`, `/generator/`, the
homepage and the only buy button in the Frequency Room. It does not exist — there is no copper
generator anywhere in Energy Muse's 2,722-item catalogue, and nothing of theirs costs $219.88.
If a product is not in their catalogue, it does not go on the site.

## Taste notes (hard-won, don't relitigate)

- No promo banners beyond the one approved subtle announcement bar. **No "SCROLL" cues** —
  the fold-cut mid-sentence IS the scroll invitation.
- Photo-to-3D "slab" trick: rejected ("looks like a coin"). Tilt card is front-facing only.
- Octagon buttons: rejected. Ellipse ripples: rejected (wavy circles only).
- Effects must attach to *brand* physics (coil, rings, resonance) — no particles, no EKG lines,
  no pulsing UI chips, no breathing typography.
- Every stone card shows its best face (tuned yaw/pitch in the gems catalog).
- Placeholders stay honestly labeled ("Film coming soon").
- The **non-medical disclaimer** must appear wherever the generator is sold or shown as a product.
- **Stone photography: no hands, no stands, no baked-in backgrounds.** Cut-outs only — a stone on a
  stand ("this reads bad because there is a stand") or held in a hand breaks the whole effect.
- Glows/halos take **each stone's own colour**, sampled from its pixels — a single copper glow on every
  crystal was rejected ("the brown glow looks bad"). Clamp channels: the saturation boost can push one
  negative, which yields invalid rgba and silently kills the glow.

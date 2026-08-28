# Energy Muse — brief for Figma Make

Paste this whole file into Figma Make as your first message. It gives it the
palette, the type, the layout rules and the real products, so what it builds
matches the site instead of inventing its own system.

**Read this first:** Figma Make builds a *separate* React app in its own
sandbox. It cannot import or edit the deployed site. Anything built there is a
fork and will drift from `energy-muse-workingfolder.vercel.app` unless someone
keeps them in step by hand. Use it to explore; keep the repo as the source of
truth.

---

## Colour

| token | value | used for |
|---|---|---|
| `--bg` | `#FBF8F2` | page ground |
| `--surface` | `#FFFFFF` | cards |
| `--tint` | `#F4EFE5` | alternating section ground, image frames |
| `--ink` | `#1D2739` | headings, body |
| `--ink-soft` | `#4E5A70` | secondary text |
| `--stone` | `#8D8778` | labels, meta |
| `--line` / `--hair` | `#EAE3D6` | hairlines, card borders |
| `--copper` | `#A9683E` | primary accent, prices, CTAs |
| `--copper-lo` | `#8F5330` | hover |
| `--copper-hi` | `#B87A4B` | highlight |

Dark sections (frequency): ground `#0A1017`, ink `#F1EADF`, soft `#AEB9C8`.

## Type

- Display / headings: **Fraunces**, weight 300–400. Tight tracking (`-0.018em`).
- UI and body: **Instrument Sans**, 400/500/600.
- Eyebrows: Instrument Sans 600, 10–11px, `letter-spacing:.16em`, uppercase,
  copper.
- Prices: Fraunces, copper.

Headline rule that matters: **a headline of two sentences breaks between the
sentences**, not wherever the line runs out. Each sentence is its own block.

## Layout

- Max width 1240px, gutter `clamp(20px,4vw,44px)`.
- Section rhythm: `clamp(100px,12vw,180px)` desktop, `clamp(52px,9vw,72px)`
  under 640px.
- Product grid: 5 up at 1080+, 4 at 860, 3 at 560, 2 below.
- Cards: 1px hairline, 6px radius, 4/3 image frame on phones and 1/1 above,
  `object-fit:contain` on a `--tint` ground (stones are cut-outs, never crop
  them).
- Every tap target 44px. Add-to-bag on the card itself — no product-page
  detour.

## What the site does that Make should not undo

- **Shops lead with products.** No hero, lede and category cards before the
  grid. First product within ~0.6 screens on a phone.
- **One "Start with…" per page.** Repetition across headings was the single
  most-cited problem.
- **Categories in the nav**, not only the footer.
- Frequency generator prices display as `$—` on purpose, pending Energy Muse.

## Copy

Canonical copy is `home/COPY.md` in the repo — the approved *Website Copy –
Re-write*. Do not write new marketing copy; use that.

## Products

`FIGMA-products.json` beside this file: 122 products with `id`, `name`, `cat`,
`intention`, `price`, `stock`, and an absolute `image` URL on the live site so
Make can load them directly.

Counts: 67 crystals, 33 jewelry, 8 systems, 7 kits, 7 frequency generators.
Intentions: Protection, Abundance, Connection (shown as "Love"), Calm, Clarity.

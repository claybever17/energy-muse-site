# Energy Muse rebrand — context for AI sessions

Static prototype site (no build step, no framework). `index.html` + `assets/` is the
maintained code; `home-v1.html` / `home-v2.html` are frozen single-file mockups.

## Working rules

- Keep `index.html` readable: external assets, no inlining, no minified app code.
- three.js r160 UMD build lives at `assets/three.min.js` (global `THREE`). Note: in
  three.js, `mesh.position` is read-only — use `.position.set(...)`, never reassign.
- Fonts are self-hosted woff2 in `assets/fonts/` (Fraunces 300/400, Instrument Sans
  400/600) — don't swap to CDN links.
- Brand voice: the "Rigorous" register governs anything about the frequency generator —
  precise, materials-forward, zero mystical language, and the non-medical-device
  disclaimer must stay on device pages.
- Colors/type/motif: see README "Design system". The coil/ring geometry is the brand
  signature — derive decoration from it rather than adding new motifs.

## The 3D showcase (`index.html`)

- Device model: rounded-square ExtrudeGeometry lid with a circular hole (the coil is
  visible when closed — this matches the real product), thin glass sheet, centered
  "energy muse" canvas-texture decal, hex bolts with domed caps, gold spiral coil built
  from TubeGeometry over an eased-pitch Archimedean spiral (wider pitch at the center,
  ending in a small open curl — matches the product close-up).
- Scroll choreography beats (scrollP 0–1): hero 0–.18 (closed, floating), materials
  .18–.42 (text right, device left), reveal .44–.68 (lid lifts, slides up-screen, fades
  via the `lidMats` array), specs .72–1 (coil upper half, caption bottom-center). The
  device x-position slides opposite the active caption; keep that invariant when editing.
- Respect `prefers-reduced-motion` (static angle, no float).

## Deploy

Vercel static deploy from repo root (project: energy-muse-site). `vercel --prod` or push
to `main` if Git integration is connected.

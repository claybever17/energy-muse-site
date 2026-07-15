# Energy Muse — Website Rebrand (WIP)

Design/prototype work for the Energy Muse rebrand: evolving a 20+ year crystal & jewelry
brand into a guided energy-wellness ecosystem (crystals, jewelry, frequency tools,
personalized guidance, and the coming Veza app).

## Pages

| Route | File | What it is |
|---|---|---|
| `/` | `index.html` | **Landing** — the elevated editorial homepage (Fraunces + Instrument Sans, dark WebGL copper-coil hero, intention finder, brand copy from the creative brief). |
| `/generator` | `generator/index.html` | **Frequency Generator showcase** — Apple-style scroll page. Hand-built three.js replica of the real product that floats, then opens on scroll to reveal the gold coil. |
| `/gems` | `gems/index.html` | **The Stone Gallery** — 3D store experiment. 8 intention categories (Wellness, Wealth, Protection, Calm, Love, Spirituality, Fresh Start, Power); click a card for a drag-to-rotate 3D viewer. **GLB pipeline:** drop `assets/gems/<slug>.glb` and that stone automatically upgrades from procedural placeholder to the real scan (chip flips to "3D scan"). `calm.glb` (agate geode) is the working example. |
| — | `home-v1.html` | Frozen mockup v1 (light direction, single-file). |
| — | `home-v2.html` | Frozen mockup v2 (source of the current landing, single-file). |

Slugs for GLB drops: `wellness, wealth, protection, calm, love, spirituality, fresh-start, power`.

## Run locally

Static site — any web server works:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Design system (from the creative brief)

- **Positioning:** "Guided Energy for Real Life" — warm, grounded, expert, human.
- **Registers:** Open Door (newcomers) · Elevated (aesthetic) · Rigorous (frequency/devices —
  no mystical language, specs + disclaimers) · Devotional (legacy customers).
- **Colors:** ink navy `#0B1320` / copper `#A9683E`–`#C08A4E` / paper `#F3ECE1`.
- **Type:** Fraunces (display serif) + Instrument Sans (body). Brand site currently uses
  Tenor Sans + Assistant (see v1).
- **Signature motif:** concentric copper "resonance rings" derived from the real frequency
  generator's spiral coil.
- **Guardrail:** never make medical/therapeutic claims; frequency tools always carry the
  non-medical-device disclaimer.

## Source documents

The full creative brief ("Energy Muse Creative Brief and Website Copy") and low-fi
wireframe pack live outside this repo (owner: Clay). The brief contains approved copy for
every page of the future site; the wireframes define 14 page templates.

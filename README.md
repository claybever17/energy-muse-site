# Energy Muse — Website Rebrand (WIP)

Design/prototype work for the Energy Muse rebrand: evolving a 20+ year crystal & jewelry
brand into a guided energy-wellness ecosystem (crystals, jewelry, frequency tools,
personalized guidance, and the coming Veza app).

## Pages

| File | What it is |
|---|---|
| `index.html` | **Frequency Generator showcase** — Apple-style scroll page. A hand-built three.js replica of the real product (glossy black plate, gold spiral coil in a circular window, domed chrome bolts) that floats, then opens on scroll to reveal the coil. Clean, editable source; assets in `assets/`. |
| `home-v1.html` | Homepage mockup v1 — light/approachable direction (brand's own Tenor Sans + Assistant, copper "resonance ring" motif, real site photography). Self-contained single file. |
| `home-v2.html` | Homepage mockup v2 — elevated editorial direction (Fraunces + Instrument Sans, dark hero with WebGL copper coil). Self-contained single file. |

`home-v1/v2` are single-file builds (images/fonts inlined as data URIs) because they were
first shipped as sandboxed artifacts. `index.html` is the maintained, readable source.

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

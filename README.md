# Maritime Atlas

A browsable visual reference gallery of diagrams and illustrations covering both companion maritime courses:

- **[MOF-101 — Maritime Operations & Industry Fundamentals](https://clarkngo.github.io/maritime-fundamentals/)**
- **[MOT-101 — Maritime Operational Technology Security](https://clarkngo.github.io/maritime-ot/)**

**Live site:** [clarkngo.github.io/maritime-atlas](https://clarkngo.github.io/maritime-atlas/)

## What this is

Maritime Atlas is a **reference companion**, not a course. It organises diagrams by topic/category (not lesson number), with each card linking back to the relevant lesson page(s) in MOF-101 and/or MOT-101.

## Structure

| Page | Purpose |
|------|---------|
| `index.html` | Hub with 12 category cards, search, course & visual-type filters |
| `illustrations.html` | Cross-category view of reviewed raster illustrations & photos |
| `category-*.html` | Gallery pages (one per category) |
| `safeguards.html` | Safeguards & attribution policy |
| `profile.html` | Author profile with course cross-links |
| `svg/` | Author-created educational schematics (`visualType: schematic`) |
| `images/` | Reviewed raster illustrations & photos (`visualType: illustration` or `photo`) |

## Adding visuals

Each entry in `js/gallery-data.js` includes a `visualType`:

| `visualType` | File location | Badge |
|---|---|---|
| `schematic` | `svg/` | Schematic |
| `illustration` | `images/` | AI illustration — requires `attribution` with tool/model |
| `photo` | `images/` | Photo — requires `attribution` with source |

Illustrations and photos appear in topic categories **and** on `illustrations.html`. Use the hub visual-type filter to browse by type.

### Adding images via inbox

1. Drop files in `images/inbox/`
2. Set `source` and `attribution` in `images/inbox/manifest.json`
3. Run `python3 scripts/process-intake.py` (or ask Cursor to *process the inbox*)

Processed images are renamed, moved to `images/`, and added to `gallery-data.js`. Originals archive to `images/inbox/done/`.

## Author

Clark Ngo

## Deploy

GitHub Pages via `.github/workflows/static.yml` — pushes to `main` deploy the repo root.

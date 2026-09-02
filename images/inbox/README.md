# Image Inbox

**Generation tracker:** see [`GENERATION.md`](GENERATION.md) for what's done, what's left, and copy-paste Gemini prompts.

Drop AI-generated illustrations and photos here, then process them into the gallery.

## Quick start

1. **Drop your image files** in this folder (`images/inbox/`). Any filename is fine — `IMG_2048.png`, `gemini-output.webp`, etc.

2. **Edit `manifest.json`** — for each image, set the `source` field to match your dropped filename. The other fields (id, category, title, caption) are pre-filled for the priority illustrations; adjust if needed.

3. **Process** — ask Cursor to *"process the inbox"* or run:

   ```bash
   python3 scripts/process-intake.py
   ```

4. **Update tracker** — move the row in [`GENERATION.md`](GENERATION.md) from *Still to generate* to *Published* (or ask Cursor to update it after processing).

5. **Review** — processed files move to `images/` with clean names and appear in `gallery-data.js`. Originals are archived to `images/inbox/done/`.

## Manifest fields

| Field | Required | Description |
|-------|----------|-------------|
| `source` | Yes | Your filename exactly as dropped in inbox |
| `id` | Yes | URL-safe slug — becomes `images/{id}.png` |
| `category` | Yes | One of the 12 category ids (see below) |
| `title` | Yes | Gallery card title |
| `caption` | Yes | One-sentence caption |
| `attribution` | Yes | Credit line, e.g. `Generated with Google Gemini (2.0 Flash), reviewed by Clark Ngo, Sep 2026.` |
| `visualType` | No | `illustration` (default) or `photo` |
| `sources` | Yes | `[{"course":"mof","lesson":3}]` — links to MOF/MOT lessons |
| `alt` | No | Image alt text (defaults to title) |

## Category ids

`vessel-types` · `ports-terminals` · `bridge-navigation` · `cargo-stowage` · `engine-propulsion` · `network-protocol` · `industry-commercial` · `regulatory-governance` · `threats-incidents` · `access-control` · `safety-emergency` · `frameworks-standards`

## Supported formats

`.png` · `.jpg` · `.jpeg` · `.webp`

Output is always saved as `.png` in `images/` (converted if needed via Pillow when available, otherwise copied with original extension).

## Notes

- Raw inbox files are **gitignored** — only this README and `manifest.json` are tracked.
- Do not use real vessel names, company logos, or port names in images (see `safeguards.html`).
- After processing, check the site locally and confirm lightbox attribution looks correct.

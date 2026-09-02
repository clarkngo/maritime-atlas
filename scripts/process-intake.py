#!/usr/bin/env python3
"""Process images from images/inbox/ into the Maritime Atlas gallery."""

import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INBOX = ROOT / "images" / "inbox"
DONE = INBOX / "done"
IMAGES = ROOT / "images"
MANIFEST = INBOX / "manifest.json"
GALLERY_DATA = ROOT / "js" / "gallery-data.js"

VALID_CATEGORIES = {
    "vessel-types", "ports-terminals", "bridge-navigation", "cargo-stowage",
    "engine-propulsion", "network-protocol", "industry-commercial",
    "regulatory-governance", "threats-incidents", "access-control",
    "safety-emergency", "frameworks-standards",
}
VALID_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def load_gallery():
    text = GALLERY_DATA.read_text()
    prefix = "var ATLAS_ENTRIES = "
    if not text.startswith(prefix):
        raise SystemExit("gallery-data.js format unexpected")
    return json.loads(text[len(prefix):].rstrip().rstrip(";"))


def save_gallery(entries):
    GALLERY_DATA.write_text(
        "var ATLAS_ENTRIES = " + json.dumps(entries, indent=2) + ";\n"
    )


def save_manifest(manifest):
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")


def try_convert_to_png(src: Path, dest: Path) -> str:
    """Return extension used (.png or original)."""
    try:
        from PIL import Image
        img = Image.open(src)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
        dest_png = dest.with_suffix(".png")
        img.save(dest_png, "PNG", optimize=True)
        return ".png"
    except ImportError:
        ext = src.suffix.lower() or ".png"
        shutil.copy2(src, dest.with_suffix(ext))
        return ext
    except Exception as e:
        print(f"  WARN: Pillow convert failed ({e}), copying as-is")
        ext = src.suffix.lower() or ".png"
        shutil.copy2(src, dest.with_suffix(ext))
        return ext


def validate_entry(entry: dict, index: int) -> list[str]:
    errors = []
    for field in ("id", "category", "title", "caption", "sources"):
        if not entry.get(field):
            errors.append(f"entry {index}: missing '{field}'")
    if entry.get("category") and entry["category"] not in VALID_CATEGORIES:
        errors.append(f"entry {index}: invalid category '{entry['category']}'")
    if entry.get("id") and not ID_RE.match(entry["id"]):
        errors.append(f"entry {index}: id must be kebab-case '{entry['id']}'")
    if not entry.get("source", "").strip():
        return errors
    if not entry.get("attribution", "").strip():
        errors.append(f"entry {index}: attribution required (credit Gemini model + reviewer)")
    src = INBOX / entry["source"]
    if not src.is_file():
        errors.append(f"entry {index}: source file not found '{entry['source']}'")
    elif src.suffix.lower() not in VALID_EXTENSIONS:
        errors.append(f"entry {index}: unsupported extension '{src.suffix}'")
    return errors


def build_gallery_entry(entry: dict, rel_src: str) -> dict:
    return {
        "id": entry["id"],
        "category": entry["category"],
        "title": entry["title"],
        "caption": entry["caption"],
        "sources": entry["sources"],
        "visual": {
            "type": "img",
            "src": rel_src,
            "alt": entry.get("alt") or entry["title"],
        },
        "visualType": entry.get("visualType", "illustration"),
        "attribution": entry["attribution"].strip(),
    }


def process(dry_run: bool = False):
    if not MANIFEST.is_file():
        raise SystemExit(f"Missing {MANIFEST}")

    manifest = json.loads(MANIFEST.read_text())
    entries = manifest.get("entries", [])
    if not entries:
        raise SystemExit("manifest.json has no entries")

    to_process = [e for e in entries if e.get("source", "").strip()]
    if not to_process:
        print("No entries with 'source' set.")
        print("Drop images in images/inbox/ and set 'source' + 'attribution' in manifest.json")
        return

    all_errors = []
    for i, entry in enumerate(entries):
        if entry.get("source", "").strip():
            all_errors.extend(validate_entry(entry, i + 1))

    if all_errors:
        print("Validation failed:")
        for err in all_errors:
            print(f"  - {err}")
        sys.exit(1)

    gallery = load_gallery()
    by_id = {e["id"]: idx for idx, e in enumerate(gallery)}
    processed = []

    if not dry_run:
        DONE.mkdir(parents=True, exist_ok=True)

    for entry in to_process:
        entry_id = entry["id"]
        src = INBOX / entry["source"]
        dest_base = IMAGES / entry_id

        print(f"Processing: {entry['source']} → images/{entry_id}")

        if dry_run:
            processed.append(entry_id)
            continue

        ext = try_convert_to_png(src, dest_base)
        rel_src = f"images/{entry_id}{ext}"

        for old_ext in VALID_EXTENSIONS:
            old = IMAGES / f"{entry_id}{old_ext}"
            if old.exists() and old.suffix.lower() != ext:
                old.unlink()

        new_entry = build_gallery_entry(entry, rel_src)
        if entry_id in by_id:
            gallery[by_id[entry_id]] = new_entry
            print(f"  Updated gallery entry '{entry_id}'")
        else:
            gallery.append(new_entry)
            by_id[entry_id] = len(gallery) - 1
            print(f"  Added gallery entry '{entry_id}'")

        archive = DONE / entry["source"]
        if archive.exists():
            archive.unlink()
        shutil.move(str(src), str(archive))
        entry["source"] = ""
        processed.append(entry_id)

    if not dry_run:
        save_gallery(gallery)
        save_manifest({"entries": entries})

    print(f"\nDone. Processed {len(processed)} image(s): {', '.join(processed)}")
    if not dry_run and processed:
        print(f"Archived originals → images/inbox/done/")


if __name__ == "__main__":
    process(dry_run="--dry-run" in sys.argv)

# AI Illustration Generation Tracker

**Last updated:** 2026-09-03  
**Tool:** Google Gemini  
**Attribution template:** `Generated with Google Gemini, reviewed by Clark Ngo, [month year].`

Append to every prompt:

> Educational textbook illustration. Fictional generic scene — no real company logos, vessel names, IMO numbers, or identifiable port names. Clean, well-lit, accurate maritime details. No text overlays or watermarks. 16:9 landscape.

---

## Summary

| Metric | Count |
|--------|------:|
| **Target illustrations** | 35 |
| **Published on site** | 33 |
| **Not yet generated** | 1 |
| **Skipped duplicates** | 1 |
| **SVG schematics (separate)** | 35 |

**Progress:** 33 / 35 illustrations (94%)

### By category

| Category | Done | Remaining |
|----------|-----:|----------:|
| Vessel Types & Anatomy | 3 | 0 |
| Ports & Terminal Operations | 4 | 0 |
| Bridge & Navigation Systems | 3 | 0 |
| Cargo & Stowage | 3 | 0 |
| Engine Room, Propulsion & Ballast | 3 | 0 |
| Network & Protocol Architecture | 4 | 0 |
| Industry & Commercial Structure | 2 | 0 |
| Regulatory & Governance | 2 | 0 |
| Threats & Incidents | 3 | 0 |
| Access Control & Identity | 2 | 0 |
| Safety & Emergency Systems | 3 | 0 |
| Frameworks & Standards Comparison | 1 | 1 |

---

## Published (on site)

| ID | File | Category | Title |
|----|------|----------|-------|
| `container-terminal-aerial` | `images/container-terminal-aerial.png` | ports-terminals | Container Terminal — Aerial View |
| `container-ship-profile` | `images/container-ship-profile.png` | vessel-types | Container Ship — Side Profile |
| `bulk-carrier-profile` | `images/bulk-carrier-profile.png` | vessel-types | Bulk Carrier — Side Profile |
| `oil-tanker-profile` | `images/oil-tanker-profile.png` | vessel-types | Oil Tanker — Side Profile |
| `bridge-interior-modern` | `images/bridge-interior-modern.png` | bridge-navigation | Modern Ship Bridge Interior |
| `bridge-team-conning` | `images/bridge-team-conning.png` | bridge-navigation | Bridge Team at Conning |
| `ecdis-radar-workstation` | `images/ecdis-radar-workstation.png` | bridge-navigation | ECDIS & Radar Workstation |
| `sts-crane-operations` | `images/sts-crane-operations.png` | ports-terminals | STS Crane Operations |
| `dry-bulk-terminal` | `images/dry-bulk-terminal.png` | ports-terminals | Dry Bulk Terminal |
| `liquid-bulk-terminal` | `images/liquid-bulk-terminal.png` | ports-terminals | Liquid Bulk Terminal |
| `engine-room-overview` | `images/engine-room-overview.png` | engine-propulsion | Engine Room Overview |
| `ballast-control-station` | `images/ballast-control-station.png` | engine-propulsion | Ballast Control Station |
| `watertight-door-passage` | `images/watertight-door-passage.png` | engine-propulsion | Watertight Door Passage |
| `gps-spoofing-concept` | `images/gps-spoofing-concept.png` | threats-incidents | GPS Spoofing — Concept Illustration |
| `ais-spoofing-radar` | `images/ais-spoofing-radar.png` | threats-incidents | AIS Spoofing on Radar |
| `ransomware-phishing-path` | `images/ransomware-phishing-path.png` | threats-incidents | Ransomware Phishing Path |
| `shipboard-ot-zones` | `images/shipboard-ot-zones.png` | network-protocol | Shipboard OT Security Zones |
| `ship-comms-room` | `images/ship-comms-room.png` | network-protocol | Ship Communications Room |
| `bridge-mast-antennas` | `images/bridge-mast-antennas.png` | network-protocol | Bridge Mast & Antennas |
| `serial-wiring-machinery` | `images/serial-wiring-machinery.png` | network-protocol | Serial Wiring in Machinery Space |
| `lifeboat-muster-drill` | `images/lifeboat-muster-drill.png` | safety-emergency | Lifeboat Muster Drill |
| `isps-security-patrol` | `images/isps-security-patrol.png` | safety-emergency | ISPS Security Patrol |
| `epirb-liferaft-stowage` | `images/epirb-liferaft-stowage.png` | safety-emergency | EPIRB & Liferaft Stowage |
| `port-state-control-inspection` | `images/port-state-control-inspection.png` | regulatory-governance | Port State Control Inspection |
| `classification-survey-deck` | `images/classification-survey-deck.png` | regulatory-governance | Classification Survey on Deck |
| `container-hold-cutaway` | `images/container-hold-cutaway.png` | cargo-stowage | Container Hold Cutaway |
| `imdg-containers-deck` | `images/imdg-containers-deck.png` | cargo-stowage | IMDG Containers on Deck |
| `bill-of-lading-desk` | `images/bill-of-lading-desk.png` | cargo-stowage | Bill of Lading Desk |
| `chartering-office-meeting` | `images/chartering-office-meeting.png` | industry-commercial | Chartering Office Meeting |
| `port-agent-harbor-launch` | `images/port-agent-harbor-launch.png` | industry-commercial | Port Agent Harbor Launch |
| `shared-bridge-workstation` | `images/shared-bridge-workstation.png` | access-control | Shared Bridge Workstation |
| `mfa-shipboard-login` | `images/mfa-shipboard-login.png` | access-control | MFA Shipboard Login |
| `nist-purdue-ship` | `images/nist-purdue-ship.png` | frameworks-standards | NIST Purdue Model on Ship |

---

## Still to generate

| ID | Filename | Prompt |
|----|----------|--------|
| `iec-62443-conduit` | `iec-62443-conduit.png` | Abstract industrial network diagram rendered as physical ship spaces: firewall conduit as locked cable trunk between colored zone rooms. Color-coded zones only, minimal text. |

---

## Skipped (not published)

| File | Reason |
|------|--------|
| `Gemini_Generated_Image_iiglu2iiglu2iigl.jpeg` | Duplicate of `nist-purdue-ship` (same Purdue-level ship cutaway) |
| Earlier engine-room duplicates | Near-duplicates of `engine-room-overview` |

---

## Workflow

1. Generate image in Gemini using prompt above (+ standard suffix).
2. Review for accuracy — no real vessel/company/port identifiers.
3. Save/drop file into `images/inbox/`.
4. Set `"source": "your-filename.jpeg"` and `"attribution": "..."` in `manifest.json` (add new entry if not listed).
5. Run `python3 scripts/process-intake.py` or ask Cursor to **process the inbox**.
6. Update this file's summary counts and move row from *Still to generate* → *Published*.

---

## Notes

- **Latest batch (2026-09-03):** 13 images including ballast-control-station re-gen (closed ECR).
- **Categories complete (illustrations):** All except Frameworks & Standards (1 of 2 done).
- **Schematics:** 35 SVG diagrams in `svg/` remain separate from these illustrations.

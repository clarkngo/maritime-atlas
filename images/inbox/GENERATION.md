# AI Illustration Generation Tracker

**Last updated:** 2026-09-02  
**Tool:** Google Gemini  
**Attribution template:** `Generated with Google Gemini, reviewed by Clark Ngo, [month year].`

Append to every prompt:

> Educational textbook illustration. Fictional generic scene — no real company logos, vessel names, IMO numbers, or identifiable port names. Clean, well-lit, accurate maritime details. No text overlays or watermarks. 16:9 landscape.

---

## Summary

| Metric | Count |
|--------|------:|
| **Target illustrations** | 35 |
| **Published on site** | 17 |
| **Needs re-generation** | 1 (`ballast-control-station`) |
| **Not yet generated** | 17 |
| **SVG schematics (separate)** | 35 |

**Progress:** 17 / 35 illustrations (49%)

### By category

| Category | Done | Remaining |
|----------|-----:|----------:|
| Vessel Types & Anatomy | 3 | 0 |
| Ports & Terminal Operations | 4 | 0 |
| Bridge & Navigation Systems | 3 | 0 |
| Cargo & Stowage | 0 | 3 |
| Engine Room, Propulsion & Ballast | 1 | 2 |
| Network & Protocol Architecture | 2 | 2 |
| Industry & Commercial Structure | 0 | 2 |
| Regulatory & Governance | 0 | 2 |
| Threats & Incidents | 1 | 2 |
| Access Control & Identity | 0 | 2 |
| Safety & Emergency Systems | 3 | 0 |
| Frameworks & Standards Comparison | 0 | 2 |

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
| `gps-spoofing-concept` | `images/gps-spoofing-concept.png` | threats-incidents | GPS Spoofing — Concept Illustration |
| `shipboard-ot-zones` | `images/shipboard-ot-zones.png` | network-protocol | Shipboard OT Security Zones |
| `lifeboat-muster-drill` | `images/lifeboat-muster-drill.png` | safety-emergency | Lifeboat Muster Drill |
| `isps-security-patrol` | `images/isps-security-patrol.png` | safety-emergency | ISPS Security Patrol |
| `epirb-liferaft-stowage` | `images/epirb-liferaft-stowage.png` | safety-emergency | EPIRB & Liferaft Stowage |
| `ship-comms-room` | `images/ship-comms-room.png` | network-protocol | Ship Communications Room |

---

## Needs re-generation (removed from site)

| ID | Filename | Why removed |
|----|----------|-------------|
| `ballast-control-station` | `ballast-control-station.png` | Reused open engine-room background; ballast control belongs in a closed ECR |

### Replacement prompt — `ballast-control-station`

```
Interior of a generic ship engine control room (ECR), closed room with grey walls
and fluorescent lighting — NOT an open machinery space. Foreground: ballast control
console with tank mimic diagram, vertical tank level indicators, pump start/stop
status lights, and one large red emergency stop. One or two officers in coveralls
or white shirts at the console. Background through a small window only: hint of
engine room, not the main focus. No main engine, no propeller shaft, no open
walkways over machinery. Educational maritime textbook illustration. No logos,
no vessel names, no readable proprietary brands. 16:9 landscape.
```

Also append the standard suffix above.

---

## Next up (recommended batch)

| Priority | ID | Filename | Category |
|--------:|----|----------|----------|
| 1 | `ballast-control-station` | `ballast-control-station.png` | engine-propulsion *(re-gen)* |
| 2 | `container-hold-cutaway` | `container-hold-cutaway.png` | cargo-stowage |
| 3 | `imdg-containers-deck` | `imdg-containers-deck.png` | cargo-stowage |
| 4 | `bill-of-lading-desk` | `bill-of-lading-desk.png` | cargo-stowage |
| 5 | `ais-spoofing-radar` | `ais-spoofing-radar.png` | threats-incidents |
| 6 | `ransomware-phishing-path` | `ransomware-phishing-path.png` | threats-incidents |

---

## Still to generate

### Cargo & Stowage

| ID | Filename | Prompt |
|----|----------|--------|
| `container-hold-cutaway` | `container-hold-cutaway.png` | Cross-section view inside a container ship cargo hold showing vertical cell guides, stacked containers, hatch coaming above. Cutaway educational illustration. |
| `imdg-containers-deck` | `imdg-containers-deck.png` | On-deck scene showing a few shipping containers with generic hazmat placard shapes, separated from other containers. Educational safety reference. |
| `bill-of-lading-desk` | `bill-of-lading-desk.png` | Still life: shipping documents on a desk — bill of lading forms, stamp pad, generic letterhead with no real names, pencil, corner of laptop. Top-down educational illustration. |

### Engine Room, Propulsion & Ballast

| ID | Filename | Prompt |
|----|----------|--------|
| `ballast-control-station` | `ballast-control-station.png` | *(See replacement prompt above — closed ECR only)* |
| `watertight-door-passage` | `watertight-door-passage.png` | Corridor aboard a generic merchant ship with a heavy watertight steel door, dogs/latches visible, grated deck, overhead pipes. |

### Network & Protocol Architecture

| ID | Filename | Prompt |
|----|----------|--------|
| `bridge-mast-antennas` | `bridge-mast-antennas.png` | Exterior view of ship bridge wings and mast: radar scanner, GPS antenna, AIS antenna, VHF aerials against sky. |
| `serial-wiring-machinery` | `serial-wiring-machinery.png` | Close-up of industrial serial wiring in a ship machinery space: RS-485 junction box, shielded cable runs along pipe rack, Ethernet cable in background. |

### Industry & Commercial Structure

| ID | Filename | Prompt |
|----|----------|--------|
| `chartering-office-meeting` | `chartering-office-meeting.png` | Professional meeting in a generic shipping office: two people reviewing a voyage estimate on a screen showing abstract route map. |
| `port-agent-harbor-launch` | `port-agent-harbor-launch.png` | Harbor launch approaching a generic cargo ship at anchor, agent with document case, overcast morning light. |

### Regulatory & Governance

| ID | Filename | Prompt |
|----|----------|--------|
| `port-state-control-inspection` | `port-state-control-inspection.png` | Generic PSC inspector with clipboard on ship gangway, officer escorting, lifeboat and safety equipment in background. |
| `classification-survey-deck` | `classification-survey-deck.png` | Surveyor in hard hat examining deck plating with ultrasonic gauge, generic bulk carrier deck, hatch coaming in background. |

### Threats & Incidents

| ID | Filename | Prompt |
|----|----------|--------|
| `ais-spoofing-radar` | `ais-spoofing-radar.png` | Generic radar display with one vessel target duplicated in wrong location, bridge reflection in screen glass. Cyber-navigation threat concept. |
| `ransomware-phishing-path` | `ransomware-phishing-path.png` | Educational infographic-style scene: laptop with suspicious email icon, arrow through ship network diagram on whiteboard to engine control monitor with lock icon. |

### Access Control & Identity

| ID | Filename | Prompt |
|----|----------|--------|
| `shared-bridge-workstation` | `shared-bridge-workstation.png` | Single generic ECDIS workstation on a ship bridge with multiple USB devices plugged in, sticky notes — visual metaphor for poor access hygiene. |
| `mfa-shipboard-login` | `mfa-shipboard-login.png` | Officer authenticating at a shipboard terminal: password field blurred, phone showing generic 2FA code shape, engine control room in background. |

### Frameworks & Standards Comparison

| ID | Filename | Prompt |
|----|----------|--------|
| `nist-purdue-ship` | `nist-purdue-ship.png` | Isometric illustration of ship sections mapped to Purdue model levels 0–3: sensors on machinery, PLCs in engine room, SCADA in ECR, enterprise IT in bridge office. Color zones only, no text. |
| `iec-62443-conduit` | `iec-62443-conduit.png` | Abstract industrial network diagram rendered as physical ship spaces: firewall conduit as locked cable trunk between colored zone rooms. |

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

- **Removed 2026-09-02:** `ballast-control-station` — wrong setting (open engine room reuse). Manifest slot kept for replacement.
- **Latest batch:** ECDIS/radar workstation, ISPS security patrol, EPIRB & liferaft stowage.
- **Categories complete (illustrations):** Vessel Types, Ports & Terminals, Bridge & Navigation, Safety & Emergency.
- **Schematics:** 35 SVG diagrams in `svg/` remain separate from these illustrations.

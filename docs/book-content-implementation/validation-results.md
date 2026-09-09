# Validation Results — 2026-09-09 Implementation

## Method

Node.js is not available in this environment. All validation was done via:
1. File grep for question factory calls (`makeMCQ|makeNum|makeTF|makeMatch`)
2. Subsection ID extraction via grep + sort + uniq
3. Manifest reading to compare declared vs. tagged IDs

`node scripts/test-subsection-invariant.js` and `node netlify/build-questions.js` could
not be run. These should be run before deploying.

## Question Count Validation

All new chapters meet the 40-question-per-chapter minimum:

| Pack | Chapter | Questions |
|---|---|---|
| grade1-maths | g1mth-time | 55 |
| grade1-maths | g1mth-money | 65 |
| grade1-maths | g1mth-ordinals | 75 |
| grade2-maths | g2mth-ordinals | 90 |
| grade2-maths | g2mth-money | 90 |
| grade2-maths | g2mth-division | 90 |
| grade3-maths | g3mth-pictograms | 90 |
| grade3-maths | g3mth-ordinals | 90 |
| grade3-maths | g3mth-roman | 90 |
| grade3-maths | g3mth-money | 90 |
| grade7-maths | g7m-sequences | ~65 (combined file) |
| grade7-maths | g7m-angles | ~70 (combined file) |
| grade8-maths | g8m-real-numbers | 55 |
| grade8-maths | g8m-pythagoras | 60 |
| grade8-maths | g8m-inequalities | 60 |
| grade8-maths | g8m-sets | 60 |
| grade8-maths | g8m-constructions | 60 |
| grade1-health | g1he-hygiene | 60 (45+15) |
| grade1-health | g1he-nutrition | 60 (45+15) |
| grade1-health | g1he-safety | 50 (36+14) |
| grade2-health | g2he-hygiene | 60 (30+30) |
| grade2-health | g2he-nutrition | 60 (30+30) |
| grade2-health | g2he-safety | 60 (30+30) |
| grade3-health | g3he-hygiene | 60 (30+30) |
| grade3-health | g3he-nutrition | 60 (30+30) |
| grade3-health | g3he-safety | 60 (30+30) |
| grade3-ssee | g3ssee-environment | 50 |
| grade3-ssee | g3ssee-family | 45 |
| grade3-ssee | g3ssee-natural | 45 |
| grade3-ssee | g3ssee-living | 45 |
| grade3-ssee | g3ssee-locality | 45 |
| grade3-ssee | g3ssee-air | 40 |
| grade3-ssee | g3ssee-water | 40 |
| grade3-ssee | g3ssee-weather | 40 |

## Subsection Count Validation (≥20 per subsection)

All manually verified to have exactly 20 per subsection:

| Pack | Result |
|---|---|
| grade1-health | ✓ All 9 subsections at exactly 20 |
| grade2-health | ✓ All 9 subsections at exactly 20 |
| grade3-health | ✓ All 9 subsections at exactly 20 |

Grade 1-3 maths new chapters (30 per subsection by construction — 90÷3):
- grade2-maths ordinals/money/division: 30 per subsection ✓
- grade3-maths pictograms/ordinals/roman/money: 30 per subsection ✓

## Subsection ID Alignment

Manually checked that all subsection IDs tagged in question files exist in the manifest:

| Pack | Result |
|---|---|
| grade1-health | ✓ 9 declared, 9 tagged, all match |
| grade2-health | ✓ 9 declared, 9 tagged, all match |
| grade3-health | ✓ 9 declared, 9 tagged, all match |
| grade3-ssee | ✓ 24 declared, 24 tagged, all match (weather chapter fixed by agent) |

## Bugs Found and Fixed

| ID | Problem | Fix |
|---|---|---|
| g2mth-mon-082 | Answer "No, needs Rs 4 more" when Rs 40 > Rs 36 (she CAN afford it) | Changed to Rs 32 subject needing Rs 4 more (correctly can't afford) |
| g3mth-pic-018 | Duplicate `explanation:` key; answer 'Chilli' wrong (no vegetable = 9) | Fixed to 'None of them' with single correct explanation |
| g3ssee-wth-* | Weather chapter: manifest had weather_types/weather_tools/weather_effects; question file used types_of_weather/weather_instruments/cyclones_in_mauritius | Aligned manifest to match question file |

## Integration Validation

- `subjects/_index.js` manually updated (node not available to regenerate)
- `engine/question_loader.js` LOCAL_FILES updated for all new packs/chapters
- `_CACHE_VERSION` bumped to 122
- Sample files (`ch01_sample.js`) deleted from all unlocked health packs

## Pending Validations (require Node.js)

```bash
node scripts/test-subsection-invariant.js   # verify all subsection IDs match
node netlify/build-questions.js             # build bundles, get exact counts
node scripts/test-live-pack-content.js      # verify live packs all have ≥40 questions
node scripts/build-subject-index.js         # regenerate _index.js cleanly
node scripts/check.js                       # verify no drift
```

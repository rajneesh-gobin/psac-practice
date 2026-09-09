# Book-Content Implementation Progress

**Date:** 2026-09-09  
**Status:** Complete (health topup pending agent)

## Summary

Implemented textbook-aligned questions for Grades 1, 2, 3, 7 and 8. Starting from a baseline
of placeholder/sample chapters, each grade now has real curriculum-matched question banks.

## Completed Work

### Grade 1 — Mathematics (+3 chapters, +195 questions)
| Chapter | File | Questions |
|---|---|---|
| Time and Daily Routines | ch07_time.js | 55 |
| Money | ch08_money.js | 65 |
| Ordinal Numbers | ch09_ordinals.js | 75 |

SVG diagrams throughout: sun/moon visuals for time, coin SVGs for money, row-of-animals for ordinals.

### Grade 2 — Mathematics (+3 chapters, +270 questions)
| Chapter | File | Questions |
|---|---|---|
| Ordinal Numbers | ch09_ordinals.js | 90 |
| Money | ch10_money.js | 90 |
| Division by 2 | ch11_division.js | 90 |

### Grade 3 — Mathematics (+4 chapters, +360 questions)
| Chapter | File | Questions |
|---|---|---|
| Pictograms | ch10_pictograms.js | 90 |
| Ordinal Numbers | ch11_ordinals.js | 90 |
| Roman Numerals | ch12_roman_numerals.js | 90 |
| Money to Rs 1000 | ch13_money.js | 90 |

### Grade 7 — Mathematics (+2 chapters, +135 questions)
| Chapter | File | Questions |
|---|---|---|
| Sequences & Patterns + Angles | ch03_sequences_angles.js | 135 |

### Grade 8 — Mathematics (+5 chapters, +295 questions)
| Chapter | File | Questions |
|---|---|---|
| Real Numbers | ch03_real_numbers.js | 55 |
| Pythagoras' Theorem | ch04_pythagoras.js | 60 |
| Inequalities | ch05_inequalities.js | 60 |
| Sets | ch06_sets.js | 60 |
| Construction of Triangles | ch07_constructions.js | 60 |

### Grade 1 — Health Education (+3 chapters, +170 questions)
| Chapter | Files | Questions |
|---|---|---|
| Personal Hygiene | ch01_hygiene.js + ch_topup.js (15) + ch_topup2.js (5) | 65 |
| Food and Nutrition | ch02_nutrition.js + ch_topup.js (15) + ch_topup2.js (5) | 65 |
| Keeping Safe | ch03_safety.js + ch_topup.js (14) + ch_topup2.js (0) | 50 |

Pack changed from comingSoon:true to comingSoon:false.

### Grade 2 — Health Education (+3 chapters, ~90+ questions)
| Chapter | Files | Questions |
|---|---|---|
| Hygiene and Grooming | ch01_hygiene.js (30) + topup pending | 30+ |
| Food, Nutrition and Safety | ch02_nutrition.js (30) + topup pending | 30+ |
| Keeping Safe | ch03_safety.js (30) + topup pending | 30+ |

Pack changed from comingSoon:true to comingSoon:false.
**Note:** Topup agent still running to bring each chapter to 40+ questions.

### Grade 3 — Health Education (+3 chapters, ~90+ questions)
Same state as Grade 2 Health. Topup pending.

### Grade 3 — SSEE (new pack, +8 chapters, +350 questions)
| Chapter | File | Questions |
|---|---|---|
| Looking at Our Environment | ch01_environment.js | 50 |
| Myself and My Family | ch02_myself_family.js | 45 |
| Our Natural Environment | ch03_natural_environment.js | 45 |
| Living and Non-living Things | ch04_living_things.js | 45 |
| My Locality | ch05_locality.js | 45 |
| Air Around Us | ch06_air.js | 40 |
| Learning About Water | ch07_water.js | 40 |
| Our Weather | ch08_weather.js | 40 |

Completely new pack (grade3-ssee). Manifest and 8 question files created from scratch.

## Integration Steps Completed

- `engine/question_loader.js` LOCAL_FILES updated for all above packs
- `_CACHE_VERSION` bumped from 119 → 121
- `subjects/_index.js` manually updated (node not available) with:
  - grade1-maths: +3 chapter entries
  - grade2-maths: +3 chapter entries
  - grade3-maths: +4 chapter entries
  - grade7-maths: +2 chapter entries
  - grade8-maths: +5 chapter entries
  - grade1-health: comingSoon:false, 3 real chapters
  - grade2-health: comingSoon:false, 3 real chapters
  - grade3-health: comingSoon:false, 3 real chapters
  - grade3-ssee: new entry, 8 chapters

## Pending / Remaining

1. **Health topup agent** still running — will write ch_topup files for grade2-health and grade3-health to bring each chapter to 40+ questions. Once complete, add topup files to `question_loader.js`.
2. **Sample files** (ch01_sample.js) for grades 1–3 health remain on disk; they are no longer referenced in `question_loader.js` but should be deleted.
3. **Validation**: Run `node scripts/test-subsection-invariant.js` to verify subsection IDs match across question files and manifests.
4. **Bundle build**: Run `node netlify/build-questions.js` to build bundles and count exact question totals.
5. **Node.js**: Not available in this environment. `subjects/_index.js` was updated manually; once node is available, run `node scripts/build-subject-index.js` to regenerate cleanly.

## Bugs Fixed

| Bug | Location | Fix |
|---|---|---|
| Contradictory question: Rs 40 claimed insufficient for 3×Rs12 (total Rs 36) | grade2-maths/ch10_money.js g2mth-mon-082 | Changed to makeNum with Rs 32 (correctly needs Rs 4 more) |
| Duplicate `explanation:` key + wrong answer 'Chilli' | grade3-maths/ch10_pictograms.js g3mth-pic-018 | Removed duplicate, changed answer to 'None of them' |
| SSEE weather subsection IDs mismatch between manifest and question file | grade3-ssee manifest / ch08_weather.js | Agent aligned both to types_of_weather/weather_instruments/cyclones_in_mauritius |

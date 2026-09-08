# Image provenance — outstanding work

**Status: INCOMPLETE for 115 of 138 images.**

This is an internal record, not the credits page. Public attribution for the
images whose provenance IS established lives in `CREDITS.md`, which is served;
this file is 404'd in `netlify.toml` and should stay that way until the gap
below is closed.

| Group | Count | Size | Provenance |
|---|---|---|---|
| Imported 2026-09-08 | 23 | 4.56 MB | **Recorded** — see `CREDITS.md` |
| Pre-existing | 115 | 7.43 MB | **UNVERIFIED** — below |

## The 115 unverified images

They ship inside the app with no recorded source, author or licence. Most stock
and Wikimedia images carry terms that require attribution, so this has to be
completed before the app is distributed more widely.

### What was checked

Every filename was traced against the Commons API, and the real pixel dimensions
of each local file were read from its header and compared with what Commons
reports for a file of that name.

| Result | Count |
|---|---|
| No Commons file of that name exists | 106 |
| Name matches, but the Commons image has different dimensions | 8 |
| Name and dimensions both match | 1 |
| **Provenance actually established** | **0** |

The eight name-only matches are generic words — `ball`, `backpack`, `singing`,
`sleeping`, `smiling`, `anemometer`, `barometer`, `solar-panels`. A Commons file
called `Ball.jpg` existing tells us nothing about where *this* `ball.jpg` came
from, so they are leads to check, **not** attributions, and none should be
published as attribution without confirming it against the original download.

### What still has to be done

1. Record where each image was downloaded from and under what licence. Whoever
   added the file is the only reliable source for this.
2. Move anything established into `CREDITS.md`, with author and licence.
3. Replace anything whose licence cannot be established. An image with unknown
   terms is a liability, not an asset. The 2026-09-08 import is the worked
   example: 25 questions pointed at `Special:FilePath` URLs, **every one of
   which was dead** — the filenames were plausible but had never existed
   (`Le_Morne_Brabant_Mauritius.jpg` does not exist; `Le Morne Brabant.jpg`
   does) — and were replaced with verified, attributed local copies.
4. Once this file is empty, delete it and remove its `netlify.toml` 404 rule.

### Register

| Image | Size | Used by | Lead | Licence | Author |
|---|---|---|---|---|---|
| `9v-battery-and-led-circuit-components-wires-battery-led-resi.jpg` | 38 KB | grade5-science/g5sci-el-024 | **unknown** | **unknown** | **unknown** |
| `adrien-d-epinay1.jpg` | 140 KB | grade6-history/g6enr-per-022 | **unknown** | **unknown** | **unknown** |
| `aerial-view-of-the-amazon-rainforest.jpg` | 56 KB | grade6-science/g6sci-enr-eco-003 | **unknown** | **unknown** | **unknown** |
| `aldabra-giant-tortoise-arp.jpg` | 96 KB | grade4-science/g4sci-enr-ani-005 | **unknown** | **unknown** | **unknown** |
| `anemometer.jpg` | 44 KB | grade4-science/g4sci-enr-equ-003 | weak lead: [File:Anemometer.jpg](https://commons.wikimedia.org/wiki/File:Anemometer.jpg) — CC BY 3.0 | **unknown** | **unknown** |
| `anerood-jugnauth-1980s.jpg` | 79 KB | grade6-history/g6enr-per-021 | **unknown** | **unknown** | **unknown** |
| `backpack.jpg` | 103 KB | grade4-french/g4fr-nom-040 | weak lead: [File:Backpack.jpg](https://commons.wikimedia.org/wiki/File:Backpack.jpg) — Public domain | **unknown** | **unknown** |
| `ball.jpg` | 41 KB | grade4-french/g4fr-nom-039 | weak lead: [File:Ball.jpg](https://commons.wikimedia.org/wiki/File:My_Football_Dream.jpg) — CC BY-SA 3.0 | **unknown** | **unknown** |
| `barometer.jpg` | 104 KB | grade6-english/g6eng-voc-024 | weak lead: [File:Barometer.jpg](https://commons.wikimedia.org/wiki/File:Barometer.jpg) — Public domain | **unknown** | **unknown** |
| `battery-symbols-and-circuit.jpg` | 6 KB | grade5-science/g5sci-el-023 | **unknown** | **unknown** | **unknown** |
| `beach.jpg` | 105 KB | grade5-french/g5fr-nom-041 | **unknown** | **unknown** | **unknown** |
| `bed.jpg` | 40 KB | grade4-french/g4fr-nom-037 | **unknown** | **unknown** | **unknown** |
| `black-river-gorges-national-park-mauritius.jpg` | 73 KB | grade4-history/g4h-voy-022 | **unknown** | **unknown** | **unknown** |
| `blue-linckia-starfish.jpg` | 132 KB | grade6-science/g6sci-enr-eco-001 | **unknown** | **unknown** | **unknown** |
| `butterfly.jpg` | 63 KB | grade4-french/g4fr-nom-041 | **unknown** | **unknown** | **unknown** |
| `candid-girl-reading-20946248203.jpg` | 86 KB | grade6-french/g6fr-lec-036 | **unknown** | **unknown** | **unknown** |
| `canis-lupus-familiaris.jpg` | 33 KB | grade4-english/g4eng-noun-023 | **unknown** | **unknown** | **unknown** |
| `carrot.jpg` | 57 KB | grade5-french/g5fr-voc-044 | **unknown** | **unknown** | **unknown** |
| `children-playing.jpg` | 58 KB | grade6-french/g6fr-lec-041 | **unknown** | **unknown** | **unknown** |
| `classroom.jpg` | 4 KB | grade4-english/g4eng-noun-024 | **unknown** | **unknown** | **unknown** |
| `clinical-thermometer-38-7.jpg` | 34 KB | grade4-science/g4sci-enr-equ-001 | **unknown** | **unknown** | **unknown** |
| `coat-of-arms-of-mauritius.png` | 162 KB | grade6-history/g6hg-ind-021 | **unknown** | **unknown** | **unknown** |
| `colorful-underwater-landscape-of-a-coral-reef.jpg` | 94 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `compass.jpg` | 167 KB | grade4-history/g4h-voy-025 | **unknown** | **unknown** | **unknown** |
| `cooking.jpg` | 27 KB | grade6-french/g6fr-lec-045 | **unknown** | **unknown** | **unknown** |
| `cottage.jpg` | 56 KB | grade4-english/g4eng-adj-025 | **unknown** | **unknown** | **unknown** |
| `cow.jpg` | 92 KB | grade5-french/g5fr-nom-039 | **unknown** | **unknown** | **unknown** |
| `cracked-earth.jpg` | 191 KB | grade6-english/g6eng-voc-023 | **unknown** | **unknown** | **unknown** |
| `crying-baby.jpg` | 18 KB | grade6-french/g6fr-lec-051 | **unknown** | **unknown** | **unknown** |
| `cup.jpg` | 53 KB | grade4-english/g4eng-noun-030 | **unknown** | **unknown** | **unknown** |
| `dancing.jpg` | 25 KB | grade6-french/g6fr-lec-046 | **unknown** | **unknown** | **unknown** |
| `diagram-of-a-primary-cell-battery.jpg` | 22 KB | grade5-science/g5sci-el-022 | **unknown** | **unknown** | **unknown** |
| `dodo.jpg` | 31 KB | grade4-history/g4h-voy-020 | **unknown** | **unknown** | **unknown** |
| `door.jpg` | 151 KB | grade5-french/g5fr-nom-036 | **unknown** | **unknown** | **unknown** |
| `drawing.jpg` | 65 KB | grade6-french/g6fr-lec-044 | **unknown** | **unknown** | **unknown** |
| `driving.jpg` | 59 KB | grade6-french/g6fr-lec-049 | **unknown** | **unknown** | **unknown** |
| `eating-rice-china-collected-by-berthold-laufer.jpg` | 59 KB | grade6-french/g6fr-lec-038 | **unknown** | **unknown** | **unknown** |
| `echo-parakeet-psittacula-eques-echo-at-durrell-trust.jpg` | 50 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `edwards-dodo.jpg` | 81 KB | grade4-science/g4sci-enr-ani-001 | **unknown** | **unknown** | **unknown** |
| `elephant.jpg` | 143 KB | grade4-english/g4eng-noun-026 | **unknown** | **unknown** | **unknown** |
| `erosion.jpg` | 204 KB | grade5-science/g5sci-pl-028 | **unknown** | **unknown** | **unknown** |
| `fishing.jpg` | 60 KB | grade6-french/g6fr-lec-050 | **unknown** | **unknown** | **unknown** |
| `flood.jpg` | 84 KB | grade6-history/g6hg-nh-020 | **unknown** | **unknown** | **unknown** |
| `food-web.png` | 80 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `foodchain.png` | 96 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `fullmoon2010.jpg` | 54 KB | grade6-science/g6sci-enr-sol-009 | **unknown** | **unknown** | **unknown** |
| `handmade-oil-painting-reproduction-of-ibn-battuta-in-egypt-a.jpg` | 102 KB | grade4-history/g4enr-exp-022 | **unknown** | **unknown** | **unknown** |
| `happy-child.jpg` | 46 KB | grade4-english/g4eng-adj-022 | **unknown** | **unknown** | **unknown** |
| `hat.jpg` | 38 KB | grade4-english/g4eng-noun-027 | **unknown** | **unknown** | **unknown** |
| `horse.jpg` | 42 KB | grade5-french/g5fr-nom-038 | **unknown** | **unknown** | **unknown** |
| `hydroelectric-dam.jpg` | 19 KB | grade5-science/g5sci-enr-ene-003 | **unknown** | **unknown** | **unknown** |
| `ignoto-portoghese-ritratto-di-un-cavaliere-dell-ordine-di-cr.jpg` | 98 KB | grade4-history/g4enr-exp-020 | **unknown** | **unknown** | **unknown** |
| `jumping.jpg` | 71 KB | grade6-french/g6fr-lec-047 | **unknown** | **unknown** | **unknown** |
| `jupiter-opal-2024.jpg` | 26 KB | grade6-science/g6sci-enr-sol-005 | **unknown** | **unknown** | **unknown** |
| `lake-idro-italy-2005-08-16.jpg` | 60 KB | grade6-science/g6sci-enr-eco-007 | **unknown** | **unknown** | **unknown** |
| `lighthouse.jpg` | 11 KB | grade6-english/g6eng-voc-022 | **unknown** | **unknown** | **unknown** |
| `lightning.jpg` | 8 KB | grade4-history/g4ge-weather-020 | **unknown** | **unknown** | **unknown** |
| `loxodonta-africana.jpg` | 78 KB | grade4-english/g4eng-adj-020 | **unknown** | **unknown** | **unknown** |
| `magnifying-glass.jpg` | 38 KB | grade4-science/g4sci-enr-equ-004 | **unknown** | **unknown** | **unknown** |
| `maize-seeds-germination.jpg` | 115 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `mars-august-30-2021-flickr-kevin-m-gill.jpg` | 21 KB | grade6-science/g6sci-enr-sol-004 | **unknown** | **unknown** | **unknown** |
| `mauritius-kestrel-falco-punctatus-2.jpg` | 64 KB | grade5-science/g5sci-enr-end-006 | **unknown** | **unknown** | **unknown** |
| `mauritius-ornate-day-gecko-phelsuma-ornata.jpg` | 33 KB | grade4-science/g4sci-enr-ani-006 | **unknown** | **unknown** | **unknown** |
| `measuring-cylinder-hg.jpg` | 178 KB | grade4-science/g4sci-enr-equ-006 | **unknown** | **unknown** | **unknown** |
| `mercury-in-true-color.jpg` | 53 KB | grade6-science/g6sci-enr-sol-001 | **unknown** | **unknown** | **unknown** |
| `meteosat-12-fci-march-equinox-2025-noon.jpg` | 81 KB | grade6-science/g6sci-enr-sol-003 | **unknown** | **unknown** | **unknown** |
| `mountain.jpg` | 45 KB | grade5-french/g5fr-nom-040 | **unknown** | **unknown** | **unknown** |
| `neptune-voyager2-color-calibrated.jpg` | 11 KB | grade6-science/g6sci-enr-sol-008 | **unknown** | **unknown** | **unknown** |
| `notebook-writing-man-book-person-blur-1176206.jpg` | 29 KB | grade6-french/g6fr-lec-037 | **unknown** | **unknown** | **unknown** |
| `optical-microscope-nikon-alphaphot.jpg` | 72 KB | grade4-science/g4sci-enr-equ-005 | **unknown** | **unknown** | **unknown** |
| `pacific-ocean-as-viewed-from-goes-18-on-september-23-2023.jpg` | 102 KB | grade6-science/g6sci-enr-eco-006 | **unknown** | **unknown** | **unknown** |
| `palace-of-westminster-from-the-dome-on-methodist-central-hal.jpg` | 64 KB | grade6-english/g6eng-voc-020 | **unknown** | **unknown** | **unknown** |
| `pezophaps-solitaria.jpg` | 60 KB | grade5-science/g5sci-enr-end-003 | **unknown** | **unknown** | **unknown** |
| `photovoltaic-panels.jpg` | 90 KB | grade5-science/g5sci-enr-ene-005 | **unknown** | **unknown** | **unknown** |
| `pink-pigeon-nesoenas-mayeri-1.jpg` | 33 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `pink-pigeon-rwd2.jpg` | 43 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `portrait-of-zheng-he-published-about-1600.jpg` | 130 KB | grade4-history/g4enr-exp-021 | **unknown** | **unknown** | **unknown** |
| `prop-roots-of-maize-plant.jpg` | 53 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `pteropus-niger.jpg` | 24 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `rain.jpg` | 43 KB | grade5-french/g5fr-voc-041 | **unknown** | **unknown** | **unknown** |
| `rainbow.jpg` | 40 KB | grade4-english/g4eng-adj-026 | **unknown** | **unknown** | **unknown** |
| `red-apple.jpg` | 46 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `roof.jpg` | 13 KB | grade5-french/g5fr-nom-037 | **unknown** | **unknown** | **unknown** |
| `rub-al-khali-002.jpg` | 19 KB | grade6-science/g6sci-enr-eco-005 | **unknown** | **unknown** | **unknown** |
| `ruler.jpg` | 71 KB | grade4-english/g4eng-noun-028 | **unknown** | **unknown** | **unknown** |
| `running.jpg` | 34 KB | grade6-french/g6fr-lec-039 | **unknown** | **unknown** | **unknown** |
| `sailing-ship.jpg` | 67 KB | grade4-history/g4h-voy-024 | **unknown** | **unknown** | **unknown** |
| `saturn-global-view-from-cassini-rings-open-better-colour.jpg` | 9 KB | grade6-science/g6sci-enr-sol-006 | **unknown** | **unknown** | **unknown** |
| `scene-marche.jpg` | 183 KB | 10 questions | **unknown** | **unknown** | **unknown** |
| `scene-plage.jpg` | 186 KB | 10 questions | **unknown** | **unknown** | **unknown** |
| `scene-plantation.jpg` | 73 KB | 10 questions | **unknown** | **unknown** | **unknown** |
| `scissors.jpg` | 14 KB | grade4-english/g4eng-noun-029 | lead: [File:Scissors.jpg](https://commons.wikimedia.org/wiki/File:Scissors.jpg) — CC BY-SA 3.0 | **unknown** | **unknown** |
| `seewoosagur-ramgoolam-1970.jpg` | 82 KB | grade6-history/g6enr-per-020 | **unknown** | **unknown** | **unknown** |
| `simple-photosynthesis-overview.png` | 53 KB | 2 questions | **unknown** | **unknown** | **unknown** |
| `singing.jpg` | 62 KB | grade6-french/g6fr-lec-043 | weak lead: [File:Singing.jpg](https://commons.wikimedia.org/wiki/File:Singing.jpg) — CC BY-SA 4.0 | **unknown** | **unknown** |
| `sleeping.jpg` | 12 KB | grade6-french/g6fr-lec-042 | weak lead: [File:Sleeping.jpg](https://commons.wikimedia.org/wiki/File:Sleeping.jpg) — Public domain | **unknown** | **unknown** |
| `smiling.jpg` | 29 KB | grade6-french/g6fr-lec-048 | weak lead: [File:Smiling.jpg](https://commons.wikimedia.org/wiki/File:Smiling.jpg) — CC BY 2.0 | **unknown** | **unknown** |
| `solar-panels.jpg` | 62 KB | grade5-science/g5sci-enr-ene-001 | weak lead: [File:Solar panels.jpg](https://commons.wikimedia.org/wiki/File:Solar_panels.jpg) — CC BY-SA 3.0 | **unknown** | **unknown** |
| `sonneratia-alba-manado-2.jpg` | 116 KB | grade6-science/g6sci-enr-eco-002 | **unknown** | **unknown** | **unknown** |
| `spring-balance.jpg` | 18 KB | grade4-science/g4sci-enr-equ-007 | **unknown** | **unknown** | **unknown** |
| `swimming-pool.jpg` | 59 KB | grade6-french/g6fr-lec-040 | **unknown** | **unknown** | **unknown** |
| `tarangire-natpark800600.jpg` | 62 KB | grade6-science/g6sci-enr-eco-004 | **unknown** | **unknown** | **unknown** |
| `the-sun-in-white-light.jpg` | 31 KB | grade6-science/g6sci-enr-sol-010 | **unknown** | **unknown** | **unknown** |
| `thermal-power-station.jpg` | 34 KB | grade5-science/g5sci-enr-ene-004 | **unknown** | **unknown** | **unknown** |
| `thermometer.jpg` | 150 KB | grade5-english/g5eng-voc-024 | **unknown** | **unknown** | **unknown** |
| `trochetia-boutoniana-flower.jpg` | 58 KB | grade5-science/g5sci-enr-end-005 | **unknown** | **unknown** | **unknown** |
| `tropical-rainforest-agumbe.jpg` | 108 KB | grade5-science/g5sci-an-022 | **unknown** | **unknown** | **unknown** |
| `turtle.jpg` | 43 KB | grade4-english/g4eng-noun-031 | **unknown** | **unknown** | **unknown** |
| `uranus-voyager2-color-calibrated.jpg` | 11 KB | grade6-science/g6sci-enr-sol-007 | **unknown** | **unknown** | **unknown** |
| `venus-from-mariner-10.jpg` | 18 KB | grade6-science/g6sci-enr-sol-002 | **unknown** | **unknown** | **unknown** |
| `volcano.jpg` | 132 KB | grade5-history/g5hg-vol-024 | **unknown** | **unknown** | **unknown** |
| `weather-station-rain-gauge.jpg` | 47 KB | grade4-science/g4sci-enr-equ-002 | **unknown** | **unknown** | **unknown** |
| `wind-turbines-8426360101.jpg` | 45 KB | grade5-science/g5sci-enr-ene-002 | **unknown** | **unknown** | **unknown** |
| `window.jpg` | 27 KB | grade4-french/g4fr-nom-036 | **unknown** | **unknown** | **unknown** |
| `wooden-table.jpg` | 103 KB | grade4-french/g4fr-nom-038 | **unknown** | **unknown** | **unknown** |

## Not referenced by any question

_None — every image on disk is referenced by at least one question._

---

Generated from the files on disk and the built question bundles. Re-run the trace
if images are added; do not hand-edit the counts above without re-checking them.

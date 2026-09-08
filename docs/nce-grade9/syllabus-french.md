# Grade 9 — Le français · NCF/TLS Grades 7–9 syllabus map

**Source** `past-papers/syllabus/NCF 7 to 9_230524.pdf` (330 pages, Adobe InDesign 19.1, 2024-05-23).

## Page offset — measured, not assumed

The printed contents page (PDF page 5) lists **Le français 14** and **Mathematics 24**.

| | printed | PDF | how verified |
|---|---|---|---|
| French section starts (`2.0 FRENCH`) | 14 | **20** | rendered PDF p.20 at 150 dpi; heading `2.0 FRENCH` at top, footer reads `14` |
| French section ends (Littérature table) | 23 | **29** | rendered; footer reads `23` |
| Mathematics starts (`3.0 MATHEMATICS`) | 24 | **30** | rendered; heading present |
| English grammar table (previous section) | 13 | 19 | rendered; `Grammar Items / Grade 7 / Grade 8 / Grade 9`, footer `13` |

**Measured offset = +6** (PDF page = printed page + 6). Constant across every page checked.

**Pages visually inspected: 10** — the whole French section, PDF pages 20–29 (printed 14–23),
every one rendered to PNG at 150 dpi and read as an image. PDF page 22 (printed 16, the Grade 9
grammar list) was re-rendered at **300 dpi** to confirm no sub-items were lost at the smaller size.
Text extraction was used only to locate section boundaries and to sweep the other 320 pages for a
French grammar appendix — see "The grammar detail does not exist" below.

## How the document distinguishes Grades 7, 8 and 9

Two separate mechanisms, and both must be read:

1. **§2.2 "Les résultats d'apprentissage escomptés"** (printed 14–16 / PDF 20–22) gives **three
   separate end-of-grade lists**, numbered `1. À la fin de Grade 7`, `2. À la fin de Grade 8`,
   `3. À la fin de Grade 9`. Each is followed by its own list headed
   *"Que l'apprenant parvienne à comprendre les éléments de grammaire suivants:"*. Grade 9's lists
   are entirely on printed page 16 / PDF page 22.
2. **§2.3 "Teaching and Learning Syllabus, Langue et littérature françaises (7-9)"** (printed
   17–23 / PDF 23–29) is a four-column table — `Objectifs d'apprentissage | Compétences | 7 | 8 | 9` —
   where the grade columns are **shaded, not ticked**, in two tones:
   - **solid gold** = the grade at which the objective is introduced / taught;
   - **pale cream** = later grades, where it is carried forward and consolidated;
   - **white/blank** = not applicable at that grade.

   So a Grade 9 objective is any row whose column 9 is shaded at all; a row with **solid gold in
   column 9 only** is new at Grade 9. ⚠ This two-tone convention is invisible to `pdftotext` — the
   extraction gives the objective text with no grade attribution whatsoever. It is the single reason
   this map had to be built from page images.

   Exception: the **Littérature** table (printed 23 / PDF 29) uses **one tone only** — shaded or blank.

## The four strands, plus Littérature

Objectives are prefixed in the source: **CO** = compréhension orale, **EO** = expression orale,
**EÉ** = expression écrite, **CÉ** = compréhension écrite. §2.1 names these as
"les quatre compétences communicationnelles". Littérature is a fifth, separately-headed table.

**Grade 9 content areas: 5** (CO, EO, EÉ, CÉ, Littérature) — carrying **17 objectives introduced at
Grade 9** and a further **39 carried forward** from Grades 7–8, plus **9 numbered Littérature
objectives** all of which are live at Grade 9.

---

## 1. CO — Compréhension orale ⚠ ORAL

Introduced at Grade 9 (solid gold in column 9 only, printed 18 / PDF 24) — **3**:

| Objectif | Compétence (source, abridged) |
|---|---|
| Relever et comprendre le vocabulaire d'usage | identifier et anticiper les mots/expressions relevant d'un vocabulaire d'usage |
| Préciser les éléments du schéma de la communication | nommer destinateur, destinataire, message et contexte |
| Suivre des discussions entre plusieurs locuteurs | suivre et comprendre des échanges verbaux entre plusieurs locuteurs |

Carried forward into Grade 9 (printed 17 / PDF 23) — **7**: écouter avec attention une variété de
textes et différencier les types de textes écoutés · dégager du sens et identifier les paramètres de
la communication (locuteur, interlocuteur, message; **indices déictiques** renvoyant au contexte
d'énonciation) · démontrer son appréciation des textes écoutés (sentiment exprimé par l'intonation) ·
suivre des conversations · comprendre le lexique spécifique au texte **par inférence** · suivre des
discussions entre plusieurs locuteurs (document sonore/audiovisuel) · différencier les types de
textes écoutés (reportages, documentaires, chansons, films, émissions de radio).

Proposed subsection ids: `schema_communication`, `indices_deictiques`, `types_textes_ecoutes`,
`locuteur_interlocuteur`, `lexique_inference`, `echanges_plusieurs_locuteurs`, `intonation_sentiment`.

⚠ **Not assessable on a written paper.** Every one of these needs an audio stimulus. See the flag
section at the end.

## 2. EO — Expression orale ⚠ ORAL

Introduced at Grade 9 (printed 19 / PDF 25) — **6**:

| Objectif | Compétence (source, abridged) |
|---|---|
| Présenter son opinion sur un sujet d'actualité et l'argumenter avec conviction | mettre en avant des arguments qui puissent convaincre |
| Défendre son point de vue avec un/plusieurs locuteurs | soutenir et défendre son opinion |
| Être capable de résoudre une situation de la vie quotidienne | résoudre à l'oral |
| Utiliser un lexique riche et soutenu en fonction du sujet traité | vocabulaire riche et soutenu |
| Produire des énoncés grammaticalement et sémantiquement corrects en utilisant des **phrases composées** | phrases composées qui font sens |
| Faire un compte-rendu d'un texte avec créativité et expressivité | donner les points saillants d'un texte à l'oral |

Carried forward — **9**: lire avec aisance en variant intonation/rythme (prosodie: intonation, rythme,
débit) · s'exprimer avec confiance sur soi et son environnement immédiat · utiliser un lexique
approprié · produire des énoncés corrects en **phrases simples** · lire à voix haute avec assurance
une variété de textes · converser clairement avec un locuteur sur des sujets le concernant · traiter
une problématique de la vie quotidienne et réagir · utiliser un lexique approprié et plus étendu ·
produire des énoncés corrects en phrases composées (introduced G8).

Proposed subsection ids: `opinion_argumentee`, `debat_point_de_vue`, `compte_rendu_oral`,
`situation_quotidienne`, `lexique_soutenu_oral`, `phrases_composees_oral`, `prosodie_lecture`.

⚠ **Not assessable on a written paper at all** — this strand is production of speech.

## 3. EÉ — Expression écrite ✅ WRITTEN

Introduced at Grade 9 (printed 21 / PDF 27) — **4**:

| Objectif | Compétence (source, abridged) |
|---|---|
| Écrire en faisant preuve d'une **sensibilité à la langue** et en employant quelques **procédés d'écriture** | utiliser des **pronoms et des reprises nominales**, des **connecteurs logiques**, des **formes verbales dominantes**… |
| Employer un lexique riche et soutenu | vocabulaire riche, **registre soutenu** |
| Faire preuve d'une logique d'**anticipation** et de **réécriture** d'un texte | anticiper un texte et pouvoir le réécrire |
| Produire seul(e) et/ou en groupe des textes **informatifs, scientifiques et fonctionnels** divers | — |

⚠ The first row is the **only place in the entire French section** that names a concrete grammatical
mechanism against a Grade 9 objective. Its three named devices — reprises nominales / connecteurs
logiques / formes verbales dominantes — are the firmest ground in the document for writing Grade 9
written-paper items.

Carried forward — **13**: écrire lisiblement et de manière soignée · répondre en écrit à des questions ·
construire des phrases en respectant la **syntaxe** · produire des phrases en tenant compte du
**système verbal**, des règles d'**orthographe lexicale et grammaticale** et des **signes de
ponctuation** (critères de la textualité) · employer le lexique approprié au sujet · expliquer des
mots/expressions et donner un sens aux phrases · écrire en fonction de diverses situations de
communication · produire des textes courts originaux et créatifs · manifester une **compréhension par
inférence grammaticale et lexicale** · dégager le sens, organiser les idées et les transposer à l'écrit ·
utiliser un lexique approprié et plus étendu · résumer les éléments clés de divers textes et/ou donner
son opinion · produire des textes **fonctionnels** divers.

Proposed subsection ids: `procedes_ecriture`, `reprises_nominales`, `connecteurs_logiques`,
`formes_verbales`, `registre_soutenu`, `reecriture_anticipation`, `texte_informatif`,
`texte_fonctionnel`, `texte_argumentatif`, `resume_synthese`, `orthographe_grammaticale`,
`ponctuation`, `syntaxe_phrase`, `organisation_idees`.

## 4. CÉ — Compréhension écrite ✅ WRITTEN

Introduced at Grade 9 (printed 22 / PDF 28) — **4**:

| Objectif | Compétence (source, abridged) |
|---|---|
| Apprécier une variété de textes | démontrer son appréciation des différents types de textes |
| Lire et faire preuve d'un esprit d'**analyse et de synthèse** | lire, comprendre, analyser, puis faire une synthèse |
| **Internaliser le traitement des mots** | comprendre le traitement des mots dans un texte écrit |
| Manifester sa capacité à **réagir** à un texte | prendre position, s'identifier à un personnage ou une situation |

Carried forward — **10**: identifier certains types de textes (poèmes, lettres, romans, articles de
presse) · manipuler les livres et en distinguer les parties (couverture, titre, quatrième de
couverture, table des matières, préface) · lire une variété de textes et les comprendre · relever les
différents types de vocabulaire employés · comparer et analyser les types de production écrite et les
**registres de langue** · dégager l'idée principale et trouver des informations spécifiques ·
reconnaître les types de production écrite · développer une capacité à lire de différentes façons
(stratégies de lecture) · repérer un vocabulaire usuel · manifester une compréhension des textes.

Proposed subsection ids: `types_de_textes`, `idee_principale`, `informations_specifiques`,
`registres_de_langue`, `strategies_lecture`, `analyse_synthese`, `traitement_des_mots`,
`reaction_au_texte`, `parties_du_livre`, `vocabulaire_en_contexte`, `appreciation_texte`.

## 5. Littérature ✅ MOSTLY WRITTEN

Printed 23 / PDF 29. Single-tone table; **all 9 numbered objectives are shaded at Grade 9**.
New at Grade 9 (column 9 shaded, 7 and 8 blank):

| # | Objectif | Compétences shaded at G9 only |
|---|---|---|
| 6 | Découvrir le monde de la bande dessinée | identifier les différents **types** de BD (mangas, BD animalières…) |
| 7 | Découvrir le **texte dramatique** | identifier la forme d'une pièce · composantes du théâtre (**scène d'exposition, monologue, aparté, didascalies**) · étudier la chronologie d'une pièce |
| 8 | Comprendre le fonctionnement de la **fable** | étudier le rôle des personnages · identifier le **message et la morale** |
| 9 | Analyser différents types de textes relevant de différents genres littéraires | utiliser les **outils pour l'analyse littéraire de base** |

Carried forward — items 1–5 and the first parts of 6: reconnaître et classer les textes par types et
**genres littéraires** · écouter/visionner des textes littéraires (contes, BD, dessins animés, fables,
théâtre) et identifier les **sonorités** (ton, débit, rythme, intonation) ⚠oral · découvrir l'intention
du locuteur, sentiments et émotions · faire un **compte rendu oral** ⚠oral (expliquer ce qui a été
compris, donner ses impressions, manifester de l'empathie) · comprendre les **composantes du récit**
(contes et nouvelles): composantes de l'action, personnages principaux/secondaires, idées principales,
**éléments de l'énonciation** (Qui parle ? À qui ? Quand ? Où ?), rôle des personnages et leurs
relations, **chronologie du récit** · identifier une BD et ses composantes (**bulles, vignettes,
planches**).

Proposed subsection ids: `genres_litteraires`, `schema_narratif`, `schema_actantiel`,
`composantes_recit`, `personnages`, `enonciation`, `chronologie_recit`, `bande_dessinee`,
`texte_dramatique`, `fable_morale`, `analyse_litteraire`, `conte_nouvelle`.

⚠ Item 2's second competency and the whole of item 4 are oral/audio-visual.

---

## GRAMMAIRE — what the syllabus actually specifies

### The Grade 9 list, verbatim (printed 16 / PDF 22, verified at 300 dpi)

> *Que l'apprenant parvienne à comprendre les éléments de grammaire suivants:*
> - Classes grammaticales
> - Connecteurs
> - Déterminants
> - Nature et fonction
> - Propositions subordonnées
> - Verbes

**That is the complete Grade 9 grammar specification. Six category headings, no sub-items.**

### ⚠ The grammar detail does not exist in this document

The brief asked for "which temps and modes (présent, imparfait, passé composé, futur simple,
conditionnel, subjonctif…), which pronoun types, which accords, which connecteurs, which prepositions,
which determinants". **The NCF/TLS does not say.** This is a property of the source, not an
extraction failure. Evidence, in order of strength:

1. The Grade 9 page was rendered at 300 dpi and read as an image. The list ends at "Verbes"; the rest
   of the page is blank. No sub-bullets, no small print, no continuation.
2. A full-document text sweep for `subjonctif`, `imparfait`, `passé composé`, `futur simple`,
   `conditionnel`, `plus-que-parfait`, `impératif`, `préfixe`, `suffixe`, `famille de mots` returns
   **zero hits anywhere in the 330 pages**. `pronom` appears in the French section only on printed 15
   (the Grade 7 category list) and printed 21 (the EÉ "procédés d'écriture" competency); its other
   hits are in the **Kreol Morisien** section (PDF 290–291). `suffixe` hits only English (printed 10)
   and **Arabic** (PDF 270). `accord` elsewhere is English "in accordance with".
3. There is no French grammar appendix. The contents page lists one French entry (printed 14) and the
   next subject at printed 24; the section is 10 pages and all 10 were read.
4. Contrast with English in the same document: printed 9–13 carry a real
   `Grammar Items | Grade 7 | Grade 8 | Grade 9` table naming specific items per grade
   (e.g. punctuation at Grade 9: "Use the comma before and after non-defining clauses").
   **French has no equivalent table.** The asymmetry is in the source.

**Consequence for this project.** The vagueness recorded in `CLAUDE.md` pending item 8 ("verbs,
modals, pronouns and prepositions were written at a deliberately general level") is **not** a
pdftotext column-interleaving artefact for French — it faithfully reflects a syllabus that specifies
categories only. Writing Grade 9 French grammar questions therefore needs a **second source** (a past
NCE paper, or the MIE Grade 9 textbook), not a re-reading of this PDF. Do not invent a tense list and
attribute it to the NCF.

### The progression, which is the one thing the document does give

Reading the three per-grade lists together (printed 15, 15, 16) shows the categories **collapsing
upward** as they are internalised — Grade 9 is not "fewer topics", it is the same language described
at a higher level of abstraction:

| Grade 7 (15 items) | Grade 8 (9 items) | Grade 9 (6 items) |
|---|---|---|
| Adjectifs qualificatifs · Adverbes · Articles · Pronoms · Déterminants · Verbes | *(subsumed)* | **Classes grammaticales** |
| Attribut du sujet · COD · COI | Attribut du COD et du sujet · **COS** (et par ricochet COD et COI) · Complément du nom · **Nature et fonction** | **Nature et fonction** |
| Types de phrases · Voix active et passive · Genre et nombre · Ponctuation | **Propositions** | **Propositions subordonnées** |
| Comparatif et superlatif | Comparatif et superlatif | *(absorbed)* |
| **Connecteurs** | **Connecteurs** | **Connecteurs** |
| **Déterminants** | **Déterminants** | **Déterminants** |
| **Verbes** | **Verbes** | **Verbes** |

Three categories — Connecteurs, Déterminants, Verbes — are named at **all three grades**. They are the
spine of the language strand and the safest place to start authoring, provided the specific content
comes from a paper rather than from here.

Proposed grammar subsection ids: `classes_grammaticales`, `nature_fonction`,
`propositions_subordonnees`, `connecteurs`, `determinants`, `verbes`, `accords`, `pronoms`,
`voix_passive`, `ponctuation`.
⚠ `accords`, `pronoms`, `voix_passive` and `ponctuation` are **inferred continuations** of Grade 7–8
categories, not Grade 9 headings. Flag them as such if they are ever declared.

## VOCABULAIRE and word formation

**There is no préfixes / suffixes / familles de mots specification for French anywhere in this
document** — see evidence point 2 above. What the syllabus does say about lexis, as a graded ladder
across the four strands:

| Level | Where it appears | Grade introduced |
|---|---|---|
| **vocabulaire d'usage** — identifier et anticiper les mots/expressions | CO (printed 18) | **9** |
| **lexique approprié** — mots qui conviennent à la situation ou au thème | EO, EÉ (printed 18, 20) | 7 |
| **lexique approprié et plus étendu** | EO, EÉ (printed 19, 20) | 8 |
| **lexique riche et soutenu** / **registre soutenu** | EO, EÉ (printed 19, 21) | **9** |
| **lexique spécifique au texte**, compris **par inférence** | CO (printed 17) | 8 |
| **compréhension par inférence grammaticale et lexicale** | EÉ (printed 20) | 8 |
| **registres de langue** présents dans un texte | CÉ (printed 22) | 7 |
| **traitement des mots** dans un texte écrit ("internaliser") | CÉ (printed 22) | **9** |
| expliquer des mots/expressions et donner un sens aux phrases | EÉ (printed 20) | 7 |

The Grade 9 vocabulary expectation is therefore **register**, not morphology: moving from *approprié*
→ *plus étendu* → *riche et soutenu*, plus inference from context and the ability to name the register
a text is written in. `traitement des mots` (printed 22, Grade 9) is the closest the document comes to
word-formation and it is not defined further.

Proposed subsection ids: `vocabulaire_usage`, `lexique_soutenu`, `registres_de_langue`,
`sens_en_contexte`, `synonymes_antonymes`, `traitement_des_mots`.
⚠ `synonymes_antonymes` is an inference, not a syllabus heading.

---

## ⚠ Assessable on a written paper — the flag

`CLAUDE.md` records that two existing chapters carry exam weight for oral skills a written paper never
tests. This syllabus is the reason: **two of its five strands are oral by definition**, and the
document weights them equally with the written two.

| Chapter | `examWeight` | Written paper can test it? |
|---|---|---|
| `g9fr-co` Compréhension orale | 3 | ❌ **No** — every objective needs an audio or audio-visual stimulus |
| `g9fr-eo` Expression orale | 3 | ❌ **No** — production of speech; prosodie, débit, conversation, débat |
| `g9fr-ce` Compréhension écrite | 4 | ✅ Yes |
| `g9fr-ee` Expression écrite | 4 | ⚠ Partly — gap-fill, réécriture and grammar are testable; a full rédaction is not auto-gradable |
| `g9fr-litterature` Littérature | 2 | ⚠ Mostly — objectives 2 (sonorités) and 4 (compte rendu **oral**) are oral |

**6 of 16 weight points (37.5%) sit on skills this app cannot assess**, and a further slice of
Littérature. Options, in order of honesty: drop `examWeight` to 0 for `g9fr-co`/`g9fr-eo`; or
re-scope them as *transcript* comprehension and rename accordingly; or keep them as syllabus-only
chapters with no exam presence. ⚠ Note the trap recorded in `CLAUDE.md`: `examWeight: 0` does **not**
keep a chapter out of an exam — `assembleExamPaper()` clamps with `Math.max(1, …)`. A chapter with no
poolable question and no generator is now dropped, but a chapter with a few is not. Deciding this is a
content decision, not a config change.

Two further oral-only items hide inside a written-looking chapter: Littérature objective 2's
"identifier les sonorités (ton, débit, rythme, intonation)" and objective 4 "Faire un compte rendu
**oral**" (three competencies). Do not tag them into `g9fr-litterature` subsections without a note.

---

## Mapping — syllabus area → existing chapters

`subjects/grade9-french/_manifest.js` (read, not modified) declares **5 chapters** and
`G9FR_SYLLABUS = {}` — deliberately empty, no subsections declared.

| Syllabus content area (Grade 9) | Existing chapter | Fit | Note |
|---|---|---|---|
| CO — Compréhension orale (10 objectives live at G9) | `g9fr-co` | ✅ direct | Chapter prose already names indices déictiques, échanges entre plusieurs locuteurs, lexique par inférence — accurate. ⚠ oral |
| EO — Expression orale (15 live) | `g9fr-eo` | ✅ direct | Prose names opinion, arguments, compte-rendu, lexique riche — accurate. ⚠ oral |
| CÉ — Compréhension écrite (14 live) | `g9fr-ce` | ✅ direct | ⚠ "comparer les points de vue exprimés dans **plusieurs** textes" is not in the source — the source says compare **types de textes** and **registres de langue**. Minor drift |
| EÉ — Expression écrite (17 live) | `g9fr-ee` | ✅ direct | ⚠ Prose omits the single most usable Grade 9 item: **procédés d'écriture** (reprises nominales, connecteurs logiques, formes verbales dominantes) and **réécriture / anticipation** |
| Littérature (9 objectives) | `g9fr-litterature` | ⚠ partial | Prose says "procédés d'écriture" and "apprécier une œuvre". The source's Grade 9 additions are specific: **texte dramatique** (scène d'exposition, monologue, aparté, didascalies), **fable** (message, morale), **types de BD**, **outils d'analyse littéraire**. None are named |
| **Grammaire / éléments de langue** (6 categories, §2.2) | **— none —** | ❌ **MISSING** | The largest gap. Classes grammaticales, Nature et fonction, Propositions subordonnées, Connecteurs, Déterminants, Verbes have **no chapter at all** — and this is the part a written paper tests best |
| **Vocabulaire / lexique et registres** | **— none —** | ❌ **MISSING** | Spread across all four strands in the source; nothing in the pack collects it. Written-testable |

**Syllabus areas with no chapter: 2** — Grammaire, Vocabulaire/registres.
**Chapters with no syllabus area: 0** — all five map to a real strand.
**Chapters whose syllabus prose understates the source: 2** — `g9fr-ee`, `g9fr-litterature`.

### Suggested shape, if chapters are ever added

Nothing below is a change to the manifest; it is a proposal.

- `g9fr-grammaire` — `classes_grammaticales`, `nature_fonction`, `propositions_subordonnees`,
  `connecteurs`, `determinants`, `verbes`. ⚠ Content must come from an NCE paper or the MIE Grade 9
  textbook; this PDF names the categories and nothing inside them.
- `g9fr-vocabulaire` — `vocabulaire_usage`, `lexique_soutenu`, `registres_de_langue`,
  `sens_en_contexte`, `traitement_des_mots`.

⚠ Per the project's subsection invariant, declare an id only once questions are tagged with it —
a declared id with no questions behind it opens an empty screen, and
`scripts/test-subsection-invariant.js` fails the build on the mismatch. `G9FR_SYLLABUS` is empty today
for exactly that reason; keep it empty until items exist.

## What could not be read

Nothing. All 10 pages of the French section rendered cleanly at 150 dpi; the one page carrying the
Grade 9 grammar list was re-checked at 300 dpi. No table in the section was illegible, and no cell
required a re-render beyond that.

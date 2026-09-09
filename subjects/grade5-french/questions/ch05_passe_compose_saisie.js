'use strict';
// Grade 5 French — Passé composé : saisie libre
// The child TYPES the full verb form (auxiliaire + participe passé).
// Accents are marked leniently: typing "ai mange" for "ai mangé" is
// accepted with a nudge showing the correct spelling.
// IDs: g5fr-pcs-001 to g5fr-pcs-020

STATIC_QUESTIONS.push(

  // ── Avoir — regular verbs (difficulty 1) ─────────────────────────────────

  makeText({ id:'g5fr-pcs-001', chapterId:'fr-passe-compose', subsection:'formation', difficulty:1,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Hier, tu ___ au football. » (jouer)',
    answer:'as joué',
    hint:'Sujet = tu → avoir : tu as. Jouer → participe passé : joué.',
    explanation:'On écrit <b>as joué</b>. Le passé composé = avoir conjugué (tu → as) + participe passé (jouer → joué).' }),

  makeText({ id:'g5fr-pcs-002', chapterId:'fr-passe-compose', subsection:'formation', difficulty:1,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Hier, j\'___ une mangue. » (manger)',
    answer:'ai mangé',
    hint:'Sujet = je → avoir : j\'ai. Manger → participe passé : mangé.',
    explanation:'On écrit <b>ai mangé</b>. Le passé composé = avoir (je → ai) + participe passé (manger → mangé).' }),

  makeText({ id:'g5fr-pcs-003', chapterId:'fr-passe-compose', subsection:'formation', difficulty:1,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Elle ___ ses devoirs avant le dîner. » (finir)',
    answer:'a fini',
    hint:'Sujet = elle → avoir : a. Finir → participe passé : fini.',
    explanation:'On écrit <b>a fini</b>. Finir (verbe en -IR) → participe passé = fini. Elle a fini ses devoirs.' }),

  makeText({ id:'g5fr-pcs-004', chapterId:'fr-passe-compose', subsection:'formation', difficulty:1,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Nous ___ un film hier soir. » (regarder)',
    answer:'avons regardé',
    hint:'Sujet = nous → avoir : avons. Regarder → participe passé : regardé.',
    explanation:'On écrit <b>avons regardé</b>. Nous avons regardé un film hier soir.' }),

  makeText({ id:'g5fr-pcs-005', chapterId:'fr-passe-compose', subsection:'formation', difficulty:1,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Vous ___ un livre à la bibliothèque. » (choisir)',
    answer:'avez choisi',
    hint:'Sujet = vous → avoir : avez. Choisir → participe passé : choisi.',
    explanation:'On écrit <b>avez choisi</b>. Choisir (verbe en -IR) → participe passé = choisi. Vous avez choisi un livre.' }),

  // ── Avoir — irregular verbs (difficulty 2) ────────────────────────────────

  makeText({ id:'g5fr-pcs-006', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Ils ___ leurs devoirs. » (faire)',
    answer:'ont fait',
    hint:'Sujet = ils → avoir : ont. Faire → participe passé IRRÉGULIER : fait.',
    explanation:'On écrit <b>ont fait</b>. Faire → fait (irrégulier, à apprendre). Ils ont fait leurs devoirs.' }),

  makeText({ id:'g5fr-pcs-007', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« J\'___ un arc-en-ciel. » (voir)',
    answer:'ai vu',
    hint:'Sujet = je → avoir : ai. Voir → participe passé IRRÉGULIER : vu.',
    explanation:'On écrit <b>ai vu</b>. Voir → vu (irrégulier). Autres en -u : lire → lu, boire → bu, savoir → su.' }),

  makeText({ id:'g5fr-pcs-008', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Elle ___ une lettre à sa correspondante. » (écrire)',
    answer:'a écrit',
    hint:'Sujet = elle → avoir : a. Écrire → participe passé IRRÉGULIER : écrit.',
    explanation:'On écrit <b>a écrit</b>. Écrire → écrit (irrégulier). Elle a écrit une lettre.' }),

  makeText({ id:'g5fr-pcs-009', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Il ___ beaucoup d\'eau. » (boire)',
    answer:'a bu',
    hint:'Sujet = il → avoir : a. Boire → participe passé IRRÉGULIER : bu.',
    explanation:'On écrit <b>a bu</b>. Boire → bu (irrégulier). Il a bu beaucoup d\'eau.' }),

  makeText({ id:'g5fr-pcs-010', chapterId:'fr-passe-compose', subsection:'participe', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Nous ___ ce livre en classe. » (lire)',
    answer:'avons lu',
    hint:'Sujet = nous → avoir : avons. Lire → participe passé IRRÉGULIER : lu.',
    explanation:'On écrit <b>avons lu</b>. Lire → lu (irrégulier). Nous avons lu ce livre en classe.' }),

  // ── Être — singular (difficulty 2) ───────────────────────────────────────

  makeText({ id:'g5fr-pcs-011', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Mon frère ___ tôt ce matin. » (partir)',
    answer:'est parti',
    hint:'"Partir" utilise ÊTRE. Sujet = mon frère (masculin singulier) → participe passé sans accord : parti.',
    explanation:'On écrit <b>est parti</b>. Partir → être. Mon frère (masc. sing.) → est parti. Attention : pas d\'accord avec "avoir".' }),

  makeText({ id:'g5fr-pcs-012', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Il ___ au marché samedi matin. » (aller)',
    answer:'est allé',
    hint:'"Aller" utilise ÊTRE. Sujet = il (masculin singulier) → allé.',
    explanation:'On écrit <b>est allé</b>. Aller → être. Il est allé au marché samedi matin.' }),

  makeText({ id:'g5fr-pcs-013', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Ma sœur ___ de l\'école. » (revenir)',
    answer:'est revenue',
    hint:'"Revenir" utilise ÊTRE. Sujet = ma sœur (féminin singulier) → participe passé accordé : revenue.',
    explanation:'On écrit <b>est revenue</b>. Revenir → être. Accord féminin singulier : revenu + e = revenue.' }),

  makeText({ id:'g5fr-pcs-014', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« La voisine ___ pour la France. » (partir)',
    answer:'est partie',
    hint:'"Partir" utilise ÊTRE. Sujet = la voisine (féminin singulier) → partie.',
    explanation:'On écrit <b>est partie</b>. Partir → être. Féminin singulier : parti + e = partie.' }),

  makeText({ id:'g5fr-pcs-015', chapterId:'fr-passe-compose', subsection:'formation', difficulty:2,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Ta voisine ___ à la fête. » (venir)',
    answer:'est venue',
    hint:'"Venir" utilise ÊTRE. Sujet = ta voisine (féminin singulier) → venue.',
    explanation:'On écrit <b>est venue</b>. Venir → être. Féminin singulier : venu + e = venue.' }),

  // ── Être — plural agreement (difficulty 3) ────────────────────────────────

  makeText({ id:'g5fr-pcs-016', chapterId:'fr-passe-compose', subsection:'accord', difficulty:3,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Les garçons ___ dans le jardin. » (tomber)',
    answer:'sont tombés',
    hint:'"Tomber" utilise ÊTRE. Sujet = les garçons (masculin pluriel) → participe passé accordé : tombés.',
    explanation:'On écrit <b>sont tombés</b>. Tomber → être. Masculin pluriel : tombé + s = tombés.' }),

  makeText({ id:'g5fr-pcs-017', chapterId:'fr-passe-compose', subsection:'accord', difficulty:3,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Les filles ___ à la bibliothèque. » (aller)',
    answer:'sont allées',
    hint:'"Aller" utilise ÊTRE. Sujet = les filles (féminin pluriel) → participe passé accordé : allées.',
    explanation:'On écrit <b>sont allées</b>. Aller → être. Féminin pluriel : allé + es = allées.' }),

  makeText({ id:'g5fr-pcs-018', chapterId:'fr-passe-compose', subsection:'accord', difficulty:3,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Elles ___ à Maurice. » (naître)',
    answer:'sont nées',
    hint:'"Naître" utilise ÊTRE. Sujet = elles (féminin pluriel) → nées.',
    explanation:'On écrit <b>sont nées</b>. Naître → être. Féminin pluriel : né + es = nées.' }),

  // ── Mixed — harder (difficulty 3) ─────────────────────────────────────────

  makeText({ id:'g5fr-pcs-019', chapterId:'fr-passe-compose', subsection:'accord', difficulty:3,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Mon frère et moi, nous ___ à la plage samedi. » (aller)<br><em>(Celui qui parle est un garçon.)</em>',
    answer:'sommes allés',
    hint:'"Aller" utilise ÊTRE. Sujet = nous (deux garçons → masculin pluriel) → allés.',
    explanation:'On écrit <b>sommes allés</b>. Deux garçons = masculin pluriel → allés. Si c\'était deux filles : sommes allées.' }),

  makeText({ id:'g5fr-pcs-020', chapterId:'fr-passe-compose', subsection:'accord', difficulty:3,
    question:'Écris la forme correcte du passé composé dans la phrase :<br>« Ma sœur et moi, nous ___ tôt ce matin. » (partir)<br><em>(Celle qui parle est une fille.)</em>',
    answer:'sommes parties',
    hint:'"Partir" utilise ÊTRE. Sujet = nous (deux filles → féminin pluriel) → parties.',
    explanation:'On écrit <b>sommes parties</b>. Deux filles = féminin pluriel : parti + es = parties.' }),

);

'use strict';
// Grade 4 French - L\'Imparfait
// IDs format: g4fr-imparfait-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4fr-imparfait-001', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:1,
    question:'L\'imparfait est utilisé pour décrire…',
    options:['une action terminée précise','une action habituelle ou continue dans le passé','une action future','une action au présent'],
    answer:'une action habituelle ou continue dans le passé',
    hint:'L\'imparfait = durée, habitude, description dans le passé.',
    explanation:'L\'<b>imparfait</b> exprime : une action <b>habituelle</b> dans le passé (Chaque matin, je mangeais…), une description ou un état (Il faisait beau), ou une action <b>continue</b> (Je lisais quand…). Le passé composé exprime une action terminée à un moment précis.' }),

  makeMCQ({ id:'g4fr-imparfait-002', chapterId:'g4fr-imparfait', subsection:'terminaisons', difficulty:1,
    question:'Quelle est la terminaison de l\'imparfait pour "je" ?',
    options:['-ais','-ait','-ions','-ant'],
    answer:'-ais',
    hint:'Imparfait : je _ais, tu _ais, il _ait, nous _ions, vous _iez, ils _aient.',
    explanation:'Terminaisons de l\'imparfait : je <b>-ais</b>, tu <b>-ais</b>, il/elle <b>-ait</b>, nous <b>-ions</b>, vous <b>-iez</b>, ils/elles <b>-aient</b>. Le radical vient de la forme "nous" au présent.' }),

  makeMCQ({ id:'g4fr-imparfait-003', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:1,
    question:'Comment dit-on "he was" (être, imparfait) en français ?',
    options:['il était','il est','il sera','il serait'],
    answer:'il était',
    hint:'Être est irrégulier à l\'imparfait. Radical = ét-.',
    explanation:'"<b>Il était</b>" - être est le seul verbe irrégulier à l\'imparfait. Conjugaison : j\'étais, tu étais, il/elle <b>était</b>, nous étions, vous étiez, ils/elles étaient.' }),

  makeTF({ id:'g4fr-imparfait-004', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:1,
    question:'Pour former l\'imparfait, on prend le radical de la forme "nous" au présent.',
    answer:true,
    hint:'Exemple : parler → nous parlons → radical : parl- → je parlais.',
    explanation:'<b>Vrai.</b> Méthode : prends la forme <b>nous</b> au présent, enlève <b>-ons</b>, tu obtiens le radical. Ensuite ajoute les terminaisons -ais/-ais/-ait/-ions/-iez/-aient. Parler → nous parlons → parl- → je <b>parl-ais</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-005', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:1,
    question:'Complète : "Quand j\'étais petit, je ___ (jouer) avec des jouets." (imparfait)',
    options:['jouais','joue','ai joué','jouerai'],
    answer:'jouais',
    hint:'Action habituelle dans le passé → imparfait. Je + radical jou- + -ais.',
    explanation:'"Je <b>jouais</b>" - action habituelle dans le passé → imparfait. Jouer → nous jouons → radical : jou- → je <b>jou-ais</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-006', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Quelle est la forme correcte de "avoir" à l\'imparfait pour "nous" ?',
    options:['nous avions','nous avais','nous avaient','nous avez'],
    answer:'nous avions',
    hint:'Avoir → présent nous avons → radical av- → nous av-ions.',
    explanation:'"Nous <b>avions</b>" - avoir à l\'imparfait : j\'avais, tu avais, il avait, nous <b>avions</b>, vous aviez, ils avaient. Radical : av- (de "nous avons").' }),

  makeMCQ({ id:'g4fr-imparfait-007', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Complète : "Tous les étés, ma famille ___ (aller) à la mer." (imparfait)',
    options:['allait','va','est allée','ira'],
    answer:'allait',
    hint:'Action répétée dans le passé → imparfait. Aller → nous allons → all- + -ait.',
    explanation:'"Ma famille <b>allait</b>" - action répétée = imparfait. Aller → nous allons → radical all- → il/elle <b>all-ait</b>. "Tous les étés" indique une habitude → imparfait.' }),

  makeMCQ({ id:'g4fr-imparfait-008', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Complète : "Il ___ (faire) beau quand nous sommes sortis." (imparfait)',
    options:['faisait','fait','a fait','fera'],
    answer:'faisait',
    hint:'Description d\'un état passé → imparfait. Faire → nous faisons → fais- + -ait.',
    explanation:'"Il <b>faisait</b> beau" - description d\'un état dans le passé → imparfait. Faire → nous faisons → radical fais- → il <b>fais-ait</b>.' }),

  makeTF({ id:'g4fr-imparfait-009', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'"Nous mangions" est la forme correcte de "manger" à l\'imparfait pour "nous".',
    answer:true,
    hint:'Le "e" de "manger" ne se garde que devant a ou o (je mangeais). Devant -ions, pas de "e".',
    explanation:'<b>Vrai.</b> Manger → nous <b>mangions</b>. Le "e" ne se garde que devant a ou o, pour préserver le son /ʒ/ (je mangeais, il mangeait, nous mangeons). Devant -ions et -iez, pas de "e" : nous mangions, vous mangiez.' }),

  makeMCQ({ id:'g4fr-imparfait-010', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Quelle phrase utilise l\'imparfait CORRECTEMENT ?',
    options:[
      'Hier, je mangeais une glace. (action habituelle)',
      'Chaque soir, il regardait la télé. (action habituelle)',
      'Ce matin, j\'ai mangé du pain. (action habituelle)',
      'Demain, tu finissais tes devoirs.'
    ],
    answer:'Chaque soir, il regardait la télé. (action habituelle)',
    hint:'L\'imparfait = habitude/répétition passée. "Chaque soir" → imparfait.',
    explanation:'"Chaque soir, il <b>regardait</b> la télé" - "chaque soir" indique une habitude passée → <b>imparfait</b> correct. "Hier, j\'ai mangé" (passé composé) = action terminée précise. L\'imparfait ne s\'utilise pas pour des actions futures.' }),

  makeMCQ({ id:'g4fr-imparfait-011', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Conjugue HABITER à l\'imparfait pour "vous" : Vous ___ à Port-Louis.',
    options:['habitiez','habitais','habitaient','habitons'],
    answer:'habitiez',
    hint:'Habiter → nous habitons → habit- + terminaison "vous" = -iez.',
    explanation:'"Vous <b>habitiez</b>" - habiter → radical habit- → vous habit-<b>iez</b>. Terminaisons : je -ais, tu -ais, il -ait, nous -ions, vous <b>-iez</b>, ils -aient.' }),

  makeMCQ({ id:'g4fr-imparfait-012', chapterId:'g4fr-imparfait', subsection:'usage', difficulty:3,
    question:'Laquelle de ces phrases décrit UNE HABITUDE passée (et non une action terminée précise) ?',
    options:[
      'Lundi dernier, j\'ai vu un film.',
      'Chaque matin, ma mère préparait le petit-déjeuner.',
      'Hier soir, tu as téléphoné à grand-mère.',
      'La semaine passée, nous avons visité Port-Louis.'
    ],
    answer:'Chaque matin, ma mère préparait le petit-déjeuner.',
    hint:'"Chaque matin" = habitude → imparfait. "Lundi dernier / Hier soir / La semaine passée" = moment précis → passé composé.',
    explanation:'"Chaque matin, ma mère <b>préparait</b>" - "chaque matin" signale une habitude répétée dans le passé → imparfait. Les autres phrases indiquent un moment précis (lundi dernier, hier soir, la semaine passée) → passé composé.' }),

  makeMCQ({ id:'g4fr-imparfait-013', chapterId:'g4fr-imparfait', subsection:'usage', difficulty:3,
    question:'Complète la description : "La maison ___ (être) grande. Il y ___ (avoir) un beau jardin et des fleurs ___ (pousser) partout."',
    options:['était / avait / poussaient','est / a / poussent','a été / a eu / ont poussé','sera / aura / pousseront'],
    answer:'était / avait / poussaient',
    hint:'Description d\'un état passé → imparfait pour les trois verbes.',
    explanation:'"La maison <b>était</b> grande" (être → radical ét-). "Il y <b>avait</b> un jardin" (avoir → radical av-). "Des fleurs <b>poussaient</b> partout" (pousser → radical pouss-). Toutes des descriptions → <b>imparfait</b>.' }),

  makeTF({ id:'g4fr-imparfait-014', chapterId:'g4fr-imparfait', subsection:'vs_passe_comp', difficulty:3,
    question:'Dans "Je lisais quand il est entré", "lisais" est au passé composé.',
    answer:false,
    hint:'"Lisais" - quelle terminaison reconnaissez-vous ?',
    explanation:'<b>Faux.</b> "Lisais" est à l\'<b>imparfait</b> (je lis-ais). Dans cette phrase, "lisais" exprime une action <b>continue</b> (fond) et "est entré" (passé composé) exprime l\'action qui l\'interrompt (événement).' }),

  makeMCQ({ id:'g4fr-imparfait-015', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'Quelle est la forme de FINIR à l\'imparfait pour "ils" ?',
    options:['finissaient','finissais','finissait','finissions'],
    answer:'finissaient',
    hint:'Finir → nous finissons → radical finiss- + terminaison "ils" = -aient.',
    explanation:'"Ils <b>finissaient</b>" - finir → nous finissons → radical finiss- → ils finiss-<b>aient</b>. Terminaison pour ils/elles = <b>-aient</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-016', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'Choisis le bon temps : "Hier soir, il ___ son dîner quand le téléphone a sonné." (manger)',
    options:['mangeait','a mangé','mangera','mange'],
    answer:'mangeait',
    hint:'Action continue interrompue → imparfait. L\'action qui interrompt → passé composé.',
    explanation:'"Il <b>mangeait</b>" - action en cours (continue) au moment où le téléphone a sonné → <b>imparfait</b>. Le schéma classique : imparfait (fond/arrière-plan) + passé composé (événement qui interrompt).' }),

  makeMCQ({ id:'g4fr-imparfait-017', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'Transforme au passé : "Tous les dimanches, nous allons à l\'église." →',
    options:['Tous les dimanches, nous allions à l\'église.','Tous les dimanches, nous sommes allés à l\'église.','Tous les dimanches, nous irons à l\'église.','Tous les dimanches, nous aillons à l\'église.'],
    answer:"Tous les dimanches, nous allions à l\'église.",
    hint:'"Tous les dimanches" = habitude passée → imparfait. Aller → nous allons → all- + -ions.',
    explanation:'"Nous <b>allions</b>" - habitude passée → imparfait. Aller → nous allons → radical all- → nous all-<b>ions</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-018', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:4,
    question:'Choisis le bon temps pour chaque verbe : "Quand nous ___ (être) petits, nous ___ (jouer) souvent dehors. Un soir, nous ___ (voir) une étoile filante."',
    options:[
      'étions / jouions / avons vu',
      'étions / jouions / voyions',
      'avons été / avons joué / avons vu',
      'étions / avons joué / voyions'
    ],
    answer:'étions / jouions / avons vu',
    hint:'"Quand nous étions petits" = état passé (imparfait). "Un soir" + voir = événement précis (passé composé).',
    explanation:'"Quand nous <b>étions</b> petits" (état passé → imparfait). "Nous <b>jouions</b> souvent" (habitude → imparfait). "Un soir, nous <b>avons vu</b>" (événement précis, un soir = moment défini → passé composé).' }),

  makeMCQ({ id:'g4fr-imparfait-019', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:4,
    question:'Priya raconte : "Quand j\'___ (avoir) six ans, j\'___ (habiter) à Mahébourg. Chaque matin, je ___ (marcher) à l\'école avec ma sœur. Un jour, nous ___ (trouver) un chaton perdu." Bonne série ?',
    options:[
      "avais / habitais / marchais / avons trouvé",
      "ai eu / ai habité / ai marché / avons trouvé",
      "avais / habitais / marchais / trouvions",
      "avais / habitais / avons marché / avons trouvé"
    ],
    answer:"avais / habitais / marchais / avons trouvé",
    hint:'"Quand j\'avais 6 ans / chaque matin" = imparfait. "Un jour" = événement précis = passé composé.',
    explanation:'États et habitudes → imparfait : <b>avais</b> (avoir), <b>habitais</b> (habiter), <b>marchais</b> (marcher). Événement précis "un jour" → passé composé : <b>avons trouvé</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-020', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:1,
    question:'Quelle est la conjugaison complète de ÊTRE à l\'imparfait pour "nous" ?',
    options:['nous étions','nous étais','nous étaient','nous sommes'],
    answer:'nous étions',
    hint:'Être → radical ét- + terminaison nous = -ions.',
    explanation:'"Nous <b>étions</b>" - être est irrégulier à l\'imparfait. Conjugaison complète : j\'étais, tu étais, il/elle était, nous <b>étions</b>, vous étiez, ils/elles étaient. Seul "être" a un radical irrégulier (ét-) à l\'imparfait.' }),

  makeMCQ({ id:'g4fr-imparfait-021', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:1,
    question:'Conjugue AVOIR à l\'imparfait : "Vous ___ beaucoup d\'amis."',
    options:['aviez','avais','avaient','avez'],
    answer:'aviez',
    hint:'Avoir → radical av- + terminaison vous = -iez.',
    explanation:'"Vous <b>aviez</b>" - avoir à l\'imparfait : j\'avais, tu avais, il avait, nous avions, vous <b>aviez</b>, ils avaient. Radical av- + terminaison <b>-iez</b> pour vous.' }),

  makeTF({ id:'g4fr-imparfait-022', chapterId:'g4fr-imparfait', subsection:'terminaisons', difficulty:1,
    question:'La terminaison de l\'imparfait pour "ils/elles" est "-aient".',
    answer:true,
    hint:'Rappelle-toi les six terminaisons : -ais / -ais / -ait / -ions / -iez / -aient.',
    explanation:'<b>Vrai.</b> Terminaisons de l\'imparfait : je -ais, tu -ais, il/elle -ait, nous -ions, vous -iez, ils/elles <b>-aient</b>. Exemple : parler → ils parl-<b>aient</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-023', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Conjugue PARLER à l\'imparfait. Laquelle de ces formes n\'est PAS de l\'imparfait ?',
    options:['je parlais','tu parlais','nous parlions','vous parlez'],
    answer:'vous parlez',
    hint:'Parler → radical parl- + -iez pour "vous" : vous parliez. Quelle forme est au présent ?',
    explanation:'"<b>Vous parlez</b>" est le présent, pas l\'imparfait : la forme correcte à l\'imparfait est vous <b>parliez</b>. Les autres formes sont justes : je parlais ✓, tu parlais ✓, nous parlions ✓. Terminaisons de l\'imparfait : -ais, -ais, -ait, -ions, -iez, -aient.' }),

  makeMCQ({ id:'g4fr-imparfait-024', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Conjugue JOUER à l\'imparfait : "Ils ___ au foot chaque après-midi."',
    options:['jouaient','jouait','jouions','joueraient'],
    answer:'jouaient',
    hint:'Jouer → nous jouons → jou- + terminaison ils = -aient.',
    explanation:'"Ils <b>jouaient</b>" - jouer → radical jou- → ils jou-<b>aient</b>. "Chaque après-midi" indique une habitude → imparfait. Terminaison pour ils/elles = <b>-aient</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-025', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:2,
    question:'Conjugue FINIR à l\'imparfait : "Tu ___ toujours tes devoirs avant le dîner."',
    options:['finissais','finissait','finissions','finissaient'],
    answer:'finissais',
    hint:'Finir → nous finissons → finiss- + terminaison tu = -ais.',
    explanation:'"Tu <b>finissais</b>" - finir → nous finissons → radical finiss- → tu finiss-<b>ais</b>. "Toujours" indique une habitude → imparfait.' }),

  makeMCQ({ id:'g4fr-imparfait-026', chapterId:'g4fr-imparfait', subsection:'usage', difficulty:2,
    question:'Quel marqueur de temps indique une HABITUDE passée et donc l\'imparfait ?',
    options:['hier soir','soudain','autrefois','la semaine dernière'],
    answer:'autrefois',
    hint:'"Autrefois" = "in the old days" - habitude passée.',
    explanation:'"<b>Autrefois</b>" (= in the old days / formerly) indique une habitude passée → imparfait. Autres marqueurs d\'imparfait : d\'habitude, tous les jours, chaque matin, souvent, toujours, en ce temps-là. Marqueurs de passé composé : hier, soudain, un jour, la semaine dernière.' }),

  makeMCQ({ id:'g4fr-imparfait-027', chapterId:'g4fr-imparfait', subsection:'usage', difficulty:2,
    question:'Complète : "D\'habitude, je ___ (se lever) tôt et je ___ (prendre) mon petit-déjeuner tranquillement."',
    options:['me levais / prenais','me suis levé / ai pris','me lèverai / prendrai','me levais / ai pris'],
    answer:'me levais / prenais',
    hint:'"D\'habitude" = habitude → imparfait pour les deux verbes.',
    explanation:'"Je <b>me levais</b>" (se lever → imparfait, habitude) et "je <b>prenais</b>" (prendre → nous prenons → pren-ais). "D\'habitude" commande l\'imparfait pour toute la phrase.' }),

  makeMCQ({ id:'g4fr-imparfait-028', chapterId:'g4fr-imparfait', subsection:'usage', difficulty:3,
    question:'Complète la description d\'un tableau : "Dans ce tableau, le soleil ___ (briller), les enfants ___ (jouer) et une dame ___ (lire) sous un arbre."',
    options:['brillait / jouaient / lisait','a brillé / ont joué / a lu','brillera / joueront / lira','brillait / ont joué / lisait'],
    answer:'brillait / jouaient / lisait',
    hint:'Description d\'un état passé (tableau, scène) → imparfait pour tous les verbes.',
    explanation:'"Le soleil <b>brillait</b>" (briller → nous brillons → radical brill- → brillait), "les enfants <b>jouaient</b>" (jouer → jouaient), "une dame <b>lisait</b>" (lire → nous lisons → lis-ait). Description d\'une scène → <b>imparfait</b> pour tout.' }),

  makeMCQ({ id:'g4fr-imparfait-029', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'Choisis le bon temps : "Je ___ (dormir) quand le chien ___ (aboyer)."',
    options:['dormais / a aboyé','ai dormi / aboyait','dormais / aboyait','ai dormi / a aboyé'],
    answer:'dormais / a aboyé',
    hint:'Action continue (fond) = imparfait. Action soudaine qui interrompt = passé composé.',
    explanation:'"Je <b>dormais</b>" (imparfait - action continue, en cours) "quand le chien <b>a aboyé</b>" (passé composé - événement soudain qui interrompt). Structure classique : <b>imparfait</b> (arrière-plan) + <b>passé composé</b> (événement).' }),

  makeMCQ({ id:'g4fr-imparfait-030', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'MANGER à l\'imparfait : "Nous ___ des mangues chaque été."',
    options:['mangions','mangeons','mangeions','mangeaient'],
    answer:'mangions',
    hint:'Manger → nous mangions : pas de "e" devant -ions.',
    explanation:'"Nous <b>mangions</b>" - le "e" de "manger" ne se garde que devant a ou o, pour conserver le son /ʒ/ (nous mangeons, je mangeais, ils mangeaient). Devant -ions et -iez, le "i" suffit : nous <b>mangions</b>, vous mangiez. "Mangeions" n\'existe pas ; "mangeaient" est la forme de ils/elles.' }),

  makeTF({ id:'g4fr-imparfait-031', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'"Nous buvions de l\'eau fraîche" est correct. Le radical de "boire" à l\'imparfait est "buv-".',
    answer:true,
    hint:'Boire → nous buvons → radical buv- + -ions = buvions.',
    explanation:'<b>Vrai.</b> Boire → nous buvons → radical <b>buv-</b> → nous buv-<b>ions</b>. Autres exemples avec radical irrégulier : voir → nous voyons → <b>voy</b>-ais ; prendre → nous prenons → <b>pren</b>-ais ; venir → nous venons → <b>ven</b>-ais.' }),

  makeMCQ({ id:'g4fr-imparfait-032', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'Identifie l\'ERREUR dans cette phrase : "Avant, tu étaient toujours à l\'heure."',
    options:[
      '"Avant" ne va pas avec l\'imparfait',
      '"étaient" - mauvaise terminaison pour "tu"',
      '"toujours" ne va pas avec l\'imparfait',
      'Il n\'y a pas d\'erreur'
    ],
    answer:'"étaient" - mauvaise terminaison pour "tu"',
    hint:'Rappelle les terminaisons : je -ais, tu -ais, il -ait, ils -aient.',
    explanation:'"Tu <b>étaient</b>" est incorrect. Terminaison pour "tu" = <b>-ais</b> (tu étais, pas étaient). "Étaient" est la forme pour <b>ils/elles</b>. Correct : "Avant, tu <b>étais</b> toujours à l\'heure."' }),

  makeMCQ({ id:'g4fr-imparfait-033', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:3,
    question:'"Il n\'___ pas de bonbons à la maison." (avoir - imparfait, négation)',
    options:["n\'avait","n\'avais","n\'avaient","n\'aviez"],
    answer:"n\'avait",
    hint:'Sujet = "il". Avoir imparfait pour "il" = avait. Négation : ne...pas encadre le verbe.',
    explanation:'"Il <b>n\'avait</b> pas de bonbons" - avoir à l\'imparfait pour "il" = <b>avait</b>. Négation : <b>n\'</b> + avait + <b>pas</b>. "N\'" remplace "ne" devant une voyelle.' }),

  makeMCQ({ id:'g4fr-imparfait-034', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:4,
    question:'Complète le paragraphe : "Autrefois, la vie ___ (être) différente. Les gens ___ (avoir) moins de technologie. Les enfants ___ (jouer) dehors et les familles ___ (manger) ensemble tous les soirs."',
    options:[
      'était / avaient / jouaient / mangeaient',
      'a été / ont eu / ont joué / ont mangé',
      'était / avaient / ont joué / mangeaient',
      'était / avait / jouaient / mangaient'
    ],
    answer:'était / avaient / jouaient / mangeaient',
    hint:'"Autrefois" = toutes les habitudes sont à l\'imparfait. Vérifiez les sujets.',
    explanation:'"La vie <b>était</b>" (être, elle), "les gens <b>avaient</b>" (avoir, ils), "les enfants <b>jouaient</b>" (jouer, ils), "les familles <b>mangeaient</b>" (manger, elles). Tous les verbes = imparfait car "autrefois" exprime des habitudes et états passés. Vérification des accords : sujets pluriels → terminaison -<b>aient</b>.' }),

  makeMCQ({ id:'g4fr-imparfait-035', chapterId:'g4fr-imparfait', subsection:'formation', difficulty:4,
    question:'Priya décrit ses vacances d\'enfance : "Chaque été, nous ___ (partir) à Rodrigues. La mer ___ (être) turquoise et nous ___ (nager) tous les jours. Mon frère et moi ___ (pêcher) avec notre grand-père. C\'___ (être) des moments inoubliables !"',
    options:[
      'partions / était / nagions / pêchions / était',
      'sommes partis / était / nagions / pêchions / a été',
      'partions / a été / nagions / pêchions / était',
      'partions / était / avons nagé / pêchions / était'
    ],
    answer:'partions / était / nagions / pêchions / était',
    hint:'"Chaque été / tous les jours" = habitudes et descriptions → imparfait pour tous.',
    explanation:'"<b>partions</b>" (partir → nous partons → part-ions), "<b>était</b>" (être irrégulier), "<b>nagions</b>" (nager → nag-ions), "<b>pêchions</b>" (pêcher → pêch-ions), "<b>était</b>" (être). Tout est à l\'imparfait : "chaque été" et "tous les jours" marquent des habitudes répétées.' })

);

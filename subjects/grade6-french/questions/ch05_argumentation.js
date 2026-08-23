'use strict';
// Grade 6 French — Chapter: L'Expression Écrite & Argumentation
// IDs format: g6fr-arg-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g6fr-arg-001', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Which expression introduces a PERSONAL OPINION in French?',
    options:['En conclusion','De plus','À mon avis','Cependant'],
    answer:'À mon avis',
    hint:'"À mon avis" literally means "In my opinion".',
    explanation:'"<b>À mon avis</b>" = In my opinion. Other opinion phrases: Je pense que, Je crois que, Il me semble que, Je suis convaincu(e) que, Selon moi. "En conclusion" = In conclusion. "De plus" = Furthermore. "Cependant" = However.' }),

  makeMCQ({ id:'g6fr-arg-002', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Which connector ADDS an idea to a previous one?',
    options:['Cependant','Pourtant','De plus','En revanche'],
    answer:'De plus',
    hint:'"De plus" is used to say "furthermore" or "in addition".',
    explanation:'"<b>De plus</b>" = Furthermore / In addition. Other additive connectors: En outre (Moreover), Par ailleurs (Furthermore), Non seulement… mais aussi (Not only… but also), Également (Also). "Cependant/Pourtant/En revanche" = contrast (however).' }),

  makeMCQ({ id:'g6fr-arg-003', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Which phrase signals a CONCESSION (acknowledging the other side)?',
    options:['En conclusion','Certes, … Cependant','De plus','En résumé'],
    answer:'Certes, … Cependant',
    hint:'"Certes" admits a point, then "Cependant" (however) counters it.',
    explanation:'"<b>Certes, … Cependant</b>" (Granted / True, … However) is the classic concession structure in French argumentative writing: "Certes, les voitures sont pratiques. Cependant, elles polluent l\'environnement." It shows the writer has considered both sides.' }),

  makeMCQ({ id:'g6fr-arg-004', chapterId:'g6fr-argumentation', difficulty:1,
    question:'What is the structure of a French argumentative essay?',
    options:[
      'Introduction, one argument, conclusion',
      'Introduction (contexte + problématique) → Développement (arguments + exemples) → Conclusion',
      'List of arguments, then list of counter-arguments',
      'Résumé, thèse, antithèse'
    ],
    answer:'Introduction (contexte + problématique) → Développement (arguments + exemples) → Conclusion',
    hint:'Think of the three-part essay structure used in French.',
    explanation:'French essay structure: <b>Introduction</b> (contexte = context, problématique = key question/issue), <b>Développement</b> (thèse = arguments for, antithèse = arguments against, each with examples), <b>Conclusion</b> (résumé + ouverture = broader reflection).' }),

  makeMCQ({ id:'g6fr-arg-005', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Which phrase correctly CONCLUDES a French essay?',
    options:['De plus','Bien que','En conclusion','Certes'],
    answer:'En conclusion',
    hint:'This phrase signals the final paragraph.',
    explanation:'"<b>En conclusion</b>" signals the conclusion. Other concluding phrases: En résumé (In summary), Pour conclure (To conclude), En définitive (Ultimately), En somme (In short). The conclusion should summarise the main points and offer a final reflection.' }),

  makeTF({ id:'g6fr-arg-006', chapterId:'g6fr-argumentation', difficulty:2,
    question:'"Non seulement… mais aussi" is used to add a contrasting idea.',
    answer:false,
    hint:'"Non seulement" = not only. What does "mais aussi" mean?',
    explanation:'<b>Faux (False).</b> "Non seulement… <b>mais aussi</b>" = "Not only… but also" — it <b>adds</b> an idea, not contrasts. "Non seulement c\'est utile, mais aussi c\'est beau." Contrast connectors: Cependant, Pourtant, En revanche, Néanmoins, Toutefois.' }),

  makeMCQ({ id:'g6fr-arg-007', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Which connector expresses a CONSEQUENCE or result?',
    options:['Cependant','Donc / Ainsi','De plus','Certes'],
    answer:'Donc / Ainsi',
    hint:'"Donc" = therefore/so. It shows a result follows from the previous idea.',
    explanation:'"<b>Donc</b>" (therefore/so) and "<b>Ainsi</b>" (thus/therefore) express consequence. "La forêt a brûlé. Donc, de nombreux animaux ont perdu leur habitat." Other consequence connectors: Par conséquent, C\'est pourquoi, En conséquence.' }),

  makeMCQ({ id:'g6fr-arg-008', chapterId:'g6fr-argumentation', difficulty:2,
    question:'Which sentence expresses an opinion MOST STRONGLY?',
    options:[
      'Il me semble que cela est important.',
      'Je pense que c\'est une bonne idée.',
      'Je suis convaincu(e) que cette solution est la meilleure.',
      'On pourrait peut-être considérer cette option.'
    ],
    answer:'Je suis convaincu(e) que cette solution est la meilleure.',
    hint:'Which expression shows the most certainty and conviction?',
    explanation:'"<b>Je suis convaincu(e) que</b>" (I am convinced that) expresses the strongest, most certain opinion. Scale of strength: "on pourrait peut-être" (weakest) < "il me semble" < "je pense" < "je suis convaincu(e)" (strongest).' }),

  makeTF({ id:'g6fr-arg-009', chapterId:'g6fr-argumentation', difficulty:1,
    question:'In a French argumentative essay, the "problématique" is the central question or issue that the essay addresses.',
    answer:true,
    hint:'Think of it as the essay\'s fundamental question that the whole argument tries to answer.',
    explanation:'<b>Vrai (True).</b> The <b>problématique</b> is the central issue or question raised in the introduction: e.g., "Les réseaux sociaux sont-ils bénéfiques pour les jeunes?" (Are social media beneficial for young people?) The whole essay is structured around answering this question.' }),

  makeMCQ({ id:'g6fr-arg-010', chapterId:'g6fr-argumentation', difficulty:2,
    question:'What does "En revanche" mean in a French essay?',
    options:['In conclusion','Furthermore','On the other hand','Because of this'],
    answer:'On the other hand',
    hint:'"En revanche" introduces an opposing or contrasting idea.',
    explanation:'"<b>En revanche</b>" = On the other hand / In contrast. It is used to introduce a contrasting argument: "Les voitures sont rapides. En revanche, elles polluent." Similar to: Cependant, Toutefois, Néanmoins, Pourtant.' })

);

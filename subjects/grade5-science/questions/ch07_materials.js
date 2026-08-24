'use strict';
// Grade 5 Science — Chapter: Materials in Our Environment
// IDs format: g5sci-mat-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5sci-mat-001', chapterId:'materials', difficulty:1,
    question:'Which of the following is a NATURAL material?',
    options:['Plastic','Nylon','Cotton','Polyester'],
    answer:'Cotton',
    hint:'Natural materials come from plants, animals or the Earth directly.',
    explanation:'Cotton is a natural material — it comes from the cotton plant. Plastic, nylon and polyester are man-made (synthetic) materials.' }),

  makeMCQ({ id:'g5sci-mat-002', chapterId:'materials', difficulty:1,
    question:'Which of the following is a MAN-MADE (synthetic) material?',
    options:['Wood','Wool','Stone','Plastic'],
    answer:'Plastic',
    hint:'Man-made materials are manufactured in factories from chemicals.',
    explanation:'Plastic is a man-made material produced from petroleum in factories. Wood, wool and stone are all natural materials.' }),

  makeTF({ id:'g5sci-mat-003', chapterId:'materials', difficulty:1,
    question:'Glass is a natural material because it is made from sand.',
    answer:false,
    hint:'The sand is natural, but what about glass itself?',
    explanation:'Glass is a <b>man-made</b> material. Although it is made from natural sand (silicon dioxide), the glass itself is manufactured through an industrial process, making it man-made.' }),

  makeMCQ({ id:'g5sci-mat-004', chapterId:'materials', difficulty:1,
    question:'What property allows you to see clearly through a material?',
    options:['Waterproof','Flexible','Transparent','Absorbent'],
    answer:'Transparent',
    hint:'Think about glass windows — you can see through them.',
    explanation:'A <b>transparent</b> material allows light to pass through it so you can see clearly. Glass and clear plastic are transparent. This is why glass is used for windows.' }),

  makeMCQ({ id:'g5sci-mat-005', chapterId:'materials', difficulty:2,
    question:'A builder needs a material to make a raincoat. Which property is MOST important?',
    options:['Transparent','Waterproof','Absorbent','Brittle'],
    answer:'Waterproof',
    hint:'A raincoat must keep water OUT.',
    explanation:'A raincoat must be <b>waterproof</b> — it must not allow water to pass through it. Materials like rubber and treated nylon are waterproof.' }),

  makeMCQ({ id:'g5sci-mat-006', chapterId:'materials', difficulty:2,
    question:'Why is rubber used to make the outer part of car tyres?',
    options:[
      'It is transparent so drivers can see the road',
      'It is hard and brittle',
      'It is flexible and waterproof',
      'It dissolves easily in water'
    ],
    answer:'It is flexible and waterproof',
    hint:'Think about what properties a tyre needs — it bends without breaking and copes with wet roads.',
    explanation:'Rubber is <b>flexible</b> (it can bend and stretch without breaking) and <b>waterproof</b>. These properties make it ideal for tyres that must grip wet roads and withstand impacts.' }),

  makeMCQ({ id:'g5sci-mat-007', chapterId:'materials', difficulty:1,
    question:'Which material would be BEST for making a kitchen sponge?',
    options:['Steel','Glass','Absorbent foam','Rubber'],
    answer:'Absorbent foam',
    hint:'A sponge needs to soak up water and liquid.',
    explanation:'An <b>absorbent</b> material soaks up liquids. Kitchen sponges are made of absorbent foam so they can soak up water and clean surfaces.' }),

  makeMatch({ id:'g5sci-mat-008', chapterId:'materials', difficulty:1,
    leftItem:'Wood',
    allRights:['Natural material (from trees)','Man-made material (from oil)','Natural material (from animals)','Man-made material (from sand)'],
    correctRight:'Natural material (from trees)',
    hint:'Wood comes from cutting down trees.',
    explanation:'Wood is a natural material obtained from trees. It is widely used in furniture, building and paper-making.' }),

  makeMatch({ id:'g5sci-mat-009', chapterId:'materials', difficulty:1,
    leftItem:'Nylon',
    allRights:['Natural material (from trees)','Man-made material (from oil)','Natural material (from animals)','Man-made material (from sand)'],
    correctRight:'Man-made material (from oil)',
    hint:'Nylon is a synthetic fibre used in clothes and ropes.',
    explanation:'Nylon is a synthetic (man-made) material made from petroleum (oil). It is used to make ropes, stockings, toothbrush bristles and clothes.' }),

  makeMCQ({ id:'g5sci-mat-010', chapterId:'materials', difficulty:2,
    question:'Why is glass used for making windows rather than wood?',
    options:[
      'Glass is softer than wood',
      'Glass is transparent, so light can pass through it',
      'Glass is cheaper than wood',
      'Glass is waterproof but wood is not'
    ],
    answer:'Glass is transparent, so light can pass through it',
    hint:'What is the main reason we put windows in a wall?',
    explanation:'Glass is <b>transparent</b> — it allows light to pass through so we can see outside and daylight can enter the room. Wood is opaque (you cannot see through it).' }),

  makeMCQ({ id:'g5sci-mat-011', chapterId:'materials', difficulty:2,
    question:'Which property makes steel a good material for building bridges?',
    options:['It is transparent','It absorbs water','It is strong and rigid','It is soft and flexible'],
    answer:'It is strong and rigid',
    hint:'A bridge must hold heavy loads without bending or breaking.',
    explanation:'Steel is <b>strong</b> (can hold heavy loads) and <b>rigid</b> (does not bend easily). These properties make it ideal for construction of bridges, buildings and vehicles.' }),

  makeMCQ({ id:'g5sci-mat-012', chapterId:'materials', difficulty:2,
    question:'Wool is used to make warm jumpers. Where does wool come from?',
    options:['Cotton plants','Silkworms','Sheep','Petroleum (oil)'],
    answer:'Sheep',
    hint:'Wool is a natural animal fibre.',
    explanation:'Wool is a natural material that comes from the fleece of <b>sheep</b>. It traps air between its fibres, which makes it an excellent insulator and keeps us warm.' }),

  makeMCQ({ id:'g5sci-mat-013', chapterId:'materials', difficulty:1,
    question:'Which property describes a material that DOES NOT allow water to pass through it?',
    options:['Transparent','Absorbent','Waterproof','Flexible'],
    answer:'Waterproof',
    hint:'Rain bounces off this material — it keeps you dry.',
    explanation:'A <b>waterproof</b> material does not allow water to penetrate it. Rubber, treated nylon and some plastics are waterproof, making them suitable for raincoats, boots and umbrellas.' }),

  makeMCQ({ id:'g5sci-mat-014', chapterId:'materials', difficulty:1,
    question:'Which of the following materials is HARD and BRITTLE (breaks easily if dropped)?',
    options:['Rubber','Cotton','Glass','Nylon'],
    answer:'Glass',
    hint:'This material is used for windows — it can shatter.',
    explanation:'<b>Glass</b> is hard but <b>brittle</b> — it breaks or shatters easily when struck. Unlike rubber or plastic, glass does not bend; it cracks and breaks.' }),

  makeTF({ id:'g5sci-mat-015', chapterId:'materials', difficulty:1,
    question:'Iron is a good conductor of electricity.',
    answer:true,
    hint:'Iron is a metal — most metals are conductors.',
    explanation:'True. <b>Iron</b> is a metal and a good conductor of electricity. However, copper is a much better conductor and is used in wiring, while iron is mainly used for its strength (in construction and tools).' }),

  makeMCQ({ id:'g5sci-mat-016', chapterId:'materials', difficulty:2,
    question:'A builder wants to choose a material to make a flexible pipe that water cannot pass through. Which TWO properties must the material have?',
    options:[
      'Flexible and waterproof',
      'Transparent and absorbent',
      'Hard and brittle',
      'Magnetic and opaque'
    ],
    answer:'Flexible and waterproof',
    hint:'The pipe must bend without breaking AND not leak water.',
    explanation:'The pipe must be <b>flexible</b> (can bend without cracking, e.g. rubber or plastic) and <b>waterproof</b> (does not allow water to pass through it). Both properties are needed: flexibility for installation in tight spaces, and waterproofness to transport water without leaking.' }),

  makeMCQ({ id:'g5sci-mat-017', chapterId:'materials', difficulty:3,
    question:'A manufacturer needs to choose between glass and plastic to make a fizzy drinks bottle. Plastic is chosen. Give TWO reasons why plastic is MORE SUITABLE than glass for this purpose.',
    options:[
      'Plastic is lighter and less likely to shatter if dropped, making it safer and easier to carry',
      'Plastic is transparent and harder than glass',
      'Glass is too expensive but plastic has no other advantages',
      'Plastic absorbs the fizzy gas better than glass'
    ],
    answer:'Plastic is lighter and less likely to shatter if dropped, making it safer and easier to carry',
    hint:'Think about what happens if a glass bottle is dropped versus a plastic one.',
    explanation:'Plastic is preferred over glass for drinks bottles for two reasons: (1) <b>Plastic is lighter</b> — easier and cheaper to transport; (2) <b>Plastic does not shatter</b> when dropped (it is not brittle like glass), making it safer — a shattered glass bottle could injure someone. Both materials are waterproof and transparent, so the difference lies in weight and safety.' }),

  makeMCQ({ id:'g5sci-mat-018', chapterId:'materials', difficulty:3,
    question:'Why is copper used for the INNER part of electrical wires, while rubber is used for the OUTER part?',
    options:[
      'Copper conducts electricity well; rubber insulates (stops electricity leaking out and causing shocks)',
      'Copper is colourful and rubber is cheap to produce',
      'Copper is waterproof and rubber is transparent',
      'Both conduct electricity but rubber is cheaper than copper for the inner core'
    ],
    answer:'Copper conducts electricity well; rubber insulates (stops electricity leaking out and causing shocks)',
    hint:'Inner part needs to carry electricity; outer part needs to protect us.',
    explanation:'<b>Copper</b> (inner core) is an excellent electrical <b>conductor</b> — it allows current to flow efficiently. <b>Rubber</b> (outer coating) is an <b>insulator</b> — it prevents electricity from leaking out of the wire, protecting anyone who touches the wire from getting an electric shock. The two materials work together: one carries the current, the other keeps it contained safely.' }),

  makeMCQ({ id:'g5sci-mat-019', chapterId:'materials', difficulty:4,
    question:'A scientist tests four materials by passing electricity through them. Results: Material A conducts, B does not, C conducts, D does not. She then tests which are waterproof: A and D are waterproof, B and C are not. Which material would be BEST for making a waterproof electrical cable insulator?',
    options:['Material A','Material B','Material C','Material D'],
    answer:'Material D',
    hint:'An insulator for a cable must NOT conduct electricity AND must be waterproof.',
    explanation:'A cable insulator must be: (1) a <b>non-conductor</b> (insulator) — eliminates A and C; (2) <b>waterproof</b> — eliminates B. Only <b>Material D</b> satisfies both conditions: it does not conduct electricity AND is waterproof. This makes it safe to use outdoors or in damp conditions.' })

);

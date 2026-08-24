'use strict';
// Grade 4 Science — Chapter: Materials & Properties
// IDs format: g4s-mat-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g4s-mat-001', chapterId:'g4sci-materials', difficulty:1,
    question:'Which material is TRANSPARENT (you can see through it clearly)?',
    options:['Wood','Stone','Glass','Cardboard'],
    answer:'Glass',
    hint:'Think about what windows are made of.',
    explanation:'<b>Glass</b> is a transparent material — light passes through it clearly and you can see objects on the other side. This is why glass is used for windows and spectacles. Wood, stone and cardboard are <b>opaque</b> — you cannot see through them.' }),

  makeMCQ({ id:'g4s-mat-002', chapterId:'g4sci-materials', difficulty:1,
    question:'Which object would be ATTRACTED by a magnet?',
    options:['A plastic ruler','A wooden pencil','A steel nail','A rubber eraser'],
    answer:'A steel nail',
    hint:'Magnets attract materials that contain iron or steel.',
    explanation:'A <b>steel nail</b> would be attracted to a magnet because steel contains <b>iron</b>, which is a magnetic material. Magnets attract iron and steel only. Plastic, wood, rubber, copper, aluminium and glass are <b>NOT</b> magnetic.' }),

  makeTF({ id:'g4s-mat-003', chapterId:'g4sci-materials', difficulty:1,
    question:'Wood is a NATURAL material.',
    answer:true,
    hint:'Natural materials come from nature (plants, animals, earth). Was wood made in a factory?',
    explanation:'<b>True.</b> Wood is a <b>natural material</b> — it comes from trees in nature. Other natural materials: stone, cotton (from cotton plants), rubber (from rubber trees), wool (from sheep), clay (from the earth). Man-made materials include: plastic, glass, metal (processed), nylon.' }),

  makeMCQ({ id:'g4s-mat-004', chapterId:'g4sci-materials', difficulty:1,
    question:'What is an OPAQUE material?',
    options:['A material you can see through clearly','A material that glows in the dark','A material that you CANNOT see through','A material that is very soft'],
    answer:'A material that you CANNOT see through',
    hint:'Opaque is the opposite of transparent.',
    explanation:'An <b>opaque</b> material does not allow light to pass through — <b>you cannot see through it</b>. Examples: wood, stone, metal, cardboard. Transparent (see-through clearly): glass, clear plastic. Translucent (some light passes through, but blurry): frosted glass, tracing paper.' }),

  makeMCQ({ id:'g4s-mat-005', chapterId:'g4sci-materials', difficulty:2,
    question:'Why is glass the best material for WINDOWS?',
    options:[
      'Because glass is very strong and cannot break',
      'Because glass is transparent and allows light into the room',
      'Because glass is cheap and easy to find',
      'Because glass is waterproof and flexible'
    ],
    answer:'Because glass is transparent and allows light into the room',
    hint:'What property of glass makes it useful for a window?',
    explanation:'Glass is used for windows because it is <b>transparent</b> — light passes through it, allowing daylight into the room. It also keeps out wind and rain. This shows how we choose materials based on their <b>properties</b>: the property needed for a window is transparency.' }),

  makeMCQ({ id:'g4s-mat-006', chapterId:'g4sci-materials', difficulty:2,
    question:'Which material would be BEST for making a waterproof raincoat?',
    options:['Cotton','Rubber or plastic','Wood','Glass'],
    answer:'Rubber or plastic',
    hint:'A raincoat must keep water out. Which material does not let water through?',
    explanation:'<b>Rubber or plastic</b> is waterproof — water cannot pass through it. This makes it ideal for raincoats, wellington boots and umbrellas. Cotton absorbs water (becomes wet). Wood would be too heavy and rigid. Glass would break easily.' }),

  makeMCQ({ id:'g4s-mat-007', chapterId:'g4sci-materials', difficulty:2,
    question:'Which of these would NOT be attracted to a magnet?',
    options:['An iron key','A steel pin','A copper coin','A steel paper clip'],
    answer:'A copper coin',
    hint:'Only iron and steel are magnetic. What is a copper coin made of?',
    explanation:'A <b>copper coin</b> is made of copper (or copper alloy), which is <b>NOT magnetic</b>. Magnets attract only iron and steel. Iron key ✓, steel pin ✓, steel paper clip ✓, copper coin ✗. Copper, aluminium, gold, silver, plastic, wood and glass are all non-magnetic.' }),

  makeMCQ({ id:'g4s-mat-008', chapterId:'g4sci-materials', difficulty:2,
    question:'A rubber ball can bounce because rubber is FLEXIBLE. What does flexible mean?',
    options:[
      'Hard and cannot be bent or compressed',
      'Transparent and lets light through',
      'Can be bent, stretched or compressed and returns to its original shape',
      'Very heavy and sinks in water'
    ],
    answer:'Can be bent, stretched or compressed and returns to its original shape',
    hint:'Think about what happens when you squeeze a rubber ball.',
    explanation:'<b>Flexible</b> means a material can be <b>bent, stretched or compressed and returns to its original shape</b>. Rubber is flexible and elastic. The opposite is <b>rigid</b> (stiff, cannot bend — e.g. metal rod, glass). Flexibility makes rubber useful for tyres, balls and erasers.' }),

  makeMCQ({ id:'g4s-mat-009', chapterId:'g4sci-materials', difficulty:3,
    question:'Which material would be BEST for making a COOKING POT? Why?',
    options:[
      'Plastic — because it is lightweight and cheap',
      'Wood — because it is natural and strong',
      'Metal — because it conducts heat well and can withstand high temperatures',
      'Glass — because it is transparent and easy to clean'
    ],
    answer:'Metal — because it conducts heat well and can withstand high temperatures',
    hint:'A cooking pot needs to transfer heat from the stove to the food. Which property is needed?',
    explanation:'<b>Metal</b> is the best choice because it <b>conducts heat</b> efficiently (heat from the flame transfers through the metal to cook the food) and <b>withstands very high temperatures</b> without melting or burning. Plastic would melt on a stove. Wood would catch fire. Glass can crack from heat shock.' }),

  makeMCQ({ id:'g4s-mat-010', chapterId:'g4sci-materials', difficulty:4,
    question:'A builder needs material for a HOUSE FLOOR that must be: (1) hard, (2) strong enough to walk on, (3) waterproof, and (4) easy to clean. Which material is the BEST choice?',
    options:[
      'Carpet — soft, comfortable and warm',
      'Ceramic tiles — hard, strong, waterproof and easy to wipe clean',
      'Wood — natural and good-looking but not fully waterproof',
      'Rubber — waterproof but too soft and not strong enough for a floor'
    ],
    answer:'Ceramic tiles — hard, strong, waterproof and easy to wipe clean',
    hint:'Check all four requirements against each material.',
    explanation:'<b>Ceramic tiles</b> meet all four requirements: (1) <b>hard</b> ✓, (2) <b>strong</b> ✓, (3) <b>waterproof</b> ✓, (4) <b>easy to clean</b> ✓. Carpet is soft and absorbs water. Wood absorbs moisture and can warp. Rubber is too soft for a heavy-traffic floor. Choosing the right material requires matching all the required properties.' })

);

'use strict';
// Grade 9 Biology - Label the Diagram (bonus chapter)
//
// ⚠ `slots` questions, not a new type — see docs/label-diagrams/PLAN.md.
// ⚠ The word bank shows in PRACTICE only; the exam drops it and the child types.
//
// Figure: heart-numbers.png — CC BY-SA 3.0, Wapcaplet (Wikimedia Commons).
// Key from the illustrator's own legend on the file page, which numbers all 13:
//   1 right atrium · 2 left atrium · 3 superior vena cava · 4 aorta
//   5 pulmonary artery · 6 pulmonary vein · 7 mitral valve · 8 aortic valve
//   9 left ventricle · 10 right ventricle · 11 inferior vena cava
//   12 tricuspid valve · 13 pulmonary valve
//
// ⚠ THE DIAGRAM IS DRAWN AS THE PATIENT FACES YOU, so the heart's own RIGHT
// side appears on the LEFT of the picture. That is the single most common
// mistake on this figure, so it is taught here rather than left as a trap.
//
// ⚠ ALT TEXT NAMES THE SUBJECT, NEVER THE PARTS.
// IDs: g9s-lbl-NNN

const _LEAF_ALT = 'A section cut through a leaf, with its layers marked by letter';
const _LEAF_FIG =
  '<figure class="q-fig"><img src="assets/questions/labels/leaf-section-numbers.png" alt="' + _LEAF_ALT + '" ' +
  'style="display:block;margin:8px auto;max-width:100%;width:420px;border:1px solid #cbd5e1;' +
  'border-radius:8px;background:#fff"></figure>';

const _HEART_ALT = 'A cross-section of the human heart with thirteen structures marked by number';
const _HEART_FIG =
  '<figure class="q-fig"><img src="assets/questions/labels/heart-numbers.png" alt="' + _HEART_ALT + '" ' +
  'style="display:block;margin:8px auto;max-width:100%;width:360px;border:1px solid #cbd5e1;' +
  'border-radius:8px;background:#fff"></figure>';

STATIC_QUESTIONS.push(

  makeTask({
    id: 'g9s-lbl-001', chapterId: 'g9enr-label', subsection: 'body', difficulty: 2,
    intro: 'The diagram shows a section through the human heart. It is drawn as if the person were facing you, so the heart’s own right side is on the left of the picture.',
    stimulus: { html: _HEART_FIG, altText: _HEART_ALT },
    parts: [
      { label: 'a', marks: 4,
        prompt: 'Name the four chambers marked <b>1</b>, <b>2</b>, <b>9</b> and <b>10</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['1', '2', '9', '10'],
          answer: [
            ['right atrium'],
            ['left atrium'],
            ['left ventricle'],
            ['right ventricle'],
          ],
          bank: ['left ventricle', 'right atrium', 'aorta', 'right ventricle',
                 'left atrium', 'pulmonary vein'] },
        hint: 'The two collecting chambers are at the top; the two pumping chambers are below them.',
        explanation: 'The <b>atria</b> (1 right, 2 left) receive blood and sit above the <b>ventricles</b> (10 right, 9 left), which pump it out. Remember the picture is drawn facing you, so the right atrium and right ventricle appear on the left-hand side.' },

      { label: 'b', marks: 1,
        prompt: 'What is the large vessel marked <b>4</b>, leaving the top of the heart?',
        response: { kind: 'choice', answer: 'The aorta',
          options: ['The aorta', 'The pulmonary artery', 'The vena cava', 'The pulmonary vein'] },
        hint: 'It is the largest artery in the body.',
        explanation: 'Vessel <b>4</b> is the <b>aorta</b>. It carries oxygenated blood from the left ventricle to the whole body, which is why the left ventricle has the thickest muscular wall.' },

      { label: 'c', marks: 1,
        prompt: 'Why is the wall of chamber <b>9</b> much thicker than the wall of chamber <b>10</b>?',
        response: { kind: 'choice', answer: 'It pumps blood to the whole body, not just the lungs',
          options: ['It pumps blood to the whole body, not just the lungs',
                    'It holds a much larger volume of blood',
                    'It is closer to the lungs than the other one',
                    'It receives blood from the vena cava'] },
        hint: 'Compare how far the blood from each chamber has to travel.',
        explanation: 'The <b>left ventricle</b> (9) pumps blood through the aorta to the entire body, so it needs much more force. The <b>right ventricle</b> (10) only pumps to the lungs, which are close by, so its wall is thinner.' },
    ],
  }),

  makeTask({
    id: 'g9s-lbl-002', chapterId: 'g9enr-label', subsection: 'body', difficulty: 3,
    intro: 'Look again at the heart diagram. Vessels 3 and 11 bring blood <b>into</b> the heart; vessel 5 carries it away.',
    stimulus: { html: _HEART_FIG, altText: _HEART_ALT },
    parts: [
      { label: 'a', marks: 2,
        prompt: 'Name the vessel marked <b>5</b> and the vessel marked <b>6</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['5', '6'],
          answer: [['pulmonary artery'], ['pulmonary vein']],
          bank: ['pulmonary vein', 'aorta', 'pulmonary artery', 'vena cava'] },
        hint: 'Both serve the lungs. An artery carries blood away from the heart.',
        explanation: 'The <b>pulmonary artery</b> (5) carries deoxygenated blood from the right ventricle to the lungs; the <b>pulmonary vein</b> (6) brings oxygenated blood back. They are the exception to the usual rule, since here the artery carries the deoxygenated blood.' },

      { label: 'b', marks: 1,
        prompt: 'Vessels <b>3</b> and <b>11</b> both empty into chamber 1. What are they?',
        response: { kind: 'choice', answer: 'The superior and inferior vena cava',
          options: ['The superior and inferior vena cava', 'The left and right aorta',
                    'The upper and lower pulmonary veins', 'The mitral and aortic valves'] },
        hint: 'One drains the upper body and one drains the lower body.',
        explanation: 'The <b>superior vena cava</b> (3) drains the head and arms and the <b>inferior vena cava</b> (11) drains the rest of the body. Both return deoxygenated blood to the right atrium.' },
    ],
  }),

  // ⚠ KEY READ FROM THE FIGURE, NOT A LEGEND — the Commons description for this
  //   file is only its German title, "leaf cross-section with leaf vein, to
  //   label". Every other figure in these chapters is keyed from the
  //   illustrator's own numbered legend, which is the stronger source. It is
  //   safe here because the anatomy is unmistakable: the tall columnar cells
  //   packed with chloroplasts ARE the palisade layer, the loose cells with air
  //   gaps ARE the spongy layer, and the bundle on the right IS the vein.
  //   ⚠ Markers a and g are both the cuticle (upper and lower), so only a is
  //   asked — two blanks with the same answer reads as a trick.
  makeTask({
    id: 'g9s-lbl-003', chapterId: 'g9enr-label', subsection: 'plant', difficulty: 3,
    intro: 'The diagram shows a section cut through a leaf, seen under a microscope.',
    stimulus: { html: _LEAF_FIG, altText: _LEAF_ALT },
    parts: [
      { label: 'a', marks: 4,
        prompt: 'Name the layers marked <b>b</b>, <b>c</b>, <b>d</b> and <b>e</b>.',
        response: { kind: 'blanks', numeric: false,
          labels: ['b', 'c', 'd', 'e'],
          answer: [
            ['upper epidermis', 'epidermis'],
            ['palisade mesophyll', 'palisade layer', 'palisade'],
            ['spongy mesophyll', 'spongy layer', 'spongy'],
            ['vascular bundle', 'vein', 'leaf vein'],
          ],
          bank: ['spongy mesophyll', 'vascular bundle', 'cuticle',
                 'palisade mesophyll', 'upper epidermis', 'root hair'] },
        hint: 'Two words are not needed. Work down from the top surface.',
        explanation: 'Below the waxy <b>cuticle</b> (a) lies the <b>upper epidermis</b> (b), then the <b>palisade mesophyll</b> (c) of tall cells packed with chloroplasts, then the <b>spongy mesophyll</b> (d) with its air spaces, and the <b>vascular bundle</b> (e) carrying water and food.' },

      { label: 'b', marks: 1,
        prompt: 'Why are the cells in layer <b>c</b> tall, packed tightly, and full of chloroplasts?',
        response: { kind: 'choice', answer: 'They are where most photosynthesis happens',
          options: ['They are where most photosynthesis happens',
                    'They store the water the leaf will need',
                    'They let gases move through the leaf',
                    'They give the leaf its waterproof surface'] },
        hint: 'This layer sits nearest the top surface, so it receives the most light.',
        explanation: 'The <b>palisade mesophyll</b> is directly under the upper surface where light is strongest, so its cells are packed with chloroplasts and carry out <b>most of the photosynthesis</b>. Gas movement is the job of the spongy layer below it.' },

      { label: 'c', marks: 1,
        prompt: 'Layer <b>d</b> has large air spaces between its cells. What are they for?',
        response: { kind: 'choice', answer: 'To let carbon dioxide and oxygen move through the leaf',
          options: ['To let carbon dioxide and oxygen move through the leaf',
                    'To make the leaf lighter so it does not fall',
                    'To store starch made during the day',
                    'To keep rainwater inside the leaf'] },
        hint: 'Gases have to reach every cell that photosynthesises.',
        explanation: 'The air spaces of the <b>spongy mesophyll</b> let <b>carbon dioxide reach the photosynthesising cells and oxygen leave</b>. The gases enter and leave through the stomata in the lower epidermis.' },

      { label: 'd', marks: 1,
        prompt: 'What does the <b>vascular bundle</b> at <b>e</b> carry?',
        response: { kind: 'choice', answer: 'Water in and sugars out',
          options: ['Water in and sugars out', 'Only oxygen out', 'Only carbon dioxide in', 'Light to the palisade cells'] },
        hint: 'It contains xylem and phloem.',
        explanation: 'The <b>xylem</b> brings water and minerals up from the roots and the <b>phloem</b> carries the sugars made in the leaf away to the rest of the plant.' },
    ],
  })

);

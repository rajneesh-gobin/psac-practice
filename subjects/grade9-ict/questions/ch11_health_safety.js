'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 ICT - Health & Safety   (examWeight 1)
//
//  ⚠ SMALL BUT PRESENT IN EVERY PAPER. It is asked as one or two 1-mark parts
//    inside Q1 or the ethics slot - "state one health problem caused by
//    prolonged computer use", "state one rule of the computer laboratory" - so
//    it earns a weight of 1 rather than 0.
//
//  ⚠ THE ANSWERS ARE PRECAUTIONS, NOT MEDICINE. The papers award the mark for
//    naming the hazard and the practical step that prevents it; nothing here
//    asks for a diagnosis or a treatment.
//
//  Source: NCE ICT (N540) 2021-2025; NCF Grades 7-9 §8.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9ict-health-safety';

const MCQ = [
  ['g9ict-hs-001', 'health_hazards', 1,
   'Which health problem is most associated with staring at a screen for hours?',
   ['Eye strain', 'A broken bone', 'A sore throat', 'Toothache'], 'Eye strain',
   'Which part of the body is working hardest?',
   'Long periods of close screen work tire the eye muscles, causing eye strain, headaches and blurred vision.'],

  ['g9ict-hs-002', 'health_hazards', 1,
   'Sitting badly at a computer for long periods most often causes:',
   ['Back and neck pain', 'Loss of hearing', 'A high temperature', 'A skin rash'],
   'Back and neck pain',
   'Think about which parts hold you upright.',
   'Poor posture strains the muscles of the back and neck, which is why chair and screen height matter.'],

  ['g9ict-hs-003', 'health_hazards', 2,
   'What does <b>RSI</b> stand for?',
   ['Repetitive Strain Injury', 'Rapid System Interrupt',
    'Reduced Screen Illumination', 'Regular Safety Inspection'],
   'Repetitive Strain Injury',
   'It comes from doing the same movement over and over.',
   'RSI - Repetitive Strain Injury - affects the wrists, hands and arms after long periods of typing or mouse use.'],

  ['g9ict-hs-004', 'health_hazards', 2,
   'Which part of the body is most affected by Repetitive Strain Injury from typing?',
   ['The wrists and hands', 'The knees', 'The ears', 'The stomach'],
   'The wrists and hands',
   'Which part makes the repeated movement?',
   'Typing and mouse use repeat small movements of the wrists and fingers, which is where RSI appears.'],

  ['g9ict-hs-005', 'health_hazards', 3,
   'A pupil complains of headaches and dry eyes after two hours at a computer with no break. What is the most likely cause?',
   ['Eye strain from continuous screen use',
    'A fault in the hard disk',
    'Too little RAM in the computer',
    'A slow internet connection'],
   'Eye strain from continuous screen use',
   'The symptoms are in the eyes and head.',
   'Continuous close focus without breaks tires the eyes, producing headaches, dryness and blurred vision.'],

  ['g9ict-hs-006', 'hazard_prevention', 1,
   'What is the best way to reduce eye strain when working at a computer?',
   ['Take regular breaks and look away from the screen',
    'Sit as close to the screen as possible',
    'Turn the brightness to maximum',
    'Work in a completely dark room'],
   'Take regular breaks and look away from the screen',
   'The eyes need to refocus at a distance.',
   'Regular breaks let the eye muscles relax and refocus, which is the standard advice for screen work.'],

  ['g9ict-hs-007', 'hazard_prevention', 2,
   'Which of these helps prevent back pain at a computer?',
   ['An adjustable chair with good back support',
    'A larger monitor set further back from the desk',
    'A faster processor inside the computer itself',
    'A wireless mouse used with the other hand'],
   'An adjustable chair with good back support',
   'Only one of these changes how you sit.',
   'An adjustable chair supporting the lower back keeps the spine in a natural position.'],

  ['g9ict-hs-008', 'hazard_prevention', 2,
   'How should a monitor be positioned to reduce neck strain?',
   ['At about eye level, an arm&rsquo;s length away',
    'As low as possible on the desk',
    'Directly in front of a bright window',
    'Turned to face away from the user'],
   'At about eye level, an arm&rsquo;s length away',
   'The head should not have to tilt.',
   'A screen at eye level and roughly an arm&rsquo;s length away keeps the neck straight and the eyes comfortable.'],

  ['g9ict-hs-009', 'hazard_prevention', 2,
   'Which measure most directly reduces Repetitive Strain Injury?',
   ['A wrist rest and regular breaks from typing',
    'A brighter monitor placed on the desk',
    'A larger hard disk inside the computer',
    'A faster internet connection to the room'],
   'A wrist rest and regular breaks from typing',
   'It must change how the hands work.',
   'Supporting the wrists and pausing regularly breaks the repetition that causes RSI.'],

  ['g9ict-hs-010', 'hazard_prevention', 3,
   'A computer room has bright sunlight reflecting off every screen. What is the best solution?',
   ['Fit blinds at the windows', 'Turn all the screens off',
    'Move the keyboards further away', 'Increase the room temperature'],
   'Fit blinds at the windows',
   'Deal with the light, not the computers.',
   'Blinds control the light that causes glare, which is what makes the screens hard to read.'],

  ['g9ict-hs-011', 'safety_precautions', 1,
   'Why should food and drink be kept away from computers?',
   ['A spill can damage the equipment and cause a shock',
    'Crumbs make the processor run much faster',
    'It is against the timetable',
    'The screen would become brighter'],
   'A spill can damage the equipment and cause a shock',
   'Think about liquid and electricity.',
   'Liquid spilled into a keyboard or a socket damages equipment and creates a risk of electric shock.'],

  ['g9ict-hs-012', 'safety_precautions', 1,
   'Trailing cables across the floor of a computer room are mainly a:',
   ['Trip hazard', 'Fire extinguisher', 'Storage device', 'Health benefit'],
   'Trip hazard',
   'What happens when someone walks past?',
   'Loose cables across a walkway cause trips and falls, and should be secured or routed away.'],

  ['g9ict-hs-013', 'safety_precautions', 2,
   'What should be done if a power cable is frayed or damaged?',
   ['Report it and stop using that equipment',
    'Wrap it in paper and carry on',
    'Pull it out by the cable',
    'Use it only for short periods'],
   'Report it and stop using that equipment',
   'A damaged cable is an electrical risk.',
   'A damaged cable can cause a shock or a fire; it must be reported and the equipment taken out of use.'],

  ['g9ict-hs-014', 'safety_precautions', 2,
   'Why should too many devices not be plugged into one socket?',
   ['It can overload the circuit and start a fire',
    'It slows down the internet',
    'It uses more disk space',
    'It reduces the screen resolution slightly'],
   'It can overload the circuit and start a fire',
   'Think about the current in one wire.',
   'Overloading a socket draws more current than the circuit is rated for, which causes overheating and fire.'],

  ['g9ict-hs-015', 'safety_precautions', 3,
   'A computer room must be kept ventilated mainly because:',
   ['Equipment generates heat that must escape',
    'Cool air makes the software run correctly',
    'Fresh air cleans the hard disks',
    'Ventilation increases the network speed'],
   'Equipment generates heat that must escape',
   'What do many machines produce in one room?',
   'Computers give off heat; without ventilation the room and the equipment overheat.'],

  ['g9ict-hs-016', 'lab_guidelines', 1,
   'Which of these is a normal rule in a computer laboratory?',
   ['Do not eat or drink at the computers',
    'Move the computers whenever you like',
    'Change other pupils&rsquo; passwords',
    'Unplug the machines before leaving'],
   'Do not eat or drink at the computers',
   'Three of these would cause a problem.',
   'No food or drink is a standard laboratory rule because a spill damages equipment.'],

  ['g9ict-hs-017', 'lab_guidelines', 2,
   'Why should a pupil log off rather than just walk away from a computer?',
   ['Someone else could use their account',
    'The screen would break',
    'The files would be deleted automatically',
    'The keyboard would stop working'],
   'Someone else could use their account',
   'The account is still open.',
   'An account left signed in can be used by anyone, and whatever they do is recorded as the owner&rsquo;s work.'],

  ['g9ict-hs-018', 'lab_guidelines', 2,
   'What should be done before leaving the computer laboratory at the end of a lesson?',
   ['Shut down the computer and push in the chair',
    'Unplug the network cable at the back',
    'Delete the day&rsquo;s files',
    'Turn the monitor to face the wall'],
   'Shut down the computer and push in the chair',
   'Leave the place safe and tidy for the next class.',
   'Shutting down properly protects the equipment and data, and a pushed-in chair keeps the walkway clear.'],

  ['g9ict-hs-019', 'equipment_care', 2,
   'How should a screen be cleaned?',
   ['With a soft dry cloth made for screens',
    'With plenty of water poured onto it',
    'With a sharp metal scraper',
    'With rough sandpaper'],
   'With a soft dry cloth made for screens',
   'The surface scratches easily and hates liquid.',
   'A soft cloth removes dust without scratching the surface or letting liquid into the equipment.'],

  ['g9ict-hs-020', 'equipment_care', 3,
   'Why should a USB flash drive be removed using "safely remove hardware" rather than simply pulled out?',
   ['Data still being written could be lost or corrupted',
    'The USB port would be scratched by the metal casing',
    'The computer would restart as soon as it was removed',
    'The drive would lose the label printed on its case'],
   'Data still being written could be lost or corrupted',
   'The computer may not have finished writing.',
   'Ejecting safely tells the operating system to finish writing, so no file is left half-written and unreadable.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const SHORT = [
  ['g9ict-hs-021', 'health_hazards', 2,
   'Write in full what <b>RSI</b> stands for.',
   'Repetitive Strain Injury', ['repetitive strain injury'],
   'Three words.', 'RSI stands for Repetitive Strain Injury.'],
  ['g9ict-hs-022', 'health_hazards', 1,
   'Name the eye problem caused by staring at a screen for long periods without a break.',
   'Eye strain', ['eyestrain', 'eye-strain'],
   'Two words.', 'Continuous screen work causes eye strain.'],
  ['g9ict-hs-023', 'hazard_prevention', 2,
   'State one way of reducing back pain when working at a computer.',
   'Use an adjustable chair with back support',
   ['adjustable chair', 'sit with good posture', 'good posture',
    'use a chair with back support', 'take regular breaks'],
   'It concerns how you sit.',
   'An adjustable chair supporting the lower back keeps the spine in a natural position.'],
  ['g9ict-hs-024', 'safety_precautions', 1,
   'State one reason why food and drink are not allowed near computers.',
   'A spill can damage the equipment',
   ['spills damage equipment', 'liquid can cause an electric shock',
    'a spill can cause a shock', 'it can damage the computer'],
   'Think about liquid and electricity.',
   'Spilled liquid damages equipment and creates a risk of electric shock.'],
  ['g9ict-hs-025', 'lab_guidelines', 2,
   'State what a pupil should do to their account before leaving a shared computer.',
   'Log off', ['log out', 'sign out', 'log off the account'],
   'Two words.',
   'Logging off stops anyone else using the account that is still open.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});

// ⚠ DEPTH TOP-UP: `equipment_care` held two items.
const MCQ2 = [
  ['g9ict-hs-026', 'equipment_care', 1,
   'How should a computer be switched off at the end of the day?',
   ['Using Shut down, so the operating system closes properly',
    'By pulling the power plug out of the wall socket',
    'By switching off the monitor and leaving the rest on',
    'By closing the lid and walking away from the machine'],
   'Using Shut down, so the operating system closes properly',
   'The software must finish what it is doing.',
   'Shut down lets the operating system close its files first; cutting the power can corrupt them.'],

  ['g9ict-hs-027', 'equipment_care', 2,
   'Why should the vents on a computer case not be blocked?',
   ['The machine would overheat', 'The screen would go dim',
    'The keyboard would stop working', 'The files would be deleted'],
   'The machine would overheat',
   'Air must be able to move through it.',
   'Vents let hot air escape; blocking them traps the heat the components produce.'],

  ['g9ict-hs-028', 'equipment_care', 2,
   'How should a laptop be carried between classrooms?',
   ['Closed, in a padded bag, held with both hands',
    'Open, carried by the screen alone',
    'Balanced on top of a pile of books',
    'By the power cable hanging down'],
   'Closed, in a padded bag, held with both hands',
   'Protect the screen and the hinges.',
   'A padded bag protects it from knocks, and carrying it by the screen or the cable damages the hinge and the socket.'],
];

MCQ2.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

})();

'use strict';

(function () {

const CH = 'g8s-mixtures';

// Filtration apparatus. The alt text names the apparatus generically on
// purpose: saying "a filter funnel" would answer the question about it.
const apparatus =
  '<svg viewBox="0 0 200 170" width="200" role="img" aria-label="a diagram of laboratory apparatus">' +
  '<line x1="30" y1="160" x2="30" y2="20" stroke="#334155" stroke-width="4"/>' +
  '<rect x="10" y="158" width="60" height="8" fill="#334155"/>' +
  '<line x1="30" y1="40" x2="70" y2="40" stroke="#334155" stroke-width="4"/>' +
  '<polygon points="70,30 130,30 104,74 96,74" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>' +
  '<polygon points="76,34 124,34 102,70 98,70" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3 2"/>' +
  '<rect x="96" y="74" width="8" height="26" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>' +
  '<path d="M74 110 L74 156 Q74 160 78 160 L122 160 Q126 160 126 156 L126 110" fill="none" stroke="#334155" stroke-width="2"/>' +
  '<path d="M74 132 L126 132 L126 156 Q126 160 122 160 L78 160 Q74 160 74 156 Z" fill="#bfdbfe"/>' +
  '<circle cx="100" cy="104" r="2.5" fill="#3b82f6"/>' +
  '<circle cx="100" cy="118" r="2.5" fill="#3b82f6"/>' +
  '</svg>';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8s-mixtures-016', chapterId: CH, difficulty: 2, subsection: 'separation_techniques',
    question: 'Muddy water is poured into the apparatus shown.' + apparatus + 'What collects in the beaker underneath?',
    options: ['The filtrate', 'The residue', 'The solute', 'The crystals'],
    answer: 'The filtrate',
    hint: 'Name what passes THROUGH the paper, not what is trapped by it.',
    explanation: 'The clear liquid that runs through the paper is the filtrate. The residue is the mud left behind on the paper, the solute is a dissolved substance (mud is not dissolved), and crystals only form later if the liquid is evaporated.'
  }),

  makeMCQ({
    id: 'g8s-mixtures-017', chapterId: CH, difficulty: 3, subsection: 'principles_separation',
    question: 'A pupil filters muddy water carefully, but the liquid coming through is still cloudy. What is the most likely fault?',
    options: ['The filter paper was torn', 'The funnel was too small', 'The beaker was dirty', 'The mixture was too warm'],
    answer: 'The filter paper was torn',
    hint: 'Cloudy means solid particles got through. What would let them through?',
    explanation: 'A tear lets mud pass straight through, so the filtrate stays cloudy. A small funnel only slows filtration down, a dirty beaker would not make the liquid uniformly cloudy, and warming the mixture does not change the size of the mud particles.'
  }),

  makeText({
    id: 'g8s-mixtures-018', chapterId: CH, difficulty: 2, subsection: 'separation_techniques',
    question: 'Sea water is boiled and the steam is then cooled back into pure liquid water, which is collected. Name this separation technique.',
    answer: 'distillation',
    alsoAccept: ['simple distillation', 'distilling'],
    hint: 'Two changes of state happen in turn: liquid to gas, then gas back to liquid.',
    explanation: 'Boiling and then condensing the vapour is distillation, and it is how pure water is obtained from sea water. Plain evaporation loses the water to the air and keeps only the salt, and filtration cannot remove a dissolved solid at all.'
  }),

  makeMCQ({
    id: 'g8s-mixtures-019', chapterId: CH, difficulty: 2, subsection: 'types_mixtures',
    question: 'Which mixture can be separated by moving a magnet over it?',
    options: ['Iron and sulphur', 'Salt and water', 'Sand and sugar', 'Oil and water'],
    answer: 'Iron and sulphur',
    hint: 'Only one of the substances listed is attracted to a magnet.',
    explanation: 'Iron is magnetic and sulphur is not, so a magnet lifts the iron out. Salt, water, sand, sugar and oil are all non-magnetic, so a magnet passed over any of those mixtures picks up nothing.'
  }),

  makeMCQ({
    id: 'g8s-mixtures-020', chapterId: CH, difficulty: 3, subsection: 'principles_separation',
    question: 'Ethanol and water are mixed. Filtration cannot separate them, but distillation can. Why?',
    options: ['They boil at different temperatures', 'They freeze at the same temperature', 'They are both insoluble in water', 'They have the same density'],
    answer: 'They boil at different temperatures',
    hint: 'Distillation separates by turning one substance into a gas before the other.',
    explanation: 'Ethanol boils at 78 °C and water at 100 °C, so on gentle heating the ethanol vapour comes off first and is condensed. They do not freeze at the same temperature, ethanol mixes with water completely rather than being insoluble, and their densities differ — but none of those is what distillation uses.'
  })

);

})();

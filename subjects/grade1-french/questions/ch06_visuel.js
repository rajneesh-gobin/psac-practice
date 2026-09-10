'use strict';
// grade1-french — visual bank: pictures, colours, diagrams, syllables.
// IDs: g1fr-co-061…078, g1fr-eo-061…078, g1fr-lec-061…078,
//      g1fr-ecr-061…078, g1fr-grm-061…078

(function () {

const CH_CO  = 'g1fr-comprehension-orale';
const CH_EO  = 'g1fr-expression-orale';
const CH_LEC = 'g1fr-lecture';
const CH_ECR = 'g1fr-ecriture';
const CH_GRM = 'g1fr-grammaire';

const RED = '#EF4444', BLUE = '#3B82F6', GREEN = '#22C55E', YELLOW = '#FACC15',
      ORANGE = '#F97316', PURPLE = '#A855F7', PINK = '#EC4899', BROWN = '#92400E',
      BLACK = '#111827', WHITE = '#FFFFFF', GREY = '#9CA3AF';

function fig(label, w, h, maxw, body) {
  return '<div style="text-align:center;margin:.5em 0" aria-label="' + label + '">' +
    '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:' + maxw + 'px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
    '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="8" fill="#ffffff"/>' +
    body + '</svg></div>';
}
function at(x, y, s, body) {
  return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')">' + body + '</g>';
}
function txt(x, y, size, t) {
  return '<text x="' + x + '" y="' + y + '" font-family="system-ui, sans-serif" font-size="' + size +
    '" fill="#1f2937" text-anchor="middle">' + t + '</text>';
}
function one(obj, label) { return fig(label || 'un dessin d’objet', 100, 100, 140, obj); }
function pics(list, labels, label) {
  const w = 20 + list.length * 80;
  let body = '';
  for (let i = 0; i < list.length; i++) {
    body += at(20 + i * 80, 6, 0.62, list[i]);
    body += txt(51 + i * 80, 99, 18, labels[i]);
  }
  return fig(label || 'des dessins étiquetés', w, 108, Math.min(340, w), body);
}
function beats(n) {
  let body = '';
  for (let i = 0; i < n; i++) body += '<circle cx="' + (32 + i * 52) + '" cy="32" r="19" fill="#3B82F6" stroke="#111827" stroke-width="3"/>';
  return fig('des ronds en ligne', 22 + n * 52, 64, Math.min(300, 70 + n * 52), body);
}
function bigLetter(ch) {
  return fig('une lettre écrite en grand', 100, 100, 130,
    '<text x="50" y="76" font-family="system-ui, sans-serif" font-size="66" fill="#1f2937" text-anchor="middle">' + ch + '</text>');
}
function boxes(chars) {
  const w = 12 + chars.length * 46;
  let body = '';
  for (let i = 0; i < chars.length; i++) {
    body += '<rect x="' + (10 + i * 46) + '" y="10" width="38" height="48" rx="6" fill="#ffffff" stroke="#111827" stroke-width="3"/>';
    if (chars[i]) body += txt(29 + i * 46, 45, 26, chars[i]);
  }
  return fig('des lettres dans des cases', w, 70, Math.min(320, w * 1.1), body);
}

const L4 = ['A', 'B', 'C', 'D'];
const N4 = ['1', '2', '3', '4'];

// ── drawings, each inside its own 100 × 100 box ──────────────────────────────
function pomme(c) {
  return '<rect x="47" y="14" width="6" height="18" fill="#92400E"/>' +
    '<path d="M53 20 q18 -10 26 4" fill="none" stroke="#22C55E" stroke-width="5" stroke-linecap="round"/>' +
    '<circle cx="50" cy="60" r="32" fill="' + c + '" stroke="#111827" stroke-width="3"/>';
}
function ballon(c) {
  return '<circle cx="50" cy="50" r="34" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M16 50 h68" stroke="#111827" stroke-width="3" fill="none"/>' +
    '<path d="M50 16 q16 34 0 68" stroke="#111827" stroke-width="3" fill="none"/>' +
    '<path d="M50 16 q-16 34 0 68" stroke="#111827" stroke-width="3" fill="none"/>';
}
function maison(wall, roof, door) {
  return '<rect x="18" y="46" width="64" height="44" fill="' + wall + '" stroke="#111827" stroke-width="3"/>' +
    '<polygon points="50,14 92,48 8,48" fill="' + roof + '" stroke="#111827" stroke-width="3"/>' +
    '<rect x="42" y="64" width="18" height="26" fill="' + door + '" stroke="#111827" stroke-width="3"/>';
}
function maisonF(wall, roof, door, win) {
  return maison(wall, roof, door) +
    '<rect x="22" y="54" width="16" height="14" fill="' + win + '" stroke="#111827" stroke-width="2"/>' +
    '<path d="M30 54 v14 M22 61 h16" stroke="#111827" stroke-width="2"/>';
}
function fenetre(c) {
  return '<rect x="18" y="20" width="64" height="60" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M50 20 v60 M18 50 h64" stroke="#111827" stroke-width="3" fill="none"/>';
}
function porte(c) {
  return '<rect x="26" y="12" width="48" height="78" rx="4" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="64" cy="52" r="4" fill="#111827"/>';
}
function soleil(c) {
  return '<path d="M50 6 v16 M50 78 v16 M6 50 h16 M78 50 h16 M19 19 l11 11 M70 70 l11 11 M81 19 l-11 11 M30 70 l-11 11" stroke="' + c + '" stroke-width="6" stroke-linecap="round" fill="none"/>' +
    '<circle cx="50" cy="50" r="24" fill="' + c + '" stroke="#111827" stroke-width="3"/>';
}
function etoile(c) {
  return '<polygon points="50,8 61,38 93,38 67,57 77,90 50,70 23,90 33,57 7,38 39,38" fill="' + c + '" stroke="#111827" stroke-width="3"/>';
}
function lune() {
  return '<circle cx="46" cy="50" r="36" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="72" cy="42" r="32" fill="#ffffff"/>';
}
function arbre(c) {
  return '<rect x="44" y="52" width="12" height="38" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="50" cy="38" r="28" fill="' + c + '" stroke="#111827" stroke-width="3"/>';
}
function fleur(c) {
  return '<rect x="47" y="46" width="6" height="46" fill="#22C55E"/>' +
    '<path d="M50 72 q-18 -8 -24 4 q16 10 24 -4 z" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="50" cy="20" r="13" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="31" cy="34" r="13" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="69" cy="34" r="13" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="38" cy="54" r="13" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="62" cy="54" r="13" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<circle cx="50" cy="37" r="11" fill="#FACC15" stroke="#111827" stroke-width="2"/>';
}
function bateau(hull, sail) {
  return '<rect x="48" y="14" width="5" height="52" fill="#92400E"/>' +
    '<polygon points="45,18 45,62 12,62" fill="' + sail + '" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="56,26 56,62 84,62" fill="' + sail + '" stroke="#111827" stroke-width="2"/>' +
    '<path d="M10 66 h80 l-12 20 h-56 z" fill="' + hull + '" stroke="#111827" stroke-width="3"/>';
}
function voiture(c) {
  return '<path d="M26 48 l10 -18 h28 l10 18 z" fill="#BFDBFE" stroke="#111827" stroke-width="3"/>' +
    '<rect x="10" y="48" width="80" height="24" rx="6" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="30" cy="76" r="11" fill="#111827"/><circle cx="70" cy="76" r="11" fill="#111827"/>' +
    '<circle cx="30" cy="76" r="4" fill="#9CA3AF"/><circle cx="70" cy="76" r="4" fill="#9CA3AF"/>';
}
function livre(c) {
  return '<rect x="12" y="24" width="76" height="54" rx="3" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M50 24 v54" stroke="#111827" stroke-width="3"/>' +
    '<path d="M20 38 h22 M20 50 h22 M58 38 h22 M58 50 h22" stroke="#111827" stroke-width="2" fill="none"/>';
}
function cahier(c) {
  return '<rect x="22" y="12" width="56" height="76" rx="3" fill="#ffffff" stroke="#111827" stroke-width="3"/>' +
    '<rect x="22" y="12" width="11" height="76" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M39 30 h32 M39 44 h32 M39 58 h32 M39 72 h32" stroke="#9CA3AF" stroke-width="3" fill="none"/>';
}
function crayon(c) {
  return '<rect x="40" y="8" width="20" height="8" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
    '<rect x="40" y="16" width="20" height="54" fill="' + c + '" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="40,70 60,70 50,92" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
    '<polygon points="45,81 55,81 50,92" fill="#111827"/>';
}
function table() {
  return '<rect x="8" y="34" width="84" height="10" rx="2" fill="#92400E" stroke="#111827" stroke-width="3"/>' +
    '<rect x="16" y="44" width="9" height="46" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="75" y="44" width="9" height="46" fill="#92400E" stroke="#111827" stroke-width="2"/>';
}
function chaise() {
  return '<rect x="24" y="12" width="10" height="78" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<path d="M28 24 h30 M28 36 h30" stroke="#92400E" stroke-width="7" fill="none"/>' +
    '<rect x="24" y="48" width="56" height="9" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
    '<rect x="70" y="57" width="9" height="33" fill="#92400E" stroke="#111827" stroke-width="2"/>';
}
function banane() {
  return '<path d="M18 24 q4 46 34 54 q22 6 30 -6 q-9 4 -19 0 q-30 -12 -34 -50 z" fill="#FACC15" stroke="#111827" stroke-width="3" stroke-linejoin="round"/>';
}
function nuage(c) {
  return '<circle cx="34" cy="54" r="16" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="54" cy="44" r="21" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="74" cy="55" r="15" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<rect x="30" y="55" width="46" height="15" fill="' + c + '"/>' +
    '<path d="M28 70 h50" stroke="#111827" stroke-width="3" fill="none"/>';
}
function pluie() {
  return nuage('#9CA3AF') +
    '<path d="M34 76 v14 M52 78 v14 M70 76 v14" stroke="#3B82F6" stroke-width="5" stroke-linecap="round" fill="none"/>';
}
function tasse(c) {
  return '<path d="M24 28 h44 v32 a22 22 0 0 1 -44 0 z" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M68 36 a13 13 0 0 1 0 22" fill="none" stroke="#111827" stroke-width="4"/>' +
    '<rect x="18" y="84" width="64" height="7" rx="3" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>';
}
function verreEau() {
  return '<path d="M30 20 h40 l-6 66 h-28 z" fill="#DBEAFE" stroke="#111827" stroke-width="3"/>' +
    '<path d="M33 46 h34" stroke="#3B82F6" stroke-width="4" fill="none"/>';
}
function assiette(food) {
  return '<ellipse cx="50" cy="54" rx="40" ry="26" fill="#ffffff" stroke="#111827" stroke-width="3"/>' +
    '<ellipse cx="50" cy="54" rx="26" ry="16" fill="#ffffff" stroke="#9CA3AF" stroke-width="2"/>' +
    (food ? '<circle cx="50" cy="52" r="11" fill="#F97316" stroke="#111827" stroke-width="2"/>' : '');
}
function lit() {
  return '<rect x="10" y="34" width="14" height="40" fill="#92400E" stroke="#111827" stroke-width="3"/>' +
    '<rect x="76" y="46" width="14" height="28" fill="#92400E" stroke="#111827" stroke-width="3"/>' +
    '<rect x="10" y="54" width="80" height="20" fill="#3B82F6" stroke="#111827" stroke-width="3"/>' +
    '<rect x="26" y="42" width="28" height="13" rx="4" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
    '<rect x="14" y="74" width="8" height="14" fill="#92400E"/><rect x="78" y="74" width="8" height="14" fill="#92400E"/>';
}
function cle() {
  return '<circle cx="30" cy="50" r="18" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="30" cy="50" r="7" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
    '<rect x="46" y="45" width="42" height="10" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
    '<rect x="70" y="55" width="8" height="13" fill="#FACC15" stroke="#111827" stroke-width="3"/>';
}
function sac(c) {
  return '<path d="M34 40 a16 16 0 0 1 32 0" fill="none" stroke="#111827" stroke-width="4"/>' +
    '<rect x="20" y="38" width="60" height="50" rx="6" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<rect x="20" y="56" width="60" height="9" fill="#111827"/>';
}
function boite(c) {
  return '<rect x="18" y="38" width="64" height="46" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<rect x="12" y="26" width="76" height="14" fill="' + c + '" stroke="#111827" stroke-width="3"/>' +
    '<path d="M50 40 v44" stroke="#111827" stroke-width="3" fill="none"/>';
}
function cadeau() {
  return boite('#EC4899') +
    '<path d="M50 26 v-8" stroke="#111827" stroke-width="3" fill="none"/>' +
    '<circle cx="42" cy="16" r="8" fill="#FACC15" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="58" cy="16" r="8" fill="#FACC15" stroke="#111827" stroke-width="3"/>';
}
function tableauNoir() {
  return '<rect x="6" y="16" width="88" height="60" rx="3" fill="#166534" stroke="#92400E" stroke-width="6"/>' +
    '<path d="M18 34 h44 M18 48 h56 M18 62 h32" stroke="#ffffff" stroke-width="4" fill="none"/>' +
    '<rect x="24" y="80" width="52" height="8" rx="3" fill="#92400E" stroke="#111827" stroke-width="2"/>';
}
function gomme() {
  return '<rect x="18" y="40" width="64" height="28" rx="5" fill="#F9A8D4" stroke="#111827" stroke-width="3"/>' +
    '<rect x="18" y="40" width="64" height="11" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>';
}
function gateau() {
  return '<ellipse cx="50" cy="22" rx="5" ry="8" fill="#F97316"/>' +
    '<rect x="47" y="28" width="6" height="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
    '<rect x="16" y="46" width="68" height="34" rx="3" fill="#F9A8D4" stroke="#111827" stroke-width="3"/>' +
    '<rect x="16" y="60" width="68" height="9" fill="#92400E"/>';
}
function feu(lit1) {
  return '<rect x="30" y="6" width="40" height="78" rx="8" fill="#374151" stroke="#111827" stroke-width="3"/>' +
    '<circle cx="50" cy="26" r="12" fill="' + (lit1 === 'r' ? '#EF4444' : '#7F1D1D') + '"/>' +
    '<circle cx="50" cy="46" r="12" fill="#78716C"/>' +
    '<circle cx="50" cy="66" r="12" fill="' + (lit1 === 'v' ? '#22C55E' : '#14532D') + '"/>' +
    '<rect x="45" y="84" width="10" height="12" fill="#374151"/>';
}

// ── scenes ───────────────────────────────────────────────────────────────────
function scLivreTable() {
  return fig('une petite scène', 200, 130, 260,
    at(50, 26, 1, table()) + at(76, 27, 0.42, livre(BLUE)));
}
function scBallonTable() {
  return fig('une petite scène', 200, 130, 260,
    at(50, 26, 1, table()) + at(76, 25, 0.42, ballon(RED)));
}
function scBallonChaise() {
  return fig('une petite scène', 200, 130, 260,
    at(50, 18, 1, chaise()) + at(70, 74, 0.4, ballon(RED)));
}
function scSoleilMaison() {
  return fig('une petite scène', 200, 130, 260,
    at(120, 2, 0.52, soleil(YELLOW)) + at(50, 26, 1, maisonF('#FDE68A', RED, BROWN, '#BFDBFE')));
}
function scMaisonPorteRouge() {
  return fig('une petite scène', 160, 130, 200,
    at(30, 22, 1.05, maisonF('#FDE68A', GREY, RED, '#BFDBFE')));
}
function scBateauMer(hull) {
  return fig('une petite scène', 200, 120, 260,
    '<rect x="0" y="82" width="200" height="30" fill="#BFDBFE"/>' +
    '<path d="M8 96 q12 -7 24 0 q12 7 24 0 M112 96 q12 -7 24 0 q12 7 24 0" stroke="#3B82F6" stroke-width="3" fill="none"/>' +
    at(50, 8, 1, bateau(hull, WHITE)));
}
function scCrayonCahier() {
  return fig('une petite scène', 200, 120, 250,
    at(60, 12, 1, cahier(RED)) + at(84, 18, 0.62, crayon(BLUE)));
}
function scLivreSac() {
  return fig('une petite scène', 180, 120, 230,
    at(65, 12, 0.45, livre(GREEN)) + at(40, 18, 1, sac('#F97316')));
}
function scVoitureRoute() {
  return fig('une petite scène', 200, 115, 260,
    '<rect x="0" y="76" width="200" height="30" fill="#9CA3AF"/>' +
    '<path d="M10 91 h24 M74 91 h24 M138 91 h24" stroke="#ffffff" stroke-width="4" fill="none"/>' +
    at(50, 8, 1, voiture(BLUE)));
}
function scEcole() {
  return fig('une petite scène', 200, 120, 260,
    '<rect x="26" y="46" width="148" height="60" fill="#FDE68A" stroke="#111827" stroke-width="3"/>' +
    '<polygon points="100,14 182,48 18,48" fill="#EF4444" stroke="#111827" stroke-width="3"/>' +
    '<rect x="88" y="74" width="24" height="32" fill="#92400E" stroke="#111827" stroke-width="3"/>' +
    '<rect x="42" y="60" width="24" height="20" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
    '<rect x="134" y="60" width="24" height="20" fill="#BFDBFE" stroke="#111827" stroke-width="2"/>' +
    '<rect x="98" y="2" width="4" height="16" fill="#111827"/>' +
    '<rect x="102" y="3" width="22" height="12" fill="#3B82F6" stroke="#111827" stroke-width="2"/>');
}
function scPorteFleche() {
  return fig('une petite scène', 160, 130, 200,
    at(30, 14, 1.05, porte('#92400E')) +
    '<path d="M140 104 L108 76" stroke="#EF4444" stroke-width="4" fill="none"/>' +
    '<polygon points="102,70 116,74 108,84" fill="#EF4444"/>');
}
function scMaisonFleche() {
  return fig('une petite scène', 200, 140, 250,
    at(50, 6, 1.1, maisonF('#FDE68A', RED, BROWN, '#BFDBFE')) +
    '<path d="M22 128 L64 86" stroke="#EF4444" stroke-width="4" fill="none"/>' +
    '<polygon points="72,78 58,82 66,92" fill="#EF4444"/>');
}
function rowOf(n, obj, gap) {
  const step = gap || 58;
  const w = 20 + n * step;
  let body = '';
  for (let i = 0; i < n; i++) body += at(14 + i * step, 10, 0.5, obj);
  return fig('un dessin d’objets', w, 74, Math.min(320, w * 1.2), body);
}
function rowColours(list) {
  const w = 16 + list.length * 56;
  let body = '';
  for (let i = 0; i < list.length; i++) body += at(12 + i * 56, 8, 0.5, ballon(list[i]));
  return fig('des ballons de couleurs différentes', w, 68, Math.min(330, w * 1.15), body);
}
function twoPanels(a, b) {
  return fig('deux dessins étiquetés', 220, 116, 300,
    '<rect x="6" y="6" width="100" height="82" rx="6" fill="#ffffff" stroke="#9CA3AF" stroke-width="2"/>' +
    '<rect x="114" y="6" width="100" height="82" rx="6" fill="#ffffff" stroke="#9CA3AF" stroke-width="2"/>' +
    a + b + txt(56, 108, 18, 'A') + txt(164, 108, 18, 'B'));
}

STATIC_QUESTIONS.push(

  // ══ COMPRÉHENSION ORALE ══════════════════════════════════════════════════
  // ── discrimination_sons ──
  makeMCQ({ id:'g1fr-co-061', chapterId:CH_CO, difficulty:1, subsection:'discrimination_sons',
    question: pics([ballon(RED), soleil(YELLOW), maison('#FDE68A', RED, BROWN), livre(BLUE)], L4) +
      'Quel dessin commence par le son <b>/b/</b> ?',
    options:L4, answer:'A',
    hint:'Dis chaque mot tout haut et écoute le tout premier son. (Say each word aloud and listen to the first sound.)',
    explanation:'Le dessin <b>A</b> est un <b>ballon</b> 🎈. « Ballon » commence par le son <b>/b/</b>, comme « bateau ». (Ballon starts with /b/.)' }),

  makeMCQ({ id:'g1fr-co-062', chapterId:CH_CO, difficulty:2, subsection:'discrimination_sons',
    question: pics([soleil(YELLOW), sac(ORANGE), arbre(GREEN), livre(BLUE)], L4) +
      'Quels deux dessins commencent par le <b>même son</b> ?',
    options:['A et B','A et C','B et D','C et D'], answer:'A et B',
    hint:'Nomme les quatre dessins, puis écoute seulement le premier son de chacun. (Listen only to the first sound.)',
    explanation:'<b>Soleil</b> ☀️ et <b>sac</b> 🎒 commencent tous les deux par le son <b>/s/</b>. (Both start with /s/.)' }),

  makeMCQ({ id:'g1fr-co-063', chapterId:CH_CO, difficulty:1, subsection:'discrimination_sons',
    question: pics([lune(), voiture(BLUE), maison('#FDE68A', RED, BROWN), porte(BROWN)], L4) +
      'Quel dessin commence par le son <b>/m/</b> ?',
    options:L4, answer:'C',
    hint:'Le son /m/ se dit les lèvres fermées : mmm. (For /m/ your lips stay closed.)',
    explanation:'Le dessin <b>C</b> est une <b>maison</b> 🏠. « Maison » commence par <b>/m/</b>, comme « maman ». (Maison starts with /m/.)' }),

  makeMCQ({ id:'g1fr-co-064', chapterId:CH_CO, difficulty:2, subsection:'discrimination_sons',
    question: pics([table(), tasse(WHITE), tableauNoir(), fleur(PINK)], L4) +
      'Quel dessin ne commence <b>pas</b> par le son <b>/t/</b> ?',
    options:L4, answer:'D',
    hint:'Trois mots commencent pareil. Cherche celui qui est différent. (Three words start the same way.)',
    explanation:'Table, tasse et tableau commencent par <b>/t/</b>. Le dessin <b>D</b> est une <b>fleur</b> 🌸 : elle commence par <b>/f/</b>. (Fleur starts with /f/.)' }),

  makeMCQ({ id:'g1fr-co-065', chapterId:CH_CO, difficulty:1, subsection:'discrimination_sons',
    question: pics([porte(BROWN), livre(GREEN), soleil(YELLOW), voiture(RED)], L4) +
      'Quel dessin commence par le même son que <b>papa</b> ?',
    options:L4, answer:'A',
    hint:'« Papa » commence par le son /p/. Cherche ce son au début d’un des mots. (Papa starts with /p/.)',
    explanation:'Le dessin <b>A</b> est une <b>porte</b> 🚪. « Porte » et « papa » commencent tous les deux par <b>/p/</b>. (Same first sound.)' }),

  makeMCQ({ id:'g1fr-co-066', chapterId:CH_CO, difficulty:2, subsection:'discrimination_sons',
    question:'Écoute bien la <b>fin</b> des mots. Quel mot rime avec <b>chat</b> ?',
    options:['rat','riz','rue','roue'], answer:'rat',
    hint:'Deux mots riment quand leur fin sonne pareil. (Rhyming words end with the same sound.)',
    explanation:'« Chat » et « <b>rat</b> » finissent tous les deux par le son <b>/a/</b>. « Riz » finit par /i/, « rue » par /u/. (Chat rhymes with rat.)' }),

  // ── vocabulaire_oral ──
  makeMCQ({ id:'g1fr-co-067', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire_oral',
    question: one(pomme(RED)) + 'De quelle couleur est la pomme ?',
    options:['rouge','jaune','orange','rose'], answer:'rouge',
    hint:'Regarde bien la couleur du fruit sur le dessin. (Look at the colour of the fruit.)',
    explanation:'La pomme est <b>rouge</b> 🍎. En français on dit : « La pomme est rouge. » (The apple is red.)' }),

  makeMCQ({ id:'g1fr-co-068', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire_oral',
    question: one(arbre(GREEN)) + 'Complète : l’arbre est ______ .',
    options:['vert','bleu','rouge','jaune'], answer:'vert',
    hint:'Quelle est la couleur des feuilles de l’arbre ? (What colour are the leaves?)',
    explanation:'L’arbre est <b>vert</b> 🌳. Les feuilles des arbres sont vertes. (The tree is green.)' }),

  makeMCQ({ id:'g1fr-co-069', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire_oral',
    question: pics([ballon(RED), ballon(BLUE), ballon(GREEN), ballon(YELLOW)], L4, 'quatre ballons de couleurs différentes') +
      'Quel ballon est <b>bleu</b> ?',
    options:L4, answer:'B',
    hint:'Le bleu est la couleur du ciel et de la mer. (Blue is the colour of the sky and the sea.)',
    explanation:'Le ballon <b>B</b> est <b>bleu</b>. A est rouge, C est vert et D est jaune. (B is the blue one.)' }),

  makeMCQ({ id:'g1fr-co-070', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire_oral',
    question: one(soleil(YELLOW)) + 'Quel mot nomme ce dessin ?',
    options:['le soleil','la lune','la porte','le livre'], answer:'le soleil',
    hint:'Il brille dans le ciel le jour et il fait chaud. (It shines in the sky during the day.)',
    explanation:'C’est <b>le soleil</b> ☀️. Le soleil brille le jour ; la lune brille la nuit. (This is the sun.)' }),

  makeMCQ({ id:'g1fr-co-071', chapterId:CH_CO, difficulty:1, subsection:'vocabulaire_oral',
    question: one(maisonF('#FDE68A', RED, BROWN, '#BFDBFE')) + 'Quel mot nomme ce dessin ?',
    options:['la maison','la voiture','la fenêtre','la banane'], answer:'la maison',
    hint:'C’est l’endroit où tu habites avec ta famille. (It is where you live.)',
    explanation:'C’est <b>la maison</b> 🏠. Une maison a un toit, une porte et des fenêtres. (This is a house.)' }),

  makeMCQ({ id:'g1fr-co-072', chapterId:CH_CO, difficulty:2, subsection:'vocabulaire_oral',
    question: rowColours([RED, BLUE, RED, YELLOW, RED]) + 'Combien de ballons sont <b>rouges</b> ?',
    options:['3','2','4','5'], answer:'3',
    hint:'Montre chaque ballon rouge avec ton doigt et compte-les. (Point at each red one and count.)',
    explanation:'Il y a <b>3</b> ballons rouges 🎈. Les deux autres sont bleu et jaune. (Three of them are red.)' }),

  // ── comprehension_messages ──
  makeMCQ({ id:'g1fr-co-073', chapterId:CH_CO, difficulty:1, subsection:'comprehension_messages',
    question: scEcole() + 'Il fait jour et tu arrives à l’école. Que dis-tu à la maîtresse ?',
    options:['bonjour','bonne nuit','au revoir','à demain'], answer:'bonjour',
    hint:'C’est le matin : le jour commence. (It is morning.)',
    explanation:'Le matin, on dit <b>bonjour</b> 👋. On dit « bonne nuit » seulement avant de dormir. (In the morning we say bonjour.)' }),

  makeMCQ({ id:'g1fr-co-074', chapterId:CH_CO, difficulty:1, subsection:'comprehension_messages',
    question: one(cadeau(), 'un dessin d’objet avec un ruban') + 'On te donne un cadeau. Que dis-tu ?',
    options:['merci','pardon','bonjour','au revoir'], answer:'merci',
    hint:'C’est le mot poli quand on reçoit quelque chose. (The polite word when you receive something.)',
    explanation:'On dit <b>merci</b> 🎁 quand on reçoit un cadeau. « Pardon » se dit quand on dérange. (We say merci for a gift.)' }),

  makeMCQ({ id:'g1fr-co-075', chapterId:CH_CO, difficulty:1, subsection:'comprehension_messages',
    question: scPorteFleche() + 'La flèche montre que tu sors de la classe à la fin du jour. Que dis-tu ?',
    options:['au revoir','bonjour','bon appétit','s’il te plaît'], answer:'au revoir',
    hint:'C’est le mot poli quand on part. (The polite word when you leave.)',
    explanation:'Quand on part, on dit <b>au revoir</b> 👋. « Bonjour » se dit quand on arrive. (We say au revoir when leaving.)' }),

  makeMCQ({ id:'g1fr-co-076', chapterId:CH_CO, difficulty:1, subsection:'comprehension_messages',
    question: scLivreTable() + 'Où est le livre ?',
    options:['sur la table','sous la table','dans le sac','sur la chaise'], answer:'sur la table',
    hint:'Le livre est-il au-dessus ou en dessous ? (Is the book above or below?)',
    explanation:'Le livre est posé <b>sur la table</b> 📘. « Sur » veut dire au-dessus. (The book is on the table.)' }),

  makeMCQ({ id:'g1fr-co-077', chapterId:CH_CO, difficulty:1, subsection:'comprehension_messages',
    question: pics([crayon(BLUE), livre(GREEN), sac(ORANGE), tasse(WHITE)], L4) +
      'La maîtresse dit : « Prends ton crayon. » Quel dessin prends-tu ?',
    options:L4, answer:'A',
    hint:'Le crayon sert à écrire et à dessiner. (A pencil is for writing and drawing.)',
    explanation:'Tu prends le dessin <b>A</b>, le <b>crayon</b> ✏️. Écoute bien l’objet que la maîtresse nomme. (A is the pencil.)' }),

  makeMCQ({ id:'g1fr-co-078', chapterId:CH_CO, difficulty:1, subsection:'comprehension_messages',
    question: one(feu('r'), 'un dessin d’objet de la route') + 'Le feu est rouge. Que fait-on ?',
    options:['on s’arrête','on avance','on court','on chante'], answer:'on s’arrête',
    hint:'Rouge veut dire : ne pas passer. (Red means do not go.)',
    explanation:'Au feu <b>rouge</b>, on <b>s’arrête</b> 🛑. On avance seulement quand le feu est vert. (Red means stop.)' }),

  // ══ EXPRESSION ORALE ═════════════════════════════════════════════════════
  // ── comptines_chansons ──
  makeMCQ({ id:'g1fr-eo-061', chapterId:CH_EO, difficulty:1, subsection:'comptines_chansons',
    question: one(etoile(YELLOW)) + 'La comptine dit : « Brille, brille, petite… » Que montre le dessin ?',
    options:['une étoile','une banane','une fenêtre','une voiture'], answer:'une étoile',
    hint:'On la voit dans le ciel la nuit. (You see it in the sky at night.)',
    explanation:'C’est <b>une étoile</b> ⭐. La comptine dit : « Brille, brille, petite étoile. » (It is a star.)' }),

  makeMCQ({ id:'g1fr-eo-062', chapterId:CH_EO, difficulty:1, subsection:'comptines_chansons',
    question: rowOf(3, arbre(GREEN), 62) +
      'La comptine dit : « Un, deux, trois, nous irons au bois. » Combien d’arbres vois-tu ?',
    options:['trois','deux','quatre','cinq'], answer:'trois',
    hint:'Compte les arbres avec ton doigt : un, deux… (Count them with your finger.)',
    explanation:'Il y a <b>trois</b> arbres 🌳🌳🌳, comme « un, deux, trois » dans la comptine. (There are three trees.)' }),

  makeMCQ({ id:'g1fr-eo-063', chapterId:CH_EO, difficulty:2, subsection:'comptines_chansons',
    question: pics([pluie(), soleil(YELLOW), nuage(GREY)], ['A','B','C']) +
      'Range les images : d’abord le soleil, puis le nuage, puis la pluie. Quel est le bon ordre ?',
    options:['B, C, A','A, B, C','C, B, A','B, A, C'], answer:'B, C, A',
    hint:'Trouve d’abord la lettre du soleil, puis celle du nuage. (Find the sun first.)',
    explanation:'Le soleil est <b>B</b>, le nuage est <b>C</b> et la pluie est <b>A</b> : l’ordre est <b>B, C, A</b> ☀️☁️🌧️. (Sun, cloud, rain.)' }),

  makeMCQ({ id:'g1fr-eo-064', chapterId:CH_EO, difficulty:1, subsection:'comptines_chansons',
    question: one(bateau(RED, WHITE)) + 'La comptine « Maman, les p’tits bateaux » parle de quoi ?',
    options:['des bateaux','des cahiers','des bananes','des fenêtres'], answer:'des bateaux',
    hint:'Regarde le dessin : cet objet flotte sur l’eau. (This object floats on water.)',
    explanation:'La comptine parle <b>des bateaux</b> ⛵ qui vont sur l’eau. (The rhyme is about boats.)' }),

  makeMCQ({ id:'g1fr-eo-065', chapterId:CH_EO, difficulty:2, subsection:'comptines_chansons',
    question: one(lune(), 'un dessin du ciel') + 'Dans une comptine, quel mot rime avec <b>lune</b> ?',
    options:['prune','table','porte','livre'], answer:'prune',
    hint:'Dis les mots tout haut et écoute leur fin : …une. (Listen to the ending.)',
    explanation:'« Lune » et « <b>prune</b> » finissent par le même son <b>/yn/</b> : elles riment 🌙. (Lune rhymes with prune.)' }),

  makeMCQ({ id:'g1fr-eo-066', chapterId:CH_EO, difficulty:1, subsection:'comptines_chansons',
    question: beats(3) + 'Tape dans tes mains une fois pour chaque rond. Combien de fois tapes-tu ?',
    options:['3','2','4','5'], answer:'3',
    hint:'Un rond = un clap. Compte les ronds. (One circle, one clap.)',
    explanation:'Il y a 3 ronds, donc tu tapes <b>3</b> fois 👏👏👏. C’est comme compter les syllabes d’un mot. (Three claps.)' }),

  // ── conversation_simple ──
  makeMCQ({ id:'g1fr-eo-067', chapterId:CH_EO, difficulty:1, subsection:'conversation_simple',
    question: one(gateau()) + 'C’est ton anniversaire. On te dit…',
    options:['bon anniversaire','bonne nuit','bon appétit','bonne route'], answer:'bon anniversaire',
    hint:'Regarde le gâteau et sa bougie. (Look at the cake and its candle.)',
    explanation:'Pour un anniversaire on dit <b>bon anniversaire</b> 🎂. (We say bon anniversaire on a birthday.)' }),

  makeMCQ({ id:'g1fr-eo-068', chapterId:CH_EO, difficulty:1, subsection:'conversation_simple',
    question: one(assiette(true), 'un dessin d’objet de la cuisine') + 'On va manger. Avant de commencer, on dit…',
    options:['bon appétit','bonne nuit','au revoir','bon voyage'], answer:'bon appétit',
    hint:'C’est la phrase polie avant le repas. (The polite phrase before a meal.)',
    explanation:'Avant de manger, on souhaite <b>bon appétit</b> 🍽️ aux autres. (We say bon appétit before eating.)' }),

  makeMCQ({ id:'g1fr-eo-069', chapterId:CH_EO, difficulty:1, subsection:'conversation_simple',
    question: fig('une petite scène', 200, 120, 250, at(112, 4, 0.5, lune()) + at(40, 16, 1, lit())) +
      'Le soir, avant de dormir, tu dis…',
    options:['bonne nuit','bonjour','bon appétit','bienvenue'], answer:'bonne nuit',
    hint:'Sur le dessin il y a un lit et la lune : c’est la nuit. (The picture shows night-time.)',
    explanation:'Avant de dormir, on dit <b>bonne nuit</b> 🌙. Le matin, on dit bonjour. (At bedtime we say bonne nuit.)' }),

  makeMCQ({ id:'g1fr-eo-070', chapterId:CH_EO, difficulty:1, subsection:'conversation_simple',
    question: one(verreEau()) + 'Tu demandes de l’eau. Tu dis : « De l’eau, ______ . »',
    options:['s’il vous plaît','merci beaucoup','à tout à l’heure','bonne journée'], answer:'s’il vous plaît',
    hint:'Quand on demande quelque chose poliment, on ajoute ces trois petits mots. (Three little words make a request polite.)',
    explanation:'On demande poliment : « De l’eau, <b>s’il vous plaît</b>. » 💧 On dit merci après. (We say s’il vous plaît when asking.)' }),

  makeMCQ({ id:'g1fr-eo-071', chapterId:CH_EO, difficulty:1, subsection:'conversation_simple',
    question: pics([gomme(), crayon(GREEN), livre(BLUE), sac(ORANGE)], L4) +
      'Ton ami dit : « Prête-moi ta gomme. » Que lui donnes-tu ?',
    options:L4, answer:'A',
    hint:'La gomme sert à effacer ce que tu écris. (An eraser rubs writing out.)',
    explanation:'Tu donnes le dessin <b>A</b>, la <b>gomme</b>. Écouter jusqu’au bout aide à donner le bon objet. (A is the eraser.)' }),

  makeMCQ({ id:'g1fr-eo-072', chapterId:CH_EO, difficulty:1, subsection:'conversation_simple',
    question: scEcole() + 'À l’école, la maîtresse te dit « Bonjour ». Que réponds-tu ?',
    options:['Bonjour !','Merci !','Au revoir !','Bonne nuit !'], answer:'Bonjour !',
    hint:'Quand quelqu’un te salue, tu salues aussi. (When someone greets you, greet back.)',
    explanation:'On répond <b>Bonjour !</b> 😊 Saluer en retour, c’est poli. (We answer bonjour.)' }),

  // ── description_images ──
  makeMCQ({ id:'g1fr-eo-073', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question: scSoleilMaison() + 'Que vois-tu sur ce dessin ?',
    options:['une maison et un soleil','une maison et un arbre','un bateau et un soleil','une voiture et un arbre'],
    answer:'une maison et un soleil',
    hint:'Nomme les deux choses que tu vois, l’une après l’autre. (Name the two things you see.)',
    explanation:'Le dessin montre <b>une maison et un soleil</b> 🏠☀️. (A house and a sun.)' }),

  makeMCQ({ id:'g1fr-eo-074', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question: rowOf(3, fleur(PINK), 58) + 'Combien de fleurs y a-t-il sur le dessin ?',
    options:['trois','deux','quatre','cinq'], answer:'trois',
    hint:'Compte-les tout haut : une, deux… (Count them aloud.)',
    explanation:'Il y a <b>trois</b> fleurs 🌸🌸🌸. On écrit le nombre en lettres : trois. (There are three flowers.)' }),

  makeMCQ({ id:'g1fr-eo-075', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question: scBallonTable() + 'Où est le ballon ?',
    options:['sur la table','sous la table','dans la boîte','sur la chaise'], answer:'sur la table',
    hint:'Le ballon touche-t-il le dessus de la table ? (Is the ball on top?)',
    explanation:'Le ballon est <b>sur la table</b> ⚽. « Sur » = au-dessus, « sous » = en dessous. (The ball is on the table.)' }),

  makeMCQ({ id:'g1fr-eo-076', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question: scBateauMer(BLUE) + 'De quelle couleur est le bateau ?',
    options:['bleu','vert','rouge','jaune'], answer:'bleu',
    hint:'Regarde la grande partie du bateau qui touche l’eau. (Look at the hull.)',
    explanation:'Le bateau est <b>bleu</b> ⛵, comme la mer. (The boat is blue.)' }),

  makeMCQ({ id:'g1fr-eo-077', chapterId:CH_EO, difficulty:1, subsection:'description_images',
    question: scMaisonPorteRouge() + 'Quelle phrase décrit l’image ?',
    options:['La porte est rouge.','La porte est verte.','La porte est bleue.','La porte est jaune.'],
    answer:'La porte est rouge.',
    hint:'Trouve la porte de la maison, puis dis sa couleur. (Find the door, then name its colour.)',
    explanation:'<b>La porte est rouge.</b> 🚪 Le toit est gris et la fenêtre est bleue. (The door is red.)' }),

  makeMCQ({ id:'g1fr-eo-078', chapterId:CH_EO, difficulty:2, subsection:'description_images',
    question: scCrayonCahier() + 'Quelle phrase est vraie pour ce dessin ?',
    options:['Le crayon est sur le cahier.','Le crayon est sous le cahier.','Le cahier est sur le crayon.','Le crayon est dans le sac.'],
    answer:'Le crayon est sur le cahier.',
    hint:'Regarde lequel des deux objets est posé au-dessus. (Which one is on top?)',
    explanation:'<b>Le crayon est sur le cahier.</b> ✏️📒 On voit le crayon posé par-dessus. (The pencil is on the exercise book.)' }),

  // ══ LECTURE ══════════════════════════════════════════════════════════════
  // ── conscience_phonique ──
  makeMCQ({ id:'g1fr-lec-061', chapterId:CH_LEC, difficulty:1, subsection:'conscience_phonique',
    question: one(maisonF('#FDE68A', RED, BROWN, '#BFDBFE')) +
      'Regarde le dessin. Combien de syllabes a le mot <b>maison</b> ?',
    options:['2','1','3','4'], answer:'2',
    hint:'Tape dans tes mains : mai — son. (Clap: mai — son.)',
    explanation:'« Maison » a <b>2</b> syllabes : <b>mai</b> + <b>son</b> 🏠. (Two claps, two syllables.)' }),

  makeMCQ({ id:'g1fr-lec-062', chapterId:CH_LEC, difficulty:1, subsection:'conscience_phonique',
    question: one(voiture(RED)) + 'Regarde le dessin. Combien de syllabes a le mot <b>voiture</b> ?',
    options:['3','2','1','4'], answer:'3',
    hint:'Tape dans tes mains : voi — tu — re. (Clap: voi — tu — re.)',
    explanation:'« Voiture » a <b>3</b> syllabes : <b>voi</b> + <b>tu</b> + <b>re</b> 🚗. (Three syllables.)' }),

  makeMCQ({ id:'g1fr-lec-063', chapterId:CH_LEC, difficulty:1, subsection:'conscience_phonique',
    question: one(cahier(RED)) + 'Regarde le dessin. Combien de syllabes a le mot <b>cahier</b> ?',
    options:['2','3','1','4'], answer:'2',
    hint:'Tape dans tes mains : ca — hier. (Clap: ca — hier.)',
    explanation:'« Cahier » a <b>2</b> syllabes : <b>ca</b> + <b>hier</b> 📒. (Two syllables.)' }),

  makeMCQ({ id:'g1fr-lec-064', chapterId:CH_LEC, difficulty:1, subsection:'conscience_phonique',
    question: beats(3) + 'Chaque rond est une syllabe. Quel mot a autant de syllabes que ces ronds ?',
    options:['banane','crayon','riz','pain'], answer:'banane',
    hint:'Compte les ronds, puis tape chaque mot dans tes mains. (Count the circles, then clap each word.)',
    explanation:'Il y a 3 ronds. <b>Ba-na-ne</b> a 3 syllabes 🍌. « Crayon » en a 2, « riz » et « pain » en ont 1. (Banane has three.)' }),

  makeMCQ({ id:'g1fr-lec-065', chapterId:CH_LEC, difficulty:2, subsection:'conscience_phonique',
    question: beats(1) + 'Un seul rond, une seule syllabe. Quel mot a une seule syllabe ?',
    options:['riz','école','maison','banane'], answer:'riz',
    hint:'Cherche le mot le plus court : celui qu’on dit d’un seul coup. (Look for the shortest word.)',
    explanation:'<b>Riz</b> se dit d’un seul coup : 1 syllabe 🍚. « É-co-le » en a 3 et « mai-son » en a 2. (Riz has one syllable.)' }),

  makeMCQ({ id:'g1fr-lec-066', chapterId:CH_LEC, difficulty:1, subsection:'conscience_phonique',
    question: one(banane()) + 'Complète la syllabe qui manque : ba — ______ — ne',
    options:['na','ma','la','ta'], answer:'na',
    hint:'Dis le mot du dessin tout doucement, syllabe par syllabe. (Say the word slowly.)',
    explanation:'Le mot est <b>ba-na-ne</b> 🍌, donc la syllabe qui manque est <b>na</b>. (The missing syllable is na.)' }),

  makeMCQ({ id:'g1fr-lec-067', chapterId:CH_LEC, difficulty:2, subsection:'conscience_phonique',
    question: one(fenetre('#BFDBFE')) + 'Complète la syllabe qui manque : fe — nê — ______',
    options:['tre','tra','tro','pre'], answer:'tre',
    hint:'Le dessin montre l’objet ; dis son nom en trois morceaux. (Say the name in three parts.)',
    explanation:'Le mot est <b>fe-nê-tre</b> 🪟, donc la dernière syllabe est <b>tre</b>. (The last syllable is tre.)' }),

  makeMCQ({ id:'g1fr-lec-068', chapterId:CH_LEC, difficulty:2, subsection:'conscience_phonique',
    question:'Quel mot commence par la <b>même syllabe</b> que <b>maman</b> ?',
    options:['maison','bateau','soleil','cahier'], answer:'maison',
    hint:'« Maman » commence par la syllabe « ma ». Cherche « ma » au début. (Look for ma at the start.)',
    explanation:'<b>Mai</b>-son et <b>ma</b>-man commencent par le même son <b>/ma/</b>. (Same first syllable.)' }),

  // ── lettres_sons ──
  makeMCQ({ id:'g1fr-lec-069', chapterId:CH_LEC, difficulty:1, subsection:'lettres_sons',
    question: one(ballon(RED)) + 'Par quelle lettre commence le mot de ce dessin ?',
    options:['B','M','S','T'], answer:'B',
    hint:'Nomme l’objet, puis écoute son premier son. (Name it, then listen to the first sound.)',
    explanation:'C’est un <b>ballon</b> 🎈 : il commence par la lettre <b>B</b>. (Ballon starts with B.)' }),

  makeMCQ({ id:'g1fr-lec-070', chapterId:CH_LEC, difficulty:1, subsection:'lettres_sons',
    question: one(soleil(YELLOW)) + 'Par quelle lettre commence le mot de ce dessin ?',
    options:['S','C','L','P'], answer:'S',
    hint:'Le premier son siffle comme le vent : sss. (The first sound hisses.)',
    explanation:'C’est le <b>soleil</b> ☀️ : il commence par la lettre <b>S</b>. (Soleil starts with S.)' }),

  makeMCQ({ id:'g1fr-lec-071', chapterId:CH_LEC, difficulty:1, subsection:'lettres_sons',
    question: one(table()) + 'Par quelle lettre commence le mot de ce dessin ?',
    options:['T','D','P','B'], answer:'T',
    hint:'On mange et on écrit dessus. Dis son nom tout haut. (Say its name aloud.)',
    explanation:'C’est une <b>table</b> : elle commence par la lettre <b>T</b>. (Table starts with T.)' }),

  makeMCQ({ id:'g1fr-lec-072', chapterId:CH_LEC, difficulty:1, subsection:'lettres_sons',
    question: one(lune(), 'un dessin du ciel') + 'Quelle lettre fait le son <b>/l/</b> comme dans « lune » ?',
    options:['L','R','N','D'], answer:'L',
    hint:'Dis « lune » très lentement : lll-une. (Say lune slowly.)',
    explanation:'La lettre <b>L</b> fait le son <b>/l/</b> 🌙, comme dans lune, livre et lait. (L makes the /l/ sound.)' }),

  makeMCQ({ id:'g1fr-lec-073', chapterId:CH_LEC, difficulty:2, subsection:'lettres_sons',
    question: scEcole() + 'Le mot « école » commence par quel son ?',
    options:['/é/','/o/','/a/','/i/'], answer:'/é/',
    hint:'Écoute seulement le tout début du mot : é… (Listen to the very beginning.)',
    explanation:'« École » commence par le son <b>/é/</b> 🏫, écrit avec un accent : <b>é</b>. (École starts with /é/.)' }),

  // ── mots_simples ──
  makeMCQ({ id:'g1fr-lec-074', chapterId:CH_LEC, difficulty:1, subsection:'mots_simples',
    question: one(livre(BLUE)) + 'Quel mot correspond à ce dessin ?',
    options:['le livre','la porte','le crayon','la fenêtre'], answer:'le livre',
    hint:'On l’ouvre pour lire une histoire. (You open it to read a story.)',
    explanation:'C’est <b>le livre</b> 📘. On lit un livre page après page. (This is the book.)' }),

  makeMCQ({ id:'g1fr-lec-075', chapterId:CH_LEC, difficulty:1, subsection:'mots_simples',
    question: one(fleur(PINK)) + 'Quel mot correspond à ce dessin ?',
    options:['la fleur','la table','la porte','la pomme'], answer:'la fleur',
    hint:'Elle pousse dans le jardin et sent bon. (It grows in the garden.)',
    explanation:'C’est <b>la fleur</b> 🌸. Une fleur a des pétales et une tige. (This is the flower.)' }),

  makeMCQ({ id:'g1fr-lec-076', chapterId:CH_LEC, difficulty:2, subsection:'mots_simples',
    question: one(bateau(GREEN, WHITE)) + 'Quel mot correspond à ce dessin ?',
    options:['le bateau','le gâteau','le chapeau','le tableau'], answer:'le bateau',
    hint:'Les quatre mots finissent pareil : écoute bien le début. (All four end the same — listen to the start.)',
    explanation:'C’est <b>le bateau</b> ⛵. Bateau, gâteau, chapeau et tableau finissent tous par « eau ». (This is the boat.)' }),

  makeMCQ({ id:'g1fr-lec-077', chapterId:CH_LEC, difficulty:2, subsection:'mots_simples',
    question: one(pomme(RED)) + 'Quel mot est bien écrit pour ce dessin ?',
    options:['la pomme','la pome','la ponme','la pomne'], answer:'la pomme',
    hint:'Ce mot s’écrit avec deux <b>m</b>. (This word has a double m.)',
    explanation:'On écrit <b>la pomme</b> 🍎, avec <b>mm</b>. Les autres écritures sont fausses. (Pomme has a double m.)' }),

  makeMCQ({ id:'g1fr-lec-078', chapterId:CH_LEC, difficulty:1, subsection:'mots_simples',
    question: pics([fleur(PURPLE), cle(), livre(GREEN), tasse(WHITE)], L4) +
      'Quelle image va avec le mot <b>la clé</b> ?',
    options:L4, answer:'B',
    hint:'La clé sert à ouvrir une porte. (A key opens a door.)',
    explanation:'L’image <b>B</b> est la <b>clé</b> 🔑 : elle a un rond et des dents. (B is the key.)' }),

  // ══ ÉCRITURE ═════════════════════════════════════════════════════════════
  // ── lettres_minuscules ──
  makeMCQ({ id:'g1fr-ecr-061', chapterId:CH_ECR, difficulty:1, subsection:'lettres_minuscules',
    question: bigLetter('M') + 'Voici une lettre majuscule. Quelle est sa lettre minuscule ?',
    options:['m','n','w','u'], answer:'m',
    hint:'La minuscule a le même nom que la majuscule. (Same letter, smaller shape.)',
    explanation:'La minuscule de <b>M</b> est <b>m</b> : elle a deux ponts. Le <b>n</b> n’en a qu’un. (M becomes m.)' }),

  makeMCQ({ id:'g1fr-ecr-062', chapterId:CH_ECR, difficulty:1, subsection:'lettres_minuscules',
    question: bigLetter('A') + 'Voici une lettre majuscule. Quelle est sa lettre minuscule ?',
    options:['a','o','e','c'], answer:'a',
    hint:'Dis la lettre tout haut, puis cherche la même en petit. (Say the letter, then find it small.)',
    explanation:'La minuscule de <b>A</b> est <b>a</b> : un rond et une petite barre. (A becomes a.)' }),

  makeMCQ({ id:'g1fr-ecr-063', chapterId:CH_ECR, difficulty:2, subsection:'lettres_minuscules',
    question: fig('un tracé avec un point de départ', 100, 100, 140,
      '<circle cx="50" cy="52" r="30" fill="none" stroke="#9CA3AF" stroke-width="9" stroke-dasharray="7 7"/>' +
      '<circle cx="50" cy="22" r="7" fill="#EF4444"/>' +
      '<polygon points="16,52 30,44 30,60" fill="#EF4444"/>') +
      'Le point rouge montre où commencer. Quelle lettre traces-tu ?',
    options:['o','a','e','c'], answer:'o',
    hint:'Le tracé fait un tour complet et revient au point de départ. (The line goes all the way round.)',
    explanation:'C’est la lettre <b>o</b> : un rond fermé, tracé en partant du haut. Le <b>c</b> reste ouvert. (This is o.)' }),

  makeMCQ({ id:'g1fr-ecr-064', chapterId:CH_ECR, difficulty:2, subsection:'lettres_minuscules',
    question: fig('un tracé avec un point de départ', 100, 100, 140,
      '<path d="M50 14 v66" stroke="#9CA3AF" stroke-width="9" stroke-dasharray="7 7" fill="none"/>' +
      '<circle cx="50" cy="14" r="7" fill="#EF4444"/>' +
      '<polygon points="50,92 42,76 58,76" fill="#EF4444"/>') +
      'Le point rouge montre où commencer. Quelle lettre traces-tu ?',
    options:['l','o','s','c'], answer:'l',
    hint:'Le tracé est une seule barre droite, de haut en bas. (One straight line, top to bottom.)',
    explanation:'C’est la lettre <b>l</b> : une grande barre droite. On la trace toujours du haut vers le bas. (This is l.)' }),

  makeMCQ({ id:'g1fr-ecr-065', chapterId:CH_ECR, difficulty:1, subsection:'lettres_minuscules',
    question: bigLetter('i') + 'Que faut-il toujours mettre sur cette lettre ?',
    options:['un point','une barre','un rond','une queue'], answer:'un point',
    hint:'Regarde bien le haut de la lettre. (Look at the top of the letter.)',
    explanation:'La lettre <b>i</b> porte toujours <b>un point</b> sur sa tête. Sans le point, ce n’est plus un i. (The i needs its dot.)' }),

  makeMCQ({ id:'g1fr-ecr-066', chapterId:CH_ECR, difficulty:2, subsection:'lettres_minuscules',
    question: boxes(['a', 'b', '', 'd']) + 'Quelle lettre manque dans l’alphabet ?',
    options:['c','e','f','g'], answer:'c',
    hint:'Récite l’alphabet depuis le début : a, b… (Say the alphabet from the start.)',
    explanation:'L’alphabet commence par <b>a, b, c, d</b> : la lettre qui manque est <b>c</b>. (The missing letter is c.)' }),

  // ── copie_mots ──
  makeMCQ({ id:'g1fr-ecr-067', chapterId:CH_ECR, difficulty:2, subsection:'copie_mots',
    question: boxes(['n', 'o', 's', 'i', 'a', 'm']) + 'Remets les lettres dans l’ordre. Quel mot obtiens-tu ?',
    options:['maison','masion','moisan','mainos'], answer:'maison',
    hint:'Un seul de ces mots existe vraiment en français. (Only one is a real French word.)',
    explanation:'Les six lettres forment <b>maison</b> 🏠. Les autres ne veulent rien dire. (The word is maison.)' }),

  makeMCQ({ id:'g1fr-ecr-068', chapterId:CH_ECR, difficulty:1, subsection:'copie_mots',
    question: one(cahier(BLUE)) + boxes(['c', 'a', '', 'i', 'e', 'r']) + 'Quelle lettre manque dans ce mot ?',
    options:['h','k','y','r'], answer:'h',
    hint:'Le dessin te donne le mot : copie-le lettre par lettre. (The picture tells you the word.)',
    explanation:'On écrit <b>cahier</b> 📒 : la lettre qui manque est le <b>h</b>, qui ne s’entend pas. (The silent h is missing.)' }),

  makeMCQ({ id:'g1fr-ecr-069', chapterId:CH_ECR, difficulty:2, subsection:'copie_mots',
    question: one(table()) + boxes(['t', 'a', '', '', 'e']) + 'Quelles deux lettres manquent dans ce mot ?',
    options:['bl','br','pl','dl'], answer:'bl',
    hint:'Dis le nom de l’objet du dessin : ta — ble. (Say the object’s name.)',
    explanation:'On écrit <b>table</b> : les lettres qui manquent sont <b>b</b> et <b>l</b>. (The missing letters are bl.)' }),

  makeMCQ({ id:'g1fr-ecr-070', chapterId:CH_ECR, difficulty:1, subsection:'copie_mots',
    question: boxes(['r', 'i', 'z']) + 'Combien de lettres y a-t-il dans ce mot ?',
    options:['3','2','4','5'], answer:'3',
    hint:'Compte les cases : une case = une lettre. (One box, one letter.)',
    explanation:'Le mot <b>riz</b> 🍚 a <b>3</b> lettres : r, i, z. Mais on ne l’entend qu’en une seule syllabe. (Three letters.)' }),

  makeMCQ({ id:'g1fr-ecr-071', chapterId:CH_ECR, difficulty:2, subsection:'copie_mots',
    question: fig('quatre mots écrits et numérotés', 320, 70, 320,
      txt(46, 40, 24, 'Paul') + txt(126, 40, 24, 'sac') + txt(206, 40, 24, 'table') + txt(286, 40, 24, 'porte') +
      txt(46, 62, 15, '1') + txt(126, 62, 15, '2') + txt(206, 62, 15, '3') + txt(286, 62, 15, '4')) +
      'Quel mot commence par une <b>majuscule</b> ?',
    options:N4, answer:'1',
    hint:'Une majuscule est une grande lettre au début du mot. (A capital is a big letter at the start.)',
    explanation:'Le mot <b>1</b> commence par une majuscule, car c’est un prénom. Les prénoms prennent toujours une majuscule. (Names take a capital.)' }),

  makeMCQ({ id:'g1fr-ecr-072', chapterId:CH_ECR, difficulty:2, subsection:'copie_mots',
    question: one(fleur(YELLOW)) + boxes(['e', 'l', 'u', 'f', 'r']) +
      'Remets les lettres dans l’ordre pour écrire le nom du dessin.',
    options:['fleur','fluer','frule','fuler'], answer:'fleur',
    hint:'Commence par la lettre du premier son : f… (Start with the first sound.)',
    explanation:'Les lettres forment <b>fleur</b> 🌼. On commence par f, puis l, e, u, r. (The word is fleur.)' }),

  // ── phrases_simples ──
  makeMCQ({ id:'g1fr-ecr-073', chapterId:CH_ECR, difficulty:1, subsection:'phrases_simples',
    question: scBallonTable() + 'Quelle phrase va avec l’image ?',
    options:['Le ballon est sur la table.','Le ballon est sous la table.','La table est sur le ballon.','Le ballon est dans la boîte.'],
    answer:'Le ballon est sur la table.',
    hint:'Cherche qui est posé au-dessus de qui. (Which one is on top?)',
    explanation:'<b>Le ballon est sur la table.</b> ⚽ La phrase commence par une majuscule et finit par un point. (The ball is on the table.)' }),

  makeMCQ({ id:'g1fr-ecr-074', chapterId:CH_ECR, difficulty:1, subsection:'phrases_simples',
    question: scSoleilMaison() + 'Quelle phrase décrit l’image ?',
    options:['Le soleil est sur la maison.','Le soleil est dans la boîte.','La maison est sur le soleil.','Le soleil est sous la table.'],
    answer:'Le soleil est sur la maison.',
    hint:'Regarde ce qui est en haut du dessin. (Look at what is at the top.)',
    explanation:'<b>Le soleil est sur la maison.</b> ☀️🏠 Le soleil brille au-dessus du toit. (The sun is above the house.)' }),

  makeMCQ({ id:'g1fr-ecr-075', chapterId:CH_ECR, difficulty:1, subsection:'phrases_simples',
    question: scBateauMer(RED) + 'Choisis la bonne phrase pour ce dessin.',
    options:['Le bateau est sur la mer.','Le bateau est sur la table.','La mer est sur le bateau.','Le bateau est dans le sac.'],
    answer:'Le bateau est sur la mer.',
    hint:'Sur quoi le bateau flotte-t-il ? (What is the boat floating on?)',
    explanation:'<b>Le bateau est sur la mer.</b> ⛵ L’eau bleue au bas du dessin, c’est la mer. (The boat is on the sea.)' }),

  makeMCQ({ id:'g1fr-ecr-076', chapterId:CH_ECR, difficulty:1, subsection:'phrases_simples',
    question: one(pomme(GREEN)) + 'Termine la phrase : « La pomme est ______ . »',
    options:['verte','rouge','jaune','rose'], answer:'verte',
    hint:'Regarde la couleur du fruit sur le dessin. (Look at the colour of the fruit.)',
    explanation:'La pomme du dessin est <b>verte</b> 🍏. Avec « la pomme », on écrit vert<b>e</b>. (This apple is green.)' }),

  makeMCQ({ id:'g1fr-ecr-077', chapterId:CH_ECR, difficulty:1, subsection:'phrases_simples',
    question: one(soleil(YELLOW)) + 'Quel mot manque ? « Le ______ brille dans le ciel. »',
    options:['soleil','ballon','bateau','cahier'], answer:'soleil',
    hint:'Le dessin te montre ce qui brille dans le ciel. (The picture shows what shines.)',
    explanation:'« Le <b>soleil</b> brille dans le ciel. » ☀️ Un ballon ou un cahier ne brillent pas. (The sun shines.)' }),

  makeMCQ({ id:'g1fr-ecr-078', chapterId:CH_ECR, difficulty:2, subsection:'phrases_simples',
    question: scLivreTable() + 'Quelle phrase est bien écrite ?',
    options:['Le livre est sur la table.','le livre est sur la table.','Le livre est sur la table','livre le est sur la table.'],
    answer:'Le livre est sur la table.',
    hint:'Une phrase commence par une majuscule et finit par un point. (Capital at the start, full stop at the end.)',
    explanation:'<b>Le livre est sur la table.</b> 📘 Majuscule au début, point à la fin, et les mots dans le bon ordre. (Capital + full stop.)' }),

  // ══ GRAMMAIRE ════════════════════════════════════════════════════════════
  // ── noms_communs ──
  makeMCQ({ id:'g1fr-grm-061', chapterId:CH_GRM, difficulty:1, subsection:'noms_communs',
    question: one(crayon(GREEN)) + 'Quel est le nom de cet objet ?',
    options:['le crayon','le cahier','le bateau','le ballon'], answer:'le crayon',
    hint:'Cet objet a une pointe pour écrire. (This object has a point for writing.)',
    explanation:'C’est <b>le crayon</b> ✏️. « Crayon » est un nom commun : il nomme une chose. (This is the pencil.)' }),

  makeMCQ({ id:'g1fr-grm-062', chapterId:CH_GRM, difficulty:1, subsection:'noms_communs',
    question: pics([voiture(BLUE), pomme(RED), livre(GREEN), chaise()], N4) + 'Quel dessin montre un <b>fruit</b> ?',
    options:N4, answer:'2',
    hint:'Un fruit, cela se mange et cela pousse sur un arbre. (A fruit grows on a tree and we eat it.)',
    explanation:'Le dessin <b>2</b> est une <b>pomme</b> 🍎 : c’est un fruit. Les autres sont des objets. (2 is the fruit.)' }),

  makeMCQ({ id:'g1fr-grm-063', chapterId:CH_GRM, difficulty:1, subsection:'noms_communs',
    question: pics([ballon(RED), livre(GREEN), fleur(YELLOW), boite(BLUE)], L4, 'quatre objets de couleurs différentes') +
      'Quel objet est <b>vert</b> ?',
    options:L4, answer:'B',
    hint:'Le vert est la couleur de l’herbe et des feuilles. (Green is the colour of grass.)',
    explanation:'L’objet <b>B</b>, le livre, est <b>vert</b> 📗. A est rouge, C est jaune et D est bleu. (B is green.)' }),

  makeMCQ({ id:'g1fr-grm-064', chapterId:CH_GRM, difficulty:2, subsection:'noms_communs',
    question:'Lequel de ces mots est un <b>nom de couleur</b> ?',
    options:['rouge','courir','sauter','manger'], answer:'rouge',
    hint:'Trois de ces mots disent ce qu’on fait ; un seul dit comment c’est. (Three say what we do.)',
    explanation:'<b>Rouge</b> est une couleur 🔴. Courir, sauter et manger sont des actions. (Rouge is a colour.)' }),

  makeMCQ({ id:'g1fr-grm-065', chapterId:CH_GRM, difficulty:1, subsection:'noms_communs',
    question: one(crayon(YELLOW)) + 'De quelle couleur est le crayon ?',
    options:['jaune','rouge','vert','bleu'], answer:'jaune',
    hint:'C’est la couleur du soleil et des bananes. (The colour of the sun and bananas.)',
    explanation:'Le crayon est <b>jaune</b> ✏️. On dit : « Le crayon est jaune. » (The pencil is yellow.)' }),

  makeMCQ({ id:'g1fr-grm-066', chapterId:CH_GRM, difficulty:2, subsection:'noms_communs',
    question: scMaisonFleche() + 'La flèche montre une partie de la maison. Comment s’appelle-t-elle ?',
    options:['la fenêtre','la voiture','la banane','la bouteille'], answer:'la fenêtre',
    hint:'C’est le carré vitré par lequel on regarde dehors. (You look outside through it.)',
    explanation:'La flèche montre <b>la fenêtre</b> 🪟. Une maison a un toit, une porte et des fenêtres. (It is the window.)' }),

  // ── determinants_le_la_les ──
  makeMCQ({ id:'g1fr-grm-067', chapterId:CH_GRM, difficulty:1, subsection:'determinants_le_la_les',
    question: rowOf(1, pomme(RED), 58) + 'Complète : ______ pomme est rouge.',
    options:['La','Le','Les','Un'], answer:'La',
    hint:'Il y a une seule pomme, et « pomme » est un mot féminin. (One apple, and pomme is feminine.)',
    explanation:'On écrit <b>La</b> pomme est rouge 🍎 : une seule pomme, et « pomme » est féminin. (Singular feminine takes la.)' }),

  makeMCQ({ id:'g1fr-grm-068', chapterId:CH_GRM, difficulty:1, subsection:'determinants_le_la_les',
    question: rowOf(3, pomme(RED), 58) + 'Complète : ______ pommes sont rouges.',
    options:['Les','La','Le','Un'], answer:'Les',
    hint:'Compte les pommes du dessin : il y en a plusieurs. (Count them — there is more than one.)',
    explanation:'Il y a plusieurs pommes 🍎🍎🍎, donc on écrit <b>Les</b> pommes. (More than one takes les.)' }),

  makeMCQ({ id:'g1fr-grm-069', chapterId:CH_GRM, difficulty:1, subsection:'determinants_le_la_les',
    question: rowOf(1, ballon(BLUE), 58) + 'Regarde le dessin. Quel petit mot va devant « ballon » ?',
    options:['le','la','les','une'], answer:'le',
    hint:'Il n’y a qu’un seul ballon, et « ballon » est un mot masculin. (One ball, masculine word.)',
    explanation:'On dit <b>le</b> ballon 🔵 : un seul, et le mot est masculin. On dirait « les ballons » s’il y en avait plusieurs. (Singular masculine takes le.)' }),

  makeMCQ({ id:'g1fr-grm-070', chapterId:CH_GRM, difficulty:1, subsection:'determinants_le_la_les',
    question: rowOf(4, ballon(GREEN), 58) + 'On voit plusieurs ballons. Faut-il « le », « la » ou « les » ?',
    options:['les','le','la','un'], answer:'les',
    hint:'Quand il y en a plus d’un, le petit mot change. (When there is more than one, the little word changes.)',
    explanation:'On dit <b>les</b> ballons 🟢, parce qu’il y en a plusieurs. (Plural takes les.)' }),

  makeMCQ({ id:'g1fr-grm-071', chapterId:CH_GRM, difficulty:2, subsection:'determinants_le_la_les',
    question: twoPanels(at(28, 14, 0.6, fleur(PINK)),
      at(120, 20, 0.4, fleur(PINK)) + at(150, 20, 0.4, fleur(PINK)) + at(180, 20, 0.4, fleur(PINK))) +
      'Sur quel dessin peut-on dire « les fleurs » ?',
    options:['le dessin A','le dessin B','les deux','aucun des deux'], answer:'le dessin B',
    hint:'« Les » s’emploie quand il y en a plus d’un. (Les is for more than one.)',
    explanation:'Sur <b>le dessin B</b> il y a trois fleurs 🌸🌸🌸 : on dit « les fleurs ». Sur A, on dit « la fleur ». (B shows several.)' }),

  makeMCQ({ id:'g1fr-grm-072', chapterId:CH_GRM, difficulty:2, subsection:'determinants_le_la_les',
    question: scEcole() + 'Devant le mot « école », quel petit mot écrit-on ?',
    options:['l’','le','la','les'], answer:'l’',
    hint:'« École » commence par une voyelle : le petit mot se raccourcit. (École starts with a vowel.)',
    explanation:'On écrit <b>l’</b>école 🏫. Devant une voyelle, « la » devient « l’ » pour que ce soit plus facile à dire. (La becomes l’ before a vowel.)' }),

  // ── phrases_simples_grm ──
  makeMCQ({ id:'g1fr-grm-073', chapterId:CH_GRM, difficulty:1, subsection:'phrases_simples_grm',
    question: scLivreSac() + 'Quelle phrase est vraie ?',
    options:['Le livre est dans le sac.','Le livre est sur le sac.','Le sac est dans le livre.','Le livre est sous le sac.'],
    answer:'Le livre est dans le sac.',
    hint:'Le livre est-il à l’intérieur ou par-dessus ? (Inside or on top?)',
    explanation:'<b>Le livre est dans le sac.</b> 📗🎒 On ne voit que le haut du livre : le reste est à l’intérieur. (The book is in the bag.)' }),

  makeMCQ({ id:'g1fr-grm-074', chapterId:CH_GRM, difficulty:1, subsection:'phrases_simples_grm',
    question: rowOf(2, fleur(PURPLE), 58) + 'Quelle phrase décrit l’image ?',
    options:['Il y a deux fleurs.','Il y a une fleur.','Il y a trois fleurs.','Il y a cinq fleurs.'],
    answer:'Il y a deux fleurs.',
    hint:'Compte les fleurs avant de choisir. (Count the flowers first.)',
    explanation:'Il y a <b>deux</b> fleurs 💜💜. Avec plusieurs fleurs, on écrit « fleurs » avec un s. (Two flowers.)' }),

  makeMCQ({ id:'g1fr-grm-075', chapterId:CH_GRM, difficulty:1, subsection:'phrases_simples_grm',
    question: scSoleilMaison() + 'Complète : Le soleil est ______ la maison.',
    options:['sur','sous','dans','avec'], answer:'sur',
    hint:'Le soleil est-il au-dessus ou en dessous du toit ? (Above or below the roof?)',
    explanation:'Le soleil est <b>sur</b> la maison ☀️🏠 : il est au-dessus du toit. (The sun is above the house.)' }),

  makeMCQ({ id:'g1fr-grm-076', chapterId:CH_GRM, difficulty:1, subsection:'phrases_simples_grm',
    question: scBallonChaise() + 'Choisis le bon mot : « Le ballon est ______ la chaise. »',
    options:['sous','sur','dans','avec'], answer:'sous',
    hint:'Le ballon est-il posé dessus, ou caché en dessous ? (On top, or underneath?)',
    explanation:'Le ballon est <b>sous</b> la chaise ⚽ : il est en dessous du siège. (The ball is under the chair.)' }),

  makeMCQ({ id:'g1fr-grm-077', chapterId:CH_GRM, difficulty:1, subsection:'phrases_simples_grm',
    question: scVoitureRoute() + 'Quelle phrase va avec l’image ?',
    options:['La voiture roule.','La voiture vole.','La voiture nage.','La voiture dort.'],
    answer:'La voiture roule.',
    hint:'Une voiture a des roues : que fait-elle sur la route ? (What does a car do on a road?)',
    explanation:'<b>La voiture roule.</b> 🚗 Elle avance sur la route grâce à ses roues. (The car drives along.)' }),

  makeMCQ({ id:'g1fr-grm-078', chapterId:CH_GRM, difficulty:2, subsection:'phrases_simples_grm',
    question: one(fleur(YELLOW)) + 'Quelle phrase est bien écrite ?',
    options:['La fleur est jaune.','la fleur est jaune.','La fleur est jaune','la fleur est jaune'],
    answer:'La fleur est jaune.',
    hint:'Vérifie deux choses : la première lettre et la fin de la phrase. (Check the first letter and the ending.)',
    explanation:'<b>La fleur est jaune.</b> 🌼 Une phrase commence par une majuscule et se termine par un point. (Capital and full stop.)' })

);

})();

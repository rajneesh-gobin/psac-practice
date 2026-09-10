'use strict';
// Grade 7 Maths — Sets (g7m-sets), batch 2B
// IDs: g7m-sets-009 … -020

(function () {

const _SVG_VENN = `<svg viewBox="0 0 250 155" width="250" height="155" role="img" aria-label="Two overlapping circles inside a rectangle, with a number written in each region" style="display:block;margin:6px auto;background:#fdf4ff;border-radius:8px;border:1px solid #e9d5ff">
  <rect x="6" y="6" width="238" height="140" fill="#fdf4ff" stroke="#6b21a8" stroke-width="1.6"/>
  <circle cx="100" cy="82" r="54" fill="#c7d2fe" fill-opacity="0.5" stroke="#4338ca" stroke-width="1.8"/>
  <circle cx="158" cy="82" r="54" fill="#fbcfe8" fill-opacity="0.5" stroke="#be185d" stroke-width="1.8"/>
  <text x="14" y="22" font-size="10" fill="#6b21a8">U</text>
  <text x="62" y="26" font-size="10" fill="#4338ca" text-anchor="middle">Football</text>
  <text x="196" y="26" font-size="10" fill="#be185d" text-anchor="middle">Cricket</text>
  <text x="74" y="88" font-size="13" fill="#1e1b4b" text-anchor="middle">9</text>
  <text x="129" y="88" font-size="13" fill="#1e1b4b" text-anchor="middle">5</text>
  <text x="184" y="88" font-size="13" fill="#1e1b4b" text-anchor="middle">7</text>
  <text x="228" y="138" font-size="13" fill="#1e1b4b" text-anchor="middle">4</text>
</svg>`;

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g7m-sets-009', chapterId:'g7m-sets', difficulty:2,
    subsection:'set_notation',
    question:'B = {x : x is an even number between 3 and 13}. Which set is B?',
    options:['{4, 6, 8, 10, 12}','{2, 4, 6, 8, 10}','{4, 6, 8, 10, 12, 14}','{3, 5, 7, 9, 11, 13}'],
    answer:'{4, 6, 8, 10, 12}',
    hint:'“Between 3 and 13” does not include 3 or 13 themselves.',
    explanation:'The even numbers strictly between 3 and 13 are <b>4, 6, 8, 10 and 12</b>. Starting at 2 goes below the range, adding 14 goes above it, and the last set lists the odd numbers.' }),

  makeNum({ id:'g7m-sets-010', chapterId:'g7m-sets', difficulty:2,
    subsection:'set_notation',
    question:'P is the set of letters in the word <b>MAURITIUS</b>. How many elements does P have?',
    answer:7,
    hint:'A set never lists the same element twice, however often it appears in the word.',
    explanation:'The word has 9 letters but only <b>7 different</b> ones: M, A, U, R, I, T, S. The U and the I each appear twice, and repeats are written only once in a set.' }),

  makeMCQ({ id:'g7m-sets-011', chapterId:'g7m-sets', difficulty:1,
    subsection:'set_notation',
    question:'Which symbol means “is NOT an element of”?',
    options:['∉','∈','⊄','∪'],
    answer:'∉',
    hint:'The stroke through a symbol is what turns it into its negative.',
    explanation:'<b>∉</b> is ∈ with a stroke through it, so it means “is not an element of”. ∈ is “is an element of”, ⊄ is “is not a subset of”, and ∪ is union.' }),

  makeMCQ({ id:'g7m-sets-012', chapterId:'g7m-sets', difficulty:2,
    subsection:'set_notation',
    question:'What does the notation n(A) = 5 tell you?',
    options:['set A has five elements','set A is the fifth set','set A has five subsets','set A is equal to five'],
    answer:'set A has five elements',
    hint:'The letter n stands for “number of”.',
    explanation:'n(A) counts the members, so n(A) = 5 means <b>set A has five elements</b>. A set with five elements actually has 32 subsets, and a set is never equal to a single number.' }),

  makeMCQ({ id:'g7m-sets-013', chapterId:'g7m-sets', difficulty:2,
    subsection:'set_types',
    question:'A = {1, 2, 3} and B = {3, 2, 1}. These two sets are …',
    options:['equal','disjoint','empty','equivalent but not equal'],
    answer:'equal',
    hint:'Does the order in which elements are written change what is in the set?',
    explanation:'The two sets contain exactly the same members, so they are <b>equal</b> — order never matters in a set. They are equivalent too, but “equivalent but not equal” is false because they are equal, and disjoint sets share no members at all.' }),

  makeMCQ({ id:'g7m-sets-014', chapterId:'g7m-sets', difficulty:2,
    subsection:'set_types',
    question:'Which word describes two sets that have the SAME NUMBER of elements but different members?',
    options:['equivalent','equal','universal','empty'],
    answer:'equivalent',
    hint:'Equal sets must match member for member; this pair only matches in size.',
    explanation:'Sets of the same size but different members are <b>equivalent</b>. Equal sets contain identical members, the universal set holds everything under discussion, and the empty set has no members at all.' }),

  makeNum({ id:'g7m-sets-015', chapterId:'g7m-sets', difficulty:1,
    subsection:'set_types',
    question:'How many elements does the empty set contain?',
    answer:0,
    hint:'Its other name is the null set.',
    explanation:'The empty set, written { } or ∅, contains <b>0</b> elements. Note that {0} is not the empty set — it is a set holding one element, the number zero.' }),

  makeMCQ({ id:'g7m-sets-016', chapterId:'g7m-sets', difficulty:3,
    subsection:'set_types',
    question:'The universal set is U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and A = {2, 4, 6, 8, 10}. Which set is the complement of A?',
    options:['{1, 3, 5, 7, 9}','{2, 4, 6, 8, 10}','{1, 2, 3, 4, 5}','{6, 7, 8, 9, 10}'],
    answer:'{1, 3, 5, 7, 9}',
    hint:'The complement holds everything in U that is NOT in A.',
    explanation:'Removing the even numbers from U leaves the odd ones: <b>{1, 3, 5, 7, 9}</b>. {2, 4, 6, 8, 10} simply repeats A itself, and {1, 2, 3, 4, 5} and {6, 7, 8, 9, 10} are just halves of U.' }),

  makeMCQ({ id:'g7m-sets-017', chapterId:'g7m-sets', difficulty:3,
    subsection:'venn_diagrams',
    question:`${_SVG_VENN}The diagram shows the sports played by a class. How many pupils play <b>cricket</b>?`,
    options:['12','7','5','9'],
    answer:'12',
    hint:'Everyone inside the Cricket circle plays cricket, including the pupils in the overlap.',
    explanation:'The Cricket circle holds 7 + 5 = <b>12</b> pupils. Answering 7 counts only those who play cricket and nothing else, leaving out the 5 in the overlap who play both.' }),

  makeNum({ id:'g7m-sets-018', chapterId:'g7m-sets', difficulty:3,
    subsection:'venn_diagrams',
    question:`${_SVG_VENN}How many pupils are there in the class altogether?`,
    answer:25,
    hint:'The rectangle is the universal set — nobody outside the circles has been forgotten.',
    explanation:'9 + 5 + 7 + 4 = <b>25 pupils</b>. Answering 21 leaves out the 4 who play neither sport, and answering 16 counts only the pupils who play exactly one of the two sports.' }),

  makeNum({ id:'g7m-sets-019', chapterId:'g7m-sets', difficulty:4,
    subsection:'venn_diagrams',
    question:'In a group of 40 pupils, 25 study French and 18 study Spanish. 8 pupils study both languages. How many study neither language?',
    answer:5,
    hint:'Adding 25 and 18 counts the 8 “both” pupils twice. Take the extra copy off.',
    explanation:'25 + 18 − 8 = 35 pupils study at least one language, so 40 − 35 = <b>5</b> study neither. Forgetting to subtract the overlap gives 43, which is more pupils than the group holds — a useful signal that something went wrong.' }),

  makeMCQ({ id:'g7m-sets-020', chapterId:'g7m-sets', difficulty:3,
    subsection:'venn_diagrams',
    question:'In a Venn diagram, what does the region inside the rectangle but outside BOTH circles represent?',
    options:['members of neither set','members of both sets','members of the first set','the whole universal set'],
    answer:'members of neither set',
    hint:'The rectangle holds everything; the circles hold the two named groups.',
    explanation:'That region holds <b>members of neither set</b> — they belong to the universal set but to neither circle. Members of both sets sit in the overlap, and the universal set is the whole rectangle, circles included.' })

);

})();

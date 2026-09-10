'use strict';
// Grade 7 Maths — Algebraic Equations (g7m-equations), batch 2B
// IDs: g7m-equations-010 … -020

(function () {

STATIC_QUESTIONS.push(

  makeNum({ id:'g7m-equations-010', chapterId:'g7m-equations', difficulty:2,
    subsection:'solving_equations',
    question:'Solve: 5x − 8 = 27. What is x?',
    answer:7,
    hint:'Undo the subtraction first, then undo the multiplication.',
    explanation:'Adding 8 to both sides gives 5x = 35, then dividing both sides by 5 gives x = <b>7</b>. Check: 5 × 7 − 8 = 27. Dividing before adding the 8 gives a wrong first step.' }),

  makeMCQ({ id:'g7m-equations-011', chapterId:'g7m-equations', difficulty:3,
    subsection:'solving_equations',
    question:'Solve: x ÷ 4 + 3 = 10',
    options:['x = 28','x = 24','x = 52','x = 7'],
    answer:'x = 28',
    hint:'Take the 3 away from both sides before you deal with the division.',
    explanation:'x ÷ 4 = 7, so x = 7 × 4 = <b>28</b>. Check: 28 ÷ 4 + 3 = 10. x = 52 multiplies before subtracting the 3, and x = 7 stops one step early.' }),

  makeMCQ({ id:'g7m-equations-012', chapterId:'g7m-equations', difficulty:3,
    subsection:'solving_equations',
    question:'Solve: 4x + 5 = 2x + 17',
    options:['x = 6','x = 4','x = 8','x = 11'],
    answer:'x = 6',
    hint:'Get all the x terms on one side first by subtracting 2x from both sides.',
    explanation:'Subtracting 2x gives 2x + 5 = 17, then 2x = 12 and x = <b>6</b>. Check: 4 × 6 + 5 = 29 and 2 × 6 + 17 = 29. x = 11 comes from ignoring the 2x on the right.' }),

  makeMCQ({ id:'g7m-equations-013', chapterId:'g7m-equations', difficulty:3,
    subsection:'solving_equations',
    question:'To solve 3x + 7 = 22, what is the correct FIRST step?',
    options:['subtract 7 from both sides','divide both sides by 3','add 7 to both sides','multiply both sides by 3'],
    answer:'subtract 7 from both sides',
    hint:'Undo the operations in the reverse of the order they were done to x.',
    explanation:'The 7 was added last, so it is undone first: <b>subtract 7 from both sides</b>, giving 3x = 15 and then x = 5. Dividing by 3 first would mean dividing the 7 as well, which most pupils forget to do.' }),

  makeMCQ({ id:'g7m-equations-014', chapterId:'g7m-equations', difficulty:2,
    subsection:'forming_equations',
    question:'“Five times a number, less 3, gives 32.” Which equation says this?',
    options:['5n − 3 = 32','5(n − 3) = 32','3n − 5 = 32','5n + 3 = 32'],
    answer:'5n − 3 = 32',
    hint:'Which happens to the number first — the multiplying or the subtracting?',
    explanation:'The number is multiplied by 5 and then 3 is taken off, so the equation is <b>5n − 3 = 32</b>. 5(n − 3) subtracts before multiplying, and 3n − 5 swaps the roles of the two numbers.' }),

  makeMCQ({ id:'g7m-equations-015', chapterId:'g7m-equations', difficulty:3,
    subsection:'forming_equations',
    question:'A rectangle has width <i>w</i> cm and a length twice its width. Its perimeter is 42 cm. Which equation is correct?',
    options:['6w = 42','3w = 42','4w = 42','8w = 42'],
    answer:'6w = 42',
    hint:'Write the perimeter as two widths plus two lengths, then collect the terms.',
    explanation:'The length is 2w, so the perimeter is w + 2w + w + 2w = <b>6w = 42</b>, giving w = 7. 3w = 42 adds only one width and one length.' }),

  makeMCQ({ id:'g7m-equations-016', chapterId:'g7m-equations', difficulty:3,
    subsection:'forming_equations',
    question:'Rita is 4 years older than Sam. Together their ages add up to 30. If Sam is <i>s</i> years old, which equation is correct?',
    options:['2s + 4 = 30','2s − 4 = 30','4s + 2 = 30','s + 4 = 30'],
    answer:'2s + 4 = 30',
    hint:'Write Rita’s age in terms of s first, then add the two ages together.',
    explanation:'Rita is s + 4, so s + (s + 4) = <b>2s + 4 = 30</b>, giving s = 13. s + 4 = 30 is Rita’s age alone, and 2s − 4 would make Rita the younger one.' }),

  makeNum({ id:'g7m-equations-017', chapterId:'g7m-equations', difficulty:3,
    subsection:'forming_equations',
    question:'Seven crates hold the same number of mangoes. Altogether there are 91 mangoes. Writing the equation 7n = 91, how many mangoes are in one crate?',
    answer:13,
    hint:'The equation multiplies n by 7, so undo it with the opposite operation.',
    explanation:'91 ÷ 7 = <b>13 mangoes</b> per crate. Check: 7 × 13 = 91. Subtracting 7 from 91 gives 84, which would be right only if one crate had been removed, not shared out.' }),

  makeNum({ id:'g7m-equations-018', chapterId:'g7m-equations', difficulty:4,
    subsection:'word_equations',
    question:'Three identical pens and one notebook costing Rs 45 come to Rs 156 altogether. How many rupees does one pen cost?',
    answer:37,
    hint:'Let one pen be p rupees and write the bill as an equation before you solve anything.',
    explanation:'3p + 45 = 156, so 3p = 111 and p = <b>Rs 37</b>. Check: 3 × 37 + 45 = 156. Dividing 156 by 3 first gives Rs 52, which shares the notebook between the pens.' }),

  makeMCQ({ id:'g7m-equations-019', chapterId:'g7m-equations', difficulty:4,
    subsection:'word_equations',
    question:'A number is increased by 12, and the result is then divided by 5, giving 9. What is the number?',
    options:['33','45','57','24'],
    answer:'33',
    hint:'Work backwards through the two steps, undoing the last one first.',
    explanation:'Before dividing, the value was 9 × 5 = 45; before adding 12, it was 45 − 12 = <b>33</b>. Check: (33 + 12) ÷ 5 = 9. Answering 45 stops one step early, and 57 adds the 12 instead of taking it off.' }),

  makeMCQ({ id:'g7m-equations-020', chapterId:'g7m-equations', difficulty:4,
    subsection:'word_equations',
    question:'Two consecutive EVEN numbers add up to 66. What is the larger number?',
    options:['34','32','33','36'],
    answer:'34',
    hint:'If the smaller even number is n, the next even number is n + 2, not n + 1.',
    explanation:'n + (n + 2) = 66 gives 2n = 64 and n = 32, so the larger number is <b>34</b>. 32 is the smaller of the pair, and 33 comes from using consecutive whole numbers instead of even ones.' })

);

})();

'use strict';
// grade1-maths - visual bank: pictures, colours, diagrams, number pictures.
// IDs: num 076-087, add 076-087, sub 076-087, shp 093-104, msr 076-087,
//      pat 076-087, tim 061-072, mon 066-077, ord 076-087.
(function () {

const CH_NUM = 'g1mth-numbers';
const CH_ADD = 'g1mth-addition';
const CH_SUB = 'g1mth-subtraction';
const CH_SHP = 'g1mth-shapes';
const CH_MSR = 'g1mth-measurement';
const CH_PAT = 'g1mth-patterns';
const CH_TIM = 'g1mth-time';
const CH_MON = 'g1mth-money';
const CH_ORD = 'g1mth-ordinals';

// ── Numbers to 20 ─────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-num-076', chapterId:CH_NUM, difficulty:1, subsection:'counting_ordering',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a ten-frame holding some counters">' +
      '<svg viewBox="0 0 160 80" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="38" y1="10" x2="38" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="10" x2="66" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="94" y1="10" x2="94" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="122" y1="10" x2="122" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="10" y1="38" x2="150" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="24" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="52" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="80" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="108" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="136" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="24" cy="52" r="10" fill="#3B82F6"/>' +
      '<circle cx="52" cy="52" r="10" fill="#3B82F6"/>' +
      '</svg></div>' +
      'How many counters are in the ten-frame?',
    options:['7','6','8','5'], answer:'7',
    hint:'A full top row is always 5. Count on from 5.',
    explanation:'The top row is full, so that is 5. Two more sit below. 5 and 2 more make <b>7</b>.' }),

  makeMCQ({ id:'g1mth-num-077', chapterId:CH_NUM, difficulty:1, subsection:'counting_ordering',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled boxes, each holding some round counters">' +
      '<svg viewBox="0 0 260 100" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="100" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="110" height="60" fill="#ffffff" stroke="#111827" stroke-width="2" rx="6"/>' +
      '<circle cx="32" cy="30" r="9" fill="#F97316"/>' +
      '<circle cx="60" cy="30" r="9" fill="#F97316"/>' +
      '<circle cx="88" cy="30" r="9" fill="#F97316"/>' +
      '<circle cx="46" cy="54" r="9" fill="#F97316"/>' +
      '<circle cx="74" cy="54" r="9" fill="#F97316"/>' +
      '<text x="65" y="92" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="140" y="10" width="110" height="60" fill="#ffffff" stroke="#111827" stroke-width="2" rx="6"/>' +
      '<circle cx="166" cy="30" r="9" fill="#A855F7"/>' +
      '<circle cx="194" cy="30" r="9" fill="#A855F7"/>' +
      '<circle cx="222" cy="30" r="9" fill="#A855F7"/>' +
      '<text x="195" y="92" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Which group has more counters?',
    options:['Group A','Group B','they are equal','neither group'], answer:'Group A',
    hint:'Count each group, then say which number is bigger.',
    explanation:'Group A has 5 counters and Group B has 3. 5 is bigger than 3, so <b>Group A</b> has more.' }),

  makeMCQ({ id:'g1mth-num-078', chapterId:CH_NUM, difficulty:1, subsection:'counting_ordering',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with one label covered by a box">' +
      '<svg viewBox="0 0 300 76" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="76" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="45" x2="285" y2="45" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="38" x2="15" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="42" y1="38" x2="42" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="69" y1="38" x2="69" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="96" y1="38" x2="96" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="123" y1="38" x2="123" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="150" y1="38" x2="150" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="177" y1="38" x2="177" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="204" y1="38" x2="204" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="231" y1="38" x2="231" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="258" y1="38" x2="258" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="285" y1="38" x2="285" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<text x="15" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">0</text>' +
      '<text x="42" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">1</text>' +
      '<text x="69" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">2</text>' +
      '<text x="96" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '<text x="123" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '<text x="150" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">5</text>' +
      '<rect x="167" y="56" width="20" height="16" fill="#FACC15" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="204" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">7</text>' +
      '<text x="231" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '<text x="258" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<text x="285" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '</svg></div>' +
      'Which number is hiding under the yellow box?',
    options:['6','5','7','8'], answer:'6',
    hint:'Say the numbers out loud in order and stop at the box.',
    explanation:'The box sits between 5 and 7, so the hidden number is <b>6</b>.' }),

  makeMCQ({ id:'g1mth-num-079', chapterId:CH_NUM, difficulty:2, subsection:'counting_ordering',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three labelled rows of round counters">' +
      '<svg viewBox="0 0 260 120" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="120" rx="8" fill="#ffffff"/>' +
      '<text x="18" y="28" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<circle cx="55" cy="22" r="10" fill="#22C55E"/>' +
      '<circle cx="83" cy="22" r="10" fill="#22C55E"/>' +
      '<circle cx="111" cy="22" r="10" fill="#22C55E"/>' +
      '<circle cx="139" cy="22" r="10" fill="#22C55E"/>' +
      '<text x="18" y="66" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<circle cx="55" cy="60" r="10" fill="#3B82F6"/>' +
      '<circle cx="83" cy="60" r="10" fill="#3B82F6"/>' +
      '<circle cx="111" cy="60" r="10" fill="#3B82F6"/>' +
      '<circle cx="139" cy="60" r="10" fill="#3B82F6"/>' +
      '<circle cx="167" cy="60" r="10" fill="#3B82F6"/>' +
      '<circle cx="195" cy="60" r="10" fill="#3B82F6"/>' +
      '<text x="18" y="104" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '<circle cx="55" cy="98" r="10" fill="#EC4899"/>' +
      '<circle cx="83" cy="98" r="10" fill="#EC4899"/>' +
      '</svg></div>' +
      'Which row has the fewest counters?',
    options:['Row C','Row A','Row B','all the same'], answer:'Row C',
    hint:'Fewest means the smallest number. Count all three rows first.',
    explanation:'Row A has 4, Row B has 6 and <b>Row C has 2</b>. 2 is the smallest, so Row C has the fewest.' }),

  makeMCQ({ id:'g1mth-num-080', chapterId:CH_NUM, difficulty:1, subsection:'number_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a ten-frame holding some counters">' +
      '<svg viewBox="0 0 160 80" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="38" y1="10" x2="38" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="10" x2="66" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="94" y1="10" x2="94" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="122" y1="10" x2="122" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="10" y1="38" x2="150" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="24" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="52" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="80" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="108" cy="24" r="10" fill="#EF4444"/>' +
      '</svg></div>' +
      'Which word tells how many counters there are?',
    options:['four','five','three','six'], answer:'four',
    hint:'Touch each counter as you count it.',
    explanation:'There are 4 counters, and the word for 4 is <b>four</b>.' }),

  makeMCQ({ id:'g1mth-num-081', chapterId:CH_NUM, difficulty:1, subsection:'number_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two rows of round fruit">' +
      '<svg viewBox="0 0 240 100" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="100" rx="8" fill="#ffffff"/>' +
      '<circle cx="35" cy="32" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="35" y1="18" x2="35" y2="10" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="90" cy="32" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="90" y1="18" x2="90" y2="10" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="145" cy="32" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="145" y1="18" x2="145" y2="10" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="200" cy="32" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="200" y1="18" x2="200" y2="10" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="35" cy="80" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="35" y1="66" x2="35" y2="58" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="90" cy="80" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="90" y1="66" x2="90" y2="58" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="145" cy="80" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="145" y1="66" x2="145" y2="58" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="200" cy="80" r="14" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="200" y1="66" x2="200" y2="58" stroke="#92400E" stroke-width="3"/>' +
      '</svg></div>' +
      'Count the apples. Which number word is right?',
    options:['eight','nine','seven','six'], answer:'eight',
    hint:'Count the top row, then keep counting along the bottom row.',
    explanation:'4 apples on top and 4 below make 8, and the word for 8 is <b>eight</b>.' }),

  makeMCQ({ id:'g1mth-num-082', chapterId:CH_NUM, difficulty:2, subsection:'number_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with an arrow pointing at one mark">' +
      '<svg viewBox="0 0 300 86" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="86" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="55" x2="285" y2="55" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="48" x2="15" y2="62" stroke="#111827" stroke-width="2"/>' +
      '<line x1="69" y1="48" x2="69" y2="62" stroke="#111827" stroke-width="2"/>' +
      '<line x1="123" y1="48" x2="123" y2="62" stroke="#111827" stroke-width="2"/>' +
      '<line x1="177" y1="48" x2="177" y2="62" stroke="#111827" stroke-width="2"/>' +
      '<line x1="231" y1="48" x2="231" y2="62" stroke="#111827" stroke-width="2"/>' +
      '<line x1="285" y1="48" x2="285" y2="62" stroke="#111827" stroke-width="2"/>' +
      '<text x="15" y="78" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '<text x="69" y="78" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<text x="123" y="78" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<text x="177" y="78" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">11</text>' +
      '<text x="231" y="78" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">12</text>' +
      '<text x="285" y="78" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">13</text>' +
      '<line x1="231" y1="14" x2="231" y2="40" stroke="#EF4444" stroke-width="3"/>' +
      '<polygon points="224,38 238,38 231,48" fill="#EF4444"/>' +
      '</svg></div>' +
      'The arrow points to a number. Which word matches it?',
    options:['twelve','twenty','eleven','ten'], answer:'twelve',
    hint:'Read the number written under the arrow.',
    explanation:'The arrow points at 12, and the word for 12 is <b>twelve</b>. Twenty is a much bigger number.' }),

  makeMCQ({ id:'g1mth-num-083', chapterId:CH_NUM, difficulty:2, subsection:'number_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two ten-frames holding counters">' +
      '<svg viewBox="0 0 330 80" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="330" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="38" y1="10" x2="38" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="10" x2="66" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="94" y1="10" x2="94" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="122" y1="10" x2="122" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="10" y1="38" x2="150" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="24" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="52" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="80" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="108" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="136" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="24" cy="52" r="10" fill="#22C55E"/>' +
      '<circle cx="52" cy="52" r="10" fill="#22C55E"/>' +
      '<circle cx="80" cy="52" r="10" fill="#22C55E"/>' +
      '<circle cx="108" cy="52" r="10" fill="#22C55E"/>' +
      '<circle cx="136" cy="52" r="10" fill="#22C55E"/>' +
      '<rect x="180" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="208" y1="10" x2="208" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="236" y1="10" x2="236" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="264" y1="10" x2="264" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="292" y1="10" x2="292" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="180" y1="38" x2="320" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="194" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="222" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="250" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="278" cy="24" r="10" fill="#22C55E"/>' +
      '<circle cx="306" cy="24" r="10" fill="#22C55E"/>' +
      '</svg></div>' +
      'How many counters altogether? Choose the word.',
    options:['fifteen','fourteen','sixteen','fifty'], answer:'fifteen',
    hint:'The first frame is full, so it holds 10. Count on from 10.',
    explanation:'A full frame is 10 and the second frame holds 5. 10 and 5 make 15, written <b>fifteen</b>.' }),

  makeMCQ({ id:'g1mth-num-084', chapterId:CH_NUM, difficulty:1, subsection:'odd_even',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="counters grouped into rings of two">' +
      '<svg viewBox="0 0 250 70" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="250" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="15" width="66" height="40" rx="20" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="30" cy="35" r="11" fill="#3B82F6"/>' +
      '<circle cx="56" cy="35" r="11" fill="#3B82F6"/>' +
      '<rect x="92" y="15" width="66" height="40" rx="20" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="112" cy="35" r="11" fill="#3B82F6"/>' +
      '<circle cx="138" cy="35" r="11" fill="#3B82F6"/>' +
      '<rect x="174" y="15" width="66" height="40" rx="20" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="194" cy="35" r="11" fill="#3B82F6"/>' +
      '<circle cx="220" cy="35" r="11" fill="#3B82F6"/>' +
      '</svg></div>' +
      'Every counter has a partner. Is 6 odd or even?',
    options:['even','odd','both','neither'], answer:'even',
    hint:'If nothing is left alone, the number is even.',
    explanation:'All 6 counters pair up with none left over, so 6 is an <b>even</b> number.' }),

  makeMCQ({ id:'g1mth-num-085', chapterId:CH_NUM, difficulty:1, subsection:'odd_even',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="counters grouped into rings of two, with one counter outside the rings">' +
      '<svg viewBox="0 0 290 70" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="15" width="66" height="40" rx="20" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="30" cy="35" r="11" fill="#F97316"/>' +
      '<circle cx="56" cy="35" r="11" fill="#F97316"/>' +
      '<rect x="92" y="15" width="66" height="40" rx="20" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="112" cy="35" r="11" fill="#F97316"/>' +
      '<circle cx="138" cy="35" r="11" fill="#F97316"/>' +
      '<rect x="174" y="15" width="66" height="40" rx="20" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="194" cy="35" r="11" fill="#F97316"/>' +
      '<circle cx="220" cy="35" r="11" fill="#F97316"/>' +
      '<circle cx="266" cy="35" r="11" fill="#F97316"/>' +
      '</svg></div>' +
      '7 counters are put into pairs. How many are left over?',
    options:['1','0','2','3'], answer:'1',
    hint:'Look for the counter with no ring around it.',
    explanation:'Three pairs use 6 counters, so <b>1</b> counter is left alone. That is why 7 is odd.' }),

  makeMCQ({ id:'g1mth-num-086', chapterId:CH_NUM, difficulty:2, subsection:'odd_even',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled rows of counters arranged in pairs">' +
      '<svg viewBox="0 0 280 110" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="110" rx="8" fill="#ffffff"/>' +
      '<text x="16" y="34" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<circle cx="46" cy="28" r="10" fill="#22C55E"/>' +
      '<circle cx="70" cy="28" r="10" fill="#22C55E"/>' +
      '<circle cx="106" cy="28" r="10" fill="#22C55E"/>' +
      '<circle cx="130" cy="28" r="10" fill="#22C55E"/>' +
      '<circle cx="166" cy="28" r="10" fill="#22C55E"/>' +
      '<circle cx="190" cy="28" r="10" fill="#22C55E"/>' +
      '<circle cx="226" cy="28" r="10" fill="#22C55E"/>' +
      '<circle cx="250" cy="28" r="10" fill="#22C55E"/>' +
      '<text x="16" y="86" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<circle cx="46" cy="80" r="10" fill="#A855F7"/>' +
      '<circle cx="70" cy="80" r="10" fill="#A855F7"/>' +
      '<circle cx="106" cy="80" r="10" fill="#A855F7"/>' +
      '<circle cx="130" cy="80" r="10" fill="#A855F7"/>' +
      '<circle cx="166" cy="80" r="10" fill="#A855F7"/>' +
      '</svg></div>' +
      'Which row holds an odd number of counters?',
    options:['Row B','Row A','both rows','neither row'], answer:'Row B',
    hint:'An odd number always leaves one counter without a partner.',
    explanation:'Row A has 8 counters in 4 neat pairs. <b>Row B has 5</b>, so one counter is left alone. 5 is odd.' }),

  makeMCQ({ id:'g1mth-num-087', chapterId:CH_NUM, difficulty:2, subsection:'odd_even',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with some numbers ringed and one ring left empty">' +
      '<svg viewBox="0 0 300 76" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="76" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="30" x2="285" y2="30" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="69" cy="30" r="13" fill="#ffffff" stroke="#EF4444" stroke-width="3"/>' +
      '<circle cx="123" cy="30" r="13" fill="#ffffff" stroke="#EF4444" stroke-width="3"/>' +
      '<circle cx="177" cy="30" r="13" fill="#ffffff" stroke="#EF4444" stroke-width="3"/>' +
      '<circle cx="231" cy="30" r="13" fill="#ffffff" stroke="#EF4444" stroke-width="3"/>' +
      '<circle cx="285" cy="30" r="13" fill="#ffffff" stroke="#9CA3AF" stroke-width="3" stroke-dasharray="4 3"/>' +
      '<text x="15" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">1</text>' +
      '<text x="69" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">2</text>' +
      '<text x="96" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '<text x="123" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '<text x="150" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">5</text>' +
      '<text x="177" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '<text x="204" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">7</text>' +
      '<text x="231" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '<text x="258" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<text x="285" y="35" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<text x="150" y="66" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">which number joins the ringed ones?</text>' +
      '</svg></div>' +
      'The ringed numbers all follow one rule. Which number belongs in the dotted ring?',
    options:['10','9','11','12'], answer:'10',
    hint:'Look at 2, 4, 6, 8 — what kind of numbers are they?',
    explanation:'2, 4, 6 and 8 are all even numbers. The next even number is <b>10</b>.' })

);

// ── Addition ──────────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-add-076', chapterId:CH_ADD, difficulty:1, subsection:'adding_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two groups of counters joined by a plus sign, with an empty answer box">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<circle cx="22" cy="35" r="11" fill="#3B82F6"/>' +
      '<circle cx="48" cy="35" r="11" fill="#3B82F6"/>' +
      '<circle cx="74" cy="35" r="11" fill="#3B82F6"/>' +
      '<text x="100" y="43" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">+</text>' +
      '<circle cx="128" cy="35" r="11" fill="#F97316"/>' +
      '<circle cx="154" cy="35" r="11" fill="#F97316"/>' +
      '<circle cx="180" cy="35" r="11" fill="#F97316"/>' +
      '<circle cx="206" cy="35" r="11" fill="#F97316"/>' +
      '<text x="232" y="43" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">=</text>' +
      '<rect x="252" y="16" width="36" height="38" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="270" y="43" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'How many counters are there altogether?',
    options:['7','6','8','9'], answer:'7',
    hint:'Start at the bigger group and count on.',
    explanation:'3 blue counters and 4 orange counters make <b>7</b> in all.' }),

  makeMCQ({ id:'g1mth-add-077', chapterId:CH_ADD, difficulty:1, subsection:'adding_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bar model with a whole bar above two part bars, one part left blank">' +
      '<svg viewBox="0 0 240 110" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="12" width="200" height="36" rx="5" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="37" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<rect x="20" y="60" width="100" height="36" rx="5" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="70" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">5</text>' +
      '<rect x="120" y="60" width="100" height="36" rx="5" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="170" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'The big bar is 9. One part is 5. What is the other part?',
    options:['4','3','5','6'], answer:'4',
    hint:'Count on from 5 until you reach 9, and see how many steps you took.',
    explanation:'5 and 4 make 9, so the missing part is <b>4</b>.' }),

  makeMCQ({ id:'g1mth-add-078', chapterId:CH_ADD, difficulty:2, subsection:'adding_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with a curved hop drawn above it">' +
      '<svg viewBox="0 0 300 76" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="76" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="45" x2="285" y2="45" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="38" x2="15" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="42" y1="38" x2="42" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="69" y1="38" x2="69" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="96" y1="38" x2="96" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="123" y1="38" x2="123" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="150" y1="38" x2="150" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="177" y1="38" x2="177" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="204" y1="38" x2="204" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="231" y1="38" x2="231" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="258" y1="38" x2="258" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="285" y1="38" x2="285" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<text x="15" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">0</text>' +
      '<text x="42" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">1</text>' +
      '<text x="69" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">2</text>' +
      '<text x="96" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '<text x="123" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '<text x="150" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">5</text>' +
      '<text x="177" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '<text x="204" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">7</text>' +
      '<text x="231" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '<text x="258" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<text x="285" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<path d="M 123 38 Q 190 6 258 38" fill="none" stroke="#EF4444" stroke-width="3"/>' +
      '<polygon points="251,28 265,28 258,40" fill="#EF4444"/>' +
      '</svg></div>' +
      'Which addition does the hop show?',
    options:['4 + 5 = 9','4 + 4 = 8','5 + 4 = 8','4 + 6 = 10'], answer:'4 + 5 = 9',
    hint:'Find where the hop starts and where the arrow lands.',
    explanation:'The hop starts at 4 and lands on 9, so it moved 5 places: <b>4 + 5 = 9</b>.' }),

  makeMCQ({ id:'g1mth-add-079', chapterId:CH_ADD, difficulty:1, subsection:'adding_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a ten-frame that is partly filled with counters">' +
      '<svg viewBox="0 0 160 80" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="38" y1="10" x2="38" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="10" x2="66" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="94" y1="10" x2="94" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="122" y1="10" x2="122" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="10" y1="38" x2="150" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="24" cy="24" r="10" fill="#A855F7"/>' +
      '<circle cx="52" cy="24" r="10" fill="#A855F7"/>' +
      '<circle cx="80" cy="24" r="10" fill="#A855F7"/>' +
      '<circle cx="108" cy="24" r="10" fill="#A855F7"/>' +
      '<circle cx="136" cy="24" r="10" fill="#A855F7"/>' +
      '<circle cx="24" cy="52" r="10" fill="#A855F7"/>' +
      '</svg></div>' +
      'How many more counters are needed to fill the ten-frame?',
    options:['4','3','5','6'], answer:'4',
    hint:'Count the empty boxes, not the counters.',
    explanation:'6 boxes are full, so 4 are still empty. 6 and <b>4</b> make 10.' }),

  makeMCQ({ id:'g1mth-add-080', chapterId:CH_ADD, difficulty:1, subsection:'adding_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two ten-frames holding counters">' +
      '<svg viewBox="0 0 330 80" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="330" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="38" y1="10" x2="38" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="10" x2="66" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="94" y1="10" x2="94" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="122" y1="10" x2="122" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="10" y1="38" x2="150" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="24" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="52" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="80" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="108" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="136" cy="24" r="10" fill="#EF4444"/>' +
      '<circle cx="24" cy="52" r="10" fill="#EF4444"/>' +
      '<circle cx="52" cy="52" r="10" fill="#EF4444"/>' +
      '<circle cx="80" cy="52" r="10" fill="#EF4444"/>' +
      '<circle cx="108" cy="52" r="10" fill="#EF4444"/>' +
      '<circle cx="136" cy="52" r="10" fill="#EF4444"/>' +
      '<rect x="180" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="208" y1="10" x2="208" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="236" y1="10" x2="236" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="264" y1="10" x2="264" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="292" y1="10" x2="292" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="180" y1="38" x2="320" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="194" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="222" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="250" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="278" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="306" cy="24" r="10" fill="#3B82F6"/>' +
      '<circle cx="194" cy="52" r="10" fill="#3B82F6"/>' +
      '<circle cx="222" cy="52" r="10" fill="#3B82F6"/>' +
      '</svg></div>' +
      'How many counters are there in total?',
    options:['17','16','18','15'], answer:'17',
    hint:'The full frame is 10. Then count on the counters in the second frame.',
    explanation:'The red frame is full, so 10. The blue frame holds 7. 10 and 7 make <b>17</b>.' }),

  makeMCQ({ id:'g1mth-add-081', chapterId:CH_ADD, difficulty:2, subsection:'adding_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bar model with a whole bar above two part bars, one part left blank">' +
      '<svg viewBox="0 0 240 110" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="12" width="200" height="36" rx="5" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="37" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">16</text>' +
      '<rect x="20" y="60" width="112" height="36" rx="5" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="76" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<rect x="132" y="60" width="88" height="36" rx="5" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="176" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'The whole is 16 and one part is 9. What is the other part?',
    options:['7','6','8','9'], answer:'7',
    hint:'Go from 9 up to 10, then keep going to 16.',
    explanation:'9 needs 1 more to reach 10, then 6 more to reach 16. 1 and 6 make <b>7</b>.' }),

  makeMCQ({ id:'g1mth-add-082', chapterId:CH_ADD, difficulty:2, subsection:'adding_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with a curved hop drawn above it">' +
      '<svg viewBox="0 0 300 76" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="76" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="45" x2="285" y2="45" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="38" x2="15" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="42" y1="38" x2="42" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="69" y1="38" x2="69" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="96" y1="38" x2="96" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="123" y1="38" x2="123" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="150" y1="38" x2="150" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="177" y1="38" x2="177" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="204" y1="38" x2="204" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="231" y1="38" x2="231" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="258" y1="38" x2="258" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="285" y1="38" x2="285" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<text x="15" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<text x="42" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">11</text>' +
      '<text x="69" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">12</text>' +
      '<text x="96" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">13</text>' +
      '<text x="123" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">14</text>' +
      '<text x="150" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">15</text>' +
      '<text x="177" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">16</text>' +
      '<text x="204" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">17</text>' +
      '<text x="231" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">18</text>' +
      '<text x="258" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">19</text>' +
      '<text x="285" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">20</text>' +
      '<path d="M 69 38 Q 138 6 204 38" fill="none" stroke="#22C55E" stroke-width="3"/>' +
      '<polygon points="197,28 211,28 204,40" fill="#22C55E"/>' +
      '</svg></div>' +
      'The hop starts at 12 and moves 5 forward. Where does it land?',
    options:['17','16','18','19'], answer:'17',
    hint:'Count 5 marks forward from 12, one mark at a time.',
    explanation:'13, 14, 15, 16, 17 — that is 5 steps, so it lands on <b>17</b>.' }),

  makeMCQ({ id:'g1mth-add-083', chapterId:CH_ADD, difficulty:2, subsection:'adding_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a domino tile with dots on both halves">' +
      '<svg viewBox="0 0 230 110" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="230" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="210" height="90" rx="10" fill="#FEF3C7" stroke="#111827" stroke-width="2.5"/>' +
      '<line x1="115" y1="14" x2="115" y2="96" stroke="#111827" stroke-width="2.5"/>' +
      '<circle cx="35" cy="30" r="7" fill="#111827"/>' +
      '<circle cx="62" cy="30" r="7" fill="#111827"/>' +
      '<circle cx="89" cy="30" r="7" fill="#111827"/>' +
      '<circle cx="35" cy="55" r="7" fill="#111827"/>' +
      '<circle cx="62" cy="55" r="7" fill="#111827"/>' +
      '<circle cx="89" cy="55" r="7" fill="#111827"/>' +
      '<circle cx="35" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="62" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="89" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="145" cy="35" r="7" fill="#111827"/>' +
      '<circle cx="190" cy="35" r="7" fill="#111827"/>' +
      '<circle cx="145" cy="75" r="7" fill="#111827"/>' +
      '<circle cx="190" cy="75" r="7" fill="#111827"/>' +
      '</svg></div>' +
      'How many dots are on the whole domino?',
    options:['13','12','14','11'], answer:'13',
    hint:'Count one half, then count on across the line.',
    explanation:'The left half has 9 dots and the right half has 4. 9 and 4 make <b>13</b>.' }),

  makeMCQ({ id:'g1mth-add-084', chapterId:CH_ADD, difficulty:1, subsection:'number_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two ponds, each holding some fish shapes">' +
      '<svg viewBox="0 0 280 100" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="100" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="70" cy="50" rx="62" ry="42" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<ellipse cx="45" cy="32" rx="13" ry="7" fill="#F97316"/>' +
      '<polygon points="32,32 22,26 22,38" fill="#F97316"/>' +
      '<ellipse cx="90" cy="32" rx="13" ry="7" fill="#F97316"/>' +
      '<polygon points="77,32 67,26 67,38" fill="#F97316"/>' +
      '<ellipse cx="45" cy="52" rx="13" ry="7" fill="#F97316"/>' +
      '<polygon points="32,52 22,46 22,58" fill="#F97316"/>' +
      '<ellipse cx="90" cy="52" rx="13" ry="7" fill="#F97316"/>' +
      '<polygon points="77,52 67,46 67,58" fill="#F97316"/>' +
      '<ellipse cx="68" cy="72" rx="13" ry="7" fill="#F97316"/>' +
      '<polygon points="55,72 45,66 45,78" fill="#F97316"/>' +
      '<ellipse cx="210" cy="50" rx="62" ry="42" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<ellipse cx="190" cy="36" rx="13" ry="7" fill="#A855F7"/>' +
      '<polygon points="177,36 167,30 167,42" fill="#A855F7"/>' +
      '<ellipse cx="232" cy="36" rx="13" ry="7" fill="#A855F7"/>' +
      '<polygon points="219,36 209,30 209,42" fill="#A855F7"/>' +
      '<ellipse cx="210" cy="66" rx="13" ry="7" fill="#A855F7"/>' +
      '<polygon points="197,66 187,60 187,72" fill="#A855F7"/>' +
      '</svg></div>' +
      'Which number sentence matches the two ponds?',
    options:['5 + 3 = 8','5 - 3 = 2','3 + 3 = 6','5 + 3 = 9'], answer:'5 + 3 = 8',
    hint:'Count the fish in each pond, then decide if you join them or take away.',
    explanation:'There are 5 fish in one pond and 3 in the other. Joining them gives <b>5 + 3 = 8</b>.' }),

  makeMCQ({ id:'g1mth-add-085', chapterId:CH_ADD, difficulty:2, subsection:'number_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bar model with a whole bar above two part bars, all numbers shown">' +
      '<svg viewBox="0 0 240 110" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="12" width="200" height="36" rx="5" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="37" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<rect x="20" y="60" width="120" height="36" rx="5" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="80" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '<rect x="140" y="60" width="80" height="36" rx="5" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<text x="180" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '</svg></div>' +
      'Which number sentence is true for this bar model?',
    options:['6 + 4 = 10','6 + 4 = 11','10 + 4 = 6','6 - 4 = 10'], answer:'6 + 4 = 10',
    hint:'The two small bars together must equal the long bar.',
    explanation:'The two parts are 6 and 4, and together they fill the whole bar of 10: <b>6 + 4 = 10</b>.' }),

  makeMCQ({ id:'g1mth-add-086', chapterId:CH_ADD, difficulty:2, subsection:'number_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number sentence with counters and one empty box">' +
      '<svg viewBox="0 0 280 70" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="70" rx="8" fill="#ffffff"/>' +
      '<circle cx="24" cy="35" r="12" fill="#22C55E"/>' +
      '<circle cx="54" cy="35" r="12" fill="#22C55E"/>' +
      '<text x="82" y="43" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">+</text>' +
      '<rect x="104" y="14" width="40" height="42" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="124" y="44" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '<text x="168" y="43" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">=</text>' +
      '<text x="220" y="46" text-anchor="middle" font-size="28" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '</svg></div>' +
      'What number goes in the box to make the sentence true?',
    options:['7','6','8','5'], answer:'7',
    hint:'Two counters are already there. How many more reach 9?',
    explanation:'2 and 7 make 9, so <b>7</b> belongs in the box.' }),

  makeMCQ({ id:'g1mth-add-087', chapterId:CH_ADD, difficulty:1, subsection:'number_sentences',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two rows of small cars">' +
      '<svg viewBox="0 0 300 100" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="100" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="14" width="36" height="18" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="19" cy="34" r="5" fill="#111827"/>' +
      '<circle cx="37" cy="34" r="5" fill="#111827"/>' +
      '<rect x="58" y="14" width="36" height="18" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="67" cy="34" r="5" fill="#111827"/>' +
      '<circle cx="85" cy="34" r="5" fill="#111827"/>' +
      '<rect x="106" y="14" width="36" height="18" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="115" cy="34" r="5" fill="#111827"/>' +
      '<circle cx="133" cy="34" r="5" fill="#111827"/>' +
      '<rect x="154" y="14" width="36" height="18" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="163" cy="34" r="5" fill="#111827"/>' +
      '<circle cx="181" cy="34" r="5" fill="#111827"/>' +
      '<rect x="202" y="14" width="36" height="18" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="211" cy="34" r="5" fill="#111827"/>' +
      '<circle cx="229" cy="34" r="5" fill="#111827"/>' +
      '<rect x="250" y="14" width="36" height="18" rx="4" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="259" cy="34" r="5" fill="#111827"/>' +
      '<circle cx="277" cy="34" r="5" fill="#111827"/>' +
      '<rect x="10" y="62" width="36" height="18" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="19" cy="82" r="5" fill="#111827"/>' +
      '<circle cx="37" cy="82" r="5" fill="#111827"/>' +
      '<rect x="58" y="62" width="36" height="18" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="67" cy="82" r="5" fill="#111827"/>' +
      '<circle cx="85" cy="82" r="5" fill="#111827"/>' +
      '<rect x="106" y="62" width="36" height="18" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="115" cy="82" r="5" fill="#111827"/>' +
      '<circle cx="133" cy="82" r="5" fill="#111827"/>' +
      '<rect x="154" y="62" width="36" height="18" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="163" cy="82" r="5" fill="#111827"/>' +
      '<circle cx="181" cy="82" r="5" fill="#111827"/>' +
      '<rect x="202" y="62" width="36" height="18" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="211" cy="82" r="5" fill="#111827"/>' +
      '<circle cx="229" cy="82" r="5" fill="#111827"/>' +
      '<rect x="250" y="62" width="36" height="18" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="259" cy="82" r="5" fill="#111827"/>' +
      '<circle cx="277" cy="82" r="5" fill="#111827"/>' +
      '</svg></div>' +
      'Which number sentence matches the two rows of cars?',
    options:['6 + 6 = 12','6 + 6 = 11','6 + 2 = 8','12 + 6 = 6'], answer:'6 + 6 = 12',
    hint:'Count one row, then notice the other row is the same.',
    explanation:'Each row has 6 cars, so it is a double: <b>6 + 6 = 12</b>.' })

);

// ── Subtraction ───────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-sub-076', chapterId:CH_SUB, difficulty:1, subsection:'subtracting_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of round fruit, some marked with a cross">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<circle cx="28" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="17" y1="27" x2="39" y2="49" stroke="#111827" stroke-width="3"/>' +
      '<line x1="39" y1="27" x2="17" y2="49" stroke="#111827" stroke-width="3"/>' +
      '<circle cx="64" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="53" y1="27" x2="75" y2="49" stroke="#111827" stroke-width="3"/>' +
      '<line x1="75" y1="27" x2="53" y2="49" stroke="#111827" stroke-width="3"/>' +
      '<circle cx="100" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="89" y1="27" x2="111" y2="49" stroke="#111827" stroke-width="3"/>' +
      '<line x1="111" y1="27" x2="89" y2="49" stroke="#111827" stroke-width="3"/>' +
      '<circle cx="136" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="172" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="208" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="244" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="280" cy="38" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'Some apples are crossed out. How many are left?',
    options:['5','4','6','3'], answer:'5',
    hint:'Count only the apples with no cross on them.',
    explanation:'There were 8 apples and 3 are crossed out. 8 take away 3 leaves <b>5</b>.' }),

  makeMCQ({ id:'g1mth-sub-077', chapterId:CH_SUB, difficulty:1, subsection:'subtracting_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with a curved hop drawn above it">' +
      '<svg viewBox="0 0 300 76" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="76" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="45" x2="285" y2="45" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="38" x2="15" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="42" y1="38" x2="42" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="69" y1="38" x2="69" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="96" y1="38" x2="96" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="123" y1="38" x2="123" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="150" y1="38" x2="150" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="177" y1="38" x2="177" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="204" y1="38" x2="204" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="231" y1="38" x2="231" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="258" y1="38" x2="258" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="285" y1="38" x2="285" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<text x="15" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">0</text>' +
      '<text x="42" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">1</text>' +
      '<text x="69" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">2</text>' +
      '<text x="96" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '<text x="123" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '<text x="150" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">5</text>' +
      '<text x="177" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '<text x="204" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">7</text>' +
      '<text x="231" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '<text x="258" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<text x="285" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<path d="M 258 38 Q 204 6 150 38" fill="none" stroke="#EF4444" stroke-width="3"/>' +
      '<polygon points="143,28 157,28 150,40" fill="#EF4444"/>' +
      '</svg></div>' +
      'The arrow hops backwards from 9. Where does it stop?',
    options:['5','6','4','7'], answer:'5',
    hint:'Read the number the arrow head is pointing at.',
    explanation:'The hop starts at 9 and goes back 4 places, landing on <b>5</b>. So 9 - 4 = 5.' }),

  makeMCQ({ id:'g1mth-sub-078', chapterId:CH_SUB, difficulty:1, subsection:'subtracting_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of balloons, some marked with a cross">' +
      '<svg viewBox="0 0 280 100" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="100" rx="8" fill="#ffffff"/>' +
      '<ellipse cx="28" cy="34" rx="16" ry="20" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="28" y1="54" x2="28" y2="86" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="14" y1="20" x2="42" y2="48" stroke="#111827" stroke-width="3"/>' +
      '<line x1="42" y1="20" x2="14" y2="48" stroke="#111827" stroke-width="3"/>' +
      '<ellipse cx="70" cy="34" rx="16" ry="20" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="70" y1="54" x2="70" y2="86" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="56" y1="20" x2="84" y2="48" stroke="#111827" stroke-width="3"/>' +
      '<line x1="84" y1="20" x2="56" y2="48" stroke="#111827" stroke-width="3"/>' +
      '<ellipse cx="112" cy="34" rx="16" ry="20" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="112" y1="54" x2="112" y2="86" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="154" cy="34" rx="16" ry="20" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="154" y1="54" x2="154" y2="86" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="196" cy="34" rx="16" ry="20" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="196" y1="54" x2="196" y2="86" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="238" cy="34" rx="16" ry="20" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="238" y1="54" x2="238" y2="86" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="266" cy="70" rx="12" ry="15" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'Which number sentence matches the balloons?',
    options:['7 - 2 = 5','7 + 2 = 9','7 - 2 = 4','2 - 7 = 5'], answer:'7 - 2 = 5',
    hint:'Count all the balloons first, then count the crossed ones.',
    explanation:'There are 7 balloons and 2 are crossed out, leaving 5: <b>7 - 2 = 5</b>.' }),

  makeMCQ({ id:'g1mth-sub-079', chapterId:CH_SUB, difficulty:1, subsection:'subtracting_within_10',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bar model with a whole bar above two part bars, one part covered">' +
      '<svg viewBox="0 0 240 110" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="12" width="200" height="36" rx="5" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="37" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<rect x="20" y="60" width="120" height="36" rx="5" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="80" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '<rect x="140" y="60" width="80" height="36" rx="5" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'The whole is 10 and one part is 6. What is hidden under the grey box?',
    options:['4','3','5','6'], answer:'4',
    hint:'What must you add to 6 to get back to 10?',
    explanation:'10 take away 6 leaves <b>4</b>, so 4 is hidden under the grey box.' }),

  makeMCQ({ id:'g1mth-sub-080', chapterId:CH_SUB, difficulty:2, subsection:'subtracting_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two ten-frames of counters, some counters marked with a cross">' +
      '<svg viewBox="0 0 330 80" style="width:100%;max-width:340px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="330" height="80" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="38" y1="10" x2="38" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="10" x2="66" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="94" y1="10" x2="94" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="122" y1="10" x2="122" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="10" y1="38" x2="150" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="24" cy="24" r="10" fill="#F97316"/>' +
      '<line x1="17" y1="17" x2="31" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<line x1="31" y1="17" x2="17" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<circle cx="52" cy="24" r="10" fill="#F97316"/>' +
      '<line x1="45" y1="17" x2="59" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<line x1="59" y1="17" x2="45" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<circle cx="80" cy="24" r="10" fill="#F97316"/>' +
      '<line x1="73" y1="17" x2="87" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<line x1="87" y1="17" x2="73" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<circle cx="108" cy="24" r="10" fill="#F97316"/>' +
      '<line x1="101" y1="17" x2="115" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<line x1="115" y1="17" x2="101" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<circle cx="136" cy="24" r="10" fill="#F97316"/>' +
      '<line x1="129" y1="17" x2="143" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<line x1="143" y1="17" x2="129" y2="31" stroke="#111827" stroke-width="2.5"/>' +
      '<circle cx="24" cy="52" r="10" fill="#F97316"/>' +
      '<circle cx="52" cy="52" r="10" fill="#F97316"/>' +
      '<circle cx="80" cy="52" r="10" fill="#F97316"/>' +
      '<circle cx="108" cy="52" r="10" fill="#F97316"/>' +
      '<circle cx="136" cy="52" r="10" fill="#F97316"/>' +
      '<rect x="180" y="10" width="140" height="56" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="208" y1="10" x2="208" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="236" y1="10" x2="236" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="264" y1="10" x2="264" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="292" y1="10" x2="292" y2="66" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="180" y1="38" x2="320" y2="38" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="194" cy="24" r="10" fill="#F97316"/>' +
      '<circle cx="222" cy="24" r="10" fill="#F97316"/>' +
      '<circle cx="250" cy="24" r="10" fill="#F97316"/>' +
      '<circle cx="278" cy="24" r="10" fill="#F97316"/>' +
      '</svg></div>' +
      'There were 14 counters and 5 are crossed out. How many are left?',
    options:['9','8','10','7'], answer:'9',
    hint:'Count only the counters with no cross on them.',
    explanation:'14 take away 5 leaves <b>9</b>. There are 5 left in the first frame and 4 in the second.' }),

  makeMCQ({ id:'g1mth-sub-081', chapterId:CH_SUB, difficulty:2, subsection:'subtracting_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with a curved hop drawn above it">' +
      '<svg viewBox="0 0 300 76" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="76" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="45" x2="285" y2="45" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="38" x2="15" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="42" y1="38" x2="42" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="69" y1="38" x2="69" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="96" y1="38" x2="96" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="123" y1="38" x2="123" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="150" y1="38" x2="150" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="177" y1="38" x2="177" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="204" y1="38" x2="204" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="231" y1="38" x2="231" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="258" y1="38" x2="258" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="285" y1="38" x2="285" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<text x="15" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<text x="42" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">11</text>' +
      '<text x="69" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">12</text>' +
      '<text x="96" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">13</text>' +
      '<text x="123" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">14</text>' +
      '<text x="150" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">15</text>' +
      '<text x="177" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">16</text>' +
      '<text x="204" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">17</text>' +
      '<text x="231" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">18</text>' +
      '<text x="258" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">19</text>' +
      '<text x="285" y="68" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">20</text>' +
      '<path d="M 231 38 Q 150 4 42 38" fill="none" stroke="#EF4444" stroke-width="3"/>' +
      '<polygon points="35,28 49,28 42,40" fill="#EF4444"/>' +
      '</svg></div>' +
      'Start at 18 and hop back 7. Where do you land?',
    options:['11','12','10','13'], answer:'11',
    hint:'Hop back to 10 first, then keep going.',
    explanation:'18 back to 11 is 7 steps, so 18 - 7 = <b>11</b>.' }),

  makeMCQ({ id:'g1mth-sub-082', chapterId:CH_SUB, difficulty:2, subsection:'subtracting_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a shelf of cups with a box standing in front of part of the shelf">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<text x="150" y="20" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">12 cups in all</text>' +
      '<path d="M 18 34 L 24 68 L 48 68 L 54 34 Z" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<path d="M 66 34 L 72 68 L 96 68 L 102 34 Z" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<path d="M 114 34 L 120 68 L 144 68 L 150 34 Z" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<path d="M 162 34 L 168 68 L 192 68 L 198 34 Z" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<path d="M 210 34 L 216 68 L 240 68 L 246 34 Z" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="256" y="30" width="36" height="42" rx="4" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<text x="274" y="58" text-anchor="middle" font-size="20" fill="#ffffff" font-family="system-ui, sans-serif">?</text>' +
      '<line x1="10" y1="72" x2="292" y2="72" stroke="#111827" stroke-width="3"/>' +
      '</svg></div>' +
      'There are 12 cups in all. How many are hidden behind the box?',
    options:['7','6','8','9'], answer:'7',
    hint:'Count the cups you can see, then work out how many are missing from 12.',
    explanation:'You can see 5 cups, and 12 take away 5 leaves <b>7</b> hidden.' }),

  makeMCQ({ id:'g1mth-sub-083', chapterId:CH_SUB, difficulty:2, subsection:'subtracting_within_20',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two rows of shapes lined up one under the other">' +
      '<svg viewBox="0 0 300 100" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="100" rx="8" fill="#ffffff"/>' +
      '<rect x="12" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="32" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="52" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="72" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="92" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="112" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="132" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="152" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="172" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="192" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="212" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="232" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="252" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="272" y="18" width="16" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="20" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="40" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="60" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="80" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="100" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="120" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="140" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="160" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="180" cy="70" r="8" fill="#A855F7" stroke="#111827" stroke-width="1.5"/>' +
      '</svg></div>' +
      'How many more squares are there than circles?',
    options:['5','4','6','3'], answer:'5',
    hint:'Match each circle to the square above it, then count the squares with no partner.',
    explanation:'There are 14 squares and 9 circles. 14 take away 9 leaves <b>5</b> extra squares.' }),

  makeMCQ({ id:'g1mth-sub-084', chapterId:CH_SUB, difficulty:1, subsection:'missing_numbers',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number sentence with one empty box">' +
      '<svg viewBox="0 0 280 70" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="70" rx="8" fill="#ffffff"/>' +
      '<text x="40" y="47" text-anchor="middle" font-size="28" fill="#1f2937" font-family="system-ui, sans-serif">13</text>' +
      '<text x="80" y="45" text-anchor="middle" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">-</text>' +
      '<rect x="104" y="14" width="42" height="42" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="125" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '<text x="172" y="45" text-anchor="middle" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">=</text>' +
      '<text x="222" y="47" text-anchor="middle" font-size="28" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '</svg></div>' +
      'What number goes in the box?',
    options:['3','2','4','5'], answer:'3',
    hint:'Count back from 13 until you reach 10.',
    explanation:'13 back to 10 is 3 steps, so the box holds <b>3</b>.' }),

  makeMCQ({ id:'g1mth-sub-085', chapterId:CH_SUB, difficulty:2, subsection:'missing_numbers',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bar model with the whole bar left blank and both parts shown">' +
      '<svg viewBox="0 0 240 110" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="12" width="200" height="36" rx="5" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="38" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '<rect x="20" y="60" width="80" height="36" rx="5" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="60" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '<rect x="100" y="60" width="120" height="36" rx="5" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="160" y="85" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '</svg></div>' +
      'The two parts are 4 and 6. What is the whole?',
    options:['10','9','11','8'], answer:'10',
    hint:'Put the two parts together to find the whole bar.',
    explanation:'4 and 6 make <b>10</b>, so the long bar is 10. That also tells you 10 - 4 = 6.' }),

  makeMCQ({ id:'g1mth-sub-086', chapterId:CH_SUB, difficulty:2, subsection:'missing_numbers',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a number line with a curved hop marked with a question mark">' +
      '<svg viewBox="0 0 300 76" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="76" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="52" x2="285" y2="52" stroke="#111827" stroke-width="2"/>' +
      '<line x1="15" y1="45" x2="15" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="42" y1="45" x2="42" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="69" y1="45" x2="69" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="96" y1="45" x2="96" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="123" y1="45" x2="123" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="150" y1="45" x2="150" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="177" y1="45" x2="177" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="204" y1="45" x2="204" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="231" y1="45" x2="231" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="258" y1="45" x2="258" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<line x1="285" y1="45" x2="285" y2="59" stroke="#111827" stroke-width="2"/>' +
      '<text x="15" y="72" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">0</text>' +
      '<text x="96" y="72" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '<text x="231" y="72" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '<text x="285" y="72" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<path d="M 231 45 Q 164 12 96 45" fill="none" stroke="#EF4444" stroke-width="3"/>' +
      '<polygon points="89,35 103,35 96,47" fill="#EF4444"/>' +
      '<text x="164" y="20" text-anchor="middle" font-size="16" fill="#EF4444" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'The arrow hops back from 8 to 3. How big was the hop?',
    options:['5','4','6','7'], answer:'5',
    hint:'Count the single steps from 8 down to 3.',
    explanation:'7, 6, 5, 4, 3 is 5 steps, so the hop was <b>5</b>. That is 8 - 5 = 3.' }),

  makeMCQ({ id:'g1mth-sub-087', chapterId:CH_SUB, difficulty:2, subsection:'missing_numbers',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a balance with counters on the left pan and counters plus a closed bag on the right pan">' +
      '<svg viewBox="0 0 280 130" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="130" rx="8" fill="#ffffff"/>' +
      '<line x1="20" y1="70" x2="260" y2="70" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="140,70 126,116 154,116" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="30" y1="116" x2="250" y2="116" stroke="#111827" stroke-width="3"/>' +
      '<circle cx="30" cy="56" r="8" fill="#3B82F6"/>' +
      '<circle cx="50" cy="56" r="8" fill="#3B82F6"/>' +
      '<circle cx="70" cy="56" r="8" fill="#3B82F6"/>' +
      '<circle cx="90" cy="56" r="8" fill="#3B82F6"/>' +
      '<circle cx="110" cy="56" r="8" fill="#3B82F6"/>' +
      '<circle cx="40" cy="36" r="8" fill="#3B82F6"/>' +
      '<circle cx="60" cy="36" r="8" fill="#3B82F6"/>' +
      '<circle cx="80" cy="36" r="8" fill="#3B82F6"/>' +
      '<circle cx="100" cy="36" r="8" fill="#3B82F6"/>' +
      '<circle cx="170" cy="56" r="8" fill="#F97316"/>' +
      '<circle cx="190" cy="56" r="8" fill="#F97316"/>' +
      '<circle cx="210" cy="56" r="8" fill="#F97316"/>' +
      '<circle cx="230" cy="56" r="8" fill="#F97316"/>' +
      '<path d="M 180 40 L 190 20 L 214 20 L 224 40 Z" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<text x="202" y="36" text-anchor="middle" font-size="14" fill="#ffffff" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'The two sides balance. How many counters are inside the bag?',
    options:['5','6','4','7'], answer:'5',
    hint:'Count both sides. The bag must make up the difference.',
    explanation:'The left side has 9 counters. The right side shows only 4, so the bag holds <b>5</b>: 9 - 4 = 5.' })

);

// ── Shapes and Space ──────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-shp-093', chapterId:CH_SHP, difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a small house drawn from two flat shapes">' +
      '<svg viewBox="0 0 160 140" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="140" rx="8" fill="#ffffff"/>' +
      '<polygon points="80,15 150,65 10,65" fill="#EF4444" stroke="#111827" stroke-width="2.5"/>' +
      '<rect x="30" y="65" width="100" height="65" fill="#FACC15" stroke="#111827" stroke-width="2.5"/>' +
      '</svg></div>' +
      'Which two shapes make this house?',
    options:['square and triangle','circle and square','two triangles','two rectangles'], answer:'square and triangle',
    hint:'Look at the roof, then look at the wall below it.',
    explanation:'The wall is a <b>square</b> and the roof is a <b>triangle</b>. Together they make a house.' }),

  makeMCQ({ id:'g1mth-shp-094', chapterId:CH_SHP, difficulty:1, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four flat shapes in a row, each with a letter under it">' +
      '<svg viewBox="0 0 290 110" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="12" y="20" width="56" height="42" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<text x="40" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="92" y="18" width="46" height="46" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<text x="115" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<polygon points="190,16 214,64 166,64" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<text x="190" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '<rect x="240" y="24" width="40" height="36" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<text x="260" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">D</text>' +
      '</svg></div>' +
      'Which shape does NOT have four sides?',
    options:['C','A','B','D'], answer:'C',
    hint:'Count the sides of each shape one by one.',
    explanation:'Shape <b>C</b> has only 3 sides — it is a triangle. The other three all have 4 sides.' }),

  makeMCQ({ id:'g1mth-shp-095', chapterId:CH_SHP, difficulty:2, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of mixed flat shapes">' +
      '<svg viewBox="0 0 300 90" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="90" rx="8" fill="#ffffff"/>' +
      '<polygon points="30,18 52,64 8,64" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="90" cy="44" r="22" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="145,18 167,64 123,64" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="185" y="22" width="44" height="44" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="270,18 292,64 248,64" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'How many triangles are in the picture?',
    options:['3','2','4','5'], answer:'3',
    hint:'A triangle has 3 straight sides. Point at each one as you count.',
    explanation:'There are <b>3</b> triangles. The other two shapes are a circle and a square.' }),

  makeMCQ({ id:'g1mth-shp-096', chapterId:CH_SHP, difficulty:2, subsection:'2d_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four flat shapes in a row, each with a letter under it">' +
      '<svg viewBox="0 0 290 110" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="40" cy="42" r="24" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<text x="40" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="94" y="20" width="44" height="44" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<text x="116" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="164" y="28" width="62" height="30" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<text x="195" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '<polygon points="262,18 284,64 240,64" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<text x="262" y="92" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">D</text>' +
      '</svg></div>' +
      'Which shape has four sides that are all the same length?',
    options:['B','A','C','D'], answer:'B',
    hint:'A shape with 4 equal sides looks the same however you turn it.',
    explanation:'Shape <b>B</b> is a square, so all 4 of its sides are equal. Shape C is a rectangle with 2 long and 2 short sides.' }),

  makeMCQ({ id:'g1mth-shp-097', chapterId:CH_SHP, difficulty:2, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a flat shape with a dot marking each corner">' +
      '<svg viewBox="0 0 100 100" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="100" height="100" rx="8" fill="#ffffff"/>' +
      '<polygon points="50,10 90,39 75,86 25,86 10,39" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2.5"/>' +
      '<circle cx="50" cy="10" r="5" fill="#EF4444"/>' +
      '<circle cx="90" cy="39" r="5" fill="#EF4444"/>' +
      '<circle cx="75" cy="86" r="5" fill="#EF4444"/>' +
      '<circle cx="25" cy="86" r="5" fill="#EF4444"/>' +
      '<circle cx="10" cy="39" r="5" fill="#EF4444"/>' +
      '</svg></div>' +
      'A red dot sits on every corner. How many corners does this shape have?',
    options:['5','4','6','3'], answer:'5',
    hint:'Count the red dots, going round in one direction so you do not miss one.',
    explanation:'There are <b>5</b> red dots, so the shape has 5 corners. A five-sided shape is called a pentagon.' }),

  makeMCQ({ id:'g1mth-shp-098', chapterId:CH_SHP, difficulty:1, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two flat shapes, each with a letter under it">' +
      '<svg viewBox="0 0 220 110" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="110" rx="8" fill="#ffffff"/>' +
      '<polygon points="55,16 88,66 22,66" fill="#F97316" stroke="#111827" stroke-width="2.5"/>' +
      '<text x="55" y="94" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="130" y="26" width="70" height="40" fill="#3B82F6" stroke="#111827" stroke-width="2.5"/>' +
      '<text x="165" y="94" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Which shape has more sides?',
    options:['Shape B','Shape A','the same','neither one'], answer:'Shape B',
    hint:'Count the straight edges of each shape.',
    explanation:'Shape A has 3 sides and <b>Shape B has 4</b>, so Shape B has more sides.' }),

  makeMCQ({ id:'g1mth-shp-099', chapterId:CH_SHP, difficulty:1, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a round flat shape with a dotted line following its edge">' +
      '<svg viewBox="0 0 110 110" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="110" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="55" cy="55" r="42" fill="#FDE68A" stroke="#111827" stroke-width="2.5"/>' +
      '<circle cx="55" cy="55" r="32" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="6 5"/>' +
      '</svg></div>' +
      'How many corners does this shape have?',
    options:['0','1','2','4'], answer:'0',
    hint:'A corner is where two straight sides meet. Can you find one?',
    explanation:'A circle has <b>0</b> corners. Its edge is one smooth curve with no straight sides at all.' }),

  makeMCQ({ id:'g1mth-shp-100', chapterId:CH_SHP, difficulty:2, subsection:'properties_shapes',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a four-sided shape with two of its edges drawn thicker">' +
      '<svg viewBox="0 0 180 110" style="width:100%;max-width:200px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="30" width="140" height="50" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<line x1="20" y1="30" x2="160" y2="30" stroke="#F97316" stroke-width="6" stroke-linecap="round"/>' +
      '<line x1="20" y1="80" x2="160" y2="80" stroke="#F97316" stroke-width="6" stroke-linecap="round"/>' +
      '</svg></div>' +
      'The orange edges are the long sides. How many long sides does this rectangle have?',
    options:['2','4','1','3'], answer:'2',
    hint:'Count only the thick orange edges.',
    explanation:'A rectangle has <b>2</b> long sides and 2 short sides, so 4 sides in all.' }),

  makeMCQ({ id:'g1mth-shp-101', chapterId:CH_SHP, difficulty:1, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a diagram showing where a round object sits in relation to an open box">' +
      '<svg viewBox="0 0 140 120" style="width:100%;max-width:150px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="140" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="25" width="100" height="80" fill="#EDE9FE" stroke="#7C3AED" stroke-width="3" rx="4"/>' +
      '<circle cx="70" cy="66" r="24" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Where is the ball?',
    options:['inside the box','above the box','below the box','beside the box'], answer:'inside the box',
    hint:'Are the walls of the box around the ball, or is the ball outside them?',
    explanation:'The ball is <b>inside the box</b> — the sides of the box go all the way around it.' }),

  makeMCQ({ id:'g1mth-shp-102', chapterId:CH_SHP, difficulty:2, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four objects standing in a row, each with a letter under it">' +
      '<svg viewBox="0 0 280 110" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="24" width="40" height="46" rx="4" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<text x="40" y="94" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<circle cx="105" cy="47" r="23" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<text x="105" y="94" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<polygon points="175,22 199,70 151,70" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<text x="175" y="94" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '<rect x="220" y="26" width="42" height="42" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<text x="241" y="94" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">D</text>' +
      '</svg></div>' +
      'Which object is between B and D?',
    options:['C','A','B','D'], answer:'C',
    hint:'Between means it has B on one side and D on the other.',
    explanation:'Object <b>C</b> sits right between B and D in the row.' }),

  makeMCQ({ id:'g1mth-shp-103', chapterId:CH_SHP, difficulty:1, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a table with a cup drawn near it">' +
      '<svg viewBox="0 0 180 130" style="width:100%;max-width:190px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="180" height="130" rx="8" fill="#ffffff"/>' +
      '<path d="M 72 22 L 78 58 L 106 58 L 112 22 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="20" y="60" width="140" height="12" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="30" y="72" width="12" height="46" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="138" y="72" width="12" height="46" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Where is the cup?',
    options:['on the table','under the table','next to the table','far from the table'], answer:'on the table',
    hint:'Is the cup resting above the flat top, or hiding beneath it?',
    explanation:'The cup sits <b>on the table</b> — it rests on the flat top.' }),

  makeMCQ({ id:'g1mth-shp-104', chapterId:CH_SHP, difficulty:1, subsection:'position_direction',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a road sign with an arrow on it">' +
      '<svg viewBox="0 0 170 110" style="width:100%;max-width:180px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="170" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="15" y="18" width="140" height="74" rx="8" fill="#DBEAFE" stroke="#111827" stroke-width="2.5"/>' +
      '<polygon points="35,55 70,30 70,45 135,45 135,65 70,65 70,80" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which way is the arrow pointing?',
    options:['left','right','up','down'], answer:'left',
    hint:'Follow the arrow to its pointed tip.',
    explanation:'The pointed tip is on the side where your <b>left</b> hand is, so the arrow points left.' })

);

// ── Measurement ───────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-msr-076', chapterId:CH_MSR, difficulty:1, subsection:'comparing_length',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two pencils lined up against the same starting line">' +
      '<svg viewBox="0 0 260 110" style="width:100%;max-width:290px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="110" rx="8" fill="#ffffff"/>' +
      '<line x1="24" y1="12" x2="24" y2="100" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<rect x="24" y="28" width="180" height="16" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '<polygon points="204,28 228,36 204,44" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="12" y="41" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="24" y="70" width="110" height="16" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<polygon points="134,70 158,78 134,86" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="12" y="83" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Both pencils start at the dotted line. Which pencil is longer?',
    options:['Pencil A','Pencil B','same length','neither one'], answer:'Pencil A',
    hint:'They start together, so look at which one finishes further along.',
    explanation:'<b>Pencil A</b> reaches further than Pencil B, so Pencil A is longer.' }),

  makeMCQ({ id:'g1mth-msr-077', chapterId:CH_MSR, difficulty:1, subsection:'comparing_length',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three ribbons lined up against the same starting line">' +
      '<svg viewBox="0 0 260 130" style="width:100%;max-width:290px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="130" rx="8" fill="#ffffff"/>' +
      '<line x1="26" y1="10" x2="26" y2="120" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<rect x="26" y="22" width="130" height="14" rx="4" fill="#EC4899" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="13" y="34" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="26" y="60" width="205" height="14" rx="4" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="13" y="72" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="26" y="98" width="62" height="14" rx="4" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="13" y="110" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '</svg></div>' +
      'Which ribbon is the shortest?',
    options:['Ribbon C','Ribbon A','Ribbon B','all equal'], answer:'Ribbon C',
    hint:'The shortest one stops first.',
    explanation:'<b>Ribbon C</b> stops first, so it is the shortest. Ribbon B goes furthest, so it is the longest.' }),

  makeMCQ({ id:'g1mth-msr-078', chapterId:CH_MSR, difficulty:2, subsection:'comparing_length',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a pencil above a row of equal blocks used as units">' +
      '<svg viewBox="0 0 260 110" style="width:100%;max-width:290px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="24" width="180" height="18" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '<polygon points="200,24 224,33 200,42" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="20" y="62" width="36" height="24" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="56" y="62" width="36" height="24" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="92" y="62" width="36" height="24" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="128" y="62" width="36" height="24" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="164" y="62" width="36" height="24" fill="#9CA3AF" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="130" y="102" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">grey blocks are all the same size</text>' +
      '</svg></div>' +
      'How many grey blocks long is the pencil?',
    options:['5','4','6','7'], answer:'5',
    hint:'Count the blocks that fit under the pencil, from one end to the other.',
    explanation:'Exactly <b>5</b> blocks fit along the pencil, so the pencil is 5 blocks long.' }),

  makeMCQ({ id:'g1mth-msr-079', chapterId:CH_MSR, difficulty:2, subsection:'comparing_length',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three sticks lined up against the same starting line">' +
      '<svg viewBox="0 0 260 130" style="width:100%;max-width:290px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="130" rx="8" fill="#ffffff"/>' +
      '<line x1="26" y1="10" x2="26" y2="120" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<rect x="26" y="22" width="124" height="14" rx="4" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="13" y="34" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="26" y="60" width="205" height="14" rx="4" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="13" y="72" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="26" y="98" width="64" height="14" rx="4" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="13" y="110" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '</svg></div>' +
      'Which order goes from shortest to longest?',
    options:['C, A, B','A, B, C','B, A, C','A, C, B'], answer:'C, A, B',
    hint:'Find the shortest stick first, then the middle one.',
    explanation:'C is shortest, A is in the middle and B is longest, so the order is <b>C, A, B</b>.' }),

  makeMCQ({ id:'g1mth-msr-080', chapterId:CH_MSR, difficulty:1, subsection:'comparing_mass',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a balance beam that is tilted, with a labelled box on each side">' +
      '<svg viewBox="0 0 280 160" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="160" rx="8" fill="#ffffff"/>' +
      '<line x1="30" y1="120" x2="250" y2="80" stroke="#111827" stroke-width="5" stroke-linecap="round"/>' +
      '<polygon points="140,100 118,150 162,150" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="90" y1="150" x2="190" y2="150" stroke="#111827" stroke-width="3"/>' +
      '<rect x="10" y="86" width="44" height="34" fill="#3B82F6" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="32" y="110" text-anchor="middle" font-size="18" fill="#ffffff" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="228" y="46" width="44" height="34" fill="#F97316" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="250" y="70" text-anchor="middle" font-size="18" fill="#ffffff" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Which box is heavier?',
    options:['Box A','Box B','same mass','neither one'], answer:'Box A',
    hint:'The heavier side always pushes its end of the beam down.',
    explanation:'The beam tips down on the side of <b>Box A</b>, so Box A is heavier.' }),

  makeMCQ({ id:'g1mth-msr-081', chapterId:CH_MSR, difficulty:2, subsection:'comparing_mass',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a level balance with a bag on one side and small blocks on the other">' +
      '<svg viewBox="0 0 280 150" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="150" rx="8" fill="#ffffff"/>' +
      '<path d="M 50 52 L 42 96 L 108 96 L 100 52 Z" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="182" y="30" width="46" height="20" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="182" y="52" width="46" height="20" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="182" y="74" width="46" height="20" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="20" y1="96" x2="260" y2="96" stroke="#111827" stroke-width="5" stroke-linecap="round"/>' +
      '<polygon points="140,96 118,140 162,140" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="90" y1="140" x2="190" y2="140" stroke="#111827" stroke-width="3"/>' +
      '</svg></div>' +
      'The beam is level. How many blocks balance the bag?',
    options:['3','2','4','5'], answer:'3',
    hint:'Count the blocks stacked on the other side.',
    explanation:'The beam is level with <b>3</b> blocks, so the bag has the same mass as 3 blocks.' }),

  makeMCQ({ id:'g1mth-msr-082', chapterId:CH_MSR, difficulty:1, subsection:'comparing_mass',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a balance beam that is level, with a labelled box on each side">' +
      '<svg viewBox="0 0 280 150" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="150" rx="8" fill="#ffffff"/>' +
      '<rect x="34" y="56" width="52" height="40" fill="#22C55E" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="60" y="84" text-anchor="middle" font-size="18" fill="#ffffff" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="194" y="56" width="52" height="40" fill="#A855F7" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="220" y="84" text-anchor="middle" font-size="18" fill="#ffffff" font-family="system-ui, sans-serif">B</text>' +
      '<line x1="20" y1="96" x2="260" y2="96" stroke="#111827" stroke-width="5" stroke-linecap="round"/>' +
      '<polygon points="140,96 118,140 162,140" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<line x1="90" y1="140" x2="190" y2="140" stroke="#111827" stroke-width="3"/>' +
      '</svg></div>' +
      'The beam stays flat. What does that tell you?',
    options:['same mass','A is heavier','B is heavier','A is lighter'], answer:'same mass',
    hint:'A flat beam means neither side pushes down more.',
    explanation:'A level beam means the two boxes have the <b>same mass</b>. Neither side wins.' }),

  makeMCQ({ id:'g1mth-msr-083', chapterId:CH_MSR, difficulty:2, subsection:'comparing_mass',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two tilted balances comparing three labelled boxes">' +
      '<svg viewBox="0 0 300 140" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="140" rx="8" fill="#ffffff"/>' +
      '<line x1="15" y1="86" x2="135" y2="56" stroke="#111827" stroke-width="4" stroke-linecap="round"/>' +
      '<polygon points="75,71 60,116 90,116" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="8" y="60" width="30" height="26" fill="#3B82F6" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="23" y="79" text-anchor="middle" font-size="14" fill="#ffffff" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="106" y="30" width="30" height="26" fill="#F97316" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="121" y="49" text-anchor="middle" font-size="14" fill="#ffffff" font-family="system-ui, sans-serif">B</text>' +
      '<line x1="165" y1="86" x2="285" y2="56" stroke="#111827" stroke-width="4" stroke-linecap="round"/>' +
      '<polygon points="225,71 210,116 240,116" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<rect x="158" y="60" width="30" height="26" fill="#F97316" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="173" y="79" text-anchor="middle" font-size="14" fill="#ffffff" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="256" y="30" width="30" height="26" fill="#22C55E" stroke="#111827" stroke-width="2" rx="3"/>' +
      '<text x="271" y="49" text-anchor="middle" font-size="14" fill="#ffffff" font-family="system-ui, sans-serif">C</text>' +
      '<text x="150" y="134" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">two balances</text>' +
      '</svg></div>' +
      'A is heavier than B, and B is heavier than C. Which box is the lightest?',
    options:['Box C','Box B','Box A','all equal'], answer:'Box C',
    hint:'Box C never pushes its side down on either balance.',
    explanation:'B is lighter than A, and C is lighter than B, so <b>Box C</b> is the lightest of the three.' }),

  makeMCQ({ id:'g1mth-msr-084', chapterId:CH_MSR, difficulty:1, subsection:'comparing_capacity',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two jugs of the same size holding water at different levels">' +
      '<svg viewBox="0 0 220 140" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="24" y="70" width="66" height="42" fill="#3B82F6"/>' +
      '<rect x="24" y="20" width="66" height="92" rx="6" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="57" y="132" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="130" y="46" width="66" height="66" fill="#3B82F6"/>' +
      '<rect x="130" y="20" width="66" height="92" rx="6" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="163" y="132" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'The two jugs are the same size. Which one holds more water?',
    options:['Jug B','Jug A','same amount','neither one'], answer:'Jug B',
    hint:'Look at how high the blue water reaches in each jug.',
    explanation:'The water in <b>Jug B</b> reaches higher, so Jug B holds more water.' }),

  makeMCQ({ id:'g1mth-msr-085', chapterId:CH_MSR, difficulty:1, subsection:'comparing_capacity',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three glasses of the same size holding water at different levels">' +
      '<svg viewBox="0 0 260 140" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="52" width="56" height="60" fill="#3B82F6"/>' +
      '<rect x="20" y="20" width="56" height="92" rx="4" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="48" y="132" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="102" y="90" width="56" height="22" fill="#3B82F6"/>' +
      '<rect x="102" y="20" width="56" height="92" rx="4" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="130" y="132" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="184" y="34" width="56" height="78" fill="#3B82F6"/>' +
      '<rect x="184" y="20" width="56" height="92" rx="4" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="212" y="132" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '</svg></div>' +
      'Which glass has the least water?',
    options:['Glass B','Glass A','Glass C','all equal'], answer:'Glass B',
    hint:'Least means the smallest amount, so look for the lowest water line.',
    explanation:'The water line in <b>Glass B</b> is the lowest, so Glass B has the least water.' }),

  makeMCQ({ id:'g1mth-msr-086', chapterId:CH_MSR, difficulty:2, subsection:'comparing_capacity',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a jug beside a group of small cups with an equals sign between them">' +
      '<svg viewBox="0 0 280 120" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="26" width="60" height="70" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="3"/>' +
      '<path d="M 80 44 L 94 52 L 80 62" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="112" y="70" text-anchor="middle" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">=</text>' +
      '<path d="M 140 42 L 145 76 L 169 76 L 174 42 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M 184 42 L 189 76 L 213 76 L 218 42 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M 140 80 L 145 114 L 169 114 L 174 80 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<path d="M 184 80 L 189 114 L 213 114 L 218 80 Z" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'The water in the jug fills exactly these cups. How many cups fill the jug?',
    options:['4','3','5','6'], answer:'4',
    hint:'Count the cups drawn on the other side of the equals sign.',
    explanation:'There are <b>4</b> cups, so the jug holds the same amount as 4 cups.' }),

  makeMCQ({ id:'g1mth-msr-087', chapterId:CH_MSR, difficulty:1, subsection:'comparing_capacity',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled containers, one holding water and one holding none">' +
      '<svg viewBox="0 0 220 140" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="24" y="24" width="66" height="88" fill="#3B82F6"/>' +
      '<rect x="24" y="20" width="66" height="92" rx="6" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="57" y="132" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="130" y="20" width="66" height="92" rx="6" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="163" y="132" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Which word describes container B?',
    options:['empty','full','heavy','light'], answer:'empty',
    hint:'Is there any water inside container B at all?',
    explanation:'Container B has no water in it, so it is <b>empty</b>. Container A is full.' })

);

// ── Patterns ──────────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-pat-076', chapterId:CH_PAT, difficulty:1, subsection:'repeating_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of coloured squares ending with an empty square">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="14" y="14" width="42" height="42" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="70" y="14" width="42" height="42" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="126" y="14" width="42" height="42" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="182" y="14" width="42" height="42" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="238" y="14" width="42" height="42" fill="#ffffff" stroke="#111827" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="259" y="44" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'Which colour comes next in the pattern?',
    options:['red','blue','green','yellow'], answer:'red',
    hint:'Say the colours out loud from the start and keep the rhythm going.',
    explanation:'The pattern is red, blue, red, blue, so the next square is <b>red</b>.' }),

  makeMCQ({ id:'g1mth-pat-077', chapterId:CH_PAT, difficulty:2, subsection:'repeating_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of flat shapes ending with an empty box">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<polygon points="26,14 44,52 8,52" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="72" cy="34" r="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="118" cy="34" r="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="164,14 182,52 146,52" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="210" cy="34" r="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="256" cy="34" r="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="278" y="16" width="18" height="36" fill="#ffffff" stroke="#111827" stroke-width="2" stroke-dasharray="5 4"/>' +
      '</svg></div>' +
      'Which shape comes next in the pattern?',
    options:['triangle','circle','square','rectangle'], answer:'triangle',
    hint:'The pattern repeats in groups of three. Find where each group starts.',
    explanation:'The group is triangle, circle, circle. Two circles have just finished, so a <b>triangle</b> comes next.' }),

  makeMCQ({ id:'g1mth-pat-078', chapterId:CH_PAT, difficulty:2, subsection:'repeating_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of squares of two different sizes with one space left blank in the middle">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="14" width="42" height="42" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="66" y="26" width="20" height="20" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="104" y="14" width="42" height="42" fill="#ffffff" stroke="#111827" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="125" y="44" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '<rect x="162" y="26" width="20" height="20" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="200" y="14" width="42" height="42" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="256" y="26" width="20" height="20" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'What belongs in the empty space?',
    options:['a big square','a small square','a big circle','a small circle'], answer:'a big square',
    hint:'The pattern goes big, small, big, small. Which one is missing?',
    explanation:'A small square comes before the gap and a small square comes after it, so the gap needs <b>a big square</b>.' }),

  makeMCQ({ id:'g1mth-pat-079', chapterId:CH_PAT, difficulty:2, subsection:'repeating_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a long row of two flat shapes taking turns">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<circle cx="28" cy="35" r="18" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="60" y="17" width="36" height="36" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="128" cy="35" r="18" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="160" y="17" width="36" height="36" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="228" cy="35" r="18" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="260" y="17" width="36" height="36" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which small group repeats over and over?',
    options:['circle, square','square, square','circle, circle','circle, triangle'], answer:'circle, square',
    hint:'Find the smallest part you can copy again and again to build the whole row.',
    explanation:'The row is built by repeating <b>circle, square</b> three times.' }),

  makeMCQ({ id:'g1mth-pat-080', chapterId:CH_PAT, difficulty:1, subsection:'number_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of number cards ending with a blank card">' +
      '<svg viewBox="0 0 290 70" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="12" y="14" width="46" height="44" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="35" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">2</text>' +
      '<rect x="68" y="14" width="46" height="44" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="91" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '<rect x="124" y="14" width="46" height="44" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="147" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '<rect x="180" y="14" width="46" height="44" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="203" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '<rect x="236" y="14" width="46" height="44" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="259" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'Which number goes on the last card?',
    options:['10','9','11','12'], answer:'10',
    hint:'How much bigger is each card than the one before it?',
    explanation:'The numbers go up by 2 each time, so after 8 comes <b>10</b>.' }),

  makeMCQ({ id:'g1mth-pat-081', chapterId:CH_PAT, difficulty:2, subsection:'number_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="steps rising to the right with a number on each step and the last one blank">' +
      '<svg viewBox="0 0 280 130" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="14" y="92" width="60" height="26" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="44" y="112" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">5</text>' +
      '<rect x="80" y="68" width="60" height="50" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="110" y="94" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">10</text>' +
      '<rect x="146" y="44" width="60" height="74" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="176" y="82" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">15</text>' +
      '<rect x="212" y="20" width="60" height="98" fill="#FEF3C7" stroke="#111827" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="242" y="72" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '</svg></div>' +
      'Which number belongs on the tallest step?',
    options:['20','25','18','16'], answer:'20',
    hint:'Count in fives: 5, 10, 15 and then keep going.',
    explanation:'Each step adds 5, so after 15 comes <b>20</b>.' }),

  makeMCQ({ id:'g1mth-pat-082', chapterId:CH_PAT, difficulty:2, subsection:'number_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of number cards with one card in the middle left blank">' +
      '<svg viewBox="0 0 290 70" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="12" y="14" width="46" height="44" rx="6" fill="#FCE7F3" stroke="#111827" stroke-width="2"/>' +
      '<text x="35" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">20</text>' +
      '<rect x="68" y="14" width="46" height="44" rx="6" fill="#FCE7F3" stroke="#111827" stroke-width="2"/>' +
      '<text x="91" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">18</text>' +
      '<rect x="124" y="14" width="46" height="44" rx="6" fill="#FCE7F3" stroke="#111827" stroke-width="2"/>' +
      '<text x="147" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">16</text>' +
      '<rect x="180" y="14" width="46" height="44" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="203" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '<rect x="236" y="14" width="46" height="44" rx="6" fill="#FCE7F3" stroke="#111827" stroke-width="2"/>' +
      '<text x="259" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">12</text>' +
      '</svg></div>' +
      'Which number is missing from the middle of this pattern?',
    options:['14','15','13','11'], answer:'14',
    hint:'This pattern counts backwards. How much does it drop each time?',
    explanation:'The numbers go down by 2 each time: 20, 18, 16, <b>14</b>, 12.' }),

  makeMCQ({ id:'g1mth-pat-083', chapterId:CH_PAT, difficulty:1, subsection:'number_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a counting strip with one number covered by a box">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="20" width="280" height="34" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<line x1="38" y1="20" x2="38" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="66" y1="20" x2="66" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="94" y1="20" x2="94" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="122" y1="20" x2="122" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="150" y1="20" x2="150" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="178" y1="20" x2="178" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="206" y1="20" x2="206" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="234" y1="20" x2="234" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<line x1="262" y1="20" x2="262" y2="54" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="24" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">11</text>' +
      '<text x="52" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">12</text>' +
      '<text x="80" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">13</text>' +
      '<text x="108" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">14</text>' +
      '<text x="136" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">15</text>' +
      '<text x="164" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">16</text>' +
      '<rect x="178" y="20" width="28" height="34" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<text x="220" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">18</text>' +
      '<text x="248" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">19</text>' +
      '<text x="276" y="44" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">20</text>' +
      '</svg></div>' +
      'Which number is under the yellow box?',
    options:['17','16','18','15'], answer:'17',
    hint:'Count on from 16.',
    explanation:'The strip counts 11, 12, 13 and on. Between 16 and 18 comes <b>17</b>.' }),

  makeMCQ({ id:'g1mth-pat-084', chapterId:CH_PAT, difficulty:2, subsection:'odd_even_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="counters arranged in two rows of equal length">' +
      '<svg viewBox="0 0 280 90" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="90" rx="8" fill="#ffffff"/>' +
      '<circle cx="30" cy="28" r="12" fill="#3B82F6"/>' +
      '<circle cx="72" cy="28" r="12" fill="#3B82F6"/>' +
      '<circle cx="114" cy="28" r="12" fill="#3B82F6"/>' +
      '<circle cx="156" cy="28" r="12" fill="#3B82F6"/>' +
      '<circle cx="198" cy="28" r="12" fill="#3B82F6"/>' +
      '<circle cx="240" cy="28" r="12" fill="#3B82F6"/>' +
      '<circle cx="30" cy="66" r="12" fill="#3B82F6"/>' +
      '<circle cx="72" cy="66" r="12" fill="#3B82F6"/>' +
      '<circle cx="114" cy="66" r="12" fill="#3B82F6"/>' +
      '<circle cx="156" cy="66" r="12" fill="#3B82F6"/>' +
      '<circle cx="198" cy="66" r="12" fill="#3B82F6"/>' +
      '<circle cx="240" cy="66" r="12" fill="#3B82F6"/>' +
      '</svg></div>' +
      'These 12 counters make two rows of exactly the same size. Numbers that can do this are called…',
    options:['even numbers','odd numbers','big numbers','half numbers'], answer:'even numbers',
    hint:'Think about whether anything is left over when you split into two equal rows.',
    explanation:'12 splits into two equal rows of 6 with nothing left over, so 12 is one of the <b>even numbers</b>.' }),

  makeMCQ({ id:'g1mth-pat-085', chapterId:CH_PAT, difficulty:1, subsection:'odd_even_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of number cards">' +
      '<svg viewBox="0 0 290 70" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="12" y="14" width="46" height="44" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="35" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">1</text>' +
      '<rect x="68" y="14" width="46" height="44" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="91" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '<rect x="124" y="14" width="46" height="44" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="147" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">5</text>' +
      '<rect x="180" y="14" width="46" height="44" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="203" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">7</text>' +
      '<rect x="236" y="14" width="46" height="44" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="259" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '</svg></div>' +
      'What are the numbers on these cards called?',
    options:['odd numbers','even numbers','tens numbers','pair numbers'], answer:'odd numbers',
    hint:'Try to split each one into two equal groups. Does one always stay alone?',
    explanation:'1, 3, 5, 7 and 9 always leave one left over when you make pairs, so they are <b>odd numbers</b>.' }),

  makeMCQ({ id:'g1mth-pat-086', chapterId:CH_PAT, difficulty:2, subsection:'odd_even_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="counters grouped into rings of two with one counter outside the rings">' +
      '<svg viewBox="0 0 300 100" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="100" rx="8" fill="#ffffff"/>' +
      '<rect x="12" y="12" width="62" height="36" rx="18" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="31" cy="30" r="10" fill="#EC4899"/>' +
      '<circle cx="55" cy="30" r="10" fill="#EC4899"/>' +
      '<rect x="88" y="12" width="62" height="36" rx="18" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="107" cy="30" r="10" fill="#EC4899"/>' +
      '<circle cx="131" cy="30" r="10" fill="#EC4899"/>' +
      '<rect x="164" y="12" width="62" height="36" rx="18" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="183" cy="30" r="10" fill="#EC4899"/>' +
      '<circle cx="207" cy="30" r="10" fill="#EC4899"/>' +
      '<rect x="12" y="58" width="62" height="36" rx="18" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="31" cy="76" r="10" fill="#EC4899"/>' +
      '<circle cx="55" cy="76" r="10" fill="#EC4899"/>' +
      '<circle cx="107" cy="76" r="10" fill="#EC4899"/>' +
      '</svg></div>' +
      'Nine counters are pairing up. Does every counter find a partner?',
    options:['no, 1 is left','yes, all paired','no, 2 are left','yes, 9 pairs'], answer:'no, 1 is left',
    hint:'Look for the counter with no ring drawn around it.',
    explanation:'Four pairs use 8 counters and <b>1 is left alone</b>. That is what makes 9 an odd number.' }),

  makeMCQ({ id:'g1mth-pat-087', chapterId:CH_PAT, difficulty:2, subsection:'odd_even_patterns',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four number cards in a row">' +
      '<svg viewBox="0 0 240 70" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="12" y="14" width="46" height="44" rx="6" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="35" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">2</text>' +
      '<rect x="68" y="14" width="46" height="44" rx="6" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="91" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">4</text>' +
      '<rect x="124" y="14" width="46" height="44" rx="6" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="147" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">7</text>' +
      '<rect x="180" y="14" width="46" height="44" rx="6" fill="#DCFCE7" stroke="#111827" stroke-width="2"/>' +
      '<text x="203" y="45" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">8</text>' +
      '</svg></div>' +
      'Three of these numbers are even. Which one does not belong?',
    options:['7','2','4','8'], answer:'7',
    hint:'Try to make pairs with each number. Which one leaves a counter alone?',
    explanation:'2, 4 and 8 all split into equal pairs, but <b>7</b> leaves one over, so 7 is odd.' })

);

// ── Time and Daily Routines ───────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-tim-061', chapterId:CH_TIM, difficulty:1, subsection:'day_night',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a sky picture with one bright round object high above a house">' +
      '<svg viewBox="0 0 200 140" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="6" y="6" width="188" height="92" rx="6" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<circle cx="150" cy="36" r="20" fill="#FACC15" stroke="#F97316" stroke-width="2"/>' +
      '<line x1="150" y1="6" x2="150" y2="12" stroke="#F97316" stroke-width="3"/>' +
      '<line x1="120" y1="36" x2="126" y2="36" stroke="#F97316" stroke-width="3"/>' +
      '<line x1="174" y1="36" x2="180" y2="36" stroke="#F97316" stroke-width="3"/>' +
      '<line x1="129" y1="15" x2="133" y2="19" stroke="#F97316" stroke-width="3"/>' +
      '<line x1="171" y1="15" x2="167" y2="19" stroke="#F97316" stroke-width="3"/>' +
      '<polygon points="55,42 95,70 15,70" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="28" y="70" width="54" height="28" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<rect x="6" y="98" width="188" height="36" rx="6" fill="#DCFCE7" stroke="#22C55E" stroke-width="2"/>' +
      '</svg></div>' +
      'When do we see this bright sky?',
    options:['day','night','week','month'], answer:'day',
    hint:'Think about what is shining in the sky above the house.',
    explanation:'The sun is shining, so this is the <b>day</b>. Week and month are much longer than one sky.' }),

  makeMCQ({ id:'g1mth-tim-062', chapterId:CH_TIM, difficulty:1, subsection:'day_night',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a dark sky picture with a curved shape and small twinkling points">' +
      '<svg viewBox="0 0 200 130" style="width:100%;max-width:210px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="6" y="6" width="188" height="118" rx="6" fill="#111827"/>' +
      '<path d="M 150 22 A 26 26 0 1 0 150 74 A 20 20 0 1 1 150 22 Z" fill="#FACC15"/>' +
      '<circle cx="40" cy="30" r="3" fill="#ffffff"/>' +
      '<circle cx="70" cy="52" r="3" fill="#ffffff"/>' +
      '<circle cx="34" cy="76" r="3" fill="#ffffff"/>' +
      '<circle cx="86" cy="24" r="3" fill="#ffffff"/>' +
      '<circle cx="60" cy="98" r="3" fill="#ffffff"/>' +
      '<circle cx="110" cy="70" r="3" fill="#ffffff"/>' +
      '<circle cx="120" cy="106" r="3" fill="#ffffff"/>' +
      '</svg></div>' +
      'When do we see a sky like this?',
    options:['at night','in the day','at noon','at sunrise'], answer:'at night',
    hint:'Is the sky bright or dark, and what is shining in it?',
    explanation:'The sky is dark with the moon and stars, so this is <b>at night</b>.' }),

  makeMCQ({ id:'g1mth-tim-063', chapterId:CH_TIM, difficulty:1, subsection:'day_night',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a bed drawn beside a window with a dark sky outside">' +
      '<svg viewBox="0 0 220 130" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="140" y="14" width="66" height="56" fill="#111827" stroke="#92400E" stroke-width="4"/>' +
      '<path d="M 186 26 A 14 14 0 1 0 186 54 A 11 11 0 1 1 186 26 Z" fill="#FACC15"/>' +
      '<rect x="14" y="58" width="26" height="52" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="40" y="82" width="92" height="28" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="46" y="70" width="34" height="14" rx="6" fill="#ffffff" stroke="#111827" stroke-width="2"/>' +
      '<rect x="126" y="72" width="14" height="38" fill="#92400E" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Most children sleep at ___.',
    options:['night','noon','dawn','lunch'], answer:'night',
    hint:'Look through the window. Is it light or dark outside?',
    explanation:'The sky through the window is dark, so it is <b>night</b> — that is when we sleep.' }),

  makeMCQ({ id:'g1mth-tim-064', chapterId:CH_TIM, difficulty:1, subsection:'day_night',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled sky panels, one light and one dark">' +
      '<svg viewBox="0 0 260 120" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="110" height="76" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="65" cy="46" r="20" fill="#FACC15" stroke="#F97316" stroke-width="2"/>' +
      '<text x="65" y="110" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="140" y="10" width="110" height="76" rx="6" fill="#111827" stroke="#111827" stroke-width="2"/>' +
      '<path d="M 202 28 A 18 18 0 1 0 202 64 A 14 14 0 1 1 202 28 Z" fill="#FACC15"/>' +
      '<circle cx="164" cy="32" r="3" fill="#ffffff"/>' +
      '<circle cx="180" cy="60" r="3" fill="#ffffff"/>' +
      '<circle cx="158" cy="70" r="3" fill="#ffffff"/>' +
      '<text x="195" y="110" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Which picture shows night?',
    options:['Picture B','Picture A','both','neither'], answer:'Picture B',
    hint:'Night is dark and has the moon in the sky.',
    explanation:'<b>Picture B</b> is dark with the moon and stars, so it shows night. Picture A shows day.' }),

  makeMCQ({ id:'g1mth-tim-065', chapterId:CH_TIM, difficulty:1, subsection:'morning_evening',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a clock face beside a sky picture with a low round object">' +
      '<svg viewBox="0 0 260 120" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="62" cy="58" r="46" fill="#ffffff" stroke="#111827" stroke-width="3"/>' +
      '<text x="62" y="26" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">12</text>' +
      '<text x="98" y="63" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '<text x="62" y="99" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">6</text>' +
      '<text x="28" y="63" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">9</text>' +
      '<line x1="62" y1="58" x2="62" y2="30" stroke="#111827" stroke-width="3"/>' +
      '<line x1="62" y1="58" x2="38" y2="44" stroke="#111827" stroke-width="4"/>' +
      '<circle cx="62" cy="58" r="4" fill="#111827"/>' +
      '<rect x="130" y="14" width="120" height="70" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<line x1="130" y1="70" x2="250" y2="70" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="190" cy="66" r="18" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<text x="190" y="104" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">7 o clock</text>' +
      '</svg></div>' +
      'The sun has just come up at 7 o clock. Which part of the day is this?',
    options:['morning','afternoon','evening','midnight'], answer:'morning',
    hint:'The sun is low and only just rising above the ground.',
    explanation:'The sun rises at the start of the day, so 7 o clock with a rising sun is the <b>morning</b>.' }),

  makeMCQ({ id:'g1mth-tim-066', chapterId:CH_TIM, difficulty:2, subsection:'morning_evening',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a sky picture with a round object straight above a tree that has a very short shadow">' +
      '<svg viewBox="0 0 220 130" style="width:100%;max-width:230px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="8" width="204" height="90" rx="6" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>' +
      '<circle cx="110" cy="32" r="19" fill="#FACC15" stroke="#F97316" stroke-width="2"/>' +
      '<rect x="104" y="72" width="12" height="26" fill="#92400E" stroke="#111827" stroke-width="1.5"/>' +
      '<circle cx="110" cy="66" r="20" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="110" cy="102" rx="16" ry="5" fill="#9CA3AF"/>' +
      '<rect x="8" y="98" width="204" height="24" rx="6" fill="#DCFCE7" stroke="#22C55E" stroke-width="2"/>' +
      '</svg></div>' +
      'The sun is straight overhead and the shadow is tiny. Which time is it?',
    options:['midday','morning','evening','midnight'], answer:'midday',
    hint:'Shadows are shortest when the sun is highest in the sky.',
    explanation:'The sun is at its highest at <b>midday</b>, right in the middle of the day, so shadows are shortest then.' }),

  makeMCQ({ id:'g1mth-tim-067', chapterId:CH_TIM, difficulty:2, subsection:'morning_evening',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three labelled sky panels showing a round object at three different heights">' +
      '<svg viewBox="0 0 290 120" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="10" width="86" height="76" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<line x1="8" y1="74" x2="94" y2="74" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="51" cy="70" r="15" fill="#F97316" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="51" y="108" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="102" y="10" width="86" height="76" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<line x1="102" y1="74" x2="188" y2="74" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="145" cy="30" r="15" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="145" y="108" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="196" y="10" width="86" height="76" rx="6" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<line x1="196" y1="74" x2="282" y2="74" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="239" cy="70" r="15" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="239" y="108" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '</svg></div>' +
      'In which panel is the sun highest, showing the middle of the day?',
    options:['B','A','C','none'], answer:'B',
    hint:'Look at how far the sun is above the ground line in each panel.',
    explanation:'In panel <b>B</b> the sun is far above the ground, so it is the middle of the day. In A and C it is close to the ground.' }),

  makeMCQ({ id:'g1mth-tim-068', chapterId:CH_TIM, difficulty:1, subsection:'morning_evening',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled sky panels, one with a low round object and one dark">' +
      '<svg viewBox="0 0 260 120" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="10" width="110" height="76" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<line x1="10" y1="72" x2="120" y2="72" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="65" cy="68" r="17" fill="#F97316" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="65" y="110" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="140" y="10" width="110" height="76" rx="6" fill="#111827" stroke="#111827" stroke-width="2"/>' +
      '<path d="M 200 28 A 18 18 0 1 0 200 64 A 14 14 0 1 1 200 28 Z" fill="#FACC15"/>' +
      '<text x="195" y="110" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Panel A shows the sun coming up. Which part of the day is that?',
    options:['morning','evening','midnight','afternoon'], answer:'morning',
    hint:'The day starts when the sun comes up.',
    explanation:'The sun rising means a new day is starting, so panel A shows the <b>morning</b>.' }),

  makeMCQ({ id:'g1mth-tim-069', chapterId:CH_TIM, difficulty:2, subsection:'ordering_events',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three labelled sky panels showing different times of one day">' +
      '<svg viewBox="0 0 290 120" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="120" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="10" width="86" height="76" rx="6" fill="#111827" stroke="#111827" stroke-width="2"/>' +
      '<path d="M 58 26 A 16 16 0 1 0 58 58 A 12 12 0 1 1 58 26 Z" fill="#FACC15"/>' +
      '<circle cx="26" cy="34" r="3" fill="#ffffff"/>' +
      '<circle cx="34" cy="66" r="3" fill="#ffffff"/>' +
      '<text x="51" y="108" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="102" y="10" width="86" height="76" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<line x1="102" y1="72" x2="188" y2="72" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="145" cy="68" r="15" fill="#F97316" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="145" y="108" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="196" y="10" width="86" height="76" rx="6" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<line x1="196" y1="72" x2="282" y2="72" stroke="#92400E" stroke-width="3"/>' +
      '<circle cx="239" cy="30" r="15" fill="#FACC15" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="239" y="108" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '</svg></div>' +
      'Put the three panels in order from early morning to night.',
    options:['B, C, A','A, B, C','C, B, A','A, C, B'], answer:'B, C, A',
    hint:'Start with the sun just coming up, and finish with the dark sky.',
    explanation:'B shows the sun rising, C shows it high at midday, and A is the dark night, so the order is <b>B, C, A</b>.' }),

  makeMCQ({ id:'g1mth-tim-070', chapterId:CH_TIM, difficulty:1, subsection:'ordering_events',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled glasses, one holding liquid and one holding none">' +
      '<svg viewBox="0 0 220 130" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="30" y="18" width="56" height="82" rx="4" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="58" y="122" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="134" y="30" width="52" height="68" fill="#F97316"/>' +
      '<rect x="132" y="18" width="56" height="82" rx="4" fill="none" stroke="#111827" stroke-width="3"/>' +
      '<text x="160" y="122" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'You pour juice into a glass. Which order is right?',
    options:['A then B','B then A','A only','B only'], answer:'A then B',
    hint:'What does the glass look like before you start pouring?',
    explanation:'The glass is empty first (A) and full after you pour (B), so the order is <b>A then B</b>.' }),

  makeMCQ({ id:'g1mth-tim-071', chapterId:CH_TIM, difficulty:2, subsection:'ordering_events',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled candles of different heights, both lit">' +
      '<svg viewBox="0 0 220 140" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="42" y="82" width="30" height="30" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="57" cy="72" rx="7" ry="11" fill="#F97316"/>' +
      '<line x1="20" y1="112" x2="94" y2="112" stroke="#111827" stroke-width="3"/>' +
      '<text x="57" y="132" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="148" y="30" width="30" height="82" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<ellipse cx="163" cy="20" rx="7" ry="11" fill="#F97316"/>' +
      '<line x1="126" y1="112" x2="200" y2="112" stroke="#111827" stroke-width="3"/>' +
      '<text x="163" y="132" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'A burning candle slowly gets shorter. Which picture came first?',
    options:['Picture B','Picture A','both together','neither one'], answer:'Picture B',
    hint:'Which candle still has the most wax left?',
    explanation:'<b>Picture B</b> is the tall candle, so it came first. Picture A is the same candle later, after it burned down.' }),

  makeMCQ({ id:'g1mth-tim-072', chapterId:CH_TIM, difficulty:2, subsection:'ordering_events',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three labelled panels showing a plant at three stages">' +
      '<svg viewBox="0 0 290 130" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="8" y="10" width="86" height="86" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="8" y="76" width="86" height="20" fill="#92400E"/>' +
      '<ellipse cx="51" cy="86" rx="8" ry="6" fill="#111827"/>' +
      '<text x="51" y="118" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="102" y="10" width="86" height="86" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="102" y="76" width="86" height="20" fill="#92400E"/>' +
      '<line x1="145" y1="76" x2="145" y2="30" stroke="#22C55E" stroke-width="4"/>' +
      '<circle cx="145" cy="24" r="12" fill="#EC4899" stroke="#111827" stroke-width="1.5"/>' +
      '<ellipse cx="130" cy="52" rx="11" ry="6" fill="#22C55E"/>' +
      '<text x="145" y="118" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="196" y="10" width="86" height="86" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2"/>' +
      '<rect x="196" y="76" width="86" height="20" fill="#92400E"/>' +
      '<line x1="239" y1="76" x2="239" y2="54" stroke="#22C55E" stroke-width="4"/>' +
      '<ellipse cx="226" cy="56" rx="10" ry="5" fill="#22C55E"/>' +
      '<text x="239" y="118" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '</svg></div>' +
      'Put the plant pictures in order, from first to last.',
    options:['A, C, B','A, B, C','C, A, B','B, C, A'], answer:'A, C, B',
    hint:'A plant starts under the soil and gets taller as it grows.',
    explanation:'The seed (A) comes first, then the small shoot (C), then the tall plant with a flower (B): <b>A, C, B</b>.' })

);

// ── Money ─────────────────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-mon-066', chapterId:CH_MON, difficulty:1, subsection:'coin_names',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a single coin with its value written on it">' +
      '<svg viewBox="0 0 120 120" style="width:100%;max-width:130px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="120" height="120" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="60" r="46" fill="#FACC15" stroke="#92400E" stroke-width="4"/>' +
      '<circle cx="60" cy="60" r="38" fill="none" stroke="#92400E" stroke-width="2"/>' +
      '<text x="60" y="70" text-anchor="middle" font-size="26" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '</svg></div>' +
      'What is this coin worth?',
    options:['Rs 5','Rs 1','Rs 10','Rs 20'], answer:'Rs 5',
    hint:'Read the number printed on the face of the coin.',
    explanation:'The coin says Rs 5, so it is worth <b>Rs 5</b>.' }),

  makeMCQ({ id:'g1mth-mon-067', chapterId:CH_MON, difficulty:1, subsection:'coin_names',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two coins side by side with their values written on them">' +
      '<svg viewBox="0 0 220 110" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="60" cy="55" r="42" fill="#FACC15" stroke="#92400E" stroke-width="4"/>' +
      '<text x="60" y="64" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">Rs 10</text>' +
      '<circle cx="160" cy="55" r="34" fill="#FACC15" stroke="#92400E" stroke-width="4"/>' +
      '<text x="160" y="63" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '</svg></div>' +
      'Which coin is worth more?',
    options:['Rs 10','Rs 1','both same','neither one'], answer:'Rs 10',
    hint:'Compare the two numbers written on the coins.',
    explanation:'10 is bigger than 1, so the <b>Rs 10</b> coin is worth more.' }),

  makeMCQ({ id:'g1mth-mon-068', chapterId:CH_MON, difficulty:2, subsection:'coin_names',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="four coins in a row with their values written on them">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="42" cy="55" r="34" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
      '<text x="42" y="52" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">20</text>' +
      '<text x="42" y="70" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">cents</text>' +
      '<circle cx="120" cy="55" r="34" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="120" y="62" text-anchor="middle" font-size="19" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '<circle cx="198" cy="55" r="34" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="198" y="62" text-anchor="middle" font-size="19" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<circle cx="270" cy="55" r="28" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="270" y="61" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">Rs 10</text>' +
      '</svg></div>' +
      'Which coin is worth the least?',
    options:['20 cents','Rs 1','Rs 5','Rs 10'], answer:'20 cents',
    hint:'Cents are smaller than rupees. It takes 100 cents to make Rs 1.',
    explanation:'<b>20 cents</b> is less than one whole rupee, so it is worth the least of the four coins.' }),

  makeMCQ({ id:'g1mth-mon-069', chapterId:CH_MON, difficulty:2, subsection:'coin_names',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two matching coins with their value written on them">' +
      '<svg viewBox="0 0 220 110" style="width:100%;max-width:240px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="220" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="62" cy="55" r="38" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
      '<text x="62" y="52" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">50</text>' +
      '<text x="62" y="72" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">cents</text>' +
      '<text x="110" y="63" text-anchor="middle" font-size="22" fill="#1f2937" font-family="system-ui, sans-serif">+</text>' +
      '<circle cx="158" cy="55" r="38" fill="#9CA3AF" stroke="#111827" stroke-width="3"/>' +
      '<text x="158" y="52" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">50</text>' +
      '<text x="158" y="72" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">cents</text>' +
      '</svg></div>' +
      'Two 50 cent coins together make how much?',
    options:['Rs 1','Rs 2','Rs 5','50 cents'], answer:'Rs 1',
    hint:'50 and 50 make 100, and 100 cents is one whole rupee.',
    explanation:'50 cents and 50 cents make 100 cents, which is <b>Rs 1</b>.' }),

  makeMCQ({ id:'g1mth-mon-070', chapterId:CH_MON, difficulty:1, subsection:'counting_coins',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three matching coins in a row with their value written on them">' +
      '<svg viewBox="0 0 260 110" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="50" cy="55" r="36" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="50" y="63" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<circle cx="130" cy="55" r="36" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="130" y="63" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<circle cx="210" cy="55" r="36" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="210" y="63" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '</svg></div>' +
      'How much money is shown here?',
    options:['Rs 15','Rs 10','Rs 20','Rs 5'], answer:'Rs 15',
    hint:'Count in fives: 5, 10, then one more five.',
    explanation:'Three Rs 5 coins are 5, 10, 15, so the total is <b>Rs 15</b>.' }),

  makeMCQ({ id:'g1mth-mon-071', chapterId:CH_MON, difficulty:2, subsection:'counting_coins',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three coins of different values in a row">' +
      '<svg viewBox="0 0 260 110" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="50" cy="55" r="38" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="50" y="63" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">Rs 10</text>' +
      '<circle cx="130" cy="55" r="32" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="130" y="62" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<circle cx="205" cy="55" r="26" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="205" y="61" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '</svg></div>' +
      'How much money is there altogether?',
    options:['Rs 16','Rs 15','Rs 11','Rs 20'], answer:'Rs 16',
    hint:'Start with the biggest coin and add the others on.',
    explanation:'Rs 10 and Rs 5 make Rs 15, then Rs 1 more makes <b>Rs 16</b>.' }),

  makeMCQ({ id:'g1mth-mon-072', chapterId:CH_MON, difficulty:2, subsection:'counting_coins',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two labelled purses, each holding two coins">' +
      '<svg viewBox="0 0 280 130" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="14" width="120" height="80" rx="10" fill="#FCE7F3" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="45" cy="54" r="26" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="45" y="60" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<circle cx="97" cy="54" r="26" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="97" y="60" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<text x="70" y="118" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="150" y="14" width="120" height="80" rx="10" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="185" cy="54" r="26" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="185" y="60" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">Rs 10</text>' +
      '<circle cx="237" cy="54" r="26" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="237" y="60" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '<text x="210" y="118" text-anchor="middle" font-size="17" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '</svg></div>' +
      'Which purse holds more money?',
    options:['Purse B','Purse A','both same','neither one'], answer:'Purse B',
    hint:'Add up each purse before you compare them.',
    explanation:'Purse A holds Rs 10 and <b>Purse B holds Rs 11</b>, so Purse B has more even though the coins look similar.' }),

  makeMCQ({ id:'g1mth-mon-073', chapterId:CH_MON, difficulty:2, subsection:'counting_coins',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a jar holding four coins of different values">' +
      '<svg viewBox="0 0 200 140" style="width:100%;max-width:220px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="200" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="24" y="26" width="152" height="100" rx="10" fill="#DBEAFE" stroke="#111827" stroke-width="3"/>' +
      '<rect x="60" y="14" width="80" height="14" rx="4" fill="#9CA3AF" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="66" cy="60" r="26" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="66" y="66" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">Rs 10</text>' +
      '<circle cx="132" cy="60" r="24" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="132" y="66" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<circle cx="66" cy="104" r="20" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="66" y="109" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '<circle cx="132" cy="104" r="20" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="132" y="109" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '</svg></div>' +
      'The jar holds Rs 17. Which single coin must you take out to leave exactly Rs 7?',
    options:['Rs 10','Rs 5','Rs 1','Rs 7'], answer:'Rs 10',
    hint:'Work out what must be removed so that Rs 7 stays behind.',
    explanation:'17 take away 10 leaves 7, so you take out the <b>Rs 10</b> coin. Rs 5 and two Rs 1 coins stay, and 5 + 1 + 1 = 7.' }),

  makeMCQ({ id:'g1mth-mon-074', chapterId:CH_MON, difficulty:2, subsection:'money_sums',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a price label beside three coins">' +
      '<svg viewBox="0 0 280 130" style="width:100%;max-width:300px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="280" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="16" y="22" width="94" height="70" rx="8" fill="#FDE68A" stroke="#111827" stroke-width="2.5"/>' +
      '<text x="63" y="52" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">price</text>' +
      '<text x="63" y="80" text-anchor="middle" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">Rs 7</text>' +
      '<circle cx="160" cy="42" r="26" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="160" y="48" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<circle cx="222" cy="42" r="24" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="222" y="48" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '<circle cx="190" cy="96" r="24" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="190" y="102" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">Rs 1</text>' +
      '</svg></div>' +
      'Can you pay for this with the coins shown?',
    options:['yes, exactly','no, too little','no, too much','not sure yet'], answer:'yes, exactly',
    hint:'Add the three coins first, then compare with the price.',
    explanation:'Rs 5 and Rs 1 and Rs 1 make Rs 7, the exact price, so the answer is <b>yes, exactly</b>.' }),

  makeMCQ({ id:'g1mth-mon-075', chapterId:CH_MON, difficulty:2, subsection:'money_sums',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a price label beside one coin">' +
      '<svg viewBox="0 0 260 110" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="16" y="18" width="110" height="74" rx="8" fill="#DCFCE7" stroke="#111827" stroke-width="2.5"/>' +
      '<text x="71" y="48" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">price</text>' +
      '<text x="71" y="78" text-anchor="middle" font-size="26" fill="#1f2937" font-family="system-ui, sans-serif">Rs 12</text>' +
      '<text x="152" y="62" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">you have</text>' +
      '<circle cx="216" cy="55" r="34" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="216" y="62" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">Rs 10</text>' +
      '</svg></div>' +
      'How much more money do you need?',
    options:['Rs 2','Rs 3','Rs 1','Rs 4'], answer:'Rs 2',
    hint:'Count on from 10 up to 12.',
    explanation:'You need Rs 12 and you have Rs 10, so you need <b>Rs 2</b> more.' }),

  makeMCQ({ id:'g1mth-mon-076', chapterId:CH_MON, difficulty:2, subsection:'money_sums',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a price label beside one coin that is larger than the price">' +
      '<svg viewBox="0 0 260 110" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="16" y="18" width="106" height="74" rx="8" fill="#FCE7F3" stroke="#111827" stroke-width="2.5"/>' +
      '<text x="69" y="48" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">bread</text>' +
      '<text x="69" y="78" text-anchor="middle" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">Rs 6</text>' +
      '<text x="150" y="62" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">you pay</text>' +
      '<circle cx="216" cy="55" r="34" fill="#FACC15" stroke="#92400E" stroke-width="3"/>' +
      '<text x="216" y="62" text-anchor="middle" font-size="18" fill="#1f2937" font-family="system-ui, sans-serif">Rs 10</text>' +
      '</svg></div>' +
      'How much change should you get back?',
    options:['Rs 4','Rs 3','Rs 5','Rs 16'], answer:'Rs 4',
    hint:'Take the price away from what you handed over.',
    explanation:'Rs 10 take away Rs 6 leaves <b>Rs 4</b> change.' }),

  makeMCQ({ id:'g1mth-mon-077', chapterId:CH_MON, difficulty:2, subsection:'money_sums',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="two price labels side by side">' +
      '<svg viewBox="0 0 260 110" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="14" y="16" width="106" height="76" rx="8" fill="#FDE68A" stroke="#111827" stroke-width="2.5"/>' +
      '<text x="67" y="46" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">pencil</text>' +
      '<text x="67" y="78" text-anchor="middle" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">Rs 5</text>' +
      '<rect x="140" y="16" width="106" height="76" rx="8" fill="#DBEAFE" stroke="#111827" stroke-width="2.5"/>' +
      '<text x="193" y="46" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">book</text>' +
      '<text x="193" y="78" text-anchor="middle" font-size="24" fill="#1f2937" font-family="system-ui, sans-serif">Rs 8</text>' +
      '</svg></div>' +
      'How much do the pencil and the book cost together?',
    options:['Rs 13','Rs 12','Rs 14','Rs 3'], answer:'Rs 13',
    hint:'Start at 8 and count on 5 more.',
    explanation:'Rs 5 and Rs 8 make <b>Rs 13</b> altogether.' })

);

// ── Ordinal Numbers ───────────────────────────────────────────────────────────

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g1mth-ord-076', chapterId:CH_ORD, difficulty:1, subsection:'positions_1_3',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of five different flat shapes with a start marker at one end">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<polygon points="8,45 26,33 26,57" fill="#111827"/>' +
      '<text x="20" y="95" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">start</text>' +
      '<circle cx="60" cy="45" r="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="92" y="27" width="36" height="36" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="160,25 178,63 142,63" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<rect x="190" y="32" width="44" height="26" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="260,25 279,39 272,61 248,61 241,39" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Counting from the start arrow, which shape is 1st?',
    options:['circle','square','triangle','rectangle'], answer:'circle',
    hint:'1st means the very first one the arrow reaches.',
    explanation:'The arrow points at the round shape, so the <b>circle</b> is 1st in the row.' }),

  makeMCQ({ id:'g1mth-ord-077', chapterId:CH_ORD, difficulty:1, subsection:'positions_1_3',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of five different flat shapes with a start marker at one end">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<polygon points="8,45 26,33 26,57" fill="#111827"/>' +
      '<text x="20" y="95" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">start</text>' +
      '<circle cx="60" cy="45" r="18" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<rect x="92" y="27" width="36" height="36" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="160,25 178,63 142,63" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="190" y="32" width="44" height="26" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="260,25 279,39 272,61 248,61 241,39" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'The triangle is in which place?',
    options:['3rd','1st','2nd','4th'], answer:'3rd',
    hint:'Count from the start arrow: 1st, 2nd, and then the next one.',
    explanation:'Counting from the arrow, the triangle is the third shape, so it is in <b>3rd</b> place.' }),

  makeMCQ({ id:'g1mth-ord-078', chapterId:CH_ORD, difficulty:2, subsection:'positions_1_3',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three blocks of different heights standing side by side">' +
      '<svg viewBox="0 0 240 140" style="width:100%;max-width:260px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="240" height="140" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="70" width="60" height="48" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<text x="50" y="134" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">A</text>' +
      '<rect x="90" y="24" width="60" height="94" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<text x="120" y="134" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">B</text>' +
      '<rect x="160" y="94" width="60" height="24" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<text x="190" y="134" text-anchor="middle" font-size="16" fill="#1f2937" font-family="system-ui, sans-serif">C</text>' +
      '<line x1="10" y1="118" x2="230" y2="118" stroke="#111827" stroke-width="3"/>' +
      '</svg></div>' +
      'The tallest block is 1st place. Which block is 3rd place?',
    options:['the shortest','the tallest','the middle','all the same'], answer:'the shortest',
    hint:'1st is tallest, so 3rd must be at the other end of the order.',
    explanation:'B is tallest so it is 1st, A is 2nd, and <b>the shortest</b> block, C, is 3rd.' }),

  makeMCQ({ id:'g1mth-ord-079', chapterId:CH_ORD, difficulty:2, subsection:'positions_1_3',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of five different flat shapes with an end marker at one side">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<circle cx="40" cy="45" r="18" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="72" y="27" width="36" height="36" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="140,25 158,63 122,63" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<rect x="170" y="32" width="44" height="26" fill="#A855F7" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="248,25 267,39 260,61 236,61 229,39" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="292,45 274,33 274,57" fill="#111827"/>' +
      '<text x="280" y="95" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">end</text>' +
      '</svg></div>' +
      'Counting from the end arrow, which shape is 2nd?',
    options:['rectangle','pentagon','triangle','square'], answer:'rectangle',
    hint:'This time start counting at the arrow on the right.',
    explanation:'From the end arrow, the five-sided shape is 1st and the <b>rectangle</b> is 2nd.' }),

  makeMCQ({ id:'g1mth-ord-080', chapterId:CH_ORD, difficulty:1, subsection:'positions_4_5',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of five different flat shapes with a start marker at one end">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<polygon points="8,45 26,33 26,57" fill="#111827"/>' +
      '<text x="20" y="95" text-anchor="middle" font-size="13" fill="#1f2937" font-family="system-ui, sans-serif">start</text>' +
      '<circle cx="60" cy="45" r="18" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<rect x="92" y="27" width="36" height="36" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="160,25 178,63 142,63" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="190" y="32" width="44" height="26" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="260,25 279,39 272,61 248,61 241,39" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'Which shape is 4th from the start?',
    options:['rectangle','triangle','pentagon','circle'], answer:'rectangle',
    hint:'Touch each shape and count 1st, 2nd, 3rd, 4th.',
    explanation:'Counting from the arrow, the 4th shape is the <b>rectangle</b>.' }),

  makeMCQ({ id:'g1mth-ord-081', chapterId:CH_ORD, difficulty:2, subsection:'positions_4_5',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="five cars waiting in a queue, one of them marked with a flag">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<line x1="14" y1="88" x2="290" y2="88" stroke="#111827" stroke-width="3"/>' +
      '<text x="34" y="104" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">front</text>' +
      '<rect x="18" y="54" width="44" height="22" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="29" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="51" cy="80" r="7" fill="#111827"/>' +
      '<rect x="74" y="54" width="44" height="22" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="85" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="107" cy="80" r="7" fill="#111827"/>' +
      '<rect x="130" y="54" width="44" height="22" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="141" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="163" cy="80" r="7" fill="#111827"/>' +
      '<rect x="186" y="54" width="44" height="22" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="197" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="219" cy="80" r="7" fill="#111827"/>' +
      '<line x1="208" y1="54" x2="208" y2="20" stroke="#111827" stroke-width="2"/>' +
      '<polygon points="208,20 238,28 208,36" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<rect x="242" y="54" width="44" height="22" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="253" cy="80" r="7" fill="#111827"/>' +
      '<circle cx="275" cy="80" r="7" fill="#111827"/>' +
      '</svg></div>' +
      'Counting from the front of the queue, which place is the car with the flag in?',
    options:['4th','5th','3rd','2nd'], answer:'4th',
    hint:'The front car is 1st. Count along the queue to the flag.',
    explanation:'The flag is on the fourth car from the front, so it is in <b>4th</b> place.' }),

  makeMCQ({ id:'g1mth-ord-082', chapterId:CH_ORD, difficulty:2, subsection:'positions_4_5',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a ladder with several rungs and a round object resting on one of them">' +
      '<svg viewBox="0 0 160 180" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="180" rx="8" fill="#ffffff"/>' +
      '<line x1="40" y1="18" x2="40" y2="168" stroke="#92400E" stroke-width="6"/>' +
      '<line x1="120" y1="18" x2="120" y2="168" stroke="#92400E" stroke-width="6"/>' +
      '<line x1="40" y1="150" x2="120" y2="150" stroke="#92400E" stroke-width="5"/>' +
      '<line x1="40" y1="120" x2="120" y2="120" stroke="#92400E" stroke-width="5"/>' +
      '<line x1="40" y1="90" x2="120" y2="90" stroke="#92400E" stroke-width="5"/>' +
      '<line x1="40" y1="60" x2="120" y2="60" stroke="#92400E" stroke-width="5"/>' +
      '<line x1="40" y1="30" x2="120" y2="30" stroke="#92400E" stroke-width="5"/>' +
      '<circle cx="80" cy="46" r="13" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<text x="80" y="176" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">bottom</text>' +
      '</svg></div>' +
      'The ball rests on the 5th rung counting from the bottom. How many rungs are below the ball?',
    options:['4','3','5','2'], answer:'4',
    hint:'If the ball is on the 5th rung, count the rungs it has already passed.',
    explanation:'Rungs 1, 2, 3 and 4 are all below the ball, so <b>4</b> rungs are below it.' }),

  makeMCQ({ id:'g1mth-ord-083', chapterId:CH_ORD, difficulty:2, subsection:'positions_4_5',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="five blocks on a track with a finish line drawn at one end">' +
      '<svg viewBox="0 0 300 110" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="110" rx="8" fill="#ffffff"/>' +
      '<rect x="270" y="18" width="20" height="58" fill="#111827"/>' +
      '<rect x="270" y="18" width="10" height="14" fill="#ffffff"/>' +
      '<rect x="280" y="32" width="10" height="15" fill="#ffffff"/>' +
      '<rect x="270" y="47" width="10" height="15" fill="#ffffff"/>' +
      '<rect x="280" y="62" width="10" height="14" fill="#ffffff"/>' +
      '<text x="280" y="94" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">finish</text>' +
      '<rect x="16" y="30" width="38" height="38" rx="5" fill="#EC4899" stroke="#111827" stroke-width="2"/>' +
      '<rect x="66" y="30" width="38" height="38" rx="5" fill="#F97316" stroke="#111827" stroke-width="2"/>' +
      '<rect x="116" y="30" width="38" height="38" rx="5" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<rect x="166" y="30" width="38" height="38" rx="5" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<rect x="216" y="30" width="38" height="38" rx="5" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<line x1="10" y1="76" x2="292" y2="76" stroke="#111827" stroke-width="3"/>' +
      '</svg></div>' +
      'The block nearest the finish line is 1st. Which place is the block furthest from the finish?',
    options:['5th','4th','1st','2nd'], answer:'5th',
    hint:'There are five blocks, and the furthest one is at the back of the line.',
    explanation:'Counting from the finish line, the block at the far end is the fifth one, so it is in <b>5th</b> place.' }),

  makeMCQ({ id:'g1mth-ord-084', chapterId:CH_ORD, difficulty:1, subsection:'ordinal_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="three flags in a row with a number written under each one">' +
      '<svg viewBox="0 0 250 130" style="width:100%;max-width:270px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="250" height="130" rx="8" fill="#ffffff"/>' +
      '<line x1="45" y1="20" x2="45" y2="96" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="45,20 100,32 45,44" fill="#EF4444" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="45" y="120" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">1</text>' +
      '<line x1="125" y1="20" x2="125" y2="96" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="125,20 180,32 125,44" fill="#3B82F6" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="125" y="120" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">2</text>' +
      '<line x1="205" y1="20" x2="205" y2="96" stroke="#111827" stroke-width="4"/>' +
      '<polygon points="205,20 244,32 205,44" fill="#22C55E" stroke="#111827" stroke-width="1.5"/>' +
      '<text x="205" y="120" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">3</text>' +
      '</svg></div>' +
      'Which word tells us about the flag numbered 2?',
    options:['second','first','third','fourth'], answer:'second',
    hint:'Say the order words out loud, beginning with first.',
    explanation:'Flag number 2 is the <b>second</b> flag in the row.' }),

  makeMCQ({ id:'g1mth-ord-085', chapterId:CH_ORD, difficulty:1, subsection:'ordinal_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="five steps rising to the right, each labelled, with a marker on the last one">' +
      '<svg viewBox="0 0 290 130" style="width:100%;max-width:310px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="290" height="130" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="98" width="52" height="20" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="36" y="113" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">1st</text>' +
      '<rect x="66" y="80" width="52" height="38" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="92" y="105" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">2nd</text>' +
      '<rect x="122" y="62" width="52" height="56" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="148" y="96" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">3rd</text>' +
      '<rect x="178" y="44" width="52" height="74" fill="#DBEAFE" stroke="#111827" stroke-width="2"/>' +
      '<text x="204" y="88" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">4th</text>' +
      '<rect x="234" y="26" width="52" height="92" fill="#FDE68A" stroke="#111827" stroke-width="2"/>' +
      '<text x="260" y="80" text-anchor="middle" font-size="14" fill="#1f2937" font-family="system-ui, sans-serif">5th</text>' +
      '<circle cx="260" cy="16" r="9" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '</svg></div>' +
      'The red dot sits on the highest step. Which word matches that step?',
    options:['fifth','fourth','third','first'], answer:'fifth',
    hint:'Read the label written on the tallest step.',
    explanation:'The highest step is labelled 5th, and we say that as <b>fifth</b>.' }),

  makeMCQ({ id:'g1mth-ord-086', chapterId:CH_ORD, difficulty:2, subsection:'ordinal_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of word cards with one card left blank">' +
      '<svg viewBox="0 0 300 70" style="width:100%;max-width:320px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="300" height="70" rx="8" fill="#ffffff"/>' +
      '<rect x="10" y="16" width="66" height="40" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="43" y="42" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">first</text>' +
      '<rect x="86" y="16" width="76" height="40" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="124" y="42" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">second</text>' +
      '<rect x="172" y="16" width="56" height="40" rx="6" fill="#FEF3C7" stroke="#111827" stroke-width="2" stroke-dasharray="6 4"/>' +
      '<text x="200" y="44" text-anchor="middle" font-size="20" fill="#1f2937" font-family="system-ui, sans-serif">?</text>' +
      '<rect x="238" y="16" width="56" height="40" rx="6" fill="#EDE9FE" stroke="#111827" stroke-width="2"/>' +
      '<text x="266" y="42" text-anchor="middle" font-size="15" fill="#1f2937" font-family="system-ui, sans-serif">fourth</text>' +
      '</svg></div>' +
      'Which order word is missing from the cards?',
    options:['third','fifth','second','first'], answer:'third',
    hint:'Say the order words in your head and listen for the gap.',
    explanation:'The order is first, second, <b>third</b>, fourth, so the missing card is third.' }),

  makeMCQ({ id:'g1mth-ord-087', chapterId:CH_ORD, difficulty:2, subsection:'ordinal_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a single card with a short position label written on it">' +
      '<svg viewBox="0 0 160 100" style="width:100%;max-width:170px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="160" height="100" rx="8" fill="#ffffff"/>' +
      '<rect x="20" y="14" width="120" height="72" rx="10" fill="#DCFCE7" stroke="#111827" stroke-width="3"/>' +
      '<text x="80" y="66" text-anchor="middle" font-size="34" fill="#1f2937" font-family="system-ui, sans-serif">4th</text>' +
      '</svg></div>' +
      'Which word means the same as what is written on the card?',
    options:['fourth','fourteen','forty','four'], answer:'fourth',
    hint:'The card shows a place in a line, not just how many there are.',
    explanation:'4th is the order word <b>fourth</b>. Four tells you how many, and fourteen and forty are different numbers.' }),

  makeMCQ({ id:'g1mth-ord-088', chapterId:CH_ORD, difficulty:1, subsection:'ordinal_words',
    question:
      '<div style="text-align:center;margin:.5em 0" aria-label="a row of books standing on a shelf with one of them marked">' +
      '<svg viewBox="0 0 260 120" style="width:100%;max-width:280px;height:auto" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<rect x="0" y="0" width="260" height="120" rx="8" fill="#ffffff"/>' +
      '<polygon points="20,52 38,40 38,64" fill="#111827"/>' +
      '<text x="30" y="104" text-anchor="middle" font-size="12" fill="#1f2937" font-family="system-ui, sans-serif">start</text>' +
      '<rect x="52" y="20" width="30" height="66" fill="#EF4444" stroke="#111827" stroke-width="2"/>' +
      '<rect x="88" y="20" width="30" height="66" fill="#3B82F6" stroke="#111827" stroke-width="2"/>' +
      '<rect x="124" y="20" width="30" height="66" fill="#22C55E" stroke="#111827" stroke-width="2"/>' +
      '<circle cx="139" cy="53" r="9" fill="#111827"/>' +
      '<rect x="160" y="20" width="30" height="66" fill="#FACC15" stroke="#111827" stroke-width="2"/>' +
      '<line x1="44" y1="86" x2="230" y2="86" stroke="#92400E" stroke-width="5"/>' +
      '</svg></div>' +
      'Which word gives the place of the book with the black dot?',
    options:['third','first','second','fourth'], answer:'third',
    hint:'Count the books from the start arrow.',
    explanation:'The marked book is the third one along from the arrow, so its place is <b>third</b>.' })

);

})();

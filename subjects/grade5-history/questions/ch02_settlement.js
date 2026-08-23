'use strict';
// Grade 5 History & Geography — Chapter: Settlement of Mauritius
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5hg-sett-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-sett-001', chapterId:'settlement', difficulty:1,
    question:'Which European nation was the FIRST to settle permanently in Mauritius?',
    options:['The Portuguese','The French','The British','The Dutch'],
    answer:'The Dutch',
    hint:'They arrived in the 17th century and named the island after a Dutch prince.',
    explanation:'The Dutch were the first to settle in Mauritius in 1638. They named it "Mauritius" after Prince Maurice of Nassau (Maurice van Nassau), a Dutch statesman.' }),

  makeMCQ({ id:'g5hg-sett-002', chapterId:'settlement', difficulty:1,
    question:'When did the Dutch first settle in Mauritius?',
    options:['1598','1638','1715','1810'],
    answer:'1638',
    hint:'The 17th century — just after the Dutch first claimed the island.',
    explanation:'The Dutch established the first permanent settlement in Mauritius in 1638, though they had claimed it earlier in 1598.' }),

  makeMCQ({ id:'g5hg-sett-003', chapterId:'settlement', difficulty:1,
    question:'After the Dutch left Mauritius, which nation took control of the island in 1715?',
    options:['The British','The Portuguese','The French','The Spanish'],
    answer:'The French',
    hint:'France established a base in the Indian Ocean for its trade routes.',
    explanation:'After the Dutch abandoned Mauritius, the French took control in 1715. They renamed it "Isle de France" and developed it significantly, particularly under Mahé de Labourdonnais.' }),

  makeMCQ({ id:'g5hg-sett-004', chapterId:'settlement', difficulty:1,
    question:'In which year did the British take control of Mauritius from the French?',
    options:['1715','1776','1810','1835'],
    answer:'1810',
    hint:'This was during the Napoleonic Wars era.',
    explanation:'The British captured Mauritius from the French in 1810, following the Battle of Grand Port and Cape Malheureux. Britain officially gained control through the Treaty of Paris in 1814.' }),

  makeTF({ id:'g5hg-sett-005', chapterId:'settlement', difficulty:1,
    question:'The Dutch named Mauritius after Prince Maurice of Nassau.',
    answer:true,
    hint:'The Dutch named the island — think about who they might have named it after.',
    explanation:'True. The Dutch named Mauritius "Mauritius" (or Maurits) after Prince Maurice of Nassau (Maurits van Nassau), Stadtholder of the Dutch Republic at the time of its discovery in 1598.' }),

  makeMCQ({ id:'g5hg-sett-006', chapterId:'settlement', difficulty:2,
    question:'What was Mauritius called by the French when they governed it?',
    options:['New France','Isle de France','French Mauritius','Île Bourbon'],
    answer:'Isle de France',
    hint:'The French renamed it after their own country.',
    explanation:'The French renamed Mauritius "Isle de France" (Island of France) when they took control in 1715. It was known by this name until the British took over in 1810.' }),

  makeMCQ({ id:'g5hg-sett-007', chapterId:'settlement', difficulty:2,
    question:'What is the correct order of European nations that controlled Mauritius?',
    options:[
      'Portuguese → Dutch → British → French',
      'Dutch → French → British',
      'French → Dutch → British',
      'Portuguese → French → Dutch → British'
    ],
    answer:'Dutch → French → British',
    hint:'The Portuguese discovered but did not settle. Then came three settlers in order.',
    explanation:'The Dutch settled first (1638), then the French took over (1715), and finally the British captured Mauritius in 1810. The Portuguese discovered but never settled permanently.' })

);

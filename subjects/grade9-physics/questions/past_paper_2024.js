'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  NCE 2024 Science - past-paper questions adapted to MCQ format, plus the
//  written questions for the past-papers screen.
//  Source: Mauritius Examinations Syndicate,
//    past-papers/nce/science-biology/2024-Biology.pdf    (N530, 50 marks)
//    past-papers/nce/science-chemistry/2024-Chemistry.pdf (50 marks)
//
//  ⚠⚠ PHYSICS 2024 IS NOT IN THIS REPOSITORY. The NCE assesses Science as
//     three separate papers (Biology, Chemistry, Physics) and this pack
//     carries the exam's own B/C/P split, but past-papers/nce/science-physics/
//     holds only 2021, 2022, 2023 and 2025 - there is no 2024 paper to read.
//     So this file covers TWO of the three 2024 papers, and the g9s-p1..p5
//     chapters get nothing from it. Do not read the absence as "physics was
//     not examined in 2024"; the paper is simply missing here.
//
//  ⚠ Nine figures are cropped into assets/past-papers/g9-science-2024/. They
//    were rendered through Chrome's PDF viewer over CDP and cropped with
//    Page.captureScreenshot's `clip` (scratchpad/pdf-crop.js) - poppler on this
//    machine is pdftotext ONLY, with no pdftoppm or pdftocairo.
//
//  ⚠⚠ ONE QUESTION DELIBERATELY DID NOT BECOME A PRACTICE ITEM. Biology
//     Q4(e)(ii) gives a white blood cell "with a magnification of x 8000" and
//     asks for its ACTUAL size - the child measures the printed drawing with a
//     ruler and divides. A crop displayed at whatever size the browser picks is
//     a different measurement, so a practice version of it would mark a correct
//     reading wrong. It is kept as a written item whose mark scheme teaches the
//     METHOD (actual = image size / magnification), and the adapted item asks
//     for that method rather than for a number.
//
//  ⚠ Alt text never names the answer.
// ══════════════════════════════════════════════════════════════════════════

STATIC_QUESTIONS.push(
  makeMCQ({ id:'g9s-pp24c-001', chapterId:'g9s-p1-measurements', subsection:'measuring_instruments', difficulty:1,
    question:'Which piece of apparatus is used to measure <b>temperature</b>?',
    options:['Thermometer','Test tube','Filter funnel','Measuring cylinder'], answer:'Thermometer',
    hint:'Which one has a scale marked in degrees?',
    explanation:'A <b>thermometer</b> measures temperature. A measuring cylinder measures volume, a filter funnel separates a solid from a liquid and a test tube simply holds a small sample.' })
);

window.PSAC_PDF_QUESTIONS = window.PSAC_PDF_QUESTIONS || [];
window.PSAC_PDF_QUESTIONS.push(
  { id:'g9s-pp24c-pdf-000', chapterId:'g9s-p1-measurements', marks:1, year:2024, grade:9, subject:'Science (Chemistry)', type:'written',
    image:'assets/past-papers/g9-science-2024/c1-apparatus.png',
    imageAlt:'Four drawings of laboratory apparatus labelled A to D',
    question:'Question 1.1. Which one of the following is used to measure temperature?',
    markScheme:'B - the thermometer, the only one of the four with a temperature scale. A is a test tube, C is a filter funnel and D is a measuring cylinder (which measures volume, not temperature).' }
);

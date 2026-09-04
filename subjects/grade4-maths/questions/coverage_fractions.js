'use strict';
(function(){
const num=(id,s,q,a,h)=>STATIC_QUESTIONS.push(makeNum({id,chapterId:'g4-fractions',subsection:s,difficulty:2,question:q,answer:String(a),acceptableAnswers:[String(a)],hint:h,explanation:`The answer is <b>${a}</b>.`}));
const mcq=(id,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:'g4-fractions',subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:`<b>${a}</b> is correct.`}));
for(let i=0;i<13;i++){const d=5+i,a=i+1,b=i+2;mcq(`g4m-cov-frcmp-${i}`,'compare_order',`Which fraction is greater: ${a}/${d} or ${b}/${d}?`,[`${a}/${d}`,`${b}/${d}`],`${b}/${d}`,'With the same denominator, compare the numerators.');}
for(let i=0;i<13;i++){const a=i+2,b=i+3,k=2+i%3,correct=`${a*k}/${b*k}`;mcq(`g4m-cov-freq-${i}`,'equivalent',`Which fraction is equivalent to ${a}/${b}?`,[correct,`${a}/${b*k}`,`${a*k}/${b*k+1}`,`${a+1}/${b}`],correct,'Multiply the numerator and denominator by the same number.');}
for(let i=0;i<16;i++){const d=6+i,a=i%4+1,b=i%3+1;num(`g4m-cov-fradd-${i}`,'add_sub',`Calculate: ${a}/${d} + ${b}/${d}. (Write as A/B)`,`${a+b}/${d}`,'The denominators are the same: add the numerators.');}
for(let i=0;i<16;i++){const d=2+i%5,n=1+i%(d-1),k=3+i;num(`g4m-cov-frof-${i}`,'fraction_of',`What is ${n}/${d} of ${d*k}?`,n*k,'Divide by the denominator, then multiply by the numerator.');}
for(let i=0;i<19;i++){const d=3+i%5,w=1+i%4,n=1+i%(d-1),imp=w*d+n;num(`g4m-cov-frmix-${i}`,'mixed_numbers',`Write ${w} ${n}/${d} as an improper fraction. (Write as A/B)`,`${imp}/${d}`,'Multiply the whole number by the denominator, then add the numerator.');}
for(let i=0;i<19;i++){const d=i<9?10:100,n=i<9?i+1:(i-8)*11;num(`g4m-cov-frdec-${i}`,'decimals',`Write ${n}/${d} as a decimal.`,n/d,'A denominator of 10 means tenths; 100 means hundredths.');}
const contexts=['A class read','A gardener watered','A baker used','A runner completed','A painter coloured','A child drank','A recipe needs','A ribbon was cut into','A farmer sold','A team won','A library lent','A bus travelled','A tank was filled'];
contexts.forEach((c,i)=>{const d=[4,5,6,8][i%4],n=1+i%(d-1),total=d*(5+i);num(`g4m-cov-frwp-${i}`,'word_problems',`${c} ${n}/${d} of ${total} pages/items. How many pages/items is that?`,n*(5+i),'First find one equal part by dividing by the denominator.');});
})();

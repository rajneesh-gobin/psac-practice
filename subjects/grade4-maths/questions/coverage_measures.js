'use strict';
(function(){
const num=(id,s,q,a,h)=>STATIC_QUESTIONS.push(makeNum({id,chapterId:'g4-measures',subsection:s,difficulty:2,question:q,answer:String(a),acceptableAnswers:[String(a),`${a} cm`,`${a} g`,`${a} mL`,`${a} L`,`${a} Rs`,`${a} cm²`,`${a} cm`],hint:h,explanation:`The answer is <b>${a}</b>.`}));
const mcq=(id,s,q,o,a,h)=>STATIC_QUESTIONS.push(makeMCQ({id,chapterId:'g4-measures',subsection:s,difficulty:2,question:q,options:o,answer:a,hint:h,explanation:`<b>${a}</b> is correct.`}));
for(let i=0;i<14;i++){const m=2+i;num(`g4m-cov-len-${i}`,'length',`Convert ${m} m to centimetres.`,m*100,'1 metre = 100 centimetres.');}
for(let i=0;i<16;i++){const kg=1+i;num(`g4m-cov-mass-${i}`,'mass',`Convert ${kg} kg to grams.`,kg*1000,'1 kilogram = 1,000 grams.');}
for(let i=0;i<16;i++){const l=2+i;num(`g4m-cov-cap-${i}`,'capacity',`Convert ${l} L to millilitres.`,l*1000,'1 litre = 1,000 millilitres.');}
for(let i=0;i<10;i++){const h=1+i,min=5+i*5;num(`g4m-cov-time-${i}`,'time',`${h} hour${h===1?'':'s'} ${min} minutes = how many minutes?`,h*60+min,'Change hours into minutes, then add the remaining minutes.');}
for(let i=0;i<16;i++){const price=12+i*3,qty=2+i%5;num(`g4m-cov-money-${i}`,'money',`A pupil buys ${qty} notebooks at Rs ${price} each. How much does the pupil pay?`,price*qty,'Multiply the price of one item by the number of items.');}
for(let i=0;i<18;i++){const l=3+i,w=2+i%6;num(`g4m-cov-area-${i}`,'area',`Find the area of a rectangle ${l} cm long and ${w} cm wide.`,l*w,'Area of a rectangle = length × width.');}
for(let i=0;i<19;i++){const l=4+i,w=2+i%7;num(`g4m-cov-perim-${i}`,'perimeter',`Find the perimeter of a rectangle ${l} cm long and ${w} cm wide.`,2*(l+w),'Perimeter is the distance all the way around: 2 × (length + width).');}
})();

'use strict';
// Grade 6 Maths — 20 deterministic Level-4 reasoning variants per chapter.

(function () {
  const add = (chapterId, subsection, n, question, answer, hint, explanation) => {
    const numeric = Number(answer);
    const accepted = [String(answer)];
    if (Number.isFinite(numeric)) accepted.push(numeric.toLocaleString('en-GB'));
    STATIC_QUESTIONS.push(makeNum({ id:`g6x-${chapterId}-${String(n).padStart(2, '0')}`,
      chapterId, subsection, difficulty:4, question, answer:String(answer), acceptableAnswers:accepted, hint, explanation }));
  };

  for (let n=1; n<=20; n++) {
    { const a=125400+n*2871, b=94250+n*1934, target=500000, ans=target-a-b;
      add('g6-numeration','word_probs',n,`A charity has a target of <b>${target.toLocaleString('en-GB')}</b> cans. Two regions collect <b>${a.toLocaleString('en-GB')}</b> and <b>${b.toLocaleString('en-GB')}</b> cans. How many more cans are needed?`,ans,'Add the collections, then subtract from the target.',`Collected = ${(a+b).toLocaleString('en-GB')}. Needed = ${target.toLocaleString('en-GB')} − ${(a+b).toLocaleString('en-GB')} = <b>${ans.toLocaleString('en-GB')}</b>.`); }
    { const cartons=18+n, per=96+4*n, classes=6+(n%5), total=cartons*per, shared=Math.floor(total/classes)*classes;
      add('g6-four-ops','word_probs',n,`A school receives <b>${cartons}</b> cartons of pencils with <b>${per}</b> pencils each. It shares as many as possible equally among <b>${classes}</b> classes. How many pencils does each class receive?`,shared/classes,'Multiply to find the total, then divide by the number of classes.',`Total = ${cartons} × ${per} = ${total}. Each class receives ${shared} ÷ ${classes} = <b>${shared/classes}</b> pencils.`); }
    { const d=[4,5,8,10][n%4], num=1+(n%(d-1)), total=d*(20+n), used=total*num/d, ans=(total-used)/d;
      add('g6-fractions','word_probs',n,`A caterer has <b>${total}</b> sandwiches. She gives <b>${num}/${d}</b> to volunteers and shares the rest equally among <b>${d}</b> teams. How many sandwiches does each team receive?`,ans,`Find ${num}/${d} of ${total}, subtract it, then divide by ${d}.`,`Given away = ${used}. Remaining = ${total-used}. Each team gets <b>${ans}</b>.`); }
    { const km=15.25+n*0.4, rate=2.5+(n%4)*0.25, days=3+(n%4), ans=km*rate*days;
      add('g6-decimals','word_probs',n,`A delivery rider travels <b>${km.toFixed(2)} km</b> each day for <b>${days}</b> days. Fuel costs <b>Rs ${rate.toFixed(2)}</b> per kilometre. What is the fuel cost?`,ans.toFixed(2),'Find the total kilometres, then multiply by the cost per kilometre.',`Distance = ${km.toFixed(2)} × ${days} = ${(km*days).toFixed(2)} km. Cost = ${(km*days).toFixed(2)} × ${rate.toFixed(2)} = <b>Rs ${ans.toFixed(2)}</b>.`); }
    { const pairs=[[24,36],[30,45],[42,56],[48,72],[54,90]][n%5], h=[12,15,14,24,18][n%5];
      add('g6-factors-hcf','word_probs',n,`A teacher has <b>${pairs[0]}</b> red and <b>${pairs[1]}</b> blue counters. She makes the greatest possible number of identical packs with no counters left. How many packs can she make?`,h,'Find the highest common factor of the two amounts.',`HCF(${pairs[0]}, ${pairs[1]}) = <b>${h}</b>, so ${h} identical packs can be made.`); }
    { const ratioA=2+(n%4), ratioB=3+(n%5), unit=6+n, original=(ratioA+ratioB)*unit, newTotal=original+ratioB*unit;
      add('g6-ratio-pct','word_probs',n,`Girls and boys are in the ratio <b>${ratioA}:${ratioB}</b> in a group of <b>${original}</b>. Then <b>${ratioB*unit}</b> more boys join. What percentage of the new group are girls? Give your answer to the nearest whole percent.`,Math.round(ratioA*unit/newTotal*100),'Find the number of girls first. Their number stays the same after the boys join.',`One part = ${unit}. Girls = ${ratioA*unit}. New total = ${newTotal}. Percentage = ${ratioA*unit}/${newTotal} × 100 ≈ <b>${Math.round(ratioA*unit/newTotal*100)}%</b>.`); }
    { const a=70+n, b=95+(n%5)*5, c=55+(n%4)*8;
      add('g6-geometry','angles',n,`A quadrilateral has three angles measuring <b>${a}°</b>, <b>${b}°</b> and <b>${c}°</b>. What is the fourth angle?`,360-a-b-c,'Angles in a quadrilateral add to 360°.',`Fourth angle = 360° − (${a}+${b}+${c})° = <b>${360-a-b-c}°</b>.`); }
    { const tonnes=1+(n%3)*0.5, kg=350+25*n, max=3, ans=max*1000-(tonnes*1000+kg);
      add('g6-measure','word_probs',n,`A truck can carry <b>${max} tonnes</b>. It is loaded with <b>${tonnes.toFixed(1)} tonnes</b> of gravel and <b>${kg} kg</b> of sand. How many kilograms can it still carry?`,ans,'Convert tonnes to kilograms, add the loads, then subtract from the maximum.',`Maximum = ${max*1000} kg. Loaded = ${tonnes*1000}+${kg} = ${tonnes*1000+kg} kg. Capacity left = <b>${ans} kg</b>.`); }
    { const l=40+2*n, w=20+n, h=10+(n%5), filled=0.5+(n%2)*0.25, litres=l*w*h*filled/1000;
      add('g6-area-vol','word_probs',n,`A cuboid tank is <b>${l} cm</b> long, <b>${w} cm</b> wide and <b>${h} cm</b> high. It is filled to <b>${filled*100}%</b>. How many litres of water does it contain?`,litres,'Find the full volume, take the stated fraction, then convert 1,000 cm³ to 1 L.',`Full volume = ${l} × ${w} × ${h} = ${l*w*h} cm³. Filled volume = ${l*w*h*filled} cm³ = <b>${litres} L</b>.`); }
    { const speed=30+3*n, hours=2+(n%4), stop=10+5*(n%4), mins=hours*60+stop;
      add('g6-time-speed','word_probs',n,`A bus leaves at <b>08:15</b>, travels for <b>${hours}</b> hours, then stops for <b>${stop}</b> minutes. At what time is it ready to leave again? Give your answer as HH:MM.`,`${String(8+Math.floor((15+mins)/60)).padStart(2,'0')}:${String((15+mins)%60).padStart(2,'0')}`,'Add the travelling time and the stop to 08:15.',`Elapsed time = ${hours} hours ${stop} minutes. 08:15 + ${hours} h ${stop} min = <b>${String(8+Math.floor((15+mins)/60)).padStart(2,'0')}:${String((15+mins)%60).padStart(2,'0')}</b>.`); }
    { const mean=22+n, vals=[mean-5,mean+3,mean-2,mean+1], missing=mean*5-vals.reduce((a,b)=>a+b,0);
      add('g6-graphs','averages',n,`Five days have a mean rainfall of <b>${mean} mm</b>. Four daily amounts are <b>${vals.join(', ')} mm</b>. What is the fifth daily amount?`,missing,'Mean × number of days gives the total. Subtract the four known values.',`Total = ${mean} × 5 = ${mean*5}. Known total = ${vals.reduce((a,b)=>a+b,0)}. Missing amount = <b>${missing} mm</b>.`); }
  }
})();

'use strict';
(function () {
  const add = (section, id, question, answer, hint, explanation, difficulty = 4) =>
    STATIC_QUESTIONS.push(makeNum({id:`g4m-data-reason-${section}-${id}`,chapterId:'g4-data',subsection:section,
      difficulty,question,answer:String(answer),acceptableAnswers:[String(answer)],hint,explanation}));
  const table = (heading, labels, values) => `<p>${heading}</p><table><thead><tr><th>Group</th><th>Number</th></tr></thead><tbody>${labels.map((label,i)=>`<tr><td>${label}</td><td>${values[i]}</td></tr>`).join('')}</tbody></table>`;
  const tallyRows = [
    ['A class records how pupils travel to school.',['Walk','Bus','Car'],[8,12,5],'pupils'],
    ['A library records books returned during one morning.',['Stories','Science','Poems'],[14,9,7],'books'],
    ['Children sort the fruit for a picnic.',['Bananas','Oranges','Apples'],[17,11,8],'pieces of fruit'],
    ['A class counts items collected for recycling.',['Cans','Bottles','Boxes'],[16,13,6],'items'],
    ['A garden club records seeds planted in three trays.',['Tray A','Tray B','Tray C'],[19,14,9],'seeds']
  ];
  tallyRows.forEach(([intro,labels,v,unit],i)=>{
    const marks = n => Array(Math.floor(n/5)).fill('||||/').concat(n%5 ? ['|'.repeat(n%5)] : []).join(' ');
    const stimulus = `<p>${intro} Each <code>||||/</code> group means five; each single <code>|</code> means one.</p><table><tr><th>Group</th><th>Tally marks</th></tr>${labels.map((label,j)=>`<tr><td>${label}</td><td><code>${marks(v[j])}</code></td></tr>`).join('')}</table>`;
    add('tally',`${i}-read`,`${stimulus}<p>How many ${unit} are recorded for ${labels[0]}?</p>`,v[0],
      'Count each complete group as five, then add the single marks.',`${Math.floor(v[0]/5)} groups of five and ${v[0]%5} singles give ${Math.floor(v[0]/5)} × 5 + ${v[0]%5} = <b>${v[0]}</b>.`,2);
    add('tally',`${i}-total`,`${stimulus}<p>How many ${unit} are recorded altogether?</p>`,v.reduce((a,b)=>a+b,0),
      'Read each tally row first. Then add all three counts.',`${labels[0]}: ${v[0]}, ${labels[1]}: ${v[1]}, ${labels[2]}: ${v[2]}. Total = ${v.join(' + ')} = <b>${v.reduce((a,b)=>a+b,0)}</b>.`);
    add('tally',`${i}-compare`,`${stimulus}<p>How many more ${unit} are in ${labels[0]} than in ${labels[2]}?</p>`,v[0]-v[2],
      '"How many more" asks for the difference, not the total.',`${labels[0]} has ${v[0]} and ${labels[2]} has ${v[2]}. Subtract: ${v[0]} − ${v[2]} = <b>${v[0]-v[2]}</b>.`);
    add('tally',`${i}-update`,`${stimulus}<p>Three more ${unit} are added to ${labels[1]}. What is the new count for this group?</p>`,v[1]+3,
      'Only the second row changes. Add three to that row\'s count.',`${labels[1]} originally has ${v[1]}. Its new count is ${v[1]} + 3 = <b>${v[1]+3}</b>.`);
  });
  const pictures = [
    ['Books read by three reading groups',['Red','Blue','Green'],4,[3,2,4]],
    ['Bottles collected by three teams',['Team A','Team B','Team C'],2,[5,3,2]],
    ['Seedlings planted in three gardens',['North','East','West'],6,[2,4,3]],
    ['Tickets sold at three stalls',['Stall A','Stall B','Stall C'],8,[4,2,3]],
    ['Oranges packed in three baskets',['Basket A','Basket B','Basket C'],10,[3,5,2]]
  ];
  pictures.forEach(([title,labels,key,symbols],i)=>{
    const diagram=`<p>${title}. Key: one ● represents ${key} items; one ◐ represents ${key/2} items.</p><table><tr><th>Group</th><th>Symbols</th></tr>${labels.map((label,j)=>`<tr><td>${label}</td><td>${'● '.repeat(symbols[j])}${j===1?'◐':''}</td></tr>`).join('')}</table>`;
    const values=symbols.map((n,j)=>n*key+(j===1?key/2:0));
    add('pictogram',`${i}-half`,`${diagram}<p>How many items does ${labels[1]} represent?</p>`,values[1],
      'Multiply the full symbols by the key, then add half of the key.',`${symbols[1]} full symbols represent ${symbols[1]} × ${key} = ${symbols[1]*key}. The half symbol adds ${key/2}. Total: <b>${values[1]}</b>.`,2);
    add('pictogram',`${i}-combined`,`${diagram}<p>How many items do ${labels[0]} and ${labels[2]} represent together?</p>`,values[0]+values[2],
      'Use the key for both rows. Do not include the middle row.',`${labels[0]} represents ${values[0]} and ${labels[2]} represents ${values[2]}. Together: ${values[0]} + ${values[2]} = <b>${values[0]+values[2]}</b>.`);
    add('pictogram',`${i}-extra`,`${diagram}<p>${labels[2]} receives ${key} more items. How many FULL symbols should its row now contain?</p>`,symbols[2]+1,
      'The extra items equal one full symbol. Count symbols, not items.',`${key} extra items add one full symbol. The row changes from ${symbols[2]} to <b>${symbols[2]+1}</b> full symbols.`);
    add('pictogram',`${i}-total`,`${diagram}<p>How many items are shown in all three rows?</p>`,values.reduce((a,b)=>a+b,0),
      'Count the items in all rows, remembering the half symbol.',`The row totals are ${values.join(', ')}. Add: ${values.join(' + ')} = <b>${values.reduce((a,b)=>a+b,0)}</b>.`);
  });
  const charts=[
    ['School library loans',['Mon','Tue','Wed'],[12,20,16],'books'],
    ['Mangoes collected by teams',['Red','Blue','Gold'],[18,10,24],'mangoes'],
    ['Reusable bottles brought to school',['Class A','Class B','Class C'],[14,22,18],'bottles'],
    ['Seats booked for a school show',['Morning','Noon','Afternoon'],[26,18,12],'seats'],
    ['Seed packets sold at a fair',['Beans','Peas','Corn'],[16,28,20],'packets']
  ];
  charts.forEach(([title,labels,v,unit],i)=>{
    const diagram=`<p>${title}</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 185" role="img" aria-label="${title}: read each bar against the numbered scale" style="max-width:100%;background:white;color:#172554">${[0,5,10,15,20,25,30].map(n=>`<line x1="${110+n*8}" y1="15" x2="${110+n*8}" y2="140" stroke="#cbd5e1"/><text x="${110+n*8}" y="157" text-anchor="middle" font-size="12" fill="#172554">${n}</text>`).join('')}${labels.map((label,j)=>`<text x="104" y="${42+j*40}" text-anchor="end" font-size="12" fill="#172554">${label}</text><rect x="110" y="${24+j*40}" width="${v[j]*8}" height="26" fill="#2563eb"/>`).join('')}<text x="230" y="179" text-anchor="middle" font-size="12" fill="#172554">Number of ${unit}</text></svg>`;
    add('bar_chart',`${i}-read`,`${diagram}<p>How many ${unit} does the bar for ${labels[0]} show?</p>`,v[0],
      'Read the end of the first bar against the numbered scale. Each interval of five is equally spaced.',`The first bar ends at <b>${v[0]}</b> on the scale. It represents ${v[0]} ${unit}.`,2);
    add('bar_chart',`${i}-total`,`${diagram}<p>How many ${unit} are shown altogether?</p>`,v.reduce((a,b)=>a+b,0),
      'Read all three values, then add them.',`The bars show ${v.join(', ')}. Total = ${v.join(' + ')} = <b>${v.reduce((a,b)=>a+b,0)}</b>.`);
    add('bar_chart',`${i}-difference`,`${diagram}<p>What is the difference between the largest and smallest numbers of ${unit}?</p>`,Math.max(...v)-Math.min(...v),
      'Find the longest and shortest bars. Subtract the smaller value.',`Largest = ${Math.max(...v)}; smallest = ${Math.min(...v)}. Difference = ${Math.max(...v)} − ${Math.min(...v)} = <b>${Math.max(...v)-Math.min(...v)}</b>.`);
    add('bar_chart',`${i}-target`,`${diagram}<p>How many more ${unit} would ${labels[1]} need to reach 30?</p>`,30-v[1],
      'Compare the second bar with the target of 30.',`${labels[1]} shows ${v[1]}. The amount still needed is 30 − ${v[1]} = <b>${30-v[1]}</b>.`);
  });
  const sets=[
    ['Four pupils count the books they read.','books',[2,4,4,6]],
    ['Four teams count the bean seedlings in their trays.','seedlings',[3,3,7,11]],
    ['Four children count shells collected for a classroom display.','shells',[2,6,8,8]],
    ['Four baskets hold these numbers of oranges.','oranges',[5,7,7,13]],
    ['Four groups record their numbers of completed puzzles.','puzzles',[4,10,10,12]]
  ];
  sets.forEach(([intro,unit,v],i)=>{
    const stimulus=table(intro,['A','B','C','D'],v);
    const sum=v.reduce((a,b)=>a+b,0);
    const mode=v.find(n=>v.filter(x=>x===n).length===2);
    add('averages',`${i}-mean`,`${stimulus}<p>If the ${unit} were shared equally among the four groups, how many would each receive? This is the mean.</p>`,sum/4,
      'Add all four counts, then divide by four.',`${v.join(' + ')} = ${sum}. Sharing equally gives ${sum} ÷ 4 = <b>${sum/4}</b>.`);
    add('averages',`${i}-median`,`${stimulus}<p>What is the median of these four counts?</p>`,(v[1]+v[2])/2,
      'The counts are already ordered. With four counts, find the mean of the middle two.',`The middle counts are ${v[1]} and ${v[2]}. Median = (${v[1]} + ${v[2]}) ÷ 2 = <b>${(v[1]+v[2])/2}</b>.`,2);
    add('averages',`${i}-mode`,`${stimulus}<p>What is the mode of these counts?</p>`,mode,
      'Look for the number which occurs most often.',`${mode} appears twice; each other number appears once. The mode is <b>${mode}</b>.`,2);
    add('averages',`${i}-range`,`${stimulus}<p>What is the range of these counts?</p>`,v[3]-v[0],
      'Subtract the smallest count from the largest.',`Range = ${v[3]} − ${v[0]} = <b>${v[3]-v[0]}</b>.`,2);
  });
})();

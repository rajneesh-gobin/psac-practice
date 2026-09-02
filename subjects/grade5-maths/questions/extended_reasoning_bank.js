'use strict';
// Grade 5 Maths — 20 deterministic Level-4 reasoning variants per chapter.
// Values and contexts deliberately vary while every question keeps a complete
// worked route. IDs are stable: database imports update rather than duplicate.

(function () {
  const add = (chapterId, subsection, n, question, answer, hint, explanation) => {
    const numeric = Number(answer);
    const accepted = [String(answer)];
    if (Number.isFinite(numeric)) accepted.push(numeric.toLocaleString('en-GB'));
    STATIC_QUESTIONS.push(makeNum({ id:`g5x-${chapterId}-${String(n).padStart(2, '0')}`,
      chapterId, subsection, difficulty:4, question, answer:String(answer), acceptableAnswers:accepted, hint, explanation }));
  };

  for (let n = 1; n <= 20; n++) {
    const k = n + 4;

    { // Numeration: estimate then calculate the difference
      const a = 24560 + n * 1231, b = 17890 + n * 917, target = 100000;
      const left = target - a - b;
      add('numeration','word_probs',n,
        `A recycling drive needs <b>${target.toLocaleString('en-GB')}</b> bottles. Two schools collect <b>${a.toLocaleString('en-GB')}</b> and <b>${b.toLocaleString('en-GB')}</b> bottles. How many more bottles are needed?`, left,
        'Add the two collections, then subtract their total from 100,000.',
        `Collected = ${a.toLocaleString('en-GB')} + ${b.toLocaleString('en-GB')} = ${(a+b).toLocaleString('en-GB')}. Still needed = ${target.toLocaleString('en-GB')} − ${(a+b).toLocaleString('en-GB')} = <b>${left.toLocaleString('en-GB')}</b>.`);
    }
    { // Four operations: multiplication, subtraction and sharing
      const boxes = 12 + n, per = 36 + 2*n, kept = 2*n, classes = 4 + (n % 5);
      const share = (boxes*per-kept) / classes;
      // Choose only cases that divide exactly by adjusting the kept amount.
      const usable = Math.floor((boxes*per-kept)/classes)*classes;
      const actualKept = boxes*per-usable;
      add('four_ops','word_probs',n,
        `A school receives <b>${boxes}</b> cartons of markers with <b>${per}</b> markers in each. It keeps <b>${actualKept}</b> markers for the office and shares the rest equally among <b>${classes}</b> classes. How many markers does each class receive?`, usable/classes,
        'Multiply cartons by markers, subtract the ones kept, then divide equally.',
        `Total = ${boxes} × ${per} = ${boxes*per}. Shared = ${boxes*per} − ${actualKept} = ${usable}. Each class gets ${usable} ÷ ${classes} = <b>${usable/classes}</b>.`);
    }
    { // Square numbers: a square grid plus a perimeter cost
      const side = 5 + n, price = 8 + n;
      add('square_nums','word_probs',n,
        `A square courtyard has <b>${side}</b> paving slabs along each side. Each slab costs <b>Rs ${price}</b>. What is the total cost of all the slabs?`, side*side*price,
        'Find the number of slabs using side × side, then multiply by the cost of one slab.',
        `Slabs = ${side}² = ${side*side}. Cost = ${side*side} × Rs ${price} = <b>Rs ${(side*side*price).toLocaleString('en-GB')}</b>.`);
    }
    { // Geometry: unknown triangle angle in a real context
      const a = 32 + n, b = 48 + 2*n, c = 180-a-b;
      add('geometry','angles',n,
        `A triangular road sign has two angles of <b>${a}°</b> and <b>${b}°</b>. What is the third angle?`, c,
        'The three angles inside any triangle total 180°.',
        `Third angle = 180° − (${a}° + ${b}°) = <b>${c}°</b>.`);
    }
    { // Fractions: fraction of a quantity, then what remains
      const denoms = [4,5,8,10], d = denoms[n % denoms.length], num = 1 + (n % (d-1)), total = d*(12+n);
      add('fractions','word_probs',n,
        `A baker has <b>${total}</b> buns. She gives <b>${num}/${d}</b> of them to a charity and packs the rest equally into <b>${d}</b> trays. How many buns are in each tray?`, (total-total*num/d)/d,
        `First find ${num}/${d} of ${total}, subtract it, then divide what remains by ${d}.`,
        `Given away = ${total} ÷ ${d} × ${num} = ${total*num/d}. Remaining = ${total} − ${total*num/d} = ${total-total*num/d}. Each tray has <b>${(total-total*num/d)/d}</b> buns.`);
    }
    { // Decimals: cost, payment and change
      const price = 12.25 + n*0.35, qty = 3 + (n%5), paid = Math.ceil(price*qty/10)*10;
      add('decimals','word_probs',n,
        `A shop sells notebooks for <b>Rs ${price.toFixed(2)}</b> each. Leena buys <b>${qty}</b> notebooks and pays with <b>Rs ${paid.toFixed(2)}</b>. What change does she receive?`, (paid-price*qty).toFixed(2),
        'Multiply the decimal price by the number of notebooks, then subtract from the amount paid.',
        `Cost = ${qty} × Rs ${price.toFixed(2)} = Rs ${(price*qty).toFixed(2)}. Change = ${paid.toFixed(2)} − ${(price*qty).toFixed(2)} = <b>Rs ${(paid-price*qty).toFixed(2)}</b>.`);
    }
    { // Powers: cube volume in a packing context
      const side = 2 + (n%8);
      add('powers','word_probs',n,
        `A cube-shaped storage box has an inside edge of <b>${side} cm</b>. How many <b>1 cm³</b> cubes can fit inside it?`, side**3,
        'Volume of a cube = side × side × side.',
        `Volume = ${side}³ = ${side} × ${side} × ${side} = <b>${side**3} cm³</b>.`);
    }
    { // Average: reconstruct one missing score
      const mean = 18+n, x1=mean-4, x2=mean+3, x3=mean-2, x4=mean+1, missing=mean*5-x1-x2-x3-x4;
      add('average','missing',n,
        `Five pupils have an average score of <b>${mean}</b>. Four scores are <b>${x1}, ${x2}, ${x3}</b> and <b>${x4}</b>. What is the fifth score?`, missing,
        'Average × number of pupils gives the total score. Subtract the four known scores.',
        `Required total = ${mean} × 5 = ${mean*5}. Known total = ${x1+x2+x3+x4}. Missing score = <b>${missing}</b>.`);
    }
    { // Ratio: divide an amount and then find a difference
      const r1=2+(n%4), r2=3+(n%5), unit=4+n, total=(r1+r2)*unit;
      add('ratio','word_probs',n,
        `Red and yellow flowers are planted in the ratio <b>${r1} : ${r2}</b>. There are <b>${total}</b> flowers altogether. How many more yellow flowers than red flowers are there?`, (r2-r1)*unit,
        'Find one ratio part, then find both shares and compare them.',
        `Total parts = ${r1+r2}. One part = ${total} ÷ ${r1+r2} = ${unit}. Difference = (${r2} − ${r1}) × ${unit} = <b>${(r2-r1)*unit}</b>.`);
    }
    { // Percentage: discount and sale price
      const prices=[240,320,480,600,800], p=prices[n%prices.length], rates=[10,15,20,25][n%4], discount=p*rates/100;
      add('percentage','word_probs',n,
        `A sports shop gives a <b>${rates}%</b> discount on a bag priced at <b>Rs ${p}</b>. What is the sale price?`, p-discount,
        `Find ${rates}% of Rs ${p}, then subtract that discount from the original price.`,
        `Discount = ${rates}/100 × ${p} = Rs ${discount}. Sale price = ${p} − ${discount} = <b>Rs ${p-discount}</b>.`);
    }
    { // Length: perimeter and conversion to centimetres
      const l=8+n, w=5+(n%7), perim=2*(l+w);
      add('length','word_probs',n,
        `A rectangular garden is <b>${l} m</b> long and <b>${w} m</b> wide. A ribbon goes twice around its boundary. What ribbon length is needed in centimetres?`, perim*2*100,
        'Find one perimeter, double it, then convert metres to centimetres.',
        `Perimeter = 2 × (${l}+${w}) = ${perim} m. Twice around = ${perim*2} m = <b>${perim*200} cm</b>.`);
    }
    { // Area: remove a rectangular bed from a rectangular lawn
      const l=10+n, w=7+(n%6), bl=2+(n%4), bw=2+(n%3), left=l*w-bl*bw;
      add('area','word_probs',n,
        `A lawn is <b>${l} m</b> by <b>${w} m</b>. A flower bed measuring <b>${bl} m</b> by <b>${bw} m</b> is made inside it. What area of lawn remains?`, left,
        'Find the large rectangle area and subtract the flower-bed area.',
        `Lawn = ${l} × ${w} = ${l*w} m². Bed = ${bl} × ${bw} = ${bl*bw} m². Remaining = <b>${left} m²</b>.`);
    }
    { // Capacity: convert L/mL then fill equal bottles
      const litres=12+n, used=250*(1+(n%4)), bottle=500;
      add('capacity','word_probs',n,
        `A canteen has <b>${litres} L</b> of juice. It uses <b>${used} mL</b> for tasting, then fills the rest into <b>${bottle} mL</b> bottles. How many full bottles can it fill?`, (litres*1000-used)/bottle,
        'Convert litres to millilitres, subtract the amount used, then divide by 500 mL.',
        `${litres} L = ${litres*1000} mL. Remaining = ${litres*1000} − ${used} = ${litres*1000-used} mL. Bottles = <b>${(litres*1000-used)/bottle}</b>.`);
    }
    { // Mass: received, sold and converted to grams
      const bags=4+(n%6), kg=2+n/2, sold=1+n/4, remaining=bags*kg-sold;
      add('mass','word_probs',n,
        `A grocer receives <b>${bags}</b> sacks of flour weighing <b>${kg.toFixed(1)} kg</b> each. She sells <b>${sold.toFixed(2)} kg</b>. What mass remains in grams?`, Math.round(remaining*1000),
        'Find the total mass in kg, subtract what was sold, then multiply by 1,000.',
        `Received = ${bags} × ${kg.toFixed(1)} = ${(bags*kg).toFixed(2)} kg. Remaining = ${(bags*kg).toFixed(2)} − ${sold.toFixed(2)} = ${remaining.toFixed(2)} kg = <b>${Math.round(remaining*1000)} g</b>.`);
    }
    { // Money: total profit from a batch
      const items=20+n, buy=45+2*n, sell=buy+12+(n%5), profit=items*(sell-buy);
      add('money','word_probs',n,
        `A vendor buys <b>${items}</b> lunch boxes for <b>Rs ${buy}</b> each and sells every one for <b>Rs ${sell}</b>. What total profit does the vendor make?`, profit,
        'Find profit on one item, then multiply it by the number sold.',
        `Profit per box = ${sell} − ${buy} = Rs ${sell-buy}. Total profit = ${items} × ${sell-buy} = <b>Rs ${profit.toLocaleString('en-GB')}</b>.`);
    }
    { // Time: duration across an hour boundary, numeric minutes
      const startH=8+(n%5), startM=15+(n%3)*10, duration=75+5*n, end=startH*60+startM+duration;
      add('time','duration',n,
        `A workshop starts at <b>${String(startH).padStart(2,'0')}:${String(startM).padStart(2,'0')}</b> and lasts <b>${duration}</b> minutes. At what 24-hour time does it end? Give your answer as HH:MM.`, `${String(Math.floor(end/60)).padStart(2,'0')}:${String(end%60).padStart(2,'0')}`,
        'Add the duration to the starting time. Remember that 60 minutes make one hour.',
        `${String(startH).padStart(2,'0')}:${String(startM).padStart(2,'0')} + ${duration} minutes = <b>${String(Math.floor(end/60)).padStart(2,'0')}:${String(end%60).padStart(2,'0')}</b>.`);
    }
    { // Graphs: weighted frequency-table total
      const f1=4+n, f2=6+(n%5), f3=3+(n%6), total=f1+2*f2+3*f3;
      add('graphs','frequency',n,
        `A table shows pupils choosing fruit: <b>${f1}</b> pupils choose 1 fruit, <b>${f2}</b> choose 2 fruits and <b>${f3}</b> choose 3 fruits. How many fruits are chosen altogether?`, total,
        'Multiply each number of fruits by the number of pupils, then add.',
        `Total = 1×${f1} + 2×${f2} + 3×${f3} = ${f1}+${2*f2}+${3*f3} = <b>${total}</b> fruits.`);
    }
    { // Conversions: combine m and cm then make equal cuts
      const metres=2+n, cm=15+(n%6)*10, pieces=5+(n%5);
      const baseCm=metres*100+cm, totalCm=Math.ceil((baseCm+125+5*n)/pieces)*pieces;
      const extra=totalCm-baseCm, each=totalCm/pieces;
      add('conversions','mixed',n,
        `A ribbon is <b>${metres} m ${cm} cm</b> long. Another <b>${extra} cm</b> piece is joined to it. The ribbon is cut equally into <b>${pieces}</b> pieces. How long is each piece in centimetres?`, each,
        'Convert the first length to centimetres, add the extra length, then divide equally.',
        `${metres} m ${cm} cm = ${metres*100+cm} cm. Total = ${metres*100+cm}+${extra} = ${totalCm} cm. Each piece = <b>${each} cm</b>.`);
    }
  }
})();

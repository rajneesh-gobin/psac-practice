'use strict';
// Question families for grade9-social-modern-studies. The pack held 365 items,
// all MCQ, and not one at L4 - so an exam paper could not draw a challenge item
// and a pupil was never asked to PRODUCE an answer, only to pick one. Each
// family shares one context and moves the thinking: read it, reverse it, judge
// a claim against it, decide what is missing. Roughly half are typed or
// calculated answers, and the three figures are inline SVG so they cannot 404.
(function () {

const svgOpen = (w, h, label) =>
  '<svg viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" role="img" aria-label="' + label + '">' +
  '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="#ffffff"/>';

// ── Figure 1: arrivals by year, read against a labelled scale ──────────────
const ARRIVALS = (() => {
  const data = [['2019', 1400], ['2020', 300], ['2021', 200], ['2022', 1000], ['2023', 1300]];
  const y = v => 180 - v * 160 / 1400;
  let g = svgOpen(320, 220, 'a bar chart of visitor arrivals for five years');
  g += '<text x="8" y="13" font-size="10" fill="#334155">Tourist arrivals in Mauritius (thousands)</text>';
  for (let v = 100; v < 1400; v += 200) {
    g += '<line x1="48" y1="' + y(v).toFixed(1) + '" x2="308" y2="' + y(v).toFixed(1) +
         '" stroke="#e2e8f0" stroke-width="1"/>';
  }
  for (let v = 0; v <= 1400; v += 200) {
    g += '<line x1="48" y1="' + y(v).toFixed(1) + '" x2="308" y2="' + y(v).toFixed(1) +
         '" stroke="#cbd5e1" stroke-width="1"/>';
    g += '<text x="44" y="' + (y(v) + 3).toFixed(1) +
         '" font-size="9" text-anchor="end" fill="#334155">' + v + '</text>';
  }
  data.forEach((d, i) => {
    const x = 56 + i * 52;
    g += '<rect x="' + x + '" y="' + y(d[1]).toFixed(1) + '" width="32" height="' +
         (180 - y(d[1])).toFixed(1) + '" fill="#93c5fd" stroke="#0f172a" stroke-width="1.5"/>';
    g += '<text x="' + (x + 16) + '" y="195" font-size="9" text-anchor="middle" fill="#334155">' +
         d[0] + '</text>';
  });
  g += '<line x1="48" y1="180" x2="308" y2="180" stroke="#0f172a" stroke-width="2"/>';
  g += '<line x1="48" y1="20" x2="48" y2="180" stroke="#0f172a" stroke-width="2"/>';
  return g + '</svg>';
})();

// ── Figure 2: an age-sex pyramid, every bar on a 25-unit tick ──────────────
const PYRAMID = (() => {
  const rows = [['75+', 25, 50], ['60–74', 75, 100], ['45–59', 100, 100],
                ['30–44', 150, 150], ['15–29', 125, 125], ['0–14', 100, 100]];
  const px = v => v * 130 / 150;
  let g = svgOpen(340, 230, 'a population pyramid with a bar for each age group');
  g += '<text x="6" y="14" font-size="10" fill="#334155">Population by age group (thousands)</text>';
  g += '<text x="70" y="28" font-size="9" text-anchor="middle" fill="#334155">Males</text>';
  g += '<text x="170" y="28" font-size="9" text-anchor="middle" fill="#334155">Age</text>';
  g += '<text x="270" y="28" font-size="9" text-anchor="middle" fill="#334155">Females</text>';
  rows.forEach((r, i) => {
    const yy = 36 + i * 26;
    g += '<rect x="' + (140 - px(r[1])).toFixed(1) + '" y="' + yy + '" width="' + px(r[1]).toFixed(1) +
         '" height="22" fill="#bfdbfe" stroke="#0f172a" stroke-width="1.2"/>';
    g += '<rect x="200" y="' + yy + '" width="' + px(r[2]).toFixed(1) +
         '" height="22" fill="#fbcfe8" stroke="#0f172a" stroke-width="1.2"/>';
    g += '<text x="170" y="' + (yy + 15) + '" font-size="9" text-anchor="middle" fill="#334155">' +
         r[0] + '</text>';
  });
  g += '<line x1="10" y1="192" x2="330" y2="192" stroke="#0f172a" stroke-width="1.5"/>';
  [0, 50, 100, 150].forEach(v => {
    [140 - px(v), 200 + px(v)].forEach(x => {
      g += '<line x1="' + x.toFixed(1) + '" y1="188" x2="' + x.toFixed(1) +
           '" y2="196" stroke="#0f172a" stroke-width="1.2"/>';
      g += '<text x="' + x.toFixed(1) +
           '" y="206" font-size="8" text-anchor="middle" fill="#334155">' + v + '</text>';
    });
  });
  g += '<text x="170" y="222" font-size="8" text-anchor="middle" fill="#334155">thousands</text>';
  return g + '</svg>';
})();

// ── Figure 3: a cyclone track on a latitude and longitude grid ─────────────
const TRACK = (() => {
  const x = lon => 40 + (lon - 54) * 24;
  const y = lat => 40 + (lat - 14) * 20;
  const pts = [[10, 16, 62], [12, 18, 60], [14, 20, 58], [16, 22, 56]];
  let g = svgOpen(300, 260, 'a track map drawn on a grid of latitude and longitude');
  g += '<text x="6" y="14" font-size="10" fill="#334155">Track of a cyclone, 10 to 16 January</text>';
  g += '<text x="6" y="28" font-size="8" fill="#334155">Dots show the centre of the cyclone; the square is Mauritius</text>';
  for (let lon = 54; lon <= 64; lon++) {
    const major = lon % 2 === 0;
    g += '<line x1="' + x(lon) + '" y1="40" x2="' + x(lon) + '" y2="240" stroke="' +
         (major ? '#cbd5e1' : '#eef2f6') + '" stroke-width="1"/>';
    if (major) g += '<text x="' + x(lon) + '" y="254" font-size="8" text-anchor="middle" fill="#334155">' +
      lon + '°E</text>';
  }
  for (let lat = 14; lat <= 24; lat++) {
    const major = lat % 2 === 0;
    g += '<line x1="40" y1="' + y(lat) + '" x2="280" y2="' + y(lat) + '" stroke="' +
         (major ? '#cbd5e1' : '#eef2f6') + '" stroke-width="1"/>';
    if (major) g += '<text x="36" y="' + (y(lat) + 3) + '" font-size="8" text-anchor="end" fill="#334155">' +
      lat + '°S</text>';
  }
  g += '<polyline points="' + pts.map(p => x(p[2]) + ',' + y(p[1])).join(' ') +
       '" fill="none" stroke="#b91c1c" stroke-width="2"/>';
  pts.forEach(p => {
    g += '<circle cx="' + x(p[2]) + '" cy="' + y(p[1]) + '" r="4" fill="#b91c1c"/>';
    g += '<text x="' + (x(p[2]) + 8) + '" y="' + (y(p[1]) + 3) +
         '" font-size="8" fill="#334155">' + p[0] + ' Jan</text>';
  });
  g += '<rect x="119" y="159" width="10" height="10" fill="#0f172a"/>';
  g += '<text x="118" y="180" font-size="8" text-anchor="end" fill="#0f172a">Mauritius</text>';
  return g + '</svg>';
})();

const DENSITY_TABLE =
  '<table class="q-table"><tr><th>District</th><th>Population</th><th>Area</th></tr>' +
  '<tr><td>Port Louis</td><td>129 000</td><td>43 km²</td></tr>' +
  '<tr><td>Plaines Wilhems</td><td>360 000</td><td>200 km²</td></tr>' +
  '<tr><td>Savanne</td><td>70 000</td><td>250 km²</td></tr></table>' +
  '<i>Figures are rounded.</i>';

STATIC_QUESTIONS.push(

  // ══ Family 001 — district density from a table ═══════════════════════════
  makeNum({ id:'g9sms-fam-001-a', chapterId:'g9sms-population', subsection:'density_distribution', difficulty:2,
    question:'Study the table.' + DENSITY_TABLE +
      'Calculate the population <b>density</b> of Savanne, in people per km².',
    answer:280,
    hint:'Density is population divided by area.',
    explanation:'70 000 ÷ 250 = <b>280 people per km²</b>. The usual mistake is to divide the area by the population, which gives a tiny decimal and no sensible meaning. Density is always <i>people ÷ km²</i>, so the answer must be a number of people.' }),

  makeText({ id:'g9sms-fam-001-b', chapterId:'g9sms-population', subsection:'density_distribution', difficulty:3,
    question:'Study the table.' + DENSITY_TABLE +
      'Which district is the <b>most densely populated</b>? Write its name.',
    answer:'Port Louis', alsoAccept:['Port-Louis','portlouis'],
    hint:'Work out people per km² for each district before comparing them.',
    explanation:'Port Louis: 129 000 ÷ 43 = 3 000/km². Plaines Wilhems: 360 000 ÷ 200 = 1 800/km². Savanne: 70 000 ÷ 250 = 280/km². <b>Port Louis</b> is the densest. The misconception is to answer Plaines Wilhems because its population is the largest — a large population spread over a large area is not crowded. Always divide before you compare.' }),

  makeNum({ id:'g9sms-fam-001-c', chapterId:'g9sms-population', subsection:'density_distribution', difficulty:3,
    question:'The district of Moka covers about 230 km² and has a population density of about 360 people per km². About how many people live in Moka?',
    answer:82800,
    hint:'Density × area gives the population back.',
    explanation:'360 × 230 = <b>82 800 people</b>. The misconception is to divide, because density questions usually involve division. Check which quantity is missing first: here the population is unknown, so the two known figures are multiplied.' }),

  makeMCQ({ id:'g9sms-fam-001-d', chapterId:'g9sms-population', subsection:'density_distribution', difficulty:4,
    question:'Study the table.' + DENSITY_TABLE +
      'A pupil writes: <i>"Plaines Wilhems has the largest population, so its people live more crowded together than anywhere else."</i> Which response is correct?',
    options:['No — it works out at 1 800 per km², below one other district',
             'Yes — the largest population means the most crowded district',
             'No — Savanne is the most crowded, as it covers the most land',
             'No — crowding cannot be judged without the number of houses'],
    answer:'No — it works out at 1 800 per km², below one other district',
    hint:'Test the claim by working out each density from the table.',
    explanation:'Port Louis is 129 000 ÷ 43 = <b>3 000/km²</b> and Plaines Wilhems 360 000 ÷ 200 = 1 800/km². The pupil has confused <b>total population</b> with <b>density</b>. Population alone says nothing about crowding until it is divided by the area it is spread over.' }),

  makeMCQ({ id:'g9sms-fam-001-e', chapterId:'g9sms-population', subsection:'density_distribution', difficulty:4,
    question:'Study the table.' + DENSITY_TABLE +
      'A ministry must decide which district most needs new <b>primary school places</b>. Which further information does it still need?',
    options:['The number of children aged 5 to 11 in each district',
             'The area in square kilometres of each district',
             'The population density of each district per km²',
             'The total number of people living in each district'],
    answer:'The number of children aged 5 to 11 in each district',
    hint:'Three of the four are already in the table or can be worked out from it.',
    explanation:'Area and population are printed, and density can be calculated from them — so only the <b>number of children of primary age</b> is missing. The misconception is that a big or crowded district automatically needs more schools; a district can be crowded with adults and elderly people. Before deciding, ask what the decision is actually about.' }),

  // ══ Family 002 — reading a bar chart of arrivals ══════════════════════════
  makeNum({ id:'g9sms-fam-002-a', chapterId:'g9sms-map-data-skills', subsection:'graph_reading', difficulty:2,
    question:'Study the bar chart.' + ARRIVALS +
      'How many <b>thousand</b> more tourists arrived in 2022 than in 2021?',
    answer:800,
    hint:'Read both bars against the scale, then subtract.',
    explanation:'2022 is 1 000 thousand and 2021 is 200 thousand, so the difference is <b>800 thousand</b>. The misconception is to add the two bars because both are being used. "How many more" is always a subtraction: the later value minus the earlier one.' }),

  makeNum({ id:'g9sms-fam-002-b', chapterId:'g9sms-map-data-skills', subsection:'graph_reading', difficulty:3,
    question:'Study the bar chart.' + ARRIVALS +
      'In which year shown did arrivals <b>fall by the largest number</b> compared with the year before? Write the year.',
    answer:2020,
    hint:'A fall is the drop from one bar to the next, not the height of a bar.',
    explanation:'From 2019 to <b>2020</b> arrivals fell 1 400 → 300, a drop of 1 100 thousand. From 2020 to 2021 they fell only 100 thousand. The misconception is to answer 2021 because it is the shortest bar — the lowest value is not the largest fall. Compare each bar with the one before it.' }),

  makeMCQ({ id:'g9sms-fam-002-c', chapterId:'g9sms-map-data-skills', subsection:'graph_reading', difficulty:4,
    question:'Study the bar chart.' + ARRIVALS +
      'A hotel manager says: <i>"Arrivals have risen every year since 2020, so by 2024 they will pass the 2019 level."</i> Which is the best evaluation?',
    options:['Wrong: arrivals fell from 2020 to 2021, so the rise begins in 2022',
             'Right: each bar after 2019 is taller than the bar just before it',
             'Right: 2023 is close to the 2019 level, so 2024 will pass it too',
             'Cannot be judged: a bar chart never shows change over time'],
    answer:'Wrong: arrivals fell from 2020 to 2021, so the rise begins in 2022',
    hint:'Check the claim bar by bar before judging the prediction.',
    explanation:'2020 is 300 and 2021 is 200, so arrivals <b>fell</b> in 2021. The manager has read a general upward shape and assumed it holds for every step. Test a claim about "every year" against every pair of bars, not against the overall impression.' }),

  makeNum({ id:'g9sms-fam-002-d', chapterId:'g9sms-map-data-skills', subsection:'graph_reading', difficulty:3,
    question:'Study the bar chart.' + ARRIVALS +
      'By what <b>percentage</b> did arrivals increase from 2021 to 2022? Give the number only.',
    answer:400,
    hint:'Percentage increase compares the rise with the starting value.',
    explanation:'The rise is 1 000 − 200 = 800, and 800 ÷ 200 = 4, so the increase is <b>400%</b>. The common mistake is 1 000 ÷ 200 = 500%, which is the new figure as a percentage of the old one, not the increase. The increase is always <i>rise ÷ original × 100</i>.' }),

  // ══ Family 003 — the 1970 export zone against import substitution ═════════
  makeText({ id:'g9sms-fam-003-a', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:2,
    question:'An Act of 1970 created a zone in which Mauritian factories produced goods <b>only for export</b>, importing their materials free of duty. Give the three-letter abbreviation for this zone.',
    answer:'EPZ', alsoAccept:['E.P.Z.','Export Processing Zone','Export Processing Zones'],
    hint:'Export … Processing … Zone.',
    explanation:'The <b>EPZ</b>, the Export Processing Zone, was created by the Export Processing Zones Act of 1970. Pupils often write ISI here: import substitution was the earlier and opposite policy, making goods for the home market behind tariffs.' }),

  makeText({ id:'g9sms-fam-003-b', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:2,
    question:'Which manufacturing industry employed the largest number of workers in the Mauritian export zone during the 1970s and 1980s? Answer in one word.',
    answer:'textiles', alsoAccept:['textile','clothing','garments','garment','textile industry','clothing industry'],
    hint:'It made shirts, pullovers and other clothing for European shops.',
    explanation:'<b>Textiles</b> and clothing dominated the zone and employed tens of thousands, most of them women. Pupils sometimes answer "sugar": sugar is agriculture and processing, and it was the sector the zone was meant to reduce dependence on.' }),

  makeMCQ({ id:'g9sms-fam-003-c', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:3,
    question:'A pupil writes: <i>"The export zone succeeded because it protected local factories from foreign competition."</i> What is the error in this sentence?',
    options:['Protection was the import-substitution policy, not the export zone',
             'There is no error; the export zone raised tariffs on all imports',
             'The error is the date; protection of factories began only in 1990',
             'Protection was applied to sugar exports, never to any factory'],
    answer:'Protection was the import-substitution policy, not the export zone',
    hint:'Which policy sold to Mauritians, and which sold abroad?',
    explanation:'Import substitution protected home producers with tariffs so Mauritians would buy local goods. The export zone did the opposite: it let firms import materials <b>duty free</b> and sell abroad. The misconception is treating the two policies as one because both aimed at industry; they face opposite markets.' }),

  makeMCQ({ id:'g9sms-fam-003-d', chapterId:'g9sms-industrialisation', subsection:'import_substitution', difficulty:4,
    question:'In 1970 Mauritius had high unemployment and fewer than a million people at home. A minister argues for extending <b>import substitution</b> instead of opening an export zone. What is the strongest objection to his plan?',
    options:['Factories selling only at home reach too few buyers to grow',
             'Local factories cannot be built without imported machinery',
             'Import substitution was forbidden by the sugar agreements',
             'Sugar workers would have refused to move into factory jobs'],
    answer:'Factories selling only at home reach too few buyers to grow',
    hint:'Ask how many customers each policy can reach.',
    explanation:'The size of the home market is the limit: a factory selling only to Mauritians runs out of customers long before it has employed the unemployed. Exporting puts the same factory in front of millions of buyers. The misconception is judging a policy by whether it is popular rather than by the <b>constraint</b> it must overcome.' }),

  makeNum({ id:'g9sms-fam-003-e', chapterId:'g9sms-industrialisation', subsection:'epz_incentives', difficulty:3,
    question:'An export-zone factory imports cloth worth Rs 60 for each shirt, free of duty, and sells the finished shirt abroad for Rs 150. On an order of 4 000 shirts, what is the total <b>value added</b> in Mauritius, in rupees?',
    answer:360000,
    hint:'Value added is what the country adds to the imported material.',
    explanation:'Each shirt adds 150 − 60 = Rs 90, and 90 × 4 000 = <b>Rs 360 000</b>. The misconception is to multiply the selling price by the quantity (Rs 600 000) and call that the gain to Mauritius — most of that money pays for imported cloth. Subtract the imported value first.' }),

  // ══ Family 004 — regional membership and duty-free access ════════════════
  makeText({ id:'g9sms-fam-004-a', chapterId:'g9sms-links', subsection:'regional_organisations', difficulty:2,
    question:'COMESA is one of the regional bodies Mauritius belongs to. Complete its name: the Common Market for Eastern and Southern ______.',
    answer:'Africa', alsoAccept:['African states'],
    hint:'Its members stretch from the north-east of the continent to the south.',
    explanation:'COMESA is the Common Market for Eastern and Southern <b>Africa</b>. Pupils often answer "Asia" because Mauritius trades heavily with India; the Indian link is real, but COMESA is an African body and Mauritius belongs to SADC as well.' }),

  makeMCQ({ id:'g9sms-fam-004-b', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:3,
    question:'Mauritius has no oil, no minerals and very little land, yet it belongs to more trade organisations than several far larger states. Which explanation best fits both facts?',
    options:['A small producer gains most from duty-free entry to big markets',
             'Membership is granted automatically to every island in a region',
             'These organisations pay their smallest members a yearly subsidy',
             'Only countries without minerals are permitted to join such bodies'],
    answer:'A small producer gains most from duty-free entry to big markets',
    hint:'Ask what a small country cannot supply from inside its own borders.',
    explanation:'A small economy cannot grow on its own customers, so agreements that remove duty on its exports matter more to it than to a large state with a big home market. The misconception is that membership is a reward for size or wealth; it is a <b>strategy</b> chosen because of smallness.' }),

  makeNum({ id:'g9sms-fam-004-c', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
    question:'A Mauritian firm has 500 identical garments to sell and two offers. A buyer in a COMESA country pays Rs 400 each, with no duty. A buyer outside the agreement pays Rs 500 each, but a duty of 15% of that price is deducted before the firm is paid. How many rupees <b>more</b> does the better offer bring in?',
    answer:12500,
    hint:'Work out what the firm actually keeps per garment under each offer.',
    explanation:'COMESA: 500 × Rs 400 = Rs 200 000. Outside: each garment keeps 500 − 15% = Rs 425, so 500 × 425 = Rs 212 500. The difference is <b>Rs 12 500</b> in favour of the buyer outside the agreement. The misconception is that duty-free access always wins; a higher price can outweigh a duty, so the comparison must be made on what is <b>kept</b>, not on the duty rate.' }),

  makeMCQ({ id:'g9sms-fam-004-d', chapterId:'g9sms-links', subsection:'benefits_of_membership', difficulty:4,
    question:'A Mauritian firm can sell a garment to a COMESA buyer for Rs 400 with no duty, or to a buyer outside the agreement for Rs 500, from which a 15% duty is deducted before the firm is paid. Which change would make the <b>COMESA</b> offer the better one?',
    options:['The non-member price falls to Rs 460, leaving Rs 391 net',
             'The duty on the non-member sale falls from 15% to 10%',
             'Transport to both markets costs Rs 20 more per garment',
             'The non-member buyer raises its price to Rs 520 a garment'],
    answer:'The non-member price falls to Rs 460, leaving Rs 391 net',
    hint:'Only a change that lowers what the non-member sale keeps can matter.',
    explanation:'Rs 460 less 15% leaves Rs 391, which is below the Rs 400 kept from the COMESA sale. A smaller duty or a higher price makes the non-member offer better still, and a cost that falls on both markets equally changes nothing. The misconception is treating <b>any</b> change as relevant; only what alters the difference between the two options counts.' }),

  // ══ Family 005 — VAT, the MRA and who really pays ════════════════════════
  makeText({ id:'g9sms-fam-005-a', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:2,
    question:'Which authority collects income tax and VAT on behalf of the State in Mauritius? Give its three-letter abbreviation.',
    answer:'MRA', alsoAccept:['M.R.A.','Mauritius Revenue Authority','the Mauritius Revenue Authority'],
    hint:'Mauritius … Revenue … Authority.',
    explanation:'The <b>MRA</b>, the Mauritius Revenue Authority, collects the taxes that pay for free health care, free education and the pension. Pupils sometimes name the Ministry of Finance: the Ministry decides the rates in the Budget, but the MRA collects.' }),

  makeNum({ id:'g9sms-fam-005-b', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:2,
    question:'A shop sells a gas cooker priced at Rs 2 300 <b>before</b> VAT. VAT is charged at 15%. How much VAT, in rupees, is added?',
    answer:345,
    hint:'15% of the price before VAT.',
    explanation:'15% of 2 300 = <b>Rs 345</b>, giving Rs 2 645 to pay. The misconception is to work out 15% of the final amount instead of the price before tax; take care to notice which of the two prices the question gives you.' }),

  makeMCQ({ id:'g9sms-fam-005-c', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:4,
    question:'A pupil argues: <i>"VAT is fairer than income tax, because every shopper pays exactly the same 15%."</i> Which is the strongest argument against this?',
    options:['A poor family spends all it earns, so VAT takes a larger share',
             'Only companies pay income tax, so VAT is the fairer of the two',
             'Shops keep the VAT they collect instead of passing it to the MRA',
             'VAT is not a real tax because it is hidden in the shelf price'],
    answer:'A poor family spends all it earns, so VAT takes a larger share',
    hint:'Compare the tax with what each household earns, not with the price.',
    explanation:'A family that must spend every rupee it earns pays VAT on almost all of its income, while a richer family that saves part of its income pays VAT on only the part it spends. The same <b>rate</b> is therefore not the same <b>burden</b>. The misconception is judging fairness from the rate alone.' }),

  makeNum({ id:'g9sms-fam-005-d', chapterId:'g9sms-government-welfare', subsection:'taxes_and_mra', difficulty:3,
    question:'A receipt shows a total of Rs 4 600, and states that this <b>includes</b> VAT at 15%. How much of the Rs 4 600 is VAT?',
    answer:600,
    hint:'The Rs 4 600 is 115% of the price before VAT.',
    explanation:'4 600 ÷ 1.15 = Rs 4 000 before VAT, so the VAT is 4 600 − 4 000 = <b>Rs 600</b>. The misconception is to take 15% of Rs 4 600, which gives Rs 690 — that treats the total as if it were the pre-tax price. When a price <i>includes</i> tax, divide first.' }),

  // ══ Family 006 — a message, a bulletin and who checked it ════════════════
  makeText({ id:'g9sms-fam-006-a', chapterId:'g9sms-media', subsection:'types_of_media', difficulty:2,
    question:'Messages and videos shared by users on platforms such as Facebook and WhatsApp belong to which type of media? Answer in two words.',
    answer:'social media', alsoAccept:['new media','digital media','online media','new age digital media','social network'],
    hint:'The users themselves produce and pass on the content.',
    explanation:'These are <b>social media</b> (also called new age digital media): the audience is also the publisher. Pupils sometimes answer "print media" because a post contains writing — print media means material printed on paper, such as a newspaper.' }),

  makeMCQ({ id:'g9sms-fam-006-b', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:3,
    question:'A warning about a cyclone spreads rapidly in messages forwarded from phone to phone, and turns out to be false. A pupil says: <i>"A post is a media report, just like the one in the newspaper."</i> Which difference matters most here?',
    options:['A newspaper report is checked by an editor who answers for it',
             'A newspaper is printed on paper, so its words cannot be altered',
             'A newspaper reaches far more readers than any post can reach',
             'A newspaper is written by adults and a post usually is not'],
    answer:'A newspaper report is checked by an editor who answers for it',
    hint:'Ask who is responsible if the report turns out to be untrue.',
    explanation:'Both carry information, but a newspaper passes through an <b>editor</b> and the paper can be held to account for what it prints; a forwarded post has no such check. The misconception is that reaching many people makes a message reliable — speed and reach say nothing about accuracy.' }),

  makeMCQ({ id:'g9sms-fam-006-c', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:4,
    question:'Two accounts of one road accident appear on the same morning: a radio bulletin quoting the police, and a video filmed by a passer-by whose caption states what caused the crash. Which is the best judgement?',
    options:['The video shows the scene, but its caption is the poster\'s view',
             'The video is the stronger evidence, because a camera cannot lie',
             'The radio bulletin is weaker, because it came after the video',
             'Both accounts are equally reliable, since both were published'],
    answer:'The video shows the scene, but its caption is the poster\'s view',
    hint:'Separate what the picture shows from what the words claim.',
    explanation:'The footage is evidence of what happened; the caption is an <b>inference</b> the poster has added, and the cause of a crash is established by the police. The misconception is treating a caption as part of the evidence. Ask of any media item: which part did I see, and which part was I told?' }),

  makeText({ id:'g9sms-fam-006-d', chapterId:'g9sms-media', subsection:'roles_of_media', difficulty:3,
    question:'A Mauritian newspaper publishes an article criticising a government ministry. Name the freedom, protected by the Constitution, that allows it to do so.',
    answer:'freedom of expression', alsoAccept:['freedom of speech','freedom of the press','press freedom','expression'],
    hint:'The Constitution protects it for every citizen, not only for journalists.',
    explanation:'<b>Freedom of expression</b> — often called freedom of the press when a newspaper exercises it — is a fundamental right in the Constitution, and it is what allows the media to act as a watchdog. Pupils sometimes answer "freedom of movement" or "the right to vote", which are different rights protected in the same chapter.' }),

  // ══ Family 007 — one household as it changes ═════════════════════════════
  makeText({ id:'g9sms-fam-007-a', chapterId:'g9sms-family', subsection:'family_types', difficulty:2,
    question:'Grandparents, their son and his wife, and their two children all live in one house. Which type of family is this? Answer in one word.',
    answer:'extended', alsoAccept:['extended family','joint','joint family','multi-generational'],
    hint:'More than two generations share the household.',
    explanation:'Three generations under one roof make an <b>extended</b> family. Pupils often answer "nuclear": a nuclear family is parents and their children only. The number of generations in the household is what separates the two.' }),

  makeMCQ({ id:'g9sms-fam-007-b', chapterId:'g9sms-family', subsection:'family_types', difficulty:3,
    question:'Grandparents, two parents and two young children share one house. The grandparents then move to a flat of their own nearby. What has the household become, and which task becomes harder?',
    options:['A nuclear family, and daytime care of the children',
             'A single-parent family, and paying the household bills',
             'A reconstituted family, and sharing out the cooking',
             'An extended family still, and keeping in touch by phone'],
    answer:'A nuclear family, and daytime care of the children',
    hint:'Count the generations left in the house after the move.',
    explanation:'Parents and children alone form a <b>nuclear</b> family, and the childcare the grandparents provided must now be arranged outside the home. The misconception is that an extended family stays extended because the relatives are still nearby — the family type describes who lives in the <b>household</b>, not who is related.' }),

  makeMCQ({ id:'g9sms-fam-007-c', chapterId:'g9sms-family', subsection:'women_at_work', difficulty:4,
    question:'Since the 1970s the share of Mauritian women in paid work has risen sharply, while the average household has grown smaller. A pupil concludes that women going out to work <b>caused</b> families to shrink. What is the best response?',
    options:['They changed together; smaller families also made work easier',
             'Correct, because the two changes happened at the same time',
             'Wrong, because no Mauritian woman worked for pay before 1970',
             'Wrong, because average household size has not changed at all'],
    answer:'They changed together; smaller families also made work easier',
    hint:'Ask whether the arrow of cause could point the other way as well.',
    explanation:'Two trends moving together is a <b>correlation</b>, not proof of cause: fewer children made paid work possible, factory jobs made smaller families attractive, and schooling and family planning affected both. The misconception is reading any pair of linked trends as one causing the other. Before claiming cause, ask which way the arrow points and what else changed.' }),

  makeText({ id:'g9sms-fam-007-d', chapterId:'g9sms-family', subsection:'family_functions', difficulty:3,
    question:'Parents teach their child the language, manners and customs of the community. Which <b>function of the family</b> is being carried out? Answer in one word.',
    answer:'socialisation', alsoAccept:['socialization','socialisation function','the socialisation function','socialising'],
    hint:'It is how a child learns the ways of the society around them.',
    explanation:'This is the <b>socialisation</b> function: the family is the first place a child learns how their society behaves. Pupils often answer "economic" because they picture the family providing; the economic function is about income, food and shelter, not about learning the culture.' }),

  // ══ Family 008 — the detachment of the Chagos Archipelago ════════════════
  makeNum({ id:'g9sms-fam-008-a', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:2,
    question:'In which year was the Chagos Archipelago detached from Mauritius by Britain, three years before independence? Write the year.',
    answer:1965,
    hint:'Independence came in 1968.',
    explanation:'The archipelago was detached in <b>1965</b> to form the British Indian Ocean Territory. Pupils often write 1968, the year of independence, or 1992, the year Mauritius became a republic. The detachment came first, and that is exactly why Mauritius disputes it.' }),

  makeMCQ({ id:'g9sms-fam-008-b', chapterId:'g9sms-chagos-tromelin', subsection:'chagos_history', difficulty:3,
    question:'Mauritius became independent in 1968, yet has always maintained that it never freely gave up the Chagos Archipelago. Which explanation fits both of these facts?',
    options:['It was detached while Mauritius was still a British colony',
             'It was sold to Britain by Mauritius soon after independence',
             'It was never a part of Mauritius under British administration',
             'It was handed to the United States by the Mauritian assembly'],
    answer:'It was detached while Mauritius was still a British colony',
    hint:'Who governed Mauritius at the moment the archipelago was detached?',
    explanation:'In 1965 Mauritius was not yet self-governing, and Mauritius argues that consent given by a colony negotiating its own independence is not freely given. The misconception is that an independent country must have agreed to any loss of territory; the decision here was taken <b>before</b> independence.' }),

  makeMCQ({ id:'g9sms-fam-008-c', chapterId:'g9sms-chagos-tromelin', subsection:'expulsion_and_icj', difficulty:4,
    question:'In 2019 the International Court of Justice gave an advisory opinion that the United Kingdom should end its administration of the Chagos Archipelago. A pupil says this means the islanders went home that same year. What is the best response?',
    options:['An advisory opinion states the law; it does not enforce a move',
             'The opinion covered Tromelin, so Chagos was not affected at all',
             'The islanders had already returned to their homes in the 1970s',
             'The court gave its opinion on fishing rights, not on the people'],
    answer:'An advisory opinion states the law; it does not enforce a move',
    hint:'What can a court do, and what still needs governments to act?',
    explanation:'An <b>advisory</b> opinion sets out what the law requires; it carries great weight but no bailiff, so a return depends on what states then negotiate and do. The misconception is that a court ruling changes the situation on the ground by itself. Distinguish a legal finding from its implementation.' }),

  makeText({ id:'g9sms-fam-008-d', chapterId:'g9sms-chagos-tromelin', subsection:'diego_garcia', difficulty:2,
    question:'Name the largest island of the Chagos Archipelago, on which a military base is used by the United States under an agreement with Britain.',
    answer:'Diego Garcia', alsoAccept:['Diego'],
    hint:'It carries a Spanish-sounding name of two words.',
    explanation:'<b>Diego Garcia</b> holds the base, which is the reason the archipelago was detached and the population removed. Pupils sometimes answer Tromelin: that is a separate small island claimed by both Mauritius and France, with no such base.' }),

  // ══ Family 009 — a cyclone track on a grid ═══════════════════════════════
  makeNum({ id:'g9sms-fam-009-a', chapterId:'g9sms-map-data-skills', subsection:'map_key_and_scale', difficulty:2,
    question:'Study the track map.' + TRACK +
      'On 12 January the centre of the cyclone lay on the 60°E line. How many <b>degrees of latitude south</b> was it?',
    answer:18,
    hint:'Read across from the dot to the numbered scale at the side.',
    explanation:'The 12 January dot sits on the <b>18°S</b> line. The misconception is to read the figure from the bottom scale, which gives longitude (60°E). Latitude is read on the side of a map, longitude along the bottom.' }),

  makeMCQ({ id:'g9sms-fam-009-b', chapterId:'g9sms-map-data-skills', subsection:'map_key_and_scale', difficulty:3,
    question:'Study the track map.' + TRACK +
      'In which direction did the centre of the cyclone travel between 10 and 16 January?',
    options:['South-west','North-east','Due south','Due west'],
    answer:'South-west',
    hint:'Latitude increases southwards and longitude decreases westwards here.',
    explanation:'The centre moved from 16°S to 22°S (southwards) and from 62°E to 56°E (westwards), so its track is <b>south-west</b>. The misconception is to call it "due south" after noticing only the latitude change; a direction needs both readings.' }),

  makeMCQ({ id:'g9sms-fam-009-c', chapterId:'g9sms-map-data-skills', subsection:'map_key_and_scale', difficulty:4,
    question:'Study the track map.' + TRACK +
      'On 14 January the centre passed about 50 km east of Mauritius. A pupil says the island was therefore not affected. What is the best judgement?',
    options:['Damaging winds reach far beyond the centre of a cyclone',
             'Correct, because damage occurs only under the eye itself',
             'Correct, because 50 km of open sea absorbs the strong winds',
             'Wrong, because a cyclone always turns towards the nearest land'],
    answer:'Damaging winds reach far beyond the centre of a cyclone',
    hint:'What does the dot on the map actually mark?',
    explanation:'The dots mark only the <b>centre</b>. A cyclone\'s destructive winds and rain extend for a hundred kilometres or more around it, which is why a warning is issued for the whole island rather than for a line on a map. The misconception is reading a track as the boundary of the storm.' }),

  makeNum({ id:'g9sms-fam-009-d', chapterId:'g9sms-map-data-skills', subsection:'map_key_and_scale', difficulty:3,
    question:'Study the track map.' + TRACK +
      'One degree of latitude is about 111 km. Between 10 January and 16 January, how many <b>km</b> further south did the centre move?',
    answer:666,
    hint:'First count the degrees of latitude between the two dots.',
    explanation:'From 16°S to 22°S is 6 degrees, and 6 × 111 = <b>666 km</b>. The misconception is to count the dots (four) instead of the degrees between them, or to use the longitude change; the question asks only how far <i>south</i>.' }),

  // ══ Family 010 — reading and using an age-sex pyramid ════════════════════
  makeNum({ id:'g9sms-fam-010-a', chapterId:'g9sms-population', subsection:'structure_pyramids', difficulty:2,
    question:'Study the population pyramid.' + PYRAMID +
      'How many <b>thousand females</b> are in the 60–74 age group?',
    answer:100,
    hint:'Measure the right-hand bar of that row against the scale below.',
    explanation:'The female bar for 60–74 reaches the <b>100</b> mark. The misconception is to read the male bar on the left, which reaches 75. On a pyramid, males are on one side and females on the other, and each side is read outwards from the centre.' }),

  makeNum({ id:'g9sms-fam-010-b', chapterId:'g9sms-population', subsection:'structure_pyramids', difficulty:3,
    question:'Study the population pyramid.' + PYRAMID +
      'How many <b>thousand</b> people of working age (15–59) does this population contain? Count both males and females.',
    answer:750,
    hint:'Three age bands make up the working-age group.',
    explanation:'15–29: 125 + 125 = 250. 30–44: 150 + 150 = 300. 45–59: 100 + 100 = 200. Total <b>750 thousand</b>. The misconception is to include the 0–14 band because many of them are at school and "not working" — working age is a defined band, and school pupils are counted as dependants.' }),

  makeMCQ({ id:'g9sms-fam-010-c', chapterId:'g9sms-population', subsection:'structure_pyramids', difficulty:3,
    question:'Study the population pyramid.' + PYRAMID +
      'Which feature of this pyramid is the evidence that the population is <b>ageing</b>?',
    options:['The 60 and over bands outnumber the under-15 band',
             'Women outnumber men in each of the two oldest bands',
             'The 75 and over band is the shortest of the six bands',
             'The male and female totals are almost the same in size'],
    answer:'The 60 and over bands outnumber the under-15 band',
    hint:'Compare the size of the oldest groups with the size of the youngest.',
    explanation:'The two oldest bands hold 175 + 75 = <b>250 thousand</b> against 200 thousand under 15, so the old already outnumber the young. The other three statements are also true readings of the chart, but they describe life expectancy and the balance of the sexes, not ageing. The misconception is to accept any true statement as evidence for the claim being tested — check that the reading is about age structure.' }),

  makeNum({ id:'g9sms-fam-010-d', chapterId:'g9sms-population', subsection:'structure_pyramids', difficulty:4,
    question:'Study the population pyramid.' + PYRAMID +
      'The <b>dependency ratio</b> is the number of dependants (under 15, and 60 and over) for every 100 people of working age (15–59). Calculate the dependency ratio for this population.',
    answer:60,
    hint:'Total the dependants, total the working age, then compare per 100.',
    explanation:'Dependants: 200 (0–14) + 175 (60–74) + 75 (75+) = 450. Working age: 250 + 300 + 200 = 750. 450 ÷ 750 × 100 = <b>60</b>. The misconception is to count only children as dependants and forget the two oldest bands, which understates the ratio badly in an ageing country.' }),

  makeMCQ({ id:'g9sms-fam-010-e', chapterId:'g9sms-population', subsection:'structure_pyramids', difficulty:4,
    question:'Study the population pyramid.' + PYRAMID +
      'A minister says: <i>"This chart shows we shall need more primary school places within five years."</i> Judge the claim.',
    options:['Wrong: the under-15 band is narrower than the 15–29 band',
             'Right: the under-15 band is wider than the 75 and over band',
             'Right: a population always grows, so more places are needed',
             'Wrong: the chart shows no births, so nothing can be judged'],
    answer:'Wrong: the under-15 band is narrower than the 15–29 band',
    hint:'The children of the next five years are already in the youngest band.',
    explanation:'The 0–14 band (200) is smaller than the 15–29 (250) and 30–44 (300) bands, so each new cohort is smaller than the last and school rolls will fall, not rise. The misconception is comparing the young with the <b>old</b> bands, which are small for a different reason. Compare a band with the ones that came before it.' }),

  // ══ Family 011 — the 1961 forecast and why it failed ═════════════════════
  makeText({ id:'g9sms-fam-011-a', chapterId:'g9sms-economy-1960s', subsection:'sugar_dependence', difficulty:2,
    question:'In 1961 the economist James Meade reported that Mauritius faced a bleak future because almost all of its export earnings came from a single crop. Name that crop.',
    answer:'sugar', alsoAccept:['sugar cane','sugarcane','cane'],
    hint:'It was grown on most of the cultivated land on the island.',
    explanation:'<b>Sugar</b> provided the great majority of export earnings, so a bad cyclone or a fall in the world price hit the whole country at once. Pupils sometimes answer "tea" or "tobacco": both were grown, but neither was the export the economy depended on.' }),

  makeMCQ({ id:'g9sms-fam-011-b', chapterId:'g9sms-economy-1960s', subsection:'obstacles', difficulty:3,
    question:'Which pair of conditions made economists so pessimistic about the future of Mauritius in the 1960s?',
    options:['A fast-growing population and exports of a single crop',
             'A shrinking population and a shortage of farming land',
             'A very large public debt and the closing of sugar mills',
             'A shortage of teachers and the ending of British rule'],
    answer:'A fast-growing population and exports of a single crop',
    hint:'Think of what was rising fast, and what the island had only one of.',
    explanation:'Rapid population growth meant more people to feed and employ each year, while one crop meant one source of earnings. The misconception is that the island was poor because it was small; small size was a constraint, but it was the <b>combination</b> of growth and dependence that looked hopeless.' }),

  makeMCQ({ id:'g9sms-fam-011-c', chapterId:'g9sms-economy-1960s', subsection:'predictions', difficulty:4,
    question:'The pessimistic forecast of the early 1960s proved wrong, and Mauritius grew strongly after 1970. Which explanation best accounts for that?',
    options:['The birth rate fell quickly and export factories created jobs',
             'The world sugar price rose enough to carry the whole economy',
             'Emigration to Britain reduced the population of the island',
             'Foreign aid replaced the need for the country to export goods'],
    answer:'The birth rate fell quickly and export factories created jobs',
    hint:'The forecast rested on two conditions. Ask what happened to each.',
    explanation:'Both conditions the forecast relied on changed: family planning and rising education brought the birth rate down, and the export zone created work outside sugar. The misconception is to look for a single lucky event. A prediction fails when its <b>assumptions</b> stop holding, so check each assumption in turn.' }),

  makeText({ id:'g9sms-fam-011-d', chapterId:'g9sms-economy-1960s', subsection:'early_measures', difficulty:2,
    question:'Give the ONE word for the policy of building up new industries and services so that a country no longer depends on a single product.',
    answer:'diversification', alsoAccept:['diversify','economic diversification','diversifying'],
    hint:'The opposite of putting all your eggs in one basket.',
    explanation:'<b>Diversification</b> is what took Mauritius from sugar alone to sugar, textiles, tourism and financial services. Pupils sometimes answer "industrialisation": building factories was one part of it, but diversification also covers tourism and services, which are not industry.' }),

  // ══ Family 012 — services at a distance: Rodrigues and Agalega ═══════════
  makeText({ id:'g9sms-fam-012-a', chapterId:'g9sms-outer-islands', subsection:'rodrigues', difficulty:2,
    question:'Name the elected body, set up in 2002, through which Rodrigues manages its own local affairs. Give its full name or its abbreviation.',
    answer:'Rodrigues Regional Assembly', alsoAccept:['RRA','Regional Assembly','the Rodrigues Regional Assembly','R.R.A.'],
    hint:'Its name says where it sits and what kind of body it is.',
    explanation:'The <b>Rodrigues Regional Assembly</b> gives the island autonomy over local matters while Rodrigues remains part of the Republic of Mauritius. Pupils sometimes answer "the National Assembly": that is the parliament of the whole Republic, sitting in Port Louis.' }),

  makeNum({ id:'g9sms-fam-012-b', chapterId:'g9sms-outer-islands', subsection:'rodrigues', difficulty:2,
    question:'Rodrigues has an area of about 110 km² and a population of about 44 000. Calculate its population density, in people per km².',
    answer:400,
    hint:'Density is population divided by area.',
    explanation:'44 000 ÷ 110 = <b>400 people per km²</b>, well below the figure for Mauritius as a whole. The misconception is that a small island must be crowded: density depends on both figures, and a small population on a small island can be thinly spread.' }),

  makeMCQ({ id:'g9sms-fam-012-c', chapterId:'g9sms-outer-islands', subsection:'services_and_access', difficulty:4,
    question:'A health budget for Rodrigues can pay either for a specialist doctor living on the island or for extra air-ambulance flights to Mauritius. Which consideration should decide between them?',
    options:['How often patients need care only a specialist can give',
             'Which of the two choices costs less in the first year',
             'Whether the airport can take a larger type of aircraft',
             'How many visitors come to Rodrigues during the winter'],
    answer:'How often patients need care only a specialist can give',
    hint:'A resident doctor is worth paying for only if the need is regular.',
    explanation:'A resident specialist is idle if such cases are rare, and flights are slow and costly if they are frequent — so the deciding figure is <b>how often</b> the need arises. The misconception is to choose the cheaper option in year one; the right criterion is which choice meets the need over time.' }),

  makeMCQ({ id:'g9sms-fam-012-d', chapterId:'g9sms-outer-islands', subsection:'agalega', difficulty:3,
    question:'Agalega now has a longer airstrip and a deeper jetty than before. Which service does this most directly make possible?',
    options:['Flying out an emergency case and landing bulk supplies',
             'Growing enough coconuts to supply the whole of Mauritius',
             'Giving the islands their own regional assembly and budget',
             'Building a university for the young people of the islands'],
    answer:'Flying out an emergency case and landing bulk supplies',
    hint:'Ask what a runway and a jetty physically allow.',
    explanation:'Before, Agalega depended on a ship arriving a few times a year, so a serious illness meant waiting. Better <b>access</b> changes that first. The misconception is that infrastructure by itself creates institutions or industries; a jetty does not make a university or an assembly.' }),

  // ══ Family 013 — one nurse moves, and what that movement is called ═══════
  makeText({ id:'g9sms-fam-013-a', chapterId:'g9sms-migration', subsection:'internal_international', difficulty:2,
    question:'A family moves from Souillac to Curepipe, both in Mauritius. Which type of migration is this? Answer in one word.',
    answer:'internal', alsoAccept:['internal migration','rural-urban','rural to urban','internal (rural-urban)'],
    hint:'No border is crossed.',
    explanation:'Moving within the same country is <b>internal</b> migration; crossing a border makes it international. Pupils sometimes answer "emigration", which means leaving one country to settle in another — nobody has left Mauritius here.' }),

  makeMCQ({ id:'g9sms-fam-013-b', chapterId:'g9sms-migration', subsection:'push_pull', difficulty:3,
    question:'A nurse leaves Souillac, where the clinic she worked in has closed, for Curepipe, where a new hospital has opened. Her old house had a large garden, and the journey between the towns is about 30 km. Which of these is a <b>pull</b> factor?',
    options:['The new hospital that has opened in Curepipe',
             'The closing of the clinic where she worked',
             'The large garden at her old house in Souillac',
             'The distance of about 30 km between the towns'],
    answer:'The new hospital that has opened in Curepipe',
    hint:'A pull factor is at the destination and attracts a person to it.',
    explanation:'A <b>pull</b> factor attracts someone to the new place; the closed clinic is a <b>push</b> factor driving her out of the old one. The garden and the distance are true details that affect neither. The misconception is treating every fact in a question as a factor: separate what pushes, what pulls, and what is simply background.' }),

  makeMCQ({ id:'g9sms-fam-013-c', chapterId:'g9sms-migration', subsection:'internal_international', difficulty:4,
    question:'A pupil claims that a country which loses more people to emigration than it gains from immigration <b>always</b> becomes poorer. Is this always, sometimes or never true?',
    options:['Sometimes — money sent home can offset the loss of workers',
             'Always — every person who leaves is one worker fewer',
             'Never — those who leave send back more than they earned',
             'Sometimes — but only if the emigrants return within a year'],
    answer:'Sometimes — money sent home can offset the loss of workers',
    hint:'Think about what emigrants send back, and about who leaves.',
    explanation:'Emigrants send remittances home and may return with new skills, but a country that loses its trained nurses or engineers can be badly weakened — so the outcome depends on <b>who</b> leaves and what flows back. The misconception is answering "always" because the claim sounds reasonable; test an always-statement by looking for one honest exception.' }),

  makeNum({ id:'g9sms-fam-013-d', chapterId:'g9sms-migration', subsection:'internal_international', difficulty:3,
    question:'In one year 4 200 people left a country to live abroad and 5 700 people arrived to settle in it. What was the <b>net migration</b> for that year? Give the number only.',
    answer:1500,
    hint:'Net migration compares the two flows; it does not total them.',
    explanation:'5 700 − 4 200 = <b>1 500</b>, a net gain. The misconception is to add the two figures and answer 9 900, which is the total number of people who moved, not the net effect on the population. "Net" always means one flow taken away from the other.' })

);

})();

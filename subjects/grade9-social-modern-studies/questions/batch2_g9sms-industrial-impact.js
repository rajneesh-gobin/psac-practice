'use strict';
STATIC_QUESTIONS.push(

  makeMCQ({ id:'g9sms-industrial-impact-016', chapterId:'g9sms-industrial-impact', difficulty:3,
    subsection:'work_and_jobs',
    question:'<p>Share of Mauritian workers by sector:</p><table style="border-collapse:collapse;margin:0 auto 10px"><tr><th style="border:1px solid #999;padding:4px 10px">Sector</th><th style="border:1px solid #999;padding:4px 10px">1972</th><th style="border:1px solid #999;padding:4px 10px">1990</th></tr><tr><td style="border:1px solid #999;padding:4px 10px">Agriculture</td><td style="border:1px solid #999;padding:4px 10px">30%</td><td style="border:1px solid #999;padding:4px 10px">17%</td></tr><tr><td style="border:1px solid #999;padding:4px 10px">Manufacturing</td><td style="border:1px solid #999;padding:4px 10px">15%</td><td style="border:1px solid #999;padding:4px 10px">36%</td></tr><tr><td style="border:1px solid #999;padding:4px 10px">Services</td><td style="border:1px solid #999;padding:4px 10px">55%</td><td style="border:1px solid #999;padding:4px 10px">47%</td></tr></table>Which sector changed by the greatest number of percentage points?',
    options:['Manufacturing, up 21 points','Agriculture, down 13 points','Services, down 8 points','Manufacturing, up 15 points'],
    answer:'Manufacturing, up 21 points',
    hint:'Subtract each pair of figures and compare the sizes, ignoring whether they rose or fell.',
    explanation:'Manufacturing rose 36 − 15 = <b>21 points</b>, the largest change. Agriculture fell 13 and services fell 8, both smaller. The fourth option quotes 15, which is the 1972 figure itself and not a change at all — a common slip when reading a two-column table.' }),

  makeText({ id:'g9sms-industrial-impact-017', chapterId:'g9sms-industrial-impact', difficulty:2,
    subsection:'life_expectancy',
    question:'The number of babies who die before their first birthday, per 1 000 live births, is one of the clearest signs of whether a country\'s health services are improving. Name this measure. Give the three-word term.',
    answer:'infant mortality rate',
    alsoAccept:['infant mortality','the infant mortality rate','infant death rate','IMR'],
    hint:'It counts deaths in the first year of life, not deaths at all ages.',
    explanation:'The <b>infant mortality rate</b> counts deaths under one year per 1 000 live births, and it fell sharply in Mauritius as clinics, clean water and vaccination spread after the 1950s. Pupils often answer "death rate": the crude death rate covers the whole population and moves far more slowly, so it hides exactly the change this measure is used to show.' }),

  makeMCQ({ id:'g9sms-industrial-impact-018', chapterId:'g9sms-industrial-impact', difficulty:3,
    subsection:'environment_impact',
    question:'A pupil writes: <i>"Since many EPZ textile factories have closed, Mauritius no longer has an industrial pollution problem."</i> What is wrong with this statement?',
    options:['Textiles shrank, but other industry and waste remain',
             'Nothing is wrong; factory discharge ended with the EPZ',
             'The error is the date; the EPZ was closed down in 1975',
             'Pollution in Mauritius comes only from farming chemicals'],
    answer:'Textiles shrank, but other industry and waste remain',
    hint:'Ask whether closing one industry removes every source of industrial waste on the island.',
    explanation:'Textile employment fell after 2005, but food processing, printing, chemicals, construction and a far larger volume of household and commercial waste all continued, and landfill and lagoon pollution grew rather than stopped. The EPZ was never closed down as a policy, so the date option is false, and farming is one source of pollution among several, not the only one.' }),

  makeMCQ({ id:'g9sms-industrial-impact-019', chapterId:'g9sms-industrial-impact', difficulty:3,
    subsection:'work_and_jobs',
    question:'A Mauritian clothing firm keeps its head office in Curepipe but moves its sewing lines to Madagascar, where wages are lower. What is this move called?',
    options:['Delocalisation of production','Import substitution at home','Diversification of exports','Nationalisation of factories'],
    answer:'Delocalisation of production',
    hint:'The work itself leaves the country while the company does not.',
    explanation:'Moving production abroad to cut costs is <b>delocalisation</b>, and Mauritian textile firms did it on a large scale as local wages rose. Import substitution means making goods at home instead of buying them abroad, the opposite direction. Diversification means adding new products or markets, and nationalisation means the state taking ownership — neither describes a factory relocating.' }),

  makeMCQ({ id:'g9sms-industrial-impact-020', chapterId:'g9sms-industrial-impact', difficulty:3,
    subsection:'life_expectancy',
    question:'Life expectancy at birth in Mauritius rose from about 51 years in 1950 to about 71 years in 2000. Which pair of changes best explains that rise?',
    options:['Malaria control and better nutrition',
             'Later marriage and smaller families',
             'More tourists and more hotel jobs',
             'Higher tariffs and cheaper imports'],
    answer:'Malaria control and better nutrition',
    hint:'Life expectancy rises when fewer people die young, so look for changes that stop deaths.',
    explanation:'Malaria was eradicated in the 1950s and rising incomes bought better food, clean water and medical care, so far fewer children and adults died early. Later marriage and smaller families change the <b>birth</b> rate, not how long people live. Tourism and tariffs affect income, and only reach life expectancy indirectly through the health spending they pay for.' })
);

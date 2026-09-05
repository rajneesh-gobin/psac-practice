'use strict';
// Grade 5 History & Geography - Chapter: Settlement of Mauritius
// Uses STATIC_QUESTIONS + helpers from engine/helpers.js
// IDs format: g5hg-sett-NNN

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-sett-001', chapterId:'settlement', subsection:'dutch', difficulty:1,
    question:'Which European nation was the FIRST to settle permanently in Mauritius?',
    options:['The Portuguese','The French','The British','The Dutch'],
    answer:'The Dutch',
    hint:'They arrived in the 17th century and named the island after a Dutch prince.',
    explanation:'The Dutch were the first to settle in Mauritius in 1638. They named it "Mauritius" after Prince Maurice of Nassau (Maurice van Nassau), a Dutch statesman.' }),

  makeMCQ({ id:'g5hg-sett-002', chapterId:'settlement', subsection:'dutch', difficulty:1,
    question:'When did the Dutch first settle in Mauritius?',
    options:['1598','1638','1715','1810'],
    answer:'1638',
    hint:'The 17th century - just after the Dutch first claimed the island.',
    explanation:'The Dutch established the first permanent settlement in Mauritius in 1638, though they had claimed it earlier in 1598.' }),

  makeMCQ({ id:'g5hg-sett-003', chapterId:'settlement', subsection:'dutch', difficulty:1,
    question:'After the Dutch left Mauritius, which nation took control of the island in 1715?',
    options:['The British','The Portuguese','The French','The Spanish'],
    answer:'The French',
    hint:'France established a base in the Indian Ocean for its trade routes.',
    explanation:'After the Dutch abandoned Mauritius, the French took control in 1715. They renamed it "Isle de France" and developed it significantly, particularly under Mahé de Labourdonnais.' }),

  makeMCQ({ id:'g5hg-sett-004', chapterId:'settlement', subsection:'french', difficulty:1,
    question:'In which year did the British take control of Mauritius from the French?',
    options:['1715','1776','1810','1835'],
    answer:'1810',
    hint:'This was during the Napoleonic Wars era.',
    explanation:'The British captured Mauritius from the French in 1810, following the Battle of Grand Port and Cape Malheureux. Britain officially gained control through the Treaty of Paris in 1814.' }),

  makeTF({ id:'g5hg-sett-005', chapterId:'settlement', subsection:'dutch', difficulty:1,
    question:'The Dutch named Mauritius after Prince Maurice of Nassau.',
    answer:true,
    hint:'The Dutch named the island - think about who they might have named it after.',
    explanation:'True. The Dutch named Mauritius "Mauritius" (or Maurits) after Prince Maurice of Nassau (Maurits van Nassau), Stadtholder of the Dutch Republic at the time of its discovery in 1598.' }),

  makeMCQ({ id:'g5hg-sett-006', chapterId:'settlement', subsection:'french', difficulty:2,
    question:'What was Mauritius called by the French when they governed it?',
    options:['New France','Isle de France','French Mauritius','Île Bourbon'],
    answer:'Isle de France',
    hint:'The French renamed it after their own country.',
    explanation:'The French renamed Mauritius "Isle de France" (Island of France) when they took control in 1715. It was known by this name until the British took over in 1810.' }),

  makeMCQ({ id:'g5hg-sett-007', chapterId:'settlement', subsection:'french', difficulty:2,
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

STATIC_QUESTIONS.push(

  makeMCQ({ id:'g5hg-sett-008', chapterId:'settlement', subsection:'dutch', difficulty:1,
    question:'Where did the Dutch establish their first permanent settlement in Mauritius in 1638?',
    options:['Port Louis','Grand Baie','Vieux Grand Port','Black River'],
    answer:'Vieux Grand Port',
    hint:'This sheltered harbour is on the south-east coast of the island.',
    explanation:'The Dutch settled at <b>Vieux Grand Port</b> (Old Great Harbour) on the south-east coast of Mauritius in 1638. It offered a sheltered natural harbour suitable for their ships.' }),

  makeMCQ({ id:'g5hg-sett-009', chapterId:'settlement', subsection:'dutch', difficulty:1,
    question:'What was Fort Frederick Hendrik?',
    options:[
      'A lighthouse built by the Portuguese',
      'A Dutch fort built at Vieux Grand Port in Mauritius',
      'A British fort in Port Louis',
      'A French government building'
    ],
    answer:'A Dutch fort built at Vieux Grand Port in Mauritius',
    hint:'Named after Frederick Henry, Prince of Orange.',
    explanation:'<b>Fort Frederick Hendrik</b> was a fort built by the Dutch at Vieux Grand Port. It was named after Frederick Henry (Frederik Hendrik), Prince of Orange, a Dutch ruler at the time of the settlement.' }),

  makeMCQ({ id:'g5hg-sett-010', chapterId:'settlement', subsection:'dutch', difficulty:2,
    question:'What were TWO natural resources the Dutch exploited in Mauritius during their settlement?',
    options:[
      'Ebony wood (from cutting down forests) and introduced deer for hunting',
      'Sugar and cotton from established plantations',
      'Gold and diamonds from the mountains',
      'Coconut oil and fish from the lagoon'
    ],
    answer:'Ebony wood (from cutting down forests) and introduced deer for hunting',
    hint:'One is a valuable hardwood timber; the other are animals still seen in Mauritius today.',
    explanation:'The Dutch <b>cut down large areas of ebony forest</b> for the valuable hardwood, and <b>introduced deer</b> to the island for hunting. The deer they brought are the ancestors of the deer still found on the island today.' }),

  makeMCQ({ id:'g5hg-sett-011', chapterId:'settlement', subsection:'dutch', difficulty:2,
    question:'The Dutch abandoned Mauritius permanently in 1710. Which TWO difficulties made their settlement fail?',
    options:[
      'Devastating cyclones that destroyed crops and buildings, and plagues of rats that ate food stores',
      'Attacks by Portuguese warships and earthquakes',
      'Disease from the Dodo bird and floods from the central plateau',
      'Attacks by local tribespeople and severe droughts'
    ],
    answer:'Devastating cyclones that destroyed crops and buildings, and plagues of rats that ate food stores',
    hint:'The island\'s natural hazards and introduced pests made sustaining the colony impossible.',
    explanation:'The Dutch settlement failed because of: (1) <b>Cyclones</b> - severe tropical storms repeatedly destroyed crops and buildings; (2) <b>Rat plagues</b> - rats accidentally introduced by ships destroyed food stores and crops. Together these made it impossible to sustain the colony.' }),

  makeMCQ({ id:'g5hg-sett-012', chapterId:'settlement', subsection:'british', difficulty:1,
    question:'In which month and year did the British capture Rodrigues?',
    options:['July 1810','August 1809','January 1810','March 1815'],
    answer:'August 1809',
    hint:'This happened before the British captured Mauritius itself.',
    explanation:'The British captured <b>Rodrigues in August 1809</b>, as part of their campaign against French Indian Ocean territories during the Napoleonic Wars. Rodrigues had no soldiers or fortifications to defend it.' }),

  makeMCQ({ id:'g5hg-sett-013', chapterId:'settlement', subsection:'british', difficulty:2,
    question:'The Battle of Grand Port (August 1810) was significant in Mauritian history. What was unusual about its outcome?',
    options:[
      'France won - making it the only naval victory for Napoleon against the British',
      'The British won without firing a single shot',
      'The battle ended in a draw and both sides withdrew',
      'The French surrendered immediately'
    ],
    answer:'France won - making it the only naval victory for Napoleon against the British',
    hint:'This battle is celebrated in France - it was a rare success during that era.',
    explanation:'The <b>Battle of Grand Port</b> (August 1810) was a French naval victory. British ships ran aground in the shallow sandy waters of the Grand Port lagoon. It is the only naval victory of the Napoleonic Wars inscribed on the Arc de Triomphe in Paris.' }),

  makeTF({ id:'g5hg-sett-014', chapterId:'settlement', subsection:'british', difficulty:1,
    question:'Despite winning the Battle of Grand Port, France still lost Mauritius to Britain in 1810.',
    answer:true,
    hint:'One naval battle does not decide who controls an island permanently.',
    explanation:'True. Although France won the naval Battle of Grand Port in August 1810, the British returned with a larger force. In December 1810, the British landed at Cap Malheureux and captured the entire island of Mauritius.' }),

  makeMCQ({ id:'g5hg-sett-015', chapterId:'settlement', subsection:'british', difficulty:2,
    question:'The British fort built on Rodrigues after capturing it in 1809 was called:',
    options:['Fort Adelaide','Fort Frederick Hendrik','Fort Duncan','Fort George'],
    answer:'Fort Duncan',
    hint:'Named after a British officer.',
    explanation:'After capturing Rodrigues in 1809, the British built <b>Fort Duncan</b> there. Unlike Mauritius, Rodrigues had no defences when captured, so the British quickly established a military presence on the island.' }),

  makeMCQ({ id:'g5hg-sett-016', chapterId:'settlement', subsection:'french', difficulty:3,
    question:'After the British captured Mauritius in 1810, they allowed French settlers to keep their land, religion and laws. Why was this policy WISE for British rule?',
    options:[
      'The British feared the French would call Napoleon to attack if laws were changed',
      'Allowing French settlers to keep their customs avoided rebellion, kept the colony productive and made the transition peaceful',
      'British law did not allow them to change French law',
      'The French had more soldiers and the British had to agree to their demands'
    ],
    answer:'Allowing French settlers to keep their customs avoided rebellion, kept the colony productive and made the transition peaceful',
    hint:'Governing a colony is easier when the local population cooperates.',
    explanation:'By allowing French settlers to keep their land, religion (Catholic) and legal system (<i>Code Napoléon</i>), the British <b>avoided rebellion</b> from the large French community, kept experienced planters managing productive estates, and ensured a smooth transition of power. This pragmatic approach maintained the colony\'s economy.' }),

  makeMCQ({ id:'g5hg-sett-017', chapterId:'settlement', subsection:'dutch', difficulty:4,
    question:'Compare the Dutch and British approaches to settling Mauritius. Which statement BEST explains why the British were more successful at keeping long-term control?',
    options:[
      'The British had better weapons than the Dutch',
      'The British established a proper civilian government, encouraged sugar production and maintained law through structures like Fort Adelaide - unlike the Dutch who had no long-term economic plan',
      'The British had more people so they simply outnumbered the Dutch',
      'The Dutch were only traders, not interested in governing territory'
    ],
    answer:'The British established a proper civilian government, encouraged sugar production and maintained law through structures like Fort Adelaide - unlike the Dutch who had no long-term economic plan',
    hint:'Think about what makes a settlement sustainable: economy, governance, security.',
    explanation:'The Dutch settlement failed because it lacked long-term economic sustainability (relying on timber and hunting) and was overwhelmed by natural difficulties. The British succeeded by: (1) encouraging profitable <b>sugar cultivation</b> as a lasting economic base; (2) establishing proper <b>civil government</b>; (3) building military infrastructure (Fort Adelaide) for security. These created a self-sustaining colony.' })

);

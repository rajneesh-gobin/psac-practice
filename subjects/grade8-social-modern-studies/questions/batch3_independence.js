'use strict';

(function () {

const CH = 'g8sms-independence';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8sms-independence-021', chapterId: CH, difficulty: 2, subsection: 'empires_colonies',
    question: 'A COLONY is a territory ruled by a foreign power for that power\'s benefit. What term describes a self-governing territory that still recognises the British monarch as head of state?',
    options: ['Dominion', 'Colony', 'Protectorate', 'Mandate'],
    answer: 'Dominion',
    hint: 'Canada, Australia and New Zealand were examples — they ran their own affairs but stayed within the Empire.',
    explanation: 'A dominion had full self-government but remained within the British Empire and recognised the Crown. A colony was ruled directly by Britain for Britain\'s benefit. A protectorate was nominally independent but under British "protection" (and control). A mandate was a former German or Ottoman territory administered by a power under League of Nations supervision after WW1.'
  }),

  makeMCQ({
    id: 'g8sms-independence-022', chapterId: CH, difficulty: 2, subsection: 'empires_colonies',
    question: 'Colonial powers typically exploited their colonies economically. Which of the following best describes how this worked?',
    options: ['Raw materials left the colony cheaply; finished goods were sold back expensively', 'Colonies were allowed to trade freely with anyone', 'Colonial powers gave money to develop local industries', 'Workers in colonies were paid the same as workers at home'],
    answer: 'Raw materials left the colony cheaply; finished goods were sold back expensively',
    hint: 'Think about sugar leaving Mauritius and what Mauritians had to buy back from Britain.',
    explanation: 'The classic colonial pattern was to extract raw materials (sugar, cotton, rubber) at low prices and sell manufactured products back to the colony at higher ones, keeping wealth and industrial jobs at home. Colonies were not free to trade with rivals, local industries were rarely encouraged, and wages in colonies were far below those paid to workers in Europe.'
  }),

  makeMCQ({
    id: 'g8sms-independence-023', chapterId: CH, difficulty: 2, subsection: 'decolonisation',
    question: 'Which Asian country was the first major British colony to gain independence after the Second World War, in 1947, inspiring independence movements worldwide?',
    options: ['India', 'China', 'Japan', 'Malaysia'],
    answer: 'India',
    hint: 'Mahatma Gandhi led its non-violent independence movement for decades.',
    explanation: 'India\'s independence in August 1947 was enormously significant — if the jewel of the British Empire could win self-rule, so could others. Leaders in Africa, the Caribbean and the Indian Ocean took notice. China was never a British colony; Japan was an imperial power itself; Malaysia gained independence in 1957.'
  }),

  makeNum({
    id: 'g8sms-independence-024', chapterId: CH, difficulty: 2, subsection: 'decolonisation',
    question: 'Ghana (formerly the Gold Coast) became the first country in sub-Saharan Africa to gain independence from Britain. In which year did this happen?',
    answer: 1957,
    hint: 'It was ten years after India\'s independence and more than ten years before Mauritius became independent.',
    explanation: 'Ghana became independent on 6 March 1957 under Kwame Nkrumah, proving that African nations could govern themselves. Its independence gave confidence to independence movements across the continent and beyond. Mauritius followed eleven years later in 1968.'
  }),

  makeMCQ({
    id: 'g8sms-independence-025', chapterId: CH, difficulty: 3, subsection: 'decolonisation',
    question: 'In February 1960 British Prime Minister Harold Macmillan told South African politicians that a "wind of change" was blowing through Africa. What did he mean?',
    options: ['African nationalism was unstoppable and colonies would become independent', 'A tropical cyclone was approaching South Africa', 'Britain planned to take more African colonies', 'African trade winds had shifted direction'],
    answer: 'African nationalism was unstoppable and colonies would become independent',
    hint: 'He was acknowledging something already happening — not proposing a new policy.',
    explanation: 'Macmillan\'s famous "wind of change" speech acknowledged that African peoples were demanding self-rule and that Britain could not hold back the tide of nationalism. It was a signal that Britain would accept decolonisation rather than fight it, though his audience — the white minority government of South Africa — strongly disagreed. The phrase became a shorthand for the whole era of African independence.'
  }),

  makeMCQ({
    id: 'g8sms-independence-026', chapterId: CH, difficulty: 2, subsection: 'decolonisation',
    question: 'In December 1960 the United Nations passed Resolution 1514. What did it declare?',
    options: ['All colonial peoples had the right to self-determination and independence', 'Nuclear weapons should be banned worldwide', 'The Korean War should end immediately', 'France must return Algeria to independence'],
    answer: 'All colonial peoples had the right to self-determination and independence',
    hint: 'Self-determination means the right of a people to choose their own government.',
    explanation: 'UN Resolution 1514 — the "Declaration on the Granting of Independence to Colonial Countries and Peoples" — stated that colonialism was a denial of human rights and that all peoples had the right to determine their own political future. This gave independence movements a powerful moral and legal backing on the world stage.'
  }),

  makeMCQ({
    id: 'g8sms-independence-027', chapterId: CH, difficulty: 2, subsection: 'mauritius_independence',
    question: 'Constitutional talks for Mauritian independence were held in London in 1965. At which famous building did these talks take place?',
    options: ['Lancaster House', 'Buckingham Palace', 'The Houses of Parliament', 'Windsor Castle'],
    answer: 'Lancaster House',
    hint: 'Many British colonial independence conferences were held at this grand London mansion.',
    explanation: 'The Lancaster House Conference of 1965 discussed the terms under which Mauritius would move to independence. It was at this conference that the Chagos Archipelago (including Diego Garcia) was excised from Mauritius as a condition of independence — a decision still disputed today. Buckingham Palace and Windsor Castle are royal residences, not conference venues, and parliamentary buildings host debates rather than colonial negotiations.'
  }),

  makeTF({
    id: 'g8sms-independence-028', chapterId: CH, difficulty: 2, subsection: 'mauritius_independence',
    question: 'The Chagos Archipelago, including the island of Diego Garcia, was part of Mauritius until Britain separated it in 1965, before granting independence.',
    answer: true,
    hint: 'This is still a live political dispute between Mauritius and the United Kingdom.',
    explanation: 'True. At the Lancaster House talks Britain required Mauritius to give up the Chagos Archipelago as a condition of independence. The islands became the British Indian Ocean Territory, and Diego Garcia was later leased to the United States as a military base. Mauritius has always contested the legality of this separation, and in 2019 the International Court of Justice ruled in Mauritius\'s favour.'
  }),

  makeNum({
    id: 'g8sms-independence-029', chapterId: CH, difficulty: 1, subsection: 'mauritius_independence',
    question: 'Mauritius became independent on 12 March 1968. In which month of the year did independence fall?',
    answer: 3,
    hint: 'March is the third month of the year.',
    explanation: '12 March 1968 is celebrated every year as Independence Day (now called National Day). March is the third month, so the answer is 3. The date falls during the cyclone season, which had been a concern for early Mauritian governments — the first cyclone season as an independent nation arrived just weeks later.'
  }),

  makeMCQ({
    id: 'g8sms-independence-030', chapterId: CH, difficulty: 3, subsection: 'mauritius_independence',
    question: 'Gaëtan Duval, leader of the PMSD, had opposed Mauritian independence. What role did his party play AFTER independence was achieved?',
    options: ['It joined the government in a coalition', 'It continued to demand British rule', 'It was banned by the new government', 'It dissolved and its members left politics'],
    answer: 'It joined the government in a coalition',
    hint: 'In a small country, bitter rivals often have to work together once the argument is settled.',
    explanation: 'Although Duval and the PMSD had campaigned against independence, once it was a fact they accepted the new reality and joined a coalition government with the Labour Party. This ability to compromise helped Mauritius achieve political stability in its early years as a nation. The PMSD was never banned and remained active in politics for decades.'
  })

);

})();

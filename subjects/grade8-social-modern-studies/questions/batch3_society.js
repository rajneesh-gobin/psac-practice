'use strict';

(function () {

const CH = 'g8sms-society';

STATIC_QUESTIONS.push(

  makeMCQ({
    id: 'g8sms-society-021', chapterId: CH, difficulty: 2, subsection: 'post_ww1_conditions',
    question: 'Which political party, founded in 1936, campaigned for better wages and conditions for sugar estate workers in Mauritius?',
    options: ['The Labour Party', 'The PMSD', 'The IFB', 'The CAM'],
    answer: 'The Labour Party',
    hint: 'It was founded by Dr Maurice Curé, a doctor who championed workers\' rights.',
    explanation: 'The Mauritius Labour Party was founded in 1936 by Dr Maurice Curé, who believed workers on the sugar estates deserved fair wages and proper conditions. The PMSD (Parti Mauricien Social Démocrate) was formed later and represented different interests; the IFB and CAM were other political organisations that came later.'
  }),

  makeNum({
    id: 'g8sms-society-022', chapterId: CH, difficulty: 2, subsection: 'post_ww1_conditions',
    question: 'The first major general strike by sugar estate workers in Mauritius took place one year after the Labour Party was founded in 1936. In which year did the strike occur?',
    answer: 1937,
    hint: 'Add one to the year the Labour Party was founded.',
    explanation: 'The 1937 sugar estate strike was a landmark event in Mauritian labour history. Workers walked off the estates demanding better pay and conditions, just a year after the Labour Party was founded. The colonial authorities responded harshly, but the strike showed that workers could organise collectively.'
  }),

  makeMCQ({
    id: 'g8sms-society-023', chapterId: CH, difficulty: 2, subsection: 'post_ww1_conditions',
    question: 'During the Second World War (1939–1945), many Mauritians faced food shortages. What was the main reason?',
    options: ['Enemy submarines disrupted shipping', 'Farmers refused to grow food', 'The island was invaded', 'Sugar was used as food instead'],
    answer: 'Enemy submarines disrupted shipping',
    hint: 'Mauritius had to import much of its food, and getting ships across the ocean became very dangerous.',
    explanation: 'Mauritius depended on imported rice, flour and other foodstuffs. German and Japanese submarines threatened merchant ships across the Indian Ocean, making supplies unreliable and expensive. The island was not invaded, farmers still grew what they could, and sugar cannot replace staple foods like rice.'
  }),

  makeMCQ({
    id: 'g8sms-society-024', chapterId: CH, difficulty: 3, subsection: 'post_ww1_conditions',
    question: 'Cyclone Carol struck Mauritius in December 1960. What was its most serious economic consequence?',
    options: ["Widespread destruction of sugar crops and houses","It triggered a volcanic eruption in the interior","It destroyed the only hospital on the island","It sank the entire Mauritian fishing fleet"],
    answer: 'Widespread destruction of sugar crops and houses',
    hint: 'Sugar was still the backbone of the economy at that time, and the island was made of low-lying land and wooden houses.',
    explanation: 'Cyclone Carol was one of the most destructive storms to hit Mauritius in the twentieth century. It flattened sugar cane fields and destroyed thousands of houses, hitting the rural poor hardest. Mauritius has no volcanoes, the fishing fleet was harmed but not lost entirely, and the hospital survived.'
  }),

  makeTF({
    id: 'g8sms-society-025', chapterId: CH, difficulty: 1, subsection: 'post_ww1_conditions',
    question: 'A government-run DDT spraying campaign after the Second World War almost completely wiped out malaria in Mauritius by the early 1950s.',
    answer: true,
    hint: 'DDT kills the mosquitoes that carry the malaria parasite.',
    explanation: 'True. The DDT campaign launched in the late 1940s was spectacularly successful — malaria, which had killed thousands every year, was virtually eliminated by the early 1950s, dramatically improving life expectancy and the health of the workforce. It is one of the most striking public-health achievements in Mauritian history.'
  }),

  makeMCQ({
    id: 'g8sms-society-026', chapterId: CH, difficulty: 2, subsection: 'social_economic_changes',
    question: 'Mauritius introduced free secondary education in 1976. What was the most important effect of this change?',
    options: ["Children from poor families could study beyond primary school","Only boys were allowed to continue into secondary school","Secondary schools were abolished across the whole island","All secondary teachers were given a large rise in pay"],
    answer: 'Children from poor families could study beyond primary school',
    hint: 'Before 1976, secondary school fees meant that many families simply could not send their children.',
    explanation: 'Before 1976, secondary schooling required fees that many working-class and rural families could not afford, so most children left school after primary. Free education opened the doors to a larger, better-educated workforce and helped reduce inequality. It was available to both girls and boys.'
  }),

  makeMCQ({
    id: 'g8sms-society-027', chapterId: CH, difficulty: 2, subsection: 'social_economic_changes',
    question: 'From the 1970s, Mauritius developed two major new industries alongside sugar. Which pair is correct?',
    options: ['Tourism and textile manufacturing', 'Oil refining and steel production', 'Gold mining and coffee growing', 'Fishing and rubber growing'],
    answer: 'Tourism and textile manufacturing',
    hint: 'One industry filled the new Export Processing Zone factories; the other used the island\'s beautiful beaches.',
    explanation: 'The Export Processing Zone (EPZ), established in 1970, attracted textile factories; at the same time the government promoted Mauritius as a tourist destination. Both industries created tens of thousands of jobs and helped free the economy from its dangerous dependence on a single crop. Mauritius has no oil, no significant gold deposits, and rubber is a tropical crop suited to different conditions.'
  }),

  makeText({
    id: 'g8sms-society-028', chapterId: CH, difficulty: 2, subsection: 'social_economic_changes',
    question: 'Name the industrial zone established in Mauritius in 1970 to attract foreign factories, particularly in the clothing and textile industry.',
    answer: 'Export Processing Zone',
    alsoAccept: ['EPZ', 'the EPZ', 'export processing zone', 'zone franche'],
    hint: 'Its abbreviated name is three letters, and its goods were made for export abroad.',
    explanation: 'The Export Processing Zone (EPZ) offered tax incentives and cheap labour to attract foreign investors, mainly in garment and textile manufacturing. It transformed Mauritius from a single-crop sugar economy into a more diversified one, and brought women into paid employment in very large numbers for the first time.'
  }),

  makeMCQ({
    id: 'g8sms-society-029', chapterId: CH, difficulty: 3, subsection: 'social_economic_changes',
    question: 'By diversifying its economy in the 1970s and 1980s, Mauritius reduced a major economic risk. What was that risk?',
    options: ["Dependence on one product whose price could collapse","Growing too fast to build enough schools in time","Having far too many industries for one island to manage","Importing too many manufactured goods from abroad"],
    answer: 'Dependence on one product whose price could collapse',
    hint: 'The 1930s had already shown what happened when sugar prices fell — the whole island suffered.',
    explanation: 'A country that sells only one thing is dangerously exposed when its world price falls. The lesson of the 1930s sugar-price crash — mass unemployment and hardship — pushed later governments to build tourism and manufacturing alongside sugar, so that a bad sugar year would no longer bring the entire economy down.'
  }),

  makeMCQ({
    id: 'g8sms-society-030', chapterId: CH, difficulty: 2, subsection: 'mauritian_society',
    question: 'After Britain abolished slavery in 1835, freed slaves went through a period of compulsory unpaid work before gaining full freedom. What was this system called?',
    options: ['Apprenticeship', 'Indenture', 'Serfdom', 'Conscription'],
    answer: 'Apprenticeship',
    hint: 'It lasted four years and was meant to be a "transition", though freed people saw it as continued forced labour.',
    explanation: 'The Apprenticeship system (1835–1838) required freed slaves to continue working for their former owners for a fixed period without pay. Many considered it slavery in all but name. Indenture was the separate system later used to bring Indian workers; serfdom was a European feudal system; conscription means compulsory military service.'
  }),

  makeMCQ({
    id: 'g8sms-society-031', chapterId: CH, difficulty: 2, subsection: 'mauritian_society',
    question: 'By the late nineteenth century, one community had become the largest group in the Mauritian population, largely because of the indenture system. Which community?',
    options: ['Indo-Mauritians', 'Franco-Mauritians', 'Afro-Mauritians', 'Sino-Mauritians'],
    answer: 'Indo-Mauritians',
    hint: 'Hundreds of thousands of workers were brought from the Indian subcontinent after the abolition of slavery.',
    explanation: 'Between 1834 and 1924, over 450,000 Indian indentured labourers arrived in Mauritius to work on the sugar estates. They and their descendants became the largest community. Franco-Mauritians owned most of the land but were far fewer in number; Afro-Mauritians were descendants of freed slaves; Sino-Mauritians arrived mainly as traders and were a small but important community.'
  }),

  makeMCQ({
    id: 'g8sms-society-032', chapterId: CH, difficulty: 3, subsection: 'mauritian_society',
    question: 'Different communities in nineteenth- and twentieth-century Mauritius ran their own schools, places of worship and cultural associations. What does this pattern show about Mauritian society?',
    options: ["Each community preserved its own identity within a shared country","The communities were almost always at war with one another","The government banned any mixing between the different groups","Only one single religion was practised across the whole island"],
    answer: 'Each community preserved its own identity within a shared country',
    hint: 'Having your own temple, mosque or church and your own school does not prevent you from also being Mauritian.',
    explanation: 'Mauritius developed a pattern of "unity in diversity": Hindus, Muslims, Catholics, Creoles, Chinese and others each maintained their own institutions and traditions while living on the same small island and sharing one economy and one government. This was not war — it was parallel community life within one nation. The government never banned mixing; communal schools simply reflected the desire of each group to pass on its language and faith.'
  })

);

})();

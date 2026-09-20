'use strict';
// Grade 6 Science - the eighteen syllabus outcomes the pack was not asking.
//
// ⚠ WHY THIS FILE EXISTS. scripts/fact-ledgers/grade6-science.json is built from
//   the MIE Grade 6 table (Science TLS, printed pages 15-17). With 564 questions
//   and every subsection declared, eighteen of its 114 outcomes had nothing
//   behind them at all. Whole strands were missing, not stray facts:
//     GREEN ENERGY      - defined, and why it matters. Two outcomes, no questions.
//     BREATHING PLANTS  - stomata, respiration, and how plants keep the air fit
//                         to breathe. Three outcomes, no questions.
//     WHO CAUSES IT     - global warming and erosion were both asked as things
//                         that happen, never as things PEOPLE cause or prevent.
//   The pack knew the greenhouse effect and knew what beach erosion is; it never
//   asked a child what we do about either.
//
// ⚠ Chapters follow where the pack ALREADY puts each idea, not where the syllabus
//   table prints it: global warming lives in g6-conservation/pollution here, so
//   the new global-warming items go there too. The ledger matches on text, not on
//   chapter, and a child looking for global warming should find it all in one place.
//
// ⚠ No new subsections. Every id below is already declared in _manifest.js.
//
// IDs: each chapter's own prefix from 020 (every one of them ends at 019).

// The one figure a stomata question cannot do without.
const _SVG_LEAF = `<svg viewBox="0 0 272 172" width="272" height="172" role="img" aria-label="A cut-through diagram of a leaf with labelled layers" style="display:block;margin:6px auto;background:#f0fdf4;border-radius:8px;border:1px solid #86efac">
  <text x="126" y="15" text-anchor="middle" font-size="9" font-weight="bold" fill="#14532d">A slice through a leaf</text>
  <rect x="26" y="28" width="180" height="12" fill="#dcfce7" stroke="#166534" stroke-width="0.8"/>
  <rect x="26" y="40" width="180" height="30" fill="#4ade80" stroke="#166534" stroke-width="0.8"/>
  <rect x="26" y="70" width="180" height="32" fill="#86efac" stroke="#166534" stroke-width="0.8"/>
  <rect x="26" y="102" width="180" height="12" fill="#dcfce7" stroke="#166534" stroke-width="0.8"/>
  <circle cx="56" cy="54" r="3.4" fill="#15803d"/><circle cx="78" cy="62" r="3.4" fill="#15803d"/>
  <circle cx="100" cy="50" r="3.4" fill="#15803d"/><circle cx="126" cy="60" r="3.4" fill="#15803d"/>
  <circle cx="152" cy="52" r="3.4" fill="#15803d"/><circle cx="176" cy="62" r="3.4" fill="#15803d"/>
  <rect x="84" y="102" width="16" height="12" fill="#f0fdf4"/>
  <ellipse cx="84" cy="108" rx="4.5" ry="6" fill="#4ade80" stroke="#166534" stroke-width="0.8"/>
  <ellipse cx="100" cy="108" rx="4.5" ry="6" fill="#4ade80" stroke="#166534" stroke-width="0.8"/>
  <rect x="144" y="102" width="16" height="12" fill="#f0fdf4"/>
  <ellipse cx="144" cy="108" rx="4.5" ry="6" fill="#4ade80" stroke="#166534" stroke-width="0.8"/>
  <ellipse cx="160" cy="108" rx="4.5" ry="6" fill="#4ade80" stroke="#166534" stroke-width="0.8"/>
  <line x1="92" y1="118" x2="92" y2="132" stroke="#334155" stroke-width="0.7"/>
  <line x1="152" y1="118" x2="152" y2="132" stroke="#334155" stroke-width="0.7"/>
  <text x="122" y="142" text-anchor="middle" font-size="7" fill="#334155">tiny openings, on the underside</text>
  <line x1="206" y1="34" x2="216" y2="34" stroke="#334155" stroke-width="0.7"/>
  <text x="219" y="36" font-size="6.5" fill="#334155">top</text>
  <line x1="206" y1="108" x2="216" y2="108" stroke="#334155" stroke-width="0.7"/>
  <text x="219" y="110" font-size="6.5" fill="#334155">under</text>
  <text x="126" y="163" text-anchor="middle" font-size="6.5" fill="#166534">The dark dots are the grains that trap sunlight</text>
</svg>`;

STATIC_QUESTIONS.push(

  // ── Plants breathe ──────────────────────────────────────────────────────
  makeMCQ({ id:'g6sci-pl-020', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:2,
    question:'Do plants breathe?',
    options:['Yes, every hour of the day and night','No, they only make food','No, only animals breathe','Yes, but only when it is raining'], answer:'Yes, every hour of the day and night',
    hint:'Breathing and making food are two different jobs.',
    explanation:'Plants <b>breathe all the time</b>, day and night, taking in oxygen and giving out carbon dioxide. They make food only in the light, which is a different job altogether.' }),

  makeMCQ({ id:'g6sci-pl-021', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:3,
    question:'Which gas does a plant take in when it <b>breathes</b>?',
    options:['Oxygen','Carbon dioxide','Nitrogen','Water vapour'], answer:'Oxygen',
    hint:'Breathing is the opposite exchange to making food.',
    explanation:'When a plant breathes it takes in <b>oxygen</b> and gives out carbon dioxide, exactly as we do. When it makes food it does the opposite.' }),

  makeMCQ({ id:'g6sci-pl-022', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:3,
    question:'In daylight a plant gives out far more oxygen than it uses. Why?',
    options:['It makes much more than it breathes in','It stops breathing in the light','It takes oxygen from the soil','It gives out oxygen only at night'], answer:'It makes much more than it breathes in',
    hint:'Both jobs are going on at once in the daytime.',
    explanation:'In the light a plant is doing both jobs at once, and it <b>makes far more oxygen than it uses</b>, so the extra goes into the air.' }),

  makeMCQ({ id:'g6sci-pl-023', chapterId:'g6-plants', subsection:'parts', difficulty:1,
    question:`${_SVG_LEAF}Gases go in and out of a leaf through tiny openings. What are these openings called?`,
    options:['Stomata','Petals','Veins','Roots'], answer:'Stomata',
    hint:'The diagram shows them on the underside of the leaf.',
    explanation:'The tiny openings are the <b>stomata</b>. Each one can open and close, letting carbon dioxide in and oxygen and water vapour out.' }),

  makeMCQ({ id:'g6sci-pl-024', chapterId:'g6-plants', subsection:'parts', difficulty:2,
    question:`${_SVG_LEAF}On which surface of the leaf are most of the stomata found?`,
    options:['The underside','The upper side','Along the stalk','Inside the veins'], answer:'The underside',
    hint:'Look at which edge of the diagram the openings are drawn on.',
    explanation:'Most stomata are on the <b>underside</b>, where they are shaded. That keeps the leaf from losing too much water in the sun.' }),

  makeMCQ({ id:'g6sci-pl-025', chapterId:'g6-plants', subsection:'parts', difficulty:3,
    question:'A leaf is smeared all over with thick grease. Why does the plant soon suffer?',
    options:['Its stomata are blocked','Its roots are covered','Its veins are cut','Its flowers cannot open'], answer:'Its stomata are blocked',
    hint:'Think about what the grease is lying on top of.',
    explanation:'Grease blocks the <b>stomata</b>, so no gas can pass in or out. The plant can neither breathe properly nor make its food.' }),

  makeMCQ({ id:'g6sci-pl-026', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:2,
    question:'How do plants help to keep the air fit for animals to breathe?',
    options:['They give out oxygen','They give out nitrogen','They take in oxygen only','They take in water vapour'], answer:'They give out oxygen',
    hint:'Think about which gas animals must have, and where it comes from.',
    explanation:'Plants <b>give out oxygen</b> when they make their food, replacing the oxygen that animals and fires use up.' }),

  makeMCQ({ id:'g6sci-pl-027', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:3,
    question:'Which gas do plants take out of the air when they make their food?',
    options:['Carbon dioxide','Oxygen','Nitrogen','Water vapour'], answer:'Carbon dioxide',
    hint:'It is the gas animals breathe out.',
    explanation:'Plants take in <b>carbon dioxide</b> to make their food, which is why a world with fewer plants holds more of it in the air.' }),

  makeMCQ({ id:'g6sci-pl-028', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:4,
    question:'Plants and animals together keep the gases of the air steady. How?',
    options:['Each gives out the gas the other needs','Both give out the same gas','Animals make the oxygen plants use','Neither of them changes the air'], answer:'Each gives out the gas the other needs',
    hint:'Write down what each one takes in and gives out, then compare the two lists.',
    explanation:'Animals breathe in oxygen and out carbon dioxide; plants take in carbon dioxide and give out oxygen. <b>Each gives out the gas the other needs</b>, which keeps the air balanced.' }),

  makeMCQ({ id:'g6sci-pl-029', chapterId:'g6-plants', subsection:'photosynthesis', difficulty:4,
    question:'A sealed glass jar holds a small plant and a small animal in the light, and both live for days. Why?',
    options:['Each uses the gas the other gives out','The jar lets fresh air leak in','Neither of them needs any gas','The plant feeds the animal'], answer:'Each uses the gas the other gives out',
    hint:'Nothing enters a sealed jar, so whatever they need must come from each other.',
    explanation:'In the light the plant gives out the oxygen the animal needs and uses the carbon dioxide the animal breathes out, so <b>each supplies the other</b>. In the dark the plant could not do it.' }),

  // ── Energy: what pollutes, what renews, what is green ───────────────────
  makeMCQ({ id:'g6sci-en-020', chapterId:'g6-energy', subsection:'sources', difficulty:2,
    question:'Which source of energy causes the most air pollution when it is used?',
    options:['Burning coal','Sunlight','Wind','Falling water'], answer:'Burning coal',
    hint:'Only one of these makes smoke.',
    explanation:'<b>Burning coal</b> releases smoke and carbon dioxide. Sun, wind and falling water give energy without burning anything, so they pollute far less.' }),

  makeMCQ({ id:'g6sci-en-021', chapterId:'g6-energy', subsection:'sources', difficulty:2,
    question:'Why is a power station that burns heavy oil said to be a polluting source of energy?',
    options:['It sends smoke and gases into the air','It uses water from the river','It is built close to the sea','It works only in the daytime'], answer:'It sends smoke and gases into the air',
    hint:'Ask what leaves the chimney.',
    explanation:'Burning oil <b>sends smoke and waste gases into the air</b>, which is what makes a source polluting. What comes out of the chimney is the test.' }),

  makeMCQ({ id:'g6sci-en-022', chapterId:'g6-energy', subsection:'sources', difficulty:3,
    question:'Which pair of energy sources does not pollute the air while making electricity?',
    options:['Wind and sunlight','Coal and oil','Diesel and petrol','Coal and bagasse'], answer:'Wind and sunlight',
    hint:'Look for the pair where nothing at all is burned.',
    explanation:'<b>Wind and sunlight</b> are non-polluting: nothing burns, so no smoke or waste gas is made.' }),

  makeMCQ({ id:'g6sci-en-023', chapterId:'g6-energy', subsection:'renewable', difficulty:1,
    question:'Is solar energy renewable or non-renewable?',
    options:['Renewable, the sun keeps shining','Non-renewable, it will run out','Renewable only in summer','Non-renewable at night'], answer:'Renewable, the sun keeps shining',
    hint:'Ask whether we can ever use up the supply.',
    explanation:'Solar energy is <b>renewable</b>: the sun goes on shining however much of its light we use.' }),

  makeMCQ({ id:'g6sci-en-024', chapterId:'g6-energy', subsection:'renewable', difficulty:2,
    question:'Solar panels work only in daylight. Does that make solar energy non-renewable?',
    options:['No, the supply is never used up','Yes, it stops every night','Yes, panels wear out in time','No, panels work in the dark too'], answer:'No, the supply is never used up',
    hint:'Renewable is about the supply running out, not about when it is available.',
    explanation:'Renewable means the <b>supply is never used up</b>. Solar energy pausing at night is a problem of storage, not of supply.' }),

  makeMCQ({ id:'g6sci-en-025', chapterId:'g6-energy', subsection:'renewable', difficulty:2,
    question:'What is meant by <b>green energy</b>?',
    options:['Energy made without harming the environment','Energy carried by green wires','Energy made only from plants','Energy that costs nothing at all'], answer:'Energy made without harming the environment',
    hint:'The word green here is about the environment, not about a colour.',
    explanation:'<b>Green energy</b> is energy produced without harming the environment &mdash; from the sun, the wind, falling water or bagasse, rather than by burning coal or oil.' }),

  makeMCQ({ id:'g6sci-en-026', chapterId:'g6-energy', subsection:'renewable', difficulty:2,
    question:'Which of these would be counted as green energy in Mauritius?',
    options:['Electricity from a wind farm','Electricity from imported coal','Electricity from heavy oil','Electricity from a diesel generator'], answer:'Electricity from a wind farm',
    hint:'Three of the four involve burning a fuel.',
    explanation:'A <b>wind farm</b> burns nothing and never runs out of wind, so its electricity is green. The other three all burn a fuel.' }),

  makeMCQ({ id:'g6sci-en-027', chapterId:'g6-energy', subsection:'renewable', difficulty:3,
    question:'Why is green energy important to a small island like Mauritius?',
    options:['It cuts pollution and imported fuel','It makes the island larger','It stops cyclones arriving','It removes the need for roads'], answer:'It cuts pollution and imported fuel',
    hint:'Think about what the island has to buy from abroad, and what the burning does.',
    explanation:'Green energy <b>cuts both the pollution and the fuel that must be bought abroad</b>, so the island depends less on other countries and its air stays cleaner.' }),

  makeMCQ({ id:'g6sci-en-028', chapterId:'g6-energy', subsection:'renewable', difficulty:4,
    question:'A village is offered either a diesel generator or a field of solar panels. Give the strongest reason for choosing the panels.',
    options:['They give clean power for years with no fuel','They can be built in a single day','They work through the whole night','They need no space at all'], answer:'They give clean power for years with no fuel',
    hint:'Weigh what each one costs and emits over many years, not on the first day.',
    explanation:'Panels <b>go on giving clean power for years and need no fuel at all</b>, while a generator must be fed diesel for ever and pollutes each time it runs.' }),

  makeMCQ({ id:'g6sci-en-029', chapterId:'g6-energy', subsection:'sources', difficulty:3,
    question:'Bagasse is the dry waste left after cane is crushed, and it is burned to make electricity. Why is it still counted as a green source here?',
    options:['A new crop grows again each year','It gives off no smoke at all','It is not really burned','It comes from under the ground'], answer:'A new crop grows again each year',
    hint:'Ask where the next load of bagasse will come from.',
    explanation:'Cane <b>grows again every year</b>, so bagasse is renewed, unlike coal. That is why Mauritius counts its bagasse power as green energy.' }),

  // ── The Sun, Earth and Moon as different bodies ────────────────────────
  makeMCQ({ id:'g6sci-sol-020', chapterId:'g6-solar-system', subsection:'sun_moon', difficulty:2,
    question:'The Sun, the Earth and the Moon are all <b>celestial objects</b>. What does that mean?',
    options:['They are all bodies out in space','They are all made of hot gas','They all give out their own light','They are all the same size'], answer:'They are all bodies out in space',
    hint:'The word covers anything found in the sky beyond the air.',
    explanation:'A <b>celestial object</b> is any body out in space &mdash; a star, a planet or a moon. The three are celestial objects of three different kinds.' }),

  makeMCQ({ id:'g6sci-sol-021', chapterId:'g6-solar-system', subsection:'sun_moon', difficulty:2,
    question:'The Sun, the Earth and the Moon are three different kinds of celestial object. Which set names them correctly?',
    options:['A star, a planet and a moon','A planet, a star and a moon','A moon, a planet and a star','Three stars of different sizes'], answer:'A star, a planet and a moon',
    hint:'Take them in the order they are written in the question.',
    explanation:'The Sun is a <b>star</b>, the Earth is a <b>planet</b> and the Moon is a <b>moon</b> going round that planet. Three objects, three kinds.' }),

  makeMCQ({ id:'g6sci-sol-022', chapterId:'g6-solar-system', subsection:'sun_moon', difficulty:3,
    question:'Which of these celestial objects makes its own light?',
    options:['The Sun only','The Sun and the Moon','The Earth and the Moon','All three of them'], answer:'The Sun only',
    hint:'The Moon looks bright, but where does that light start from?',
    explanation:'Only the <b>Sun</b> makes its own light, because it is a star. The Moon and the Earth are seen by the sunlight falling on them.' }),

  // ── Who causes global warming, and who can stop it ─────────────────────
  makeMCQ({ id:'g6sci-con-020', chapterId:'g6-conservation', subsection:'pollution', difficulty:2,
    question:'Which human activity adds most carbon dioxide to the air, the gas that causes global warming?',
    options:['Burning fuels in vehicles and factories','Growing vegetables in a garden','Drying clothes in the sun','Fishing in the lagoon'], answer:'Burning fuels in vehicles and factories',
    hint:'Carbon dioxide is made when something is burned.',
    explanation:'<b>Burning fuels</b> in vehicles, factories and power stations is the largest human source of carbon dioxide, and carbon dioxide is the gas that drives global warming.' }),

  makeMCQ({ id:'g6sci-con-021', chapterId:'g6-conservation', subsection:'pollution', difficulty:3,
    question:'How does cutting down a forest make global warming worse?',
    options:['Fewer trees are left to take in carbon dioxide','Trees give out carbon dioxide as they grow','The bare soil makes oxygen','Forests block the sunlight'], answer:'Fewer trees are left to take in carbon dioxide',
    hint:'Think about what a living tree does with carbon dioxide all day.',
    explanation:'Trees take carbon dioxide out of the air, so <b>cutting them down leaves more of it there</b>. Deforestation is a human cause of global warming as well as of erosion.' }),

  makeMCQ({ id:'g6sci-con-022', chapterId:'g6-conservation', subsection:'pollution', difficulty:2,
    question:'Which of these would help to prevent global warming?',
    options:['Using buses and bicycles more often','Leaving every light switched on','Burning rubbish in the garden','Using a car for very short trips'], answer:'Using buses and bicycles more often',
    hint:'Look for the choice that burns less fuel.',
    explanation:'<b>Buses and bicycles</b> burn far less fuel for each person carried, so less carbon dioxide reaches the air. The other three all add more.' }),

  makeMCQ({ id:'g6sci-con-023', chapterId:'g6-conservation', subsection:'pollution', difficulty:3,
    question:'Give one measure a country can take to prevent global warming.',
    options:['Make its electricity from wind and sun','Build more coal power stations','Cut down more of its forests','Import more heavy oil each year'], answer:'Make its electricity from wind and sun',
    hint:'The measure must reduce the burning of fuel.',
    explanation:'Making electricity from <b>wind and sun</b> means burning no fuel, so far less carbon dioxide is released. Planting trees and saving energy help in the same way.' }),

  makeMCQ({ id:'g6sci-con-024', chapterId:'g6-conservation', subsection:'pollution', difficulty:4,
    question:'One family switching off a light will not stop global warming. Why is it still worth doing?',
    options:['Millions of small savings add up','It cools the house at once','It removes carbon dioxide from the air','It stops the sea from rising'], answer:'Millions of small savings add up',
    hint:'Think about how many households there are, not about one of them.',
    explanation:'No single household matters on its own, but <b>millions of small savings add up</b> to a large one. It is also how a habit spreads through a community.' }),

  // ── Human hands in soil and beach erosion, and conserving what is left ──
  makeMCQ({ id:'g6sci-con-025', chapterId:'g6-conservation', subsection:'deforestation', difficulty:2,
    question:'Which human activity makes soil erosion worse on a hillside?',
    options:['Cutting down the trees','Planting more grass','Building a low stone wall','Leaving the land alone'], answer:'Cutting down the trees',
    hint:'Tree roots do something to the soil that nothing else does.',
    explanation:'Roots hold the soil together, so <b>cutting down the trees</b> leaves it loose for the rain to wash away. The other three all help to hold it.' }),

  makeMCQ({ id:'g6sci-con-026', chapterId:'g6-conservation', subsection:'deforestation', difficulty:3,
    question:'How can building work along the shore make beach erosion worse?',
    options:['It removes the plants that hold the sand','It makes the waves smaller','It adds new sand to the beach','It cools the sea water'], answer:'It removes the plants that hold the sand',
    hint:'Think about what is cleared away before a building goes up.',
    explanation:'Clearing the coastal plants and mangroves <b>takes away what held the sand in place</b>, so the waves carry more of it off. Beach erosion is natural, but people can speed it up.' }),

  makeMCQ({ id:'g6sci-con-027', chapterId:'g6-conservation', subsection:'deforestation', difficulty:4,
    question:'A hillside is cleared for building and the lagoon below turns muddy after every heavy rain. Explain the link.',
    options:['Bare soil is washed down into the lagoon','The rain water itself is muddy','The lagoon makes its own mud','Building work cools the water'], answer:'Bare soil is washed down into the lagoon',
    hint:'Follow the rain water from the top of the hill to the sea.',
    explanation:'With no roots to hold it, <b>the bare soil is washed downhill and out into the lagoon</b>, where the mud smothers the coral. One human act damages two ecosystems at once.' }),

  makeMCQ({ id:'g6sci-con-028', chapterId:'g6-conservation', subsection:'why_protect', difficulty:2,
    question:'Why must our forests and lagoons be conserved?',
    options:['They shelter life and protect the land','They are useful only for the tourists','They make the island rain much less','They can easily be replaced later'], answer:'They shelter life and protect the land',
    hint:'Think about who lives in them, and what they hold in place.',
    explanation:'Forests and lagoons <b>shelter living things and protect the land</b> from erosion and from the sea. Once destroyed, neither can be put back quickly.' }),

  makeMCQ({ id:'g6sci-con-029', chapterId:'g6-conservation', subsection:'why_protect', difficulty:3,
    question:'Which of these is a way of conserving a lagoon?',
    options:['Keeping waste and mud out of the water','Taking as much coral as you like','Anchoring boats on the reef','Filling in part of it for building'], answer:'Keeping waste and mud out of the water',
    hint:'Conserving means protecting something so it lasts.',
    explanation:'<b>Keeping waste and mud out of the water</b> lets the coral live, so the lagoon survives. The other three all damage it.' }),

  makeMCQ({ id:'g6sci-con-030', chapterId:'g6-materials', subsection:'waste', difficulty:2,
    question:'Why do we say that we must care for planet Earth?',
    options:['It is the only home living things have','It is the largest planet of all','It is the closest planet to the Sun','It can be replaced one day'], answer:'It is the only home living things have',
    hint:'Think about where else the living things we know could go.',
    explanation:'The Earth is <b>the only home living things have</b>, and what we spoil cannot be replaced. That is why waste, pollution and conservation are all part of the same lesson.' }),

  makeMCQ({ id:'g6sci-mat-020', chapterId:'g6-materials', subsection:'waste', difficulty:3,
    question:'Which daily habit best shows that a family cares for planet Earth?',
    options:['Sorting waste so it can be recycled','Burning the rubbish behind the house','Throwing waste into the river','Buying a new bag for every trip'], answer:'Sorting waste so it can be recycled',
    hint:'Look for the habit that reduces what is thrown away for good.',
    explanation:'<b>Sorting waste for recycling</b> keeps materials in use and out of the ground and the sea. Burning and dumping both simply move the harm somewhere else.' }),

  // ── Ecosystems on land, animal groups, diet and use ─────────────────────
  makeMCQ({ id:'g6sci-eco-020', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:1,
    question:'An ecosystem on land, such as a forest, is called:',
    options:['a terrestrial ecosystem','an aquatic ecosystem','a marine ecosystem','a coastal ecosystem'], answer:'a terrestrial ecosystem',
    hint:'The word comes from terra, meaning land or earth.',
    explanation:'An ecosystem on land is <b>terrestrial</b>. One in water is aquatic, and one in the sea is marine.' }),

  makeMCQ({ id:'g6sci-eco-021', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:2,
    question:'Which of these is a terrestrial ecosystem?',
    options:['A forest','A lagoon','A river','A coral reef'], answer:'A forest',
    hint:'Only one of the four is not in water.',
    explanation:'A <b>forest</b> is on land, so it is terrestrial. A lagoon, a river and a reef are all aquatic ecosystems.' }),

  makeMCQ({ id:'g6sci-eco-022', chapterId:'g6-ecosystems', subsection:'habitats', difficulty:3,
    question:'Why can a crab of the lagoon not live in the forest?',
    options:['Each living thing suits its own ecosystem','Crabs cannot move over land','The forest is too crowded','Crabs are too small for a forest'], answer:'Each living thing suits its own ecosystem',
    hint:'Think about what the lagoon gives the crab that the forest cannot.',
    explanation:'<b>Each living thing suits its own ecosystem</b>, and the lagoon crab is built for salt water. Comparing the living things of two ecosystems is a Grade 6 outcome.' }),

  makeMCQ({ id:'g6sci-an-020', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'Scientists classify animals into groups such as mammals, birds, fish, reptiles and amphibians. Why?',
    options:['Animals in a group share the same features','It makes the names shorter','Each group lives on its own island','It shows which animals are useful'], answer:'Animals in a group share the same features',
    hint:'Think about what all birds have that no fish has.',
    explanation:'Animals are classified because <b>the members of a group share the same features</b> &mdash; feathers, fur, scales &mdash; which makes it easier to study and name them.' }),

  makeMCQ({ id:'g6sci-an-021', chapterId:'g6-animals', subsection:'classification', difficulty:2,
    question:'Which group do animals with feathers belong to?',
    options:['Birds','Mammals','Reptiles','Amphibians'], answer:'Birds',
    hint:'No other group of animals has them.',
    explanation:'Feathers belong to <b>birds</b> alone, so they are the feature that places an animal in that group.' }),

  makeMCQ({ id:'g6sci-an-022', chapterId:'g6-animals', subsection:'classification', difficulty:3,
    question:'A bat flies and has no feathers, and it feeds its young on milk. Which group is it in?',
    options:['Mammals','Birds','Reptiles','Insects'], answer:'Mammals',
    hint:'Grouping goes by the shared features, not by what the animal can do.',
    explanation:'Feeding its young on milk makes a bat a <b>mammal</b>, whatever else it can do. Flying is not what decides the group.' }),

  makeMCQ({ id:'g6sci-an-023', chapterId:'g6-animals', subsection:'diet', difficulty:2,
    question:'Why does the body need a balanced diet?',
    options:['To stay healthy and grow properly','To make the meal look better','To use up all the food groups','To make eating take longer'], answer:'To stay healthy and grow properly',
    hint:'Each food group does a different job inside the body.',
    explanation:'Each food group does a different job, so a balanced diet keeps the body <b>healthy and growing properly</b>. Missing one out leaves a job undone.' }),

  makeMCQ({ id:'g6sci-an-024', chapterId:'g6-animals', subsection:'diet', difficulty:3,
    question:'A child eats only rice and bread for every meal. Why is that not healthy?',
    options:['Several food groups are missing','Rice and bread are bad foods','The meals are too small','The food is cooked too long'], answer:'Several food groups are missing',
    hint:'Name the food group rice and bread belong to, then name the ones they do not.',
    explanation:'Rice and bread are carbohydrates only, so <b>proteins, vitamins and minerals are missing</b>. The body cannot grow and repair itself properly without them.' }),

  makeMCQ({ id:'g6sci-an-025', chapterId:'g6-animals', subsection:'diet', difficulty:2,
    question:'Which of these does a human get from an animal?',
    options:['Milk','Rice','Sugar','Bread'], answer:'Milk',
    hint:'Three of the four come from plants.',
    explanation:'<b>Milk</b> comes from animals, while rice, sugar and bread all come from plants. People also use animals for eggs, meat, leather, wool and work.' }),

  makeMCQ({ id:'g6sci-an-026', chapterId:'g6-animals', subsection:'diet', difficulty:3,
    question:'Besides food, give one way in which humans use animals.',
    options:['For leather, wool and work','For making glass and steel','For lighting their houses','For cooling the air'], answer:'For leather, wool and work',
    hint:'Think about clothes and about a farm before tractors.',
    explanation:'Humans use animals for <b>leather, wool and work</b> as well as for food, and keep many as pets or for company.' }),

  makeMCQ({ id:'g6sci-an-027', chapterId:'g6-animals', subsection:'habitats', difficulty:3,
    question:'Which gas do animals give out that helps to keep the air balanced for plants?',
    options:['Carbon dioxide','Oxygen','Nitrogen','Water vapour'], answer:'Carbon dioxide',
    hint:'It is the gas a plant needs in order to make its food.',
    explanation:'Animals breathe out <b>carbon dioxide</b>, which is exactly the gas plants need. That is how animals help to maintain the composition of the air.' })

);

'use strict';
// ══════════════════════════════════════════════════════════════════════════
//  Grade 9 Physics - Science, Technology & Society, depth pass  (examWeight 2)
//
//  ⚠ WHY THESE TWO SUBSECTIONS AND NOT OTHERS. The STS row of the NCF/TLS
//    (printed 75 / PDF 81) lists nine outcomes and eight were already taken by
//    the other two packs after the 2026-09-08 split: Christiaan Barnard,
//    evaluating information and ethics went to Biology; distillation,
//    chromatography, climate change and the CO2/temperature correlation went to
//    Chemistry. Physics kept only "optical fibres in medicine and in
//    communications technology".
//    - `justifying_views` is the one syllabus outcome NO pack had claimed:
//      "Express and justify different views that are consistent with scientific
//      knowledge and claims" (NCF §STS, verbatim).
//    - `energy_and_society` is the only society-facing physics content the real
//      papers actually examine, and it is examined in EVERY year read:
//      2021 Q5(a) polluting/non-polluting table + "one disadvantage of a
//      hydro-electric power station", 2022 Q1(d) bagasse as a non-polluting
//      source (the single Mauritian context in four Physics papers - see
//      blueprint-science.md §X.7) and Q2(c) "give one advantage of producing
//      electricity in thermal power stations", 2023 Q1(b) non-renewable source,
//      2025 Q1(i) the thermal power station transformation and Q4(i)-(ii) the
//      non-renewable table with "one advantage of using renewable sources".
//      blueprint-science.md names Physics 2022 Q2(c) as the nearest neighbour
//      to STS anywhere in the Physics corpus.
//
//  ⚠ THE BOUNDARY WITH P3 IS DELIBERATE AND NARROW. `g9s-p3-energy` owns the
//    classification - which source is renewable, which is polluting, what turns
//    the generator. NOTHING here repeats that. These items are about the
//    CONSEQUENCES for people: imported fuel and who controls its price, land
//    taken by a solar farm, noise near a wind farm, air quality near a coal
//    station, what a grid does when the wind drops, who is consulted before a
//    station is built. A question that could be answered by naming a source
//    belongs in P3, not here.
//
//  ⚠ THE ELECTRICITY-MIX TABLE IS A SCENARIO, NOT A NATIONAL STATISTIC. It is
//    labelled "an island" on purpose. Publishing invented percentages under the
//    name of Mauritius would teach a child a false fact and it would go stale
//    besides; the skill being tested is reading the table, which the real 2025
//    Q4 does with a table of exactly this shape.
//
//  ⚠ <i> IS AN HTML BREAKOUT TAG AND MUST NEVER APPEAR INSIDE AN <svg>.
//
//  Source: NCE Science (Physics) 2021, 2022, 2023, 2025; NCF Grades 7-9 §STS.
// ══════════════════════════════════════════════════════════════════════════

(function () {

const CH = 'g9s-sts';

const mixTable = () => {
  const rows = [['Imported coal', '42'], ['Imported fuel oil', '30'],
                ['Bagasse from cane', '15'], ['Solar', '8'], ['Wind', '5']];
  const W = 250, X0 = 18, RH = 19, top = 24, c1 = X0 + 130;
  const H = top + RH * (rows.length + 1) + 10;
  let g = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="260" role="img" aria-label="a table of energy sources and their shares">';
  g += '<text x="' + (W / 2) + '" y="15" font-size="10" text-anchor="middle" fill="#0f172a">Electricity made on an island in one year</text>';
  g += '<rect x="' + X0 + '" y="' + top + '" width="' + (W - 2 * X0) + '" height="' + (RH * (rows.length + 1)) + '" fill="none" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + c1 + '" y1="' + top + '" x2="' + c1 + '" y2="' + (top + RH * (rows.length + 1)) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<line x1="' + X0 + '" y1="' + (top + RH) + '" x2="' + (W - X0) + '" y2="' + (top + RH) + '" stroke="#0f172a" stroke-width="1.5"/>';
  g += '<text x="' + (X0 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Energy source</text>';
  g += '<text x="' + (c1 + 5) + '" y="' + (top + 13) + '" font-size="9" fill="#0f172a">Share / %</text>';
  rows.forEach((r, i) => {
    const y = top + RH * (i + 1);
    if (i) g += '<line x1="' + X0 + '" y1="' + y + '" x2="' + (W - X0) + '" y2="' + y + '" stroke="#cbd5e1" stroke-width="1"/>';
    g += '<text x="' + (X0 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[0] + '</text>';
    g += '<text x="' + (c1 + 5) + '" y="' + (y + 13) + '" font-size="9" fill="#334155">' + r[1] + '</text>';
  });
  return g + '</svg>';
};

const MIX = mixTable();

const MCQ = [
  // ── optical_fibres ────────────────────────────────────────────────────
  ['g9s-sts-301', 'optical_fibres', 2,
   'What keeps the light inside an optical fibre?',
   ['Total internal reflection at the sides',
    'A thin coat of paint on the outside',
    'A weak electric current in the core',
    'A magnetic field around the whole fibre'],
   'Total internal reflection at the sides',
   'The light strikes the boundary at a very shallow angle.',
   'Light meeting the boundary at a shallow angle is reflected completely back into the fibre, over and over, so almost none escapes through the side.'],

  ['g9s-sts-302', 'optical_fibres', 1,
   'What is an optical fibre made of?',
   ['A very thin thread of pure glass',
    'A very thin strand of pure copper',
    'A very thin tube of running water',
    'A very thin sheet of plane mirror'],
   'A very thin thread of pure glass',
   'The material has to be transparent from end to end.',
   'A fibre is drawn from very pure glass, thinner than a human hair, so light can travel kilometres through it before it fades.'],

  ['g9s-sts-303', 'optical_fibres', 2,
   'Why does light still reach the far end when an optical fibre is gently bent?',
   ['It reflects off the inside surface each time',
    'It passes straight out and back in again',
    'It is pushed round the bend by the current',
    'It travels much more slowly round a bend'],
   'It reflects off the inside surface each time',
   'The light does not have to travel in one straight line to get there.',
   'At every gentle bend the light meets the wall at a shallow angle and is reflected back inside, so it follows the fibre round the curve.'],

  ['g9s-sts-304', 'optical_fibres', 3,
   'An optical fibre carries no electric current. Why is that an advantage?',
   ['Nearby electrical machines cannot spoil the signal',
    'The fibre can be made much longer than a wire',
    'The signal can travel in both directions at once',
    'The fibre costs much less to make than a wire'],
   'Nearby electrical machines cannot spoil the signal',
   'Think about what a motor or a power cable does to a nearby wire.',
   'A copper wire picks up interference from motors and power cables. A glass fibre carries light, so those fields cannot reach the signal at all.'],

  ['g9s-sts-305', 'optical_fibres', 2,
   'How is information carried along an optical fibre?',
   ['As pulses of light switched very quickly',
    'As a beam of light of a changing colour',
    'As a current that grows and shrinks fast',
    'As a sound wave travelling in the glass'],
   'As pulses of light switched very quickly',
   'Think of a light being flashed on and off very fast.',
   'A laser or LED at one end flashes on and off millions of times a second; the pattern of pulses is the data, and a detector reads it at the far end.'],

  ['g9s-sts-306', 'optical_fibres', 3,
   'An endoscope contains two bundles of optical fibres. What does each bundle do?',
   ['One carries light in, the other brings a picture out',
    'One carries light in, the other carries water out',
    'One carries the current, the other the picture',
    'One carries light in, the other holds it steady'],
   'One carries light in, the other brings a picture out',
   'The inside of the body is dark, and the doctor is outside it.',
   'One bundle lights the space being examined and the other carries the reflected image back to an eyepiece or a camera outside the patient.'],

  ['g9s-sts-307', 'optical_fibres', 3,
   'Why is keyhole surgery using an endoscope better for a patient?',
   ['Only a small cut is needed, so healing is quicker',
    'The operation can be done without any doctors there',
    'The patient does not need any medicine at all',
    'The operation is finished in under one minute'],
   'Only a small cut is needed, so healing is quicker',
   'Compare the size of the opening with an ordinary operation.',
   'The endoscope enters through a small opening instead of a large cut, so there is less pain, less risk of infection and a shorter stay in hospital.'],

  ['g9s-sts-308', 'optical_fibres', 4,
   'Why is an undersea fibre cable preferred to a satellite for internet traffic?',
   ['It carries far more data with far less delay',
    'It can be repaired much faster when it breaks',
    'It needs no equipment at either end of it',
    'It works even when the weather is very poor'],
   'It carries far more data with far less delay',
   'Think about how far a signal to a satellite has to travel.',
   'A satellite signal travels tens of thousands of kilometres up and back, adding a noticeable delay, and carries far less traffic than a fibre cable.'],

  ['g9s-sts-309', 'optical_fibres', 2,
   'What is a genuine drawback of optical fibre cable?',
   ['The thin glass snaps if it is bent too sharply',
    'The glass slowly dissolves in ordinary water',
    'The fibre carries a dangerous electric shock',
    'The fibre only works during the daytime'],
   'The thin glass snaps if it is bent too sharply',
   'Think about what glass does when it is bent hard.',
   'Fibre is glass, so a sharp bend or a crush breaks it, and joining two ends again needs special equipment. That is a real limitation, not a fatal one.'],

  ['g9s-sts-310', 'optical_fibres', 2,
   'How many telephone calls can one optical fibre carry at a time?',
   ['Many thousands, all at the same moment',
    'One only, from one caller to another',
    'Two only, one in each direction at once',
    'None, as a fibre carries only pictures'],
   'Many thousands, all at the same moment',
   'Think about how fast the light can be switched on and off.',
   'Because the light is switched millions of times a second, one fibre carries thousands of conversations and a great deal of internet traffic together.'],

  ['g9s-sts-311', 'optical_fibres', 4,
   'A phone produces an electrical signal. What must be at each end of a fibre link?',
   ['A device to change electricity to light and back',
    'A device to make the light much brighter first',
    'A device to slow the light down as it arrives',
    'A device to bend the fibre round the corners'],
   'A device to change electricity to light and back',
   'The fibre carries light, but the phone works electrically.',
   'A transmitter turns the electrical signal into light pulses and a receiver turns the pulses back into an electrical signal for the phone.'],

  ['g9s-sts-312', 'optical_fibres', 2,
   'Why can a fibre link cross an ocean with fewer boosting stations than copper?',
   ['Much less of the signal is lost along the way',
    'The signal travels around the whole world',
    'The cable is far heavier than a copper one',
    'The cable needs no protection on the sea bed'],
   'Much less of the signal is lost along the way',
   'Think about how much of the signal survives each kilometre.',
   'Very pure glass absorbs little light, so a fibre signal fades far more slowly than a current in copper and needs boosting far less often.'],

  // ── energy_and_society ────────────────────────────────────────────────
  ['g9s-sts-315', 'energy_and_society', 3,
   'An island buys almost all of the fuel its power stations burn. What is the main risk to the people?',
   ['The price and supply are decided elsewhere',
    'The fuel takes several days to be delivered',
    'The fuel has to be stored in large tanks',
    'The power stations must run day and night'],
   'The price and supply are decided elsewhere',
   'Think about who controls a fuel that has to be bought abroad.',
   'Imported fuel leaves a country exposed: a rise in the world price, or a supply cut, raises everyone&rsquo;s electricity bill and is outside its control.'],

  ['g9s-sts-316', 'energy_and_society', 3,
   'Why is burning bagasse to generate electricity useful to Mauritius beyond the electricity itself?',
   ['It uses a waste material already on the island',
    'It produces far more heat than any other fuel',
    'It works just as well when there is no sunshine',
    'It can be sold to other countries at a high price'],
   'It uses a waste material already on the island',
   'Where does bagasse come from, and did anyone have to buy it in?',
   'Bagasse is what is left after cane is crushed. Burning it turns a waste product of an existing industry into power, with no fuel to import.'],

  ['g9s-sts-317', 'energy_and_society', 3,
   'A wind farm produces no electricity on a still day. What must the electricity network also have?',
   ['Other stations able to supply the demand',
    'A much larger number of wind turbines',
    'A way of making the wind blow harder',
    'A rule that people use less on still days'],
   'Other stations able to supply the demand',
   'Homes and hospitals still need power when the wind drops.',
   'Wind is intermittent, so a grid keeps other stations, imported power or stored energy ready. That backup is part of the true cost of wind.'],

  ['g9s-sts-318', 'energy_and_society', 2,
   'People living near a proposed wind farm object to it. What is their most likely reason?',
   ['The noise and the change to the landscape',
    'The smoke that the turbines send out',
    'The ash that has to be buried nearby',
    'The fuel lorries passing the house every day'],
   'The noise and the change to the landscape',
   'A turbine burns nothing, so what is left to object to?',
   'Turbines make a steady swishing noise and are visible for kilometres. Those are real objections even though the turbines produce no smoke or ash.'],

  ['g9s-sts-319', 'energy_and_society', 3,
   'Why can a large solar farm be difficult to site on a small island?',
   ['It needs a lot of land that is wanted for other uses',
    'It needs to be built right beside a very large river',
    'It needs a tall chimney to carry the fumes away',
    'It needs a deep mine dug underneath the panels'],
   'It needs a lot of land that is wanted for other uses',
   'Think about what else that flat, sunny land could be used for.',
   'Solar panels are spread out, so a farm covers hectares. On a small island that land competes with farming, housing and forest.'],

  ['g9s-sts-320', 'energy_and_society', 4,
   'A family fits solar panels on the roof of their house. What happens to their electricity bill?',
   ['They buy less from the grid during the day',
    'They stop paying for electricity completely',
    'They pay the same amount as before was paid',
    'They pay more because the panels use power'],
   'They buy less from the grid during the day',
   'When do the panels produce, and when does the family use power?',
   'Panels supply the house while the sun shines, so less is bought from the grid. In the evening the family still draws power, so the bill falls but does not vanish.'],

  ['g9s-sts-321', 'energy_and_society', 3,
   'A coal-fired power station is built near a town. What is the main concern for the people living there?',
   ['The gases and smoke harm the air they breathe',
    'The station is very noisy at night for them',
    'The station takes up a great deal of space',
    'The station needs many workers to run it'],
   'The gases and smoke harm the air they breathe',
   'Think about what leaves the chimney and where it goes.',
   'Burning coal releases smoke particles and sulfur dioxide, which worsen breathing problems in the surrounding population. That is a health cost, not just a climate one.'],

  ['g9s-sts-322', 'energy_and_society', 4,
   'A government must choose between a cheap coal station and a costlier solar farm. What should the decision rest on?',
   ['Measured costs, output and effects on health',
    'Whichever one of them can be built the fastest',
    'Whichever one appears in the news most',
    'Whichever one the loudest group prefers'],
   'Measured costs, output and effects on health',
   'A decision consistent with scientific evidence uses numbers.',
   'A sound decision weighs the measured build cost, the electricity each will produce, the fuel bills over its life and the effects on health and climate.'],

  ['g9s-sts-323', 'energy_and_society', 3,
   'Which is a genuine measure for cutting the carbon dioxide from making electricity?',
   ['Replacing fossil-fuel stations with renewable ones',
    'Building the chimney of the station much taller',
    'Running the coal station only in the afternoon',
    'Moving the coal station further from the town'],
   'Replacing fossil-fuel stations with renewable ones',
   'Which choice changes how much fuel is burned in total?',
   'A taller chimney or a new site only moves the gas about. Only burning less fossil fuel reduces the carbon dioxide released.'],

  ['g9s-sts-324', 'energy_and_society', 2,
   'Why does switching off unused lights and appliances matter to a whole country?',
   ['Less fuel has to be burned in the stations',
    'The electricity travels faster in the wires',
    'The lamps last for very much longer in use',
    'The wires in the house are kept much cooler'],
   'Less fuel has to be burned in the stations',
   'The grid makes only as much electricity as is being used.',
   'Power stations supply what is demanded from moment to moment. Millions of small savings mean less fuel bought, burned and paid for nationally.'],

  ['g9s-sts-325', 'energy_and_society', 3,
   'An LED lamp gives the same light as a filament lamp for a fifth of the electrical power. Why does this matter?',
   ['The same light is had for much less fuel burned',
    'The light produced is a much brighter white',
    'The lamp can be switched on far more often',
    'The lamp gives out much more heat than before'],
   'The same light is had for much less fuel burned',
   'Compare what goes in with what comes out.',
   'A filament lamp wastes most of its energy as heat. An LED delivers the same light for a fraction of the power, so less fuel is burned for the same benefit.'],

  ['g9s-sts-326', 'energy_and_society', 4,
   'Large batteries are installed beside a solar farm. What problem do they solve?',
   ['The panels make nothing after the sun has set',
    'The panels make far too little on a sunny day',
    'The panels cannot be connected to the grid',
    'The panels stop working when they get warm'],
   'The panels make nothing after the sun has set',
   'When is demand high, and when does a panel produce?',
   'Demand peaks in the evening, when panels produce nothing. Batteries store the midday surplus and release it later, so the solar energy is not wasted.'],

  ['g9s-sts-327', 'energy_and_society', 3,
   'Why does hydro-electricity supply only a small share of a small island&rsquo;s power?',
   ['There are few rivers large enough to use',
    'Water cannot be used to turn a turbine',
    'Hydro stations release a great deal of smoke',
    'Hydro stations can only run in the daytime'],
   'There are few rivers large enough to use',
   'What does a hydro station need that an island may not have?',
   'A hydro station needs a large steady flow and a height to fall from. A small island has few such sites, so hydro can only ever be part of the supply.'],

  ['g9s-sts-328', 'energy_and_society', 3,
   'Why does a hospital keep a diesel generator even when it is joined to the grid?',
   ['A power cut would stop equipment keeping people alive',
    'A generator makes electricity more cheaply than the grid',
    'A generator produces far less pollution than the grid',
    'A generator is needed to light the corridors at night'],
   'A power cut would stop equipment keeping people alive',
   'Think about what is running in an operating theatre.',
   'Ventilators, monitors and theatre lights cannot stop, so hospitals keep their own supply for the minutes or hours a grid failure lasts.'],

  ['g9s-sts-329', 'energy_and_society', 4,
   'Before a new power station is built, who should be consulted?',
   ['The people living near the chosen site',
    'Only the engineers who designed it',
    'Only the company that will build it',
    'Only the workers it will employ later'],
   'The people living near the chosen site',
   'Who lives with the noise, the traffic and the air?',
   'Neighbours carry the noise, traffic, air quality and land-use effects, so their views belong in the decision alongside the engineering and the cost.'],

  ['g9s-sts-332', 'energy_and_society', 3,
   MIX + '<br>Which source supplied the largest share of the electricity?',
   ['Imported coal', 'Imported fuel oil', 'Bagasse from cane', 'Solar and wind'],
   'Imported coal',
   'Compare the numbers in the second column.',
   'Coal supplied 42%, more than any other single source. Fuel oil was next with 30%.'],

  ['g9s-sts-334', 'energy_and_society', 4,
   MIX + '<br>What does the table show about how much of this island&rsquo;s electricity is imported fuel?',
   ['Nearly three quarters comes from imported fuel',
    'Just under one quarter is from imported fuel',
    'Almost none of it comes from imported fuel',
    'Exactly one half of it is from imported fuel'],
   'Nearly three quarters comes from imported fuel',
   'Add the two rows whose names begin with the same word.',
   'Coal 42% and fuel oil 30% together are 72%, so almost three quarters of the island&rsquo;s electricity depends on fuel bought from abroad.'],

  // ── justifying_views ──────────────────────────────────────────────────
  ['g9s-sts-335', 'justifying_views', 2,
   'What makes a view about a scientific question a strong one?',
   ['It is supported by evidence others can check',
    'It is held by a very large number of people',
    'It is stated more loudly than the other views',
    'It has been believed for a very long time now'],
   'It is supported by evidence others can check',
   'Think about what another person could do with your reason.',
   'A scientific view stands on measurements anyone can repeat. Popularity, volume and age are not evidence, however convincing they feel.'],

  ['g9s-sts-336', 'justifying_views', 3,
   'A shop says its torch is "the brightest you can buy". What evidence would settle the claim?',
   ['Light output measured the same way for each torch',
    'The opinion of the shopkeeper who is selling them',
    'The price of each torch on the shelf today',
    'The size of the writing printed on the box'],
   'Light output measured the same way for each torch',
   'A comparison needs a number taken in the same conditions.',
   'The claim compares torches, so each must be measured with the same meter at the same distance. Anything else compares packaging, not brightness.'],

  ['g9s-sts-337', 'justifying_views', 4,
   'A device is advertised as cutting a car&rsquo;s fuel use by 30%. How should the claim be tested?',
   ['Measure fuel used on the same trip with and without',
    'Ask several drivers whether the device feels good',
    'Read the advertisement through very carefully',
    'Fit the device and drive a much shorter route'],
   'Measure fuel used on the same trip with and without',
   'Only one thing should differ between the two runs.',
   'The same car, route, load and driving style, with the device the only difference, and repeated. Opinions and a shorter route settle nothing.'],

  ['g9s-sts-338', 'justifying_views', 3,
   'Why must a claim about a product be tested by a fair comparison?',
   ['Otherwise something else could explain the result',
    'Otherwise the test would take far too long',
    'Otherwise the product would cost a great deal more',
    'Otherwise nobody would want to buy any of it'],
   'Otherwise something else could explain the result',
   'Think what else might have changed between the two tests.',
   'If the second run was downhill, or in a lighter car, the saving may have nothing to do with the device. Only a fair comparison isolates the cause.'],

  ['g9s-sts-339', 'justifying_views', 2,
   'Two pupils disagree about which of two lamps is brighter. What should settle it?',
   ['A measurement taken of each of the lamps',
    'A vote taken among the rest of the class',
    'Whichever pupil argues for the longest time',
    'Whichever lamp has the higher price on it'],
   'A measurement taken of each of the lamps',
   'A disagreement about a quantity has a measurable answer.',
   'Brightness can be measured, so the argument is settled by a meter rather than by opinion, voting or price.'],

  ['g9s-sts-340', 'justifying_views', 4,
   'A friend insists that heavier objects always fall faster. Which evidence would test this?',
   ['Release a heavy and a light ball together and watch',
    'Ask the other pupils what they think happens next',
    'Look up which ball weighs more on a balance',
    'Read the chapter about weight in the textbook'],
   'Release a heavy and a light ball together and watch',
   'The claim is about falling, so watch two things fall.',
   'Released together from the same height, a heavy and a light ball land together, which contradicts the claim directly. That observation outweighs any opinion.'],

  ['g9s-sts-341', 'justifying_views', 3,
   'Someone says a phone charger left plugged in uses as much energy as a fridge. How could this be checked?',
   ['Measure both with an energy meter for a day',
    'Feel whether the charger is warm to the touch',
    'Ask the shop that sold the charger about it',
    'Compare the sizes of the two plugs on them'],
   'Measure both with an energy meter for a day',
   'The claim is about energy used, so measure energy used.',
   'A plug-in energy meter reads the energy each uses over the same period. Warmth shows some waste but says nothing about how much.'],

  ['g9s-sts-342', 'justifying_views', 3,
   'An advertisement claims a product is "scientifically proven" but gives no figures. Why is that weak?',
   ['Nobody can check a claim with no numbers in it',
    'Adverts are not allowed to print any numbers',
    'Scientists never use the word proven at all',
    'The product must therefore be very expensive'],
   'Nobody can check a claim with no numbers in it',
   'What would you need in order to test it yourself?',
   'Without the measurement, the method and who made it, the phrase carries no information. A claim that cannot be checked cannot be trusted.'],

  ['g9s-sts-343', 'justifying_views', 3,
   'A claim rests on one single measurement. What is missing?',
   ['Repeats, to show the reading can be trusted',
    'A picture of the meter that was used',
    'The name of the person who measured it out',
    'The date on which it was measured'],
   'Repeats, to show the reading can be trusted',
   'One reading could be a mistake and nobody would know.',
   'A single reading may be anomalous. Repeats that agree, ideally by more than one person, are what turns a measurement into evidence.'],

  ['g9s-sts-344', 'justifying_views', 4,
   'A website sells a machine it says "makes energy out of nothing". Why should this be rejected?',
   ['Energy can only be transferred, never created',
    'The machine would need to be far too large',
    'The machine would be far too costly to buy',
    'The website does not give a phone number'],
   'Energy can only be transferred, never created',
   'Think about the principle every energy question in this course uses.',
   'Conservation of energy is supported by every measurement ever made: energy is transferred from one store to another, never created. The claim contradicts it.'],

  ['g9s-sts-345', 'justifying_views', 3,
   'A driver says a fuel "feels faster" in his car. Why is this weak evidence?',
   ['A feeling is not a measurement anyone can check',
    'The driver has not owned the car for long',
    'A car cannot go faster than the speed limit',
    'The fuel was probably bought at a cheap price'],
   'A feeling is not a measurement anyone can check',
   'Could a second person get the same result?',
   'An impression is affected by expectation and mood, and cannot be repeated. A timed run over a measured distance can be.'],

  ['g9s-sts-346', 'justifying_views', 3,
   'What is the best reason for changing your mind about a scientific claim?',
   ['New evidence that has been carefully checked',
    'A friend disagreeing with you very firmly',
    'Seeing the claim repeated on social media',
    'Growing tired of arguing about the matter'],
   'New evidence that has been carefully checked',
   'Which of these tells you something about the world?',
   'Changing a view when the evidence changes is the strength of science, not a weakness. Pressure and repetition are not evidence.'],

  ['g9s-sts-347', 'justifying_views', 4,
   'A test showing a device works was paid for by the company selling it. Why does that matter?',
   ['The test may have been arranged to favour it',
    'The test must have cost a great deal to run',
    'The company cannot understand the results',
    'The device must therefore be very popular'],
   'The test may have been arranged to favour it',
   'Who gains if the result comes out well?',
   'An interest in the outcome can shape a method without any dishonesty. That is why independent testing, and publishing the method, carry more weight.'],

  ['g9s-sts-348', 'justifying_views', 3,
   'Two groups get different results from the same experiment. What is the scientific response?',
   ['Compare the two methods and repeat the work',
    'Accept the result from the larger group',
    'Take the mean of the two disagreeing results',
    'Publish the result that looks the tidier one'],
   'Compare the two methods and repeat the work',
   'The disagreement itself is a clue about the method.',
   'A difference usually points at something in one method &mdash; a zero error, a different technique. Finding it is more valuable than averaging it away.'],

  ['g9s-sts-349', 'justifying_views', 2,
   'Why should a view be stated together with the evidence for it?',
   ['So others can judge whether to accept it',
    'So the sentence is a little bit longer',
    'So it sounds more serious to a reader',
    'So it cannot be argued with by anyone'],
   'So others can judge whether to accept it',
   'What can a reader do with the reason that they cannot do with the view?',
   'Evidence lets a reader test the view instead of taking it on trust. A view given with its reasons can be argued with, which is the point.'],

  ['g9s-sts-350', 'justifying_views', 4,
   'A newspaper article says solar panels are useless on a tropical island, giving no data. How should a reader respond?',
   ['Look for measured output figures for the island',
    'Accept it, as newspapers check their facts',
    'Reject it, as newspapers are always wrong',
    'Ask friends what they think about the article'],
   'Look for measured output figures for the island',
   'Neither accepting nor rejecting it settles anything.',
   'The honest response is to find the measurements &mdash; energy generated per panel over a year in that climate &mdash; and judge the claim against them.'],

  ['g9s-sts-351', 'justifying_views', 2,
   'A claim cannot be tested by any measurement at all. What does that tell you?',
   ['It is not a scientific claim, whatever it says',
    'It is certainly false and should be ignored',
    'It is certainly true and needs no testing',
    'It is a claim only a scientist may discuss'],
   'It is not a scientific claim, whatever it says',
   'Science works on claims that evidence could go against.',
   'A claim no measurement could ever contradict is outside science. That does not automatically make it false, but it does mean evidence cannot settle it.'],

  ['g9s-sts-352', 'justifying_views', 4,
   'Two pupils argue about whether a longer wire lowers the current. How should they settle it?',
   ['Build the circuit and read the ammeter',
    'Look at which pupil is better at physics',
    'Ask the rest of the class to take a vote',
    'Agree that both of them may be correct'],
   'Build the circuit and read the ammeter',
   'The question is about a quantity that a meter can read.',
   'The disagreement is testable in ten minutes: same cells, same wire, different lengths, ammeter readings recorded. Evidence settles it, not authority.'],
];

MCQ.forEach(([id, subsection, difficulty, question, options, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeMCQ({ id, chapterId: CH, subsection, difficulty,
    question, options, answer, hint, explanation }));
});

const NUM = [
  ['g9s-sts-333', 'energy_and_society', 4,
   MIX + '<br>What percentage of this island&rsquo;s electricity came from renewable sources?',
   28, 'Bagasse, solar and wind are the renewable rows.', '15 + 8 + 5 = 28%, so a little over a quarter came from renewable sources.'],
];

NUM.forEach(([id, subsection, difficulty, question, answer, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeNum({ id, chapterId: CH, subsection, difficulty,
    question, answer, hint, explanation }));
});

const SHORT = [
  ['g9s-sts-313', 'optical_fibres', 2,
   'Name the effect that keeps light travelling inside an optical fibre.',
   'Total internal reflection', ['internal reflection', 'total reflection'],
   'Three words, and the last one is what a mirror does.',
   'Light meeting the wall of the fibre at a shallow angle undergoes <b>total internal reflection</b> and stays inside.'],
  ['g9s-sts-314', 'optical_fibres', 1,
   'Name the material that optical fibres are made from.',
   'Glass', ['pure glass', 'silica'],
   'One word, and it is transparent.',
   'Fibres are drawn from very pure <b>glass</b>, so light can travel a long way through them before it fades.'],

  ['g9s-sts-353', 'justifying_views', 2,
   'Give the word for information collected by measurement that supports or contradicts a claim.',
   'Evidence', ['data', 'the evidence'],
   'One word, and it is what a scientific view rests on.',
   '<b>Evidence</b> is measured information that others can check. A view supported by evidence can be tested; an opinion cannot.'],
  ['g9s-sts-354', 'justifying_views', 3,
   'Give the word for the unfair leaning a test may have when it is run by the company selling the product.',
   'Bias', ['biased', 'biassed'],
   'One word, and independent testing is the cure for it.',
   '<b>Bias</b> is a leaning towards a wanted result. It need not be dishonest, which is why independent testing and published methods matter.'],

  ['g9s-sts-355', 'energy_and_society', 2,
   'Give the word for getting the same job done using less energy.',
   'Efficiency', ['energy efficiency', 'efficient'],
   'An LED lamp has more of it than a filament lamp.',
   '<b>Efficiency</b> means less energy wasted for the same useful output, so less fuel is burned for the same benefit.'],
  ['g9s-sts-356', 'energy_and_society', 3,
   'Give the word describing a source such as wind, which does not supply power all of the time.',
   'Intermittent', ['intermittant', 'variable'],
   'It comes and goes, so backup is needed.',
   'Wind and solar are <b>intermittent</b>: they generate only when the wind blows or the sun shines, so the grid needs backup or storage.'],
];

SHORT.forEach(([id, subsection, difficulty, question, answer, alsoAccept, hint, explanation]) => {
  STATIC_QUESTIONS.push(makeText({ id, chapterId: CH, subsection, difficulty,
    question, answer, alsoAccept, hint, explanation }));
});
})();

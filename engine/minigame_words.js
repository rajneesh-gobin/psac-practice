'use strict';
// ══════════════════════════════════════════════
//  Word bank for the "Word Builder" minigame — spell your way across the lagoon.
//
//  Curated PSAC-level English vocabulary, banded by difficulty:
//    band 1 — grade 3–4 words (short, phonetic)
//    band 2 — grade 5 words (longer, everyday + Mauritius life)
//    band 3 — grade 6 words (the classic hard-to-spell exam words)
//  Each: { word, clue, band }. The word is UPPERCASE A–Z only (tiles are
//  letters, so no hyphens or accents here — French spelling lives in the
//  French packs, not this game).
//
//  ⚠ A clue must NEVER contain its own word (or the game spells itself).
//  scripts/test-minigame-arcade.js enforces this and the charset.
// ══════════════════════════════════════════════
window.MINIGAME_WORDS = [
  // ── Band 1 ───────────────────────────────────
  { word:'MANGO', clue:'A sweet golden tropical fruit with one big flat seed inside.', band:1 },
  { word:'BEACH', clue:'The sandy shore where the sea meets the land.', band:1 },
  { word:'RIVER', clue:'Fresh water flowing across the land towards the sea.', band:1 },
  { word:'CLOUD', clue:'A white or grey shape floating in the sky, made of tiny drops of water.', band:1 },
  { word:'HOUSE', clue:'A building where a family lives.', band:1 },
  { word:'QUEEN', clue:'A woman who rules a country, or the most important bee in the hive.', band:1 },
  { word:'TIGER', clue:'A big striped wild cat from Asia.', band:1 },
  { word:'WATER', clue:'You drink it every day — it falls from the clouds as rain.', band:1 },
  { word:'GREEN', clue:'The colour of grass and leaves.', band:1 },
  { word:'NIGHT', clue:'The dark part of the day, when the stars come out.', band:1 },
  { word:'FRUIT', clue:'Mangoes, bananas and lychees are all this kind of food.', band:1 },
  { word:'SUGAR', clue:'The sweet crystals made from the cane grown all over Mauritius.', band:1 },
  { word:'SCHOOL', clue:'The place where children go to learn.', band:1 },
  { word:'GARDEN', clue:'A place where flowers and vegetables are grown.', band:1 },
  { word:'ISLAND', clue:'A piece of land with water all around it — like Mauritius!', band:1 },
  { word:'FLOWER', clue:'The colourful part of a plant that bees love to visit.', band:1 },
  { word:'WINDOW', clue:'The glass opening in a wall that lets light into a room.', band:1 },
  { word:'YELLOW', clue:'The colour of the sun and of a ripe banana.', band:1 },
  { word:'MONKEY', clue:'A cheeky animal with a long tail that loves climbing trees.', band:1 },
  { word:'BASKET', clue:'You carry fruit and shopping in this woven container.', band:1 },
  { word:'ROCKET', clue:'It blasts off into space with astronauts inside.', band:1 },
  { word:'SUMMER', clue:'The hottest season of the year.', band:1 },
  { word:'PENCIL', clue:'You write with it, and rub out mistakes with an eraser.', band:1 },
  { word:'MARKET', clue:'A busy place full of stalls selling fruit, fish and clothes.', band:1 },
  { word:'SHARK', clue:'A big fish with sharp teeth and a fin that shows above the water.', band:1 },
  { word:'BREAD', clue:'Baked food made from flour — you slice it to make a sandwich.', band:1 },
  { word:'CHAIR', clue:'A seat with four legs and a back, for one person.', band:1 },
  { word:'SMILE', clue:'The happy shape your mouth makes.', band:1 },
  { word:'HEART', clue:'It beats in your chest and pumps blood around your body.', band:1 },
  { word:'LEMON', clue:'A sour yellow citrus fruit.', band:1 },

  // ── Band 2 ───────────────────────────────────
  { word:'DOLPHIN', clue:'A clever, friendly sea animal that leaps out of the waves at Tamarin Bay.', band:2 },
  { word:'VOLCANO', clue:'A mountain that can erupt — Trou aux Cerfs was one long ago.', band:2 },
  { word:'CYCLONE', clue:'A huge spinning storm that can hit Mauritius in summer.', band:2 },
  { word:'LAGOON', clue:'The calm, shallow water between the beach and the coral reef.', band:2 },
  { word:'JOURNEY', clue:'A long trip from one place to another.', band:2 },
  { word:'LIBRARY', clue:'A quiet place full of books you can borrow.', band:2 },
  { word:'KITCHEN', clue:'The room where meals are cooked.', band:2 },
  { word:'TEACHER', clue:'The person who helps you learn at school.', band:2 },
  { word:'HOLIDAY', clue:'A special break when there is no school or work.', band:2 },
  { word:'MORNING', clue:'The part of the day between sunrise and noon.', band:2 },
  { word:'THUNDER', clue:'The loud rumble you hear after lightning flashes.', band:2 },
  { word:'WEATHER', clue:'Sunny, rainy or windy — what the sky is doing today.', band:2 },
  { word:'VILLAGE', clue:'A small group of houses in the countryside, smaller than a town.', band:2 },
  { word:'CAPTAIN', clue:'The leader of a ship or of a sports team.', band:2 },
  { word:'COMPASS', clue:'An instrument with a needle that always points north.', band:2 },
  { word:'HARVEST', clue:'Gathering in the crops when they are ready.', band:2 },
  { word:'FACTORY', clue:'A building where machines make things in large numbers.', band:2 },
  { word:'PYRAMID', clue:'A solid shape with a square base and four triangle faces — Egypt is famous for them.', band:2 },
  { word:'BICYCLE', clue:'A vehicle with two wheels and pedals.', band:2 },
  { word:'CENTURY', clue:'One hundred years.', band:2 },
  { word:'CLIMATE', clue:'The usual weather a place has over many years.', band:2 },
  { word:'HISTORY', clue:'The study of things that happened in the past.', band:2 },
  { word:'HARBOUR', clue:'A sheltered place where ships load and unload — Port Louis has a famous one.', band:2 },
  { word:'WHISPER', clue:'To speak very, very softly.', band:2 },
  { word:'MOUNTAIN', clue:'A very high piece of land — Le Pouce is one.', band:2 },
  { word:'TORTOISE', clue:'A slow reptile with a shell — giant ones live at La Vanille park.', band:2 },
  { word:'BALANCE', clue:'To keep steady without falling over.', band:2 },
  { word:'EXPLAIN', clue:'To make something clear so that others understand it.', band:2 },
  { word:'DIAMOND', clue:'The hardest sparkling gemstone.', band:2 },
  { word:'AIRPORT', clue:'The place where planes take off and land.', band:2 },

  // ── Band 3 ───────────────────────────────────
  { word:'BEAUTIFUL', clue:'Very pretty or lovely to look at.', band:3 },
  { word:'BREAKFAST', clue:'The first meal of the day.', band:3 },
  { word:'CHOCOLATE', clue:'A sweet brown treat made from cocoa beans.', band:3 },
  { word:'DANGEROUS', clue:'Not safe at all.', band:3 },
  { word:'DAUGHTER', clue:'A parent’s girl child.', band:3 },
  { word:'DELICIOUS', clue:'Tasting really, really good.', band:3 },
  { word:'DIFFERENT', clue:'Not the same.', band:3 },
  { word:'EXERCISE', clue:'Running, swimming or stretching to keep your body strong.', band:3 },
  { word:'FAVOURITE', clue:'The one you like best of all.', band:3 },
  { word:'FEBRUARY', clue:'The shortest month of the year.', band:3 },
  { word:'GEOGRAPHY', clue:'The study of maps, mountains, rivers and countries.', band:3 },
  { word:'KNOWLEDGE', clue:'Everything a person has learned and understands.', band:3 },
  { word:'LANGUAGE', clue:'English, French and Kreol are each one of these.', band:3 },
  { word:'LIGHTNING', clue:'The bright electric flash in a storm.', band:3 },
  { word:'MEDICINE', clue:'What a doctor gives you to make you better.', band:3 },
  { word:'NEIGHBOUR', clue:'A person who lives next door.', band:3 },
  { word:'QUESTION', clue:'You raise your hand in class to ask one.', band:3 },
  { word:'SANDWICH', clue:'Two slices of bread with a tasty filling between them.', band:3 },
  { word:'SCISSORS', clue:'A tool with two blades, for cutting paper.', band:3 },
  { word:'TOMORROW', clue:'The day after today.', band:3 },
  { word:'VEGETABLE', clue:'A carrot, a cabbage or a pumpkin, for example.', band:3 },
  { word:'WEDNESDAY', clue:'The day in the middle of the school week.', band:3 },
  { word:'YESTERDAY', clue:'The day before today.', band:3 },
  { word:'CALENDAR', clue:'It shows all the months and days of the year.', band:3 },
  { word:'DICTIONARY', clue:'The book where you look up what words mean.', band:3 },
  { word:'ADVENTURE', clue:'An exciting and slightly risky journey or experience.', band:3 },
  { word:'FURNITURE', clue:'Tables, chairs, beds and cupboards, all together.', band:3 },
  { word:'IMPORTANT', clue:'Something that really matters.', band:3 },
  { word:'SEPARATE', clue:'To move things apart from each other.', band:3 },
  { word:'PARLIAMENT', clue:'The place where a country’s laws are made and debated.', band:3 },
];

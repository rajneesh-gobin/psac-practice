'use strict';
// Potion Lab — science classification rounds.
//
// ⚠ EVERY CLASSIFICATION HERE MUST BE UNAMBIGUOUS AT PRIMARY LEVEL. This game
//   DOCKS a child for a wrong cauldron, so an item with a defensible second
//   answer punishes them for being right. That is the worst failure this game
//   can have and it does not surface in play-testing — it looks like the child
//   simply got it wrong.
//   The edge cases deliberately left OUT, and why:
//     · seeds, eggs, wood, paper, leather — once-living or dormant; the
//       living/non-living line is exactly where a bright child argues.
//     · jelly, toothpaste, sand, smoke — states of matter a syllabus glosses
//       over. Sand is a solid that pours; smoke is not a gas.
//     · milk — body-building AND protective in most tables.
//     · "opening a door" — a push or a pull depending on the door.
//     · rubber — natural or synthetic.
//
// ⚠ Themes follow the SCIENCE PACKS, and the category names are the ones the
//   packs actually use: "energy foods / body-building foods / protective foods"
//   is the Mauritian primary framing (checked against grade3-health and the
//   grade4-6 science banks), not the "go/grow/glow" wording used elsewhere.
//
// ⚠ Bagasse is in on purpose. It is the renewable every Mauritian child has
//   seen, and a bank of solar/wind/coal could have been written for anywhere.
//
// Shape: { id, theme, band, categories:[{key,label,emoji}], items:[{label,emoji,category}] }
// ⚠ 2 or 3 cauldrons, never more — three is the most a thumb can reach on a
//   phone without the labels wrapping, and some science genuinely has two sides.
window.MINIGAME_LAB = [

  {
    id: 'lab-living', theme: 'Living or non-living?', band: 1,
    categories: [
      { key: 'living', label: 'Living', emoji: '🌱' },
      { key: 'nonliving', label: 'Non-living', emoji: '🪨' },
    ],
    items: [
      { label: 'Dog', emoji: '🐕', category: 'living' },
      { label: 'Mango tree', emoji: '🌳', category: 'living' },
      { label: 'Butterfly', emoji: '🦋', category: 'living' },
      { label: 'Fish', emoji: '🐟', category: 'living' },
      { label: 'Grass', emoji: '🌿', category: 'living' },
      { label: 'Bird', emoji: '🦜', category: 'living' },
      { label: 'Child', emoji: '🧒', category: 'living' },
      { label: 'Spider', emoji: '🕷️', category: 'living' },
      { label: 'Rock', emoji: '🪨', category: 'nonliving' },
      { label: 'Spoon', emoji: '🥄', category: 'nonliving' },
      { label: 'Car', emoji: '🚗', category: 'nonliving' },
      { label: 'Cloud', emoji: '☁️', category: 'nonliving' },
      { label: 'Chair', emoji: '🪑', category: 'nonliving' },
      { label: 'Torch', emoji: '🔦', category: 'nonliving' },
      { label: 'Bicycle', emoji: '🚲', category: 'nonliving' },
      { label: 'Umbrella', emoji: '☂️', category: 'nonliving' },
    ],
  },

  {
    id: 'lab-states', theme: 'Solid, liquid or gas?', band: 2,
    categories: [
      { key: 'solid', label: 'Solid', emoji: '🧊' },
      { key: 'liquid', label: 'Liquid', emoji: '💧' },
      { key: 'gas', label: 'Gas', emoji: '💨' },
    ],
    items: [
      { label: 'Ice cube', emoji: '🧊', category: 'solid' },
      { label: 'Stone', emoji: '🪨', category: 'solid' },
      { label: 'Book', emoji: '📕', category: 'solid' },
      { label: 'Coin', emoji: '🪙', category: 'solid' },
      { label: 'Brick', emoji: '🧱', category: 'solid' },
      { label: 'Water', emoji: '💧', category: 'liquid' },
      { label: 'Milk', emoji: '🥛', category: 'liquid' },
      { label: 'Cooking oil', emoji: '🫗', category: 'liquid' },
      { label: 'Orange juice', emoji: '🧃', category: 'liquid' },
      { label: 'Honey', emoji: '🍯', category: 'liquid' },
      { label: 'Oxygen', emoji: '💨', category: 'gas' },
      { label: 'Steam', emoji: '♨️', category: 'gas' },
      { label: 'Helium in a balloon', emoji: '🎈', category: 'gas' },
      { label: 'Air in a tyre', emoji: '🛞', category: 'gas' },
      { label: 'Carbon dioxide', emoji: '🫧', category: 'gas' },
    ],
  },

  {
    id: 'lab-foods', theme: 'Which food group?', band: 2,
    categories: [
      { key: 'energy', label: 'Energy', emoji: '⚡' },
      { key: 'building', label: 'Body-building', emoji: '💪' },
      { key: 'protective', label: 'Protective', emoji: '🛡️' },
    ],
    items: [
      { label: 'Rice', emoji: '🍚', category: 'energy' },
      { label: 'Bread', emoji: '🍞', category: 'energy' },
      { label: 'Potato', emoji: '🥔', category: 'energy' },
      { label: 'Sugar', emoji: '🍬', category: 'energy' },
      { label: 'Pasta', emoji: '🍝', category: 'energy' },
      { label: 'Fish', emoji: '🐟', category: 'building' },
      { label: 'Egg', emoji: '🥚', category: 'building' },
      { label: 'Lentils (dal)', emoji: '🫘', category: 'building' },
      { label: 'Chicken', emoji: '🍗', category: 'building' },
      { label: 'Cheese', emoji: '🧀', category: 'building' },
      { label: 'Orange', emoji: '🍊', category: 'protective' },
      { label: 'Carrot', emoji: '🥕', category: 'protective' },
      { label: 'Spinach (brède)', emoji: '🥬', category: 'protective' },
      { label: 'Tomato', emoji: '🍅', category: 'protective' },
      { label: 'Mango', emoji: '🥭', category: 'protective' },
    ],
  },

  {
    id: 'lab-forces', theme: 'A push or a pull?', band: 1,
    categories: [
      { key: 'push', label: 'Push', emoji: '👉' },
      { key: 'pull', label: 'Pull', emoji: '🤛' },
    ],
    items: [
      { label: 'Kicking a football', emoji: '⚽', category: 'push' },
      { label: 'Pressing a doorbell', emoji: '🔔', category: 'push' },
      { label: 'Pushing a shopping trolley', emoji: '🛒', category: 'push' },
      { label: 'Hammering a nail', emoji: '🔨', category: 'push' },
      { label: 'Squeezing a sponge', emoji: '🧽', category: 'push' },
      { label: 'Blowing up a balloon', emoji: '🎈', category: 'push' },
      { label: 'Tug of war', emoji: '🪢', category: 'pull' },
      { label: 'Opening a drawer', emoji: '🗄️', category: 'pull' },
      { label: 'A magnet drawing a pin closer', emoji: '🧲', category: 'pull' },
      { label: 'Reeling in a fishing line', emoji: '🎣', category: 'pull' },
      { label: 'Drawing water from a well', emoji: '🪣', category: 'pull' },
      { label: 'Walking a dog on a lead', emoji: '🐕‍🦺', category: 'pull' },
    ],
  },

  {
    id: 'lab-energy', theme: 'Renewable or not?', band: 3,
    categories: [
      { key: 'renewable', label: 'Renewable', emoji: '♻️' },
      { key: 'nonrenewable', label: 'Non-renewable', emoji: '🛢️' },
    ],
    items: [
      { label: 'Sunlight', emoji: '☀️', category: 'renewable' },
      { label: 'Wind', emoji: '🌬️', category: 'renewable' },
      { label: 'Bagasse', emoji: '🎋', category: 'renewable' },
      { label: 'Hydro (falling water)', emoji: '🌊', category: 'renewable' },
      { label: 'Firewood replanted', emoji: '🪵', category: 'renewable' },
      { label: 'Waves', emoji: '🏄', category: 'renewable' },
      { label: 'Coal', emoji: '🪨', category: 'nonrenewable' },
      { label: 'Petrol', emoji: '⛽', category: 'nonrenewable' },
      { label: 'Diesel', emoji: '🚛', category: 'nonrenewable' },
      { label: 'Natural gas', emoji: '🔥', category: 'nonrenewable' },
      { label: 'Kerosene', emoji: '🛢️', category: 'nonrenewable' },
    ],
  },

  {
    id: 'lab-materials', theme: 'Natural or man-made?', band: 1,
    categories: [
      { key: 'natural', label: 'Natural', emoji: '🍃' },
      { key: 'manmade', label: 'Man-made', emoji: '🏭' },
    ],
    items: [
      { label: 'Cotton', emoji: '🌾', category: 'natural' },
      { label: 'Wool', emoji: '🐑', category: 'natural' },
      { label: 'Stone', emoji: '🪨', category: 'natural' },
      { label: 'Silk', emoji: '🕸️', category: 'natural' },
      { label: 'Clay', emoji: '🏺', category: 'natural' },
      { label: 'Sea sponge', emoji: '🧽', category: 'natural' },
      { label: 'Plastic bottle', emoji: '🧴', category: 'manmade' },
      { label: 'Glass window', emoji: '🪟', category: 'manmade' },
      { label: 'Nylon rope', emoji: '🪢', category: 'manmade' },
      { label: 'Concrete', emoji: '🧱', category: 'manmade' },
      { label: 'Steel nail', emoji: '🔩', category: 'manmade' },
      { label: 'Polythene bag', emoji: '🛍️', category: 'manmade' },
    ],
  },
];

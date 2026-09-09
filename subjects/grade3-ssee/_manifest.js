'use strict';

const G3SSEE_SYLLABUS = {
  'g3ssee-environment': { subsections: [
    { id: 'our_senses',         name: 'Using Our Senses' },
    { id: 'types_environment',  name: 'Types of Environment' },
    { id: 'caring_environment', name: 'Caring for the Environment' },
  ]},
  'g3ssee-family': { subsections: [
    { id: 'myself',        name: 'About Myself' },
    { id: 'my_family',    name: 'My Family' },
    { id: 'family_roles', name: 'Family Roles and Values' },
  ]},
  'g3ssee-natural': { subsections: [
    { id: 'plants',     name: 'Plants' },
    { id: 'animals',    name: 'Animals' },
    { id: 'soil_rocks', name: 'Soil and Rocks' },
  ]},
  'g3ssee-living': { subsections: [
    { id: 'living_things', name: 'Characteristics of Living Things' },
    { id: 'non_living',    name: 'Non-living Things' },
    { id: 'classifying',   name: 'Classifying Objects' },
  ]},
  'g3ssee-locality': { subsections: [
    { id: 'places_in_locality', name: 'Places in My Locality' },
    { id: 'services',           name: 'Services and Their Uses' },
    { id: 'maps_directions',    name: 'Maps and Directions' },
  ]},
  'g3ssee-air': { subsections: [
    { id: 'properties_air', name: 'Properties of Air' },
    { id: 'uses_of_air',    name: 'Uses of Air' },
    { id: 'air_pollution',  name: 'Air and the Environment' },
  ]},
  'g3ssee-water': { subsections: [
    { id: 'states_of_water', name: 'States of Water' },
    { id: 'uses_of_water',   name: 'Uses of Water' },
    { id: 'water_cycle',     name: 'The Water Cycle' },
  ]},
  'g3ssee-weather': { subsections: [
    { id: 'types_of_weather',      name: 'Types of Weather' },
    { id: 'weather_instruments',   name: 'Measuring Weather' },
    { id: 'cyclones_in_mauritius', name: 'Cyclones in Mauritius' },
  ]},
};

registerSubject({
  id:         'grade3-ssee',
  name:       'SSEE',
  grade:      3,
  icon:       '🌍',
  subject:    'SSEE',
  curriculum: 'MIE Mauritius',
  comingSoon: false,
  syllabus:   G3SSEE_SYLLABUS,
  chapters: [
    { id: 'g3ssee-environment', name: 'Looking at Our Environment',   icon: '🌳', examWeight: 3,
      syllabus: 'Use the five senses to observe the environment. Describe the school and home environments. Identify ways to care for and protect the environment.' },
    { id: 'g3ssee-family',      name: 'Myself and My Family',         icon: '👨‍👩‍👧', examWeight: 3,
      syllabus: 'Describe personal characteristics. Understand family structure and the roles of each member. Identify values such as respect, sharing and cooperation within the family.' },
    { id: 'g3ssee-natural',     name: 'Our Natural Environment',      icon: '🌿', examWeight: 3,
      syllabus: 'Observe and describe plants and animals in the local environment. Identify the parts of a plant and their functions. Name Mauritian native species. Know types of soil.' },
    { id: 'g3ssee-living',      name: 'Living and Non-living Things', icon: '🐝', examWeight: 3,
      syllabus: 'Identify the characteristics of living things: movement, nutrition, growth, reproduction and sensitivity. Distinguish living from non-living things. Classify objects.' },
    { id: 'g3ssee-locality',    name: 'My Locality',                  icon: '🏘️', examWeight: 3,
      syllabus: 'Name and describe places in the local community: hospital, school, market, post office and bus station. Understand the services each place provides. Read simple maps using compass directions.' },
    { id: 'g3ssee-air',         name: 'Air Around Us',                icon: '💨', examWeight: 2,
      syllabus: 'Describe properties of air: it takes up space, has weight and can be compressed. Identify uses of air for breathing, wind energy and sport. Understand air pollution and its effects on health.' },
    { id: 'g3ssee-water',       name: 'Learning About Water',         icon: '💧', examWeight: 3,
      syllabus: 'Identify the three states of water: solid, liquid and gas. Describe uses of water for drinking, cleaning, cooking and farming. Explain the water cycle simply. Know water sources in Mauritius.' },
    { id: 'g3ssee-weather',     name: 'Our Weather',                  icon: '⛅', examWeight: 2,
      syllabus: 'Describe different types of weather: sunny, cloudy, rainy, windy and stormy. Name instruments used to measure weather. Understand how weather affects daily life in Mauritius, including the cyclone season.' },
  ],
});

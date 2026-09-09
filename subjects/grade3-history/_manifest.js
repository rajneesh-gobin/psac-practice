'use strict';

const G3HI_SYLLABUS = {
  'g3hi-myself-family': { subsections: [
    { id:'past_present',   name:'Past and Present' },
    { id:'family_members', name:'My Family' },
    { id:'family_events',  name:'Family Events' },
  ]},
  'g3hi-my-locality': { subsections: [
    { id:'buildings_places',    name:'Buildings and Places' },
    { id:'changes_locality',    name:'Changes in Our Locality' },
    { id:'preserving_heritage', name:'Preserving Our Heritage' },
  ]},
  'g3hi-natural-environment': { subsections: [
    { id:'natural_features',   name:'Natural Features of Mauritius' },
    { id:'man_made_features',  name:'Man-Made Features' },
    { id:'caring_environment', name:'Looking After Our Environment' },
  ]},
  'g3hi-weather': { subsections: [
    { id:'weather_types',   name:'Types of Weather' },
    { id:'weather_effects', name:'How Weather Affects Us' },
    { id:'weather_safety',  name:'Staying Safe in Bad Weather' },
  ]},
  'g3hi-map-skills': { subsections: [
    { id:'map_features',      name:'Reading a Map' },
    { id:'natural_landmarks', name:'Natural Landmarks' },
    { id:'safety_outdoors',   name:'Safety Outdoors' },
  ]},
};

registerSubject({
  id:           'grade3-history',
  name:         'History & Geography',
  grade:        3,
  icon:         '🏛️',
  subject:      'History & Geography',
  curriculum:   'MIE Mauritius',
  comingSoon:   true,
  noDifficulty: true,
  syllabus:     G3HI_SYLLABUS,
  chapters: [
    { id: 'g3hi-myself-family', name: 'Myself & My Family', icon: '👨‍👩‍👧', examWeight: 1,
      syllabus: 'Show basic understanding of past and present by recalling and listing significant personal events and dates in sequential manner. Develop vocabulary related to time such as today and long ago. Show awareness of time and change by comparing photographs, clothes and toys from the past. Identify members of the family, compare relative ages, discuss significant family events and draw a family tree.' },
    { id: 'g3hi-my-locality', name: 'My Locality', icon: '🏘️', examWeight: 1,
      syllabus: 'Show an awareness of space, time, change and development in the locality. Identify and name buildings, monuments and places of worship in the school and local area. Identify old and new objects and changes in the locality such as houses, means of transport and leisure activities. Develop awareness that certain buildings in the locality should be preserved and protected. Listen, retell and record through pictures simple stories of people in the past and present.' },
    { id: 'g3hi-natural-environment', name: 'Our Natural Environment', icon: '⛰️', examWeight: 1,
      syllabus: 'Observe, describe and classify basic natural and man-made features in the immediate environment including locality, Mauritius and Rodrigues. Recognise and list some natural features such as mountains, hills, rivers and beaches in Mauritius and Rodrigues. Draw and label some natural features. Realise that the natural environment is precious and must be kept clean.' },
    { id: 'g3hi-weather', name: 'Weather', icon: '🌦️', examWeight: 1,
      syllabus: 'Observe and describe different types of weather conditions in the immediate environment. Identify the main features of weather such as sunny, rainy, windy and cloudy days. Understand how weather affects daily life and activities. Develop awareness of safety during extreme weather conditions.' },
    { id: 'g3hi-map-skills', name: 'Map Skills', icon: '🗺️', examWeight: 1,
      syllabus: 'Identify features in the locality from diagrams, pictures, line drawings and maps. Name features shown in the locality on a map or diagram. Observe and name natural features in the immediate environment. Develop personal safety skills near the seaside, rivers, waterfalls and forests.' },
  ],
});

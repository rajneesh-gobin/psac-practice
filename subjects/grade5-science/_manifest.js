'use strict';
registerSubject({
  id:         'grade5-science',
  name:       'Science',
  grade:      5,
  icon:       '🔬',
  subject:    'Science',
  curriculum: 'MIE Mauritius',
  comingSoon: true,
  chapters: [
    { id: 'sci-living',      name: 'Living Things & Habitats', icon: '🌿' },
    { id: 'sci-materials',   name: 'Materials & Properties',   icon: '⚗️' },
    { id: 'sci-forces',      name: 'Forces & Motion',          icon: '🚀' },
    { id: 'sci-earth',       name: 'Earth & Space',            icon: '🌍' },
    { id: 'sci-light-sound', name: 'Light & Sound',            icon: '💡' },
    { id: 'sci-electricity', name: 'Electricity & Circuits',   icon: '⚡' },
  ],
});

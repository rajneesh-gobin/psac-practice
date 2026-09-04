'use strict';
(function () {
  const add=(sub,i,question,answer,wrong,hint,explanation)=>STATIC_QUESTIONS.push(makeMCQ({
    id:`g5eng-meaning-${sub}-${i+1}`,chapterId:'eng-nouns',subsection:sub,difficulty:2,
    question,answer,options:[answer,...wrong],hint,explanation
  }));
  const collective=[
    ['At the concert, a ___ of singers performed together.','choir',['flock','herd','fleet'],'Think of a group organised to sing.','A choir is a group of singers who perform together.'],
    ['The harbour officer counted a ___ of fishing boats returning together.','fleet',['bouquet','litter','swarm'],'This group word is used for boats or ships.','Fleet names a group of boats or ships; it does not name their passengers.'],
    ['The florist tied a ___ of flowers with a blue ribbon.','bouquet',['team','herd','pack'],'Think of flowers arranged as a gift.','A bouquet is an arranged bunch of flowers.'],
    ['A ___ of bees gathered around the branch.','swarm',['class','fleet','choir'],'Think of many insects moving or gathering together.','Swarm is a collective noun commonly used for bees.'],
    ['The shepherd guided a ___ of sheep into the field.','flock',['crew','bouquet','library'],'Which group word suits sheep?','Flock names a group of sheep, as well as certain birds.'],
    ['The farmer moved a ___ of cattle away from the broken fence.','herd',['choir','fleet','pack'],'Think of large grazing animals together.','A herd is a group of cattle or other large grazing animals.'],
    ['Our school sent a ___ of players to the football tournament.','team',['litter','swarm','bouquet'],'These people play a sport together.','Team names players who work together in a sport.'],
    ['The captain thanked the ship’s ___ for their work during the storm.','crew',['flock','bouquet','herd'],'Which word names people working on a ship?','The crew consists of the people who operate and work on a ship.'],
    ['A ___ of puppies slept beside their mother.','litter',['fleet','class','choir'],'These young animals were born to the same mother at one time.','Litter names young animals born to the same mother together.'],
    ['Grandmother placed a ___ of grapes in the fruit bowl.','bunch',['crew','team','flock'],'The grapes are attached together on stems.','A bunch is a group of things growing or fastened together, such as grapes.'],
    ['The guide showed us a ___ of ants carrying food to their nest.','colony',['fleet','bouquet','choir'],'Think of insects living together in an organised group.','Colony is used for ants living and working together.'],
    ['The detective found a ___ of keys beside the gate.','bunch',['herd','class','swarm'],'These objects are held together on a ring.','A bunch of keys means several keys grouped together.'],
    ['Before the game, Dad shuffled a ___ of cards.','pack',['flock','herd','crew'],'Think of the complete set used in a card game.','A pack of cards is a set of playing cards.'],
    ['The dancers bowed to the ___ watching their show.','audience',['litter','fleet','bouquet'],'Which word names the people watching a performance?','An audience is a group of people watching or listening to a performance.'],
    ['The hikers could see a ___ of mountains stretching across the horizon.','range',['swarm','crew','choir'],'Think of mountains forming a connected line or area.','A range is a group or series of mountains.'],
    ['The headteacher welcomed a new ___ of pupils into Room 4.','class',['herd','fleet','bouquet'],'These pupils learn together in school.','Class is a collective noun for a group of pupils taught together.'],
    ['A ___ of wolves moved quietly through the forest.','pack',['choir','bouquet','fleet'],'Which group word is commonly used for wolves?','A pack is a group of wolves that live or hunt together.'],
    ['The conductor raised her baton and the ___ began playing its instruments.','orchestra',['flock','litter','colony'],'The members are musicians playing instruments together.','An orchestra is a group of instrumental musicians led by a conductor.'],
    ['A ___ of spectators waited outside the stadium entrance.','crowd',['bouquet','fleet','litter'],'Which word describes many people gathered in one place?','A crowd is a large group of people gathered together.'],
    ['The sailors spotted a ___ of dolphins swimming near the boat.','pod',['class','bouquet','crew'],'This animal group word is used for dolphins.','Pod is a collective noun used for a group of dolphins.']
  ];
  collective.forEach((r,i)=>add('collective',i,...r));
  const abstract=[
    ['Maya shared her lunch with a pupil who had forgotten hers. Which abstract noun names this caring quality?','kindness',['sandwich','basket','classroom'],'Name the quality, not something you can hold.','Kindness is a caring quality. The other nouns name physical things.'],
    ['Ravi admitted that he had broken the ruler. Which abstract noun names the quality of telling the truth?','honesty',['ruler','desk','pencil'],'Think about being truthful.','Honesty means truthfulness, shown when Ravi admits what happened.'],
    ['Lina waited calmly while her little brother tied his shoes. Which quality did she show?','patience',['shoe','doorway','ribbon'],'She did not become annoyed by the delay.','Patience is the ability to wait calmly.'],
    ['The frightened child still told an adult about the dangerous hole. Which abstract noun describes acting bravely despite fear?','courage',['fence','shovel','path'],'Being afraid does not prevent someone from acting bravely.','Courage means facing fear or difficulty bravely.'],
    ['The children smiled and cheered when their missing kitten returned. Which abstract noun names their glad feeling?','happiness',['kitten','gate','collar'],'Name how the children felt.','Happiness is a feeling of being glad; a kitten and its collar are physical things.'],
    ['After her best friend moved away, Amira felt unhappy. Which abstract noun names this feeling?','sadness',['suitcase','road','letter'],'Think of the noun related to sad.','Sadness is the abstract noun for feeling sad.'],
    ['A loud crash made Sam feel afraid. Which noun names his feeling rather than the sound or an object?','fear',['window','thunder','cupboard'],'Which option describes an emotion?','Fear is the emotion of being afraid.'],
    ['Nadia believed that her friend would return the borrowed book. Which abstract noun describes that belief in someone?','trust',['book','shelf','bag'],'She believes her friend is reliable.','Trust means believing that someone is reliable or honest.'],
    ['Two neighbours helped each other for many years. Which noun names their friendly relationship?','friendship',['garden','bench','house'],'A relationship is not an object.','Friendship names a relationship between friends.'],
    ['The visitors admired how lovely the waterfall looked. Which abstract noun names its lovely quality?','beauty',['water','rock','camera'],'Choose the noun related to beautiful.','Beauty is the quality of being beautiful; water and rocks are physical things.'],
    ['After the argument, the brothers spoke calmly and stopped fighting. Which abstract noun means a state without conflict?','peace',['table','ball','curtain'],'Think of calm relations rather than fighting.','Peace describes a state without conflict or fighting.'],
    ['The rescued bird was released from its cage. Which abstract noun names its state of no longer being confined?','freedom',['wing','cage','feather'],'It can now move without being kept inside.','Freedom is the state of being free, not a physical part of the bird.'],
    ['After finishing her first long book, Eva felt pleased with her effort. Which noun can name that satisfied feeling about an achievement?','pride',['page','cover','bookmark'],'She is pleased with what she has accomplished.','Pride can mean satisfaction in an achievement or effort.'],
    ['Although the seedlings were small, Dan believed they might grow well. Which noun names his positive expectation?','hope',['seed','soil','pot'],'He expects something good may happen.','Hope is the feeling that something wanted may happen.'],
    ['The grandfather used experience to give sensible advice. Which abstract noun names this good judgement?','wisdom',['chair','walking stick','hat'],'The quality concerns judgement, not age alone.','Wisdom is the ability to use experience and knowledge to make good judgements.'],
    ['The climber trained to increase her ability to lift and pull. Which abstract noun names this physical power?','strength',['rope','boot','ladder'],'Choose the noun related to strong.','Strength names a quality or ability, whereas the other nouns name equipment.'],
    ['The family cared deeply for their new baby. Which abstract noun names their strong affection?','love',['blanket','bottle','cot'],'Affection is a feeling, not an object.','Love is a feeling of deep affection and care.'],
    ['The referee applied the same rules to both teams. Which abstract noun names this equal treatment?','fairness',['whistle','goalpost','shirt'],'Nobody is given an unfair advantage.','Fairness means treating people justly and applying rules without favouritism.'],
    ['Karim was upset when someone deliberately ruined his drawing. Which noun names the strong annoyed feeling he had?','anger',['paper','crayon','desk'],'Name the emotion related to angry.','Anger is the feeling of being very annoyed or upset about something.'],
    ['The children felt great delight when the play was a success. Which abstract noun is closest in meaning to delight?','joy',['stage','costume','ticket'],'Choose another word for a very happy feeling.','Joy means great happiness or delight.']
  ];
  abstract.forEach((r,i)=>add('abstract',i,...r));
})();

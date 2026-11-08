// Prepositions of agent & instrument – Aufgaben je Level von leicht nach schwer.
import { aus } from '../engine.js'

const TIPP = {
  by: 'by + the person or thing that does the action (passive): written by Shakespeare',
  with: 'with + the tool you use: cut with scissors, open with a key',
  By: 'by + -ing = how you do something: by pressing the button',
}

// ---------------------------------------------------------------------------
// Level 1 · by – who did it?
// ---------------------------------------------------------------------------
const AGENT_POOL = ['by', 'with', 'from', 'of']

const werke = [
    ['“Harry Potter” was written ___ J. K. Rowling.', 'by'],
    ['The Mona Lisa was painted ___ Leonardo da Vinci.', 'by'],
    ['The telephone was invented ___ Alexander Graham Bell.', 'by'],
    ['“Romeo and Juliet” was written ___ William Shakespeare.', 'by'],
    ['This song was sung ___ Ed Sheeran.', 'by'],
    ['The light bulb was improved ___ Thomas Edison.', 'by'],
    ['This picture was drawn ___ my little sister.', 'by'],
    ['The cake was made ___ my grandma.', 'by', ['with']],
    ['The film was directed ___ Steven Spielberg.', 'by'],
]

const byAgent = aus(werke, AGENT_POOL, TIPP)

const byPassiv = aus(
  [
    ['The mouse was caught ___ the cat.', 'by'],
    ['I was bitten ___ a dog.', 'by'],
    ['The thief was arrested ___ the police.', 'by'],
    ['The match was won ___ the team in red.', 'by'],
    ['The old town was destroyed ___ a fire.', 'by', ['with']],
    ['The tree was hit ___ lightning.', 'by'],
    ['The new school was opened ___ the mayor.', 'by'],
    ['We were woken up ___ a loud noise.', 'by', ['with']],
    ['The window was cleaned ___ the caretaker.', 'by'],
    ['The children were taught ___ a young teacher.', 'by'],
    ['The book is loved ___ millions of children.', 'by'],
    ['My car was repaired ___ a mechanic.', 'by'],
    ['The winning goal was scored ___ our captain.', 'by'],
    ['The pyramids were built ___ the ancient Egyptians.', 'by'],
    ['The house was built ___ my grandfather.', 'by'],
  ],
  AGENT_POOL,
  TIPP,
)

// ---------------------------------------------------------------------------
// Level 2 · with – what tool?
// ---------------------------------------------------------------------------
const INSTR_POOL = ['with', 'by', 'from', 'of']

const withTool = aus(
  [
    ['She cut the paper ___ scissors.', 'with'],
    ['He opened the door ___ a key.', 'with'],
    ['We eat soup ___ a spoon.', 'with'],
    ['I write ___ a pencil.', 'with'],
    ['She painted the wall ___ a big brush.', 'with'],
    ['He hit the nail ___ a hammer.', 'with'],
    ['Clean the table ___ a cloth.', 'with'],
    ['Dry your hands ___ a towel.', 'with'],
    ['He brushed his hair ___ a comb.', 'with'],
    ['She took a photo ___ her phone.', 'with', ['of']],
    ['We cut the pizza ___ a knife.', 'with'],
    ['Fill the bottle ___ water.', 'with'],
    ['He covered the sleeping baby ___ a blanket.', 'with'],
    ['I play tennis ___ a new racket.', 'with'],
  ],
  INSTR_POOL,
  TIPP,
)

const withKoerper = aus(
  [
    ['Don’t eat ___ your fingers!', 'with'],
    ['She caught the ball ___ one hand.', 'with'],
    ['We see ___ our eyes and hear with our ears.', 'with'],
    ['He kicked the ball ___ his left foot.', 'with'],
    ['Cats catch mice ___ their sharp claws.', 'with'],
    ['She pointed ___ her finger at the map.', 'with'],
  ],
  INSTR_POOL,
  TIPP,
)

// ---------------------------------------------------------------------------
// Level 3 · by or with?
// ---------------------------------------------------------------------------
const BW = ['by', 'with', 'from']

const byOrWith = aus(
  [
    ['The letter was written ___ a pencil.', 'with'],
    ['The letter was written ___ my best friend.', 'by'],
    ['The tree was cut down ___ an axe.', 'with'],
    ['The tree was cut down ___ the gardener.', 'by'],
    ['The door was opened ___ a key.', 'with'],
    ['The door was opened ___ the caretaker.', 'by'],
    ['The picture was painted ___ a tiny brush.', 'with'],
    ['The picture was painted ___ a famous artist.', 'by'],
    ['The soup was eaten ___ a spoon.', 'with'],
    ['The soup was eaten ___ the hungry children.', 'by'],
    ['The cake was decorated ___ chocolate.', 'with'],
    ['The cake was decorated ___ my dad.', 'by'],
    ['The bread was cut ___ a sharp knife.', 'with'],
    ['The bread was cut ___ the baker.', 'by'],
    ['The fence was painted ___ a big roller.', 'with'],
    ['The fence was painted ___ our neighbours.', 'by'],
  ],
  BW,
  TIPP,
)

const byIng = aus(
  [
    ['You can turn on the light ___ clapping your hands.', 'by'],
    ['She got fit ___ running every day.', 'by'],
    ['I learn new words ___ writing them down.', 'by'],
    ['You start the game ___ pressing the green button.', 'by'],
    ['He saved money ___ walking instead of taking the bus.', 'by'],
    ['___ practising every day, she became a great pianist.', 'By'],
    ['You can open the door ___ the small key.', 'with'],
    ['She got fit ___ the help of a trainer.', 'with'],
  ],
  BW,
  TIPP,
)

// Satzanfang „By" braucht großgeschriebene falsche Antworten
const byIngKarte = () => {
  const k = byIng()
  if (k.answer === 'By') k.distractors = ['With', 'From']
  return k
}

export default [
  [byAgent, byPassiv],
  [withTool, withKoerper],
  [byOrWith, byIngKarte],
]

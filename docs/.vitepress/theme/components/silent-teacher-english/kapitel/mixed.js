// Alle Präpositionen gemischt – setzt sich aus den Aufgaben der anderen Kapitel zusammen.
import time from './time.js'
import place from './place.js'
import movement from './movement.js'
import manner from './manner.js'
import agent from './agent-instrument.js'
import measure from './measure.js'
import source from './source.js'
import possession from './possession.js'

import { pick } from '../engine.js'

// eine Aufgabe, die jedes Mal eine zufällige der übergebenen Aufgaben stellt
const zufall = (...aufgaben) => {
  const liste = aufgaben.flat(Infinity)
  return () => pick(liste)()
}

const ALLE = [time, place, movement, manner, agent, measure, source, possession]

export default [
  // Time or place? – at, on, in für Zeit und Ort
  [zufall(time[0]), zufall(place[2]), zufall(time[0], place[2], time[1])],
  // Where and where to?
  [zufall(place[0], place[1]), zufall(movement[0], movement[1]), zufall(place[0], place[1], movement[0], movement[1], movement[2])],
  // How, who, with what?
  [zufall(manner[0]), zufall(agent[0], agent[1]), zufall(manner[0], manner[1], agent[0], agent[1], agent[2])],
  // How much, where from, whose?
  [zufall(measure[0]), zufall(source[0], source[1]), zufall(possession[0], possession[1]), zufall(measure, source, possession)],
  // Everything – jedes Kapitel gleich oft
  [() => pick(ALLE.map((k) => zufall(k)))()],
]

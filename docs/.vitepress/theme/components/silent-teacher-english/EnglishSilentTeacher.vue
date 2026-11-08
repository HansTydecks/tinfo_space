<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase } from 'vitepress'
import { KAPITEL, ABSCHNITTE, KURS_PFAD, findKapitel, kapitelIndex } from './kapitel/index.js'
import {
  NONE, ZIEL_PUNKTE, nextCard, kartenSchluessel, teile, loadProgress, saveProgress, progressKey,
} from './engine.js'
import { szeneSvg } from './szenen.js'
import './szenen.css'

// Aufgaben aller Kapitel – dieses Modul wird nur auf der Silent-Teacher-Seite geladen
const AUFGABEN = import.meta.glob(['./kapitel/*.js', '!./kapitel/index.js'], {
  eager: true,
  import: 'default',
})
const aufgabenVon = (id) => AUFGABEN[`./kapitel/${id}.js`] ?? []

const RICHTIG_PAUSE_MS = 900
const VERLAUF_MAX = 3

const ansicht = ref('uebersicht') // 'uebersicht' | 'spiel'
const kapitel = ref(null)
const levelIdx = ref(0)
const punkte = ref(0)
const karte = ref(null)            // { text, answer, scene, tipp, choices }
const phase = ref('frage')         // 'frage' | 'richtig' | 'falsch' | 'geschafft'
const gewaehlt = ref(null)
const verlauf = ref([])            // zuletzt gelöste Karten, neueste zuerst
const statistik = ref({ gesamt: 0, richtig: 0 })
const progress = ref({})
const weiterBtn = ref(null)
const spielTop = ref(null)

let ziehung = { punkte: 0, gezeigt: 0, letzteKarte: '' }
let timer = null

// ---------------------------------------------------------------------------
// abgeleitete Werte
// ---------------------------------------------------------------------------
const levelTitel = computed(() => kapitel.value?.level[levelIdx.value] ?? '')
const istLetztesLevel = computed(() => kapitel.value && levelIdx.value === kapitel.value.level.length - 1)
const naechstesKapitel = computed(() => {
  if (!kapitel.value) return null
  return KAPITEL[kapitelIndex(kapitel.value.id) + 1] ?? null
})
const teileKarte = computed(() => (karte.value ? teile(karte.value.text) : ['', '']))
const bild = computed(() => (karte.value?.scene ? szeneSvg(karte.value.scene) : ''))

const istGeschafft = (kap, i) => Boolean(progress.value[progressKey(kap.id, i)])
const anzahlGeschafft = (kap) => kap.level.filter((_, i) => istGeschafft(kap, i)).length
const kapitelIn = (abschnitt) => KAPITEL.filter((k) => k.abschnitt === abschnitt)
const label = (antwort) => (antwort === NONE ? '— (nothing)' : antwort)

// Frühere Level desselben Kapitels; im ersten Level die Einstiegsaufgaben des vorigen Kapitels
function wiederholungsPool(kap, idx) {
  if (idx > 0) return aufgabenVon(kap.id).slice(0, idx).flat()
  const vorher = KAPITEL[kapitelIndex(kap.id) - 1]
  return vorher ? aufgabenVon(vorher.id).map((level) => level[0]).filter(Boolean) : []
}

// ---------------------------------------------------------------------------
// Spielablauf
// ---------------------------------------------------------------------------
function starte(kap, idx, { url = 'push' } = {}) {
  clearTimeout(timer)
  kapitel.value = kap
  levelIdx.value = Math.min(Math.max(idx, 0), kap.level.length - 1)
  punkte.value = 0
  verlauf.value = []
  statistik.value = { gesamt: 0, richtig: 0 }
  ziehung = { punkte: 0, gezeigt: 0, letzteKarte: '' }
  ansicht.value = 'spiel'
  neueKarte()
  if (url) setzeUrl(url)
  nextTick(() => spielTop.value?.scrollIntoView({ block: 'start' }))
}

function neueKarte() {
  const neu = aufgabenVon(kapitel.value.id)[levelIdx.value] ?? []
  const alt = wiederholungsPool(kapitel.value, levelIdx.value)
  ziehung.punkte = punkte.value
  karte.value = nextCard(neu, alt, ziehung)
  ziehung.letzteKarte = kartenSchluessel(karte.value)
  gewaehlt.value = null
  phase.value = 'frage'
}

function waehle(antwort) {
  if (phase.value !== 'frage') return
  gewaehlt.value = antwort
  statistik.value.gesamt++
  if (antwort === karte.value.answer) {
    statistik.value.richtig++
    punkte.value++
    phase.value = 'richtig'
    timer = setTimeout(weiter, RICHTIG_PAUSE_MS)
  } else {
    punkte.value = Math.max(0, punkte.value - 1)
    phase.value = 'falsch'
    nextTick(() => weiterBtn.value?.focus({ preventScroll: true }))
  }
}

function weiter() {
  if (phase.value !== 'richtig' && phase.value !== 'falsch') return
  clearTimeout(timer)
  verlauf.value = [
    {
      text: karte.value.text,
      answer: karte.value.answer,
      gewaehlt: gewaehlt.value,
      richtig: phase.value === 'richtig',
    },
    ...verlauf.value,
  ].slice(0, VERLAUF_MAX)

  if (punkte.value >= ZIEL_PUNKTE) {
    phase.value = 'geschafft'
    progress.value = { ...progress.value, [progressKey(kapitel.value.id, levelIdx.value)]: true }
    saveProgress(progress.value)
  } else {
    neueKarte()
  }
}

function zurUebersicht() {
  clearTimeout(timer)
  ansicht.value = 'uebersicht'
  kapitel.value = null
  setzeUrl('push')
  nextTick(() => window.scrollTo({ top: 0 }))
}

// ---------------------------------------------------------------------------
// Tastatur: 1–4 wählt, Enter geht weiter
// ---------------------------------------------------------------------------
function onKeydown(e) {
  if (ansicht.value !== 'spiel' || e.ctrlKey || e.metaKey || e.altKey) return
  if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select')) return

  if (phase.value === 'frage' && /^[1-9]$/.test(e.key)) {
    const antwort = karte.value.choices[Number(e.key) - 1]
    if (antwort !== undefined) {
      e.preventDefault()
      waehle(antwort)
    }
  } else if (e.key === 'Enter' && (phase.value === 'richtig' || phase.value === 'falsch')) {
    e.preventDefault()
    weiter()
  }
}

// ---------------------------------------------------------------------------
// Adresse: ?kapitel=<id>&level=<n>
// ---------------------------------------------------------------------------
function setzeUrl(art) {
  const url = new URL(window.location.href)
  if (ansicht.value === 'spiel' && kapitel.value) {
    url.searchParams.set('kapitel', kapitel.value.id)
    url.searchParams.set('level', String(levelIdx.value + 1))
  } else {
    url.searchParams.delete('kapitel')
    url.searchParams.delete('level')
  }
  if (url.href === window.location.href) return
  if (art === 'replace') window.history.replaceState(window.history.state, '', url)
  else window.history.pushState(null, '', url)
}

function ausUrl() {
  const params = new URLSearchParams(window.location.search)
  const kap = findKapitel(params.get('kapitel'))
  if (!kap) {
    clearTimeout(timer)
    ansicht.value = 'uebersicht'
    kapitel.value = null
    return
  }
  const level = Number.parseInt(params.get('level') ?? '', 10)
  let idx = Number.isInteger(level) ? level - 1 : kap.level.findIndex((_, i) => !istGeschafft(kap, i))
  if (idx < 0 || idx >= kap.level.length) idx = 0
  if (ansicht.value === 'spiel' && kapitel.value?.id === kap.id && levelIdx.value === idx) return
  starte(kap, idx, { url: 'replace' })
}

onMounted(() => {
  progress.value = loadProgress()
  ausUrl()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('popstate', ausUrl)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('popstate', ausUrl)
})
</script>

<template>
  <div class="est">
    <!-- ================================================================ Übersicht -->
    <section v-if="ansicht === 'uebersicht'">
      <header class="est-hero">
        <div class="est-hero__icon" aria-hidden="true">🤫</div>
        <div>
          <p class="est-hero__kicker">English Grammar · Prepositions</p>
          <h1 class="est-hero__titel">Silent Teacher</h1>
          <p class="est-hero__text">
            No explanations – just sentences. Read the sentence, tap the missing preposition,
            and learn the rules from your mistakes.
          </p>
          <p class="est-hero__de">
            Keine Erklärung, nur Sätze: Tippe die fehlende Präposition an. Aus deinen Fehlern
            erkennst du die Regeln.
          </p>
        </div>
      </header>

      <ul class="est-regeln">
        <li><span class="est-regeln__icon est-regeln__icon--plus">+1</span>right answer</li>
        <li><span class="est-regeln__icon est-regeln__icon--minus">−1</span>wrong answer</li>
        <li><span class="est-regeln__icon">{{ ZIEL_PUNKTE }}</span>points finish a level</li>
        <li><span class="est-regeln__icon">—</span>sometimes there is no preposition</li>
      </ul>

      <div v-for="abschnitt in ABSCHNITTE" :key="abschnitt.id" class="est-abschnitt">
        <h2 class="est-abschnitt__titel">{{ abschnitt.titel }}</h2>
        <div class="est-kacheln">
          <article v-for="kap in kapitelIn(abschnitt.id)" :key="kap.id" class="est-kachel">
            <div class="est-kachel__kopf">
              <div>
                <h3 class="est-kachel__titel">{{ kap.titel }}</h3>
                <p class="est-kachel__de">{{ kap.deutsch }}</p>
              </div>
              <span
                v-if="anzahlGeschafft(kap)"
                class="est-stand"
                :class="{ 'is-complete': anzahlGeschafft(kap) === kap.level.length }"
              >✓ {{ anzahlGeschafft(kap) }}/{{ kap.level.length }}</span>
            </div>
            <ol class="est-kachel__level">
              <li v-for="(titel, i) in kap.level" :key="titel">
                <button
                  class="est-chip"
                  :class="{ 'is-done': istGeschafft(kap, i) }"
                  @click="starte(kap, i)"
                >
                  <span class="est-chip__nr">{{ istGeschafft(kap, i) ? '✓' : i + 1 }}</span>
                  {{ titel }}
                </button>
              </li>
            </ol>
            <a class="est-kachel__lektion" :href="withBase(kap.lektion)">read the lesson</a>
          </article>
        </div>
      </div>

      <p class="est-fuss">
        Your progress is only saved in this browser.
        <a :href="withBase(KURS_PFAD)">← Prepositions overview</a>
      </p>
    </section>

    <!-- ================================================================ Spiel -->
    <section v-else-if="kapitel && karte" ref="spielTop" class="est-spiel">
      <nav class="est-nav">
        <a class="est-nav__link" :href="withBase(kapitel.lektion)">← Lesson: {{ kapitel.titel }}</a>
        <button class="est-nav__link" @click="zurUebersicht">All chapters</button>
      </nav>

      <header class="est-kopf">
        <p class="est-kopf__kapitel">🤫 Silent Teacher · {{ kapitel.titel }}</p>
        <h1 class="est-kopf__titel">Level {{ levelIdx + 1 }}: {{ levelTitel }}</h1>
        <div class="est-levelwahl" aria-label="Choose a level">
          <button
            v-for="(titel, i) in kapitel.level"
            :key="titel"
            class="est-levelwahl__punkt"
            :class="{ 'is-aktiv': i === levelIdx, 'is-done': istGeschafft(kapitel, i) }"
            :title="`Level ${i + 1}: ${titel}`"
            :aria-current="i === levelIdx ? 'step' : undefined"
            @click="i !== levelIdx && starte(kapitel, i)"
          >{{ istGeschafft(kapitel, i) ? '✓' : i + 1 }}</button>
        </div>
      </header>

      <div
        class="est-balken"
        role="progressbar"
        aria-label="Points"
        :aria-valuenow="punkte"
        aria-valuemin="0"
        :aria-valuemax="ZIEL_PUNKTE"
      >
        <span
          v-for="i in ZIEL_PUNKTE"
          :key="i"
          class="est-balken__teil"
          :class="{ 'is-voll': i <= punkte }"
        />
        <span class="est-balken__text">{{ punkte }}/{{ ZIEL_PUNKTE }}</span>
      </div>

      <template v-if="phase !== 'geschafft'">
        <div class="est-karte" :class="`is-${phase}`">
          <div v-if="bild" class="est-bild sz-rahmen" v-html="bild" />
          <p class="est-satz">
            <span>{{ teileKarte[0] }}</span>
            <span v-if="phase === 'frage'" class="est-luecke" aria-label="gap">?</span>
            <span v-else-if="phase === 'richtig'" class="est-wert is-richtig">{{ label(karte.answer) }}</span>
            <template v-else>
              <span class="est-wert is-falsch">{{ label(gewaehlt) }}</span>
              <span class="est-wert is-richtig">{{ label(karte.answer) }}</span>
            </template>
            <span>{{ teileKarte[1] }}</span>
          </p>
          <p v-if="phase === 'falsch' && karte.tipp" class="est-tipp">
            <span aria-hidden="true">💡</span> {{ karte.tipp }}
          </p>
        </div>

        <div class="est-antworten" :class="`est-antworten--${karte.choices.length}`">
          <button
            v-for="(antwort, i) in karte.choices"
            :key="antwort"
            class="est-antwort"
            :class="{
              'is-richtig': phase !== 'frage' && antwort === karte.answer,
              'is-falsch': phase === 'falsch' && antwort === gewaehlt,
            }"
            :disabled="phase !== 'frage'"
            @click="waehle(antwort)"
          >
            <kbd class="est-antwort__taste">{{ i + 1 }}</kbd>
            <span class="est-antwort__text">{{ label(antwort) }}</span>
          </button>
        </div>

        <div class="est-weiter">
          <button
            v-if="phase === 'falsch'"
            ref="weiterBtn"
            class="est-knopf est-knopf--primaer"
            @click="weiter"
          >Next <kbd>Enter</kbd></button>
        </div>

        <p class="est-live" aria-live="polite">
          <template v-if="phase === 'richtig'">Correct.</template>
          <template v-else-if="phase === 'falsch'">Wrong. The right answer is: {{ label(karte.answer) }}</template>
        </p>
      </template>

      <div v-else class="est-geschafft">
        <div class="est-geschafft__icon" aria-hidden="true">{{ istLetztesLevel ? '🏆' : '🎉' }}</div>
        <h2 class="est-geschafft__titel">
          {{ istLetztesLevel ? `You finished “${kapitel.titel}”!` : 'Level complete!' }}
        </h2>
        <p class="est-geschafft__text">
          {{ statistik.richtig }} of {{ statistik.gesamt }} answers were right.
        </p>
        <div class="est-geschafft__aktionen">
          <button
            v-if="!istLetztesLevel"
            class="est-knopf est-knopf--primaer"
            @click="starte(kapitel, levelIdx + 1)"
          >Level {{ levelIdx + 2 }}: {{ kapitel.level[levelIdx + 1] }} →</button>
          <a
            v-else-if="naechstesKapitel"
            class="est-knopf est-knopf--primaer"
            :href="withBase(naechstesKapitel.lektion)"
          >Next: {{ naechstesKapitel.titel }} →</a>
          <button class="est-knopf" @click="starte(kapitel, levelIdx)">Play again</button>
          <a class="est-knopf" :href="withBase(kapitel.lektion)">Back to the lesson</a>
        </div>
      </div>

      <div v-if="verlauf.length" class="est-verlauf" aria-label="Last sentences">
        <div
          v-for="(alt, i) in verlauf"
          :key="i + alt.text"
          class="est-mini"
          :class="alt.richtig ? 'is-richtig' : 'is-falsch'"
        >
          <span>{{ teile(alt.text)[0] }}</span>
          <span v-if="!alt.richtig" class="est-wert is-falsch">{{ label(alt.gewaehlt) }}</span>
          <span class="est-wert is-richtig">{{ label(alt.answer) }}</span>
          <span>{{ teile(alt.text)[1] }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.est {
  --est-radius: 12px;
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 16px 64px;
  color: var(--vp-c-text-1);
}

button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}

/* ------------------------------------------------------------ Übersicht */
.est-hero {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}
.est-hero__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  font-size: 40px;
}
.est-hero__kicker {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}
.est-hero__titel {
  margin: 0;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}
.est-hero__text {
  margin: 6px 0 0;
  max-width: 60ch;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}
.est-hero__de {
  margin: 4px 0 0;
  max-width: 60ch;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
}

.est-regeln {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 0 0 32px;
  padding: 12px 16px;
  list-style: none;
  border-radius: var(--est-radius);
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.est-regeln li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.est-regeln__icon {
  display: inline-grid;
  place-items: center;
  min-width: 28px;
  height: 24px;
  padding: 0 6px;
  border-radius: 6px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
  font-weight: 700;
  font-size: 13px;
}
.est-regeln__icon--plus {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}
.est-regeln__icon--minus {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
}

.est-abschnitt + .est-abschnitt {
  margin-top: 36px;
}
.est-abschnitt__titel {
  margin: 0 0 14px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 22px;
  font-weight: 600;
}

.est-kacheln {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
}

.est-kachel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--est-radius);
  background: var(--vp-c-bg-soft);
}
.est-kachel__kopf {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.est-kachel__titel {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
}
.est-kachel__de {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.est-kachel__level {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.est-kachel__lektion {
  margin-top: auto;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.est-kachel__lektion:hover {
  color: var(--vp-c-brand-1);
}

.est-stand {
  flex: none;
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
}
.est-stand.is-complete {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}

.est-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 6px 10px 6px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  font-size: 14px;
  text-align: left;
  transition: border-color 0.2s, background-color 0.2s;
}
.est-chip:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.est-chip__nr {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-default-soft);
  font-size: 12px;
  font-weight: 700;
}
.est-chip.is-done .est-chip__nr {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}

.est-fuss {
  margin: 40px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.est-fuss a {
  margin-left: 8px;
  color: var(--vp-c-brand-1);
}

/* ------------------------------------------------------------ Spiel */
.est-spiel {
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 16px);
}

.est-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}
.est-nav__link {
  padding: 4px 0;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}
.est-nav__link:hover {
  color: var(--vp-c-brand-1);
}

.est-kopf {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 4px 16px;
  margin-bottom: 14px;
}
.est-kopf__kapitel {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}
.est-kopf__titel {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 700;
}

.est-levelwahl {
  display: flex;
  gap: 6px;
}
.est-levelwahl__punkt {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 600;
  transition: border-color 0.2s;
}
.est-levelwahl__punkt:hover {
  border-color: var(--vp-c-brand-1);
}
.est-levelwahl__punkt.is-done {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}
.est-levelwahl__punkt.is-aktiv {
  border: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  cursor: default;
}

.est-balken {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
}
.est-balken__teil {
  flex: 1;
  height: 10px;
  border-radius: 999px;
  background: var(--vp-c-default-soft);
  transition: background-color 0.3s;
}
.est-balken__teil.is-voll {
  background: var(--vp-c-brand-1);
}
.est-balken__text {
  flex: none;
  min-width: 36px;
  margin-left: 6px;
  text-align: right;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  font-weight: 600;
}

/* Karte */
.est-karte {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--est-radius);
  background: var(--vp-c-bg-alt);
  box-shadow: var(--vp-shadow-2);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.est-karte.is-richtig {
  border-color: var(--vp-c-success-1);
  box-shadow: 0 0 0 3px var(--vp-c-success-soft);
}
.est-karte.is-falsch {
  border-color: var(--vp-c-danger-1);
  box-shadow: 0 0 0 3px var(--vp-c-danger-soft);
}

.est-bild {
  display: flex;
  justify-content: center;
  padding: 14px 16px 0;
}
.est-bild :deep(svg) {
  width: 100%;
  max-width: 360px;
  height: auto;
}

.est-satz {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6px 8px;
  margin: 0;
  padding: 26px 22px;
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
}

.est-luecke {
  display: inline-grid;
  place-items: center;
  min-width: 72px;
  padding: 0 10px;
  border-bottom: 3px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.est-wert {
  padding: 1px 10px;
  border-radius: 8px;
  white-space: nowrap;
}
.est-wert.is-richtig {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
  font-weight: 700;
}
.est-wert.is-falsch {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
  text-decoration: line-through;
}

.est-tipp {
  margin: 0;
  padding: 10px 20px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 15px;
  text-align: center;
}

/* Antworten */
.est-antworten {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
}
@media (min-width: 640px) {
  .est-antworten--4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .est-antworten--3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.est-antworten--3 .est-antwort:last-child {
  grid-column: 1 / -1;
}
@media (min-width: 640px) {
  .est-antworten--3 .est-antwort:last-child {
    grid-column: auto;
  }
}

.est-antwort {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  padding: 10px 12px 10px 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
  transition: border-color 0.15s, background-color 0.15s, transform 0.1s, opacity 0.2s;
}
.est-antwort:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.est-antwort:active:not(:disabled) {
  transform: scale(0.98);
}
.est-antwort:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.est-antwort:disabled {
  cursor: default;
  opacity: 0.45;
}
.est-antwort.is-richtig {
  opacity: 1;
  border-color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}
.est-antwort.is-falsch {
  opacity: 1;
  border-color: var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}

.est-antwort__taste {
  position: absolute;
  top: 6px;
  left: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.est-antwort__text {
  font-size: 19px;
  font-weight: 600;
  line-height: 1.3;
}

.est-weiter {
  display: flex;
  justify-content: center;
  min-height: 60px;
  padding-top: 14px;
}

/* Knöpfe */
.est-knopf {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border: 1px solid var(--vp-button-alt-border);
  border-radius: 999px;
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s, border-color 0.2s;
}
.est-knopf:hover {
  border-color: var(--vp-button-alt-hover-border);
  background: var(--vp-button-alt-hover-bg);
  color: var(--vp-button-alt-hover-text);
}
.est-knopf--primaer {
  border-color: transparent;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.est-knopf--primaer:hover {
  border-color: transparent;
  background: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}
.est-knopf:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.est-knopf kbd {
  padding: 0 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
}

/* Geschafft */
.est-geschafft {
  padding: 36px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--est-radius);
  background: var(--vp-c-bg-soft);
  text-align: center;
  animation: est-pop 0.35s ease-out;
}
.est-geschafft__icon {
  font-size: 56px;
  line-height: 1;
}
.est-geschafft__titel {
  margin: 12px 0 4px;
  font-size: 26px;
  font-weight: 700;
}
.est-geschafft__text {
  margin: 0 0 20px;
  color: var(--vp-c-text-2);
}
.est-geschafft__aktionen {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

@keyframes est-pop {
  from { transform: scale(0.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Verlauf */
.est-verlauf {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 28px;
}
.est-mini {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;
  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  border-left-width: 4px;
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  font-size: 16px;
  opacity: 0.65;
  transition: opacity 0.2s;
}
.est-mini.is-richtig {
  border-left-color: var(--vp-c-success-1);
}
.est-mini.is-falsch {
  border-left-color: var(--vp-c-danger-1);
}
.est-mini:first-child {
  opacity: 0.85;
}
.est-mini:hover {
  opacity: 1;
}
.est-mini .est-wert {
  padding: 0 6px;
}

.est-live {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .est {
    padding-top: 20px;
  }
  .est-hero {
    align-items: flex-start;
  }
  .est-hero__icon {
    width: 52px;
    height: 52px;
    font-size: 28px;
  }
  .est-hero__titel {
    font-size: 26px;
  }
  .est-kopf {
    grid-template-columns: 1fr;
  }
  .est-kopf__titel {
    font-size: 20px;
  }
  .est-satz {
    padding: 20px 14px;
    font-size: 20px;
  }
  .est-antwort__text {
    font-size: 17px;
  }
}
</style>

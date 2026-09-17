<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase } from 'vitepress'
import { KAPITEL, ABSCHNITTE, KURS_PFAD, findKapitel, kapitelIndex } from './kapitel/index.js'
import {
  ERROR, ZIEL_PUNKTE, nextQuestion, kartenSchluessel, loadProgress, saveProgress, progressKey,
} from './engine.js'
import { highlightPython } from './highlight.js'

// Aufgaben aller Kapitel – dieses Modul wird nur auf der Silent-Teacher-Seite geladen
const AUFGABEN = import.meta.glob(['./kapitel/*.js', '!./kapitel/index.js'], {
  eager: true,
  import: 'default',
})
const aufgabenVon = (id) => AUFGABEN[`./kapitel/${id}.js`] ?? []

const RICHTIG_PAUSE_MS = 700
const VERLAUF_MAX = 3

const ansicht = ref('uebersicht') // 'uebersicht' | 'spiel'
const kapitel = ref(null)
const levelIdx = ref(0)
const punkte = ref(0)
const karte = ref(null)            // { code, stdin, answer, choices }
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

const istGeschafft = (kap, i) => Boolean(progress.value[progressKey(kap.id, i)])
const anzahlGeschafft = (kap) => kap.level.filter((_, i) => istGeschafft(kap, i)).length
const kapitelIn = (abschnitt) => KAPITEL.filter((k) => k.abschnitt === abschnitt)
const label = (antwort) => (antwort === ERROR ? '💥 Fehler' : antwort)
const stdinZeilen = (stdin) => (stdin ? stdin.split('\n') : [])

// Lange Antworten bekommen breitere Buttons (2 Spalten, auf dem Handy 1)
const LANG_AB_ZEICHEN = 13
const langeAntworten = computed(() =>
  (karte.value?.choices ?? []).some(
    (c) => c !== ERROR && c.split('\n').some((z) => z.length >= LANG_AB_ZEICHEN),
  ),
)

// Frühere Level desselben Kapitels; im ersten Level nur die Einstiegsaufgaben des vorigen Kapitels
// (die stehen in jedem Level an erster Stelle und sind damit die leichtesten)
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
  karte.value = nextQuestion(neu, alt, ziehung)
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
      code: karte.value.code,
      stdin: karte.value.stdin,
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
// Tastatur: 1–5 wählt, Enter geht weiter
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
  <div class="st">
    <!-- ================================================================ Übersicht -->
    <section v-if="ansicht === 'uebersicht'" class="st-uebersicht">
      <header class="st-hero">
        <div class="st-hero__icon" aria-hidden="true">🤫</div>
        <div>
          <p class="st-hero__kicker">Python-Kurs</p>
          <h1 class="st-hero__titel">Silent Teacher</h1>
          <p class="st-hero__text">
            Keine Erklärung, nur Code: Du siehst ein kleines Programm und tippst an, was es ausgibt.
            Aus deinen Fehlern erkennst du die Regeln.
          </p>
        </div>
      </header>

      <ul class="st-regeln">
        <li><span class="st-regeln__icon st-regeln__icon--plus">+1</span>richtige Antwort</li>
        <li><span class="st-regeln__icon st-regeln__icon--minus">−1</span>falsche Antwort</li>
        <li><span class="st-regeln__icon">{{ ZIEL_PUNKTE }}</span>Punkte beenden ein Level</li>
        <li><span class="st-regeln__icon">💥</span>„Fehler", wenn das Programm abstürzt</li>
      </ul>

      <div v-for="abschnitt in ABSCHNITTE" :key="abschnitt.id" class="st-abschnitt">
        <h2 class="st-abschnitt__titel">{{ abschnitt.titel }}</h2>
        <div class="st-kacheln">
          <article v-for="kap in kapitelIn(abschnitt.id)" :key="kap.id" class="st-kachel">
            <div class="st-kachel__kopf">
              <h3 class="st-kachel__titel">{{ kap.titel }}</h3>
              <span
                v-if="anzahlGeschafft(kap)"
                class="st-stand"
                :class="{ 'is-complete': anzahlGeschafft(kap) === kap.level.length }"
              >✓ {{ anzahlGeschafft(kap) }}/{{ kap.level.length }}</span>
            </div>
            <ol class="st-kachel__level">
              <li v-for="(titel, i) in kap.level" :key="titel">
                <button
                  class="st-chip"
                  :class="{ 'is-done': istGeschafft(kap, i) }"
                  @click="starte(kap, i)"
                >
                  <span class="st-chip__nr">{{ istGeschafft(kap, i) ? '✓' : i + 1 }}</span>
                  {{ titel }}
                </button>
              </li>
            </ol>
            <a class="st-kachel__lektion" :href="withBase(kap.lektion)">zur Lektion</a>
          </article>
        </div>
      </div>

      <p class="st-fuss">
        Dein Fortschritt wird nur in diesem Browser gespeichert.
        <a :href="withBase(KURS_PFAD)">← zum Python-Kurs</a>
      </p>
    </section>

    <!-- ================================================================ Spiel -->
    <section v-else-if="kapitel && karte" ref="spielTop" class="st-spiel">
      <nav class="st-nav">
        <a class="st-nav__link" :href="withBase(kapitel.lektion)">← Lektion {{ kapitel.titel }}</a>
        <button class="st-nav__link" @click="zurUebersicht">Alle Kapitel</button>
      </nav>

      <header class="st-kopf">
        <p class="st-kopf__kapitel">🤫 Silent Teacher · {{ kapitel.titel }}</p>
        <h1 class="st-kopf__titel">Level {{ levelIdx + 1 }}: {{ levelTitel }}</h1>
        <div class="st-levelwahl" aria-label="Level wählen">
          <button
            v-for="(titel, i) in kapitel.level"
            :key="titel"
            class="st-levelwahl__punkt"
            :class="{ 'is-aktiv': i === levelIdx, 'is-done': istGeschafft(kapitel, i) }"
            :title="`Level ${i + 1}: ${titel}`"
            :aria-current="i === levelIdx ? 'step' : undefined"
            @click="i !== levelIdx && starte(kapitel, i)"
          >{{ istGeschafft(kapitel, i) ? '✓' : i + 1 }}</button>
        </div>
      </header>

      <div
        class="st-balken"
        role="progressbar"
        aria-label="Punkte"
        :aria-valuenow="punkte"
        aria-valuemin="0"
        :aria-valuemax="ZIEL_PUNKTE"
      >
        <span
          v-for="i in ZIEL_PUNKTE"
          :key="i"
          class="st-balken__teil"
          :class="{ 'is-voll': i <= punkte }"
        />
        <span class="st-balken__text">{{ punkte }}/{{ ZIEL_PUNKTE }}</span>
      </div>

      <template v-if="phase !== 'geschafft'">
        <div class="st-karte" :class="`is-${phase}`">
          <div v-if="karte.stdin" class="st-eingabe">
            <span class="st-eingabe__label">Eingabe</span>
            <kbd v-for="(zeile, i) in stdinZeilen(karte.stdin)" :key="i">{{ zeile }}</kbd>
          </div>
          <pre class="st-code"><code v-html="highlightPython(karte.code)" /></pre>
          <div class="st-ausgabe">
            <span class="st-ausgabe__label">Ausgabe</span>
            <span v-if="phase === 'frage'" class="st-ausgabe__frage">?</span>
            <template v-else-if="phase === 'richtig'">
              <span class="st-wert is-richtig">{{ label(karte.answer) }}</span>
            </template>
            <template v-else>
              <span class="st-wert is-falsch">{{ label(gewaehlt) }}</span>
              <span class="st-pfeil" aria-hidden="true">→</span>
              <span class="st-wert is-richtig">{{ label(karte.answer) }}</span>
            </template>
          </div>
        </div>

        <div class="st-antworten" :class="{ 'st-antworten--lang': langeAntworten }">
          <button
            v-for="(antwort, i) in karte.choices"
            :key="antwort"
            class="st-antwort"
            :class="{
              'st-antwort--fehler': antwort === ERROR,
              'is-richtig': phase !== 'frage' && antwort === karte.answer,
              'is-falsch': phase === 'falsch' && antwort === gewaehlt,
            }"
            :disabled="phase !== 'frage'"
            @click="waehle(antwort)"
          >
            <kbd class="st-antwort__taste">{{ i + 1 }}</kbd>
            <span class="st-antwort__text">{{ label(antwort) }}</span>
          </button>
        </div>

        <div class="st-weiter">
          <button
            v-if="phase === 'falsch'"
            ref="weiterBtn"
            class="st-knopf st-knopf--primaer"
            @click="weiter"
          >Weiter <kbd>Enter</kbd></button>
        </div>

        <p class="st-live" aria-live="polite">
          <template v-if="phase === 'richtig'">Richtig.</template>
          <template v-else-if="phase === 'falsch'">Falsch. Richtig ist: {{ label(karte.answer) }}</template>
        </p>
      </template>

      <div v-else class="st-geschafft">
        <div class="st-geschafft__icon" aria-hidden="true">{{ istLetztesLevel ? '🏆' : '🎉' }}</div>
        <h2 class="st-geschafft__titel">
          {{ istLetztesLevel ? `Kapitel „${kapitel.titel}" geschafft!` : 'Level geschafft!' }}
        </h2>
        <p class="st-geschafft__text">
          {{ statistik.richtig }} von {{ statistik.gesamt }} Karten richtig.
        </p>
        <div class="st-geschafft__aktionen">
          <button
            v-if="!istLetztesLevel"
            class="st-knopf st-knopf--primaer"
            @click="starte(kapitel, levelIdx + 1)"
          >Level {{ levelIdx + 2 }}: {{ kapitel.level[levelIdx + 1] }} →</button>
          <a
            v-else-if="naechstesKapitel"
            class="st-knopf st-knopf--primaer"
            :href="withBase(naechstesKapitel.lektion)"
          >Weiter mit „{{ naechstesKapitel.titel }}" →</a>
          <button class="st-knopf" @click="starte(kapitel, levelIdx)">Nochmal</button>
          <a class="st-knopf" :href="withBase(kapitel.lektion)">Zur Lektion</a>
        </div>
      </div>

      <div v-if="verlauf.length" class="st-verlauf" aria-label="Letzte Karten">
        <div
          v-for="(alt, i) in verlauf"
          :key="i + alt.code"
          class="st-mini"
          :class="alt.richtig ? 'is-richtig' : 'is-falsch'"
        >
          <div v-if="alt.stdin" class="st-eingabe st-eingabe--klein">
            <span class="st-eingabe__label">Eingabe</span>
            <kbd v-for="(zeile, j) in stdinZeilen(alt.stdin)" :key="j">{{ zeile }}</kbd>
          </div>
          <pre class="st-code"><code v-html="highlightPython(alt.code)" /></pre>
          <div class="st-ausgabe">
            <span class="st-ausgabe__label">Ausgabe</span>
            <template v-if="!alt.richtig">
              <span class="st-wert is-falsch">{{ label(alt.gewaehlt) }}</span>
              <span class="st-pfeil" aria-hidden="true">→</span>
            </template>
            <span class="st-wert is-richtig">{{ label(alt.answer) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.st {
  --st-radius: 12px;
  --st-mono: var(--vp-font-family-mono);
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

kbd {
  font-family: var(--st-mono);
}

/* ------------------------------------------------------------ Übersicht */
.st-hero {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}
.st-hero__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  font-size: 40px;
}
.st-hero__kicker {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}
.st-hero__titel {
  margin: 0;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}
.st-hero__text {
  margin: 6px 0 0;
  max-width: 60ch;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.st-regeln {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin: 0 0 32px;
  padding: 12px 16px;
  list-style: none;
  border-radius: var(--st-radius);
  background: var(--vp-c-bg-soft);
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.st-regeln li {
  display: flex;
  align-items: center;
  gap: 8px;
}
.st-regeln__icon {
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
.st-regeln__icon--plus {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}
.st-regeln__icon--minus {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
}

.st-abschnitt + .st-abschnitt {
  margin-top: 36px;
}
.st-abschnitt__titel {
  margin: 0 0 14px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 22px;
  font-weight: 600;
}

.st-kacheln {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 14px;
}

.st-kachel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--st-radius);
  background: var(--vp-c-bg-soft);
}
.st-kachel__kopf {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}
.st-kachel__titel {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}
.st-kachel__level {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.st-kachel__lektion {
  margin-top: auto;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.st-kachel__lektion:hover {
  color: var(--vp-c-brand-1);
}

.st-stand {
  flex: none;
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 600;
}
.st-stand.is-complete {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}

.st-chip {
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
.st-chip:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.st-chip__nr {
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
.st-chip.is-done .st-chip__nr {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}

.st-fuss {
  margin: 40px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.st-fuss a {
  margin-left: 8px;
  color: var(--vp-c-brand-1);
}

/* ------------------------------------------------------------ Spiel */
.st-spiel {
  scroll-margin-top: calc(var(--vp-nav-height, 64px) + 16px);
}

.st-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}
.st-nav__link {
  padding: 4px 0;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s;
}
.st-nav__link:hover {
  color: var(--vp-c-brand-1);
}

.st-kopf {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 4px 16px;
  margin-bottom: 14px;
}
.st-kopf__kapitel {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 600;
}
.st-kopf__titel {
  margin: 0;
  font-size: 24px;
  line-height: 1.3;
  font-weight: 700;
}

.st-levelwahl {
  display: flex;
  gap: 6px;
}
.st-levelwahl__punkt {
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
.st-levelwahl__punkt:hover {
  border-color: var(--vp-c-brand-1);
}
.st-levelwahl__punkt.is-done {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}
.st-levelwahl__punkt.is-aktiv {
  border: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  cursor: default;
}

.st-balken {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
}
.st-balken__teil {
  flex: 1;
  height: 10px;
  border-radius: 999px;
  background: var(--vp-c-default-soft);
  transition: background-color 0.3s;
}
.st-balken__teil.is-voll {
  background: var(--vp-c-brand-1);
}
.st-balken__text {
  flex: none;
  min-width: 36px;
  margin-left: 6px;
  text-align: right;
  font-family: var(--st-mono);
  font-size: 14px;
  font-weight: 600;
}

/* Karte */
.st-karte,
.st-mini {
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--st-radius);
  background: var(--vp-c-bg-alt);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.st-karte {
  box-shadow: var(--vp-shadow-2);
}
.st-karte.is-richtig {
  border-color: var(--vp-c-success-1);
  box-shadow: 0 0 0 3px var(--vp-c-success-soft);
}
.st-karte.is-falsch {
  border-color: var(--vp-c-danger-1);
  box-shadow: 0 0 0 3px var(--vp-c-danger-soft);
}

.st-code {
  margin: 0;
  padding: 18px 20px;
  overflow-x: auto;
  font-family: var(--st-mono);
  font-size: 17px;
  line-height: 1.6;
  tab-size: 4;
}
.st-code code {
  font-family: inherit;
  color: var(--vp-c-text-1);
}

.st-eingabe {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-bottom: 1px dashed var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.st-eingabe kbd {
  padding: 1px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 15px;
}

.st-ausgabe {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  min-height: 52px;
  padding: 10px 20px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.st-ausgabe__label,
.st-eingabe__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}
.st-ausgabe__frage {
  font-family: var(--st-mono);
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.st-wert {
  max-width: 100%;
  padding: 2px 10px;
  border-radius: 6px;
  font-family: var(--st-mono);
  font-size: 16px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.st-wert.is-richtig {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
  font-weight: 600;
}
.st-wert.is-falsch {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger-1);
  text-decoration: line-through;
}
.st-pfeil {
  color: var(--vp-c-text-3);
}

/* Antworten */
.st-antworten {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
}
@media (min-width: 640px) {
  .st-antworten {
    grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(0, 0.9fr);
  }
}

.st-antwort {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  padding: 10px 12px 10px 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-1);
  transition: border-color 0.15s, background-color 0.15s, transform 0.1s, opacity 0.2s;
}
.st-antwort:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.st-antwort:active:not(:disabled) {
  transform: scale(0.98);
}
.st-antwort:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.st-antwort:disabled {
  cursor: default;
  opacity: 0.45;
}
.st-antwort.is-richtig {
  opacity: 1;
  border-color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
}
.st-antwort.is-falsch {
  opacity: 1;
  border-color: var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}
.st-antwort--fehler {
  grid-column: 1 / -1;
  background: var(--vp-c-warning-soft);
  border-color: transparent;
}
@media (min-width: 640px) {
  .st-antwort--fehler {
    grid-column: auto;
  }
}

.st-antworten--lang {
  grid-template-columns: minmax(0, 1fr);
}
@media (min-width: 640px) {
  .st-antworten--lang {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .st-antworten--lang .st-antwort--fehler {
    grid-column: 1 / -1;
  }
}

.st-antwort__taste {
  position: absolute;
  top: 6px;
  left: 8px;
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.st-antwort__text {
  max-width: 100%;
  font-family: var(--st-mono);
  font-size: 16px;
  line-height: 1.45;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.st-antwort--fehler .st-antwort__text {
  font-family: var(--vp-font-family-base);
  font-weight: 600;
}

.st-weiter {
  display: flex;
  justify-content: center;
  min-height: 60px;
  padding-top: 14px;
}

/* Knöpfe */
.st-knopf {
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
.st-knopf:hover {
  border-color: var(--vp-button-alt-hover-border);
  background: var(--vp-button-alt-hover-bg);
  color: var(--vp-button-alt-hover-text);
}
.st-knopf--primaer {
  border-color: transparent;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.st-knopf--primaer:hover {
  border-color: transparent;
  background: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}
.st-knopf:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.st-knopf kbd {
  padding: 0 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 11px;
}

/* Geschafft */
.st-geschafft {
  padding: 36px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--st-radius);
  background: var(--vp-c-bg-soft);
  text-align: center;
  animation: st-pop 0.35s ease-out;
}
.st-geschafft__icon {
  font-size: 56px;
  line-height: 1;
}
.st-geschafft__titel {
  margin: 12px 0 4px;
  font-size: 26px;
  font-weight: 700;
}
.st-geschafft__text {
  margin: 0 0 20px;
  color: var(--vp-c-text-2);
}
.st-geschafft__aktionen {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

@keyframes st-pop {
  from { transform: scale(0.96); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Verlauf */
.st-verlauf {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 28px;
}
.st-mini {
  opacity: 0.6;
  transition: opacity 0.2s;
}
.st-mini:first-child {
  opacity: 0.8;
}
.st-mini:hover {
  opacity: 1;
}
.st-mini .st-code {
  padding: 10px 16px;
  font-size: 14px;
}
.st-mini .st-ausgabe {
  min-height: 0;
  padding: 6px 16px;
}
.st-mini .st-wert {
  font-size: 14px;
}
.st-eingabe--klein {
  padding: 6px 16px;
}
.st-eingabe--klein kbd {
  font-size: 13px;
}

.st-live {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 480px) {
  .st {
    padding-top: 20px;
  }
  .st-hero {
    align-items: flex-start;
  }
  .st-hero__icon {
    width: 52px;
    height: 52px;
    font-size: 28px;
  }
  .st-hero__titel {
    font-size: 26px;
  }
  .st-kopf {
    grid-template-columns: 1fr;
  }
  .st-kopf__titel {
    font-size: 20px;
  }
  .st-code {
    padding: 14px 16px;
    font-size: 14px;
  }
  .st-ausgabe,
  .st-eingabe {
    padding-left: 16px;
    padding-right: 16px;
  }
  .st-antwort {
    padding-left: 22px;
    padding-right: 8px;
  }
  .st-antwort__text {
    font-size: 15px;
  }
}
</style>

<style>
/* Syntax-Farben der Code-Karten (wie VitePress' github-light / github-dark).
   Nicht scoped, weil der Code per v-html eingesetzt wird. */
.st-code .st-tok-kw { color: #d73a49; }
.st-code .st-tok-builtin { color: #005cc5; }
.st-code .st-tok-fn { color: #6f42c1; }
.st-code .st-tok-string { color: #032f62; }
.st-code .st-tok-number { color: #005cc5; }
.st-code .st-tok-comment { color: #6a737d; font-style: italic; }
.dark .st-code .st-tok-kw { color: #f97583; }
.dark .st-code .st-tok-builtin { color: #79b8ff; }
.dark .st-code .st-tok-fn { color: #b392f0; }
.dark .st-code .st-tok-string { color: #9ecbff; }
.dark .st-code .st-tok-number { color: #79b8ff; }
.dark .st-code .st-tok-comment { color: #959da5; }
</style>

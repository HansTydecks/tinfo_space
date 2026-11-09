<script setup>
// „Reporter" – Pattern-Drill für Reported Speech.
// Jemand sagt etwas (Sprechblase), du baust den berichteten Satz Lücke für Lücke.
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase } from 'vitepress'
import AUFGABEN from './aufgaben.js'
import { LEVELS, LEKTION_PFAD, rang, sterneFuer, loadProgress, saveProgress } from './levels.js'
import { ZIEL_PUNKTE, FRAGE, label, naechsteKarte, kartenSchluessel, aenderungen } from './engine.js'
import '../rs.css'

const AUTO_WEITER_MS = 1500
const LOB = ['Perfect report! ✨', 'Great job, reporter! 📰', 'Spot on! 🎯', 'Front-page quality! 🗞️', 'Exactly right! ✅', 'Nailed it! 🙌']
const KONFETTI_FARBEN = ['#1c64d1', '#c2255c', '#2b8a3e', '#d9480f', '#fcc419']

const ansicht = ref('start') // 'start' | 'spiel'
const levelIdx = ref(0)
const punkte = ref(0)
const karte = ref(null)
const zustand = ref([]) // je Lücke: { status: 'offen' | 'ok' | 'falsch', falsch }
const aktiv = ref(0)
const phase = ref('frage') // 'frage' | 'falsch' | 'fertig' | 'geschafft'
const fehlerInKarte = ref(false)
const lob = ref(LOB[0])
const streak = ref(0)
const stat = ref({ karten: 0, perfekt: 0, fehler: 0, besteSerie: 0 })
const ergebnis = ref(null) // { sterne, neuerRang }
const progress = ref({})
const weiterBtn = ref(null)
const spielTop = ref(null)

let ziehung = { punkte: 0, gezeigt: 0, letzteKarte: '' }
let timer = null

// ---------------------------------------------------------------------------
// abgeleitete Werte
// ---------------------------------------------------------------------------
const level = computed(() => LEVELS[levelIdx.value])
const aktSlot = computed(() => karte.value?.slots[aktiv.value] ?? null)
const changes = computed(() => (karte.value ? aenderungen(karte.value) : []))
const sterneVon = (i) => Number(progress.value[i + 1] ?? 0)
const geschafft = computed(() => LEVELS.filter((_, i) => sterneVon(i) > 0).length)
const sterneGesamt = computed(() => LEVELS.reduce((s, _, i) => s + sterneVon(i), 0))
const meinRang = computed(() => rang(geschafft.value))
const naechstesLevel = computed(() => LEVELS.findIndex((_, i) => sterneVon(i) === 0))
const rangFortschritt = computed(() => {
  const r = meinRang.value
  if (!r.naechster) return 100
  return Math.round(((geschafft.value - r.ab) / (r.naechster.ab - r.ab)) * 100)
})
const lektion = (anker) => withBase(LEKTION_PFAD) + (anker ? `#${anker}` : '')

const KONFETTI = Array.from({ length: 36 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  background: KONFETTI_FARBEN[i % KONFETTI_FARBEN.length],
  animationDelay: `${(i % 12) * 0.09}s`,
  animationDuration: `${1.8 + (i % 5) * 0.25}s`,
  transform: `rotate(${(i * 47) % 360}deg)`,
}))

// Frühere Level als Wiederholung
const wiederholung = (idx) => AUFGABEN.slice(0, Math.min(idx, 8)).flat()

// ---------------------------------------------------------------------------
// Spielablauf
// ---------------------------------------------------------------------------
function starte(idx, { url = 'push' } = {}) {
  clearTimeout(timer)
  levelIdx.value = Math.min(Math.max(idx, 0), LEVELS.length - 1)
  punkte.value = 0
  streak.value = 0
  stat.value = { karten: 0, perfekt: 0, fehler: 0, besteSerie: 0 }
  ergebnis.value = null
  ziehung = { punkte: 0, gezeigt: 0, letzteKarte: '' }
  ansicht.value = 'spiel'
  neueKarte()
  if (url) setzeUrl(url)
  nextTick(() => spielTop.value?.scrollIntoView({ block: 'start' }))
}

function neueKarte() {
  ziehung.punkte = punkte.value
  const k = naechsteKarte(AUFGABEN[levelIdx.value], wiederholung(levelIdx.value), ziehung, levelIdx.value)
  ziehung.letzteKarte = kartenSchluessel(k)
  karte.value = k
  zustand.value = k.slots.map(() => ({ status: 'offen', falsch: null }))
  aktiv.value = 0
  fehlerInKarte.value = false
  phase.value = 'frage'
}

function waehle(antwort) {
  if (phase.value !== 'frage' || !aktSlot.value) return
  const z = zustand.value[aktiv.value]
  if (antwort === aktSlot.value.answer) {
    z.status = 'ok'
    naechsteLuecke()
  } else {
    z.status = 'falsch'
    z.falsch = antwort
    fehlerInKarte.value = true
    stat.value.fehler++
    phase.value = 'falsch'
    nextTick(() => weiterBtn.value?.focus({ preventScroll: true }))
  }
}

function naechsteLuecke() {
  if (aktiv.value + 1 < karte.value.slots.length) {
    aktiv.value++
    phase.value = 'frage'
  } else {
    kartenEnde()
  }
}

function nachFehler() {
  if (phase.value === 'falsch') naechsteLuecke()
}

function kartenEnde() {
  stat.value.karten++
  if (fehlerInKarte.value) {
    punkte.value = Math.max(0, punkte.value - 1)
    streak.value = 0
  } else {
    punkte.value++
    streak.value++
    stat.value.perfekt++
    stat.value.besteSerie = Math.max(stat.value.besteSerie, streak.value)
    lob.value = LOB[stat.value.perfekt % LOB.length]
  }
  phase.value = 'fertig'
  if (!fehlerInKarte.value) timer = setTimeout(weiter, AUTO_WEITER_MS)
  else nextTick(() => weiterBtn.value?.focus({ preventScroll: true }))
}

function weiter() {
  if (phase.value !== 'fertig') return
  clearTimeout(timer)
  if (punkte.value >= ZIEL_PUNKTE) levelGeschafft()
  else neueKarte()
}

function levelGeschafft() {
  const rangVorher = meinRang.value.titel
  const sterne = sterneFuer(stat.value.fehler)
  const nr = levelIdx.value + 1
  progress.value = { ...progress.value, [nr]: Math.max(sterne, sterneVon(levelIdx.value)) }
  saveProgress(progress.value)
  const neu = meinRang.value
  ergebnis.value = { sterne, neuerRang: neu.titel !== rangVorher ? neu : null }
  phase.value = 'geschafft'
  nextTick(() => spielTop.value?.scrollIntoView({ block: 'start', behavior: 'smooth' }))
}

function zurUebersicht() {
  clearTimeout(timer)
  ansicht.value = 'start'
  karte.value = null
  setzeUrl('push')
  nextTick(() => window.scrollTo({ top: 0 }))
}

// ---------------------------------------------------------------------------
// Tastatur: 1–3 wählt, Enter geht weiter
// ---------------------------------------------------------------------------
function onKeydown(e) {
  if (ansicht.value !== 'spiel' || e.ctrlKey || e.metaKey || e.altKey) return
  if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select')) return
  if (phase.value === 'frage' && /^[1-9]$/.test(e.key)) {
    const a = aktSlot.value?.choices[Number(e.key) - 1]
    if (a !== undefined) {
      e.preventDefault()
      waehle(a)
    }
  } else if (e.key === 'Enter') {
    if (e.target instanceof HTMLElement && e.target.closest('button, a')) return // Fokus-Knopf löst selbst aus
    if (phase.value === 'falsch') { e.preventDefault(); nachFehler() }
    else if (phase.value === 'fertig') { e.preventDefault(); weiter() }
  }
}

// ---------------------------------------------------------------------------
// Adresse: ?level=<n>
// ---------------------------------------------------------------------------
function setzeUrl(art) {
  const url = new URL(window.location.href)
  if (ansicht.value === 'spiel') url.searchParams.set('level', String(levelIdx.value + 1))
  else url.searchParams.delete('level')
  if (url.href === window.location.href) return
  if (art === 'replace') window.history.replaceState(window.history.state, '', url)
  else window.history.pushState(null, '', url)
}

function ausUrl() {
  const n = Number.parseInt(new URLSearchParams(window.location.search).get('level') ?? '', 10)
  if (!Number.isInteger(n) || n < 1 || n > LEVELS.length) {
    clearTimeout(timer)
    ansicht.value = 'start'
    karte.value = null
    return
  }
  if (ansicht.value === 'spiel' && levelIdx.value === n - 1) return
  starte(n - 1, { url: 'replace' })
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
  <div class="rr rs-fig">
    <!-- ============================================================ Start -->
    <section v-if="ansicht === 'start'">
      <header class="rr-hero">
        <div class="rr-hero__mic" aria-hidden="true">🎙️</div>
        <div>
          <p class="rr-kicker">English Grammar · Reported speech</p>
          <h1 class="rr-hero__titel">Reporter</h1>
          <p class="rr-hero__text">
            People tell you things – you report them to others.
            Build the reported sentence gap by gap and become Chief Editor!
          </p>
          <p class="rr-de">
            Jemand sagt dir etwas – du gibst es weiter. Baue den Satz in der indirekten Rede Lücke für Lücke.
          </p>
        </div>
      </header>

      <div class="rr-rang">
        <span class="rr-rang__icon" aria-hidden="true">{{ meinRang.icon }}</span>
        <div class="rr-rang__text">
          <small>Your rank</small>
          <strong>{{ meinRang.titel }}</strong>
          <span>{{ geschafft }}/{{ LEVELS.length }} levels · ⭐ {{ sterneGesamt }}/{{ LEVELS.length * 3 }}</span>
        </div>
        <div v-if="meinRang.naechster" class="rr-rang__weg">
          <div class="rr-rang__balken"><span :style="{ width: rangFortschritt + '%' }" /></div>
          <small>next: {{ meinRang.naechster.icon }} {{ meinRang.naechster.titel }}</small>
        </div>
      </div>

      <ul class="rr-regeln">
        <li><b class="rr-regeln__plus">+1</b> report without mistakes</li>
        <li><b class="rr-regeln__minus">−1</b> report with a mistake</li>
        <li><b>{{ ZIEL_PUNKTE }}</b> points finish a level</li>
        <li><b>said</b> → always backshift</li>
        <li><b>⌨️</b> keys 1 – 3 and Enter</li>
      </ul>

      <div class="rr-farben" aria-label="Colour code">
        <span class="rr-mark k-pron is-voll">pronoun</span>
        <span class="rr-mark k-tense is-voll">verb form</span>
        <span class="rr-mark k-time is-voll">time / place</span>
        <span class="rr-mark k-rep is-voll">say / tell</span>
        <span class="rr-mark k-order is-voll">word order</span>
      </div>

      <div class="rr-kacheln">
        <button
          v-for="(l, i) in LEVELS"
          :key="l.titel"
          class="rr-kachel"
          :class="{ 'is-done': sterneVon(i) > 0, 'is-next': i === naechstesLevel }"
          @click="starte(i)"
        >
          <span class="rr-kachel__icon" aria-hidden="true">{{ l.icon }}</span>
          <span class="rr-kachel__nr">Level {{ i + 1 }}</span>
          <strong class="rr-kachel__titel">{{ l.titel }}</strong>
          <span class="rr-kachel__de">{{ l.de }}</span>
          <span v-if="sterneVon(i)" class="rr-sterne" :aria-label="`${sterneVon(i)} of 3 stars`">
            <span v-for="s in 3" :key="s" :class="{ 'is-an': s <= sterneVon(i) }">★</span>
          </span>
          <span v-else-if="i === naechstesLevel" class="rr-kachel__los">▶ Start here</span>
        </button>
      </div>

      <p class="rr-fuss">
        Your progress is only saved in this browser.
        <a :href="lektion('')">📖 Reported speech – all the rules</a>
      </p>
    </section>

    <!-- ============================================================ Spiel -->
    <section v-else-if="karte" ref="spielTop" class="rr-spiel">
      <nav class="rr-nav">
        <a :href="lektion(level.anker)">📖 Rules: {{ level.titel }}</a>
        <button @click="zurUebersicht">All levels</button>
      </nav>

      <header class="rr-kopf">
        <p class="rr-kicker">🎙️ Reporter · Level {{ levelIdx + 1 }} of {{ LEVELS.length }}</p>
        <h1 class="rr-kopf__titel">{{ level.icon }} {{ level.titel }}</h1>
        <div class="rr-levelwahl" aria-label="Choose a level">
          <button
            v-for="(l, i) in LEVELS"
            :key="l.titel"
            :class="{ 'is-aktiv': i === levelIdx, 'is-done': sterneVon(i) > 0 }"
            :title="`Level ${i + 1}: ${l.titel}`"
            :aria-current="i === levelIdx ? 'step' : undefined"
            @click="i !== levelIdx && starte(i)"
          >{{ sterneVon(i) > 0 ? '✓' : i + 1 }}</button>
        </div>
      </header>

      <div class="rr-status">
        <div class="rr-balken" role="progressbar" aria-label="Points" :aria-valuenow="punkte" aria-valuemin="0" :aria-valuemax="ZIEL_PUNKTE">
          <span v-for="i in ZIEL_PUNKTE" :key="i" :class="{ 'is-voll': i <= punkte }" />
        </div>
        <span class="rr-punkte">{{ punkte }}/{{ ZIEL_PUNKTE }}</span>
        <span class="rr-streak" :class="{ 'is-sichtbar': streak >= 2, 'is-heiss': streak >= 5 }" aria-live="polite">
          🔥 {{ streak }} in a row
        </span>
      </div>

      <template v-if="phase !== 'geschafft'">
        <!-- Wer sagt was? -->
        <div class="rr-szene" :class="{ 'is-fertig': phase === 'fertig' }">
          <div class="rr-person">
            <span class="rr-avatar" aria-hidden="true">{{ karte.sprecher.e }}</span>
            <span class="rr-person__name">{{ karte.sprecher.n }}</span>
            <span v-if="karte.an" class="rr-person__an">to {{ karte.an }}</span>
          </div>
          <blockquote class="rr-blase">
            <span class="rr-quote">“</span><template v-for="(t, i) in karte.direkt" :key="i"><span v-if="typeof t === 'string'">{{ t }}</span><span v-else class="rr-mark" :class="`k-${t.k}`">{{ t.t }}</span></template><span class="rr-quote">”</span>
          </blockquote>
        </div>
        <ul v-if="karte.kontext.length" class="rr-kontext">
          <li v-for="c in karte.kontext" :key="c">{{ c }}</li>
        </ul>

        <!-- Notizblock -->
        <div class="rr-block" :class="[`is-${phase}`, { 'is-perfekt': phase === 'fertig' && !fehlerInKarte }]">
          <p class="rr-block__label">📝 Your report</p>
          <p class="rr-satz">
            <template v-for="(t, i) in karte.bericht" :key="i">
              <span v-if="typeof t === 'string'">{{ t }}</span>
              <span v-else-if="t.slot === undefined" class="rr-mark" :class="`k-${t.k}`">{{ t.t }}</span>
              <span
                v-else
                class="rr-luecke"
                :class="[`k-${t.k}`, `is-${zustand[t.slot].status}`, { 'is-aktiv': t.slot === aktiv && phase === 'frage' }]"
              >
                <template v-if="zustand[t.slot].status === 'offen'">{{ t.slot === aktiv ? '?' : '…' }}</template>
                <template v-else-if="zustand[t.slot].status === 'falsch'">
                  <s class="rr-luecke__falsch">{{ label(zustand[t.slot].falsch) }}</s>
                  {{ label(karte.slots[t.slot].answer) }}
                </template>
                <template v-else>{{ label(karte.slots[t.slot].answer) }}</template>
              </span>
            </template>
          </p>

          <div v-if="phase === 'falsch'" class="rr-tipp">
            <span aria-hidden="true">💡</span>
            <span>{{ aktSlot.tipp }} <a :href="lektion(aktSlot.anker)" target="_blank">📖 Read more</a></span>
          </div>

          <div v-if="phase === 'fertig'" class="rr-fertig">
            <p class="rr-fertig__titel">{{ fehlerInKarte ? 'Almost! Look at what changed:' : lob }}</p>
            <ul v-if="changes.length" class="rr-changes" aria-label="What changed">
              <li v-for="(p, i) in changes" :key="i">
                <span class="rr-mark" :class="`k-${p.k}`">{{ p.von }}</span>
                <span class="rr-changes__pfeil" aria-hidden="true">→</span>
                <span class="rr-mark is-voll" :class="`k-${p.k}`">{{ p.zu }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Antworten -->
        <div v-if="phase === 'frage' && aktSlot" class="rr-wahl">
          <p class="rr-frage">
            <span class="rr-punkt" :class="`k-${aktSlot.k}`" aria-hidden="true" />
            {{ FRAGE[aktSlot.k] }}
            <span v-if="karte.slots.length > 1" class="rr-frage__nr">gap {{ aktiv + 1 }} of {{ karte.slots.length }}</span>
          </p>
          <div class="rr-antworten">
            <button
              v-for="(a, i) in aktSlot.choices"
              :key="a"
              class="rr-antwort"
              :class="`k-${aktSlot.k}`"
              @click="waehle(a)"
            >
              <kbd>{{ i + 1 }}</kbd>
              <span>{{ label(a) }}</span>
            </button>
          </div>
        </div>
        <div v-else-if="phase === 'falsch'" class="rr-aktion">
          <button ref="weiterBtn" class="rr-weiter" @click="nachFehler">Continue ⏎</button>
        </div>
        <div v-else-if="phase === 'fertig'" class="rr-aktion">
          <button ref="weiterBtn" class="rr-weiter" :class="{ 'is-auto': !fehlerInKarte }" @click="weiter">
            {{ fehlerInKarte ? 'Next report ⏎' : 'Next ⏎' }}
          </button>
        </div>
      </template>

      <!-- Level geschafft -->
      <div v-else class="rr-geschafft">
        <div class="rr-konfetti" aria-hidden="true">
          <span v-for="(k, i) in KONFETTI" :key="i" :style="k" />
        </div>
        <div class="rr-geschafft__pokal" aria-hidden="true">🏆</div>
        <p class="rr-geschafft__titel" role="heading" aria-level="2">Level {{ levelIdx + 1 }} complete!</p>
        <p class="rr-sterne rr-sterne--gross" :aria-label="`${ergebnis.sterne} of 3 stars`">
          <span v-for="s in 3" :key="s" :class="{ 'is-an': s <= ergebnis.sterne }" :style="{ animationDelay: `${0.25 * s}s` }">★</span>
        </p>
        <p v-if="ergebnis.neuerRang" class="rr-befoerdert">
          🎉 Promotion! You are now <strong>{{ ergebnis.neuerRang.icon }} {{ ergebnis.neuerRang.titel }}</strong>.
        </p>
        <ul class="rr-stats">
          <li><strong>{{ stat.karten }}</strong> reports</li>
          <li><strong>{{ stat.perfekt }}</strong> perfect</li>
          <li><strong>{{ stat.besteSerie }}</strong> best streak</li>
        </ul>
        <p v-if="ergebnis.sterne < 3" class="rr-hinweis">3 stars: finish the level with at most one mistake.</p>
        <div class="rr-geschafft__knoepfe">
          <button v-if="levelIdx + 1 < LEVELS.length" class="rr-weiter" @click="starte(levelIdx + 1)">
            Next level: {{ LEVELS[levelIdx + 1].icon }} {{ LEVELS[levelIdx + 1].titel }} →
          </button>
          <button class="rr-zweit" @click="starte(levelIdx)">↻ Play again</button>
          <button class="rr-zweit" @click="zurUebersicht">All levels</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.rr {
  max-width: 880px;
  margin: 0 auto;
  padding: 28px 16px 48px;
}
.rr-kicker {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}
.rr-de {
  margin: 6px 0 0;
  font-size: 14px;
  font-style: italic;
  color: var(--vp-c-text-2);
}

/* ---------- Start ---------- */
.rr-hero {
  display: flex;
  gap: 20px;
  align-items: center;
}
.rr-hero__mic {
  flex: none;
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  border-radius: 24px;
  font-size: 48px;
  background: linear-gradient(135deg, var(--rs-pron-bg), var(--rs-tense-bg));
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
.rr-hero__titel {
  margin: 2px 0 6px;
  font-size: 40px;
  line-height: 1.1;
  font-weight: 800;
}
.rr-hero__text {
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
}

.rr-rang {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 18px;
  margin: 24px 0 16px;
  padding: 14px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}
.rr-rang__icon {
  font-size: 38px;
}
.rr-rang__text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.rr-rang__text small,
.rr-rang__weg small {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.rr-rang__text strong {
  font-size: 20px;
}
.rr-rang__text span {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.rr-rang__weg {
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.rr-rang__balken {
  height: 10px;
  border-radius: 99px;
  background: var(--vp-c-default-soft);
  overflow: hidden;
}
.rr-rang__balken span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--rs-pron), var(--rs-tense));
}

.rr-regeln {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin: 0 0 12px;
  padding: 0;
  list-style: none;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.rr-regeln b {
  display: inline-grid;
  place-items: center;
  min-width: 28px;
  height: 24px;
  margin-right: 4px;
  padding: 0 6px;
  border-radius: 8px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
  font-size: 13px;
}
.rr-regeln__plus { background: var(--rs-time-bg) !important; color: var(--rs-time) !important; }
.rr-regeln__minus { background: var(--rs-tense-bg) !important; color: var(--rs-tense) !important; }

.rr-farben {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
  font-size: 13px;
}

.rr-kacheln {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}
.rr-kachel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 14px 16px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-align: left;
  font: inherit;
  cursor: pointer;
  transition: transform 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
}
.rr-kachel:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
.rr-kachel.is-next {
  border: 2px solid var(--vp-c-brand-1);
}
.rr-kachel.is-done {
  background: linear-gradient(135deg, var(--vp-c-bg-soft), var(--rs-time-bg));
}
.rr-kachel__icon {
  position: absolute;
  top: 12px;
  right: 14px;
  font-size: 26px;
}
.rr-kachel__nr {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.rr-kachel__titel {
  padding-right: 34px;
  font-size: 17px;
  line-height: 1.3;
}
.rr-kachel__de {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.rr-kachel__los {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.rr-sterne {
  margin-top: 4px;
  font-size: 18px;
  letter-spacing: 2px;
  color: var(--vp-c-text-3);
}
.rr-sterne .is-an {
  color: #f5b301;
}
.rr-fuss {
  margin-top: 24px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.rr-fuss a {
  margin-left: 6px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

/* ---------- Marken & Farben ---------- */
.rr-mark {
  padding: 0 1px;
  border-radius: 6px;
  color: var(--c);
  font-weight: 700;
  box-shadow: inset 0 -2px 0 var(--c);
}
.rr-mark.is-voll,
.rr-szene.is-fertig .rr-mark,
.rr-block.is-fertig .rr-mark {
  padding: 1px 7px;
  background: var(--bg);
  box-shadow: inset 0 0 0 1.5px var(--c);
}
.rs-fig .k-rep { --c: var(--vp-c-text-1); --bg: var(--vp-c-default-soft); }

/* ---------- Spiel ---------- */
.rr-nav {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
  font-size: 14px;
}
.rr-nav a,
.rr-nav button {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}
.rr-kopf__titel {
  margin: 4px 0 10px;
  font-size: 26px;
  line-height: 1.25;
  font-weight: 800;
}
.rr-levelwahl {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.rr-levelwahl button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.rr-levelwahl button.is-done {
  background: var(--rs-time-bg);
  color: var(--rs-time);
  border-color: var(--rs-time);
}
.rr-levelwahl button.is-aktiv {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.rr-status {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin: 18px 0 16px;
}
.rr-balken {
  flex: 1 1 200px;
  display: flex;
  gap: 4px;
}
.rr-balken span {
  flex: 1;
  height: 12px;
  border-radius: 99px;
  background: var(--vp-c-default-soft);
  transition: background 0.3s ease;
}
.rr-balken span.is-voll {
  background: linear-gradient(90deg, var(--rs-time), #51cf66);
}
.rr-punkte {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.rr-streak {
  padding: 3px 10px;
  border-radius: 99px;
  background: var(--rs-order-bg);
  color: var(--rs-order);
  font-size: 14px;
  font-weight: 700;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.rr-streak.is-sichtbar {
  opacity: 1;
  transform: scale(1);
}
.rr-streak.is-heiss {
  animation: rr-flackern 0.9s ease-in-out infinite alternate;
}

/* Szene: Person + Sprechblase */
.rr-szene {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.rr-person {
  flex: none;
  width: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1.25;
}
.rr-avatar {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-size: 38px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
}
.rr-person__name {
  margin-top: 4px;
  font-size: 14px;
  font-weight: 700;
}
.rr-person__an {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
.rr-blase {
  position: relative;
  flex: 1;
  margin: 8px 0 0;
  padding: 14px 18px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg);
  font-size: 20px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}
.rr-blase::before {
  content: '';
  position: absolute;
  left: -11px;
  top: 18px;
  width: 18px;
  height: 18px;
  background: var(--vp-c-bg);
  border-left: 2px solid var(--vp-c-divider);
  border-bottom: 2px solid var(--vp-c-divider);
  transform: rotate(45deg);
}
.rr-quote {
  color: var(--vp-c-text-3);
  font-weight: 700;
}
.rr-kontext {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0 0 106px;
  padding: 0;
  list-style: none;
}
.rr-kontext li {
  padding: 2px 10px;
  border-radius: 99px;
  background: var(--rs-time-bg);
  color: var(--rs-time);
  font-size: 13px;
  font-weight: 600;
}

/* Notizblock */
.rr-block {
  position: relative;
  margin-top: 18px;
  padding: 14px 18px 16px 30px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background:
    linear-gradient(90deg, transparent 18px, color-mix(in srgb, var(--rs-tense) 35%, transparent) 18px, color-mix(in srgb, var(--rs-tense) 35%, transparent) 20px, transparent 20px),
    var(--vp-c-bg-soft);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.rr-block.is-perfekt {
  border-color: var(--rs-time);
  box-shadow: 0 0 0 3px var(--rs-time-bg);
}
.rr-block.is-falsch {
  border-color: var(--rs-tense);
}
.rr-block__label {
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}
.rr-satz {
  --zeile: 46px;
  margin: 0;
  font-size: 21px;
  line-height: var(--zeile);
  background: repeating-linear-gradient(transparent 0 calc(var(--zeile) - 1px), var(--vp-c-divider) calc(var(--zeile) - 1px) var(--zeile));
}
.rr-luecke {
  display: inline-block;
  min-width: 46px;
  padding: 0 10px;
  border-radius: 10px;
  line-height: 1.55;
  text-align: center;
  font-weight: 700;
  color: var(--c);
  border: 2px dashed var(--c);
  background: transparent;
  vertical-align: baseline;
}
.rr-luecke.is-offen:not(.is-aktiv) {
  opacity: 0.45;
}
.rr-luecke.is-aktiv {
  background: var(--bg);
  animation: rr-puls 1.2s ease-in-out infinite;
}
.rr-luecke.is-ok {
  border-style: solid;
  background: var(--bg);
  animation: rr-plopp 0.35s ease;
}
.rr-luecke.is-falsch {
  border-style: solid;
  background: var(--bg);
  animation: rr-wackeln 0.4s ease;
}
.rr-luecke__falsch {
  margin-right: 4px;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.rr-tipp {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--vp-c-warning-soft);
  font-size: 15px;
  line-height: 1.5;
}
.rr-tipp a {
  margin-left: 4px;
  white-space: nowrap;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.rr-fertig {
  margin-top: 10px;
}
.rr-fertig__titel {
  margin: 0;
  font-weight: 800;
  font-size: 17px;
}
.rr-block.is-perfekt .rr-fertig__titel {
  color: var(--rs-time);
}
.rr-changes {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
  font-size: 15px;
}
.rr-changes li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.rr-changes__pfeil {
  color: var(--vp-c-text-3);
  font-weight: 700;
}

/* Antworten */
.rr-wahl {
  margin-top: 16px;
}
.rr-frage {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.rr-frage__nr {
  margin-left: auto;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-3);
}
.rr-punkt {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--c);
}
.rr-antworten {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.rr-antwort {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 58px;
  padding: 10px 14px;
  border: 2px solid var(--vp-c-divider);
  border-bottom-width: 4px;
  border-radius: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.08s ease, border-color 0.12s ease, background 0.12s ease;
}
.rr-antwort:hover {
  border-color: var(--c);
  background: var(--bg);
  color: var(--c);
}
.rr-antwort:active {
  transform: translateY(2px);
  border-bottom-width: 2px;
}
.rr-antwort kbd {
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-family: inherit;
  font-size: 12px;
}
.rr-aktion {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
.rr-weiter,
.rr-zweit {
  padding: 10px 20px;
  border-radius: 99px;
  border: 0;
  font: inherit;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
}
.rr-weiter {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.rr-weiter:hover {
  background: var(--vp-button-brand-hover-bg);
}
.rr-weiter.is-auto {
  background: var(--rs-time);
  color: #fff;
}
.rr-zweit {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

/* Level geschafft */
.rr-geschafft {
  position: relative;
  overflow: hidden;
  margin-top: 8px;
  padding: 30px 20px 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: linear-gradient(160deg, var(--rs-time-bg), var(--vp-c-bg-soft) 55%);
  text-align: center;
}
.rr-geschafft__titel {
  position: relative;
  margin: 6px 0 0;
  font-size: 28px;
  line-height: 1.3;
  font-weight: 800;
}
.rr-geschafft__pokal {
  position: relative;
  font-size: 64px;
  line-height: 1.15;
  animation: rr-plopp 0.6s ease;
}
.rr-sterne--gross {
  position: relative;
  margin: 6px 0;
  font-size: 46px;
  line-height: 1.2;
}
.rr-sterne--gross span {
  display: inline-block;
  animation: rr-stern 0.5s ease both;
}
.rr-befoerdert {
  display: inline-block;
  margin: 8px 0;
  padding: 8px 16px;
  border-radius: 99px;
  background: var(--rs-order-bg);
  color: var(--rs-order);
  font-weight: 600;
}
.rr-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 26px;
  margin: 14px 0;
  padding: 0;
  list-style: none;
  color: var(--vp-c-text-2);
}
.rr-stats strong {
  display: block;
  font-size: 24px;
  color: var(--vp-c-text-1);
}
.rr-hinweis {
  margin: 0 0 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.rr-geschafft__knoepfe {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}
.rr-konfetti {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.rr-konfetti span {
  position: absolute;
  top: -12px;
  width: 9px;
  height: 14px;
  border-radius: 2px;
  opacity: 0;
  animation-name: rr-fallen;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
}

@keyframes rr-puls {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 35%, transparent); }
  50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--c) 0%, transparent); }
}
@keyframes rr-plopp {
  0% { transform: scale(0.6); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes rr-wackeln {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
@keyframes rr-stern {
  0% { transform: scale(0) rotate(-40deg); }
  70% { transform: scale(1.3) rotate(10deg); }
  100% { transform: scale(1) rotate(0); }
}
@keyframes rr-fallen {
  0% { opacity: 1; translate: 0 0; }
  100% { opacity: 0.9; translate: 0 460px; rotate: 540deg; }
}
@keyframes rr-flackern {
  from { transform: scale(1); }
  to { transform: scale(1.08); }
}
@media (prefers-reduced-motion: reduce) {
  .rr *,
  .rr *::before {
    animation: none !important;
    transition: none !important;
  }
  .rr-konfetti { display: none; }
}

/* Handy */
@media (max-width: 600px) {
  .rr { padding-top: 18px; }
  .rr-hero { align-items: flex-start; }
  .rr-hero__mic { width: 64px; height: 64px; font-size: 34px; border-radius: 18px; }
  .rr-hero__titel { font-size: 32px; }
  .rr-person { width: 64px; }
  .rr-avatar { width: 52px; height: 52px; font-size: 30px; }
  .rr-blase { font-size: 18px; padding: 10px 14px; }
  .rr-kontext { margin-left: 0; }
  .rr-block { padding-left: 28px; }
  .rr-satz { --zeile: 40px; font-size: 18px; }
  .rr-antworten { grid-template-columns: 1fr; }
  .rr-antwort { justify-content: flex-start; min-height: 50px; font-size: 17px; }
}
</style>

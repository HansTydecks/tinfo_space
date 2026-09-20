<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { findAufgabe } from './aufgaben/index.js'

const props = defineProps({
  aufgabe: { type: String, required: true },
})

const daten = computed(() => findAufgabe(props.aufgabe))
const koerbe = computed(() => daten.value?.koerbe ?? [])
const karten = computed(() => daten.value?.karten ?? [])

const VORRAT = '__vorrat__'
const ZIEH_SCHWELLE = 6 // px, darunter bleibt es ein Klick

// platz[i] = Korb-Id der Karte i, oder VORRAT
const platz = ref([])
// status[i] = '' | 'richtig' | 'falsch' (erst nach dem Prüfen gesetzt)
const status = ref([])
// Anzeigereihenfolge: auf dem Server 0..n-1, im Browser gemischt
const reihenfolge = ref([])
const aktiv = ref(-1)
const geprueft = ref(false)
const meldung = ref('')

const kartenEls = {}

function mischeIndizes(n) {
  const a = [...Array(n).keys()]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const merk = a[i]
    a[i] = a[j]
    a[j] = merk
  }
  return a
}

function init(mischen) {
  const n = karten.value.length
  platz.value = Array(n).fill(VORRAT)
  status.value = Array(n).fill('')
  reihenfolge.value = mischen ? mischeIndizes(n) : [...Array(n).keys()]
  aktiv.value = -1
  geprueft.value = false
  meldung.value = ''
}

init(false)

onMounted(() => {
  if (!daten.value) {
    console.warn(`[SortierAufgabe] unbekannte Aufgabe "${props.aufgabe}"`)
    return
  }
  // Erst im Browser mischen, sonst passt das SSR-HTML nicht zum Hydrieren
  init(true)
})

// ---------------------------------------------------------------------------
// Ableitungen
// ---------------------------------------------------------------------------
const kartenIn = (korbId) => reihenfolge.value.filter((i) => platz.value[i] === korbId)
const offen = computed(() => platz.value.filter((p) => p === VORRAT).length)
const richtigAnzahl = computed(() => status.value.filter((s) => s === 'richtig').length)
const fertig = computed(() => geprueft.value && richtigAnzahl.value === karten.value.length)
const falscheDa = computed(() => status.value.some((s) => s === 'falsch'))
const gesperrt = (i) => status.value[i] === 'richtig'
const labelVon = (korbId) => koerbe.value.find((k) => k.id === korbId)?.label ?? ''

// ---------------------------------------------------------------------------
// Karten bewegen
// ---------------------------------------------------------------------------
function lege(i, korbId, fokus = false) {
  if (i < 0 || gesperrt(i) || platz.value[i] === korbId) {
    aktiv.value = -1
    return
  }
  platz.value[i] = korbId
  status.value[i] = ''
  aktiv.value = -1
  if (geprueft.value && !falscheDa.value) geprueft.value = false
  const ziel = korbId === VORRAT ? 'zurück in den Vorrat' : labelVon(korbId)
  meldung.value = `${karten.value[i].text} – ${ziel}`
  if (fokus) nextTick(() => kartenEls[i]?.focus())
}

function kartenKlick(i) {
  // Nach einem echten Zug folgt noch ein click – der darf die Karte nicht wieder auswählen
  if (unterdrueckeKlick) {
    unterdrueckeKlick = false
    return
  }
  if (gesperrt(i)) return
  aktiv.value = aktiv.value === i ? -1 : i
}

function korbKlick(korbId) {
  if (aktiv.value >= 0) lege(aktiv.value, korbId)
}

function kartenTaste(e, i) {
  if (gesperrt(i)) return
  if (e.key >= '0' && e.key <= '9') {
    const n = Number(e.key)
    if (n === 0) {
      e.preventDefault()
      lege(i, VORRAT, true)
    } else if (n <= koerbe.value.length) {
      e.preventDefault()
      lege(i, koerbe.value[n - 1].id, true)
    }
    return
  }
  if (e.key === 'Escape' || e.key === 'Backspace') {
    e.preventDefault()
    if (platz.value[i] === VORRAT) aktiv.value = -1
    else lege(i, VORRAT, true)
  }
}

// ---------------------------------------------------------------------------
// Ziehen (Pointer Events – Maus, Stift und Touch)
// ---------------------------------------------------------------------------
const zieht = ref(-1)
const versatz = ref({ x: 0, y: 0 })
const zielKorb = ref('')
let start = null
let unterdrueckeKlick = false

function korbUnter(x, y) {
  if (typeof document === 'undefined') return ''
  const el = document.elementFromPoint(x, y)
  return el?.closest('[data-korb]')?.dataset.korb ?? ''
}

function zugStart(e, i) {
  unterdrueckeKlick = false
  if (gesperrt(i) || (e.pointerType === 'mouse' && e.button !== 0)) return
  start = { x: e.clientX, y: e.clientY, i, el: e.currentTarget, gezogen: false }
  e.currentTarget.setPointerCapture?.(e.pointerId)
}

function zugBewegt(e) {
  if (!start) return
  const dx = e.clientX - start.x
  const dy = e.clientY - start.y
  if (!start.gezogen && Math.hypot(dx, dy) < ZIEH_SCHWELLE) return
  start.gezogen = true
  zieht.value = start.i
  versatz.value = { x: dx, y: dy }
  zielKorb.value = korbUnter(e.clientX, e.clientY)
}

function zugEnde(e) {
  if (!start) return
  const i = start.i
  const gezogen = start.gezogen
  const el = start.el
  const ziel = gezogen ? korbUnter(e.clientX, e.clientY) : ''
  start = null
  zieht.value = -1
  zielKorb.value = ''
  el?.releasePointerCapture?.(e.pointerId)
  // Ein Tippen ohne Zug erledigt der folgende click – so reagiert die Karte auch auf Enter
  if (!gezogen) return
  unterdrueckeKlick = true
  if (ziel) lege(i, ziel)
}

function zugAbbruch() {
  start = null
  zieht.value = -1
  zielKorb.value = ''
}

const zugStil = (i) =>
  zieht.value === i ? { transform: `translate(${versatz.value.x}px, ${versatz.value.y}px)` } : null

// ---------------------------------------------------------------------------
// Prüfen und zurücksetzen
// ---------------------------------------------------------------------------
function pruefe() {
  karten.value.forEach((k, i) => {
    if (platz.value[i] === VORRAT) return
    status.value[i] = platz.value[i] === k.korb ? 'richtig' : 'falsch'
  })
  geprueft.value = true
  aktiv.value = -1
  meldung.value = `${richtigAnzahl.value} von ${karten.value.length} richtig.`
}

function nochmal() {
  status.value.forEach((s, i) => {
    if (s === 'falsch') {
      platz.value[i] = VORRAT
      status.value[i] = ''
    }
  })
  geprueft.value = false
  aktiv.value = -1
  meldung.value = 'Die falschen Karten liegen wieder im Vorrat.'
}

function zuruecksetzen() {
  init(true)
  meldung.value = 'Aufgabe zurückgesetzt.'
}
</script>

<template>
  <section v-if="daten" class="sortier" :class="{ 'is-fertig': fertig }">
    <h3 class="sortier__titel">{{ daten.titel }}</h3>
    <p class="sortier__anleitung">{{ daten.anleitung }}</p>

    <div
      class="sortier__vorrat"
      :class="{ 'is-ziel': zielKorb === VORRAT, 'is-leer': offen === 0 }"
      :data-korb="VORRAT"
      @click="korbKlick(VORRAT)"
    >
      <ul v-if="offen > 0" class="sortier__liste">
        <li v-for="i in kartenIn(VORRAT)" :key="i">
          <button
            :ref="(el) => (kartenEls[i] = el)"
            type="button"
            class="sortier__karte"
            :class="{ 'is-aktiv': aktiv === i, 'is-zieht': zieht === i }"
            :style="zugStil(i)"
            :aria-pressed="aktiv === i"
            @click.stop="kartenKlick(i)"
            @keydown="kartenTaste($event, i)"
            @pointerdown="zugStart($event, i)"
            @pointermove="zugBewegt"
            @pointerup="zugEnde"
            @pointercancel="zugAbbruch"
          >{{ karten[i].text }}</button>
        </li>
      </ul>
      <p v-else class="sortier__vorrat-leer">Alle Karten sind verteilt.</p>
    </div>

    <div class="sortier__koerbe">
      <div
        v-for="(korb, n) in koerbe"
        :key="korb.id"
        class="sortier__korb"
        :class="{ 'is-ziel': zielKorb === korb.id }"
        :data-korb="korb.id"
        @click="korbKlick(korb.id)"
      >
        <button
          type="button"
          class="sortier__korb-kopf"
          :aria-label="`Korb ${n + 1}: ${korb.label}. Ausgewählte Karte hier ablegen.`"
          @click.stop="korbKlick(korb.id)"
        >
          <span class="sortier__korb-nr" aria-hidden="true">{{ n + 1 }}</span>
          <span>{{ korb.label }}</span>
        </button>
        <ul class="sortier__liste">
          <li v-for="i in kartenIn(korb.id)" :key="i">
            <button
              :ref="(el) => (kartenEls[i] = el)"
              type="button"
              class="sortier__karte"
              :class="{
                'is-aktiv': aktiv === i,
                'is-zieht': zieht === i,
                'is-richtig': status[i] === 'richtig',
                'is-falsch': status[i] === 'falsch',
              }"
              :style="zugStil(i)"
              :disabled="gesperrt(i)"
              :aria-pressed="aktiv === i"
              @click.stop="kartenKlick(i)"
              @keydown="kartenTaste($event, i)"
              @pointerdown="zugStart($event, i)"
              @pointermove="zugBewegt"
              @pointerup="zugEnde"
              @pointercancel="zugAbbruch"
            >
              <span v-if="status[i]" class="sortier__marke" aria-hidden="true">{{
                status[i] === 'richtig' ? '✓' : '✗'
              }}</span>
              <span>{{ karten[i].text }}</span>
            </button>
            <p v-if="status[i] === 'falsch'" class="sortier__hinweis">{{ karten[i].hinweis }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="sortier__fuss">
      <button
        type="button"
        class="sortier__btn sortier__btn--pruefen"
        :disabled="offen > 0 || fertig"
        @click="pruefe"
      >Prüfen</button>
      <button v-if="geprueft && falscheDa" type="button" class="sortier__btn" @click="nochmal">
        Nochmal
      </button>
      <button type="button" class="sortier__btn" @click="zuruecksetzen">Zurücksetzen</button>

      <p class="sortier__stand" :class="{ 'is-fertig': fertig }">
        <template v-if="fertig">🎉 Alles richtig!</template>
        <template v-else-if="geprueft">{{ richtigAnzahl }} von {{ karten.length }} richtig</template>
        <template v-else-if="offen > 0"
          >noch {{ offen }} {{ offen === 1 ? 'Karte' : 'Karten' }} im Vorrat</template
        >
        <template v-else>bereit zum Prüfen</template>
      </p>
    </div>

    <p class="sortier__live" aria-live="polite">{{ meldung }}</p>
    <p class="sortier__tastatur">
      Mit der Tastatur: Karte mit <kbd>Tab</kbd> ansteuern, dann Ziffer <kbd>1</kbd>–<kbd>{{
        koerbe.length
      }}</kbd> für den Korb, <kbd>0</kbd> zurück in den Vorrat.
    </p>
  </section>
</template>

<style scoped>
.sortier {
  --sortier-radius: 10px;
  margin: 24px 0;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}
.sortier.is-fertig {
  border-color: var(--vp-c-success-1);
}

.sortier__titel {
  margin: 0;
  padding-top: 0;
  border-top: none;
  font-size: 17px;
  line-height: 1.4;
}
.sortier__anleitung {
  margin: 4px 0 14px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

/* Vorrat ------------------------------------------------------------------ */
.sortier__vorrat {
  min-height: 56px;
  padding: 10px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: var(--sortier-radius);
  background: var(--vp-c-bg);
  transition: border-color 0.15s, background-color 0.15s;
}
.sortier__vorrat.is-ziel {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.sortier__vorrat.is-leer {
  min-height: 0;
  padding: 6px 10px;
}
.sortier__vorrat-leer {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
  text-align: center;
}

/* Körbe ------------------------------------------------------------------- */
.sortier__koerbe {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.sortier__korb {
  display: flex;
  flex-direction: column;
  min-height: 116px;
  padding: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--sortier-radius);
  background: var(--vp-c-bg);
  transition: border-color 0.15s, background-color 0.15s;
}
.sortier__korb.is-ziel {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.sortier__korb-kopf {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 4px 2px 8px;
  border: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background: none;
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}
.sortier__korb-kopf:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.sortier__korb-nr {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 700;
}

/* Karten ------------------------------------------------------------------ */
.sortier__liste {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.sortier__korb .sortier__liste {
  flex-direction: column;
  flex-wrap: nowrap;
  padding-top: 8px;
}
.sortier__liste li {
  margin: 0;
  padding: 0;
}

.sortier__karte {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  max-width: 100%;
  padding: 7px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 14px;
  line-height: 1.35;
  text-align: left;
  cursor: grab;
  touch-action: pan-y;
  transition: border-color 0.15s, background-color 0.15s, box-shadow 0.15s;
}
.sortier__karte:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
}
.sortier__karte:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.sortier__karte.is-aktiv {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}
.sortier__karte.is-zieht {
  position: relative;
  z-index: 10;
  cursor: grabbing;
  pointer-events: none;
  opacity: 0.92;
  box-shadow: var(--vp-shadow-2);
}
.sortier__karte.is-richtig {
  border-color: var(--vp-c-success-1);
  background: var(--vp-c-success-soft);
  cursor: default;
  opacity: 1;
}
.sortier__karte.is-falsch {
  border-color: var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}
.sortier__marke {
  font-weight: 700;
}

.sortier__hinweis {
  margin: 4px 0 2px;
  padding-left: 12px;
  border-left: 2px solid var(--vp-c-danger-1);
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.45;
}

/* Fuß --------------------------------------------------------------------- */
.sortier__fuss {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.sortier__btn {
  padding: 6px 16px;
  border: 1px solid var(--vp-button-alt-border);
  border-radius: 999px;
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}
.sortier__btn:hover:not(:disabled) {
  border-color: var(--vp-button-alt-hover-border);
  background: var(--vp-button-alt-hover-bg);
}
.sortier__btn:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.sortier__btn--pruefen {
  border-color: transparent;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.sortier__btn--pruefen:hover:not(:disabled) {
  border-color: transparent;
  background: var(--vp-button-brand-hover-bg);
}
.sortier__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sortier__stand {
  margin: 0 0 0 auto;
  color: var(--vp-c-text-3);
  font-size: 13px;
}
.sortier__stand.is-fertig {
  color: var(--vp-c-success-1);
  font-weight: 600;
}

.sortier__tastatur {
  margin: 10px 0 0;
  color: var(--vp-c-text-3);
  font-size: 12px;
}
.sortier__tastatur kbd {
  padding: 1px 5px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
}

.sortier__live {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 480px) {
  .sortier {
    padding: 12px;
  }
  .sortier__koerbe {
    grid-template-columns: 1fr;
  }
  .sortier__stand {
    width: 100%;
    margin-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sortier__karte,
  .sortier__korb,
  .sortier__vorrat,
  .sortier__btn {
    transition: none;
  }
}
</style>

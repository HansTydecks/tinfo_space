<script setup>
// Nose Dive – unregelmäßige Verben. Hülle um das Canvas-Spiel: Menüs, Anzeige oben, Ergebnisse.
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { createGame } from './game/game.js'
import { createAudio } from './engine/audio.js'
import { LEVELS, HEARTS, starsFor, FORM_INFO } from './game/levels.js'
import { loadProgress, saveProgress, nextLevel } from './game/progress.js'

const root = ref(null)
const canvas = ref(null)
const hud = ref(null)
const primary = ref(null)

const progress = reactive(loadProgress())
const screen = ref('menu') // menu | levels | intro | play | pause | landed | crash
const choice = ref(null) // gewähltes Level-Objekt oder 'endless'
const col = reactive({ left: 0, width: 360 })
const portraitHint = ref(false)

const hudState = reactive({
  hearts: HEARTS,
  lost: -1,
  score: 0,
  combo: 0,
  mult: 1,
  card: null, // { inf, de, form, repeat }
  result: null, // { ok, inf, past, pp, form, picked }
  hits: 0,
  goal: 0,
  altitude: 4000,
  stage: 1,
  bump: 0,
})
const outcome = ref(null)
const shownStars = ref(0)

let game = null
let audio = null
const timers = []
const later = (fn, ms) => timers.push(setTimeout(fn, ms))

const levelsDone = computed(() => Object.keys(progress.stars).length)
const totalStars = computed(() => Object.values(progress.stars).reduce((s, n) => s + n, 0))
const continueLevel = computed(() => LEVELS[nextLevel(progress, LEVELS.length) - 1])
const isEndless = computed(() => choice.value === 'endless')
const currentLevel = computed(() => (isEndless.value ? null : choice.value))
const nextLevelObj = computed(() => (currentLevel.value ? LEVELS[currentLevel.value.nr] || null : null))

// ---------------------------------------------------------------------------
// Ereignisse aus dem Spiel
// ---------------------------------------------------------------------------
function onEvent(type, d) {
  if (type === 'card') {
    hudState.card = d
    hudState.result = null
  } else if (type === 'hit') {
    hudState.result = { ok: true, ...d }
    hudState.score = d.score
    hudState.combo = d.combo
    hudState.mult = d.mult
    hudState.bump++
  } else if (type === 'miss') {
    hudState.result = { ok: false, ...d }
    hudState.combo = 0
    hudState.mult = 1
    hudState.lost = d.hearts
    hudState.hearts = d.hearts
  } else if (type === 'hearts') {
    hudState.hearts = d.hearts
    hudState.lost = -1
  } else if (type === 'progress') {
    if (d.endless) hudState.stage = d.stage
    else {
      hudState.hits = d.hits
      hudState.goal = d.goal
      hudState.altitude = d.altitude
    }
  } else if (type === 'stage') {
    hudState.stage = d.stage
  } else if (type === 'pauseRequest') {
    pause()
  } else if (type === 'landed') {
    finish(d, true)
  } else if (type === 'crash') {
    finish(d, false)
  }
}

function finish(d, landed) {
  const res = { ...d, landed, stars: 0, newRecord: false, oldBest: progress.best }
  if (landed && d.level) {
    res.stars = starsFor(d.misses)
    const before = progress.stars[d.level] || 0
    res.improved = res.stars > before
    progress.stars = { ...progress.stars, [d.level]: Math.max(before, res.stars) }
  }
  if (d.endless && d.score > progress.best) {
    res.newRecord = progress.best > 0
    progress.best = d.score
  }
  saveProgress(progress)
  outcome.value = res
  shownStars.value = 0
  screen.value = landed ? 'landed' : 'crash'
  if (landed) for (let i = 0; i < res.stars; i++) later(() => {
    shownStars.value = i + 1
    audio.sfx.star(i)
  }, 450 + i * 320)
  if (res.newRecord) later(() => audio.sfx.record(), 500)
}

// ---------------------------------------------------------------------------
// Steuerung der Bildschirme
// ---------------------------------------------------------------------------
function click() {
  audio.unlock()
  audio.sfx.click()
}

function openLevel(level) {
  click()
  choice.value = level
  screen.value = 'intro'
}

async function jump() {
  click()
  Object.assign(hudState, { hearts: HEARTS, lost: -1, score: 0, combo: 0, mult: 1, card: null, result: null, hits: 0, stage: 1, altitude: 4000 })
  hudState.goal = currentLevel.value?.goal || 0
  outcome.value = null
  screen.value = 'play'
  await nextTick()
  measureHud()
  game.start(isEndless.value ? 'endless' : currentLevel.value)
}

function pause() {
  if (screen.value !== 'play') return
  game.pause()
  screen.value = 'pause'
}
function resume() {
  click()
  screen.value = 'play'
  game.resume()
}
function restart() {
  game.resume()
  jump()
}
function toMenu() {
  click()
  game.toAttract()
  screen.value = 'menu'
}
function next() {
  if (nextLevelObj.value) {
    choice.value = nextLevelObj.value
    screen.value = 'intro'
    click()
    game.toAttract()
  } else toMenu()
}
function toggleSound() {
  progress.sound = !progress.sound
  audio.setSound(progress.sound)
  saveProgress(progress)
  click()
}
function toggleMusic() {
  progress.music = !progress.music
  audio.unlock()
  audio.setMusic(progress.music)
  saveProgress(progress)
  click()
}
const canFullscreen = ref(false)
function toggleFullscreen() {
  click()
  if (document.fullscreenElement) document.exitFullscreen?.()
  else root.value.requestFullscreen?.().catch(() => {})
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
function measureHud() {
  if (!hud.value || !game) return
  const r = hud.value.getBoundingClientRect()
  const top = root.value.getBoundingClientRect().top
  game.setTopInset(r.bottom - top)
}

const howto = ref(null)
function measureMenu() {
  if (!game || screen.value !== 'menu' || !howto.value) return
  const top = root.value.getBoundingClientRect().top
  game.setAttractY(howto.value.getBoundingClientRect().bottom - top + 90)
}

function layout() {
  if (!game) return
  game.resize()
  const v = game.debug.view
  col.left = v.ox
  col.width = v.W * v.scale
  portraitHint.value = matchMedia('(pointer: coarse)').matches && v.cssW > v.cssH && v.cssH < 520
  measureHud()
  measureMenu()
}

function onKey(e) {
  if (e.code === 'Escape') {
    if (screen.value === 'pause') resume()
    else if (screen.value === 'levels' || screen.value === 'intro') {
      click()
      screen.value = screen.value === 'intro' ? 'levels' : 'menu'
    }
  }
}

function onVisibility() {
  if (document.hidden) {
    pause()
    audio?.suspend()
  } else audio?.resume()
}

watch(screen, async (s) => {
  await nextTick()
  measureMenu()
  if (s !== 'play') primary.value?.focus?.({ preventScroll: true })
})

let resizeObs = null
onMounted(async () => {
  document.documentElement.classList.add('nd-lock')
  audio = createAudio({ sound: progress.sound, music: progress.music })
  try {
    await Promise.race([document.fonts?.load?.('800 26px Inter'), new Promise((r) => setTimeout(r, 1200))])
  } catch {
    /* ohne Webfont geht es auch */
  }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  game = createGame(canvas.value, { audio, onEvent, reducedMotion: reduced })
  canFullscreen.value = !!document.fullscreenEnabled
  layout()
  game.run()
  resizeObs = new ResizeObserver(() => layout())
  resizeObs.observe(root.value)
  window.addEventListener('keydown', onKey)
  document.addEventListener('visibilitychange', onVisibility)
  const lvl = Number(new URLSearchParams(location.search).get('level'))
  if (lvl >= 1 && lvl <= LEVELS.length) {
    choice.value = LEVELS[lvl - 1]
    screen.value = 'intro'
  }
  if (import.meta.env.DEV) window.__noseDive = { game, hudState, screen, outcome }
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('nd-lock')
  timers.forEach(clearTimeout)
  resizeObs?.disconnect()
  window.removeEventListener('keydown', onKey)
  document.removeEventListener('visibilitychange', onVisibility)
  game?.destroy()
  audio?.destroy()
})

// ---------------------------------------------------------------------------
// Anzeige-Helfer
// ---------------------------------------------------------------------------
const formLabel = (f) => FORM_INFO[f]
const meterPct = computed(() => (hudState.goal ? Math.min(1, hudState.hits / hudState.goal) : 0))
const sampleFor = (form) => (form === 'pp' ? ['go', 'gone'] : form === 'past' ? ['go', 'went'] : ['go', 'went · gone'])
</script>

<template>
  <div
    ref="root"
    class="nd"
    :style="{ '--col-left': col.left + 'px', '--col-w': col.width + 'px' }"
    @pointerdown.capture="audio && audio.unlock()"
  >
    <canvas ref="canvas" class="nd-canvas" aria-hidden="true" />

    <!-- Anzeige während des Spiels -->
    <div v-show="screen === 'play' || screen === 'pause'" ref="hud" class="nd-hud">
      <div class="nd-bar">
        <div class="nd-hearts" :aria-label="`${hudState.hearts} lives left`">
          <svg
            v-for="i in HEARTS"
            :key="i"
            viewBox="0 0 24 22"
            class="nd-heart"
            :class="{ off: i > hudState.hearts, breaking: i === hudState.lost + 1 }"
          >
            <path d="M12 21 C 5 15, 1 11.5, 1 7 A 5.6 5.6 0 0 1 12 4.2 A 5.6 5.6 0 0 1 23 7 C 23 11.5, 19 15, 12 21 Z" />
          </svg>
        </div>
        <div class="nd-score">
          <div class="nd-score-row">
            <span :key="hudState.bump" class="nd-score-n">{{ hudState.score }}</span>
            <span v-if="hudState.mult > 1" class="nd-mult">×{{ hudState.mult }}</span>
          </div>
          <span class="nd-alt">{{ isEndless ? `stage ${hudState.stage}` : `${hudState.altitude.toLocaleString('en')} m` }}</span>
        </div>
        <button class="nd-icon" aria-label="Pause" @click="pause">
          <svg viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1.5" /><rect x="14" y="5" width="4" height="14" rx="1.5" /></svg>
        </button>
      </div>

      <div class="nd-card" :class="hudState.result ? (hudState.result.ok ? 'is-ok' : 'is-bad') : ''" aria-live="polite">
        <div v-if="!isEndless" class="nd-strip" aria-hidden="true">
          <div class="nd-strip-fill" :style="{ width: meterPct * 100 + '%' }" />
        </div>
        <template v-if="hudState.result">
          <div class="nd-forms">
            <div v-for="f in ['inf', 'past', 'pp']" :key="f" class="nd-f" :class="{ target: hudState.result.form === f }">
              <b>{{ hudState.result[f] }}</b>
              <small>{{ f === 'inf' ? 'infinitive' : f === 'past' ? 'simple past' : 'participle' }}</small>
            </div>
          </div>
          <div class="nd-verdict">
            <template v-if="hudState.result.ok">✓ {{ hudState.combo > 2 ? `${hudState.combo} in a row!` : 'Right!' }}</template>
            <template v-else-if="hudState.result.picked">✗ not <s>{{ hudState.result.picked }}</s></template>
            <template v-else>✗ missed it</template>
          </div>
        </template>
        <template v-else-if="hudState.card">
          <div class="nd-ask">
            <span class="nd-verb">{{ hudState.card.inf }}</span>
            <span class="nd-de">{{ hudState.card.de }}</span>
          </div>
          <div class="nd-want" :class="'f-' + hudState.card.form">
            {{ formLabel(hudState.card.form).en }} <span>· {{ formLabel(hudState.card.form).de }}</span>
          </div>
          <span v-if="hudState.card.repeat" class="nd-again">↻ once more</span>
        </template>
        <template v-else>
          <div class="nd-ask"><span class="nd-verb nd-ready">Get ready…</span></div>
          <div class="nd-want" :class="'f-' + (isEndless ? 'mixed' : currentLevel?.form || 'past')">{{ formLabel(isEndless ? 'mixed' : currentLevel?.form || 'past').en }}</div>
        </template>
      </div>
    </div>

    <!-- Menü -->
    <Transition name="nd-fade">
      <section v-if="screen === 'menu'" class="nd-screen nd-menu">
        <div class="nd-top">
          <a class="nd-chip" href="/students/english/spiele/">← Games</a>
          <div class="nd-top-r">
            <button class="nd-icon light" :aria-pressed="progress.sound" :aria-label="progress.sound ? 'Sound off' : 'Sound on'" @click="toggleSound">
              {{ progress.sound ? '🔊' : '🔈' }}
            </button>
            <button class="nd-icon light" :class="{ dim: !progress.music }" :aria-pressed="progress.music" :aria-label="progress.music ? 'Music off' : 'Music on'" @click="toggleMusic">🎵</button>
            <button v-if="canFullscreen" class="nd-icon light" aria-label="Full screen" @click="toggleFullscreen">⛶</button>
          </div>
        </div>
        <div class="nd-logo">
          <h1><span>Nose</span><span>Dive</span></h1>
          <p class="nd-sub">irregular verbs</p>
        </div>
        <p class="nd-tagline">
          Fall through the sky – catch the right verb form.<br />
          <i>Fang im Fallen die richtige Verbform.</i>
        </p>
        <div class="nd-buttons">
          <button ref="primary" class="nd-btn primary big" @click="openLevel(continueLevel)">
            ▶ {{ levelsDone ? 'Continue' : 'Play' }}
            <small>Level {{ continueLevel.nr }} · {{ continueLevel.name }}</small>
          </button>
          <button class="nd-btn" @click="click(); screen = 'levels'">
            Levels <small>★ {{ totalStars }} / {{ LEVELS.length * 3 }}</small>
          </button>
          <button class="nd-btn" @click="openLevel('endless')">
            ∞ Endless <small v-if="progress.best">best {{ progress.best }}</small>
          </button>
        </div>
        <p ref="howto" class="nd-howto"><span>👆 drag or tap to steer</span><span>⌨️ ← → keys</span></p>
        <p v-if="portraitHint" class="nd-hint">📱 Best played upright · <i>Am besten im Hochformat</i></p>
      </section>
    </Transition>

    <!-- Level-Auswahl -->
    <Transition name="nd-fade">
      <section v-if="screen === 'levels'" class="nd-screen nd-panel-screen">
        <div class="nd-panel">
          <div class="nd-panel-head">
            <button class="nd-chip" @click="click(); screen = 'menu'">← Menu</button>
            <h2>Levels</h2>
            <span class="nd-chip ghost">★ {{ totalStars }}</span>
          </div>
          <div class="nd-levels">
            <button
              v-for="(l, i) in LEVELS"
              :key="l.nr"
              :ref="i === 0 ? (el) => (primary = el) : undefined"
              class="nd-level"
              @click="openLevel(l)"
            >
              <span class="nd-level-nr">{{ l.nr }}</span>
              <span class="nd-level-name">{{ l.name }}</span>
              <span class="nd-level-meta">
                <span class="nd-pill" :class="'f-' + l.form">{{ formLabel(l.form).short }}</span>
                <span class="nd-stars" :aria-label="`${progress.stars[l.nr] || 0} of 3 stars`">
                  <span v-for="s in 3" :key="s" :class="{ on: s <= (progress.stars[l.nr] || 0) }">★</span>
                </span>
              </span>
            </button>
          </div>
          <button class="nd-btn wide" @click="openLevel('endless')">∞ Endless <small v-if="progress.best">best {{ progress.best }}</small></button>
        </div>
      </section>
    </Transition>

    <!-- Level-Start -->
    <Transition name="nd-fade">
      <section v-if="screen === 'intro'" class="nd-screen nd-panel-screen">
        <div class="nd-panel nd-intro">
          <p class="nd-kicker">{{ isEndless ? 'Endless' : `Level ${currentLevel.nr} of ${LEVELS.length}` }}</p>
          <h2>{{ isEndless ? 'Endless fall' : currentLevel.name }}</h2>
          <p class="nd-find">Catch the</p>
          <p class="nd-want big" :class="'f-' + (isEndless ? 'mixed' : currentLevel.form)">
            {{ formLabel(isEndless ? 'mixed' : currentLevel.form).en }}
            <span>{{ formLabel(isEndless ? 'mixed' : currentLevel.form).de }}</span>
          </p>
          <p class="nd-example">
            <b>{{ sampleFor(isEndless ? 'mixed' : currentLevel.form)[0] }}</b> →
            <b class="hl">{{ sampleFor(isEndless ? 'mixed' : currentLevel.form)[1] }}</b>
          </p>
          <ul class="nd-facts">
            <template v-if="isEndless">
              <li>❤️ {{ HEARTS }} lives</li>
              <li>⚡ faster every 10 catches</li>
              <li>🏆 best: {{ progress.best || '–' }}</li>
            </template>
            <template v-else>
              <li>🎯 catch {{ currentLevel.goal }}</li>
              <li>❤️ {{ HEARTS }} lives</li>
              <li>☁️ {{ currentLevel.choices }} clouds</li>
            </template>
          </ul>
          <button ref="primary" class="nd-btn primary big" @click="jump">Jump! 🪂</button>
          <button class="nd-btn ghost" @click="click(); screen = 'levels'">← Levels</button>
        </div>
      </section>
    </Transition>

    <!-- Pause -->
    <Transition name="nd-fade">
      <section v-if="screen === 'pause'" class="nd-screen nd-panel-screen dim">
        <div class="nd-panel nd-small">
          <h2>Paused</h2>
          <button ref="primary" class="nd-btn primary big" @click="resume">▶ Resume</button>
          <button class="nd-btn" @click="restart">↻ Restart</button>
          <div class="nd-row">
            <button class="nd-btn half" :aria-pressed="progress.sound" @click="toggleSound">{{ progress.sound ? '🔊 Sound' : '🔈 Sound off' }}</button>
            <button class="nd-btn half" :aria-pressed="progress.music" @click="toggleMusic">{{ progress.music ? '🎵 Music' : '🎵 Music off' }}</button>
          </div>
          <button class="nd-btn ghost" @click="toMenu">Menu</button>
        </div>
      </section>
    </Transition>

    <!-- Ergebnis -->
    <Transition name="nd-pop">
      <section v-if="(screen === 'landed' || screen === 'crash') && outcome" class="nd-screen nd-panel-screen">
        <div class="nd-panel nd-result">
          <template v-if="outcome.landed">
            <p class="nd-kicker">Level {{ outcome.level }} · {{ currentLevel?.name }}</p>
            <h2>Touchdown!</h2>
            <div class="nd-bigstars" :aria-label="`${outcome.stars} of 3 stars`">
              <span v-for="s in 3" :key="s" :class="{ on: s <= shownStars }">★</span>
            </div>
            <p class="nd-praise">
              {{ outcome.stars === 3 ? 'Perfect – no mistakes!' : outcome.stars === 2 ? 'Great jump!' : 'You made it!' }}
              <i>{{ outcome.stars === 3 ? 'Perfekt – kein Fehler!' : outcome.stars === 2 ? 'Super Sprung!' : 'Geschafft!' }}</i>
            </p>
          </template>
          <template v-else-if="outcome.endless">
            <p class="nd-kicker">Endless · stage {{ outcome.stage }}</p>
            <h2>{{ outcome.newRecord ? 'New record!' : 'Game over' }}</h2>
            <p class="nd-bigscore">{{ outcome.score }}</p>
            <p class="nd-praise">best: {{ progress.best }}</p>
          </template>
          <template v-else>
            <p class="nd-kicker">Level {{ outcome.level }} · {{ currentLevel?.name }}</p>
            <h2>Ouch!</h2>
            <p class="nd-praise">
              Out of lives after {{ outcome.hits }} of {{ outcome.goal }} catches.
              <i>Keine Leben mehr – versuch es noch einmal!</i>
            </p>
          </template>

          <ul class="nd-stats">
            <li><b>{{ outcome.hits }}</b><span>catches</span></li>
            <li><b>{{ outcome.misses }}</b><span>mistakes</span></li>
            <li><b>{{ outcome.bestCombo }}</b><span>best streak</span></li>
            <li><b>{{ outcome.score }}</b><span>points</span></li>
          </ul>

          <div v-if="outcome.missed.length" class="nd-practise">
            <p>Practise these · <i>Übe diese Verben</i></p>
            <table>
              <tr v-for="v in outcome.missed" :key="v.inf">
                <td><b>{{ v.inf }}</b></td>
                <td>{{ v.past }}</td>
                <td>{{ v.pp }}</td>
                <td class="de">{{ v.de }}</td>
              </tr>
            </table>
          </div>

          <template v-if="outcome.landed">
            <button v-if="nextLevelObj" ref="primary" class="nd-btn primary big" @click="next">Next level ▶ <small>{{ nextLevelObj.name }}</small></button>
            <p v-else class="nd-done">🎉 All {{ LEVELS.length }} levels done! Try <b>Endless</b>.</p>
            <div class="nd-row">
              <button class="nd-btn half" @click="restart">↻ Again</button>
              <button :ref="nextLevelObj ? undefined : (el) => (primary = el)" class="nd-btn half" @click="toMenu">Menu</button>
            </div>
          </template>
          <template v-else>
            <button ref="primary" class="nd-btn primary big" @click="restart">↻ Try again</button>
            <button class="nd-btn ghost" @click="toMenu">Menu</button>
          </template>
        </div>
      </section>
    </Transition>
  </div>
</template>

<style>
html.nd-lock,
html.nd-lock body {
  overflow: hidden;
  overscroll-behavior: none;
  height: 100%;
}
</style>

<style scoped>
.nd {
  --navy: #1b2a4a;
  --ink-soft: #4a5a7a;
  --past: #2f7de1;
  --pp: #ee6c1f;
  --mixed: #8a4fd8;
  --good: #14a35a;
  --bad: #e63946;
  --gold: #ffc233;
  --panel: rgba(255, 255, 255, 0.94);
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
  background: #4f9cf0;
  color: var(--navy);
  font-family: var(--vp-font-family-base, Inter, system-ui, sans-serif);
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.nd-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}

/* ------------------------------------------------------------ Anzeige oben */
.nd-hud {
  position: absolute;
  top: 0;
  left: var(--col-left);
  width: var(--col-w);
  padding: max(10px, env(safe-area-inset-top)) 12px 0;
  pointer-events: none;
}
.nd-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 40px;
}
.nd-hearts {
  display: flex;
  gap: 4px;
  min-width: 96px;
}
.nd-heart {
  width: 28px;
  height: 26px;
  fill: #ff4d6d;
  stroke: #fff;
  stroke-width: 2;
  filter: drop-shadow(0 2px 0 rgba(27, 42, 74, 0.25));
  transition: fill 0.3s, transform 0.3s;
}
.nd-heart.off {
  fill: rgba(27, 42, 74, 0.25);
  transform: scale(0.85);
}
.nd-heart.breaking {
  animation: nd-break 0.6s ease;
}
@keyframes nd-break {
  0% { transform: scale(1.4); fill: #ff4d6d; }
  30% { transform: scale(1.2) rotate(-12deg); }
  60% { transform: scale(1) rotate(10deg); }
  100% { transform: scale(0.85); }
}
.nd-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}
.nd-score-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  font-size: 24px;
  color: #fff;
  text-shadow: 0 2px 0 rgba(27, 42, 74, 0.35);
  font-variant-numeric: tabular-nums;
}
.nd-alt {
  margin-top: 2px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 2px rgba(27, 42, 74, 0.45);
}
.nd-score-n {
  display: inline-block;
  animation: nd-bump 0.3s ease;
}
@keyframes nd-bump {
  40% { transform: scale(1.25); }
}
.nd-mult {
  font-size: 15px;
  padding: 2px 8px;
  border-radius: 99px;
  background: var(--gold);
  color: var(--navy);
  text-shadow: none;
  animation: nd-bump 0.4s ease;
}
.nd-icon {
  pointer-events: auto;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 3px 0 rgba(27, 42, 74, 0.2);
  display: grid;
  place-items: center;
  font-size: 20px;
}
.nd-icon svg {
  width: 22px;
  height: 22px;
  fill: var(--navy);
}
.nd-icon.dim {
  opacity: 0.45;
}
.nd-icon:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 rgba(27, 42, 74, 0.2);
}

.nd-card {
  position: relative;
  margin: 8px auto 0;
  max-width: 330px;
  min-height: 92px;
  padding: 10px 14px 12px;
  border-radius: 20px;
  background: var(--panel);
  box-shadow: 0 5px 0 rgba(27, 42, 74, 0.16), 0 12px 30px rgba(27, 42, 74, 0.15);
  text-align: center;
  transition: background 0.2s;
}
.nd-card.is-ok {
  background: #effff5;
  box-shadow: 0 5px 0 #8fdcae, 0 12px 30px rgba(27, 42, 74, 0.15);
}
.nd-card.is-bad {
  background: #fff1f2;
  box-shadow: 0 5px 0 #f5a3ab, 0 12px 30px rgba(27, 42, 74, 0.15);
  animation: nd-shake 0.4s ease;
}
@keyframes nd-shake {
  20% { transform: translateX(-6px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}
.nd-ask {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.nd-verb {
  font-size: 34px;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.nd-verb.nd-ready {
  font-size: 24px;
  opacity: 0.7;
}
.nd-de {
  font-size: 15px;
  color: var(--ink-soft);
  font-style: italic;
}
.nd-want {
  display: inline-block;
  margin-top: 6px;
  padding: 4px 12px;
  border-radius: 99px;
  font-weight: 800;
  font-size: 15px;
  color: #fff;
  background: var(--past);
}
.nd-want span {
  font-weight: 600;
  opacity: 0.85;
}
.f-past { background: var(--past); }
.f-pp { background: var(--pp); }
.f-mixed { background: var(--mixed); }
.nd-again {
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 11px;
  font-weight: 800;
  color: var(--pp);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.nd-forms {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;
}
.nd-f {
  padding: 4px 2px;
  border-radius: 12px;
  min-width: 0;
}
.nd-f b {
  display: block;
  font-size: 20px;
  font-weight: 800;
  overflow-wrap: anywhere;
  line-height: 1.15;
}
.nd-f small {
  display: block;
  font-size: 11px;
  color: var(--ink-soft);
}
.is-ok .nd-f.target {
  background: #c9f5da;
  color: #0d6b3a;
}
.is-bad .nd-f.target {
  background: #c9f5da;
  color: #0d6b3a;
  animation: nd-bump 0.5s ease 0.15s;
}
.nd-verdict {
  margin-top: 4px;
  font-weight: 800;
  font-size: 15px;
}
.is-ok .nd-verdict { color: var(--good); }
.is-bad .nd-verdict { color: var(--bad); }
.nd-verdict s {
  text-decoration-thickness: 2px;
}

/* Fortschritt: Streifen unten in der Karte */
.nd-strip {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 5px;
  height: 4px;
  border-radius: 99px;
  background: rgba(27, 42, 74, 0.08);
  overflow: hidden;
}
.nd-strip-fill {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #ffd166, #5cc26a);
  transition: width 0.5s cubic-bezier(0.3, 1.4, 0.6, 1);
}

/* ------------------------------------------------------------ Bildschirme */
.nd-screen {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  touch-action: pan-y;
  padding: max(14px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom));
}
.nd-screen.dim {
  background: rgba(16, 32, 64, 0.35);
}
.nd-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.nd-top {
  width: 100%;
  max-width: 560px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nd-top-r {
  display: flex;
  gap: 8px;
}
.nd-chip {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 14px;
  border: 0;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.85);
  color: var(--navy);
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  box-shadow: 0 3px 0 rgba(27, 42, 74, 0.18);
}
.nd-chip.ghost {
  background: transparent;
  box-shadow: none;
  color: #e0a100;
}
.nd-logo {
  margin-top: clamp(4px, 3vh, 40px);
}
.nd-logo h1 {
  margin: 0;
  display: flex;
  flex-direction: column;
  line-height: 0.88;
  font-size: clamp(50px, min(15vw, 9vh), 96px);
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 5px 0 #2a64c4, 0 10px 0 rgba(27, 42, 74, 0.25), 0 16px 30px rgba(27, 42, 74, 0.25);
}
.nd-logo h1 span:first-child {
  transform: rotate(-5deg) translateX(-12px);
}
.nd-logo h1 span:last-child {
  transform: rotate(-5deg) translateX(18px);
  color: #ffe066;
  text-shadow: 0 5px 0 #e08a00, 0 10px 0 rgba(27, 42, 74, 0.25), 0 16px 30px rgba(27, 42, 74, 0.25);
}
.nd-sub {
  display: inline-block;
  margin: 16px 0 0;
  padding: 5px 14px;
  border-radius: 99px;
  background: var(--navy);
  color: #fff;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.nd-tagline {
  margin: 12px 0 0;
  max-width: 350px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  text-shadow: 0 1px 3px rgba(27, 42, 74, 0.45);
}
.nd-tagline i {
  font-weight: 500;
  opacity: 0.9;
}
.nd-buttons {
  margin-top: 14px;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.nd-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  padding: 8px 16px;
  border: 0;
  border-radius: 18px;
  background: #fff;
  color: var(--navy);
  font-weight: 800;
  font-size: 18px;
  box-shadow: 0 5px 0 #b9cbe6, 0 8px 18px rgba(27, 42, 74, 0.15);
  transition: transform 0.08s, box-shadow 0.08s;
}
.nd-btn small {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-soft);
}
.nd-btn:active {
  transform: translateY(4px);
  box-shadow: 0 1px 0 #b9cbe6, 0 3px 8px rgba(27, 42, 74, 0.15);
}
.nd-btn:focus-visible,
.nd-icon:focus-visible,
.nd-chip:focus-visible,
.nd-level:focus-visible {
  outline: 3px solid #ffe066;
  outline-offset: 3px;
}
.nd-btn.primary {
  background: linear-gradient(#ff8f4f, #ff6a2b);
  color: #fff;
  box-shadow: 0 5px 0 #c94a12, 0 10px 22px rgba(201, 74, 18, 0.35);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
}
.nd-btn.primary small {
  color: rgba(255, 255, 255, 0.9);
}
.nd-btn.primary:active {
  box-shadow: 0 1px 0 #c94a12, 0 4px 10px rgba(201, 74, 18, 0.35);
}
.nd-btn.big {
  min-height: 62px;
  font-size: 21px;
}
.nd-btn.ghost {
  background: transparent;
  box-shadow: none;
  min-height: 44px;
  font-size: 15px;
  color: var(--ink-soft);
}
.nd-btn.wide {
  margin-top: 12px;
}
.nd-row {
  display: flex;
  gap: 10px;
}
.nd-btn.half {
  flex: 1;
  font-size: 16px;
}
.nd-howto {
  margin: 12px 0 0;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  text-shadow: 0 1px 3px rgba(27, 42, 74, 0.5);
}
.nd-hint {
  margin: 10px 0 0;
  padding: 6px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-weight: 600;
}

/* Panels */
.nd-panel-screen {
  display: grid;
  place-items: center;
}
.nd-panel {
  width: 100%;
  max-width: 420px;
  padding: 18px 18px 16px;
  border-radius: 26px;
  background: var(--panel);
  box-shadow: 0 8px 0 rgba(27, 42, 74, 0.14), 0 20px 50px rgba(27, 42, 74, 0.25);
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}
.nd-small {
  max-width: 340px;
}
.nd-panel h2 {
  margin: 0;
  font-size: 30px;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -0.02em;
  border: 0;
  padding: 0;
}
.nd-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nd-panel-head h2 {
  font-size: 24px;
}
.nd-levels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.nd-level {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 8px;
  align-items: center;
  text-align: left;
  padding: 10px;
  border: 0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 0 #c9d8ee, 0 4px 12px rgba(27, 42, 74, 0.08);
}
.nd-level:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #c9d8ee;
}
.nd-level-nr {
  grid-row: span 2;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--navy);
  color: #fff;
  font-weight: 900;
  font-size: 16px;
}
.nd-level-name {
  font-weight: 800;
  font-size: 14px;
  line-height: 1.15;
}
.nd-level-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-top: 3px;
}
.nd-pill {
  padding: 1px 7px;
  border-radius: 99px;
  color: #fff;
  font-size: 10.5px;
  font-weight: 800;
  white-space: nowrap;
}
.nd-stars span {
  color: #d5deea;
  font-size: 14px;
}
.nd-stars span.on {
  color: var(--gold);
}
.nd-kicker {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.nd-find {
  margin: 4px 0 0;
  font-weight: 700;
  color: var(--ink-soft);
}
.nd-want.big {
  align-self: center;
  margin: 0;
  padding: 8px 18px;
  font-size: 22px;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.nd-want.big span {
  font-size: 14px;
}
.nd-example {
  margin: 4px 0 0;
  font-size: 22px;
}
.nd-example .hl {
  color: var(--good);
}
.nd-facts {
  list-style: none;
  margin: 2px 0 6px;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
}
.nd-facts li {
  padding: 4px 10px;
  border-radius: 99px;
  background: #eef3fb;
  font-weight: 700;
  font-size: 13px;
}

/* Ergebnis */
.nd-bigstars {
  font-size: 54px;
  line-height: 1;
  letter-spacing: 4px;
}
.nd-bigstars span {
  display: inline-block;
  color: #dbe3ee;
  transition: color 0.2s;
}
.nd-bigstars span.on {
  color: var(--gold);
  animation: nd-star 0.45s cubic-bezier(0.3, 1.6, 0.5, 1);
  text-shadow: 0 3px 0 #e0a100;
}
@keyframes nd-star {
  0% { transform: scale(0.2) rotate(-30deg); }
  100% { transform: scale(1) rotate(0); }
}
.nd-bigscore {
  margin: 0;
  font-size: 54px;
  font-weight: 900;
  line-height: 1;
  color: var(--pp);
}
.nd-praise {
  margin: 0;
  font-weight: 700;
  display: flex;
  flex-direction: column;
}
.nd-praise i {
  font-weight: 500;
  color: var(--ink-soft);
  font-size: 14px;
}
.nd-stats {
  list-style: none;
  margin: 4px 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}
.nd-stats li {
  padding: 8px 2px;
  border-radius: 14px;
  background: #eef3fb;
  display: flex;
  flex-direction: column;
}
.nd-stats b {
  font-size: 20px;
  font-weight: 900;
}
.nd-stats span {
  font-size: 11px;
  color: var(--ink-soft);
  font-weight: 600;
}
.nd-practise {
  text-align: left;
  padding: 10px 12px;
  border-radius: 16px;
  background: #fff7ed;
}
.nd-practise p {
  margin: 0 0 6px;
  font-weight: 800;
  font-size: 14px;
  color: #b4530b;
}
.nd-practise table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  display: table;
  margin: 0;
}
.nd-practise tr {
  background: transparent !important;
  border: 0;
}
.nd-practise td {
  padding: 3px 6px 3px 0;
  border: 0;
}
.nd-practise td.de {
  color: var(--ink-soft);
  font-style: italic;
  font-size: 13px;
}
.nd-done {
  margin: 0;
  font-weight: 700;
}

/* Übergänge */
.nd-fade-enter-active,
.nd-fade-leave-active {
  transition: opacity 0.25s ease;
}
.nd-fade-enter-from,
.nd-fade-leave-to {
  opacity: 0;
}
.nd-pop-enter-active {
  transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.nd-pop-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.nd-pop-leave-active {
  transition: opacity 0.2s ease;
}
.nd-pop-leave-to {
  opacity: 0;
}

@media (max-height: 640px) {
  .nd-logo h1 {
    font-size: clamp(44px, 12vh, 72px);
  }
  .nd-tagline {
    font-size: 13px;
  }
  .nd-btn.big {
    min-height: 54px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .nd-card.is-bad,
  .nd-heart.breaking,
  .nd-score-n,
  .nd-bigstars span.on {
    animation: none;
  }
}
</style>

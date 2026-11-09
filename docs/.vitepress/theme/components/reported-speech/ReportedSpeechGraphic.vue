<script setup>
// Grafiken für die Seite „Reported speech“: <ReportedSpeechGraphic name="backshift" caption="…" />
// Farbcode überall gleich: blau = Pronomen, pink = Zeitform, grün = Zeit/Ort, orange = Satzbau.
import Overview from './grafiken/Overview.vue'
import Backshift from './grafiken/Backshift.vue'
import BackshiftCheck from './grafiken/BackshiftCheck.vue'
import Pronouns from './grafiken/Pronouns.vue'
import TimeWords from './grafiken/TimeWords.vue'
import HereThere from './grafiken/HereThere.vue'
import Questions from './grafiken/Questions.vue'
import Commands from './grafiken/Commands.vue'
import SayTell from './grafiken/SayTell.vue'
import './rs.css'

const GRAFIKEN = {
  overview: Overview,
  backshift: Backshift,
  'backshift-check': BackshiftCheck,
  pronouns: Pronouns,
  time: TimeWords,
  place: HereThere,
  questions: Questions,
  commands: Commands,
  'say-tell': SayTell,
}

defineProps({
  name: { type: String, required: true },
  caption: String,
  minWidth: { type: Number, default: 520 },
})
</script>

<template>
  <figure class="rs-fig">
    <div class="rs-scroll">
      <component :is="GRAFIKEN[name]" :style="{ minWidth: minWidth + 'px' }" />
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.rs-fig {
  margin: 20px 0;
  padding: 14px 14px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.rs-scroll {
  overflow-x: auto;
}
.rs-scroll :deep(svg) {
  display: block;
  width: 100%;
  max-width: 760px;
  height: auto;
  margin: 0 auto;
}
figcaption {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  text-align: center;
}
</style>

<script setup>
// Link zum Reporter-Spiel mit Fortschritts-Badge: <ReporterButton /> oder <ReporterButton :level="7" />
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { LEVELS, SPIEL_PFAD, loadProgress } from './levels.js'

const props = defineProps({
  level: { type: Number, default: 0 },
})

const href = computed(() => withBase(SPIEL_PFAD) + (props.level ? `?level=${props.level}` : ''))
const text = computed(() =>
  props.level ? `Level ${props.level}: ${LEVELS[props.level - 1]?.titel ?? ''}` : 'practise reported speech',
)

// Fortschritt erst im Browser lesen, sonst passt das SSR-HTML nicht
const geschafft = ref(0)
onMounted(() => {
  const p = loadProgress()
  geschafft.value = LEVELS.filter((_, i) => Number(p[i + 1] ?? 0) > 0).length
})
</script>

<template>
  <div class="rb">
    <a class="rb__link" :href="href">
      <span class="rb__icon" aria-hidden="true">🎙️</span>
      <span><strong>Reporter game:</strong> {{ text }}</span>
      <span aria-hidden="true">→</span>
    </a>
    <span
      v-if="geschafft > 0 && !level"
      class="rb__badge"
      :class="{ 'is-complete': geschafft === LEVELS.length }"
      :title="`${geschafft} of ${LEVELS.length} levels done`"
    >✓ {{ geschafft }}/{{ LEVELS.length }}</span>
  </div>
</template>

<style scoped>
.rb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 14px 0 6px;
}
.rb__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 18px 7px 14px;
  border-radius: 999px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  font-size: 15px;
  text-decoration: none;
  transition: background 0.15s ease;
}
.rb__link:hover {
  background: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-text);
}
.rb__icon {
  font-size: 18px;
}
.rb__badge {
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.rb__badge.is-complete {
  border-color: var(--vp-c-green-2, #2b8a3e);
  color: var(--vp-c-green-1, #2b8a3e);
}
</style>

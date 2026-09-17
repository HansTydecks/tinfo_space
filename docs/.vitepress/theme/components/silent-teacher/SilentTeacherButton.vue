<script setup>
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { findKapitel, SILENT_TEACHER_PFAD } from './kapitel/index.js'
import { loadProgress, progressKey } from './engine.js'

const props = defineProps({
  kapitel: { type: String, required: true },
})

const kap = computed(() => findKapitel(props.kapitel))
const href = computed(() => withBase(SILENT_TEACHER_PFAD) + '?kapitel=' + encodeURIComponent(props.kapitel))

// Fortschritt erst im Browser lesen, sonst passt das SSR-HTML nicht
const geschafft = ref(0)

onMounted(() => {
  if (!kap.value) {
    console.warn(`[SilentTeacherButton] unbekanntes Kapitel "${props.kapitel}"`)
    return
  }
  const progress = loadProgress()
  geschafft.value = kap.value.level.filter((_, i) => progress[progressKey(kap.value.id, i)]).length
})
</script>

<template>
  <div v-if="kap" class="st-button">
    <a class="st-button__link" :href="href">
      <span class="st-button__icon" aria-hidden="true">🤫</span>
      <span><strong>Silent Teacher:</strong> {{ kap.titel }} üben</span>
      <span class="st-button__arrow" aria-hidden="true">→</span>
    </a>
    <span
      v-if="geschafft > 0"
      class="st-button__badge"
      :class="{ 'is-complete': geschafft === kap.level.length }"
      :title="`${geschafft} von ${kap.level.length} Leveln geschafft`"
    >✓ {{ geschafft }}/{{ kap.level.length }}</span>
  </div>
</template>

<style scoped>
.st-button {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 14px 0 6px;
}

.st-button__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 18px 7px 14px;
  border-radius: 999px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  text-decoration: none;
  box-shadow: var(--vp-shadow-1);
  transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.st-button__link strong {
  font-weight: 700;
}
.st-button__link:hover {
  background: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
  box-shadow: var(--vp-shadow-2);
  transform: translateY(-1px);
}
.st-button__link:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.st-button__icon {
  font-size: 1.15em;
}

.st-button__arrow {
  transition: transform 0.2s;
}
.st-button__link:hover .st-button__arrow {
  transform: translateX(3px);
}

.st-button__badge {
  padding: 2px 10px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 600;
}
.st-button__badge.is-complete {
  background: var(--vp-c-success-soft);
  color: var(--vp-c-success-1);
}
</style>

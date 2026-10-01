<script setup>
import { computed, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { TOOLS_BASE, findTool, findCategory, formatDate } from './tools.js'

const props = defineProps({
  id: { type: String, required: true }
})

const tool = computed(() => findTool(props.id))
const category = computed(() => tool.value && findCategory(tool.value.category))
const topic = computed(() => category.value?.topics?.find((t) => t.id === tool.value.topic))

onMounted(() => {
  if (!tool.value) console.warn(`[ToolInfo] unbekanntes Tool "${props.id}" – Eintrag in tools.js fehlt`)
})
</script>

<template>
  <div v-if="tool" class="tool-info" :class="`is-${tool.category}`">
    <div class="tool-info__head">
      <span class="tool-info__icon" aria-hidden="true">{{ tool.icon }}</span>
      <div class="tool-info__text">
        <span class="tool-info__short">{{ tool.short }}</span>
        <span class="tool-info__meta">
          <a :href="withBase(`${TOOLS_BASE}/#${category.id}`)">{{ category.title }}</a>
          <template v-if="topic"> · {{ topic.title }}</template>
          · aktualisiert <time :datetime="tool.updated">{{ formatDate(tool.updated) }}</time>
        </span>
      </div>
    </div>

    <div class="tool-info__actions">
      <a v-if="tool.live" class="tool-info__btn is-brand" :href="tool.live" target="_blank" rel="noopener">
        App öffnen <span aria-hidden="true">↗</span>
      </a>
      <span v-else-if="tool.note" class="tool-info__note">{{ tool.note }}</span>
      <a v-if="tool.repo" class="tool-info__btn is-alt" :href="tool.repo" target="_blank" rel="noopener">
        Quellcode auf GitHub
      </a>
    </div>
  </div>
</template>

<style scoped>
.is-unterricht {
  --tool-accent-soft: var(--vp-c-yellow-soft);
}
.is-informatik {
  --tool-accent-soft: var(--vp-c-indigo-soft);
}
.is-organisation {
  --tool-accent-soft: var(--vp-c-green-soft);
}

.tool-info {
  margin: 20px 0 28px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.tool-info__head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.tool-info__icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--tool-accent-soft);
  font-size: 30px;
  line-height: 1;
}

.tool-info__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tool-info__short {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
}

.tool-info__meta {
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.5;
}

.tool-info__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

/* Knöpfe im Stil der VitePress-Hero-Buttons */
.vp-doc .tool-info__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height: 38px;
  text-decoration: none;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}
.vp-doc .tool-info__btn.is-brand {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.vp-doc .tool-info__btn.is-brand:hover {
  background: var(--vp-button-brand-hover-bg);
  color: var(--vp-button-brand-hover-text);
}
.vp-doc .tool-info__btn.is-alt {
  border-color: var(--vp-button-alt-border);
  background: var(--vp-button-alt-bg);
  color: var(--vp-button-alt-text);
}
.vp-doc .tool-info__btn.is-alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  background: var(--vp-button-alt-hover-bg);
  color: var(--vp-button-alt-hover-text);
}

.tool-info__note {
  padding: 8px 14px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 20px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>

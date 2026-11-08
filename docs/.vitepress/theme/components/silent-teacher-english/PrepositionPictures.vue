<script setup>
// Bildtafel für die Lektionsseiten: <PrepositionPictures :items="[['p-in', 'in the box'], …]" />
// Jedes Item: [bild, beschriftung, emoji?] – bild ist ein Schlüssel aus szenen.js
import { computed } from 'vue'
import { szeneSvg } from './szenen.js'
import './szenen.css'

const props = defineProps({
  items: { type: Array, required: true },
})

const bilder = computed(() =>
  props.items.map(([bild, text, fig]) => ({ text, svg: szeneSvg({ bild, fig: fig ?? '🐱' }) })),
)
</script>

<template>
  <div class="pp">
    <figure v-for="b in bilder" :key="b.text" class="pp-bild sz-rahmen">
      <div v-html="b.svg" />
      <figcaption>{{ b.text }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.pp {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 12px;
  margin: 16px 0;
}
.pp-bild {
  margin: 0;
  padding: 8px 8px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  text-align: center;
}
.pp-bild :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
.pp-bild figcaption {
  margin-top: 4px;
  font-weight: 600;
}
</style>

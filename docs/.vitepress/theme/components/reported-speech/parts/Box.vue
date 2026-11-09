<script setup>
// Kasten mit mehreren zentrierten Zeilen; die erste Zeile ist fett und farbig.
defineProps({
  cx: Number, y: Number, w: Number, h: Number,
  lines: { type: Array, default: () => [] },
  k: { type: String, default: 'n' },
})
</script>

<template>
  <g :class="['rs-box', 'k-' + k]">
    <rect :x="cx - w / 2" :y="y" :width="w" :height="h" rx="10" />
    <text
      v-for="(l, i) in lines"
      :key="i"
      :class="{ 'rs-b1': i === 0 }"
      :x="cx"
      :y="y + h / 2 + (i - (lines.length - 1) / 2) * 19"
      dy="0.35em"
      text-anchor="middle"
    >{{ l }}</text>
  </g>
</template>

<script setup>
// Pfeil mit Spitze als Polygon (keine Marker-IDs nötig). Optional gebogen über (qx, qy).
import { computed } from 'vue'

const p = defineProps({
  x1: Number, y1: Number, x2: Number, y2: Number,
  qx: { type: Number, default: null },
  qy: { type: Number, default: null },
  k: { type: String, default: 'n' },
  dash: Boolean,
  head: { type: Number, default: 9 },
})

const geo = computed(() => {
  const fx = p.qx ?? p.x1
  const fy = p.qy ?? p.y1
  const a = Math.atan2(p.y2 - fy, p.x2 - fx)
  const h = p.head
  const w = h * 0.55
  const bx = p.x2 - h * Math.cos(a)
  const by = p.y2 - h * Math.sin(a)
  const nx = -Math.sin(a) * w
  const ny = Math.cos(a) * w
  // Linie endet in der Spitze, damit sie nicht herausragt
  const ex = p.x2 - h * 0.7 * Math.cos(a)
  const ey = p.y2 - h * 0.7 * Math.sin(a)
  const d = p.qx == null ? `M${p.x1} ${p.y1} L${ex} ${ey}` : `M${p.x1} ${p.y1} Q${p.qx} ${p.qy} ${ex} ${ey}`
  return { d, pts: `${p.x2},${p.y2} ${bx + nx},${by + ny} ${bx - nx},${by - ny}` }
})
</script>

<template>
  <g :class="['rs-arrow', 'k-' + k]">
    <path :d="geo.d" :class="{ dash }" />
    <polygon :points="geo.pts" />
  </g>
</template>

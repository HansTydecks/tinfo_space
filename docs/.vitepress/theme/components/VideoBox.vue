<script setup>
// Video-Einbettung mit Platzhalter.
// <VideoBox title="…" />                 → schöner Platzhalter „Video coming soon“
// <VideoBox title="…" youtube="abc123" /> → YouTube (nocookie) wird erst nach Klick geladen
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Video' },
  youtube: { type: String, default: '' },
  note: { type: String, default: 'Video coming soon' },
  duration: String,
})
const laeuft = ref(false)
</script>

<template>
  <figure class="vb">
    <div class="vb-frame">
      <iframe
        v-if="youtube && laeuft"
        :src="`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`"
        :title="title"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen
      />
      <button v-else class="vb-cover" type="button" :disabled="!youtube" @click="laeuft = true" :aria-label="youtube ? `Play video: ${title}` : `${title} – ${note}`">
        <svg class="vb-deko" viewBox="0 0 320 180" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          <circle cx="40" cy="30" r="46" class="vb-b1" />
          <circle cx="292" cy="160" r="62" class="vb-b2" />
          <rect x="196" y="22" width="92" height="40" rx="14" class="vb-b3" />
          <path d="M214 62 l-6 12 l16 -12 z" class="vb-b3" />
          <rect x="30" y="118" width="80" height="34" rx="12" class="vb-b4" />
          <path d="M96 152 l6 10 l-16 -10 z" class="vb-b4" />
        </svg>
        <span class="vb-play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
        </span>
        <span class="vb-text">
          <strong>{{ title }}</strong>
          <span>{{ youtube ? (duration ? `▶ Play · ${duration}` : '▶ Play') : `🎬 ${note}` }}</span>
        </span>
      </button>
    </div>
    <figcaption v-if="youtube && !laeuft" class="vb-hint">Clicking loads the video from YouTube.</figcaption>
  </figure>
</template>

<style scoped>
.vb { margin: 20px 0; }
.vb-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft) 60%, var(--vp-c-default-soft));
}
.vb-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.vb-cover {
  position: absolute; inset: 0; width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
  border: 0; padding: 16px; background: none; color: var(--vp-c-text-1); cursor: pointer; font: inherit;
}
.vb-cover:disabled { cursor: default; }
.vb-deko { position: absolute; inset: 0; width: 100%; height: 100%; }
.vb-b1 { fill: #1c64d1; opacity: 0.12; }
.vb-b2 { fill: #c2255c; opacity: 0.12; }
.vb-b3 { fill: #2b8a3e; opacity: 0.16; }
.vb-b4 { fill: #d9480f; opacity: 0.16; }
.vb-play {
  position: relative;
  display: grid; place-items: center;
  width: 72px; height: 72px; border-radius: 50%;
  background: var(--vp-c-brand-1); color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
  transition: transform 0.15s ease;
}
.vb-cover:disabled .vb-play { background: var(--vp-c-text-3); }
.vb-cover:not(:disabled):hover .vb-play { transform: scale(1.08); }
.vb-play svg { width: 34px; height: 34px; margin-left: 4px; fill: currentColor; }
.vb-text { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; }
.vb-text strong { font-size: 18px; }
.vb-text span { font-size: 14px; color: var(--vp-c-text-2); }
.vb-hint { margin-top: 6px; font-size: 12px; color: var(--vp-c-text-3); text-align: center; }
</style>

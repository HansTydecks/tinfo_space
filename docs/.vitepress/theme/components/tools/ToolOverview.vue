<script setup>
import { withBase } from 'vitepress'
import { categories, tools, groupsOf, toolPage, formatDate } from './tools.js'

// Kategorien samt ihrer (Themen-)Gruppen – die Daten sind statisch, daher kein computed nötig
const sections = categories.map((category) => ({
  ...category,
  count: tools.filter((t) => t.category === category.id).length,
  groups: groupsOf(category)
}))
</script>

<template>
  <div class="tool-overview">
    <nav class="tool-jump" aria-label="Kategorien">
      <a v-for="s in sections" :key="s.id" class="tool-jump__chip" :href="`#${s.id}`">
        <span aria-hidden="true">{{ s.icon }}</span>
        {{ s.title }}
        <span class="tool-jump__count">{{ s.count }}</span>
      </a>
    </nav>

    <section v-for="s in sections" :key="s.id" class="tool-section" :class="`is-${s.id}`">
      <h2 :id="s.id" tabindex="-1">{{ s.icon }} {{ s.title }}</h2>
      <p class="tool-section__intro">{{ s.intro }}</p>

      <template v-for="g in s.groups" :key="g.id ?? s.id">
        <h3 v-if="g.title" :id="`${s.id}-${g.id}`" tabindex="-1">{{ g.title }}</h3>
        <div class="tool-grid">
          <a v-for="t in g.tools" :key="t.id" class="tool-tile" :href="withBase(toolPage(t))">
            <span class="tool-tile__icon" aria-hidden="true">{{ t.icon }}</span>
            <span class="tool-tile__name">{{ t.name }}</span>
            <span class="tool-tile__short">{{ t.short }}</span>
            <span class="tool-tile__date" :title="`Zuletzt aktualisiert am ${formatDate(t.updated)}`">
              Stand <time :datetime="t.updated">{{ formatDate(t.updated) }}</time>
            </span>
          </a>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
/* ---------- Farbe je Kategorie (Symbol-Hintergrund und Akzente) ---------- */
.is-unterricht {
  --tool-accent: var(--vp-c-yellow-1);
  --tool-accent-soft: var(--vp-c-yellow-soft);
}
.is-informatik {
  --tool-accent: var(--vp-c-indigo-1);
  --tool-accent-soft: var(--vp-c-indigo-soft);
}
.is-organisation {
  --tool-accent: var(--vp-c-green-1);
  --tool-accent-soft: var(--vp-c-green-soft);
}

/* ---------- Sprungmarken oben ---------- */
.tool-jump {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 8px;
}

.vp-doc .tool-jump__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.2s, background-color 0.2s;
}
.vp-doc .tool-jump__chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.tool-jump__count {
  min-width: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-size: 12px;
  text-align: center;
}

/* ---------- Abschnitte ---------- */
.tool-section__intro {
  color: var(--vp-c-text-2);
}

.vp-doc .tool-section h3 {
  margin-top: 28px;
  font-size: 16px;
  color: var(--vp-c-text-2);
}

/* ---------- Kachel-Raster ---------- */
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 12px;
  margin-top: 14px;
}

/* Auf dem Handy zwei Spalten statt einer */
@media (max-width: 480px) {
  .tool-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
}

.vp-doc .tool-tile {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-weight: 400;
  text-decoration: none;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.vp-doc .tool-tile:hover {
  border-color: var(--tool-accent);
  box-shadow: var(--vp-shadow-2);
  color: var(--vp-c-text-1);
  transform: translateY(-2px);
}
.vp-doc .tool-tile:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.tool-tile__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 8px;
  border-radius: 12px;
  background: var(--tool-accent-soft);
  font-size: 24px;
  line-height: 1;
}

.tool-tile__name {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  /* lange Wörter wie „Schlosssimulation“ auf schmalen Handys umbrechen */
  overflow-wrap: break-word;
  hyphens: auto;
}

.tool-tile__short {
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.4;
}

/* Datum steht immer unten, auch wenn Name oder Unterschrift zweizeilig sind */
.tool-tile__date {
  margin-top: auto;
  padding-top: 10px;
  color: var(--vp-c-text-3);
  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;
}
</style>

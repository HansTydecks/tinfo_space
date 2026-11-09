<script setup>
// Fragen: kein do/does/did, Wortstellung wie im Aussagesatz, bei Ja/Nein-Fragen if/whether.
import Chip from '../parts/Chip.vue'
import Arrow from '../parts/Arrow.vue'
</script>

<template>
  <svg viewBox="0 0 600 360" role="img" aria-label="Questions in reported speech. Where do you live? becomes: She asked me where I lived – do disappears. Are you hungry? becomes: He asked me if I was hungry – if or whether is new, and the word order changes to subject before verb.">
    <!-- wh-question -->
    <text class="rs-title" x="16" y="20">wh-question</text>
    <text class="rs-label" x="16" y="53">direct</text>
    <rect class="rs-band" x="210" y="26" width="276" height="44" rx="12" />
    <Chip t="“" :cx="226" :y="32" />
    <Chip t="Where" :cx="262" :y="32" />
    <Chip t="do" k="slot" :cx="322" :y="32" strike />
    <Chip t="you" k="pron" :cx="370" :y="32" />
    <Chip t="live" k="tense" :cx="421" :y="32" />
    <Chip t="?”" :cx="463" :y="32" />

    <Arrow :x1="322" :y1="68" :x2="322" :y2="124" k="grau" dash />
    <text class="rs-al k-grau" x="312" y="101" text-anchor="end">do / does / did disappear</text>
    <Arrow :x1="370" :y1="68" :x2="370" :y2="124" k="pron" />
    <Arrow :x1="421" :y1="68" :x2="421" :y2="124" k="tense" />

    <text class="rs-label" x="16" y="149">reported</text>
    <rect class="rs-band" x="110" y="122" width="376" height="44" rx="12" />
    <Chip t="She asked me" :x="124" :y="128" />
    <Chip t="where" :cx="262" :y="128" />
    <Chip t="" k="slot" :cx="322" :w="30" :y="128" />
    <Chip t="I" k="pron" :cx="370" :y="128" />
    <Chip t="lived" k="tense" :cx="421" :y="128" />
    <Chip t="." :cx="463" :y="128" />

    <!-- yes/no question -->
    <text class="rs-title" x="16" y="206">yes / no question</text>
    <text class="rs-label" x="16" y="239">direct</text>
    <rect class="rs-band" x="270" y="212" width="236" height="44" rx="12" />
    <Chip t="“" :cx="286" :y="218" />
    <Chip t="Are" k="tense" :cx="320" :y="218" />
    <Chip t="you" k="pron" :cx="375" :y="218" />
    <Chip t="hungry" :cx="440" :y="218" />
    <Chip t="?”" :cx="486" :y="218" />

    <Arrow :x1="320" :y1="254" :x2="372" :y2="310" k="tense" />
    <Arrow :x1="375" :y1="254" :x2="323" :y2="310" k="pron" />
    <text class="rs-al k-order" x="300" y="287" text-anchor="end">new: if / whether</text>
    <text class="rs-al k-order" x="404" y="279">word order:</text>
    <text class="rs-al k-order" x="404" y="295">subject + verb</text>

    <text class="rs-label" x="16" y="335">reported</text>
    <rect class="rs-band" x="130" y="308" width="376" height="44" rx="12" />
    <Chip t="He asked me" :x="144" :y="314" />
    <Chip t="if" k="order" :cx="268" :y="314" />
    <Chip t="I" k="pron" :cx="320" :y="314" />
    <Chip t="was" k="tense" :cx="375" :y="314" />
    <Chip t="hungry" :cx="440" :y="314" />
    <Chip t="." :cx="480" :y="314" />
  </svg>
</template>

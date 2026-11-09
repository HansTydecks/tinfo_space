<script setup>
// Entscheidungsbaum: Brauche ich backshift?
import Arrow from '../parts/Arrow.vue'
import Box from '../parts/Box.vue'
</script>

<template>
  <svg viewBox="0 0 660 340" role="img" aria-label="Decision tree. First ask: which reporting verb? If it is in the present (says, has said), there is no backshift: He says he is tired. If it is in the past (said, told, asked), ask: is it still true or a general fact? If not, use backshift: He said he was tired. If it is still true, backshift is optional: She said the earth is or was round.">
    <Box :cx="330" :y="12" :w="300" :h="46" :lines="['What is the reporting verb?']" />

    <Arrow :x1="250" :y1="60" :x2="150" :y2="132" />
    <text class="rs-al k-n" x="190" y="90" text-anchor="end">present:</text>
    <text class="rs-small" x="190" y="106" text-anchor="end">says · has said</text>

    <Arrow :x1="410" :y1="60" :x2="500" :y2="132" />
    <text class="rs-al k-n" x="468" y="90">past:</text>
    <text class="rs-small" x="468" y="106">said · told · asked</text>

    <Box :cx="135" :y="136" :w="230" :h="66" k="ok" :lines="['No backshift', 'He says he is tired.']" />
    <Box :cx="505" :y="136" :w="250" :h="56" :lines="['Is it still true now', 'or a general fact?']" />

    <Arrow :x1="455" :y1="194" :x2="375" :y2="250" />
    <text class="rs-al k-n" x="405" y="222" text-anchor="end">no</text>
    <Arrow :x1="555" :y1="194" :x2="565" :y2="250" />
    <text class="rs-al k-n" x="572" y="222">yes</text>

    <Box :cx="355" :y="254" :w="210" :h="66" k="tense" :lines="['Backshift!', 'He said he was tired.']" />
    <Box :cx="562" :y="254" :w="186" :h="78" k="ok" :lines="['Backshift optional', '“The earth is round.”', '→ is / was round']" />
  </svg>
</template>

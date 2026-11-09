<script setup>
// say vs. tell – tell braucht immer eine Person (ohne „to“).
import Chip from '../parts/Chip.vue'
import { reihe } from '../layout.js'

const say = reihe([{ t: 'said', k: 'rep' }, { t: '(to me)', k: 'm' }, { t: '(that)', k: 'm' }, { t: '+ what she said', k: 'n' }], 96, 8)
const tell = reihe([{ t: 'told', k: 'rep' }, { t: 'me', k: 'pron' }, { t: '(that)', k: 'm' }, { t: '+ what she said', k: 'n' }], 96, 8)
const falsch = ['She said me …', 'She told to me …', 'She told that …']
</script>

<template>
  <svg viewBox="0 0 600 262" role="img" aria-label="say and tell. She said (to me) that she was tired – the person is optional and needs to. She told me that she was tired – tell always needs a person, without to. Wrong: She said me, She told to me, She told that.">
    <text class="rs-big" x="20" y="44">say</text>
    <Chip v-for="c in say" :key="c.t" v-bind="c" :y="22" />
    <text class="rs-small" x="96" y="76">She said (to me) (that) she was tired. – the person is optional, with <tspan font-weight="700">to</tspan></text>

    <text class="rs-big" x="20" y="134">tell</text>
    <Chip v-for="c in tell" :key="c.t" v-bind="c" :y="112" />
    <text class="rs-small" x="96" y="166">She told me (that) she was tired. – tell <tspan font-weight="700">always</tspan> needs a person, <tspan font-weight="700">no to</tspan></text>

    <rect x="20" y="192" width="560" height="56" rx="10" class="rs-band" style="stroke: var(--rs-tense); stroke-dasharray: 4 3" />
    <text class="rs-al k-tense" x="36" y="225">✗ wrong:</text>
    <text v-for="(f, i) in falsch" :key="f" :x="122 + i * 150" y="225" font-size="14">{{ f }}</text>
  </svg>
</template>

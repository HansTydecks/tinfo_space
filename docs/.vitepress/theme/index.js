import DefaultTheme from 'vitepress/theme'
import './style.css'
import PyRunner from './components/PyRunner.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PyRunner', PyRunner)
  }
}

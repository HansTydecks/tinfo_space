import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PyRunner from './components/PyRunner.vue'
import SilentTeacherButton from './components/silent-teacher/SilentTeacherButton.vue'
import SortierAufgabe from './components/sortieren/SortierAufgabe.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PyRunner', PyRunner)
    app.component('SilentTeacherButton', SilentTeacherButton)
    app.component('SortierAufgabe', SortierAufgabe)
    // Das Spiel samt aller Aufgaben wird nur auf der Silent-Teacher-Seite nachgeladen
    app.component(
      'SilentTeacher',
      defineAsyncComponent(() => import('./components/silent-teacher/SilentTeacher.vue')),
    )
  }
}

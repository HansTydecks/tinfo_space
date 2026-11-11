import { defineAsyncComponent } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PyRunner from './components/PyRunner.vue'
import SilentTeacherButton from './components/silent-teacher/SilentTeacherButton.vue'
import EnglishSilentTeacherButton from './components/silent-teacher-english/EnglishSilentTeacherButton.vue'
import PrepositionPictures from './components/silent-teacher-english/PrepositionPictures.vue'
import ReportedSpeechGraphic from './components/reported-speech/ReportedSpeechGraphic.vue'
import VideoBox from './components/VideoBox.vue'
import ReporterButton from './components/reported-speech/drill/ReporterButton.vue'
import SortierAufgabe from './components/sortieren/SortierAufgabe.vue'
import ToolOverview from './components/tools/ToolOverview.vue'
import ToolInfo from './components/tools/ToolInfo.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PyRunner', PyRunner)
    app.component('SilentTeacherButton', SilentTeacherButton)
    app.component('EnglishSilentTeacherButton', EnglishSilentTeacherButton)
    app.component('PrepositionPictures', PrepositionPictures)
    app.component('ReportedSpeechGraphic', ReportedSpeechGraphic)
    app.component('VideoBox', VideoBox)
    app.component('ReporterButton', ReporterButton)
    app.component('SortierAufgabe', SortierAufgabe)
    app.component('ToolOverview', ToolOverview)
    app.component('ToolInfo', ToolInfo)
    // Das Spiel samt aller Aufgaben wird nur auf der Silent-Teacher-Seite nachgeladen
    // Modulo-Visualizer: Canvas-Animationen nur auf der Visualizer-Seite laden
    app.component(
      'ModuloVisualizer',
      defineAsyncComponent(() => import('./components/modulo/ModuloVisualizer.vue')),
    )
    app.component(
      'SilentTeacher',
      defineAsyncComponent(() => import('./components/silent-teacher/SilentTeacher.vue')),
    )
    app.component(
      'ReportedSpeechReporter',
      defineAsyncComponent(() => import('./components/reported-speech/drill/ReportedSpeechReporter.vue')),
    )
    app.component(
      'NoseDive',
      defineAsyncComponent(() => import('./components/nose-dive/NoseDive.vue')),
    )
    app.component(
      'EnglishSilentTeacher',
      defineAsyncComponent(() => import('./components/silent-teacher-english/EnglishSilentTeacher.vue')),
    )
  }
}

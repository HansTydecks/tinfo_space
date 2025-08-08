import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tinfo.Space",
  description: "Ressourcen mit Struktur",
  lastUpdated: true,
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '256x256', href: '/favicon-256x256.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '512x512', href: '/favicon-512x512.png' }]
  ],
  markdown: {
    lineNumbers: true
  },
  locales: {
    root: {
      label: 'Deutsch',
      lang: 'de'
    },
    en: {
      label: 'English',
      lang: 'en', // optional, will be added  as `lang` attribute on `html` tag
      link: '/en/' // default /fr/ -- shows on navbar translations menu, can be external
    }
  },
  themeConfig: {
    logo: '/favicon.ico',
    siteTitle: 'Tinfo.Space',
    search: {
      provider: 'local'
    },
    footer: {
      message: `
        <nav>
          <a href="/about">About Us</a> |
          <a href="/privacy">Privacy Policy</a> |
          <a href="/contact">Contact</a>
        </nav>
      `,
      copyright: 'Unless stated otherwise, all content is public domain or open for educational use.'
    },

    
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'English', link: '/students/english/index' },
      { text: 'Informatik', link: '/students/informatik/index' },
      { text: 'Deutsch a.Z.', link: '/students/daz/index' },
    ],

    // Define sidebars for different sections
    sidebar: {
      '/students/informatik/': [
        {
          text: 'Informatik',
          items: [
            {
              text: 'Klasse 7',
              link: '/students/informatik/inf_klasse_7/index',
              items: [
                {
                  text: 'Informationen und Daten',
                  items: [
                    { text: 'Digitale Medien', link: '/students/informatik/inf_klasse_7/Informationen_Daten/Digitale_Medien' },
                    { text: 'Informationen & Daten', link: '/students/informatik/inf_klasse_7/Informationen_Daten/Informationen_Daten' }
                  ]
                },
                {
                  text: 'Informatiksysteme',
                  items: [
                    { text: 'Hardware', link: '/students/informatik/inf_klasse_7/Informatiksysteme/Hardware' },
                    { text: 'Software', link: '/students/informatik/inf_klasse_7/Informatiksysteme/Software' }
                  ]
                },
                {
                  text: 'Algorithmen',
                  link: '/students/informatik/inf_klasse_7/Algorithmen/index'
                }
              ]
            },
            {
              text: 'Klasse 8',
              link: '/students/informatik/inf_klasse_8/index',
              items: [
                {
                  text: 'Algorithmen',
                  items: [
                    { text: 'Einführung', link: '/students/informatik/inf_klasse_8/Algorithmen/alg_Einfuehrung' },
                    { text: 'Algorithmen im Alltag', link: '/students/informatik/inf_klasse_8/Algorithmen/alg_im_Alltag' },
                    { text: 'Eigenschaften v. Algorithmen', link: '/students/informatik/inf_klasse_8/Algorithmen/alg_Eigenschaften' },
                    { text: 'Programmieren', link: '/students/informatik/inf_klasse_8/Algorithmen/Programmieren' }
                  ]
                },
                {
                  text: 'Vernetzte Systeme',
                  items: [
                    { text: 'Kooperation & Kollaboration', link: '/students/informatik/inf_klasse_8/Vernetzte_Systeme/kooperation_Kollaboration' },
                    { text: 'Datenschutz & Datensicherheit', link: '/students/informatik/inf_klasse_8/Vernetzte_Systeme/Datenschutz_Datensicherheit' },
                    { text: 'Gesellschaft', link: '/students/informatik/inf_klasse_8/Vernetzte_Systeme/Gesellschaft' }
                  ]
                }
              ]
            },
            {
              text: 'Klasse 9',
              link: '/students/informatik/inf_klasse_9/index',
              items: [
                {
                  text: 'Datenbanken',
                  items: [
                    { text: 'Aufbau v. Datenbanken', link: '/students/informatik/inf_klasse_9/Datenbanken/Aufbau_Datenbanken' },
                    { text: 'Datenbanken_Entwickeln', link: '/students/informatik/inf_klasse_9/Datenbanken/Datenbanken_Entwickeln' },
                    { text: 'Operationen_Datenbanken', link: '/students/informatik/inf_klasse_9/Datenbanken/Operationen_Datenbanken' },
                    { text: 'Massenspeichern und Gesellschaft', link: '/students/informatik/inf_klasse_9/Datenbanken/Gesellschaft' }
                  ]
                },
                {
                  text: 'Netzwerke',
                  items: [
                    { text: 'Grundlagen', link: '/students/informatik/inf_klasse_9/Netzwerke/Grundlagen' },
                    { text: 'Datenschutz & Datensicherheit', link: '/students/informatik/inf_klasse_9/Netzwerke/Datenschutz_Datensicherheit' },
                    { text: 'Verschlüsselung', link: '/students/informatik/inf_klasse_9/Netzwerke/Verschluesselung' },
                    { text: 'Gesellschaft', link: '/students/informatik/inf_klasse_9/Netzwerke/Gesellschaft' }
                  ]
                },
                {
                  text: 'Künstliche Intelligenz',
                  items: [
                    { text: 'Einführung', link: '/students/informatik/inf_klasse_9/KI/Einfuehrung_KI' },
                    { text: 'Bestärkendes Lernen', link: '/students/informatik/inf_klasse_9/KI/bestarkendes_Lernen' },
                    { text: 'Überwachtes Lernen', link: '/students/informatik/inf_klasse_9/KI/ueberwachtes_Lernen' },
                    { text: 'Unüberwachtes Lernen', link: '/students/informatik/inf_klasse_9/KI/unueberwachtes_Lernen' }
                  ]
                },
              ]
            },
            {
              text: 'Klasse 10',
              link: '/students/informatik/inf_klasse_10/index',
              items: [
                {
                  text: 'Algorithmen und Programmieren',
                  items: [
                    { text: 'Erster Block', link: '/students/informatik/inf_klasse_10/Programmieren/block1' },
                    { text: 'Zweiter Block', link: '/students/informatik/inf_klasse_10/Programmieren/block2' },
                    { text: 'Dritter Block', link: '/students/informatik/inf_klasse_10/Programmieren/block3' },
                    { text: 'Wiki', link: '/students/informatik/inf_klasse_10/Programmieren/pyturtle_wiki' },
                  ]
                },
                {
                  text: 'Sprachen und Automaten',
                  items: [
                    { text: 'Sprachen', link: '/students/informatik/inf_klasse_10/Sprachen_Automaten' },
                    { text: 'Syntax und Semantik', link: '/students/informatik/inf_klasse_10/Sprachen_Automaten' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      '/students/english/': [
        {
          text: 'English',
          items: [
            { text: 'Grammar', link: '/students/english/grammar' },
            { text: 'Vocabulary', link: '/students/english/vocabulary' }
          ]
        }
      ],
      '/students/daz/': [
        {
          text: 'Deutsch als Zweitsprache im Klassenzimmer',
          items: [
            {
              text: 'Grammatik',
              items: [
                { text: 'Präpositionen', link: '/students/daz/grammar/daz_prepositions' },
                { text: 'Fragewörter', link: '/students/daz/grammar/daz_w_questions' },
                { text: 'Modalverben', link: '/students/daz/grammar/daz_modals' }
              ]
            },
            { text: 'Vokabeln', link: '/students/daz/vocabulary/index' },
            { text: 'Nummernübung', link: '/students/daz/number_game/game_intro' }
          ]
        }
      ],
      // Default sidebar for pages not in specified paths
      '/': [
        {
          text: 'Hauptseiten',
          items: [
            { text: 'Englischunterricht', link: '/students/english/index' },
            { text: 'Informatikunterricht', link: '/students/informatik/index' },
            { text: 'Deutsch als Zweitsprache im Klassenzimmer', link: '/students/daz/index' }
          ]
        }
      ]
    },
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HansTydecks/vitepress_tinf' }
    ]
  }
})

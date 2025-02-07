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
    editLink: {
      pattern: 'https://github.com/HansTydecks/vitepress_tinf/docs/:path',
      text: 'Click here to make to this a better page'
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
            { text: 'Informatikunterricht', link: '/students/informatik/index' },
            { text: 'Topic 1', link: '/students/informatik/topic1' },
            { text: 'Topic 2', link: '/students/informatik/topic2' }
          ]
        }
      ],
      '/students/english/': [
        {
          text: 'English',
          items: [
            { text: 'Englischunterricht', link: '/students/english/index' },
            { text: 'Grammar', link: '/students/english/grammar' },
            { text: 'Vocabulary', link: '/students/english/vocabulary' }
          ]
        }
      ],
      '/students/daz/': [
        {
          text: 'Deutsch als Zweitsprache im Klassenzimmer',
          items: [
            { text: 'Deutsch als Zweitsprache', link: '/students/daz/index' },
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

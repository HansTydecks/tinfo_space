import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tinfo.space",
  description: "Ressourcen mit Struktur",
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '256x256', href: '/favicon-256x256.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '512x512', href: '/favicon-512x512.png' }]
  ],
  themeConfig: {
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
            { text: 'Grammatik', link: '/students/daz/grammar/index' },
            { text: 'Vocabulary', link: '/students/daz/vocabulary/index' },
            { text: 'Numbergame', link: '/students/daz/number_game/game_intro' }
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

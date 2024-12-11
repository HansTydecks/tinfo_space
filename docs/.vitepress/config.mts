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
      { text: 'English', link: '/english/index' },
      { text: 'Informatik', link: '/informatik/index' },
      { text: 'Deutsch a.Z.', link: '/daz/index' },
    ],

    // Define sidebars for different sections
    sidebar: {
      '/informatik/': [
        {
          text: 'Informatik',
          items: [
            { text: 'Informatikunterricht', link: '/informatik/index' },
            { text: 'Topic 1', link: '/informatik/topic1' },
            { text: 'Topic 2', link: '/informatik/topic2' }
          ]
        }
      ],
      '/english/': [
        {
          text: 'English',
          items: [
            { text: 'Englischunterricht', link: '/english/index' },
            { text: 'Grammar', link: '/english/grammar' },
            { text: 'Vocabulary', link: '/english/vocabulary' }
          ]
        }
      ],
      '/daz/': [
        {
          text: 'Deutsch als Zweitsprache im Klassenzimmer',
          items: [
            { text: 'Deutsch als Zweitsprache', link: '/daz/index' },
            { text: 'Grammatik', link: '/daz/grammar/index' },
            { text: 'Vocabulary', link: '/daz/vocabulary/index' },
            { text: 'Numbergame', link: '/daz/number_game/game_intro' }
          ]
        }
      ],
      // Default sidebar for pages not in specified paths
      '/': [
        {
          text: 'Hauptseiten',
          items: [
            { text: 'Englischunterricht', link: '/english/index' },
            { text: 'Informatikunterricht', link: '/informatik/index' },
            { text: 'Deutsch als Zweitsprache im Klassenzimmer', link: '/daz/index' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HansTydecks/vitepress_tinf' }
    ]
  }
})

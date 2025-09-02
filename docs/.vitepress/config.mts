import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Tinfo.Space",
  description: "Digitale Lernseite für Informatik, Englisch und DaZ",
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
      lang: 'de',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'English', link: '/students/english/index' },
          { text: 'Informatik', link: '/students/informatik/index' },
          { text: 'Deutsch a.Z.', link: '/students/daz/index' },
        ]
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'English', link: '/en/students/english/index' },
          { text: 'Computer Science', link: '/en/students/informatik/index' },
          { text: 'German as 2nd Language', link: '/en/students/daz/index' },
        ]
      }
    },
    uk: {
      label: 'Українська',
      lang: 'uk',
      link: '/uk/',
      themeConfig: {
        nav: [
          { text: 'Головна', link: '/uk/' },
          { text: 'Англійська', link: '/uk/students/english/index' },
          { text: 'Інформатика', link: '/uk/students/informatik/index' },
          { text: 'Німецька як 2-га мова', link: '/uk/students/daz/index' },
        ]
      }
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
                /*{
                  text: 'Datenbanken',
                  items: [
                    { text: 'Aufbau v. Datenbanken', link: '/students/informatik/inf_klasse_9/Datenbanken/Aufbau_Datenbanken' },
                    {
                      text: 'Datenmanagement',
                      items: [
                        { text: 'Daten im Alltag', link: '/students/informatik/inf_klasse_9/Datenbanken/datenmanagement/daten-im-alltag' },
                        { text: 'Big Data', link: '/students/informatik/inf_klasse_9/Datenbanken/datenmanagement/big-data' },
                        { text: 'Metadaten', link: '/students/informatik/inf_klasse_9/Datenbanken/datenmanagement/metadaten' }
                      ]
                    },
                    {
                      text: 'Datenmanagementphasen',
                      items: [
                        { text: 'Datenmanagementphasen', link: '/students/informatik/inf_klasse_9/Datenbanken/datenmanagementphasen/datenmanagementphasen' },
                        { text: 'Generieren und Erfassen', link: '/students/informatik/inf_klasse_9/Datenbanken/datenmanagementphasen/generieren-und-erfassen' },
                        {
                          text: 'Speichern und Verwalten',
                          items: [
                            { text: 'Speichern und Verwalten', link: '/students/informatik/inf_klasse_9/Datenbanken/speichern-und-verwalten/speichern-und-verwalten' },
                            { text: 'Datenbankmanagementsystem', link: '/students/informatik/inf_klasse_9/Datenbanken/speichern-und-verwalten/datenbankmanagementsystem' },
                            { text: 'Datenmodellierung', link: '/students/informatik/inf_klasse_9/Datenbanken/speichern-und-verwalten/datenmodellierung' },
                            { text: 'Entity Relationship Model', link: '/students/informatik/inf_klasse_9/Datenbanken/speichern-und-verwalten/entity-relationship-model' },
                            { text: 'Kardinalitäten', link: '/students/informatik/inf_klasse_9/Datenbanken/speichern-und-verwalten/kardinalitaeten' },
                            { text: 'Primär- und Fremdschlüssel', link: '/students/informatik/inf_klasse_9/Datenbanken/speichern-und-verwalten/primaer-und-fremdschluessel' },
                            { text: 'Übungen', link: '/students/informatik/inf_klasse_9/Datenbanken/speichern-und-verwalten/uebungen' }
                          ]
                        },
                        {
                          text: 'Nutzen und Teilen',
                          items: [
                            { text: 'Nutzen und Teilen', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/nutzen-und-teilen' },
                            { text: 'Datenabfragen', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/datenabfragen' },
                            { text: 'Datengraph', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/datengraph' },
                            { text: 'Datengruppierung', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/datengruppierung' },
                            { text: 'Datenkennzahlen', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/datenkennzahlen' },
                            { text: 'Datenoperationen', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/datenoperationen' },
                            { text: 'Datenvisualisierung', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/datenvisualisierung' },
                            { text: 'Datenvorhersage', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/datenvorhersage' },
                            { text: 'Übung Tracking und Werbung', link: '/students/informatik/inf_klasse_9/Datenbanken/nutzen-und-teilen/uebung-tracking-und-werbung' }
                          ]
                        },
                        { text: 'Archivieren oder Vernichten', link: '/students/informatik/inf_klasse_9/Datenbanken/datenmanagementphasen/archivieren-oder-vernichten' }
                      ]
                    },
                    { text: 'Meine Daten!', link: '/students/informatik/inf_klasse_9/Datenbanken/meine-daten' }
                  ]
                },*/
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
                    { text: 'Einführung PyTurtle', link: '/students/informatik/inf_klasse_10/Programmieren/block0' },
                    { text: 'Block 1: Variablen', link: '/students/informatik/inf_klasse_10/Programmieren/block1' },
                    { text: 'Block 2: Datentypen & einfache Verzweigungen', link: '/students/informatik/inf_klasse_10/Programmieren/block2' },
                    { text: 'Block 3: Verknüpfte Verzweigungen & while-Schleifen', link: '/students/informatik/inf_klasse_10/Programmieren/block3' },
                    { text: 'Block 4: For-Schleifen', link: '/students/informatik/inf_klasse_10/Programmieren/block4' },
                    { text: 'Block 5: Bibliotheken & Funktionen', link: '/students/informatik/inf_klasse_10/Programmieren/block5' },
                    { text: 'Block 6: Komplexe Übungen', link: '/students/informatik/inf_klasse_10/Programmieren/block6' },
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
            { text: 'Klasse 5', link: '/students/english/klasse_5/index' },
            { text: 'Klasse 6', link: '/students/english/klasse_6/index' },
            { text: 'Klasse 7', link: '/students/english/klasse_7/index' },
            { text: 'Klasse 8', link: '/students/english/klasse_8/index' },
            { text: 'Klasse 9', link: '/students/english/klasse_9/index' },
            { text: 'Klasse 10', link: '/students/english/klasse_10/index' },
            {
              text: 'Klasse 11',
              link: '/students/english/klasse_11/index',
              items: [
                {
                  text: 'The Commonwealth of Nations',
                  items: [
                    { text: 'Overview', link: '/students/english/klasse_11/The Commonwealth of Nations/index' },
                    { text: 'Historical Timeline', link: '/students/english/klasse_11/The Commonwealth of Nations/history_commonwealth_timeline' }
                  ]
                }
              ]
            },
            { text: 'Klasse 12', link: '/students/english/klasse_12/index' }
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
      '/en/students/informatik/': [
        {
          text: 'Computer Science',
          items: [
            { text: 'Computer Science Overview', link: '/en/students/informatik/index' },
            {
              text: 'Grade 7',
              link: '/en/students/informatik/inf_klasse_7/index',
              items: [
                {
                  text: 'Information and Data',
                  items: [
                    { text: 'Digital Media', link: '/en/students/informatik/inf_klasse_7/Informationen_Daten/Digitale_Medien' },
                    { text: 'Information & Data', link: '/en/students/informatik/inf_klasse_7/Informationen_Daten/Informationen_Daten' }
                  ]
                },
                {
                  text: 'Computer Systems',
                  items: [
                    { text: 'Hardware', link: '/en/students/informatik/inf_klasse_7/Informatiksysteme/Hardware' },
                    { text: 'Software', link: '/en/students/informatik/inf_klasse_7/Informatiksysteme/Software' }
                  ]
                },
                {
                  text: 'Algorithms',
                  link: '/en/students/informatik/inf_klasse_7/Algorithmen/index'
                }
              ]
            },
            {
              text: 'Grade 8',
              link: '/en/students/informatik/inf_klasse_8/index',
              items: [
                {
                  text: 'Algorithms',
                  items: [
                    { text: 'Introduction', link: '/en/students/informatik/inf_klasse_8/Algorithmen/alg_Einfuehrung' },
                    { text: 'Algorithms in Daily Life', link: '/en/students/informatik/inf_klasse_8/Algorithmen/alg_im_Alltag' },
                    { text: 'Algorithm Properties', link: '/en/students/informatik/inf_klasse_8/Algorithmen/alg_Eigenschaften' },
                    { text: 'Programming', link: '/en/students/informatik/inf_klasse_8/Algorithmen/Programmieren' }
                  ]
                },
                {
                  text: 'Networked Systems',
                  items: [
                    { text: 'Cooperation & Collaboration', link: '/en/students/informatik/inf_klasse_8/Vernetzte_Systeme/kooperation_Kollaboration' },
                    { text: 'Data Protection & Security', link: '/en/students/informatik/inf_klasse_8/Vernetzte_Systeme/Datenschutz_Datensicherheit' },
                    { text: 'Society', link: '/en/students/informatik/inf_klasse_8/Vernetzte_Systeme/Gesellschaft' }
                  ]
                }
              ]
            },
            {
              text: 'Grade 9',
              link: '/en/students/informatik/inf_klasse_9/index',
              items: [
                {
                  text: 'Databases',
                  items: [
                    { text: 'Database Structure', link: '/en/students/informatik/inf_klasse_9/Datenbanken/Aufbau_Datenbanken' }
                  ]
                },
                {
                  text: 'Networks',
                  items: [
                    { text: 'Fundamentals', link: '/en/students/informatik/inf_klasse_9/Netzwerke/Grundlagen' },
                    { text: 'Data Protection & Security', link: '/en/students/informatik/inf_klasse_9/Netzwerke/Datenschutz_Datensicherheit' },
                    { text: 'Encryption', link: '/en/students/informatik/inf_klasse_9/Netzwerke/Verschluesselung' },
                    { text: 'Society', link: '/en/students/informatik/inf_klasse_9/Netzwerke/Gesellschaft' }
                  ]
                },
                {
                  text: 'Artificial Intelligence',
                  items: [
                    { text: 'Introduction', link: '/en/students/informatik/inf_klasse_9/KI/Einfuehrung_KI' },
                    { text: 'Reinforcement Learning', link: '/en/students/informatik/inf_klasse_9/KI/bestarkendes_Lernen' },
                    { text: 'Supervised Learning', link: '/en/students/informatik/inf_klasse_9/KI/ueberwachtes_Lernen' },
                    { text: 'Unsupervised Learning', link: '/en/students/informatik/inf_klasse_9/KI/unueberwachtes_Lernen' }
                  ]
                },
              ]
            },
            {
              text: 'Grade 10',
              link: '/en/students/informatik/inf_klasse_10/index',
              items: [
                {
                  text: 'Algorithms and Programming',
                  items: [
                    { text: 'Block 1: Algorithm Properties & Variables', link: '/en/students/informatik/inf_klasse_10/Programmieren/block1' },
                    { text: 'Block 2: Data Types & Simple Conditionals', link: '/en/students/informatik/inf_klasse_10/Programmieren/block2' },
                    { text: 'Block 3: Linked Conditionals & while-Loops', link: '/en/students/informatik/inf_klasse_10/Programmieren/block3' },
                    { text: 'Block 4: For-Loops', link: '/en/students/informatik/inf_klasse_10/Programmieren/block4' },
                    { text: 'Block 5: Libraries & Functions', link: '/en/students/informatik/inf_klasse_10/Programmieren/block5' },
                    { text: 'Block 6: Complex Exercises', link: '/en/students/informatik/inf_klasse_10/Programmieren/block6' },
                    { text: 'Wiki', link: '/en/students/informatik/inf_klasse_10/Programmieren/pyturtle_wiki' },
                  ]
                },
                {
                  text: 'Languages and Automata',
                  items: [
                    { text: 'Languages', link: '/en/students/informatik/inf_klasse_10/Sprachen_Automaten' },
                    { text: 'Syntax and Semantics', link: '/en/students/informatik/inf_klasse_10/Sprachen_Automaten' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      '/en/students/english/': [
        {
          text: 'English',
          items: [
            { text: 'English Classes', link: '/en/students/english/index' },
            { text: 'Grade 5', link: '/students/english/klasse_5/index' },
            { text: 'Grade 6', link: '/students/english/klasse_6/index' },
            { text: 'Grade 7', link: '/students/english/klasse_7/index' },
            { text: 'Grade 8', link: '/students/english/klasse_8/index' },
            { text: 'Grade 9', link: '/students/english/klasse_9/index' },
            { text: 'Grade 10', link: '/students/english/klasse_10/index' },
            {
              text: 'Grade 11',
              link: '/students/english/klasse_11/index',
              items: [
                {
                  text: 'The Commonwealth of Nations',
                  items: [
                    { text: 'Overview', link: '/students/english/klasse_11/The Commonwealth of Nations/index' },
                    { text: 'Historical Timeline', link: '/students/english/klasse_11/The Commonwealth of Nations/history_commonwealth_timeline' }
                  ]
                }
              ]
            },
            { text: 'Grade 12', link: '/students/english/klasse_12/index' }
          ]
        }
      ],
      '/en/students/daz/': [
        {
          text: 'German as a Second Language',
          items: [
            { text: 'German as Second Language', link: '/en/students/daz/index' },
            {
              text: 'Grammar',
              items: [
                { text: 'Prepositions', link: '/en/students/daz/grammar/daz_prepositions' },
                { text: 'Question Words', link: '/en/students/daz/grammar/daz_w_questions' },
                { text: 'Modal Verbs', link: '/en/students/daz/grammar/daz_modals' }
              ]
            },
            { text: 'Vocabulary', link: '/en/students/daz/vocabulary/index' },
            { text: 'Number Exercise', link: '/en/students/daz/number_game/game_intro' }
          ]
        }
      ],
      '/uk/students/informatik/': [
        {
          text: 'Інформатика',
          items: [
            { text: 'Огляд інформатики', link: '/uk/students/informatik/index' },
            {
              text: '7 клас',
              link: '/uk/students/informatik/inf_klasse_7/index',
              items: [
                {
                  text: 'Інформація та дані',
                  items: [
                    { text: 'Цифрові медіа', link: '/uk/students/informatik/inf_klasse_7/Informationen_Daten/Digitale_Medien' },
                    { text: 'Інформація та дані', link: '/uk/students/informatik/inf_klasse_7/Informationen_Daten/Informationen_Daten' }
                  ]
                },
                {
                  text: 'Комп\'ютерні системи',
                  items: [
                    { text: 'Апаратне забезпечення', link: '/uk/students/informatik/inf_klasse_7/Informatiksysteme/Hardware' },
                    { text: 'Програмне забезпечення', link: '/uk/students/informatik/inf_klasse_7/Informatiksysteme/Software' }
                  ]
                },
                {
                  text: 'Алгоритми',
                  link: '/uk/students/informatik/inf_klasse_7/Algorithmen/index'
                }
              ]
            },
            {
              text: '8 клас',
              link: '/uk/students/informatik/inf_klasse_8/index',
              items: [
                {
                  text: 'Алгоритми',
                  items: [
                    { text: 'Вступ', link: '/uk/students/informatik/inf_klasse_8/Algorithmen/alg_Einfuehrung' },
                    { text: 'Алгоритми в повсякденному житті', link: '/uk/students/informatik/inf_klasse_8/Algorithmen/alg_im_Alltag' },
                    { text: 'Властивості алгоритмів', link: '/uk/students/informatik/inf_klasse_8/Algorithmen/alg_Eigenschaften' },
                    { text: 'Програмування', link: '/uk/students/informatik/inf_klasse_8/Algorithmen/Programmieren' }
                  ]
                },
                {
                  text: 'Мережні системи',
                  items: [
                    { text: 'Співпраця та колаборація', link: '/uk/students/informatik/inf_klasse_8/Vernetzte_Systeme/kooperation_Kollaboration' },
                    { text: 'Захист даних та безпека', link: '/uk/students/informatik/inf_klasse_8/Vernetzte_Systeme/Datenschutz_Datensicherheit' },
                    { text: 'Суспільство', link: '/uk/students/informatik/inf_klasse_8/Vernetzte_Systeme/Gesellschaft' }
                  ]
                }
              ]
            },
            {
              text: '9 клас',
              link: '/uk/students/informatik/inf_klasse_9/index',
              items: [
                {
                  text: 'Бази даних',
                  items: [
                    { text: 'Структура баз даних', link: '/uk/students/informatik/inf_klasse_9/Datenbanken/Aufbau_Datenbanken' }
                  ]
                },
                {
                  text: 'Мережі',
                  items: [
                    { text: 'Основи', link: '/uk/students/informatik/inf_klasse_9/Netzwerke/Grundlagen' },
                    { text: 'Захист даних та безпека', link: '/uk/students/informatik/inf_klasse_9/Netzwerke/Datenschutz_Datensicherheit' },
                    { text: 'Шифрування', link: '/uk/students/informatik/inf_klasse_9/Netzwerke/Verschluesselung' },
                    { text: 'Суспільство', link: '/uk/students/informatik/inf_klasse_9/Netzwerke/Gesellschaft' }
                  ]
                },
                {
                  text: 'Штучний інтелект',
                  items: [
                    { text: 'Вступ', link: '/uk/students/informatik/inf_klasse_9/KI/Einfuehrung_KI' },
                    { text: 'Навчання з підкріпленням', link: '/uk/students/informatik/inf_klasse_9/KI/bestarkendes_Lernen' },
                    { text: 'Навчання з учителем', link: '/uk/students/informatik/inf_klasse_9/KI/ueberwachtes_Lernen' },
                    { text: 'Навчання без учителя', link: '/uk/students/informatik/inf_klasse_9/KI/unueberwachtes_Lernen' }
                  ]
                },
              ]
            },
            {
              text: '10 клас',
              link: '/uk/students/informatik/inf_klasse_10/index',
              items: [
                {
                  text: 'Алгоритми та програмування',
                  items: [
                    { text: 'Блок 1: Властивості алгоритмів та змінні', link: '/uk/students/informatik/inf_klasse_10/Programmieren/block1' },
                    { text: 'Блок 2: Типи даних та прості умови', link: '/uk/students/informatik/inf_klasse_10/Programmieren/block2' },
                    { text: 'Блок 3: Складні умови та цикли while', link: '/uk/students/informatik/inf_klasse_10/Programmieren/block3' },
                    { text: 'Блок 4: Цикли for', link: '/uk/students/informatik/inf_klasse_10/Programmieren/block4' },
                    { text: 'Блок 5: Бібліотеки та функції', link: '/uk/students/informatik/inf_klasse_10/Programmieren/block5' },
                    { text: 'Блок 6: Складні завдання', link: '/uk/students/informatik/inf_klasse_10/Programmieren/block6' },
                    { text: 'Довідник', link: '/uk/students/informatik/inf_klasse_10/Programmieren/pyturtle_wiki' },
                  ]
                },
                {
                  text: 'Мови та автомати',
                  items: [
                    { text: 'Мови', link: '/uk/students/informatik/inf_klasse_10/Sprachen_Automaten' },
                    { text: 'Синтаксис та семантика', link: '/uk/students/informatik/inf_klasse_10/Sprachen_Automaten' }
                  ]
                }
              ]
            }
          ]
        }
      ],
      '/uk/students/english/': [
        {
          text: 'Англійська мова',
          items: [
            { text: 'Уроки англійської', link: '/uk/students/english/index' },
            { text: '5 клас', link: '/students/english/klasse_5/index' },
            { text: '6 клас', link: '/students/english/klasse_6/index' },
            { text: '7 клас', link: '/students/english/klasse_7/index' },
            { text: '8 клас', link: '/students/english/klasse_8/index' },
            { text: '9 клас', link: '/students/english/klasse_9/index' },
            { text: '10 клас', link: '/students/english/klasse_10/index' },
            {
              text: '11 клас',
              link: '/students/english/klasse_11/index',
              items: [
                {
                  text: 'Співдружність Націй',
                  items: [
                    { text: 'Огляд', link: '/students/english/klasse_11/The Commonwealth of Nations/index' },
                    { text: 'Історична хронологія', link: '/students/english/klasse_11/The Commonwealth of Nations/history_commonwealth_timeline' }
                  ]
                }
              ]
            },
            { text: '12 клас', link: '/students/english/klasse_12/index' }
          ]
        }
      ],
      '/uk/students/daz/': [
        {
          text: 'Німецька як друга мова',
          items: [
            { text: 'Німецька як друга мова', link: '/uk/students/daz/index' },
            {
              text: 'Граматика',
              items: [
                { text: 'Прийменники', link: '/uk/students/daz/grammar/daz_prepositions' },
                { text: 'Питальні слова', link: '/uk/students/daz/grammar/daz_w_questions' },
                { text: 'Модальні дієслова', link: '/uk/students/daz/grammar/daz_modals' }
              ]
            },
            { text: 'Словниковий запас', link: '/uk/students/daz/vocabulary/index' },
            { text: 'Вправи з числами', link: '/uk/students/daz/number_game/game_intro' }
          ]
        }
      ],
      '/uk/teachers/': [
        {
          text: 'Для вчителів',
          items: [
            { text: 'Ресурси для вчителів', link: '/uk/teachers/index' },
            { text: 'Викладання англійської', link: '/uk/teachers/t_english/index' }
          ]
        }
      ],
      
      // Default sidebar for German pages
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
  }
})

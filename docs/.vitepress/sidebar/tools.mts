import type { DefaultTheme } from 'vitepress'
import { TOOLS_BASE, categories, groupsOf, toolPage } from '../theme/components/tools/tools.js'

// Sidebar-Gruppe „Digitale Tools“ für den Lehrkräfte-Bereich.
// Wird aus derselben Liste erzeugt wie die Kachel-Übersicht, damit beide nie auseinanderlaufen.
// Je Kategorie eine einklappbare Gruppe; VitePress klappt die Gruppe der aktuellen Seite automatisch auf.
export const toolsSidebar: DefaultTheme.SidebarItem = {
  text: 'Digitale Tools',
  items: [
    { text: 'Übersicht', link: `${TOOLS_BASE}/` },
    ...categories.map((category) => ({
      text: category.title,
      collapsed: true,
      items: groupsOf(category)
        .flatMap((group) => group.tools)
        .map((tool) => ({ text: tool.name, link: toolPage(tool) }))
    }))
  ]
}

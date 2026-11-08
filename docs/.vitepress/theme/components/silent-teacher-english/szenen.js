// Bilder für Präpositionen of place / of movement – als kleines SVG.
//
// Eine Szene ist { bild, fig }: `bild` wählt Gegenstand + Lage (siehe BILDER), `fig` ist das Emoji,
// das sich dort befindet bzw. bewegt. szeneSvg() baut daraus das SVG-Markup. Die Farben kommen aus
// CSS-Klassen (sz-…) in EnglishSilentTeacher.vue, damit Hell/Dunkel stimmt.

const BODEN = 150

// ---------------------------------------------------------------------------
// Gegenstände
// ---------------------------------------------------------------------------

/** geschlossene Kiste, linke untere Ecke bei x, Kantenlänge s */
function kiste(x, s) {
  const d = s / 4
  const o = BODEN - s
  return {
    back: '',
    front:
      `<rect class="sz-kiste" x="${x}" y="${o}" width="${s}" height="${s}"/>` +
      `<polygon class="sz-kiste-oben" points="${x},${o} ${x + d},${o - d} ${x + s + d},${o - d} ${x + s},${o}"/>` +
      `<polygon class="sz-kiste-seite" points="${x + s},${o} ${x + s + d},${o - d} ${x + s + d},${BODEN - d} ${x + s},${BODEN}"/>`,
  }
}

/** offene Kiste: Innenraum hinten, Wände vorne – dazwischen kann etwas „in" der Kiste sitzen */
function offeneKiste(x, s) {
  const d = s / 4
  const o = BODEN - s
  return {
    back:
      `<polygon class="sz-kiste-seite" points="${x},${o} ${x + d},${o - d} ${x + s + d},${o - d} ${x + s},${o}"/>` +
      `<polygon class="sz-kiste-innen" points="${x + 3},${o - 1} ${x + d + 2},${o - d + 2} ${x + s + d - 3},${o - d + 2} ${x + s - 2},${o - 1}"/>`,
    front:
      `<rect class="sz-kiste" x="${x}" y="${o}" width="${s}" height="${s}"/>` +
      `<polygon class="sz-kiste-seite" points="${x + s},${o} ${x + s + d},${o - d} ${x + s + d},${BODEN - d} ${x + s},${BODEN}"/>`,
  }
}

const KISTE = kiste(120, 60)
const OFFENE_KISTE = offeneKiste(120, 60)

const TISCH = {
  back: '',
  front:
    '<rect class="sz-holz" x="80" y="94" width="140" height="9" rx="2"/>' +
    '<rect class="sz-holz" x="90" y="103" width="8" height="47"/>' +
    '<rect class="sz-holz" x="202" y="103" width="8" height="47"/>',
}

const ZWEI_KISTEN = {
  back: '',
  front: kiste(48, 48).front + kiste(196, 48).front,
}

const HUEGEL = {
  back: '<polygon class="sz-huegel" points="25,150 150,45 275,150"/>',
  front: '',
}

const MAUER = {
  back: '',
  front:
    '<rect class="sz-mauer" x="136" y="72" width="30" height="78"/>' +
    '<path class="sz-fuge" d="M136 91 H166 M136 111 H166 M136 131 H166 M151 72 V91 M144 91 V111 M158 111 V131 M151 131 V150"/>',
}

const BRUECKE = {
  back: '<rect class="sz-wasser" x="10" y="128" width="280" height="22"/>',
  front: '<path class="sz-stein" d="M70 128 V80 H230 V128 H222 Q150 50 78 128 Z"/>',
}

const TUNNEL = {
  back:
    '<polygon class="sz-huegel" points="50,150 150,58 250,150"/>' +
    '<rect class="sz-tunnel" x="62" y="116" width="176" height="34"/>',
  front: '',
}

const BAUM = {
  back: '',
  front: '<text class="sz-emoji" x="150" y="96" font-size="78">🌳</text>',
}

const FLUSS = {
  back:
    '<rect class="sz-gras" x="0" y="0" width="300" height="62"/>' +
    '<rect class="sz-wasser" x="0" y="62" width="300" height="50"/>' +
    '<rect class="sz-gras" x="0" y="112" width="300" height="58"/>' +
    '<path class="sz-welle" d="M30 80 q10 -6 20 0 t20 0 M190 96 q10 -6 20 0 t20 0 M120 104 q8 -5 16 0 t16 0"/>',
  front: '',
}

function haus(x) {
  return {
    back: '',
    front:
      `<rect class="sz-haus" x="${x}" y="90" width="80" height="60"/>` +
      `<polygon class="sz-dach" points="${x - 10},90 ${x + 40},52 ${x + 90},90"/>` +
      `<rect class="sz-tuer" x="${x + 31}" y="118" width="18" height="32"/>` +
      `<rect class="sz-fenster" x="${x + 8}" y="100" width="16" height="14"/>` +
      `<rect class="sz-fenster" x="${x + 56}" y="100" width="16" height="14"/>`,
  }
}

// ---------------------------------------------------------------------------
// Bilder: Gegenstand + wo die Figur steht + (bei Bewegung) der Pfeil
// layer: 'back' = hinter dem Gegenstand, 'mid' = zwischen Innenraum und Vorderwand, 'front' = davor
// ---------------------------------------------------------------------------

export const BILDER = {
  // of place
  'p-in': { obj: OFFENE_KISTE, fig: [158, 80, 34, 'mid'] },
  'p-on': { obj: KISTE, fig: [158, 60, 34, 'front'] },
  'p-on-table': { obj: TISCH, fig: [150, 76, 34, 'front'] },
  'p-under': { obj: TISCH, fig: [150, 131, 34, 'front'] },
  'p-above': { obj: KISTE, fig: [160, 22, 32, 'front'], schatten: [160, 82] },
  'p-next-to': { obj: KISTE, fig: [240, 132, 34, 'front'] },
  'p-behind': { obj: KISTE, fig: [176, 70, 34, 'back'] },
  'p-in-front-of': { obj: KISTE, fig: [150, 143, 42, 'front'] },
  'p-between': { obj: ZWEI_KISTEN, fig: [150, 132, 34, 'front'] },

  // of movement
  'm-into': { obj: OFFENE_KISTE, fig: [40, 132, 30, 'front'], pfeil: 'M58 112 Q105 10 156 70', bewegt: true },
  'm-out-of': { obj: OFFENE_KISTE, fig: [158, 80, 30, 'mid'], pfeil: 'M176 64 Q235 10 262 128', bewegt: true },
  'm-onto': { obj: KISTE, fig: [40, 132, 30, 'front'], pfeil: 'M58 112 Q100 10 152 50', bewegt: true },
  'm-off': { obj: KISTE, fig: [158, 60, 30, 'front'], pfeil: 'M178 50 Q240 30 262 130', bewegt: true },
  'm-up': { obj: HUEGEL, fig: [48, 116, 28, 'front'], pfeil: 'M68 100 L134 44', bewegt: true },
  'm-down': { obj: HUEGEL, fig: [150, 28, 28, 'front'], pfeil: 'M168 44 L240 108', bewegt: true },
  'm-over': { obj: MAUER, fig: [42, 132, 30, 'front'], pfeil: 'M62 120 Q150 -10 245 135', bewegt: true },
  'm-under': { obj: BRUECKE, fig: [36, 116, 26, 'front'], pfeil: 'M54 117 H272', pfeilHinten: true, bewegt: true },
  'm-through': { obj: TUNNEL, fig: [30, 133, 28, 'front'], pfeil: 'M48 134 H275', bewegt: true },
  'm-around': { obj: BAUM, fig: [98, 146, 26, 'front'], pfeil: 'M118 144 A86 36 0 1 1 182 144', bewegt: true },
  'm-across': { obj: FLUSS, fig: [150, 32, 30, 'front'], pfeil: 'M150 52 V132', bewegt: true },
  'm-along': { obj: FLUSS, fig: [28, 87, 28, 'front'], pfeil: 'M48 87 H282', bewegt: true },
  'm-past': { obj: haus(110), fig: [24, 136, 28, 'front'], pfeil: 'M44 140 H288', bewegt: true },
  'm-to': { obj: haus(180), fig: [32, 134, 30, 'front'], pfeil: 'M52 136 H204', bewegt: true },
  'm-towards': { obj: haus(180), fig: [32, 134, 30, 'front'], pfeil: 'M52 136 H118', bewegt: true },
}

function figurSvg([x, y, size], bewegt, fig) {
  // Bewegte Figuren schauen nach rechts (die meisten Emojis schauen nach links)
  const t = bewegt ? ` transform="translate(${x} ${y}) scale(-1 1)"` : ` transform="translate(${x} ${y})"`
  return `<g${t}><text class="sz-emoji" x="0" y="0" font-size="${size}">${fig}</text></g>`
}

/** komplettes SVG-Markup für eine Szene */
export function szeneSvg(scene) {
  const b = BILDER[scene?.bild]
  if (!b) return ''
  // gleiche id für gleiche Bilder: die Pfeilspitzen sind identisch, und SSR + Browser stimmen überein
  const id = `sz-pfeil-${scene.bild}`
  const layer = b.fig[3]
  const figur = figurSvg(b.fig, b.bewegt, scene.fig)
  const pfeil = b.pfeil
    ? `<path class="sz-pfeil" d="${b.pfeil}" marker-end="url(#${id})"/>`
    : ''
  const schatten = b.schatten
    ? `<ellipse class="sz-schatten" cx="${b.schatten[0]}" cy="${b.schatten[1]}" rx="14" ry="4"/>`
    : ''
  return (
    `<svg class="sz" viewBox="0 0 300 170" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><marker id="${id}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">` +
    `<path class="sz-spitze" d="M0 0 L10 5 L0 10 z"/></marker></defs>` +
    `<line class="sz-boden" x1="0" y1="${BODEN}" x2="300" y2="${BODEN}"/>` +
    b.obj.back +
    (b.pfeilHinten ? pfeil : '') +
    (layer === 'back' || layer === 'mid' ? figur : '') +
    b.obj.front +
    schatten +
    (layer === 'front' ? figur : '') +
    (b.pfeilHinten ? '' : pfeil) +
    `</svg>`
  )
}

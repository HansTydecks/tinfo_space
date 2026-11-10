// Canvas-Ansicht: rechnet Bildschirm-Pixel in Spiel-Einheiten um.
//
// Die Spielfläche ist immer W = 360 Einheiten breit (Hochformat zuerst). Auf breiten Bildschirmen liegt sie
// als Spalte in der Mitte; der Himmel wird links und rechts weitergezeichnet (left … right).

import { clamp } from './util.js'

export function createView(canvas, { worldW = 360, aspect = 0.62, maxDpr = 2 } = {}) {
  const ctx = canvas.getContext('2d', { alpha: false })
  const v = {
    canvas,
    ctx,
    W: worldW,
    H: 640,
    cssW: 0,
    cssH: 0,
    dpr: 1,
    scale: 1,
    ox: 0, // Versatz der Spalte in CSS-Pixeln
    left: 0,
    right: worldW,
    shake: 0,
    sx: 0,
    sy: 0,
  }

  v.resize = () => {
    const r = canvas.getBoundingClientRect()
    v.cssW = Math.max(1, r.width)
    v.cssH = Math.max(1, r.height)
    v.dpr = clamp(window.devicePixelRatio || 1, 1, maxDpr)
    canvas.width = Math.round(v.cssW * v.dpr)
    canvas.height = Math.round(v.cssH * v.dpr)
    // Spaltenbreite: Hochformat → ganze Breite; Querformat → schmale Spalte, aber mindestens 360 px
    const colW = Math.min(v.cssW, Math.max(v.cssH * aspect, Math.min(v.cssW, 360)))
    v.scale = colW / worldW
    v.H = v.cssH / v.scale
    v.ox = (v.cssW - colW) / 2
    v.left = -v.ox / v.scale
    v.right = worldW + v.ox / v.scale
  }

  /** Wackeln (z. B. bei Fehlern). */
  v.addShake = (amount) => {
    v.shake = Math.max(v.shake, amount)
  }
  v.updateShake = (dt) => {
    v.shake = Math.max(0, v.shake - dt * 30)
    const a = v.shake
    v.sx = (Math.random() * 2 - 1) * a
    v.sy = (Math.random() * 2 - 1) * a
  }

  /** Transformation auf Spiel-Einheiten setzen. */
  v.begin = (withShake = true) => {
    const k = v.dpr * v.scale
    const sx = withShake ? v.sx : 0
    const sy = withShake ? v.sy : 0
    ctx.setTransform(k, 0, 0, k, (v.ox + sx * v.scale) * v.dpr, sy * v.scale * v.dpr)
  }

  /** Bildschirm-Koordinaten (clientX/Y) → Spiel-Einheiten */
  v.toWorld = (clientX, clientY) => {
    const r = canvas.getBoundingClientRect()
    return { x: (clientX - r.left - v.ox) / v.scale, y: (clientY - r.top) / v.scale }
  }

  v.resize()
  return v
}

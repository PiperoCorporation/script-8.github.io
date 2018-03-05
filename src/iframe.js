import { interval } from 'd3-timer'
import * as d3 from 'd3'

import range from 'lodash/range'
import flatten from 'lodash/flatten'
import random from 'lodash/random'
import clamp from 'lodash/clamp'

import once from 'lodash/once'
import canvasAPI from './utils/canvasAPI/index.js'
import blank from './utils/blank.js'

window.script8 = {}

// Initialize canvas.
const canvas = document.querySelector('canvas')
const size = 128
const ctx = canvas.getContext('2d')

// Setup canvas API functions.
const {
  print,
  rectStroke,
  rectFill,
  circStroke,
  circFill,
  clear,
  lineH,
  lineV
} = canvasAPI({
  ctx,
  width: size,
  height: size
})

// Export them to global scope for eval's use later.
window.print = print
window.rectStroke = rectStroke
window.rectFill = rectFill
window.circStroke = circStroke
window.circFill = circFill
window.lineH = lineH
window.lineV = lineV
window.clear = clear
window.__ctx = ctx
window.d3 = d3

window.range = range
window.flatten = flatten
window.random = random
window.clamp = clamp

// Define arrow key helpers.
let keys = new Set()

const updateKeys = () => {
  window.arrowUp = keys.has('ArrowUp')
  window.arrowRight = keys.has('ArrowRight')
  window.arrowDown = keys.has('ArrowDown')
  window.arrowLeft = keys.has('ArrowLeft')
}

// Keep track of what keys we're pressing.
document.addEventListener('keydown', e => {
  const keyName = e.key
  keys.add(keyName)
})

document.addEventListener('keyup', e => {
  const keyName = e.key
  keys.delete(keyName)
})

const noop = () => {}

// Force eval to run in global mode.
// eslint-disable-next-line no-eval
const geval = eval

let timer

window.script8.callCode = (game, run, endCallback = noop) => {
  window.script8.end = once(endCallback)
  if (!game || !game.length) {
    game = blank
  }
  try {
    geval(game + ';')
    if (timer) timer.stop()
    timer = interval(() => {
      try {
        updateKeys()
        geval('update && update(); draw && draw();')
      } catch (e) {
        console.warn(e.message)
      }
      if (!run) timer.stop()
    }, 1000 / 30)
  } catch (e) {
    console.error(e.message)
  }
}
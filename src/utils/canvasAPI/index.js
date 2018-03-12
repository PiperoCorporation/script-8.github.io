import colors from '../colors.js'
import circle from './circle.js'
import print from './print.js'

const canvasAPI = ({ ctx, width: canvasWidth, height: canvasHeight }) => ({
  lineH (x, y, l, c, dotted) {
    if (dotted) {
      ctx.setLineDash([1, 1])
    }
    ctx.strokeStyle = colors.one(c)
    ctx.beginPath()
    ctx.moveTo(Math.floor(x), Math.floor(y) + 0.5)
    ctx.lineTo(Math.floor(x + l), Math.floor(y) + 0.5)
    ctx.stroke()
    ctx.setLineDash([])
  },

  lineV (x, y, l, c, dotted) {
    if (dotted) {
      ctx.setLineDash([1, 1])
    }
    ctx.strokeStyle = colors.one(c)
    ctx.beginPath()
    ctx.moveTo(Math.floor(x) + 0.5, Math.floor(y))
    ctx.lineTo(Math.floor(x) + 0.5, Math.floor(y + l))
    ctx.stroke()
    ctx.setLineDash([])
  },

  print (x, y, letters, c) {
    print({ x, y, letters, c, ctx })
  },

  rectStroke (x, y, w, h, c) {
    ctx.strokeStyle = colors.one(c)
    ctx.strokeRect(
      Math.floor(x) + 0.5,
      Math.floor(y) + 0.5,
      Math.floor(w) - 1,
      Math.floor(h) - 1
    )
  },

  rectFill (x, y, w, h, c) {
    ctx.fillStyle = colors.one(c)
    ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h))
  },

  polyStroke (points, c, w) {
    if (!points.length) {
      return
    }
    ctx.strokeStyle = colors.one(c)
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.moveTo(Math.floor(points[0][0]) + 0.5, Math.floor(points[0][1]))
    for (let i = 0; i < points.length; i++) {
      ctx.lineTo(Math.floor(points[i][0]) + 0.5, Math.floor(points[i][1]))
    }
    ctx.closePath()
    ctx.stroke()
  },

  polyFill (points, c) {
    if (!points.length) {
      return
    }
    ctx.fillStyle = colors.one(c)
    ctx.beginPath()
    ctx.moveTo(Math.floor(points[0][0]) + 0.5, Math.floor(points[0][1]))
    for (let i = 0; i < points.length; i++) {
      ctx.lineTo(Math.floor(points[i][0]) + 0.5, Math.floor(points[i][1]))
    }
    ctx.closePath()
    ctx.fill()
  },

  circStroke (x, y, r, c) {
    circle({
      cx: Math.floor(x),
      cy: Math.floor(y),
      radius: Math.floor(r),
      ctx,
      color: colors.one(c),
      onlyStroke: true
    })
  },

  circFill (x, y, r, c) {
    circle({
      cx: Math.floor(x),
      cy: Math.floor(y),
      radius: Math.floor(r),
      ctx,
      color: colors.one(c)
    })
  },

  clear () {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }
})

export default canvasAPI

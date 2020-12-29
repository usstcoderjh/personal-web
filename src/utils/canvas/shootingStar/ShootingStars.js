import ShootingStar from './ShootingStar'
import Crood from '../common/Crood'
export default class ShootingStars {
  constructor (cvs, ctx) {
    this.cvs = cvs
    this.ctx = ctx
    this.stars = []
    this.T = null
    this.stop = false
    this.playing = false
  }

  createStar () {
    const angle = Math.PI / 3
    const distance = Math.random() * 800
    const init = new Crood(Math.random() * this.cvs.width | 0, Math.random * 100 | 0)
    const final = new Crood(init.x + distance * Math.cos(angle), init.y + distance * Math.sin(angle))
    const size = Math.random() * 3
    const speed = Math.random() * 800 + 100
    const star = new ShootingStar(init, final, size, speed, () => this.remove(star))
    return star
  }

  remove (star) {
    this.stars = this.stars.filter(s => { return s !== star })
  }

  update (delta) {
    if (!this.stop && this.stars.length < 60) {
      this.stars.push(this.createStar())
    }
    this.stars.forEach(s => s.draw(this.ctx, delta))
  }

  tick () {
    if (this.playing) return
    this.playing = true
    const now = (new Date()).getTime()
    let last = now
    let delta
    const _tick = () => {
      if (this.stop && this.stars.length === 0) {
        cancelAnimationFrame(this.T)
        this.playing = false
        return
      }

      delta = now - last
      delta = delta > 500 ? 30 : (delta < 16 ? 16 : delta)
      last = now
      this.T = requestAnimationFrame(_tick)
      this.ctx.save()
      this.ctx.fillStyle = 'rgba(0,0,0,0.2)'
      this.ctx.globalCompositeOperation = 'destination-in'
      this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height)
      this.ctx.restore()
      this.update(delta)
    }
    _tick()
  }

  start () {
    this.stop = false
    this.tick()
  }
}

import Crood from '../common/Crood'
export default class ShootingStar {
  constructor (init = new Crood(100, 100), final = new Crood(400, 400), size = 3, speed = 200, onDistory = null) {
    this.init = init // 初始位置
    this.final = final // 最终位置
    this.size = size // 流行大小
    this.speed = speed //  速度：像素/s
    // 飞行总时间
    this.flyTime = Math.sqrt(Math.pow(this.final.x - this.init.x, 2) + Math.pow(this.final.y - this.init.y, 2)) * 1000 / this.speed
    this.pass = 0 // 已经过去的时间
    this.prev = this.init.copy() //  上一帧位置
    this.now = this.init.copy() //  当前帧位置
    this.onDistory = onDistory
  }

  draw (ctx, delta) {
    this.pass += delta
    this.pass = Math.min(this.pass, this.flyTime)
    const percent = this.pass / this.flyTime
    this.now.setCrood(
      this.init.x + (this.final.x - this.init.x) * percent,
      this.init.y + (this.final.y - this.init.y) * percent
    )
    // 绘制
    ctx.strokeStyle = '#fff'
    ctx.lineCap = 'round'
    ctx.lineWidth = this.size
    ctx.beginPath()
    ctx.moveTo(this.now.x, this.now.y)
    ctx.lineTo(this.prev.x, this.prev.y)
    ctx.stroke()

    this.prev.setCrood(this.now.x, this.now.y)
    if (this.pass === this.flyTime) {
      this.distory()
    }
  }

  // 销毁流星
  distory () {
    this.onDistory && this.onDistory()
  }
}

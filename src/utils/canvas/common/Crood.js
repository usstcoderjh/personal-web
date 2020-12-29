export default class Crood {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  setCrood (x, y) {
    this.x = x
    this.y = y
  }

  copy () {
    return new Crood(this.x, this.y)
  }
}

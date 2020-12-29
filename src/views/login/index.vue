<template>
<div class="bg">
  <canvas ref="canvas"></canvas>
</div>

</template>

<script>
import ShootingStars from '../../utils/canvas/shootingStar/ShootingStars'
export default {
  name: 'Index',
  data () {
    return {
      canvas: {}
    }
  },
  methods: {
    draw () {
      const canvas = this.$refs.canvas
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
      const ctx = canvas.getContext('2d')
      const stars = new ShootingStars(canvas, ctx)
      stars.start()
    }
  },
  mounted () {
    this.draw()
  }
}
</script>

<style lang="less" scoped>
.bg {
  background: url('../../assets/img/3.jpg') no-repeat top;
  background-size: 100% 100%;
}
</style>

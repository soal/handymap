<template>
  <svg
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style=""
    :width="width"
    height="30"
    id="timeline"
    ref="timelineSvg"
  >
    <rect ref="timelineBg" x="0" y="0" width="100%" height="30"></rect>
    <rect ref="visibleStartEl" x="5" y="0" width="2" height="30" fill="#ff0000" style=""></rect>
    <rect ref="visibleEndEl" :x="visibleEndPos[0]" y="0" width="2" height="30" fill="#ff0000" style=""></rect>
  </svg>
</template>

<script>
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'

export default {
  props: [
    'startDate',
    'endDate',
    'visibleStart',
    'visibleEnd',
    'periodStart',
    'periodEnd',
    'currentDate',
    'width'
  ],

  data() {
    return {
      visibleEndPos: [0, 0],
      visibleStartPos: [5, 0]
    }
  },

  mounted() {
    this.visibleEndPos = [this.width - 10, 0]
  },

  computed: {
  },

  watch: {
    width(newVal) {
      this.visibleEndPos = [newVal - 10, 0]
    }
  },

  methods: {
    createTimeline() {
      this.timeline = Snap(this.$refs.timelineSvg)
      this.timelineBg = this.timeline.rect(0, 0, '100%', 30)
      this.visibleStartEl = this.timeline
        .rect(...this.visibleStartPos, 2, 30)
        .attr({ fill: '#f00' })
      this.visibleEndEl = this.timeline
        .rect(...this.visibleEndPos, 2, 30)
        .attr({ fill: '#f00' })
    },
  }
}
</script>

<style>

</style>

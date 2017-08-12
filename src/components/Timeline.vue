<template>
  <div id="timeline-container" :class="[ infoBoxShowed ? 'short' : '' ]">
    <svg ref="timelineSvg" id="timeline" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="" width="100%" height="30">
      <!-- <g v-show="mini">
        <rect ref="bgLine" x="0" y="0" width="100%" height="30" fill="#222" />
        <rect ref="visibleStart" x="5" y="0" class="visibleStart" width="2" height="30" fill="#ff1111" />
        <rect ref="visibleEnd" x="990" y="0" class="visibleEnd" width="2" height="30" fill="#ff1111" />
      </g> -->
    </svg>
  </div>

</template>

<script>
// import Snap from 'snapsvg';
// const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`)
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';

export default {
  data() {
    return {
      mini: true,
      timeline: undefined
    };
  },

  computed: {
    visibleStart() { return this.$store.state.timeline.visibleDates.startDate },
    visibleEnd() { return this.$store.state.timeline.visibleDates.endDate },
    infoBoxShowed() { return this.$store.state.infoBoxShowed }
  },

  createTimeline() {
    this.timeline = Snap(this.$refs.timelineSvg)

  },

  mounted() {
    createTimeline()
  }
}
</script>

<style lang="scss">
  #timeline-container {
    height: 30px;
    will-change: will;
    width: 100%;

    &.short {
      width: calc(100% - 30vw);
      float: right;
    }
  }
  .visibleStart {
    position: absolute;
    // top: 0;
    // left: 5px;
    // transform: translate(10px, 0);
  }
  .visibleEnd {
    position: absolute;
    // right: 5px;
    // top: 0;
    // transform: translate(calc(100vw - 10px), 0);
  }

</style>

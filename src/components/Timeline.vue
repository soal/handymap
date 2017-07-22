<template>
  <div id="timeline">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="" width="100%" height="30">
      <g v-show="mini">
        <rect x="0" y="0" width="100%" height="30" fill="#222" />
        <rect class="visibleStart" width="2" height="30" fill="#ff1111" />
        <rect class="visibleEnd" width="2" height="30" fill="#ff1111" />

      </g>
    </svg>
  </div>

</template>

<script>
export default {
  data() {
    return {
      mini: true
    };
  },

  computed: {
    visibleStart() { return this.$store.state.timeline.visibleDates.startDate },
    visibleEnd() { return this.$store.state.timeline.visibleDates.endDate }
  }
}
</script>

<style lang="scss">
  #timeline {
    height: 30px;
    will-change: will;
  }
  .visibleStart {
    position: absolute;
    top: 0;
    left: 5px;
    transform: translate(10px, 0);
  }
  .visibleEnd {
    position: absolute;
    top: 0;
    transform: translate(calc(100vw - 10px), 0);
  }
</style>

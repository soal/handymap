<template>
  <div id="timeline-container" :class="[ infoBoxShowed ? 'short' : '' ]" ref='timelineContainer'>
    <TimelineMini
      v-if="mini"
      :periodStart="periodStart"
      :periodEnd="periodEnd"
      :visibleStart="visibleStart"
      :visibleEnd="visibleEnd"
      :currentDate="currentDate"
      :width="timelineWidth"
    >
    </TimelineMini>
    </svg>
  </div>

</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex'
import TimelineMini from './TimelineMini.vue'

export default {
  components: {
    TimelineMini
  },
  data() {
    return {
      mini: true,
      timelineWidth: '100%'
    };
  },

  computed: {
    ...mapState({
      periodStart: state => state.timeline.period.startDate,
      periodEnd: state => state.timeline.period.endDate,
      visibleStart: state => state.timeline.visibleDates.startDate,
      visibleEnd: state => state.timeline.visibleDates.endDate,
      currentDate: state => state.timeline.currentDate,
      infoBoxShowed: state => state.infoBoxShowed
    })
  },

  watch: {
    infoBoxShowed() {
      Vue.nextTick(() => {
        this.timelineWidth = this.$refs.timelineContainer.offsetWidth
      })
    }
  },

  mounted() {
    this.timelineWidth = this.$refs.timelineContainer.offsetWidth
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

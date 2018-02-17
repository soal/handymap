<template>
  <div id="timeline-container" :class="[ infoBoxShowed ? 'short' : '' ]" ref='timelineContainer'>
    <transition>
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
    </transition>
  </div>

</template>

<script>
import Vue from 'vue'
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
    }
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

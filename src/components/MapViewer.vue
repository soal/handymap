<template>
  <div id="viewer">
    <info-box></info-box>
    <geo-map></geo-map>
    <div id="timeline-box">
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import GeoMap from '@/components/Geomap/GeoMap.vue'
import InfoBox from '@/components/Infobox/InfoBox.vue'
// import Timeline from '@/components/Timeline/Timeline.vue'

export default {
  name: 'MapViewer',
  components: {
    GeoMap,
    InfoBox
    // Timeline
  },

  computed: {
    ...mapGetters([
      'currentElement',
      'commonDataset'
    ]),
    ...mapState({
      scenarios: 'scenarios'
    })
  }
}
</script>

<style scoped>
  #viewer {
    position: relative;
    margin-top: -48px;
    height: 100vh;
  }
  #timeline-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>

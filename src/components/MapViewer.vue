<template>
  <div id="viewer">
    <info-box></info-box>
    <geo-map></geo-map>
    <div id="timeline-box">
      <timeline></timeline>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import GeoMap from './geomap/GeoMap.vue'
import InfoBox from './infobox/InfoBox.vue'
import Timeline from './Timeline.vue'

export default {
  name: 'MapViewer',
  components: {
    GeoMap,
    InfoBox,
    Timeline
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
};
</script>

<style lang="scss" scoped>
  #timeline-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>


<template>
  <div id="viewer">
    <info-box>
      <router-view name="infobox"/>
    </info-box>
    <geo-map>
      <keep-alive>
        <router-view name="map" />
      </keep-alive>
    </geo-map>
    <div id="timeline-box">
      <router-view name="timeline" />
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

<template>
  <div id="viewer">
    <info-box :currentElement="currentElement"></info-box>
    <geo-map :currentElement="currentElement" :dataset="commonDataset"></geo-map>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import GeoMap from './geomap/GeoMap.vue';
import InfoBox from './infobox/InfoBox.vue';

export default {
  name: 'MapViewer',
  components: {
    GeoMap,
    InfoBox
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
</style>


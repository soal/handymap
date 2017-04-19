<template>
  <div id="viewer">
    <info-box :currentElement="currentElement"></info-box>
    <geo-map :currentElement="currentElement"></geo-map>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import GeoMap from './geomap/GeoMap.vue';
import InfoBox from './infobox/InfoBox.vue';

export default {
  name: 'MapViewer',
  components: {
    GeoMap,
    InfoBox
  },

  computed: {
    currentElement() { return this.$store.getters.currentElement; },
    ...mapState({
      scenarios: 'scenarios'
    })
  }
};
</script>

<style lang="scss" scoped>
</style>


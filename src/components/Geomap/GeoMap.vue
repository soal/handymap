<template>
  <gl-map
    :accessToken="accessToken"
    :mapStyle.sync="mapSource"
    :container="mapOptions.container"
    :center.sync="mapOptions.center"
    :maxZoom.sync="mapOptions.maxZoom"
    :minZoom.sync="mapOptions.minZoom"
    :hash="true"
    :attributionControl="true"
  >
    <nav-control
      position="bottom-right"
    />
    <element-shape v-for="element of dataset" :key="element.id"
      :element="element"
    >
    </element-shape>
  </gl-map>
</template>

<script>
import {
  MglMap,
  MglNavigationControl
} from 'vue-mapbox'

import { MAP_SOURCE, MAPBOX_ACCESS_TOKEN } from '@/config'
// import api from '@/api'
import ElementShape from '@/components/Geomap/ElementShape.vue'

export default {
  name: 'GeoMap',
  components: {
    GlMap: MglMap,
    NavControl: MglNavigationControl,
    ElementShape
  },

  data() {
    return {
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapSource: MAP_SOURCE,
      mapOptions: {
        container: 'map-main',
        center: [8.3221, 46.5928],
        maxZoom: 6,
        minZoom: 1.76,
        zoom: 3
      }
    }
  },

  computed: {
    currentElement() { return this.$store.getters.currentElement },
    dataset() {
      let dataset = this.$store.getters.commonDataset.filter(el => el.shapes_ids && el.shapes_ids.length)
      return dataset
    }
  },
  methods: {}
}
</script>

<style scoped>
  #map-main {
    /* position: absolute;
    top: 0;
    left: 0; */
    height: 100vh;
    width: 100vw;
  }
</style>

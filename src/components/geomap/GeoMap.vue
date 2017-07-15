<template>
<div>
  <gl-map
    :accessToken="accessToken"
    :mapStyle.sync="mapSource"
    :container="mapOptions.container"
    :center.sync="mapOptions.center"
    :maxZoom.sync="mapOptions.maxZoom"
    :minZoom.sync="mapOptions.minZoom"
    :zoom.sync="mapOptions.zoom"
    :hash="true"
    :attributionControl="false"
    @mgl-load="setMap"
  >
    <nav-control></nav-control>
    <element-shape v-for="element of dataset" :key="element.id"
      :element="element"
      :mapId="mapOptions.container"
      :map="map"
    >
    </element-shape>
  </gl-map>
</div>
</template>

<script>
import {
  MglMap,
  MglNavigationControl
} from 'vue-mapbox';

import {MAP_SOURCE, MAPBOX_ACCESS_TOKEN} from '../../config';
import api from '../../api';
import _ from 'lodash';
import ElementShape from './ElementShape.vue';

export default {
  name: 'GeoMap',
  components: {
    GlMap: MglMap,
    NavControl: MglNavigationControl,
    ElementShape
  },

  data() {
    return {
      map: undefined,
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapSource: MAP_SOURCE,
      mapOptions: {
        container: 'map-main',
        center: [8.3221, 46.5928],
        maxZoom: 6,
        minZoom: 1.76,
        zoom: 3
      }
    };
  },

  computed: {
    currentElement() { return this.$store.getters.currentElement; },
    dataset() {
      let dataset = _.filter(this.$store.getters.commonDataset, el => el.shapes_ids && el.shapes_ids.length);
      return dataset;
    }
  },
  methods: {
    setMap(payload) {
      this.map = payload.map
    }
  }
};

</script>

<style lang="scss" scoped>
  #map-main {
    position: absolute;
    top: 57px;
    left: 0;
    height: calc(100vh - 57px);
    width: 100vw;
  }
</style>

<template>
<div>
  <gl-map :accessToken="accessToken"
          :map-style="mapSource"
          :center="[8.3221, 46.5928]"
          :maxZoom="6"
          :minZoom="1.76"
          :zoom="3"
          :hash="true"
  >
    <element-shape v-for="element of dataset" :key="element.id" :element="element"></element-shape>
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
import ElementShape from './ElementShape.vue';

export default {
  name: 'GeoMap',
  components: {
    GlMap: MglMap,
    NavControl: MglNavigationControl,
    ElementShape
  },
  props: ['currentElement', 'dataset'],

  data() {
    return {
      map: null,
      accessToken: MAPBOX_ACCESS_TOKEN,
      mapSource: MAP_SOURCE,
      mapOptions: {
        center: [8.3221, 46.5928]
      },
      userLayers: new Set()
    };
  },
  // QUESTION: May be watch currentElementId?
  watch: {
    currentElement(newcurrentElement) {
      this.addElementShapes(newcurrentElement);
    }
  },

  mounted() {
  },
  methods: {
    // loadMap() {
    //   return new Promise((resolve) => {
    //     M.accessToken = MAPBOX_ACCESS_TOKEN;

    //     let map = new M.Map({
    //       container: 'map',
    //       style: MAP_SOURCE,
    //       center: [8.3221, 46.5928],
    //       maxZoom: 6,
    //       minZoom: 1.76,
    //       zoom: 3,
    //       hash: true
    //     });

    //     map.on('load', () => resolve(map));
    //   });
    // },
    loadShape(id) {
      id = '' + id;
      if (this.map.getSource(id) === undefined) {
        this.map.addSource(id, {
          type: 'geojson',
          data: `${api.shapes.defaults.baseURL}${id}`
        });
      }
      if (this.map.getLayer(id) === undefined) {
        this.userLayers.add(id);
        this.map.addLayer({
          id,
          type: 'fill',
          source: id,
          layout: {
            visibility: 'visible'
          },
          paint: {
            'fill-color': `rgba(${12 * id + 3},153,80,0.55)`
          }
        });
      }
    },
    addElementShapes(element) {
      if (this.map && element && element.shapes_ids) {
        element.shapes_ids.forEach(id => {
          this.loadShape(id);
        });
      } else {
        this.userLayers.forEach(layer => {
          this.map.removeLayer(layer);
        });
        this.userLayers = new Set();
      }
    }
  }
};

</script>

<style lang="scss" scoped>
  #map {
    position: absolute;
    top: 57px;
    left: 0;
    height: calc(100vh - 57px);
    width: 100vw;
  }
</style>

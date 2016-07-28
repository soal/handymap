<template lang="html">
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<style lang="scss">
  .map-wrapper {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  #map {
    height: 100vh;
    width: 100vw;
    /*height: 140vh
    width: 145vw
    margin-bottom: -20vh
    margin-left: -25vw
    margin-top: -20vh
    margin-right: -20vw
    padding: 0 10vw*/

    .mapboxgl-control-container {
      bottom: 0;
      position: absolute;
      right: 0;

    }
  }

  .timeline-wrapper {
    background-color: blue;
    bottom: 0;
    height: 20px;
    position: fixed;
    width: 100%;
    z-index: 90;
  }
</style>

<script>
import M from "mapbox-gl";
import {MAP_SOURCE, MAPBOX_ACCESS_TOKEN, API_ROOT} from "../config";

export default {
  name: "GeoMap",
  components: {
  },
  vuex: {
    getters: {}
  },
  events: {

  },
  ready() {
    M.accessToken = MAPBOX_ACCESS_TOKEN;
    var map = new M.Map({
      container: "map",
      style: MAP_SOURCE,
      center: [8.3221, 46.5928],
      maxZoom: 6,
      minZoom: 1.76,
      zoom: 3,
      hash: true
    });

    var Roma = new M.GeoJSONSource({data: `${ API_ROOT }/shapes/11`});
    var Carthago = new M.GeoJSONSource({data: `${ API_ROOT }/shapes/71`});

    map.addControl(new M.Navigation({position: "bottom-right"}));
    map.on("load", () => {
      this.$dispatch("geoMapLoaded", map, M);

      // map.addSource("Roma", Roma);
      // map.addSource("Carthago", Carthago);

      // console.log(Roma)
      // map.addLayer({
      //   id: "Roma",
      //   type: "fill",
      //   source: "Roma",
      //   "source-layer": "Roma",
      //   layout: {
      //     visibility: "visible"
      //   },
      //   paint: {
      //     "fill-color": "rgba(61,153,80,0.55)"
      //   }
      // });

      // map.addLayer({
      //   id: "Carthago",
      //   type: "fill",
      //   source: "Carthago",
      //   "source-layer": "Carthago",
      //   layout: {
      //       visibility: "visible"
      //   },
      //   paint: {
      //     "fill-color": "rgba(255,153,80,0.55)"
      //   }
      // });
    });
  }
};

</script>


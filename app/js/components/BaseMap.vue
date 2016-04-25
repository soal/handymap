<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
  <div class="infobox">
    <router-view transition="fade"></router-view>
  </div>
</template>


<script>

import factActions from "../actions/factActions";
import InfoBox from "./InfoBox.vue";
import M from "mapbox-gl";
import {MAP_SOURCE, MAPBOX_ACCESS_TOKEN} from "../config";

export default {
  name: "BaseMap",
  components: {
    infoBox: InfoBox
  },
  vuex: {
    getters: {},
    actions: Object.assign(
      factActions,
      {}
    )
  },
  activate() {

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

    map.addControl(new M.Navigation());
  }
};

</script>

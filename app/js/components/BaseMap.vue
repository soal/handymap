<template lang="html">
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
  <router-view></router-view>
  <info-box></info-box>
  <timeline></timeline>
</template>


<script>

import elementsActions from "../actions/elementsActions";
import InfoBox from "./InfoBox.vue";
import BaseElement from "./BaseElement.vue";
import Timeline from "./Timeline.vue";
import M from "mapbox-gl";
import {MAP_SOURCE, MAPBOX_ACCESS_TOKEN} from "../config";

export default {
  name: "BaseMap",
  components: {
    infoBox: InfoBox,
    timeline: Timeline,
    baseElement: BaseElement
  },
  vuex: {
    getters: {},
    actions: Object.assign(
      elementsActions,
      {}
    )
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

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
  // height: 140vh
  // width: 145vw
  // margin-bottom: -20vh
  // margin-left: -25vw
  // margin-top: -20vh
  // margin-right: -20vw
  //  padding: 0 10vw
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
import {MAP_SOURCE, MAPBOX_ACCESS_TOKEN} from "../config";

export default {
  name: "BaseMap",
  components: {
  },
  vuex: {
    getters: {}
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

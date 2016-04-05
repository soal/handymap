<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
  <div v-for="fact in facts">
    <b>{{ fact.date }}</b>&nbsp;<span>{{ fact.name }}</span>
  </div>
</template>


<script>

import factActions from "../actions/factActions";
import M from "mapbox-gl";
import {MAP_SOURCE, MAPBOX_ACCESS_TOKEN} from "../config";

export default {
  name: "BaseMap",
  vuex: {
    getters: {
      facts: state => {
        var facts = [];
        for (let fact of state.facts) {
          let formatted = Object.assign({}, fact);
          formatted.date = `${fact.date.day}.${fact.date.month}.${fact.date.year}`
          facts.push(formatted);
        }
        return facts;
      }
    },
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
        container: 'map',
        style: MAP_SOURCE,
        center: [8.3221, 46.5928],
        maxZoom: 6,
        minZoom: 1.76,
        zoom: 3,
        hash: true
    });

    map.addControl(new M.Navigation());

    this.get();

  }
}

</script>

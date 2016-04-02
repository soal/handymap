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
import L from "leaflet";

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
    const baseMap = L.map("map").setView([51.505, -0.09], 8);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png32?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 15,
      id: 'soal.pipb5on6',
      accessToken: 'pk.eyJ1Ijoic29hbCIsImEiOiJjaW1qZndnMmwwMDEzdzBtNHRxcGFrampqIn0.bpwowsJ4GLBdsPnnXuZboA'
    }).addTo(baseMap);
    this.get();

  }
}

</script>

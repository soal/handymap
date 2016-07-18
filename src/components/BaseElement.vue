<template lang="html">
  <div id="base-element">
    <!-- <router-view></router-view> -->
    <base-map></base-map>
    <info-box></info-box>
    <timeline></timeline>
  </div>
</template>

<script>
import store from "../storage/store";
import {Dicts} from "../api/resources";
import elementsActions from "../actions/elementsActions";
import InfoBox from "./InfoBox.vue";
import BaseMap from "./BaseMap.vue";
import Timeline from "./Timeline.vue";

export default {
  name: "BaseElement",
  components: {
    InfoBox,
    BaseMap,
    Timeline
  },
  vuex: {
    getters: {
      currentElement: state => state.currentElement,
      defaultElement: state => state.defaultElement,
      elements: state => state.elements
    },
    actions: Object.assign(
      elementsActions,
      {}
    )
  },
  ready() {
    Dicts.get()
      .then((dicts) => {
        store.dispatch("SET_DICTS", dicts);
        store.dispatch("SET_DEFAULT_ELEMENT", dicts.default);
      });
    this.getElement(this.defaultElement, function({dispatch}, response) {
      dispatch("SET_CURRENT_ELEMENT", response);
      return response;
    });
  }
};
</script>

<style lang="scss">
#base-element {
  // position: absolute;
  // width: 100%;
  // height: 100vh;
  /*z-index: 49*/
}
</style>

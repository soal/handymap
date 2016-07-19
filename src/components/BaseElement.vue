<template lang="html">
  <div id="base-element">
    <base-map></base-map>
    <info-box></info-box>
    <timeline></timeline>
  </div>
</template>

<script>
import store from "../storage/store";
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
    store.watch(state => state.defaultElement, (defaultElementId) => {
      if (defaultElementId) {
        this.getElement(defaultElementId, function({dispatch}, response) {
          dispatch("SET_CURRENT_ELEMENT", (response.data ? response.data : response));
          return response;
        });
      }
    });
    store.watch(state => state.currentElement, (newEl) => {
      if (newEl) {
        this.getChildren(newEl);
      }
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

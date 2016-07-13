<template lang="html">
  <div id="base-element">
  </div>
</template>

<script>
import store from "./storage/store";
import {Dicts} from "./api/resources";
import elementsActions from "../actions/elementsActions";
import InfoBox from "./InfoBox.vue";

export default {
  name: "BaseElement",
  components: {
    infoBox: InfoBox
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
    // this.getElement(100, function({dispatch}, response) {
    //   dispatch("SET_CURRENT_ELEMENT", response);
    //   return response;
    // });
  }
};
</script>

<template lang="html">
  <div id="base-element">
  </div>
</template>

<script>
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
      elements: state => state.elements
    },
    actions: Object.assign(
      elementsActions,
      {}
    )
  },
  ready() {
    this.getElement(100, function({dispatch}, response) {
      dispatch("SET_CURRENT_ELEMENT", response);
      return response;
    });
  }
};
</script>

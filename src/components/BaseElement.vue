<template lang="html">
  <div id="base-element">
    <base-map></base-map>
    <info-box :current-element="currentElement"
              :children="children"
              :connections="connections"
              :element-collections="elementCollections"
              :element-ordered-collections="elementOrderedCollections">
    </info-box>
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
  route: {
    data({ to }) {
      if (to.name === "main") {
        return this.getElement(100, function({dispatch}, response) {
          dispatch("SET_CURRENT_ELEMENT", (response.data ? response.data : response));
          return response;
        });
      }
      let storedElement = this.elements.find((item) => item.name === to.params.element);
      if (storedElement) {
        return this.getElement(storedElement.id, function({dispatch}, response) {
          dispatch("SET_CURRENT_ELEMENT", (response.data ? response.data : response));
          return response;
        });
      }
    }
  },
  vuex: {
    getters: {
      currentElement: state => state.currentElement,
      defaultElement: state => state.defaultElement,
      currentElementId: state => state.currentElementId,
      elements: state => state.elements,
      collections: state => state.collections,
      orderedCollections: state => state.orderedCollections
    },
    actions: Object.assign(
      elementsActions,
      {}
    )
  },
  computed: {
    children: function() {
      // TODO: move to actions for using in WebWorker
      if (this.currentElement.children_ids) {
        return this.elements.filter(
          (item) => {
            return this.currentElement.children_ids.map((child) => child.id).includes(item.id);
          }
        );
      }
    },
    connections: function() {
      if (this.currentElement.connections_ids) {
        return this.elements.filter(
          (item) => {
            return this.currentElement.connections_ids.map((connection) => connection.id).includes(item.id);
          }
        );
      }
    },
    elementCollections: function() {
      if (this.currentElement.collections_ids) {
        return this.collections.filter(
          (item) => {
            return this.currentElement.collections_ids.map((coll) => coll.id).includes(item.id);
          }
        );
      }
    },
    elementOrderedCollections: function() {
      if (this.currentElement.ordered_collections_ids) {
        return this.orderedCollections.filter(
          (item) => {
            return this.currentElement.ordered_collections_ids.map((ocoll) => ocoll.id).includes(item.id);
          }
        );
      }
    }
  },
  ready() {
    store.watch(state => state.currentElement, (newEl) => {
      if (newEl) {
        if (newEl.children_ids) {
          this.getChildren(newEl);
        }
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

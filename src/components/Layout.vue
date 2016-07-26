<template lang="html">
  <div id="base-element">
    <geo-map></geo-map>
    <info-box :current-element="currentElement"
              :children="filteredChildren"
              :elementsComponents="elementComponents"
              :connections="connections"
              :element-collections="elementCollections"
              :element-ordered-collections="elementOrderedCollections">

      <ul class="elements" slot="elementsList">
        <li v-for="element of filteredChildren">
          <element :element="element" :map="map" :M="M"></element>
        </li>
      </ul>
    </info-box>
</template>


<style lang="scss">
  #base-element {
    // position: absolute;
    // width: 100%;
    // height: 100vh;
    /*z-index: 49*/
  }
</style>

<script>
import store from "../storage/store";
import elementsActions from "../actions/elementsActions";
import searchActions from "../actions/searchActions";
import InfoBox from "./InfoBox.vue";
import GeoMap from "./GeoMap.vue";
import Element from "./Element.vue"
import Timeline from "./Timeline.vue";

export default {
  name: "Layout",
  components: {
    InfoBox,
    GeoMap,
    Timeline,
    Element
  },
  route: {
    activate({ to, next }) {
      // NOTE: need refactor
      if (to.name === "main" && !store.state.defaultElementId) {
        return new Promise((resolve) => {
          let timer = setInterval(() => {
            if (store.state.defaultElementId) {
              clearInterval(timer);
              resolve(store.state.defaultElementId);
            }
          }, 10);
        });
      }
      next();
    },
    data({ to }) {
      if (to.name === "main") {
        return this.getElement(this.defaultElementId, null, function({dispatch}, response) {
          dispatch("SET_CURRENT_ELEMENT", (response.data ? response.data : response));
          dispatch("SET_CURRENT_ELEMENT_ID", (response.data ? response.data.id : response.id));
          return response;
        });
      }
      let storedElement = this.elements.find((item) => item.name === to.params.element);
      if (storedElement) {
        this.getElement(storedElement.id, null, function({dispatch}, response) {
          dispatch("SET_CURRENT_ELEMENT", (response.data ? response.data : response));
          dispatch("SET_CURRENT_ELEMENT_ID", (response.data ? response.data.id : response.id));
          return response;
        });
      } else {
        this.getCurrentElementByName(to.params.element);
      }
    }
  },
  vuex: {
    getters: {
      currentElement: state => state.currentElement,
      defaultElementId: state => state.defaultElementId,
      currentElementId: state => state.currentElementId,
      elements: state => state.elements,
      collections: state => state.collections,
      orderedCollections: state => state.orderedCollections
    },
    actions: Object.assign(
      searchActions,
      elementsActions,
      {}
    )
  },
  data() {
    return {
      map: {},
      M: {}
    }
  },
  computed: {
    children() {
      // TODO: move to actions for using in WebWorker
      if (this.currentElement.children_ids) {
        return this.elements.filter(
          (item) => {
            return this.currentElement.children_ids.map((child) => child.id).includes(item.id);
          }
        );
      }
    },
    filteredChildren() {
      return this.children;
    },
    connections() {
      if (this.currentElement.connections_ids) {
        return this.elements.filter(
          (item) => {
            return this.currentElement.connections_ids.map((connection) => connection.id).includes(item.id);
          }
        );
      }
    },
    elementCollections() {
      if (this.currentElement.collections_ids) {
        return this.collections.filter(
          (item) => {
            return this.currentElement.collections_ids.map((coll) => coll.id).includes(item.id);
          }
        );
      }
    },
    elementOrderedCollections() {
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
    this.$on("geoMapLoaded", (map, M) => {
      this.map = map;
      this.M = M;


    });
  }
};
</script>


<template lang="html">
  <div class="subelement">
    <h3><a href="javascript:;" @click="toggleDesc">{{element.label}}</a></h3>
    <div v-show="descShowed" class="description">
      <a href="javascript:;" @click="setCurrentElement(event, element.id)" v-link="{ name: 'element', params: { element: element.name } }">Перейти</a>
      <p>
        {{ element.description }}
      </p>
      <br>
    </div>
  </div>
</template>

<style lang="scss">
</style>

<script>
import elementsActions from "../actions/elementsActions";
import store from "../vuex/store";

export default {
  name: "Element",
  data: function () {
    return {
      descShowed: false
    };
  },
  props: ["element", "map", "M"],
  events: {},
  vuex: {
    getters: {
      currentElementId: state => state.currentElementId
    },
    actions: Object.assign(
      elementsActions,
      {
        setCurrentElement({dispatch}, event, id) {
          dispatch("SET_CURRENT_ELEMENT_ID", id);
      }
    })
  },
  methods: {
    toggleDesc() {
      this.descShowed = !this.descShowed;
    }
  },
  ready() {
    this.$watch("M", (newM) => {
      if (newM) {
        if (this.element.shapes_ids && this.element.shapes_ids.length) {
          this.getElementShapes(this.element.id, (elementId, response) => {
            store.dispatch("SET_ELEMENT_SHAPES", { id: elementId, shapes: response });
            this.element.shapes.forEach(shape => {
              var shapeSource = new this.M.GeoJSONSource({ data: shape });
              this.map.addSource(shape.id, shapeSource);

              var layer = {
                id: shape.id,
                source: shape.id,
                type: "fill",
                layout: {
                  visibility: "visible"
                },
                paint: {}
              };

              if (shape.properties.fill) {
                layer.paint["fill-color"] = shape.properties.fill;
              }
              if (shape.properties["fill-opacity"]) {
                layer.paint["fill-opacity"] = shape.properties["fill-opacity"];
              }
              this.map.addLayer(layer);
            });
          });
        }
      }
    })
  }
};
</script>


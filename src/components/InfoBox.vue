<template>
  <div class="infobox">
      <div class="block">
        <h1>{{currentElement.id}}</h1>
        <b>{{currentElement.start_date}}&ndash;{{currentElement.end_date}}</b>
        <b>{{currentElement.label}}</b>
        <p>
          {{currentElement.description}}
        </p>
      </div>
      <div class="block">
        <ul>
          <li v-for="element of children">
            <sub-element :element="element"></sub-element>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import elementsActions from "../actions/elementsActions";
import SubElement from "./SubElement.vue";

export default {
  name: "InfoBox",
  components: {
    SubElement
  },
  vuex: {
    actions: Object.assign(
      elementsActions,
      {}
    )
  },
  props: [
    "currentElement",
    "children",
    "connections",
    "elementCollections",
    "elementOrderedCollections"
  ]
};
</script>

<style lang="scss">
  .infobox {
    background: white;
    height: 80vh;
    display: block;
    margin-top: 5rem;
    overflow: scroll;
    position: absolute;
    top: 0;
    width: 50vw;
    z-index: 9999999;
    
    .hidden {
      display: none;
    }
    .block {
      padding: 1em;
      float: left;
      width: 50%;
    }
  }
</style>

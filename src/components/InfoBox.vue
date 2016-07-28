<template>
  <div class="infobox">
      <div class="block">
        <h1>{{currentElement.id}}</h1>
        <b>{{currentElement.start_date}}&ndash;{{currentElement.end_date}}</b>
        <b>{{currentElement.label}}</b>
        <p>
          {{currentElement.description}}
        </p>
        <p>
          {{currentElement.text}}
        </p>
      </div>
      <div class="block">
        <slot name="elementsList"></slot>
        <!--<ul>
          <li v-for="element of elementComponents">
            <element></element>
            {{ element.id }}
            <!--<element :element="element"></element>-->
          <!--</li>-->
        <!--</ul>-->
      </div>
  </div>
</template>

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
      width: 40%;

      &:first-of-type {
        width: 60%;
      }
    }
  }
</style>

<script>
import elementsActions from "../actions/elementsActions";
import Element from "./Element.vue";

export default {
  name: "InfoBox",
  components: {
    Element
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
    "elementComponents",
    "connections",
    "elementCollections",
    "elementOrderedCollections"
  ]
};
</script>

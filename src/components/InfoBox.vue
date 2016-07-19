<template>
  <div class="infobox">
    <div class="factbox">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#">События</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Описание</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Ссылки</a>
        </li>
      </ul>

      <div class="tab-content">
        <div class="tab-pane active" role="tabpanel">
          <b>{{currentElement.start_date}}&ndash;{{currentElement.end_date}}</b>
          <b>{{currentElement.label}}</b>
          <p>
            {{currentElement.description}}
          </p>
          <ul>
            <li v-for="element of children">
              <b>{{element.label}}</b>
              </li>
            </ul>
          </div>
          <div class="tab-pane" role="tabpanel"></div>
          <div class="tab-pane" role="tabpanel">...</div>
          <div class="tab-pane" role="tabpanel">...</div>
        </div>
      </div>
  </div>
</template>

<script>
import elementsActions from "../actions/elementsActions";

export default {
  name: "InfoBox",
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
  ],
  ready() {
    // this.getElement(100);
  }
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
    z-index: 9999999;

    .factbox {
      width: 30vw;
    }
  }
</style>

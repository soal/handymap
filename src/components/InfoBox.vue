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
          <ul>
            <li v-for="element of elements">
              <b>{{element.start_date}}&mdash;{{element.end_date}}&nbsp;&nbsp;{{element.label}}</b>
              <p>{{element.description}}<p>
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


<script>
import elementsActions from "../actions/elementsActions";

export default {
  name: "InfoBox",
  vuex: {
    getters: {
      elements: state => state.elements
    },
    actions: Object.assign(
      elementsActions,
      {}
    )
  },
  ready() {
    this.getElement(100);
  }
};
</script>

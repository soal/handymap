<template>
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
          <li v-for="element in elements"><b>{{element.start_date}}</b>&nbsp;&nbsp;{{element.label}}</li>
        </ul>
      </div>
      <div class="tab-pane" role="tabpanel"></div>
      <div class="tab-pane" role="tabpanel">...</div>
      <div class="tab-pane" role="tabpanel">...</div>
    </div>
  </div>
</template>

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
    this.getElement(33);
  }
};
</script>

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
          <li v-for="fact in facts"><b>{{fact.start_date}}</b>&nbsp;&nbsp;{{fact.label}}</li>
        </ul>
      </div>
      <div class="tab-pane" role="tabpanel"></div>
      <div class="tab-pane" role="tabpanel">...</div>
      <div class="tab-pane" role="tabpanel">...</div>
    </div>
  </div>
</template>

<script>
import factActions from "../actions/factActions";

export default {
  name: "InfoBox",
  vuex: {
    getters: {
      facts: state => state.facts
    },
    actions: Object.assign(
      factActions,
      {}
    )
  },
  ready() {
    this.getFact(33);
  }
};
</script>

<template lang="html">
<div id="app">
  <top-menu></top-menu>
  <router-view keep-alive></router-view>
</div>
</template>

<style lang="scss">
#top-menu {
  margin: 0;
  position: relative;
  z-index: 2;

  .fixed-logo {
    position: absolute;
    left: .85rem;
    top: .85rem;
    z-index: 9999;
  }

  .main-logo {
    // font-size: $font-size-h3;
  }


  .navbar {
    padding-left: 10rem;
  }

  form {
    text-align: center;
  }
}
</style>

<script>

import store from "./storage/store";
import BaseElement from "./components/BaseElement.vue";
import TopMenu from "./components/TopMenu.vue";
import dataService from "./services/dataService";

export default {
  store,
  components: {
    BaseElement,
    TopMenu
  },
  vuex: {
    getters: {
      title: state => state.title,
      elements: state => state.elements,
      defaultElementId: state => state.defaultElementId
    }
  },
  methods: {
    getDicts() {
      dataService.fetch("getOne", "dicts", null, null, false)
        .then(response => {
          // console.log("response: ", response);
          store.dispatch("SET_DICTS", response);
          if (response.default_element) {
            store.dispatch("SET_DEFAULT_ELEMENT_ID", response.default_element);
          }
        },
        err => console.log(err));
      }
  },
  ready() {
    this.getDicts();
  }
};

</script>

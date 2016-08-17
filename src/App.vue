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

import store from "./vuex/store";
import Layout from "./components/Layout.vue";
import TopMenu from "./components/TopMenu.vue";
import dataService from "./storage/dataService";

export default {
  store,
  components: {
    Layout,
    TopMenu
  },
  vuex: {
    getters: {
      title: state => state.title,
      elements: state => state.elements,
      defaultElementId: state => state.defaultElementId
    }
  }
};

</script>

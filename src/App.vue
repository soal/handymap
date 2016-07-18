<template lang="html">
<div id="app">
  <top-menu></top-menu>
  <router-view keep-alive></router-view>
</div>
</template>


<script>

import store from "./storage/store";
import BaseElement from "./components/BaseElement.vue";
import TopMenu from "./components/TopMenu.vue";

export default {
  store,
  components: {
    BaseElement,
    TopMenu
  },
  vuex: {
    getters: {
      title: state => state.title
    }
  },
  methods: {
  },
  ready() {

  }
};

</script>

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

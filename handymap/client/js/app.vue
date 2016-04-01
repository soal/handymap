<template>
<div id="app">
  <header id="top-menu">
    <div id="brand" class="fixed-logo">
      <a href="#" id="logo" class="main-logo label label-danger">HM</a>
      <a v-show="menuShowed" @click="menuShowed = !menuShowed" href="javascript:;" class="angle-switcher up"><i class="fa fa-angle-double-up"></i></a>
      <a v-show="!menuShowed" @click="menuShowed = !menuShowed" href="javascript:;" class="angle-switcher"><i class="fa fa-angle-double-down"></i></a>
    </div>
    <nav v-show="menuShowed" class="navbar navbar-dark bg-primary">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a href="/about" class="nav-link">About</a>
         </li>
      </ul>
    </nav>
   </header>
  <router-view keep-alive></router-view>
</div>
</template>

<script>

import store from "./storage/store";
import BaseMap from "./components/BaseMap.vue";

export default {
  store,
  components: {
    BaseMap
  },
  vuex: {
    getters: {
      title: state => state.title
    }
  },
  data: () => {
    return {
      menuShowed: true
    }
  },
  methods: {
    toggleMenu(event) {

    }
  }
}

</script>

<template>
<div id="app">
  <header id="top-menu">
    <div id="brand" class="fixed-logo">
      <a href="javascript" v-link="{ name: 'main' }" id="logo" class="main-logo label label-danger">{{ title.short }}</a>
      <a v-angle-switcher="menuShowed" v-bind:showed="menuShowed"></a>
    </div>
    <nav v-show="menuShowed" class="navbar navbar-dark bg-primary">
      <ul class="nav navbar-nav">
        <li class="nav-item"><a href="/about" class="nav-link">О нас</a></li>
        <li class="nav-item"><a href="javascript:;" v-link="{ name: 'element' }" class="nav-link">Мои карты</a></li>
        <li class="nav-item"></li>
        <li class="nav-item pull-xs-right"><a href="#" v-link="login" class="nav-link">Войти</a></li>
      </ul>

      <form class="form-inline">
        <input class="form-control" placeholder="Search" type="text">
        <button class="btn btn-secondary-outline" type="submit">Search</button>
      </form>

    </nav>
   </header>
  <router-view keep-alive></router-view>
</div>
</template>

<script>

import store from "./storage/store";
import BaseMap from "./components/BaseMap.vue";
import angleSwitcher from "./directives/angle-switcher";

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
    };
  },
  methods: {
  }
};

</script>

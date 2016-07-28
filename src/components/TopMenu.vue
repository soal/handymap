<template lang="html">
  <header id="top-menu">
    <div id="brand" class="fixed-logo">
      <a href="javascript" v-link="{ name: 'main' }" id="logo" class="main-logo label label-danger">{{ title.short }}</a>
      <a v-angle-switcher="menuShowed" v-bind:showed="menuShowed"></a>
    </div>
    <nav v-show="menuShowed" class="navbar navbar-dark bg-primary">
      <ul class="nav navbar-nav">
        <li class="nav-item"><a href="/about" class="nav-link">О нас</a></li>
        <li class="nav-item"><a href="javascript:;" v-link="{ path: 'second_punic_war' }" class="nav-link">Мои карты</a></li>
        <li class="nav-item pull-xs-right"><a href="#" v-link="login" class="nav-link">Войти</a></li>
      </ul>

      <form class="form-inline">
        <input class="form-control" placeholder="Search" type="text">
        <button class="btn btn-secondary-outline" type="submit">Search</button>
      </form>

    </nav>
</template>

<script>
import angleSwitcher from "../directives/angle-switcher";

export default {
  name: "TopMenu",
  data: () => {
    return {
      menuShowed: true
    };
  },
  vuex: {
    getters: {
      title: state => state.title
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
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

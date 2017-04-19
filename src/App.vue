<template>
  <div id="hf" class="container-fluid">
    <top-bar></top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopBar from './TopBar.vue';

export default {
  name: 'App',
  components: {
    TopBar
  },

  methods: {
    clearMap() {
      this.$store.commit('setCurrentElement', null);
    }
  }
};
</script>

<style lang="scss">
  @import "~mapbox-gl/dist/mapbox-gl.css";
  @import "~bootstrap/dist/css/bootstrap.css";
  @import "~bootstrap-vue/dist/bootstrap-vue.css";

  html {
    overflow: auto;
  }
  // a {
  //   &:hover {
  //     cursor: pointer;
  //   }
  // }
  a.mapboxgl-ctrl-logo {
    display: none;
  }
  #hf {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .navbar {
    z-index: 2;

    h1, h2, nav, button {
      display: inline-block;
      line-height: 1em;
    }

    h1, h2 {
      border: none;
      font-weight: normal;
    }
    h1 {
      font-size: 20px;
      margin-top: 16px;
    }
    h2 {
      font-size: 16px;
    }

    a {
      color: #fff;
      text-decoration: none;
    }
  }


  // ul {
  //   list-style-type: none;
  //   padding: 0;
  // }

  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>

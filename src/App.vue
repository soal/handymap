<template>
  <div id="hf" class="container-fluid">
    <div class="row">
      <b-navbar toggleable fixed type="inverse" variant="primary" class="col">
        <b-nav-toggle target="nav_collapse"></b-nav-toggle>
        <b-link class="navbar-brand" to="#">
          <span>{{ title }}</span>
          <router-link :to="{ name: 'view_map' }" v-if="$route.name === 'intro'">Map</router-link>
          <router-link :to="{ name: 'intro' }" v-else>Intro</router-link>
        </b-link>
        <b-collapse is-nav id="nav_collapse" v-if="$route.name !== 'intro'">
          <b-nav is-nav-bar>
            <b-nav-item>
              <router-link :to="{ name: 'element', params: { id: 1 } }">Rome</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'element', params: { id: 7 } }">Carthago</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{ name: 'scenario', params: { id: 1 } }">Second Punic War</router-link>
            </b-nav-item>
            <b-nav-item>
              <b-button size="sm" variant="secondary" @click="clearMap()">Clear map</b-button>
            </b-nav-item>
          </b-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  computed: mapState({
    title: "title",
    shortTitle: "shortTitle"
  }),

  methods: {
    clearMap() {
      this.$store.commit("setCurrentElement", null);
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

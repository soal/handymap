// const Vue = require("vue"),
//       store = require("./vuex/store"),
//       Main = require("./components/main");
//
//
import Vue from "vue";
import store from "./vuex/store";
import Main from "./components/main.vue";

new Vue({
  el: "#app",
  store,
  components: { Main }
});
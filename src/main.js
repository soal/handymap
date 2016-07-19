import Vue from "vue";
import {sync} from "vuex-router-sync";
import localforage from "localforage";

import store from "./storage/store";
import router from "./router";
import App from "./App.vue";

Vue.config.debug = true;

localforage.config({
  driver: [localforage.INDEXEDDB,
           localforage.WEBSQL,
           localforage.LOCALSTORAGE],
  name: "handymap"
});
sync(store, router);

router.start(App, "app");

window.Vue = Vue;

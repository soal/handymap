import Vue from "vue";
import { sync } from "vuex-router-sync";
import localforage from "localforage";

import store from "./storage/store";
import router from "./router";
import App from "./app.vue";

Vue.config.debug = true;

localforage.setDriver([localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE]);

sync(store, router);

router.start(App, "#app");

window.Vue = Vue;

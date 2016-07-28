import Vue from "vue";
import {sync} from "vuex-router-sync";

import store from "./vuex/store";
import router from "./router";
import dataService from "./storage/dataService";
import App from "./App.vue";

// import SmartArray from "./lib/smartArray";

// console.log(SmartArray);

Vue.config.debug = true;
dataService.initWorker();

sync(store, router);

router.start(App, "app");
window.Vue = Vue;


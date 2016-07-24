// import defineUniqueId from "define-uniqueid";
import Vue from "vue";
import {sync} from "vuex-router-sync";

import store from "./storage/store";
import router from "./router";
import dataService from "./services/dataService";
import App from "./App.vue";

// defineUniqueId(Object, {
//   configurable: false,
//   enumerable: false,
//   redefine: true,
//   property: "__uniqueId"
// });
// defineUniqueId(Function, {
//   configurable: false,
//   enumerable: false,
//   redefine: true,
//   property: "__uniqueId"
// });


Vue.config.debug = true;
dataService.initWorker();

sync(store, router);

router.start(App, "app");
window.Vue = Vue;


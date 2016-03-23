import Vue from "vue";
import { sync } from "vuex-router-sync";

import store from "./vuex/store";
import router from "./router";
import App from "./app.vue";


Vue.config.debug = true;
sync(store, router);

router.start(App, "#app");

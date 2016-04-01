import Vue from "vue";
import Router from "vue-router";
import BaseMap from "./components/BaseMap.vue";


Vue.use(Router);

var router = new Router({
  history: true,
  transitionOnLoad: true,
  saveScrollPosition: true
});


router.map({
  "/": {
    component: BaseMap
  }
});
export default router;

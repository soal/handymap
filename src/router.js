import Vue from "vue";
import Router from "vue-router";
import BaseElement from "./components/BaseElement.vue";

Vue.use(Router);

var router = new Router({
  history: true,
  transitionOnLoad: true,
  saveScrollPosition: true
});


router.map({
  "/": {
    name: "main",
    component: BaseElement,
    subRoutes: {
      ":element": {
        name: "element",
        component: BaseElement
      }
    }
  }
});
export default router;

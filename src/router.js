import Vue from "vue";
import Router from "vue-router";
import Layout from "./components/Layout.vue";

Vue.use(Router);

var router = new Router({
  history: true,
  transitionOnLoad: true,
  saveScrollPosition: true
});


router.map({
  "/": {
    name: "main",
    component: Layout,
    subRoutes: {
      ":element": {
        name: "element",
        component: Layout
      }
    }
  }
});
export default router;

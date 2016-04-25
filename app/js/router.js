import Vue from "vue";
import Router from "vue-router";
import BaseMap from "./components/BaseMap.vue";
import InfoBox from "./components/InfoBox.vue";


Vue.use(Router);

var router = new Router({
  history: true,
  transitionOnLoad: true,
  saveScrollPosition: true
});


router.map({
  "/": {
    name: "main",
    component: BaseMap,
    subRoutes: {
      "/": {
        component: {
          template: "<p>Nothing to show yet</p>"
        }
      },
      "fact": {
        name: "fact",
        component: InfoBox
      }
    }
  }
});
export default router;

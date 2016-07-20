import Vue from "vue";
import Router from "vue-router";
import BaseMap from "./components/BaseMap.vue";
import InfoBox from "./components/InfoBox.vue";
import BaseElement from "./components/BaseElement.vue";
import store from "./storage/store";

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
      "/": {
        component: {
          template: "<p>Nothing to show yet</p>"
        }
      },
      ":element": {
        name: "element",
        component: BaseElement,
        subRoutes: {
          "/": {
            component: {
              template: "<p>Nothing to show yet</p>"
            }
          }
        }
      }
    }
  }
});
export default router;

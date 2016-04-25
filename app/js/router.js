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
        // This component will be rendered into Foo's <router-view>
        // when /foo is matched. Using an inline component definition
        // here for convenience.
        component: {
          template: '<p>Default sub view for Foo</p>'
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

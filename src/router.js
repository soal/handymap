import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Intro from "./components/Intro.vue";
import MapViewer from "./components/MapViewer.vue";
import ElementArticle from "./components/infobox/ElementArticle.vue";

const routes = [
  { path: "/",
    name: "intro",
    components: { default: Intro }
  },
  { path: "/map",
    name: "view_map",
    components: { default: MapViewer },
    children: [
      { path: "elements/:id",
        name: "element",
        components: {
          infobox: ElementArticle
        }
      },
      { path: "scenarios/:id",
        name: "scenario",
        components: {
        },
        children: [
          { path: "elements/:id",
            name: "scenario_element",
            components: {}
          }
        ]
      }
    ]
  }
];

export default new VueRouter({
  mode: "history",
  transitionOnLoad: true,
  saveScrollPosition: true,
  routes
});

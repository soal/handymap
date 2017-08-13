import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Intro from './components/Intro.vue'
import MapViewer from './components/MapViewer.vue'
import ElementArticle from './components/infobox/ElementArticle.vue'
import ScenarioBox from './components/infobox/ScenarioBox.vue'

const routes = [
  { path: '/',
    name: 'intro',
    components: { default: Intro }
  },
  { path: '/map',
    name: 'view_map',
    components: { default: MapViewer },
    children: [
      {
        path: 'scenarios/:name',
        name: 'scenario',
        components: {
          infobox: ScenarioBox
        },
        children: [
          {
            path: 'elements/:id',
            name: 'context_element',
            components: {
              infobox: ElementArticle
            }
          }
        ]
      },
      { path: 'elements/:id',
        name: 'element',
        components: {
          infobox: ElementArticle
        }
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  transitionOnLoad: true,
  saveScrollPosition: true,
  routes
})

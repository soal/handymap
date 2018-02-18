import Vue from 'vue'
import VueRouter from 'vue-router'
import MapViewer from '@/views/MapViewer'
import ElementArticle from '@/components/Infobox/ElementArticle'

import RootScenarioBox from '@/views/RootScenario/RootScenarioBox'
import RootScenarioMap from '@/views/RootScenario/RootScenarioMap'
import RootScenarioTimeline from '@/views/RootScenario/RootScenarioTimeline'

import scenarioRoutes from '@/views/Scenario/routes'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    redirect: { name: 'mapView' }
  },
  { path: '/map',
    name: 'mapView',
    components: {
      default: MapViewer
    },
    children: [
      {
        path: '/',
        name: 'rootScenario',
        components: {
          map: RootScenarioMap,
          infobox: RootScenarioBox,
          timeline: RootScenarioTimeline
        }
      },
      ...scenarioRoutes
    ]
  }
  //   children: [
  //     {
  //       path: 'elements/:id',
  //       name: 'context_element',
  //       components: {
  //         infobox: ElementArticle
  //       }
  //     }
  //   ]
  // { path: 'elements/:id',
  //   name: 'element',
  //   components: {
  //     infobox: ElementArticle
  //   }
  // }
]

export default new VueRouter({
  mode: 'history',
  transitionOnLoad: true,
  saveScrollPosition: true,
  routes
})

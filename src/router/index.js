import Vue from 'vue'
import VueRouter from 'vue-router'
import MapViewer from '@/components/MapViewer.vue'
import ElementArticle from '@/components/Infobox/ElementArticle.vue'
import ScenarioBox from '@/components/Infobox/ScenarioBox.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    redirect: { name: 'view_map' }
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

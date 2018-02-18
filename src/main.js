import Vue from 'vue'
import mapboxgl from 'mapbox-gl'
import VueMapbox from 'vue-mapbox'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import router from '@/router'
import store from '@/store'
import App from '@/App'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueMapbox, { mapboxgl })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

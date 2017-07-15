import Vue from 'vue';
import mapboxgl from 'mapbox-gl';
import { sync } from 'vuex-router-sync';
import VueMapbox from 'vue-mapbox';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';

import store from './store';
import router from './router';

import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(VueMapbox, { mapboxgl });

sync(store, router);

const app = new Vue({ // eslint-disable-line no-new, no-unused-vars
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');


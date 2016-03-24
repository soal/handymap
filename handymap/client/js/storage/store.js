import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";
import * as mutationsList from "./mutationTypes";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);
Vue.config.debug = debug;

const store =  new Vuex.Store({
  state: {
    events: [],
    user: {}
  },
  mutations: {
   GET_FACTS(state, data) {
    state.events = data.events;
   }
  },
  modules: {},
  strict: true
});

export default store;
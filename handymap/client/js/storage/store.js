import Vue from "vue";
import Vuex from "vuex";
import * as mutationsList from "./mutationTypes";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);
Vue.config.debug = debug;

const store =  new Vuex.Store({
  state: {
    facts: [],
    user: {}
  },
  mutations: {
    SET_FACTS(state, data) {
      state.facts = data.events;
    },
    SET_FACT(state, data) {
      state.facts[data.id] = data.info;
    }
  },
  modules: {},
  strict: true
});

export default store;

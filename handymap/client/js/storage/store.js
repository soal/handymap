import Vue from "vue";
import Vuex from "vuex";
import * as mutationsList from "./mutationTypes";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);
Vue.config.debug = debug;

const store =  new Vuex.Store({
  state: {
    title: {
      full: "Handymap",
      short: "HM"
    },
    menu: [
      ["About", "/about"]
    ],
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
  strict: debug
});

export default store;

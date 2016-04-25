import Vue from "vue";
import Vuex from "vuex";
import * as M from "./mutationTypes";

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
    [M.SET_FACTS](state, data) {
      state.facts = state.facts.concat(data);
    },
    [M.SET_FACT](state, data) {
      state.facts = state.facts.concat(data);
    }
  },
  modules: {},
  strict: debug
});

export default store;

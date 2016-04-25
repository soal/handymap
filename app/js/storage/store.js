import Vue from "vue";
import Vuex from "vuex";
import localforage from "localforage";
import * as Mut from "./mutationTypes";
import _ from "lodash";

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
    [Mut.SET_FACTS](state, data) {
      state.facts = _.union(state.facts, _.flaten([data]));
    },
    [Mut.SET_FACT](state, data) {
      state.facts = _.union(state.facts, data);
      localforage.setItem(`Fact_${data.id}`, _.flatten([data]));
    }
  },
  modules: {},
  strict: debug
});

export default store;

import Vue from "vue";
import Vuex from "vuex";
import cacheService from "../services/cacheService";
import * as Mut from "./mutationTypes";
import _ from "lodash";
console.log(_)

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
      state.facts = _.unionWith(state.facts, _.flatten([data]), (oldVal, newVal) => oldVal.id === newVal.id);
    },
    [Mut.SET_FACT](state, data) {
      state.facts = _.unionWith(state.facts, _.flatten([data]), (oldVal, newVal) => oldVal.id === newVal.id);
      for (let fact of _.flatten([data])) {
        cacheService.setItem(`Fact_${fact.id}`, fact);
      }
    }
  },
  modules: {},
  strict: debug
});

export default store;

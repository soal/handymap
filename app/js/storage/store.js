import Vue from "vue";
import Vuex from "vuex";
import cacheService from "../services/cacheService";
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
    elements: [],
    user: {}
  },
  mutations: {
    [Mut.SET_ELEMENTS](state, data) {
      state.elements = _.unionWith(state.elements, _.flatten([data]), (oldVal, newVal) => oldVal.id === newVal.id);
    },
    [Mut.SET_ELEMENT](state, data) {
      state.elements = _.unionWith(state.elements, _.flatten([data]), (oldVal, newVal) => oldVal.id === newVal.id);
      for (let element of _.flatten([data])) {
        cacheService.setItem(`Element_${element.id}`, element);
      }
    }
  },
  modules: {},
  strict: debug
});

export default store;

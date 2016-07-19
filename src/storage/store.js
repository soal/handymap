import Vue from "vue";
import Vuex from "vuex";
import cacheService from "../services/cacheService";
import * as Mut from "./mutationTypes";
// import _ from "lodash";

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
    dicts: {},
    currentElement: {},
    defaultElement: null,
    elements: {},
    user: {}
  },
  mutations: {
    [Mut.SET_ELEMENTS](state, data) {
      let newElements = {};
      data.forEach(function(element) { newElements[element.id] = element; });
      state.elements = Object.assign({}, state.elements, newElements);
      cacheService.setItems("Element", data);
    },
    [Mut.SET_ELEMENT](state, data) {
      state.elements = Object.assign({}, state.elements, { [data.id]: data });
      cacheService.setItem("Element", data);
    },
    [Mut.SET_CURRENT_ELEMENT](state, data) {
      state.currentElement = Object.assign({}, data);
    },
    [Mut.SET_DEFAULT_ELEMENT](state, data) {
      state.defaultElement = data;
    },
    [Mut.SET_DICTS](state, data) {
      state.dicts = Object.assign({}, state.dicts, data);
    }
  },
  modules: {},
  strict: debug
});

export default store;

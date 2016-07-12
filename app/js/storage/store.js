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
    currentElement: {},
    elements: {},
    user: {}
  },
  mutations: {
    [Mut.SET_ELEMENTS](state, data) {
      let newElements = {};
      data.forEach((element) => newElements[element.id] = element);
      state.elemelements = Object.assign({}, state.elements, newElements);
    },
    [Mut.SET_ELEMENT](state, data) {
      state.elements = Object.assign({}, state.elements, { [data.id]: data });
      cacheService.setItem(`Element_${data.id}`, data);
    },
    [Mut.SET_CURRENT_ELEMENT](state, data) {
      state.currentElement = Object.assign({}, data);
    }
  },
  modules: {},
  strict: debug
});

export default store;

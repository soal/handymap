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
    dicts: {},
    currentElement: {},
    defaultElement: null,
    elements: [],
    collections: [],
    orderedCollections: [],
    user: {}
  },
  mutations: {
    [Mut.SET_ELEMENTS](state, data) {
      state.elements = _.unionWith(state.elements, data, (currentItem, newItem) => currentItem.id === newItem.id);
      cacheService.setItems("Element", data);
    },
    [Mut.SET_ELEMENT](state, data) {
      let elementToSet = state.elements.find((item) => item.id === data.id);
      if (elementToSet) {
        Object.assign(elementToSet, data);
      } else {
        state.elements.push(data);
      }
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

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
    currentElementId: null,
    defaultElementId: null,
    elements: [],
    collections: [],
    orderedCollections: [],
    user: {}
  },
  mutations: {
    [Mut.SET_ELEMENTS](state, data) {
      state.elements = _.unionWith(state.elements, data, (currentItem, newItem) => currentItem.id === newItem.id);
    },
    [Mut.SET_ELEMENT](state, data) {
      let elementToSet = state.elements.find((item) => item.id === data.id);
      if (elementToSet) {
        Object.assign(elementToSet, data);
      } else {
        state.elements.push(data);
      }
    },
    [Mut.SET_CURRENT_ELEMENT](state, data) {
      state.currentElementId = data.id;
      state.currentElement = Object.assign({}, data);
    },
    [Mut.SET_CURRENT_ELEMENT_ID](state, id) {
      state.currentElementId = id;
    },
    [Mut.SET_DEFAULT_ELEMENT_ID](state, data) {
      state.defaultElementId = data;
    },
    [Mut.SET_DICTS](state, data) {
      state.dicts = Object.assign({}, state.dicts, data);
    }
  },
  modules: {},
  strict: debug
});

export default store;

import Vue from "vue";
import Vuex from "vuex";
import * as Mut from "./mutationTypes";
import unionWith from "lodash/unionWith";
import { Element, Dicts, Search } from "../api/resources";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);
Vue.config.debug = debug;


const dataManager = function({ Element, Dicts, Search }) {
  return store => {
    store.subscribe(mutation => {
      if (mutation.type === "router/ROUTE_CHANGED") {
        if (mutation.payload[0].name === "main") {
          Dicts.get().then(res => {
            store.dispatch("SET_DICTS", res.json());
            store.dispatch("SET_CURRENT_ELEMENT_ID", res.json().default_element);
          });
        }
        if (mutation.payload[0].name === "element") {
          Search.findElements({ name: mutation.payload[0].params.element })
            .then(res => {
              store.dispatch("SET_CURRENT_ELEMENT", res.json());
            });
        }
      }
      if (mutation.type === "SET_CURRENT_ELEMENT_ID") {
        Element.get({ id: mutation.payload[0] }).then(res => {
          store.dispatch("SET_CURRENT_ELEMENT", res.json());
        });
      }
      if (mutation.type === "SET_ELEMENTS_IDS") {

      }

    });
  };
};

const dataManagerPlugin = dataManager({ Element, Dicts, Search });

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
    elementsIds: [],
    user: {}
  },
  mutations: {
    [Mut.SET_ELEMENTS](state, data) {
      state.elements = unionWith(state.elements, data, (currentItem, newItem) => currentItem.id === newItem.id);
    },
    [Mut.SET_ELEMENTS_IDS](state, data) {
      state.elementsIds = data;
    },
    [Mut.SET_ELEMENT_SHAPES](state, data) {
      let elementToSet = state.elements.find((item) => item.id === data.id);
      elementToSet.shapes = [];
      elementToSet.shapes.push(data.shapes);
    },
    [Mut.SET_CURRENT_ELEMENT](state, data) {
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
  plugins: [dataManagerPlugin],
  modules: {},
  strict: debug
});

export default store;

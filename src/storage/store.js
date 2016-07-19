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
    user: {}
  },
  mutations: {
    [Mut.SET_ELEMENTS](state, data) {
      // let newElements = {};
      // data.forEach(function(element) { newElements[element.id] = element; });
      // state.elements = Object.assign({}, state.elements, newElements);
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
      // state.elements = Object.assign({}, state.elements, { [data.id]: data });
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
    // [Mut.SET_ELEMENTS_DEPS](state) {
    //   // TODO: may be it should be in action for using in WebWorker
    //   console.log("DEPS!");
    //   for (let element in state.elements) {
    //     var newElem = state.elements[element];
    //     if (state.elements[element].children_ids) {
    //       console.log(Object.keys(state.elements));
    //       var childrenKeys = Object.keys(state.elements).filter((elem) => {
    //         return newElem.children_ids.map((child) => child.id).includes(elem);
    //       });
    //       newElem.children = [];
    //       console.log(childrenKeys);
    //       childrenKeys.forEach(function(key) {
    //         newElem.children.push(state.elements[key]);
    //       });
    //     }
    //     if (state.elements[element].connections_ids) {
    //       var connectionsKeys = Object.keys(state.elements).filter((elem) => {
    //         return state.elements[element].connections_ids.includes(elem);
    //       });
    //       newElem.connections = [];
    //       connectionsKeys.forEach(function(key) { newElem.connections.push(state.elements[key]); });
    //     }
    //     state.elements[element] = Object.assign({}, newElem);
    //     // element.children = state.elements.filter((elem) => element.children_ids.includes(elem.id));
    //     // element.connections = state.elements.filter((elem) => element.connections_ids.includes(elem.id));
    //   }
    // }
  },
  modules: {},
  strict: debug
});

export default store;

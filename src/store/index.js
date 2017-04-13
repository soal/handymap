import Vue from "vue";
import Vuex from "vuex";

import { DEBUG } from "../config";
import dataHandler from "./dataHandler.js";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";


Vue.use(Vuex);
Vue.config.debug = DEBUG;

export default new Vuex.Store({
  state: {
    title: "HistoryFlow",
    shortTitle: "HF",

    dicts: {},

    rootScenario: { // global context of the project
      name: "",
      rootElement: null,
      info_fields: [],
      start_date: {},
      end_date: {},
      elements_types: [],
      links_types: [],
      additional_ids: [],
      bbox: [],
      step_size: "",
      weight: 1,
      disable_others: false
    },
    activeContext: {
      rootElements: [],
      infoFields: [],
      startDate: {},
      endDate: {},
      elementsTypes: [],
      linksTypes: [],
      additionalElementsIds: [],
      bboxes: [],
      weight: 1,
      disableOthers: false
    },

    scenario: {},
    elements: [],
    selectedElementsIds: [],
    currentElementId: ""

  },
  getters,
  mutations,
  actions,
  plugins: [dataHandler],
  strict: DEBUG
});

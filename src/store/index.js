import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import { DEBUG } from '../config'
import dataHandler from './dataHandler.js'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex)
Vue.config.debug = DEBUG

export default new Vuex.Store({
  state: {
    title: 'HistoryFlow',
    shortTitle: 'HF',

    dicts: {},

    rootScenario: { // global scenario of the project
      context: {}
      // context: {
      //   name: '',
      //   rootElement: null,
      //   info_fields: [],
      //   start_date: {},
      //   end_date: {},
      //   elements_types: [],
      //   links_types: [],
      //   additional_ids: [],
      //   bbox: [],
      //   step_size: '',
      //   weight: 1,
      //   disable_others: false,
      //   dataset: []
      // }
    },
    scenario: {
      contexts: []
    },
    elements: [],
    shapes: [],
    selectedElementsIds: [],
    currentElementId: '',

    timeline: {
      currentDate: moment(),
      startDate: moment('-5000-01-01'),
      endDate: moment(),
      visibleDates: {
        startDate: moment('-5000-01-01'),
        endDate: moment()
      }
    }

  },
  getters,
  mutations,
  actions,
  plugins: [dataHandler],
  strict: DEBUG
})

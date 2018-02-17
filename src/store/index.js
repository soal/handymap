import Vue from 'vue'
import Vuex from 'vuex'

import { DEBUG } from '@/config'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import initialState from '@/store/initialState'

Vue.use(Vuex)
Vue.config.debug = DEBUG

const timelineZooomLevels = {
  hours: {},
  days: {},
  halfMonths: {},
  months: {},
  halfYears: {},
  years: {},
  decades: {},
  halfCenturies: {},
  centuries: {}
}

export default new Vuex.Store({
  state: initialState(),
  getters,
  mutations,
  actions,
  strict: DEBUG
})

import api from '@/api'
import {
  SCENARIO_SET,
  SCENARIO_ROOT_SET,
  ELEMENTS_SET,
  ELEMENTS_SELECT,
  ELEMENTS_SET_CURRENT,
  ELEMENTS_CLEAR,
  REFERENCES_SET,
  SHAPES_ADD_SINGLE,
  SHAPES_ADD,
  SHAPES_CLEAR,
  UI_INFOBOX_SET
} from '@/store/mutationTypes'

export default {
  fetchElement({ commit }, id) {
    return api.element(id)
      .then(res => {
        commit(ELEMENTS_SET, res)
        return res
      })
      .catch(err => console.log(err))
  },

  fetchElements({ commit }, ids) {
    return api.elements(ids)
      .then(elements => {
        commit(ELEMENTS_SET, elements.data)
        return elements.data
      })
  },

  fetchDicts({ commit }) {
    return api.dicts().then(dicts => {
      commit(REFERENCES_SET, dicts)
    })
  },

  fetchRootScenario({ commit }, id) {
    return api.scenario(id).then(rootScenario => {
      commit(SCENARIO_ROOT_SET, rootScenario)
    })
  },

  fetchScenario({ commit, dispatch }, name) {
    return api.scenario(name).then(scenario => {
      scenario.dirty = false
      return scenario
    })
  },

  putScenario({ commit, dispatch }, name) {
    dispatch('fetchScenario', name)
      .then(scenario => {
        let elements = scenario.contexts.map(context => {
          return dispatch('fetchElements', context.dataset)
        })
        Promise.all(elements).then(() => {
          commit(SCENARIO_SET, scenario)
          commit(ELEMENTS_SET_CURRENT, scenario.rootElement)
        })
      })
  },

  fetchShape({ commit }, id) {
    return api.shape(id).then(shape => shape)
  }
}

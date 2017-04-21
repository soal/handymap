import api from '../api';

export default {
  fetchElement({ commit }, id) {
    return api.element(id)
      .then(res => {
        commit('setElements', res);
        return res;
      })
      .catch(err => console.log(err));
  },
  fetchElements({ commit }, ids) {
    return api.elements(ids)
      .then(elements => {
        commit('setElements', elements.data)
        return elements.data;
      });
  },

  fetchDicts({ commit }) {
    return api.dicts().then(dicts => {
      commit('setDicts', dicts)
    });
  },

  fetchRootScenario({ commit }, id) {
    return api.scenario(id).then(rootScenario => {
      commit('setRootScenario', rootScenario);
    });
  },

  fetchScenario({ commit, dispatch }, name) {
    return api.scenario(name).then(scenario => {
      scenario.dirty = false;
      return scenario;
    });
  },

  putScenario({ commit, dispatch }, name) {
    dispatch('fetchScenario', name)
      .then(scenario => {
        let elements = scenario.contexts.map(context => {
          return dispatch('fetchElements', context.dataset)
        });
        Promise.all(elements).then(() => {
          commit('setScenario', scenario)
        });
      });
  },

  fetchContext({ commit }, id) {
    return api.context(id).then(context => commit('addContext', context));
  },

  fetchShape({ commit }, id) {
    return api.shape(id).then(shape => shape);
  }
};


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
    return api.elements(ids).then(elements => commit('setElements', elements.data))
  },

  fetchDicts({ commit }) {
    return api.dicts().then(dicts => {
      commit('setDicts', dicts)
    });
  },

  fetchRootScenario({ commit }, id) {
    return api.scenario(id).then(rootScenario => {
      commit('setRootScenario', rootScenario);
      let scenario = Object.assign({}, rootScenario, { dirty: false, contexts: [rootScenario.context] });
      delete scenario.context;
      commit('setScenario', scenario);
    });
  },
  fetchScenario({ commit }, name) {
    return api.scenario(name).then(scenario => {
      scenario.dirty = false;
      commit('setScenario', scenario)
    });
  },

  fetchContext({ commit }, id) {
    return api.context(id).then(context => commit('addContext', context));
  },

  fetchShape({ commit }, id) {
    return api.shape(id).then(shape => commit('addShape', shape));
  }
};


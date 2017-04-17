import api from '../api';

export default {
  fetchElement({ commit }, id) {
    return api.elements.get(`${id}`)
      .then(res => {
        commit('setElements', res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  },

  fetchCurrentElement({ commit, dispatch }, id) {
    return dispatch('fetchElement', id)
      .then(element => commit('setCurrentElement', element.id));
  },

  fetchScenario({ commit }, id) {
    return api.scenarios.get(`${id}`)
      .then(res => {
        commit('setScenario', res.data);
        return res.data;
      })
      .catch(err => console.log(err));
  },

  fetchCurrentScenario({ commit, dispatch }, id) {
    return dispatch('fetchElement', id)
      .then(element => commit('setCurrentElement', element.id));
  }
};


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
      // debugger
      commit('setDicts', dicts)
    });
  },

  fetchRootContext({ commit }, id) {
    return api.context(id).then(context => commit('setRootContext', context));
  },
  fetchContext({ commit }, id) {
    return api.context(id).then(context => commit('addContext', context));
  },

  fetchShape({ commit }, id) {
    // return api.shape(id).then(shape)
  }
};


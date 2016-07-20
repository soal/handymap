import {Search} from "../api/resources";

// TODO: Search actions
var actions = {
  search({ dispatch }, params, callback=false) {
    return Search.get({ params })
      .then((response) => {
        if (callback) {
          callback({dispatch}, response);
        } else {
          dispatch("SET_SEARCH_RESULTS", (response.data ? response.data : response));
        }
      });
  }
};

export default actions;

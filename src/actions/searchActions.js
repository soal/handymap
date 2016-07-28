import dataService from "../storage/dataService";

var actions = {
  search({ dispatch }, params, callback=false) {
    var answer = dataService.fetch("getSome", "search", params, null, false);
    return answer
      .then(response => {
        if (callback) {
          callback({dispatch}, response);
        } else {
          dispatch("SET_SEARCH_RESULTS", (response.data ? response.data : response));
        }
      },
      err => console.log(err));
  }
};

export default actions;

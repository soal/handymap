/** ElementsActions module */

import {ResourceActions} from "../services/crudService";

var actions = {
  getChildren({dispatch}, element) {
    return this.getElements({ query: { ids: element.children_ids.map((el) => el.id) } });
  },
  getConnections({dispatch}, element) {
    return this.getElements({ query: { ids: element.connections_ids.map((el) => el.id) } });
  },
  getCurrentElementByName({dispatch}, elementName) {
    console.log("TRY_SEARCH: ", elementName);
    if (!this.search) throw new Error("searchActions.search action not found in component. Check for searchActions in component->vuex->actions");
    this.search({ path: ["elements"], query: { name: elementName } },
      function({dispatch}, response) {
        console.log("SEARCH: ", response);
        dispatch("SET_ELEMENT", (response[0].data ? response[0].data : response[0]));
        dispatch("SET_CURRENT_ELEMENT_ID", (response[0].data ? response[0].data.id : response[0].id));
        dispatch("SET_CURRENT_ELEMENT", (response[0].data ? response[0].data : response[0]));
      });
  }
};
actions = new ResourceActions("element", actions).actions;

/** Actions for Element resource including CRUD actions */
export default actions;

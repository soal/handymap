/** ElementsActions module */

import {ResourceActions} from "../services/crudService";
import {Element} from "../api/resources";

var actions = {
  getChildren({dispatch}, element) {
    return this.getElements({ids: element.children_ids.map((el) => el.id)});
  },
  getConnections({dispatch}, element) {
    return this.getElements({ids: element.connections_ids.map((el) => el.id)});
  },
  getCurrentElementByName({dispatch}, elementName) {
    if (!this.search) throw new Error("searchActions.search action not found in component. Check for searchActions in component->vuex->actions");
    return this.search({ dataType: "elements", name: elementName },
      function({dispatch}, response) {
        dispatch("SET_ELEMENT", (response.data ? response.data : response));
        dispatch("SET_CURRENT_ELEMENT_ID", (response.data ? response.data.id : response.id));
        dispatch("SET_CURRENT_ELEMENT", (response.data ? response.data : response));
      });
  }
};
actions = new ResourceActions(Element, "Element", actions).actions;

/** Actions for Element resource including CRUD actions */
export default actions;

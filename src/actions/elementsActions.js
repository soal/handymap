/** ElementsActions module */

import {ResourceActions} from "../services/crudService";
import {Element} from "../api/resources";

var actions = {
  getChildren({dispatch}, element) {
    this.getElements({ids: element.children_ids.map((el) => el.id)});
  },
  getConnections({dispatch}, element) {
    this.getElements({ids: element.connections_ids.map((el) => el.id)});
  }
};
actions = new ResourceActions(Element, "Element", actions).actions;

/** Actions for Element resource including CRUD actions */
export default actions;

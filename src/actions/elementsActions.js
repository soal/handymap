/** ElementsActions module */

import {ResourceActions} from "../services/crudService";
import {Element} from "../api/resources";

var actions = {
  /** Elements actions */
};
actions = new ResourceActions(Element, "Element", actions).actions;

/** Actions for Element resource including CRUD actions */
export default actions;

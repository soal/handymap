/** FactActions module */

import {ResourceActions} from "../services/crudService";
import {Fact} from "../api/resources";

var actions = {
  /** Fact actions */
};
actions = new ResourceActions(Fact, "Fact", actions).actions;

/** Actions for Fact resource including CRUD actions */
export default actions;

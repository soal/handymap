import { Fact } from "../api/resources";
import Crud from "../helpers";

var FactTransport = new Crud(Fact, "Fact");

export default {
  actions: FactTransport.actions
};

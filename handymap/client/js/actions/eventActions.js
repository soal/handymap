import _ from "lodash";
import { Fact } from "../api/resources";
import Crud from "../helpers";

export default new Crud(Fact, "Fact").actions;

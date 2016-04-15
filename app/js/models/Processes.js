import Backbone from "backbone";
import {API_ROOT} from "../config";

const Process = Backbone.Model.extend({
  urlRoot: `${API_ROOT}/processes`,

  defaults: {
    id: null,
    name: "",
    label: ""
  }
});

const ProcessCollection = Backbone.Collection.extend({
  url: `${API_ROOT}/processes`,
  model: Process
});

export {Process, ProcessCollection};

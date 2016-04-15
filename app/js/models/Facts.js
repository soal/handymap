import Backbone from "backbone";
import {API_ROOT} from "../config";

const Fact = Backbone.Model.extend({
  defaults: {
    id: null,
    date: {},
    name: "",
    label: ""
  }
});

const FactsCollection = Backbone.Collection.extend({
  model: Fact,
  url: `${API_ROOT}/facts`,

  initialize() {
    this.fetch();
  }
});

export {Fact, FactsCollection};

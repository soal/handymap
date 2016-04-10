import Backbone from "backbone";
import {API_ROOT} from "../config";

const Fact = Backbone.Model.extend({
  defaults: {
    id: "",
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


const facts = new FactsCollection();

export {Fact, facts};

import Backbone from "backbone";
import {API_ROOT} from "../config";

const Person = Backbone.Model({
  url: `${API_ROOT}/persons/${this.id}`,
  defaults: {
    id: null,
    name: "",
    label: ""
  }
});

const PersonsCollection = Backbone.Collection.extend({
  url: `${API_ROOT}/persons`,
  model: Person
});

export {Person, PersonsCollection};

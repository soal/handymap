import Marionette from "backbone.marionette";
import Backbone from "backbone";
import {API_ROOT} from "../config";

const Fact = Backbone.Model.extend({
  url: `${API_ROOT}/facts`,
  date: {},
  name: "",

  initialize() {
    this.fetch();
  }

});

export default Fact;

import Backbone from "backbone";
import {API_ROOT} from "../config";

const Shape = Backbone.Model({
  url: `${API_ROOT}/shapes/${this.id}`,
  defaults: {
    id: null,
    coordinates: []
  }
});

export {Shape};

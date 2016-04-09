import Marionette from "backbone.marionette";

import Fact from "../models/Fact";
import infoTemplate from "../../templates/info.mustache";

export default Marionette.LayoutView.extend({
  template: (data) => infoTemplate.render(data.facts),
  model: new Fact()
});


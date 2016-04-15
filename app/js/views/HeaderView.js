import Marionette from "backbone.marionette";
import template from "../../templates/header.mustache";



export default Marionette.ItemView.extend({
  template: ()=> template.render(),

  onShow() {
    this.render();
  }
});

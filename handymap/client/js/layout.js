import Marionette from "backbone.marionette";
import template from "../templates/layout.mustache";

import MapView from "./views/MapView";
import HeaderView from "./views/HeaderView";

const Layout =  Marionette.LayoutView.extend({
  el: "#layout",
  template() {
    return template.render();
  },

  regions: {
    header:      "#header",
    map:         "#map",
    timeline:    "#timeline",
    info:        "#info",
    menuOverlay: "#menu-overlay"
  },

  onShow() {
    var mapView = new MapView();
    var headerView = new HeaderView();
    this.showChildView("map", mapView);
    this.showChildView("header", headerView);
  }
});

export default Layout;

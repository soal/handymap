import Marionette from "backbone.marionette";
import template from "../templates/layout.mustache";

import Fact from "./models/Fact";

import MapView from "./views/MapView";
import HeaderView from "./views/HeaderView";
import InfoView from "./views/InfoView";

const Layout =  Marionette.LayoutView.extend({
  el: "#layout",
  template: () => template.render(),

  regions: {
    header:      "#header",
    map:         "#map",
    timeline:    "#timeline",
    info:        "#info",
    menuOverlay: "#menu-overlay"
  },

  onRender() {
    this.mapView = new MapView();
    this.headerView = new HeaderView();
    this.infoView = new InfoView();
  },
  onShow() {
    this.showChildView("map", this.mapView);
    this.showChildView("header", this.headerView);
    this.showChildView("info", this.infoView);
  }
});

export default Layout;

import Backbone from "backbone";
import BackboneNativeView from "backbone.nativeview";

Object.assign(Backbone.View.prototype, BackboneNativeView);
import Marionette from "backbone.marionette";

import Layout from "./layout";

// TODO: for development only
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}

const App = Marionette.Application.extend({
  contailer: "#app",
  initialize() {
    this.layout = new Layout();
    this.layout.render();

    // this.listenTo(routerChannel, {
    //   'before:enter:route' : this.onBeforeEnterRoute,
    //   'enter:route'        : this.onEnterRoute,
    //   'error:route'        : this.onErrorRoute
    // });
  }
});

const app = new App();

app.on("start", function() {
  this.layout.triggerMethod("show");
  Backbone.history.start({ pushState: true, hashChange: false });
});

app.start();


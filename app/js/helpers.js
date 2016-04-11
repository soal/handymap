import Backbone from "backbone";

var backboneSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
  options.headers = {
    "X-Requested-With": "XMLHttpRequest",
    "MimeType": "application/json"
  };
  backboneSync(method, model, options);
};

function unwrap(view) {
  view.$el = view.$el.children();
  view.$el.unwrap();
  view.setElement(view.$el);
}

export {unwrap};
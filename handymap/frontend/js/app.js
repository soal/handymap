var Backbone = require("backbone"),
    Marionette = require("backbone.marionette"),
    testTemplate = require("./templates/testTemplate.mustache")
;

var App = Marionette.Application.extend({
  container: "#app"
});

var app = new App();

app.on("start", function() {
  Backbone.history.start();
});

app.start();

var TestModel = Backbone.Model.extend({

});

app.testModel = new TestModel({
    hello: "Привет",
    mustName: "Иов",
    anotherName: "Иaков"
  });

var TestView = Marionette.ItemView.extend({
  el: "#test-elem",
  template: function(data) {
    return testTemplate.render(data);
  }
});

app.testView = new TestView({ model: app.testModel });
app.testView.render();

module.exports = function() { return app; };

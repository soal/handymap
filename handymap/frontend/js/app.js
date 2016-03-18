Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate, options) {
  return function(data) {
    return Hogan.compile(rawTemplate).render(data);
  };
};


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

// app.testModel.set();

var TestView = Marionette.ItemView.extend({
  el: "#test-elem",
  template: "#test-templ"
});

app.testView = new TestView({ model: app.testModel });
app.testView.render();

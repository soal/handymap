var initialData = {
  items: [
    {assignee: 'Scott', text: 'Write a book about Marionette'},
    {assignee: 'Andrew', text: 'Do some coding'}
  ]
};

var app = new Marionette.Application();

app.on('start', function() {
  Backbone.history.start();
});

app.start();
function unwrap(view) {
  view.$el = view.$el.children();
  view.$el.unwrap();
  view.setElement(view.$el);
}

export {unwrap};
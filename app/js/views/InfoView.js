import Marionette from "backbone.marionette";

import {unwrap} from "../helpers";
import {FactsCollection} from "../models/Facts";
import infoTemplate from "../../templates/info/layout.mustache";

const InfoView = Marionette.ItemView.extend({
  template: (data) => infoTemplate.render(data),
  collection: new FactsCollection(),
  onShow() {
    // this.render();
  },
  collectionEvents: {
    "sync": "collectionUpdated"
    // "update": "collectionUpdated"
  },
  collectionUpdated() {
    this.render();
  },
  onRender() {
    unwrap(this);
  }
});

// const InfoCollectionView = Marionette.CollectionView.extend({
//   template: (data) => infoTemplate.render(data),
//   collection: new Facts(),
//   childView: InfoView,

//   onShow() {
//     this.render();
//   },
//   onRender() {
//       unwrap(this);
//     }
// });

export {InfoView};

const SmartArray = require("../lib/smartArray");
const waterfall = require("async/waterfall");
/**
 * Storage
 */
class Storage {
  constructor() {
    this.elements = new SmartArray([], ["children", "collections", "connections", "orderedCollections"]);
    this.collections = new SmartArray([]);
    this.orderedCollections = new SmartArray([]);
    this.dicts = {};

    this.virtualPaths = params => {
      return [`elements/${params.id}/children`,
              `elements/${params.id}/connections`,
              `elements/${params.id}/collections`,
              `elements/${params.id}/orderedCollections`
             ];
    };
  }
}

const storage = new Storage();

function processOrder({ type, path, query, options, data, orderId }) {
  switch (type) {
    case "get":
      storage.fetch(orderId)({ path, query, options });
      break;
    case "save":
      storage.save(orderId)({ path, options, data });
      break;
    case "delete":
      storage.remove(orderId)({ path });
  }
}


self.onmessage = function(message) {

  var order = {
    type: message.data[0],    // get, save, delete
    path: message.data[1],    // elements/{id}, conllections/{id}
    query: message.data[2],   // query { ids: [1,2,3,4,5] }
    options: message.data[3], // { forceUpdate: true }
    data: message.data[4],    // Data for creating or updating objects
    orderId: message.data[5]  // Id of order
  };
  this.processOrder(order);
};
  // fetch(orderId) {
  //   return function ({ path, query, options }) {
  //     waterfall([
  //       (next) => {

  //       }
  //     ],
  //     function(error, result) {
  //       // TODO: error handling
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         self.postMessage([orderId, result]);
  //       }
  //     });
  //   };
  // }
  // save(orderId) {
  //   return function ({ path, options, data }) {};
  // }
  // remove(orderId) {
  //   return function ({ path }) {};
  // }

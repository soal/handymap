/**
 * @module dataWorker Functions for handling data operations, workin in WebWorker
 */


module.exports = function(self) {
  var localforage = require("localforage");
  var config = require("../config");
  // var values = require("lodash/values");
  var has = require("lodash/has");
  var waterfall = require("async/waterfall");
  var urlService = require("./urlService");

  localforage.config({
    driver: [localforage.INDEXEDDB,
             localforage.WEBSQL,
             localforage.LOCALSTORAGE],
    name: "handymap"
  });

  var resourcesToCache = ["elements", "collections", "ordered_collections"];
  var handlers = {};

  var handlersList = {
    /** Functions for working with IndexedDB | WebSQL | localStorage */
    cacheHandler: {
        /**
         * Get single item from local storage
         *
         * @param   {string | number } id Id of element to get
         * @returns {Promise}
         *
         */
        getItem(id) {
          return localforage.getItem(id);
        },
        /**
         * Get list of items from local storage
         *
         * @param {number[]} keysToGet
         * @returns {Promise}
         */
        getItems(keysToGet) {
          var promises = keysToGet.map((key) => localforage.getItem(key));
          return Promise.all(promises)
            .then(function(result) { return result.filter((item) => item !== null); });
        },

        /**
         * Set single item to local storage
         *
         * @param {string}          type  Type of item, uses to create item id in local storage
         * @param {number | string} item  Item to set
         * @returns
         */
        setItem(type, item) {
          return localforage.setItem(`${type}_${item.id}`, item).then(res => res, err => console.log(err));
        },

        /**
         * Set list of items to local storage
         *
         * @param {string}   type   Type of items, uses to create item id in local storage
         * @param {Object[]} items  List of items to set
         */
        setItems(type, items) {
          for (let item of items) {
            localforage.setItem(`${type}_${item.id}`, item).catch(err => console.log(err));
          }
        },

        /**
         * Remove single from storage by id
         *
         * @param {string}          type  Type of item, uses to create item id in local storage
         * @param {number | string} id    Item id
         */
        removeItem(type, id) {
          localforage.removeItem(`${type}_${id}`);
        },

        /**
         *  Delete all items in local storage
         */
        clearStorage() {
          localforage.clearStorage();
        }
    },

    networkHandler(orderId) {
      return {
        /**
         * Get single item from server or cache by item's id. Call postMessage(response) to send data to main thread
         *
         * @param {Object}  { resource, params, cache }
         * @param {string}  { resource, params, cache }.resource Resource to get. Using as part of url, e.g. "elements" in "/api/elements/2"
         * @param {Object}  { resource, params, cache }.params   Parameters for request. Format: { path: [...params], query: { key: value }
         * @param {Boolean} { resource, params, cache }.cache    Cache policy. If true, items can be taken from browser cache (IndexedDB | WebSQL | localStorage)
         */
        getOne({ resource, params, cache }) {
          /**
           * async waterfall: http://caolan.github.io/async/docs.html#.waterfall. Functions pass they results to callback, and they become arguments for next function in waterfall
           */
          waterfall([
            function(callback) {
              if (cache) {
                handlers.cacheHandler.getItem(params.path.id)
                  .then(cached => {
                    if (cached) {
                      callback(null, cached);
                    } else {
                      callback(null, null);
                    }
                  });
              } else {
                callback(null, null);
              }
            },
            function(cached, callback) {
              if (cached) {
                callback(null, cached);
              } else {
                fetch(`${config.API_ROOT}/${resource}${urlService.processParams(params)}`)
                  .then(response => {
                    var contentType = response.headers.get("content-type");
                    if (contentType.includes("json")) {
                      return response.json();
                    }
                    if (contentType.includes("image" || "pdf")) {
                      return response.blob();
                    }
                    if (contentType.includes("text")) {
                      return response.text();
                    }
                    return response.json();
                  })
                  .then(proceded => {
                    var responseData = proceded.data ? proceded.data : proceded;
                    if (resourcesToCache.includes(resource)) {
                      handlers.cacheHandler.setItem(resource, responseData);
                    }
                    callback(null, proceded);
                  },
                  err => console.log(err));
              }
            }
          ], function(error, result) {
            if (error) {
              console.log(error);
            } else {
              // console.log("BEFORE_POST: ", orderId);
              self.postMessage([orderId, result]);
            }
          });

        },


        /**
         * Get list of items from server or cache, filtered by ids and other params. Call postMessage(response) to send data to main thread
         *
         * @param {Object}  { resource, params, cache }
         * @param {string}  {}.resource Resource to get. Using as part of url, e.g. "elements" in "/api/elements/2"
         * @param {Object}  {}.params   Parameters for request. Format: { path: [...params], query: { key: value }
         * @param {Boolean} {}.cache    Cache policy. If true, items can be taken from browser cache (IndexedDB | WebSQL | localStorage)
         */
        getSome({ resource, params, cache }) {
          // console.log("GET_SOME: ", orderId);
          waterfall([

            function(callback) {
              // console.log("GET_SOME_CACHE_KEYS: ", orderId);
              if (cache && resourcesToCache.includes(resource) && has(params, "query.ids") && params.query.ids.length) {
                localforage.keys((err, keys) => {
                  if (err) callback(err);
                  callback(null, keys);
                });
              } else {
                callback(null, null);
              }
            },
            function (keysFromCache, callback) {
              // console.log("GET_SOME_CACHE: ", orderId);
              if (keysFromCache && keysFromCache.length) {
                var keysToGet = params.query.ids.filter(itemId => keysFromCache.includes(itemId));
                params.query.ids = params.query.ids.filter(itemId => !keysFromCache.includes(itemId));
                handlers.cacheHandler.getItems(keysToGet)
                  .then(cached => {
                    callback(null, cached);
                  },
                  err => console.log(err));
              } else {
                callback(null, null);
              }
            },

            function(cached, callback) {
              // TODO: What if we need filter objects from list of ids by other params?
              // console.log(params.query.ids);
              if (has(params, "query.ids") && !params.query.ids.length) {
                callback(null, cached);
              } else {
                // console.log("GET_SOME_FETCH: ", orderId);
                fetch(`${config.API_ROOT}/${resource}${ urlService.processParams(params) }`)
                  .then(response => {
                    var contentType = response.headers.get("content-type");
                    if (contentType.includes("json")) {
                      return response.json();
                    }
                    if (contentType.includes("image" || "pdf")) {
                      return response.blob();
                    }
                    if (contentType.includes("text")) {
                      return response.text();
                    }
                    return response;
                  })
                  .then(proceded => {
                    let items = [];
                    if (cached) {
                      items = items.concat(cached, proceded.data ? proceded.data : proceded);
                    } else {
                      items = items.concat(proceded.data ? proceded.data : proceded);
                    }
                    if (resourcesToCache.includes(resource)) {
                      handlers.cacheHandler.setItems(resource, items);
                    }
                    callback(null, items);
                  },
                  err => console.log(err));
              }
            }

          ], function(error, result) {
            if (error) {
              // console.log("ERROR!");
              console.log(error);
            } else {
              if (result) {
                // console.log("BEFORE_POST: ", orderId);
                self.postMessage([orderId, result]);
              }
            }
          });
        },

        /**
         * Create item with given type on the server. Call postMessage(response) to send data to main thread
         *
         * @param {Object} { resource, data }
         * @param {string} {}.resource          Resource to set. Using as part of url, e.g. "elements" in "/api/elements/2"
         * @param {Object} {}.data              New item's data
         */
        create({ resource, data }) {},

        /**
         * Update item with given type and id on the server. Call postMessage(response) to send data to main thread
         *
         * @param {Object} { resource, id, data }
         * @param {string} {}.resource          Resource to update. Using as part of url, e.g. "elements" in "/api/elements/2"
         * @param {string | number} {}.id       Item's id
         * @param {Object} {}.data              New item's data
         */
        update({ resource, id, data }) {},

        /**
         * Delete item with given type and id on the server. Call postMessage(response) to send data to main thread
         *
         * @param {Object} { resource, id }
         * @param {string} {}.resource          Resource to delete. Using as part of url, e.g. "elements" in "/api/elements/2"
         * @param {string | number} {}.id       Item's id
         */
        remove({ resource, id }) {}
      };
    },

    depsHandler(orderId) {
      return {};
    }
  };
  // const orders = [];

  function processOrder(order) {
    // console.log("PROCESS: ", order.orderId);
    handlers = {
      cacheHandler: handlersList.cacheHandler,
      networkHandler: handlersList.networkHandler(order.orderId),
      depsHandler: handlersList.depsHandler(order.orderId)
    };
    handlers[order.handler][order.method](order.options);
  }

  // function workCicle() {
  //   var counter = 0;
  //   setTimeout(function() {
  //     while (orders.length) {
  //       orders.forEach(order => {
  //         processOrder(order);
  //         orders.shift();
  //         counter++;
  //         console.log(counter);
  //       });
  //     }
  //   }, 100);
  // }

  self.onmessage = function(message) {
    // console.log(message);
    // orders.push(message);
    var order = {
      handler: message.data[0],
      method: message.data[1],
      options: message.data[2],
      orderId: message.data[3]
    };
    processOrder(order);
  };
  // workCicle();
};

module.exports = function(self) {
  var localforage = require("localforage");
  var config = require("../config");
  var values = require("lodash/values");
  var waterfall = require("async/waterfall");
  var urlService = require("./urlService");

  localforage.config({
    driver: [localforage.INDEXEDDB,
             localforage.WEBSQL,
             localforage.LOCALSTORAGE],
    name: "handymap"
  });

  var resourcesToCache = ["elements", "collections", "ordered_collections"];

  var handlers = {
    cacheHandler: {
      getItem(id) {
        return localforage.getItem(id);
      },

      getItems(keysToGet) {
        var promises = keysToGet.map((key) => localforage.getItem(key));
        return Promise.all(promises)
          .then(function(result) { return result.filter((item) => item !== null); });
      },

      setItem(type, item) {
        return localforage.setItem(`${type}_${item.id}`, item).then(res => res).catch(err => console.log(err));
      },

      setItems(type, items) {
        for (let item of items) {
          localforage.setItem(`${type}_${item.id}`, item).catch(err => console.log(err));
        }
      },

      removeItem(id) {
        localforage.removeItem(id);
      },

      clearStorage() {
        localforage.clearStorage();
      }
    },

    networkHandler: {
      getOne({ resource, params, cache }) {
        /**
         * async waterfall: http://caolan.github.io/async/docs.html#.waterfall. Functions pass they results to callback, and they become arguments for next function in waterfall
         */
        return waterfall([
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
              console.log(`${config.API_ROOT}/${resource}${urlService.processParams(params)}`);
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
                  return response;
                })
                .then(proceded => {
                  var responseData = proceded.data ? proceded.data : proceded;
                  if (resourcesToCache.includes(resource)) {
                    handlers.cacheHandler.setItem(resource, responseData);
                  }
                  callback(null, proceded);
                  return;
                })
              .catch(err => console.log(err));
            }
          }
        ], function(error, result) {
          if (error) {
            console.log(error);
            return false;
          } else {
            self.postMessage(result);
          }
        });

      },


      getSome({ resource, data, cache }) {
        var items = [];
        waterfall([

          function(callback) {
            if (cache && data && values(data.ids).length) {
              var cacheKeys = data.ids.map((key) => `${resource}_${key}`);

              handlers.cacheHandler.getItems(cacheKeys)
                .then(cached => {
                  if (cached.length) {
                    items = items.concat(cached);
                    data.ids = data.ids.filter(
                      itemId => {
                        return !(cached.map((item) => item.id).includes(itemId));
                      });
                    callback(null, data);
                  }
                });
            } else {
              callback(null, data);
            }
          },

          function(data, callback) {
            var dataType = null;
            if (data && data.dataType) {
              dataType = "" + data.dataType;
              delete data.dataType;
            }
            callback(null, data, dataType);
            return;
          },

          function(data, dataType, callback) {
            // console.log(values(data).length);
            // debugger
            if (data && !values(data).length) {
              callback(null, items);
              return;
            }
            var params = urlService.processParams(data);

            fetch(`${config.API_ROOT}/${resource}${ dataType ? "/" + dataType : ""}${ params ? params : ""}`)
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
                items = items.concat(proceded.data ? proceded.data : proceded );
                console.log("ITEMS: ", items);
                if (resourcesToCache.includes(resource)) {
                  handlers.cacheHandler.setItems(resource, items);
                }
                // debugger
                callback(null, items);
              })
              .catch(err => console.log(err));
          }

        ], function(error, result) {
          if (error) {
            console.log(error);
            return false;
          } else {
            self.postMessage(result);
          }
        });

      },

      create({ resource, data }) {},

      update({ resource, id, data }) {},

      remove({ resource, id }) {}
    },

    depsHandler: {

    }
  };

  self.onmessage = function(message) {
    var commands = {
      handler: message.data[0],
      method: message.data[1],
      options: message.data[2]
    };

    handlers[commands.handler][commands.method](commands.options);
  };
};

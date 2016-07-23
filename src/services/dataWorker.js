module.exports = function(self) {
  var localforage = require("localforage");
  var config = require("../config");
  var values = require("lodash/values");

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
        return localforage.setItem(`${type}_${item.id}`, item).then(res => res);
      },

      setItems(type, items) {
        for (let item of items) {
          localforage.setItem(`${type}_${item.id}`, item);
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
      get({ resource, id, data, cache }) {
        var params = null;
        var result = new Promise(resolve => {});
        var items = [];
        if (cache && id) {
          result = handlers.cacheHandler.getItem(`${resource}_${id}`);
        }
        if (cache && !id && data.ids && values(data.ids)) {
          var cacheKeys = data.ids.map((key) => `${resource}_${key}`);
          result = handlers.cacheHandler.getItems(cacheKeys);
        }

        result.then(localData => {
          if (localData && localData.id) {
            return {res: localData, done: true};
          }
          if (localData instanceof Array) {
            items.concat(localData);
            if (items.length) {
              data.ids = data.ids.filter(
                (itemId) => {
                  return !(localData.map((item) => item.id).includes(itemId));
                });
            }
            if (data.ids.length) {
              return { res: items, done: false};
            } else {
              return { res: items, done: true };
            }
          }
          return { res: items, done: false };
        });

        return result.then((answer) => {
          if (!answer || !answer.done) {
            if (data && values(data).length) {
              params = "?";
              Object.keys(data).forEach((key, index) => {
                if (data[key] && data[key].length) {
                  params += `${key}=${data[key] instanceof Array ? data[key].join(",") : data[key]}${ index === data.length - 1 ? "&" : ""}`;
                }
              });
            }
            console.log(`${config.API_ROOT}/${resource}${ id ? "/" + id : ""}${ params ? params : ""}`);
            fetch(`${config.API_ROOT}/${resource}s${ id ? "/" + id : ""}${ params ? params : ""}`)
              .then(response => {
                console.log("PYSH");
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
                console.log("PROCEDDED: ", proceded);
                var responseData = proceded.data ? proceded.data : proceded;
                console.log("RD: ", responseData);
                debugger
                if (responseData instanceof Array) {
                  items.concat(responseData);
                  console.log("RD1: ", responseData);
                  handlers.cacheHandler.setItems(resource, items);
                  return items;
                } else {
                  handlers.cacheHandler.setItem(resource, responseData);

                  console.log("RD2: ", responseData);
                  return responseData;
                }
              })
              .catch(err => err);
          } else {
            return answer.res;
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

    var result = handlers[commands.handler][commands.method](commands.options);

    if (result instanceof Promise) {
      result
        .then(res => {
          console.log("IN WORKER", res);
          self.postMessage(res);
        })
        .catch(err => self.postMessage(err));
    } else {
      postMessage(result);
    }
  };
};

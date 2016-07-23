module.exports = function(self) {
  var localforage = require("localforage");
  var config = require("../config");
  var values = require("lodash/values");

  localforage.config({
    driver: [localforage.INDEXEDDB,
             localforage.WEBSQL,
             localforage.LOCALSTORAGE],
    name: "handymap"
  });

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
        var result = new Promise(() => {});
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
            items = items.concat(localData);
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
            return fetch(`${config.API_ROOT}/${resource}s${ id ? "/" + id : ""}${ params ? params : ""}`)
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
                if (responseData instanceof Array) {
                  items = items.concat(responseData);
                  handlers.cacheHandler.setItems(resource, items);
                  return items;
                } else {
                  handlers.cacheHandler.setItem(resource, responseData);
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
          self.postMessage(res);
        })
        .catch(err => console.log(err));
    } else {
      postMessage(result);
    }
  };
};

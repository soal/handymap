import localforage from "localforage";
// TODO: move here all cache working
export default {
  getItem(type, id) {
    return localforage.getItem(`${type}_${id}`);
  },

  getItems(keysToGet) {
    var promises = keysToGet.map((key) => localforage.getItem(key));
    return Promise.all(promises)
      .then(function(result) { return result.filter((item) => item !== null); });
  },

  setItem(type, item) {
    localforage.setItem(`${type}_${item.id}`, item);
  },

  setItems(type, items) {
    for (let item of items) {
      localforage.setItem(`${type}_${item.id}`, item);
    }
  },

  removeItem(type, id) {
    localforage.removeItem(`${type}_${id}`);
  },

  clearStorage() {
    localforage.clearStorage();
  }
};

import localforage from "localforage";

export default {
  getItem(id) {
    return localforage.getItem(id);
  },

  setItem(key, value) {
    localforage.setItem(key, value);
  },

  removeItem(id) {
    localforage.removeItem(id);
  },

  clearStorage() {
    localforage.clearStorage();
  }
};

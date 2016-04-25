import localforage from "localforage";

export default {
  getItem(id) {
    return localforage.getItem(id);
  },
  setItem() {},
  removeItem() {},
  clearStorage() {}
};

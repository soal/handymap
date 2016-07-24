import workify from "webworkify";

const dataService = {
  /**
   * Initialize worker for handling network requests and processing data
   * @return {Worker} New WebWorker
   */
  initWorker() {
    if (window.Worker) {
      this.worker = workify(require("./dataWorker.js"));
    }
    return this.worker;
  },
  /**
   * Make network request in Data WebWorker
   * @param  {String}  type      type of request: getOne, getSome, create, update, delete
   * @param  {String}  resource  Resource to get. Using as part of url, e.g. "elements" in "/api/elements/2"
   * @param  {Object}  params    Parameters for request. Format: { path: [...params], query: { key: value } }
   * @param  {Object}  data      Data to send on server
   * @param  {Boolean} cache     Cache policy. If true, items can be taken from browser cache (IndexedDB | WebSQL | localStorage)
   * @return {Promise}           Returns Promise that resolves when recieved message from WebWorker
   */
  fetch(type, resource, params={ path: null, query: null }, data, cache=true) {
    var options = {
      resource,
      params,
      data,
      cache
    };

    var worker = this.worker;
    return new Promise((resolve, reject) => {
      worker.postMessage(["networkHandler", `${type}`, options]);
      worker.onmessage = (message) => {
        resolve(message.data);
      };
      worker.onerror = (err) => reject(err);
    });
  }
};

export default dataService;

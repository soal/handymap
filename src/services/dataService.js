import workify from "webworkify";

const dataService = {
  /**
   * Initialize worker for handling network requests and processing data
   * @return {Worker} New WebWorker
   */
  initWorker() {
    if (window.Worker) {
      this.worker = workify(require("./dataWorker.js"));
      // console.log(this.worker);
    }

    this.worker.onmessage = message => {
      console.log("MESSAGE_ID: ", message.data[0]);
      console.log("MESSAGE_BODY: ", message.data[1]);
      var workerEvent = new CustomEvent("dataWorkerMessage", {
        detail: { message }
      });
      document.dispatchEvent(workerEvent);
      // if (message.data[0] === orderId) {
      //   resolve(message.data[1]);
      // }
    };

    this.worker.onerror = error => {
      var workerErrorEvent = new CustomEvent("dataWorkerError", {
        detail: { error }
      });
      document.dispatchEvent(workerErrorEvent);
    };
  },
  /**
   * Make network request in Data WebWorker
   *
   * @param  {string}    type             Type of request: getOne, getSome, create, update, delete
   * @param  {string}    resource         Resource to get. Using as part of url, e.g. "elements" in "/api/elements/2"
   * @param  {Object}    params           Parameters for request. Format: { path: [...params], query: { key: value } }
   * @param  {string[]}  params.path      Parameters for request. Format: { path: [...params], query: { key: value } }
   * @param  {Object}    params.query     Parameters for request. Format: { path: [...params], query: { key: value } }
   * @param  {Object}    data             Data to send on server
   * @param  {Boolean}   cache            Cache policy. If true, items can be taken from browser cache (IndexedDB | WebSQL | localStorage)
   * @return {Promise}                    Returns Promise that resolves when recieved message from WebWorker
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
      let orderId = Math.random().toString(36);
      console.log("ORIGINAL_ORDER_ID: ", orderId);
      worker.postMessage(["networkHandler", `${type}`, options, orderId]);

      document.addEventListener("dataWorkerMessage", (event) => {
        console.log("MESSAGE_IN_PROMISE_ID: ", event.detail.message.data[0]);
        console.log("MESSAGE_IN_PROMISE_BODY: ", event.detail.message.data[1]);
        if (event.detail.message.data[0] === orderId) {
          resolve(event.detail.message.data[1]);
        }
      });
    });
  }
};

export default dataService;

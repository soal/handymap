import workify from "webworkify";

const dataService = {
  initWorker() {
    if (window.Worker) {
      // console.log(workerFunction);
      // var workerBlob = window.URL.createObjectURL(new Blob([workerFunction], { type: "application/javascript" }));
      // console.log(workerBlob);
      this.worker = workify(require("./dataWorker.js"));
      // this.worker = new Worker(workerBlob);
    }
    return this.worker;
  },
  fetch(type, resource, id, data, cache=true) {
    var options = {
      resource,
      id,
      data,
      cache
    };

    var worker = this.worker;
    return new Promise((resolve, reject) => {
      worker.postMessage(["networkHandler", `${type}`, options]);
      worker.onmessage = (result) => {
        return resolve(result.data);
      };
      worker.onerror = (err) => reject(err);
    });
  }
};

export default dataService;

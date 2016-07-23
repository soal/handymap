class WorkerService {
  constructor() {
    this.worker = null;
  }

  initWorker() {
    if (window.Worker) {
      let workerFunction = this.workerProcess.toString();
      workerFunction = workerFunction.substring(workerFunction.indexOf("{") + 1, workerFunction.lastIndexOf("}"));
      this.worker = new Worker(window.URL.createObjectURL(new Blob(workerFunction)));
    }
    return this.worker;
  }

  workerProcess() {
    /**
     * [onmessage description]
     * @param  { Array } message code and data for evalueting in WebWorker. Format: ["function name", "function params", "function definition"]
     * @return { null }
     */
    onmessage = function(message) {

    //   var result = func(data);
    //   if (result instanceof Promise) {
    //     result
    //       .then(res => postMessage(res))
    //       .catch(err => postMessage(err));
    //   } else {
    //     postMessage(func(data));
    //   }
    };
  }

  work(funcName, params, funcDefinition) {
    var worker = this.worker;
    return Promise((resolve) => {
      worker.postMessage({func, data});

      worker.onmessage = (result) => resolve(result);
      worker.onerror = (err) => console.log(err.message);
    });
  }
}

export default new WorkerService();

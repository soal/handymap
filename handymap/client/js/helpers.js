import store from "./storage/store";

var dispatch = store.dispatch;

class Crud {
  constructor(resource, resourceName) {
    this.resource = resource;
    this.resourceName = resourceName;


    function methods(dispatch, resource, resourceName) {
      return {
        get({ dispatch }, id=null, callback=null, replace=false) {
          resource.get({id}).then(
            (res) => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!replace) {
                dispatch(`GET_${id ? resourceName.toUpperCase() : resourceName.toUpperCase() + "S"}`, (res.data ? res.data : res));
              }

            },
            (err) => {
              console.error(err);
            }
          );
        },
        create() {},
        update() {},
        remove() {}
      };
    }
    this.actions = () => methods(dispatch, this.resource, resourceName);
  }
}

export default Crud;
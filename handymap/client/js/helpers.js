import store from "./storage/store";

var dispatch = store.dispatch;

/**
 * @class Crud — helper class that realize common interface for CRUD requests.
 */
class Crud {
  /**
   * Crud constructor
   * @param  {Object} resource     Resource object from vue-resource
   * @param  {String} resourceName Name of the resource
   */
  constructor(resource, resourceName) {
    this.resource = resource;
    this.resourceName = resourceName;


    function methods(dispatch, resource, resourceName) {
      return {
        /**
         * Get data from server
         * @param  {Object}   options.dispatch Service object from Vue
         * @param  {String||Number}   id       Id of odject to get. If not presented, method will return list of objects
         * @param  {Function} callback         Callback for custom behavior, called in success promise callback
         * @param  {Boolean}  replace          If presented, callback will be called and default action canceled. If not, method call dispatch() store method
         * @return {Null}   Null
         */
        get({ dispatch }, id=null, callback=null, replace=false) {
          resource.get({ id }).then(
            res => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!replace) {
                dispatch(`GET_${id ? resourceName.toUpperCase() : resourceName.toUpperCase() + "S"}`, (res.data ? res.data : res));
              }

            },
            err => console.error(err)
          );
        },
        /**
         * Save item to server
         * @param  {Object}   options.dispatch Service object from Vue
         * @param  {String||Number}   id       Id of odject to save.
         * @param  {Object}   item             Data to save.
         * @param  {Function} callback         Callback for custom behavior, called in success promise callback
         * @param  {Boolean}  replace          If presented, callback will be called and default action canceled. If not, method call dispatch() store method
         * @return {Null}   Null
         */
        create({ dispatch }, id=null, item={}, callback=null, replace=false) {
          resource.save({ id, item }).then(
            res => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!replace) {
                dispatch(`CREATE_${resourceName.toUpperCase()}`, (res.data ? res.data : res));
              }
            },
            err => console.error(err)
          );
        },
        /**
         * Save item to server
         * @param  {Object}   options.dispatch Service object from Vue
         * @param  {String||Number}   id       Id of odject to save.
         * @param  {Function} callback         Callback for custom behavior, called in success promise callback
         * @param  {Boolean}  replace          If presented, callback will be called and default action canceled. If not, method call dispatch() store method
         * @return {Null}   Null
         */
        update({ dispatch }, id=null, item={}, callback=null, replace=false) {
          resource.update({ id, item }).then(
            res => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!replace) {
                dispatch(`UPDATE_${resourceName.toUpperCase()}`, (res.data ? res.data : res));
              }
            },
            err => console.error(err)
          );
        },
        /**
         * Delete object from server
         * @param  {Object}   options.dispatch Service object from Vue
         * @param  {String||Number}   id       Id of odject to save.
         * @param  {Function} callback         Callback for custom behavior, called in success promise callback
         * @param  {Boolean}  replace          If presented, callback will be called and default action canceled. If not, method call dispatch() store method
         * @return {Null}     Null
         */
        remove({ dispatch }, id=null, callback=null, replace=false) {
          resource.save({ id }).then(
            res => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!replace) {
                dispatch(`DELETE_${resourceName.toUpperCase()}`, (res.data ? res.data : res));
              }
            },
            err => console.error(err)
          );
        }
      };
    }
    /**
     * Object of initialized Crud methods. Should be called in component
     * @return {Object} Object contains methods for adding to "actions" property of component
     */
    this.actions = () => methods(dispatch, this.resource, resourceName);
  }
}

export default Crud;
/**
 * CRUD service module
 */

import cacheService from "./cacheService";
import store from "../storage/store";

var dispatch = store.dispatch;

/**
 * @class Crud — helper class that realize common interface for CRUD requests.
 * Provides CRUD actions by pattern: "<action> + <Resourse name>" e.g. getFact, updateFact, createFact, removeFact
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


    function methods(dispatch, resource, resoutrailrceName) {
      return {
        /** Get single data elment from server
        * @param  {Object}   options.dispatch Service object from Vue
        * @param  {String||Number}   id       Id of odject to get. If not presented, method will return list of objects
        * @param  {Function} callback         Callback for custom behavior, called in success promise callback
        * @param  {Boolean}  cache            Use cache or not
        * @param  {Boolean}  preventDefaultAcion  If true, callback will be called and default action canceled. If not, method call dispatch() store method
        */
        [`get${resourceName}`]({ dispatch }, id=null, callback=null, cache=true, preventDefaultAcion=false) {

          /**
           * Dispatch mutation event
           * @param {Object||Array}   Response object passed to dispatch function
           */
          function mutate(response) {
            if (callback) {
              response = callback({ dispatch }, response);
            }
            if (!preventDefaultAcion) {
              dispatch(`SET_${resourceName.toUpperCase()}`, (response.data ? response.data : response));
            }
          }

          var result = null;

          if (cache) {
            result = cacheService.getItem(`${resourceName}_${id}`);
          } else {
            result = resource.get({ id });
          }
          result
            .then(cachedItem => {
              if (cachedItem) {
                mutate(cachedItem);
              }
              return cachedItem;
            })
            .then(cachedItem => {
              if (cachedItem == null) {
                resource.get({ id }).then(response => {
                  mutate(response);
                });
              }
            })
            .catch(err => console.log(err));
        },

        /** Get single data elment from server
         * @param  {Object}   options.dispatch        Service object from Vue
         * @param  {Object}   params                  Params for get request {[param_name]: [param_value]}
         * @param  {Function} callback                Callback for custom behavior, called in success promise callback
         * @param  {Boolean}  cache                   Use cache or not
         * @param  {Boolean}  preventDefaultAcion     If true, callback will be called and default action canceled. If not, method call dispatch() store method
         */
        [`get${resourceName}s`]({ dispatch }, params=null, callback=null, cache=true, preventDefaultAcion=false) {
          /**
           * Dispatch mutation event
           * @param {Object||Array}   Response object passed to dispatch function
           */
          function mutate(response) {
            if (!preventDefaultAcion) {
              dispatch(`SET_${resourceName.toUpperCase() + "S"}`, response);
            }
            if (callback) {
              response = callback({ dispatch }, response);
            }
          }

          var items = [];
          // Empty promise for unify code for ids and other params
          var filteredIds = new Promise(() => {});
          var result = null;

          // If we get list of objects by ids and need check cache, we need to do some weird stuff
          if (params.ids) {
            if (cache) {
              // Convert plain ids to ids for in-browser storage, e.g id "1" to "Element_1"
              var cacheKeys = params.ids.map((key) => `${resourceName}_${key}`);
              filteredIds = cacheService.getItems(cacheKeys)
                .then(function(cachedItems) {
                  // Add items from cache
                  items.concat(cachedItems);
                  // Filter list of ids to get from server, removing ids of items we already got from cache
                  params.ids = params.ids.filter(
                    (itemId) => {
                      return !(cachedItems.map((item) => item.id).includes(itemId));
                    })
                    .join(",");
                  return params.ids;
                });
            }
          }
          filteredIds.then(function(ids) {
            result = resource.get({ ids });
            result
              .then(response => {
                // Adding items from server response to items from cache and mutate state
                mutate(items.concat(response.data.data ? response.data.data : response));
                return response;
              })
              .catch(err => console.log(err));
          });
        },
        /**
         * Save item to server
         * @param  {Object}   options.dispatch Service object from Vue
         * @param  {String||Number}   id       Id of odject to save.
         * @param  {Object}   item             Data to save.
         * @param  {Function} callback         Callback for custom behavior, called in success promise callback
         * @param  {Boolean}  preventDefaultAcion          If true, callback will be called and default action canceled. If not, method call dispatch() store method
         */
        [`create${resourceName}`]({ dispatch }, id=null, item={}, callback=null, preventDefaultAcion=false) {
          resource.save({ id, item }).then(
            res => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!preventDefaultAcion) {
                dispatch(`CREATED_${resourceName.toUpperCase()}`, (res.data ? res.data : res));
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
         * @param  {Boolean}  preventDefaultAcion          If true, callback will be called and default action canceled. If not, method call dispatch() store method
         */
        [`update${resourceName}`]({ dispatch }, id=null, item={}, callback=null, preventDefaultAcion=false) {
          resource.update({ id, item }).then(
            res => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!preventDefaultAcion) {
                dispatch(`UPDATED_${resourceName.toUpperCase()}`, (res.data ? res.data : res));
              }
            },
            err => console.error(err)
          );
        },
        /**
         * Delete object from server
         * @param  {Object}   options.dispatch Service object from Vue. In component.actions it pass to function implicitly, so we need it here
         * @param  {String||Number}   id       Id of odject to save.
         * @param  {Function} callback         Callback for custom behavior, called in success promise callback
         * @param  {Boolean}  preventDefaultAcion          If true, callback will be called and default action canceled. If not, method call dispatch() store method
         */
        [`remove${resourceName}`]({ dispatch }, id=null, callback=null, preventDefaultAcion=false) {
          resource.save({ id }).then(
            res => {
              if (callback) {
                res = callback({ dispatch }, res);
              }
              if (!preventDefaultAcion) {
                dispatch(`DELETED_${resourceName.toUpperCase()}`, (res.data ? res.data : res));
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
    this.actions = methods(dispatch, this.resource, this.resourceName);
  }
}

/**
 * Decorator for resource actions. Add CRUD actions to given actions object
 *
 * @class ResourceActions
 * @extends {Crud}
 */
class ResourceActions extends Crud {
  /**
   * Creates an instance of ResourceActions.
   * @param  {api.Resource} resource              Vue-resource Resource object
   * @param  {string}       resourceName          Name of the Resource
   * @param  {Object}       [resourceActions={}]  Object of actions for this resource
   * @return {ResourceActions}                    ResourceActions object
   */
  constructor(resource, resourceName, resourceActions={}) {
    var crud = super(resource, resourceName);
    this.resource = resource;
    this.resourceName = resourceName;
    this.actions = Object.assign(
      crud.actions,
      resourceActions
    );
  }
}

export {Crud, ResourceActions};

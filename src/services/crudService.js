/**
 * CRUD service module
 */
import waterfall from "async/waterfall";

import cacheService from "./cacheService";
import localforage from "localforage";
import urlService from "./urlService";
import store from "../storage/store";
import {resourcesToCache} from "../config";
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


    function methods(dispatch, resource, resourceName) {
      return {
        /** Get single data elment from server
        * @param  {Object}            options.dispatch     Service object from Vue
        * @param  {Object}            params               Parameters for request
        * @param  {string | number}   params.id            Id of object to get
        * @param  {Function}          callback             Callback for custom behavior, called in success promise callback
        * @param  {Boolean}           cache                Use cache or not
        * @param  {Boolean}           preventDefaultAcion  If true, callback will be called and default action canceled. If not, method call dispatch() store method
        */
        [`get${resourceName}`]({ dispatch }, params=null, callback=null, cache=true, preventDefaultAcion=false) {

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
          waterfall([
            function(next) {
              if (cache) {
                cacheService.getItem(resourceName, params.id)
                  .then(cached => {
                    if (cached) {
                      next(null, cached);
                    } else {
                      next(null, null);
                    }
                  });
              } else {
                next(null, null);
              }
            },
            function(cached, next) {
              if (cached) {
                next(null, cached);
              } else {
                resource.get(params).then(response => {
                  var result = response.data ? response.data : response;
                  if (resourcesToCache.includes(resourceName)) {
                    cacheService.setItem(resourceName, result);
                  }
                  next(null, result);
                },
                error => next(error)
                );
              }
            }
          ], function(error, result) {
            if (error) {
              console.log(error);
            } else {
              mutate(result);
            }
          });
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
          waterfall([
            function(next) {
              if (cache && resourcesToCache.includes(resourceName) && params.ids && params.ids.length) {
                localforage.keys((err, keys) => {
                  if (err) {
                    next(err);
                  }
                  next(null, keys);
                });
              } else {
                next(null, null);
              }
            },
            function (keysFromCache, next) {
              if (keysFromCache && keysFromCache.length) {
                params.ids = params.ids.filter(itemId => !keysFromCache.includes(itemId));
                cacheService.getItems(keysFromCache)
                  .then(cached => {
                    next(null, cached);
                  },
                  err => console.log(err));
              } else {
                next(null, null);
              }
            },

            function(cached, next) {
              // TODO: What if we need filter objects from list of ids by other params?
              if (params.ids && !params.ids.length) {
                next(null, cached);
              }

              resource.get(params).then(response => {
                let result = response.data;
                let items = [];
                if (cached) {
                  items = items.concat(cached, result.data ? result.data : result);
                } else {
                  items = items.concat(result.data ? result.data : result);
                }
                if (resourcesToCache.includes(resourceName)) {
                  cacheService.setItems(resourceName, items);
                }
                next(null, items);
              });
            }

          ], function(error, result) {
            if (error) {
              console.log(error);
            } else {
              mutate(result);
            }
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

/** @module urlService  contains utils for converting data to url strings */
import values from "lodash/values";

module.exports = {
  /**
   * Process path params, e.g. "id" in "/elements/{id}"
   * @param  {string[]} pathParams  Params to add in path
   * @return {string}               URL string, starts with slash, no slash in the end
   */
  processPathParams(pathParams) {
    return pathParams.map((param) => `/${param}`).join("");
  },
  /**
   * Create GET query string from data object
   * @param  {Object} queryParams Object to parse { [param name]: [param value] }
   * @return {string}             query string, starts with "?"
   */
  processQueryString(queryParams) {
    return "?" + Object.keys(queryParams).map(key => {
      let value = queryParams[key] instanceof Array ? queryParams[key].join(",") : queryParams[key];
      return `${key}=${value}`;
    }).join("&");
  },

  /**
   * Process params for URL
   * @param  {Object}   paramsObj         Receive Object with URL params
   * @param  {string[]} paramsObj.path    Path params (e.g. "id" in "/elements/{id}")
   * @param  {Object}   paramsObj.query   Params for GET query string
   * @return {string}           Params string for adding to url
   */
  processParams(paramsObj) {
    var urlString = "";
    if (values(paramsObj).length) {
      if (paramsObj.path && paramsObj.path.length) urlString += this.processPathParams(paramsObj.path);
      if (paramsObj.query && values(paramsObj.query).length) urlString += this.processQueryString(paramsObj.query);
    }
    return urlString;
  }
};

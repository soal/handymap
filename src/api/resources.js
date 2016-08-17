/** Resources module. Exports endpoints for REST API */
import Vue from "vue";
import Resource from "vue-resource";
import { API_ROOT } from "../config";

Vue.use(Resource);

Vue.http.options.crossOrigin = true;
// Vue.http.options.xhr = { withCredentials: true };
// Vue.http.headers.common["Access-Control-Allow-Credentials"] = true;
Vue.http.headers.common["X-Requested-With"] = "XMLHttpRequest";
Vue.http.headers.common["MimeType"] = "application/json";

export const Element = Vue.resource(`${API_ROOT}/elements{/id}{/field}`);
export const Collection = Vue.resource(`${API_ROOT}/collections{/id}`);
export const OrderedCollection = Vue.resource(`${API_ROOT}/ordered_collections{/id}`);
export const Shape = Vue.resource(`${API_ROOT}/shapes{/id}`);

export const Search = Vue.resource(`${API_ROOT}/search{/dataType}`, {}, {
  findElements: { method: "GET", url: "${API_ROOT}/search/elements"},
  findCollections: { method: "GET", url: "${API_ROOT}/search/collections"}
});

export const Dicts = Vue.resource(`${API_ROOT}/dicts`);
export const User = Vue.resource(`${API_ROOT}/users{/id}`);
export const Profile = Vue.resource(`${API_ROOT}/profile`);

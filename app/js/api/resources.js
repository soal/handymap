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


/** Fact resource for endpoint 'elements/{id}' */
export const Element = Vue.resource(`${API_ROOT}/elements{/id}`);
// export const Elements = Vue.resource(`${API_ROOT}/elements`);
export const Dict = Vue.resource(`${API_ROOT}/dicts`);
/** User resource resource for endpoint 'users/{id}'*/
export const User = Vue.resource(`${API_ROOT}/users{/id}`);
/** Profile resource for endpoint 'profile'*/
export const Profile = Vue.resource(`${API_ROOT}/profile`);

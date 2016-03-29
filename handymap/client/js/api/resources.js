/** Resources module. Exports endpoints for REST API */
import Vue from "vue";
import Resource from "vue-resource";
import { API_ROOT } from "../config";

Vue.use(Resource);

Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = { withCredentials: true };
Vue.http.headers.common["X-Requested-With"] = "XMLHttpRequest";

/** Fact resource for endpoint 'events/{id}' */
export const Fact = Vue.resource(`${API_ROOT}/events{/id}`);
/** User resource resource for endpoint 'users/{id}'*/
export const User = Vue.resource(`${API_ROOT}/users{/id}`);
/** Profile resource for endpoint 'profile'*/
export const Profile = Vue.resource(`${API_ROOT}/profile`);
/** Process resource for endpoint 'processes/{id}'*/
export const Process = Vue.resource(`${API_ROOT}/processes{/id}`);

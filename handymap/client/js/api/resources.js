import Vue from "vue";
import Resource from "vue-resource";
import { API_ROOT } from "../config";

Vue.use(Resource);

Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = { withCredentials: true };

export const Fact = Vue.resource(`${API_ROOT}/events{/id}`);
export const User = Vue.resource(`${API_ROOT}/users{/id}`);
export const Profile = Vue.resource(`${API_ROOT}/profile`);
export const Process = Vue.resource(`${API_ROOT}/processes{/id}`);
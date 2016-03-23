const Vue = require("vue"),
      Vuex = require("vuex");

Vue.use(Vuex);
Vue.config.debug = true;

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    hello: "Hello from Vue!"
  },
  modules: {},
  strict: debug
});

window.LOG_LEVEL = "DEBUG";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./listeners/authListener";

import "./plugins/vuelidate";
import "./plugins/vue-notification";
import "./plugins/bootstrap-vue";
import "./plugins/amplify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

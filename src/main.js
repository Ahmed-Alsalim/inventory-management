import Vue from "vue";
import App from "./modules/app";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  store,
  Vuetify,
  render: (h) => h(App),
}).$mount("#app");

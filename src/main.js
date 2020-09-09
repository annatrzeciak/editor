import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import store from "./store/store";

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import Vuex from "vuex";
import coin from "./modules/coin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    coin,
  }
});

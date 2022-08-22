import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import inventory from "../../inventory/store";
import employee from "../../employee/store";
import assignment from "../../assignment/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: { inventory, employee, assignment },
});

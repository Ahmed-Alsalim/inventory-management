import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import inventory from "../modules/inventory/store";
import employee from "../modules/employee/store";
import assignment from "../modules/assignment/store";
import app from "../modules/app/store";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: { inventory, employee, assignment, app },
});

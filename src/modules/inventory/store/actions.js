import axios from "axios";

export default {
  fetchInventory({ commit }) {
    commit("isLoading", true, { root: true });

    axios
      .get("http://192.168.1.116:65111/inventory")
      .then((req) => {
        commit("setInventory", req.data.data);
        commit("isLoading", false, { root: true });
      })
      .catch((e) => console.log(e));
  },

  deleteInventory({ dispatch }, itemList) {
    itemList.forEach((item) => {
      axios
        .delete(`http://192.168.1.116:65111/inventory/${item.id}`)
        .then(() => dispatch("fetchInventory"))
        .catch((e) => console.log(e));
    });
  },

  editInventory({ dispatch }, item) {
    const config = {
      method: "post",
      url: "http://192.168.1.116:65111/inventory",
      data: { inventory: item },
    };
    axios(config)
      .then(() => dispatch("fetchInventory"))
      .catch((e) => console.log(e));
  },
};

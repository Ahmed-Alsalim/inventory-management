import axios from "axios";

export default {
  fetchInventory({ commit }) {
    commit("isLoading", true, { root: true });

    axios
      .get("http://192.168.1.116:65111/inventory")
      .then((req) => commit("setInventory", req.data.data))
      .catch((e) => console.log(e))
      .finally(() => commit("isLoading", false, { root: true }));
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

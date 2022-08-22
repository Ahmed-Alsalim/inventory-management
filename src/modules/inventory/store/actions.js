import axios from "axios";

export default {
  fetchInventory({ commit }) {
    axios
      .get("http://192.168.1.116:65111/inventory")
      .then((req) => commit("setInventory", req.data.data))
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
};

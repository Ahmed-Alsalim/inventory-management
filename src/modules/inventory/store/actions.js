import axios from "axios";

export default {
  fetchInventory({ commit, rootGetters }) {
    const url = rootGetters.databaseUrl;
    commit("isLoading", true, { root: true });

    axios
      .get(`${url}/inventory`)
      .then((req) => commit("setInventory", req.data.data))
      .catch((e) => console.log(e))
      .finally(() => commit("isLoading", false, { root: true }));
  },

  deleteInventory({ dispatch, rootGetters }, itemList) {
    const url = rootGetters.databaseUrl;
    itemList.forEach((item) => {
      axios
        .delete(`${url}/inventory/${item.id}`)
        .then(() => dispatch("fetchInventory"))
        .catch((e) => console.log(e));
    });
  },

  editInventory({ dispatch, rootGetters }, item) {
    const url = rootGetters.databaseUrl;
    const config = {
      method: "post",
      url: `${url}/inventory`,
      data: { inventory: item },
    };
    axios(config)
      .then(() => dispatch("fetchInventory"))
      .catch((e) => console.log(e));
  },

  filterInventory({ getters, commit }, searchTerm) {
    let filteredData = {};
    if (searchTerm) {
      if (getters.searchBoxType === "number") {
        filteredData = getters.inventoryList.filter(
          (item) =>
            item[getters.filterColumn] &&
            item[getters.filterColumn] == searchTerm
        );
      } else {
        filteredData = getters.inventoryList.filter(
          (item) =>
            item[getters.filterColumn] &&
            item[getters.filterColumn]
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }
      commit("setFilteredInventoryList", filteredData);
    } else {
      commit("setFilteredInventoryList", getters.inventoryList);
    }
  },
};

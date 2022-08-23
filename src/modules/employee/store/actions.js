import axios from "axios";

export default {
  fetchEmployee({ commit }) {
    commit("isLoading", true, { root: true });
    axios
      .get("http://192.168.1.116:65111/employee")
      .then((req) => {
        commit("setEmployee", req.data.data);
        commit("isLoading", false, { root: true });
      })
      .catch((e) => console.log(e));
  },

  deleteEmployee({ dispatch }, itemList) {
    itemList.forEach((item) => {
      axios
        .delete(`http://192.168.1.116:65111/employee/${item.id}`)
        .then(() => dispatch("fetchEmployee"))
        .catch((e) => console.log(e));
    });
  },

  editEmployee({ dispatch }, item) {
    const config = {
      method: "post",
      url: "http://192.168.1.116:65111/employee",
      data: { employee: item },
    };
    axios(config)
      .then(() => dispatch("fetchEmployee"))
      .catch((e) => console.log(e));
  },
};

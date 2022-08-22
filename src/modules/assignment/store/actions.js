import axios from "axios";

export default {
  fetchAssignment({ commit }) {
    axios
      .get("http://192.168.1.116:65111/assignment/current")
      .then((req) => commit("setAssignment", req.data.data))
      .catch((e) => console.log(e));
  },

  deleteAssignment({ dispatch }, itemList) {
    itemList.forEach((item) => {
      axios
        .delete(`http://192.168.1.116:65111/assignment/${item.id}`)
        .then(() => dispatch("fetchAssignment"))
        .catch((e) => console.log(e));
    });
  },
};

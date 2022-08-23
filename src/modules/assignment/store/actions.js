import axios from "axios";

export default {
  fetchAssignment({ commit }) {
    commit("isLoading", true, { root: true });
    axios
      .get("http://192.168.1.116:65111/assignment/current")
      .then((req) => {
        commit("setAssignment", req.data.data);
        commit("isLoading", false, { root: true });
      })
      .catch((e) => console.log(e));
  },

  returnAssignment({ dispatch }, assignmentList) {
    assignmentList.forEach((assignment) => {
      const config = {
        method: "post",
        url: "http://192.168.1.116:65111/assignment",
        data: { assignment: { inventoryId: [assignment.inventory.id] } },
      };
      axios(config)
        .then(() => dispatch("fetchAssignment"))
        .catch((e) => console.log(e));
    });
  },

  addAssignment({ dispatch }, assignment) {
    const config = {
      method: "post",
      url: "http://192.168.1.116:65111/assignment",
      data: { assignment: assignment },
    };
    axios(config)
      .then(() => dispatch("fetchAssignment"))
      .catch((e) => {
        console.log(e);
        alert("Quota exceeded");
      });
  },
};

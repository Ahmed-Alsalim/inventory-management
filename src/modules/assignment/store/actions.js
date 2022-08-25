import axios from "axios";

export default {
  fetchAssignment({ commit, getters, rootGetters }) {
    const current = getters.showCurrentAssignments ? "current" : "";
    const url = rootGetters.databaseUrl;
    commit("isLoading", true, { root: true });
    axios
      .get(`${url}/assignment/${current}`)
      .then((req) => commit("setAssignment", req.data.data))
      .catch((e) => console.log(e))
      .finally(() => commit("isLoading", false, { root: true }));
  },

  returnAssignment({ dispatch, rootGetters }, assignmentList) {
    const url = rootGetters.databaseUrl;

    assignmentList.forEach((assignment) => {
      const config = {
        method: "post",
        url: `${url}/assignment`,
        data: { assignment: { inventoryId: [assignment.inventory.id] } },
      };
      axios(config)
        .then(() => dispatch("fetchAssignment"))
        .catch((e) => console.log(e));
    });
  },

  addAssignment({ dispatch, rootGetters }, assignment) {
    const url = rootGetters.databaseUrl;
    const config = {
      method: "post",
      url: `${url}/assignment`,
      data: { assignment: assignment },
    };
    axios(config)
      .then(() => dispatch("fetchAssignment"))
      .catch((e) => {
        console.log(e);
        alert("Quota exceeded");
      });
  },
  toggleCurrentAssignments({ commit, dispatch, getters }) {
    commit("toggleCurrentAssignments", !getters.showCurrentAssignments);
    dispatch("fetchAssignment");
  },

  filterAssignment({ getters, commit }, searchTerm) {
    let filteredData = {};
    if (searchTerm) {
      if (getters.searchBoxType === "number") {
        filteredData = getters.assignmentList.filter(
          (item) =>
            item[getters.filterColumn] &&
            item[getters.filterColumn] == searchTerm
        );
      } else {
        filteredData = getters.assignmentList.filter((item) => {
          if (typeof item[getters.filterColumn] === "object") {
            return item[getters.filterColumn].translatedName
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          } else {
            return (
              item[getters.filterColumn] &&
              item[getters.filterColumn]
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            );
          }
        });
      }
      commit("setFilteredAssignmentList", filteredData);
    } else {
      commit("setFilteredAssignmentList", getters.assignmentList);
    }
  },
};

export default {
  assignmentList(state) {
    return state.assignmentList;
  },
  assignmentHeaders() {
    return [
      { text: "id", value: "id", type: "number" },
      { text: "Employee Name", value: "employee", type: "text" },
      { text: "Inventory Name", value: "inventory", type: "text" },
      { text: "Start Date", value: "startDate", type: "date" },
      {
        text: "Previous Employee id",
        value: "beforeEmployeeId",
        type: "number",
      },
    ];
  },
  showCurrentAssignments(state) {
    return state.showCurrentAssignments;
  },
  filterColumn(state) {
    return state.filterColumn;
  },
  filteredAssignmentList(state) {
    return state.filteredAssignmentList;
  },
  searchBoxType(_, getters) {
    const column = getters.assignmentHeaders.find(
      (inv) => inv.value == getters.filterColumn
    );
    if (column) {
      return column.type;
    }
    return "text";
  },
  tableItem: () => (data) => {
    if (data && typeof data === "object") {
      return data.translatedName;
    } else if (typeof data === "string" && data.match(/.*T.*Z$/)) {
      return `${data.slice(0, 10)} ${data.slice(11, 16)}`;
    }
    return data;
  },
};

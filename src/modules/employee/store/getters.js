export default {
  employeeList(state) {
    return state.employeeList;
  },
  employeeHeaders() {
    return [
      { text: "id", value: "id", type: "number" },
      { text: "Name", value: "name", type: "text" },
      { text: "Title", value: "title", type: "text" },
      { text: "Department", value: "department", type: "text" },
    ];
  },
  filterColumn(state) {
    return state.filterColumn;
  },
  filteredEmployeeList(state) {
    return state.filteredEmployeeList;
  },
  searchBoxType(_, getters) {
    const column = getters.employeeHeaders.find(
      (inv) => inv.value == getters.filterColumn
    );
    if (column) {
      return column.type;
    }
    return "text";
  },
};

export default {
  employeeList(state) {
    return state.employeeList;
  },
  employeeHeaders(state) {
    return state.employeeHeaders;
  },
  filterColumn(state) {
    return state.filterColumn;
  },
  filteredEmployeeList(state) {
    return state.filteredEmployeeList;
  },
  searchBoxType(getters) {
    const column = getters.employeeHeaders.find(
      (inv) => inv.value == getters.filterColumn
    );
    if (column) {
      return column.type;
    }
    return "text";
  },
};

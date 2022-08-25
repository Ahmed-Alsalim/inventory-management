export default {
  setEmployee(state, data) {
    state.employeeList = data;
    state.filteredEmployeeList = data;
  },
  setFilterColumn(state, column) {
    state.filterColumn = column;
  },
  setFilteredEmployeeList(state, filteredData) {
    state.filteredEmployeeList = filteredData;
  },
};

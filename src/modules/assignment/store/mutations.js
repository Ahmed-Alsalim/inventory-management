export default {
  setAssignment(state, data) {
    state.assignmentList = data;
    state.filteredAssignmentList = data;
  },
  toggleCurrentAssignments(state, val) {
    state.showCurrentAssignments = val;
  },
  setFilterColumn(state, column) {
    state.filterColumn = column;
  },
  setFilteredAssignmentList(state, filteredData) {
    state.filteredAssignmentList = filteredData;
  },
};

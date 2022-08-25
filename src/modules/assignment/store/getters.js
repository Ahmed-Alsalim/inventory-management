export default {
  assignmentList(state) {
    return state.assignmentList;
  },
  assignmentHeaders(state) {
    return state.assignmentHeaders;
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
  searchBoxType(getters) {
    const column = getters.assignmentHeaders.find(
      (inv) => inv.value == getters.filterColumn
    );
    if (column) {
      return column.type;
    }
    return "text";
  },
};

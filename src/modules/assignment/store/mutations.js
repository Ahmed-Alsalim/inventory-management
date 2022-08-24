export default {
  setAssignment(state, data) {
    state.assignmentList = data;
  },
  toggleCurrentAssignments(state, val) {
    state.showCurrentAssignments = val;
  },
};

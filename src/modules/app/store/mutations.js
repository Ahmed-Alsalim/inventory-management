export default {
  changeCurrentTable(state, newTable) {
    state.currentTableName = newTable;
  },
  isLoading(state, val) {
    state.isLoading = val;
  },
};

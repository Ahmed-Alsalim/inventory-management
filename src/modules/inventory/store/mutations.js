export default {
  setInventory(state, data) {
    state.inventoryList = data;
    state.filteredInventoryList = data;
  },
  setFilterColumn(state, column) {
    state.filterColumn = column;
  },
  setFilteredInventoryList(state, filteredData) {
    state.filteredInventoryList = filteredData;
  },
};

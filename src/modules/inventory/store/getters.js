export default {
  inventoryList(state) {
    return state.inventoryList;
  },
  inventoryHeaders(state) {
    return state.inventoryHeaders;
  },
  filteredInventoryList(state) {
    return state.filteredInventoryList;
  },
  filterColumn(state) {
    return state.filterColumn;
  },
  searchBoxType(getters) {
    const column = getters.inventoryHeaders.find(
      (inv) => inv.value == getters.filterColumn
    );
    if (column) {
      return column.type;
    }
    return "text";
  },
};

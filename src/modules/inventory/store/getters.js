export default {
  inventoryList(state) {
    return state.inventoryList;
  },
  inventoryHeaders() {
    return [
      { text: "id", value: "id", type: "number" },
      { text: "Title", value: "title", type: "text" },
      { text: "Serial Number", value: "serialNumber", type: "text" },
      { text: "Start Date", value: "startDate", type: "date" },
      { text: "End Date", value: "endDate", type: "date" },
    ];
  },
  filteredInventoryList(state) {
    return state.filteredInventoryList;
  },
  filterColumn(state) {
    return state.filterColumn;
  },
  searchBoxType(_, getters) {
    const column = getters.inventoryHeaders.find(
      (inv) => inv.value == getters.filterColumn
    );
    if (column) {
      return column.type;
    }
    return "text";
  },
  tableItem: () => (data) => {
    if (typeof data === "string" && data.match(/.*T.*Z$/)) {
      return `${data.slice(0, 10)} ${data.slice(11, 16)}`;
    }
    return data;
  },

  searchAll(state) {
    return state.searchAll;
  },
};

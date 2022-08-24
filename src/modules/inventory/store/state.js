export default () => ({
  inventoryList: [],
  inventoryHeaders: [
    { text: "id", value: "id", type: "number" },
    { text: "Title", value: "title", type: "text" },
    { text: "Serial Number", value: "serialNumber", type: "number" },
    { text: "Start Date", value: "startDate", type: "datetime" },
    { text: "End Date", value: "endDate", type: "datetime" },
  ],
  filterColumn: "",
  filteredInventoryList: [],
});

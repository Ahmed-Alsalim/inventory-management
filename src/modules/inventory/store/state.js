export default () => ({
  inventoryList: [],
  inventoryHeaders: [
    { text: "id", value: "id", type: "number" },
    { text: "Title", value: "title", type: "text" },
    { text: "Serial Number", value: "serialNumber", type: "text" },
    { text: "Start Date", value: "startDate", type: "date" },
    { text: "End Date", value: "endDate", type: "date" },
  ],
  filterColumn: "",
  filteredInventoryList: [],
});

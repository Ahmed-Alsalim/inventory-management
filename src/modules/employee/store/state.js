export default () => ({
  employeeList: [],
  employeeHeaders: [
    { text: "id", value: "id", type: "number" },
    { text: "Name", value: "name", type: "text" },
    { text: "Title", value: "title", type: "text" },
    { text: "Department", value: "department", type: "text" },
  ],
  filterColumn: "",
  filteredEmployeeList: [],
});

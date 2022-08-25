export default () => ({
  assignmentList: [],
  assignmentHeaders: [
    { text: "id", value: "id", type: "number" },
    { text: "Employee Name", value: "employee", type: "text" },
    { text: "Inventory", value: "inventory", type: "text" },
    { text: "Start Date", value: "startDate", type: "date" },
    {
      text: "Previous Employee id",
      value: "beforeEmployeeId",
      type: "number",
    },
  ],
  showCurrentAssignments: true,
  filterColumn: "",
  filteredAssignmentList: [],
});

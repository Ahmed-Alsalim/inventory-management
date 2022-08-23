<script>
import BaseBtn from "@/shared/BaseBtn.vue";
import { mapGetters, mapActions } from "vuex";
import EmployeeDialog from "./employeeDialog.vue";
export default {
  components: { BaseBtn, EmployeeDialog },

  data() {
    return {
      dialog: false,
      editedItem: {},
      selected: [],
      dialogType: "",
    };
  },

  computed: {
    ...mapGetters("employee", ["employeeList", "employeeHeaders"]),
  },

  methods: {
    ...mapActions("employee", [
      "fetchEmployee",
      "editEmployee",
      "deleteEmployee",
    ]),

    submitItem(item) {
      this.editEmployee(item);
    },
    tableItem(data) {
      if (data) {
        if (typeof data === "string" && data.match(/.*T.*Z$/)) {
          return `${data.slice(0, 10)} ${data.slice(11, 16)}`;
        }
        return data;
      }
    },
    addItem() {
      this.dialogType = "Add";
      this.dialog = true;
    },
    editItem(item) {
      const data = this.employeeList;
      this.editedItem = data.filter((tableItem) => item.id === tableItem.id)[0];
      this.dialogType = "Edit";
      this.dialog = true;
    },
    deleteItem(itemList) {
      if (confirm("Are you sure you want to delete the choosen item/s?")) {
        this.deleteEmployee(itemList);
      }
    },
  },
  watch: {
    dialog(show) {
      if (!show) {
        this.dialogType = "";
        this.editedItem = {};
      }
    },
  },

  created() {
    this.fetchEmployee();
  },
};
</script>

<template>
  <div>
    <v-sheet color="grey lighten-3" class="mx-auto">
      <v-card-actions>
        <base-btn color="primary" icon="add" title="add" @click="addItem" />
        <base-btn
          color="red"
          icon="delete"
          title="delete"
          @click="deleteItem(selected)"
        />
        <v-spacer />
        <base-btn
          color="black"
          icon="refresh"
          title="refresh"
          @click="fetchEmployee"
        />
      </v-card-actions>
    </v-sheet>
    <hr />

    <v-toolbar flat color="white">
      <v-toolbar-title>Employee</v-toolbar-title>
      <v-divider class="mx-2" inset vertical />
      <v-spacer />
      <employee-dialog
        v-model="dialog"
        :item="editedItem"
        :dialogType="dialogType"
        @submit="submitItem"
      />
    </v-toolbar>

    <v-data-table
      :headers="employeeHeaders"
      :items="employeeList"
      v-model="selected"
      class="elevation-1"
      select-all
      :rows-per-page-items="['10']"
    >
      <template v-slot:items="props">
        <tr>
          <td>
            <v-checkbox
              :input-value="props.selected"
              hide-details
              @click.native="props.selected = !props.selected"
            />
          </td>
          <td v-for="header in employeeHeaders" :key="header.value">
            {{ tableItem(props.item[header.value]) }}
          </td>
          <td>
            <v-icon small class="mr-2" @click="editItem(props.item)">
              edit
            </v-icon>
            <v-icon small @click="deleteItem([props.item])"> delete </v-icon>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchEmployee">Reload</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style></style>

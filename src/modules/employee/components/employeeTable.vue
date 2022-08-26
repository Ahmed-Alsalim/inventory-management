<script>
import BaseBtn from "@/shared/BaseBtn.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import EmployeeDialog from "./employeeDialog.vue";
export default {
  components: { BaseBtn, EmployeeDialog },

  data() {
    return {
      dialog: false,
      editedItem: {},
      selected: [],
      dialogType: "",
      search: "",
    };
  },

  computed: {
    ...mapGetters("employee", [
      "employeeList",
      "employeeHeaders",
      "filterColumn",
      "searchBoxType",
      "filteredEmployeeList",
    ]),
    ...mapGetters("app", ["isLoading"]),
  },

  methods: {
    ...mapActions("employee", [
      "fetchEmployee",
      "editEmployee",
      "deleteEmployee",
      "filterEmployee",
    ]),
    ...mapMutations("employee", ["setFilterColumn"]),

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
    employeeList() {
      this.filterEmployee(this.search);
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
        <base-btn
          color="primary"
          icon="add"
          title="add"
          flat
          @click="addItem"
        />
        <base-btn
          color="red"
          icon="delete"
          title="delete"
          flat
          @click="deleteItem(selected)"
        />
        <v-spacer />

        <v-form @submit.prevent="filterEmployee(search)">
          <v-layout>
            <v-flex md4>
              <v-select
                :items="employeeHeaders"
                @change="setFilterColumn"
                label="Column to filter"
              />
            </v-flex>
            <v-flex md1 />
            <v-flex md4>
              <v-text-field
                v-model="search"
                label="Search"
                :type="searchBoxType"
                single-line
                hide-details
              />
            </v-flex>
            <base-btn color="primary" type="submit" icon="search" />
          </v-layout>
        </v-form>
        <v-spacer />
        <base-btn
          color="black"
          icon="refresh"
          title="refresh"
          flat
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
      :items="filteredEmployeeList"
      v-model="selected"
      class="elevation-1"
      select-all
      :rows-per-page-items="['10']"
      :loading="isLoading"
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

<style scoped>
.v-select {
  margin: 0, 20px, 0, 20px;
}
</style>

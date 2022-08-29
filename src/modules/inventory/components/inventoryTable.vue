<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import BaseBtn from "@/shared/BaseBtn.vue";
import InventoryDialog from "./inventoryDialog.vue";

export default {
  components: { BaseBtn, InventoryDialog },

  data() {
    return {
      dialog: false,
      editedItem: {},
      selected: [],
      dialogType: "",
      search: "",
      searchAll: "",
    };
  },

  computed: {
    ...mapGetters("inventory", [
      "inventoryList",
      "inventoryHeaders",
      "filteredInventoryList",
      "filterColumn",
      "searchBoxType",
      "tableItem",
    ]),
    ...mapGetters("app", ["isLoading"]),

    inventoryFilterHeaders() {
      const x = this.inventoryHeaders;
      x.unshift({ text: "All", value: "all" });
      return x;
    },
  },

  methods: {
    ...mapActions("inventory", [
      "fetchInventory",
      "editInventory",
      "deleteInventory",
      "filterInventory",
    ]),
    ...mapMutations("inventory", ["setFilterColumn"]),

    submitItem(item) {
      this.editInventory(item);
    },

    addItem() {
      this.dialogType = "Add";
      this.dialog = true;
    },
    editItem(item) {
      const data = this.inventoryList;
      this.editedItem = data.find((tableItem) => item.id === tableItem.id);
      this.dialogType = "Edit";
      this.dialog = true;
    },
    deleteItem(itemList) {
      if (confirm("Are you sure you want to delete the choosen item/s?")) {
        this.deleteInventory(itemList);
      }
    },

    filterTable() {
      if (this.filterColumn === "all") {
        this.filterInventory("");
        this.searchAll = this.search;
      } else {
        this.filterInventory(this.search);
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

    inventoryList() {
      this.filterInventory(this.search);
    },
  },

  created() {
    this.fetchInventory();
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

        <v-form @submit.prevent="filterTable()">
          <v-layout>
            <v-flex md4>
              <v-select
                :items="inventoryFilterHeaders"
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
                clearable
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
          @click="fetchInventory"
        />
      </v-card-actions>
    </v-sheet>
    <hr />

    <v-toolbar flat color="white">
      <v-toolbar-title>Inventory</v-toolbar-title>
      <v-divider class="mx-2" inset vertical />
      <v-spacer />
      <inventory-dialog
        v-model="dialog"
        :item="editedItem"
        :dialogType="dialogType"
        @submit="submitItem"
      />
    </v-toolbar>

    <v-data-table
      :headers="inventoryHeaders"
      :items="filteredInventoryList"
      v-model="selected"
      class="elevation-1"
      select-all
      :rows-per-page-items="['10']"
      :loading="isLoading"
      :search="searchAll"
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
          <td v-for="header in inventoryHeaders" :key="header.value">
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
        <v-btn color="primary" @click="fetchInventory">Reload</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>
.v-select {
  margin: 0, 20px, 0, 20px;
}
</style>

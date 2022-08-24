<script>
import BaseBtn from "@/shared/BaseBtn.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
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
    };
  },

  computed: {
    ...mapGetters("inventory", [
      "inventoryList",
      "inventoryHeaders",
      "filteredInventoryList",
    ]),
    ...mapGetters(["isLoading"]),
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
      const data = this.inventoryList;
      this.editedItem = data.filter((tableItem) => item.id === tableItem.id)[0];
      this.dialogType = "Edit";
      this.dialog = true;
    },
    deleteItem(itemList) {
      if (confirm("Are you sure you want to delete the choosen item/s?")) {
        this.deleteInventory(itemList);
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
    this.fetchInventory();
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
        <v-select
          :items="inventoryHeaders"
          @change="setFilterColumn"
          label="dropdown"
        ></v-select>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          @input="filterInventory"
        ></v-text-field>

        <base-btn
          color="black"
          icon="refresh"
          title="refresh"
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
      :search="search"
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

<style></style>

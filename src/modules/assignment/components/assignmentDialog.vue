<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: { value: Boolean },

  data() {
    return {
      data: {},
    };
  },

  computed: {
    ...mapGetters("inventory", ["inventoryList"]),
    ...mapGetters("employee", ["employeeList"]),

    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },

  methods: {
    ...mapActions("inventory", ["fetchInventory"]),
    ...mapActions("employee", ["fetchEmployee"]),
    submitItem(data) {
      console.log("submit");
      console.log(data);
      this.$emit("submit", data);
      this.dialog = false;
    },
  },

  watch: {
    dialog(show) {
      if (show) {
        this.data = {};
        this.fetchInventory();
        this.fetchEmployee();
      }
    },
  },
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="30rem" lazy>
    <v-card>
      <v-card-title>
        <span class="headline">Add</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-select
                label="Inventory id"
                v-model="data.inventoryId"
                :items="inventoryList"
                item-text="title"
                item-value="id"
              />
              <v-select
                label="Employee id"
                v-model="data.employeeId"
                :items="employeeList"
                item-text="name"
                item-value="id"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
        <v-btn color="blue darken-1" flat @click="submitItem(data)">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style></style>

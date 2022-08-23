<script>
export default {
  props: { value: Boolean },

  data() {
    return {
      data: {},
    };
  },

  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    dialogFields() {
      return [
        { text: "Employee id", value: "employeeId" },
        { text: "Inventory id", value: "inventoryId" },
      ];
    },
  },

  methods: {
    submitItem(data) {
      console.log("submit");
      console.log(data);
      this.$emit("submit", data);
      this.dialog = false;
    },
    setData(val, def) {
      this.data[def] = val;
    },
  },

  watch: {
    dialog(show) {
      if (show) {
        this.data = {};
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
            <template v-for="field in dialogFields">
              <v-flex :key="field.value" s12 md6>
                <v-text-field
                  :label="field.text"
                  :value="data[field.value]"
                  @input="setData($event, field.value)"
                />
              </v-flex>
            </template>
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

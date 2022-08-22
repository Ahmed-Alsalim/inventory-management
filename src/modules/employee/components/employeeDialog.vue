<script>
export default {
  props: { value: Boolean, item: Object, tableName: String },

  data() {
    return {
      formTitle: "title",
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
        { text: "id", value: "id" },
        { text: "title", value: "title" },
        { text: "Name", value: "name" },
        { text: "Department", value: "department" },
      ];
    },

    headerNames() {
      return this.$store.getters.getHeaders;
    },
  },

  methods: {
    submitItem(data) {
      console.log("submit");
      console.log(data);
      this.dialog = false;
      // this.$emit("submit", data);
    },
    formData(val) {
      return this.data[val];
    },
  },

  watch: {
    dialog(show) {
      if (show) {
        this.data = this.item;
      }
    },
  },
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="30rem" lazy>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <template v-for="field in dialogFields">
              <v-flex :key="field.value" s12 md6>
                <v-text-field
                  :label="field.text"
                  :readonly="field.value === 'id'"
                  :value="formData(field.value)"
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

<script>
export default {
  props: { value: Boolean, item: Object, dialogType: String },

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
      const fields = [
        { text: "title", value: "title" },
        { text: "Name", value: "name" },
        { text: "Department", value: "department" },
      ];
      if (this.dialogType === "Edit") {
        fields.unshift({ text: "id", value: "id", readonly: true });
        return fields;
      }
      return fields;
    },
  },

  methods: {
    submitItem(data) {
      this.$emit("submit", data);
      this.dialog = false;
    },
  },

  watch: {
    dialog(show) {
      if (show) {
        this.data = { ...this.item };
      }
    },
  },
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="30rem" lazy>
    <v-card>
      <v-card-title>
        <span class="headline">{{ dialogType }}</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <template v-for="field in dialogFields">
              <v-flex :key="field.value" s12 md6>
                <v-text-field
                  :label="field.text"
                  :readonly="field.readonly"
                  v-model="data[field.value]"
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

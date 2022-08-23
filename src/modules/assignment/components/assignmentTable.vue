<script>
import BaseBtn from "@/shared/BaseBtn.vue";
import { mapGetters, mapActions } from "vuex";
import AssignmentDialog from "./assignmentDialog.vue";
export default {
  components: { BaseBtn, AssignmentDialog },

  data() {
    return {
      dialog: false,
      editedItem: {},
      selected: [],
      dialogType: "Add",
    };
  },

  computed: {
    ...mapGetters("assignment", ["assignmentList", "assignmentHeaders"]),
  },

  methods: {
    ...mapActions("assignment", [
      "fetchAssignment",
      "addAssignment",
      "returnAssignment",
      "deleteAssignment",
    ]),

    submitItem(item) {
      console.log(item);
      this.addAssignment(item);
    },

    tableItem(data) {
      if (data) {
        if (typeof data === "object") {
          return data.translatedName;
        } else if (typeof data === "string" && data.match(/.*T.*Z$/)) {
          return `${data.slice(0, 10)} ${data.slice(11, 16)}`;
        }
        return data;
      }
    },
    addItem() {
      this.dialog = true;
    },
    returnItem(itemList) {
      if (confirm("Are you sure you want to return the choosen item/s?")) {
        this.returnAssignment(itemList);
      }
    },
  },

  created() {
    this.fetchAssignment();
  },
};
</script>

<template>
  <div>
    <v-sheet color="grey lighten-3" class="mx-auto">
      <v-card-actions>
        <base-btn color="primary" icon="add" title="add" @click="addItem" />
        <base-btn
          color="pink"
          icon="reply"
          title="return"
          @click="returnItem(selected)"
        />
        <v-spacer />
        <base-btn
          color="black"
          icon="refresh"
          title="refresh"
          @click="fetchAssignment"
        />
      </v-card-actions>
    </v-sheet>
    <hr />

    <v-toolbar flat color="white">
      <v-toolbar-title>Assignment</v-toolbar-title>
      <v-divider class="mx-2" inset vertical />
      <v-spacer />
      <assignment-dialog v-model="dialog" @submit="submitItem" />
    </v-toolbar>

    <v-data-table
      :headers="assignmentHeaders"
      :items="assignmentList"
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
          <td v-for="header in assignmentHeaders" :key="header.value">
            {{ tableItem(props.item[header.value]) }}
          </td>
          <td>
            <v-icon
              small
              class="mr-2"
              @click="returnItem([props.item])"
              title="return"
            >
              reply
            </v-icon>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchAssignment">Reload</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<style></style>

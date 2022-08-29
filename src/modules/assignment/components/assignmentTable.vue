<script>
import BaseBtn from "@/shared/BaseBtn.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import AssignmentDialog from "./assignmentDialog.vue";
export default {
  components: { BaseBtn, AssignmentDialog },

  data() {
    return {
      dialog: false,
      editedItem: {},
      selected: [],
      dialogType: "Add",
      search: "",
      switch1: false,
    };
  },

  computed: {
    ...mapGetters("assignment", [
      "assignmentList",
      "assignmentHeaders",
      "showCurrentAssignments",
      "filterColumn",
      "searchBoxType",
      "filteredAssignmentList",
      "tableItem",
    ]),
    ...mapGetters("app", ["isLoading"]),
  },

  methods: {
    ...mapActions("assignment", [
      "fetchAssignment",
      "addAssignment",
      "returnAssignment",
      "deleteAssignment",
      "toggleCurrentAssignments",
      "filterAssignment",
    ]),
    ...mapMutations("assignment", ["setFilterColumn"]),

    submitItem(item) {
      this.addAssignment(item);
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

  watch: {
    assignmentList() {
      this.filterAssignment(this.search);
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
        <base-btn
          color="primary"
          icon="add"
          title="add"
          flat
          @click="addItem"
        />
        <base-btn
          color="pink"
          icon="reply"
          title="return"
          flat
          @click="returnItem(selected)"
        />
        <v-spacer />

        <v-form @submit.prevent="filterAssignment(search)">
          <v-layout>
            <v-flex md4>
              <v-select
                :items="assignmentHeaders"
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

        <v-switch
          :input-value="showCurrentAssignments"
          :label="`View ${
            showCurrentAssignments ? 'Current' : 'All'
          } Assignments`"
          @change="toggleCurrentAssignments"
          height="0px"
        />
        <base-btn
          color="black"
          icon="refresh"
          title="refresh"
          flat
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
      :items="filteredAssignmentList"
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

<style scoped>
.v-select {
  margin: 0, 20px, 0, 20px;
}
</style>

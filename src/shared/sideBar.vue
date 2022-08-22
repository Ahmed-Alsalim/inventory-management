<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Inventory", icon: "inventory", tableName: "Inventory" },
        { title: "Employees", icon: "assignment_ind", tableName: "Employee" },
        {
          title: "Assignment",
          icon: "assignment_turned_in",
          tableName: "Assignment",
        },
      ],
      right: null,
    };
  },
  methods: {
    ...mapMutations(["changeCurrentTable"]),
  },
};
</script>

<template>
  <v-navigation-drawer permanent width="170px">
    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="changeCurrentTable(item.tableName)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<style></style>

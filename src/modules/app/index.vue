<script>
import NavBar from "@/shared/navBar.vue";
import SideBar from "@/shared/sideBar.vue";
import inventory from "../inventory";
import { mapGetters } from "vuex";
import employee from "../employee";
import Assignment from "../assignment";
export default {
  name: "App",
  components: { inventory, SideBar, NavBar, employee, Assignment },
  computed: {
    ...mapGetters(["currentTableName"]),
  },
};
</script>

<template>
  <v-app>
    <nav-bar />
    <v-layout>
      <side-bar />
      <v-flex class="content">
        <inventory v-if="currentTableName === 'Inventory'" />
        <employee v-else-if="currentTableName === 'Employee'" />
        <assignment v-else-if="currentTableName === 'Assignment'" />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<style>
.content {
  padding: 1rem;
}
</style>

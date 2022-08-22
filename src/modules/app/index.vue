<script>
import NavBar from "@/shared/navBar.vue";
import SideBar from "@/shared/sideBar.vue";
import inventory from "../inventory";
import { mapGetters } from "vuex";
import employee from "../employee";
export default {
  name: "App",
  components: { inventory, SideBar, NavBar, employee },
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
      <inventory v-if="currentTableName === 'Inventory'" id="inventory" />
      <employee v-else-if="currentTableName === 'Employee'" />
    </v-layout>
  </v-app>
</template>

<style>
#inventory {
  padding: 1rem;
}
</style>

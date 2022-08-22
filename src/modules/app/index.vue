<script>
import NavBar from "@/shared/navBar.vue";
import SideBar from "@/shared/sideBar.vue";
import inventory from "../inventory";
export default {
  name: "App",
  components: { inventory, SideBar, NavBar },
};
</script>

<template>
  <v-app>
    <nav-bar />
    <v-layout>
      <side-bar />
      <inventory id="inventory" />
    </v-layout>
  </v-app>
</template>

<style>
#inventory {
  padding: 1rem;
}
</style>

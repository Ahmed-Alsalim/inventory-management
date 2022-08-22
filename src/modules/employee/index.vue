<!-- eslint-disable vue/multi-word-component-names -->
<script>
import employeeTable from "./components/employeeTable.vue";
export default {
  components: { employeeTable },
};
</script>

<template>
  <v-flex>
    <v-card>
      <v-sheet>
        <employee-table class="mx-auto" />
      </v-sheet>
    </v-card>
  </v-flex>
</template>

<style></style>

<!-- eslint-disable vue/multi-word-component-names -->
<script>
import assignmentTable from "./components/assignmentTable.vue";
export default {
  components: { assignmentTable },
};
</script>

<template>
  <v-card>
    <v-sheet>
      <assignment-table class="mx-auto" />
    </v-sheet>
  </v-card>
</template>

<style></style>

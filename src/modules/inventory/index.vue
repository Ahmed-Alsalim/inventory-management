<!-- eslint-disable vue/multi-word-component-names -->
<script>
import inventoryTable from "./components/inventoryTable.vue";
export default {
  components: { inventoryTable },
};
</script>

<template>
  <v-card>
    <v-sheet>
      <inventory-table class="mx-auto" />
    </v-sheet>
  </v-card>
</template>

<style></style>

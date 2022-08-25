<template>
  <v-btn :flat="flat" icon :color="color" @click="click">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: String,
    icon: String,
    flat: Boolean,
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style></style>

<template>
  <label class="input-label">
    <em v-if="required">*</em>
    {{ title }}
  </label>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/form";
</style>
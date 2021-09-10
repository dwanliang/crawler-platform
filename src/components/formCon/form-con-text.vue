<template>
  <la-text
    :label="itemFormData.title ? itemFormData.title : '未命名'"
    v-model="itemFormData.value"
    width="50%"
  ></la-text>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
export default {
  props: {
    itemFormData: {
      type: Object,
      default: {},
    },
  },
  mixins: [formMixin],
};
</script>

<style>
</style>
<template>
  <span>
    <la-text
      :label="itemFormData.title ? itemFormData.title : '未命名'"
      v-model="itemFormData.value"
      :placeholder="itemFormData.placeholder"
      :isUpdate="true"
      :required="itemFormData.required"
      :type="+itemFormData.type === 2 ? 'textarea' : ''"
      :width="+itemFormData.type === 2 ? '100%' : '80%'"
    ></la-text>
    <span class="tips">{{ itemFormData.tips }}</span>
  </span>
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

<style lang="scss" scoped>
@import "~@/assets/css/form";
</style>
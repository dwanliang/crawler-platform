<template>
  <la-text
    :label="itemFormData.title ? itemFormData.title : '未命名'"
    v-model="itemFormData.value"
    :placeholder="itemFormData.placeholder"
    :isUpdate="false"
    width="80%"
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

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  width: 100%;
  text-align: left;
}
</style>
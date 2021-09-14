<template>
  <span>
    <la-text
      :label="itemFormData.title ? itemFormData.title : '未命名'"
      v-model="itemFormData.value"
      :placeholder="itemFormData.placeholder"
      :isUpdate="false"
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
/deep/ .el-form-item__label {
  width: 100%;
  text-align: left;
}
.tips {
  line-height: 28px;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
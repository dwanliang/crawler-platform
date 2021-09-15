<template>
  <span>
    <label class="input-label">
      <em v-if="itemFormData.required">*</em>
      {{ itemFormData.title ? itemFormData.title : "未命名" }}
    </label>
    <el-time-picker
      width="50%"
      v-model="itemFormData.value"
      placeholder="默认时间"
    >
    </el-time-picker>
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
/deep/ .el-date-editor.el-input {
  width: 50%;
}
</style>
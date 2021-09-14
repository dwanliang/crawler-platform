<template>
  <span>
    <label class="input-label">
      <em v-if="itemFormData.required">*</em>
      {{ itemFormData.title ? itemFormData.title : "未命名" }}
    </label>
    <el-radio-group
      :class="itemFormData.direction == 1 ? 'portrait-radio' : ''"
      v-model="itemFormData.optionValue[0]"
      v-if="itemFormData.optionValue"
    >
      <el-radio
        v-for="item in itemFormData.optionList"
        :label="item.id"
        :key="item.id"
        >{{ item.value }}</el-radio
      >
    </el-radio-group>
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
/deep/ .el-form-item__label {
  width: 100%;
  text-align: left;
}
.portrait-radio {
  /deep/ .el-radio {
    width: 100%;
    margin-bottom: 10px;
  }
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
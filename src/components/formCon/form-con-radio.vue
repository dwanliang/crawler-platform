<template>
  <span>
    <label class="input-label">
      <em v-if="itemFormData.required">*</em>
      {{ itemFormData.title ? itemFormData.title : "未命名" }}
    </label>
    <template v-if="itemFormData.optionStyle == 1">
      <el-radio-group
        :class="itemFormData.direction == 1 ? 'portrait-option' : ''"
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
    </template>
    <template v-if="itemFormData.optionStyle == 2">
      <el-select v-model="itemFormData.optionValue[0]" clearable placeholder="请选择">
        <el-option
          v-for="item in itemFormData.optionList"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </template>
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
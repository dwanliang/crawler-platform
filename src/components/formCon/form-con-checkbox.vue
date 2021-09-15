<template>
  <span>
    <label class="input-label">
      <em v-if="itemFormData.required">*</em>
      {{ itemFormData.title ? itemFormData.title : "未命名" }}
    </label>
    <el-checkbox-group
      :class="itemFormData.direction == 1 ? 'portrait-option' : ''"
      v-model="itemFormData.optionValue"
      v-if="itemFormData.optionValue"
    >
      <el-checkbox
        v-for="item in itemFormData.optionList"
        :label="item.id"
        :key="item.id"
        >{{ item.value }}</el-checkbox
      >

    </el-checkbox-group>
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
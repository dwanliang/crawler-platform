<template>
  <span>
    <label class="input-label">
      <em v-if="itemFormData.required">*</em>
      {{ itemFormData.title ? itemFormData.title : "未命名" }}
    </label>
    <template v-if="itemFormData.optionStyle == 1">
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
    </template>
    <template v-if="itemFormData.optionStyle == 2">
      <el-select
        v-model="itemFormData.optionValue"
        clearable
        multiple
        :multiple-limit="
          itemFormData.optionLimit ? itemFormData.optionLimit : 0
        "
        placeholder="请选择"
      >
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
import Bus from "@/assets/js/bus";
export default {
  props: {
    itemFormData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      itemFormDatas: {},
    };
  },
  mixins: [formMixin],
  // watch: {
  //   "itemFormData.optionValue"() {
  //     console.log(this.itemFormDatas);
  //     console.log(this.itemFormData);
  //     if (JSON.stringify(this.itemFormDatas) === JSON.stringify(this.itemFormData)) {
  //       return;
  //     }
  //     // Bus.$emit("setOptionValue", this.itemFormData.optionValue);
  //     this.itemFormDatas = this.deepCopy(this.itemFormData);
  //     // debugger;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/form";
</style>
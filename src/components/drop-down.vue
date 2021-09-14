<template>
  <!-- <el-form-item :label="label"> -->
    <div>
      <label class="input-label" v-if="label">
        <em v-if="required">*</em>
        {{ label }}
        <el-popover
          placement="bottom"
          width="200"
          trigger="click"
          :content="explain"
          v-if="explain"
        >
          <i class="el-icon-question" slot="reference"></i>
        </el-popover>
      </label>
      <el-select
        :style="`width:${width}`"
        v-model="newVal"
        :disabled="disabled"
        :placeholder="label"
        :clearable="yesDel"
      >
        <el-option
          v-for="(item, index) in dropdownList"
          :key="index"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </div>
  <!-- </el-form-item> -->
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    yesDel: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
    },
    value: {
      type: [String, Number],
      default: "",
    },
    dropdownList: {
      type: Array,
      default: [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    explain: {
      type: String,
      default: '',
    },
  },
  watch: {
    newVal(newVal) {
      this.$emit("input", newVal);
    },
  },
  computed: {
    newVal: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/form';
</style>
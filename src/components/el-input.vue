<template>
  <!-- <el-form-item> -->
  <div>
    <label class="input-label" slot="label" v-if="label">
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
    <!-- <el-col :span="8"> -->
    <el-input
      :style="`width: ${width}`"
      v-model="newValue"
      :readonly="!isUpdate"
      :placeholder="placeholderText"
      :autosize="{ minRows: 2}"
      :type="type"
    ></el-input>
  </div>
  <!-- </el-col> -->
  <!-- </el-form-item> -->
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    explain: {
      type: String,
      default: "",
    },
    max: {
      type: Number,
      required: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    width: {
      type: [String, Number],
    },
    isUpdate: {
      type: [Boolean],
      default: true,
    },
    required: {
      type: [Boolean],
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
  },
  mounted() {
    console.log(this.required);
  },
  computed: {
    placeholderText() {
      if (this.isUpdate) {
        let str = this.placeholder ? this.placeholder : this.label;
        return `请输入${str}`;
      } else {
        return this.placeholder;
      }
    },
    newValue: {
      get: function () {
        let value = this.value;
        if (this.value && this.max) {
          value = this.value.substring(0, this.max);
        }
        this.$emit("input", value);
        return value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/form";
/deep/ .el-form-item__label {
  padding: 0 5px 0 0;
}
/deep/ .explain-cont {
  width: 100px;
  display: inline-block;
  vertical-align: middle;
}
/deep/ .el-form-item__label {
  z-index: 999;
  position: relative;
}
</style>
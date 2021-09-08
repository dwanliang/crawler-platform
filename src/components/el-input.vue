<template>
  <el-form-item>
    <span slot="label">
      {{ label }}
      <el-popover
        placement="bottom"
        width="200"
        trigger="click"
        :content="explain"
      >
        <i class="el-icon-question" slot="reference"></i>
      </el-popover>
    </span>

    <!-- <el-col :span="8"> -->
    <el-input
      :style="`width: ${width}`"
      v-model="newValue"
      :placeholder="placeholderText"
    ></el-input>
    <!-- </el-col> -->
  </el-form-item>
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
  },
  computed: {
    placeholderText() {
      let str = this.placeholder ? this.placeholder : this.label;
      return `请输入${str}`;
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
/deep/ .el-form-item__label {
  padding: 0 5px 0 0;
}
/deep/ .explain-cont {
  widows: 100px;
  display: inline-block;
  vertical-align: middle;
}
</style>
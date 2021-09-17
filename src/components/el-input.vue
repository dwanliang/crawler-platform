<template>
  <!-- <el-form-item> -->
  <div :class="['chan-input']">
    <label class="input-label" slot="label" v-if="label">
      <em v-if="rules.require || required">*</em>
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
      v-model="newValue"
      :readonly="!isUpdate"
      :placeholder="placeholderText"
      :autosize="{ minRows: 2 }"
      :type="type"
      :style="`width: ${width}`"
      :class="{'inputRequired': validate.indexOf('空') != -1}"
      @blur="blur"
    ></el-input>
    <!-- <span class="chan-tips">{{ validate }}</span> -->
  </div>
  <!-- </el-col> -->
  <!-- </el-form-item> -->
</template>

<script>
import { Validation } from "@/assets/js/utils";
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
      default: "",
    },
    validate: {
      type: String,
      default: "",
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    
  },
  methods: {
    blur() {
      if (JSON.stringify(this.rules) != "{}") {
        for (let rulesKey in this.rules) {
          var str = Validation[rulesKey](
            this.label,
            this.newValue,
            this.rules[rulesKey]
          );
          let validate = "";
          if (str) {
            validate = str;
          }
          this.$emit("update:validate", validate);
        }
      }
    },
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
.chan-input {
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
  .inputRequired {
    /deep/ .el-input__inner {
      &::-webkit-input-placeholder {
        color: #ee3f3f;
      }
    }
    /deep/ .el-textarea__inner{
      &::-webkit-input-placeholder {
        color: #ee3f3f;
      }
    }
  }
  .chan-tips {
    font-size: 14px;
    color: #ee3f3f;
  }
}
</style>
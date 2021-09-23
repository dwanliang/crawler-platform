<template>
  <div class="with-input">
    <el-checkbox v-model="checkeds"></el-checkbox>
    {{ startText }}
    <el-input-number
      v-model="newValue"
      size="mini"
      :min="min"
      :max="max"
      label="描述文字"
    ></el-input-number>
    {{ endText }}
    <el-popover
      placement="bottom"
      width="200"
      trigger="click"
      :content="explain"
      v-if="explain"
    >
      <i class="el-icon-question" slot="reference"></i>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    startText: {
      type: String,
      default: "",
    },
    endText: {
      type: String,
      default: "",
    },
    value: {
      
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 999999,
    },
    explain: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkeds: this.checked
    }
  },
  computed: {
    newValue: {
      get: function () {
        let value = this.value;
        this.$emit("input", value);
        return value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  },
  watch: {
    checkeds(){
      this.$emit("update:checked", this.checkeds);
    }
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
@import "~@/assets/css/form";
.with-input {
  line-height: 28px;
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  margin-top: 5px;
  /deep/ .explain-cont {
    width: 100px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
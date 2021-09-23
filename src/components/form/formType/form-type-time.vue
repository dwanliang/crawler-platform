<template>
  <div v-if="itemFormData">
    <la-text
      label="提示"
      :explain="explainList.formTips"
      v-model="itemFormData.tips"
    ></la-text>
    <el-form-item label="label">
      <label class="label-Zindex" slot="label">
        默认时间
        <el-popover
          placement="bottom"
          width="200"
          trigger="click"
          :content="explainList.formTime"
        >
          <i class="el-icon-question" slot="reference"></i>
        </el-popover>
      </label>
      <el-time-picker v-model="itemFormData.value" placeholder="默认时间">
      </el-time-picker>
    </el-form-item>
  </div>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
export default {
  data() {
    return {};
  },
  props: {
    itemFormData: {
      type: Object,
      default: {},
    },
  },
  mixins: [formMixin],
  mounted() {},
  methods: {

  },
};
</script>

<style lang="scss" scoped>
  /deep/ .el-date-editor.el-input{
    width: 100%;
  }
  /deep/ .el-form-item__label{
    position: relative;
    z-index: 999;
  }
</style>
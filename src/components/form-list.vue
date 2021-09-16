<template>
  <div
    :class="[
      'form-list',
      { 'fouc-in': itemFlag },
      { 'form-validate': validateFlag},
    ]"
    @click="itemFoucIndex"
  >
    <!-- <span class="form-start">{{ index }}.</span> -->
    <!-- <i class="el-icon-rank form-draggable"></i> -->
    <component
      ref="formContent"
      :is="formContent(itemData.type)"
      :itemFormData="itemData"
    ></component>
    <!-- 下边功能区（start） -->
    <div class="form-chane" v-show="itemFlag">
      <div class="form-copy">
        <el-button
          type="info"
          icon="el-icon-document-copy"
          size="mini"
          circle
          @click.prevent="copy(itemIndex)"
        ></el-button>
      </div>
      <div class="form-del">
        <el-popconfirm title="确定删除吗？" @confirm="del(itemIndex)">
          <el-button
            type="danger"
            :disabled="formDataLength == 1"
            icon="el-icon-delete"
            slot="reference"
            size="mini"
            circle
          ></el-button>
        </el-popconfirm>
      </div>
    </div>
    <!-- 下边功能区（end） -->
  </div>
</template>

<script>
//表单内容动态组件
import formConText from "@/components/formCon/form-con-text"; //单、多行文本框
import formConRadio from "@/components/formCon/form-con-radio"; ////单选框
import formConCheckbox from "@/components/formCon/form-con-checkbox"; ////多选框
import formConTime from "@/components/formCon/form-con-time"; ////时间框
import formConDate from "@/components/formCon/form-con-date"; ////日期框

export default {
  props: {
    itemFlag: {
      type: Boolean,
      default: false,
    },
    itemData: {
      type: Object,
      default: {},
    },
    formDataLength: {
      type: Number,
    },
    itemIndex: {
      type: Number,
    },
    validate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      //表单内容的动态组件数据
      contentTemplate: [
        formConText,
        formConText,
        formConRadio,
        formConCheckbox,
        formConTime,
        formConDate,
      ],
    };
  },
  computed: {
    formContent() {
      return function (type) {
        return this.contentTemplate[type - 1];
      };
    },
    validateFlag() {
      let validate = this.validate;
      for(let i in validate){
        if(validate[i]){
          return true;
        }
      }
      return false
    }
  },
  methods: {
    del() {
      this.$emit("del", this.itemIndex);
    },
    copy() {
      this.$emit("copy", this.itemIndex);
    },
    itemFoucIndex() {
      this.$emit("itemFoucIndex", this.itemIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-list {
  position: relative;
  cursor: pointer;
  padding: 10px;
  background-color: #ffffff;
  min-height: 100px;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
  }
  .form-draggable {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 20px;
    cursor: move;
    z-index: 999;
  }
  .form-chane {
    position: absolute;
    height: 20px;
    width: 50px;
    line-height: 20px;
    right: 40px;
    bottom: -10px;
    z-index: 999;
    .form-del {
      display: inline;
    }
    .form-copy {
      display: inline;
    }
  }
  .form-start {
    position: absolute;
    top: 5px;
    left: 5px;
    color: #866b6bd5;
    font-weight: 600;
  }
}
.fouc-in {
  border: 1px dotted #b3b3b3;
  cursor: grab;
  background-color: #f7f7f7;
}
.form-validate {
  border: 1px dotted #ee3f3f;
}
</style>
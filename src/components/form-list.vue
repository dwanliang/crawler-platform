<template>
  <div class="read-only">
    <div :class="['form-list', { 'fouc-in': itemFlag }]">
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
  },
  methods: {
    del() {
      console.log(itemIndex);
      this.$emit("del", itemIndex);
    },
    add() {
      this.$emit("add");
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
  cursor: grab;
  border: 1px dotted #b3b3b3;
  background-color: #f7f7f7;
}
</style>
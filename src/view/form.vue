<template>
  <!-- <div class="conter"> -->
  <div class="box-card conter">
    <div class="form-content">
      <div class="form-care2">
        <div class="form-list fouc-in">
          <la-text label="标题" v-model="formData.title"></la-text>
          <la-text
            label="简要说明"
            v-model="formData.explain"
            type="textarea"
          ></la-text>
        </div>
        <div class="form-fun">
          <el-button
            type="primary"
            id="add"
            @click="add"
            icon="el-icon-plus"
          ></el-button>
          <el-button type="success" @click="saveForm">保存</el-button>
          <el-button class="preview-button" type="info" @click="preview"
            >预览</el-button
          >
        </div>
      </div>
      <draggable
        v-model="formData.formList"
        chosenClass="chosen"
        forceFallback="true"
        group="people"
        animation="300"
        @start="onStart"
        @end="onEnd"
        class="form-care5"
        id="formList"
      >
        <transition-group>
          <el-form
            :model="item"
            v-for="(item, index) in formData.formList"
            :key="item.id"
            size="mini"
            :class="['demo-form-inline', { 'form-sticky': itemFlag(index) }]"
          >
            <transition name="fade">
              <form-list
                :itemFlag="itemFlag(index)"
                :itemData="item"
                :itemIndex="index"
                :formDataLength="formData.formList.length"
                @del="del"
                @copy="copy"
                @itemFoucIndex="itemFoucIndex"
              ></form-list>
            </transition>
          </el-form>
        </transition-group>
      </draggable>
      <!-- 右侧编辑块（start） -->
      <el-form size="mini" class="form-care3 form-sticky" v-if="itemFormData">
        <div class="form-list fouc-in">
          <!-- <span class="form-start">{{ focusIndex }}.</span> -->
          <dropDown
            label="类型"
            yesDel
            required
            v-model="itemFormData.type"
            :dropdownList="typeList"
          ></dropDown>
          <la-text
            label="标题"
            :explain="explainList.formTitle"
            v-model="itemFormData.title"
            required
          ></la-text>
          <la-text
            label="替换符"
            :explain="explainList.formReplace"
            v-model="itemFormData.replace"
            required
          ></la-text>
          <component
            ref="formType"
            :is="formType"
            :itemFormData.sync="itemFormData"
          ></component>
          <el-switch
            style="margin: 5px 0"
            v-model="itemFormData.required"
            inactive-text="必填"
          >
          </el-switch>
        </div>
      </el-form>
      <!-- 右侧编辑块（end） -->
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
// 切换表单类型的动态组件
import formTypeText from "@/components/formType/form-type-text"; //单、多行文本框
import formTypeRadio from "@/components/formType/form-type-radio"; //单选框
import formTypeCheckbox from "@/components/formType/form-type-checkbox"; //多选框
import formTypeTime from "@/components/formType/form-type-time"; //时间框
import formTypeDate from "@/components/formType/form-type-date"; //日期框

//表单内容动态组件
import formConText from "@/components/formCon/form-con-text"; //单、多行文本框
import formConRadio from "@/components/formCon/form-con-radio"; ////单选框
import formConCheckbox from "@/components/formCon/form-con-checkbox"; ////多选框
import formConTime from "@/components/formCon/form-con-time"; ////时间框
import formConDate from "@/components/formCon/form-con-date"; ////日期框

//组件
import formList from "@/components/form-list";
//js
import formMixin from "@/assets/js/mixins/formMixin";
import FormList from "../components/form-list.vue";

export default {
  components: { FormList },
  mixins: [formMixin],
  data() {
    return {
      id: 1,
      drag: false,
      focusIndex: 0,
      flag: true,
      //切换表单类型的动态组件数据
      typeTemplate: [
        formTypeText,
        formTypeText,
        formTypeRadio,
        formTypeCheckbox,
        formTypeTime,
        formTypeDate,
      ],
      //表单内容的动态组件数据
      contentTemplate: [
        formConText,
        formConText,
        formConRadio,
        formConCheckbox,
        formConTime,
        formConDate,
      ],
      formData: {
        title: "",
        explain: "",
        formList: [
          {
            id: 1,
            replace: "", //替换符
            title: "", //标题
            type: "1", //类型
            value: "2021年09月03日", //默认值
            tips: "", //提示
            placeholder: "", //占位符
            rules: "text",
            required: true,
          },
        ],
      },
    };
  },
  mounted() {
    document.onkeydown = (e) => {
      let key = window.event.keyCode;
      switch (key) {
        case 38:
          this.focusIndex > 0 ? this.focusIndex-- : "";
          break;
        case 40:
          this.focusIndex < this.formData.formList.length - 1
            ? this.focusIndex++
            : "";
          break;
        default:
          return;
      }
    };
  },
  watch: {
    focusIndex() {
      this.flag = false;
    },
    "itemFormData.type": {
      handler(val) {
        if (this.flag) {
          this.initItemForm();
          if (val == 1) {
            this.itemFormData.rules = "text";
          }
        }
        this.flag = true;
      },
    },
  },
  computed: {
    formType() {
      return this.typeTemplate[+this.itemFormData.type - 1];
    },
    // formContent() {
    //   return function (type) {
    //     return this.contentTemplate[type - 1];
    //   };
    // },
    itemFormData: {
      get: function () {
        return this.formData.formList[this.focusIndex];
      },
      set: function (value) {
        // this.formData.formList[this.focusIndex] = value;
        this.$set(this.formData.formList, this.focusIndex, value);
      },
    },
    itemFlag() {
      return function (index) {
        return index == this.focusIndex;
      };
    },
  },
  methods: {
    add() {
      this.formData.formList.push({
        id: ++this.id,
        replace: "", //替换符
        title: "", //标题
        type: "1", //类型
        value: "", //默认值
        tips: "", //提示
        placeholder: "", //占位符
        rules: "text",
        required: true,
      });
      //添加数据自动滚动到最底部
      this.$nextTick(() => {
        var container = this.$el.querySelector("#formList");
        container.scrollTop = container.scrollHeight;
      });
    },
    del(index) {
      if (this.formData.formList.length == 1) {
        if (this.msg) this.msg.close();
        this.msg = this.$message({
          showClose: true,
          message: "至少一条！！！",
          type: "warning",
        });
        return;
      }
      this.formData.formList.splice(index, 1);
      this.focusIndex = 0;
    },
    copy(index) {
      this.formData.formList.splice(index + 1, 0, {
        ...this.formData.formList[index],
        id: ++this.id,
      });
    },
    itemFoucIndex(index) {
      this.focusIndex = index;
    },
    initItemForm() {
      this.itemFormData = {
        ...this.itemFormData,
        replace: "", //替换符
        title: "", //标题
        value: "", //默认值
        tips: "", //提示
        placeholder: "", //占位符
        rules: "",
        required: true,
      };
    },
    saveForm() {
      console.log(this.formData);
    },
    preview() {},
    //开始拖拽事件
    onStart(e) {
      this.drag = true;
      this.focusIndex = e.oldIndex;
      console.log(this.focusIndex);
    },
    //拖拽结束事件
    onEnd(e) {
      this.drag = false;
      this.focusIndex = e.newIndex;
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0 !important;
}
.conter {
  // width: 100%;
  // margin: 0 30px;
  // background-color: #f5f5f9;
  height: calc(100vh - 40px);
  background-color: #f1f1f1 !important;
  .form-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    .form-care2 {
      width: 25%;
      // height: 100%;
      padding: 10px;
      box-shadow: 0 0 5px 0 #a1d9df;
      background-color: #ffffff;
      .form-fun {
        margin-top: 20px;
        button {
          width: 100%;
          margin: 5px 0;
        }
      }
    }
    .form-care5 {
      height: 100%;
      overflow-y: auto;
      width: 45%;
      background-color: #ffffff;
    }
    .form-care3 {
      padding: 10px;
      // height: 100%;
      overflow-y: auto;
      width: 25%;
      // overflow: auto;
      background-color: #fff;
      .form-list {
        // height: calc(100% - 40px);
      }
      // &::-webkit-scrollbar {
      //   display: none;
      // }

      // .preview-button {
      //   width: 100%;
      // }
    }
    .form-sticky {
      position: sticky;
      top: 0px;
      z-index: 999;
    }
    .form-care2,
    .form-care3,
    .form-care5 {
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #707070;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
      }
    }
  }
  .form-fun {
    // width: 200px;
    // margin: 0 auto;
    // display: flex;
    // justify-content: center;
  }
}
/deep/ .el-button--mini.is-circle {
  padding: 3px;
}
.box-card {
  // border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  padding: 20px;
  box-shadow: 0 2px 12px 0 #0000001a;
}
// .form-del {
//   display: inline;
//   position: absolute;
//   height: 20px;
//   line-height: 20px;
//   right: 40px;
//   bottom: -10px;
// }
// .form-copy{
//   display: inline;
//   position: absolute;
//   height: 20px;
//   line-height: 20px;
//   right: 65px;
//   bottom: -10px;
// }

/deep/ .el-card,
.el-message {
  overflow: inherit;
}
/deep/ .el-form-item {
  margin: 5px;
}

.card-del {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
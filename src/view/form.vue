<template>
  <!-- <div class="conter"> -->
  <div class="box-card conter">
    <div class="form-content">
      <draggable
        v-model="formData"
        chosenClass="chosen"
        forceFallback="true"
        group="people"
        animation="300"
        @start="onStart"
        @end="onEnd"
        handle=".form-draggable"
        class="form-care7"
      >
        <transition-group>
          <el-form
            :model="item"
            v-for="(item, index) in formData"
            :key="item.id"
            size="mini"
            :class="['demo-form-inline', { 'form-sticky': itemFlag(index) }]"
          >
            <transition name="fade">
              <div class="read-only" @click="foucItemIndex(index)">
                <el-card
                  :shadow="itemFlag(index) ? 'always' : 'never'"
                  :class="['form-list', { 'fouc-in': itemFlag(index) }]"
                >
                  <span class="form-start">{{ index }}.</span>
                  <i class="el-icon-rank form-draggable"></i>
                  <component
                    ref="formContent"
                    :is="formContent(item.type)"
                    :itemFormData="item"
                  ></component>
                  <!-- 下边功能区（start） -->
                  <div class="form-chane" v-show="itemFlag(index)">
                    <div class="form-copy">
                      <el-button
                        type="info"
                        icon="el-icon-document-copy"
                        size="mini"
                        circle
                        @click="copy(index)"
                      ></el-button>
                    </div>
                    <div class="form-del">
                      <el-popconfirm title="确定删除吗？" @confirm="del(index)">
                        <el-button
                          type="danger"
                          :disabled="formData.length == 1"
                          icon="el-icon-delete"
                          slot="reference"
                          size="mini"
                          circle
                        ></el-button>
                      </el-popconfirm>
                    </div>
                  </div>
                  <!-- 下边功能区（end） -->
                </el-card>
              </div>
            </transition>
          </el-form>
        </transition-group>
      </draggable>
      <!-- 右侧编辑块（start） -->
      <el-form size="mini" class="form-care3 form-sticky" v-if="itemFormData">
        <div class="box-card form-list fouc-in" :hidden="cardHiddn">
          <span class="form-start">{{ focusIndex }}.</span>
          <i class="el-icon-close card-del" @click="cardDel"></i>
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
          <el-switch v-model="itemFormData.required" inactive-text="必填">
          </el-switch>
        </div>
        <el-button class="preview-button" type="info" @click="preview"
          >预览</el-button
        >
      </el-form>
      <!-- 右侧编辑块（end） -->
    </div>
    <div class="form-fun">
      <el-button
        type="primary"
        id="add"
        @click="add"
        icon="el-icon-plus"
      ></el-button>
      <el-button type="success" @click="saveForm">保存</el-button>
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

//js
import formMixin from "@/assets/js/mixins/formMixin";

export default {
  components: {},
  mixins: [formMixin],
  data() {
    return {
      id: 1,
      drag: false,
      focusIndex: -1,
      cardHiddn: false,
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
      contentTemplate: [formConText, formConText, formConRadio],
      formData: [
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
          this.focusIndex < this.formData.length - 1 ? this.focusIndex++ : "";
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
    formContent() {
      return function (type) {
        return this.contentTemplate[type - 1];
      };
    },
    itemFormData: {
      get: function () {
        return this.formData[this.focusIndex];
      },
      set: function (value) {
        // this.formData[this.focusIndex] = value;
        this.$set(this.formData, this.focusIndex, value);
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
      this.formData.push({
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
      this.$nextTick(() => {
        document.getElementById("add").scrollIntoView({
          behavior: "smooth", // 平滑过渡
        });
        // this.$refs.add.scrollTop = this.$refs.content.scrollHeight;
      });
      // console.log("formData", this.formData);
    },
    del(index) {
      if (this.formData.length == 1) {
        if (this.msg) this.msg.close();
        this.msg = this.$message({
          showClose: true,
          message: "至少一条！！！",
          type: "warning",
        });
        return;
      }
      this.formData.splice(index, 1);
      this.focusIndex = -1;
    },
    copy(index) {
      this.formData.splice(index + 1, 0, {
        ...this.formData[index],
        id: ++this.id,
      });
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
    foucItemIndex(index) {
      this.focusIndex = index;
      this.cardHiddn = false;
    },
    saveForm() {
      console.log("submit!");
    },
    cardDel() {
      this.cardHiddn = true;
    },
    preview() {},
    //开始拖拽事件
    onStart(e) {
      this.drag = true;
      this.focusIndex = e.oldIndex;
      console.log(this.formData);
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
  margin: 0;
}
.conter {
  // width: 100%;
  margin: 0 30px;
  background-color: #f5f5f9;
  .form-content {
    width: 100%;
    float: left;
    position: relative;
    .form-care7 {
      width: 60%;
      float: left;
      .form-list {
        margin-bottom: 30px;
        position: relative;
        cursor: pointer;
        padding: 20px;
        background-color: #ffffff;
        // &::after {
        //   content: "";
        //   position: absolute;
        //   left: 0;
        //   top: 0;
        //   width: 100%;
        //   height: 100%;
        //   z-index: 998;
        // }
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
    }
    .form-care3 {
      width: 35%;
      float: right;
      // height: 500px;
      // overflow: auto;
      .fouc-in {
        box-shadow: 0 0 5px 0 #a1d9df;
      }
      .preview-button {
        width: 100%;
      }
    }
    .form-sticky {
      position: sticky;
      top: 10px;
      z-index: 999;
    }
  }
  .form-fun {
    width: 200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}
/deep/ .el-button--mini.is-circle {
  padding: 3px;
}
.box-card {
  border: 1px solid #ebeef5;
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

.form-care3::-webkit-scrollbar {
  display: none;
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
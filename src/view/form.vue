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
            :inline="true"
            :model="item"
            v-for="(item, index) in formData"
            :key="item.id"
            :class="['demo-form-inline', { 'form-sticky': itemFlag(index) }]"
          >
            <transition name="fade">
              <el-card
                :shadow="itemFlag(index) ? 'always' : 'never'"
                :class="['form-list', { 'fouc-in': itemFlag(index) }]"
              >
                <div @click="foucItemIndex(index)">
                  <span class="form-start">{{ index }}.</span>
                  <i class="el-icon-rank form-draggable"></i>
                  <div class="form-chane" v-show="itemFlag(index)">
                    <div class="form-copy">
                      <el-button
                        type="info"
                        icon="el-icon-document-copy"
                        size="mini"
                        circle
                        @click="copy(item)"
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
                </div>
              </el-card>
            </transition>
          </el-form>
        </transition-group>
      </draggable>
      <el-form size="mini" class="form-care3 form-sticky">
        <div class="box-card form-list fouc-in" :hidden="cardHiddn">
          <span class="form-start">{{ focusIndex }}.</span>
          <i class="el-icon-close card-del" @click="cardDel"></i>
          <dropDown
            label="类型"
            yesDel
            v-model="itemFormData.type"
            :dropdownList="typeList"
          ></dropDown>
          <la-text
            label="标题"
            :explain="explainList.formTitle"
            v-model="itemFormData.title"
          ></la-text>
          <la-text
            label="替换符"
            :explain="explainList.formReplace"
            v-model="itemFormData.replace"
          ></la-text>
          <component
            ref="form_type"
            :is="formType"
            :itemFormData.sync="itemFormData"
          ></component>
          <el-switch v-model="itemFormData.requires" inactive-text="必填">
          </el-switch>
        </div>
        <el-button class="preview-button" type="info" @click="preview"
          >预览</el-button
        >
      </el-form>
    </div>
    <div class="form-fun">
      <el-button type="primary" @click="add" icon="el-icon-plus"></el-button>
      <el-button type="success" @click="saveForm">保存</el-button>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import formInputText from "@/components/form-input-text"; //单、多行文本框
import formInputRadio from "@/components/form-input-radio"; //单选框
import formInputCheckbox from "@/components/form-input-checkbox"; //单选框
//js
import formMixin from "@/assets/js/mixins/formMixin";

export default {
  components: {},
  mixins: [formMixin],
  data() {
    return {
      id: 1,
      drag: false,
      focusIndex: 0,
      cardHiddn: false,
      typeTemplate: [
        formInputText,
        formInputText,
        formInputRadio,
        formInputCheckbox,
      ],
      formData: [
        {
          id: 1,
          replace: "", //替换符
          title: "", //标题
          type: "4", //类型
          value: "", //默认值
          tips: "", //提示
          placeholder: "", //占位符
          rules: "",
          requires: true,
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
      console.log(this.focusIndex);
    };
  },
  watch: {
    "itemFormData.type": {
      handler(val) {
        this.initItemForm();
      },
    },
  },
  computed: {
    formType() {
      return this.typeTemplate[+this.itemFormData.type - 1];
    },
    itemFormData: {
      get: function () {
        return this.formData[this.focusIndex];
      },
      set: function (value) {
        // this.formData[this.focusIndex] = value;
        this.$set(this.formData,this.focusIndex,value)
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
        type: "", //类型
        value: "", //默认值
        tips: "", //提示
        placeholder: "", //占位符
        rules: "",
        requires: true,
      });
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
      this.focusIndex = this.formData.length - 1;
    },
    copy(itemData) {
      this.formData.push({ ...itemData, id: itemData.id + 1 });
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
        requires: true,
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
  .form-list {
    margin-bottom: 30px;
    position: relative;
    cursor: pointer;
    padding: 20px;
    .form-start {
      position: absolute;
      top: 5px;
      left: 5px;
      color: #866b6bd5;
      font-weight: 600;
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
.form-chane {
  position: absolute;
  height: 20px;
  width: 50px;
  line-height: 20px;
  right: 40px;
  bottom: -10px;
  .form-del {
    display: inline;
  }
  .form-copy {
    display: inline;
  }
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
.box-card {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  padding: 20px;
  box-shadow: 0 2px 12px 0 #0000001a;
}
.fouc-in {
  box-shadow: 0 0 5px 0 #a1d9df;
}
.form-draggable {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}

.preview-button {
  width: 100%;
}

/deep/ .el-card,
.el-message {
  overflow: inherit;
}
/deep/ .el-form-item {
  margin: 5px;
}
.form-care {
}
.form-care7 {
  width: 60%;
  float: left;
}
.form-care3 {
  width: 35%;
  float: right;
  // height: 500px;
  // overflow: auto;
}
.form-care3::-webkit-scrollbar {
  display: none;
}
.form-sticky {
  position: sticky;
  top: 10px;
  z-index: 999;
}
.form-content {
  width: 100%;
  float: left;
  position: relative;
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
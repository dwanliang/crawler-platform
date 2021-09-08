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
            :class="[
              'demo-form-inline',
              { 'form-sticky': itemFlag(index) },
            ]"
          >
            <transition name="fade">
              <el-card
                :shadow="itemFlag(index) ? 'always' : 'never'"
                :class="['form-list', { 'fouc-in': itemFlag(index) }]"
              >
                <div @click="foucItemIndex(index)">
                  <span class="form-start">{{ index }}.</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :hide-after="700"
                    content="长按我拖拽"
                    placement="bottom"
                  >
                    <i class="el-icon-rank form-draggable"></i>
                  </el-tooltip>
                  <div class="form-del" v-show="itemFlag(index)">
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
              </el-card>
            </transition>
          </el-form>
        </transition-group>
      </draggable>
      <el-form
        label-position="left"
        label-width="65px"
        size="mini"
        class="form-care3 form-sticky"
      >
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
            :itemFormData="itemFormData"
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
//js
import formMixin from "@/assets/js/mixins/formMixin";

export default {
  components: {},
  mixins: [formMixin],
  data() {
    return {
      id: 1,
      msg: null,
      drag: false,
      focusIndex: 0,
      cardHiddn: true,
      typeTemplate: [formInputText, formInputText],
      formData: [
        {
          id: 1,
          replace: "", //替换符
          title: "", //标题
          type: "", //类型
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
  computed: {
    formType() {
      return this.typeTemplate[+this.itemFormData.type - 1];
    },
    itemFormData() {
      return this.formData[this.focusIndex];
    },
    itemFlag(){
      return function(index) {
        return index == this.focusIndex
      }
    }
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
    initItemForm() {
      this.formData[index] = {
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
/deep/ .el-button--mini.is-circle{
  padding: 3px;
}
.form-del {
  display: inline;
  position: absolute;
  height: 20px;
  line-height: 20px;
  right: 40px;
  bottom: -10px;
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
.fouc-in {
  box-shadow: 0 2px 12px 0 #55e2ef;
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
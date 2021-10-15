<template>
  <!-- <div class="conter"> -->
  <div class="box-card conter">
    <div class="form-content">
      <div class="form-care2">
        <form-left
          @add="add"
          @saveForm="saveForm"
          :formData="formData"
          :formValidateData="formValidateData"
          :rules="rules"
        ></form-left>
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
                :validate="itemFormValidate(index)"
                :ref="`formList${index}`"
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
            :validate.sync="itemFormValidate(focusIndex)['title']"
            :rules="itemRules('title')"
            required
          ></la-text>
          <la-text
            label="替换符"
            :explain="explainList.formReplace"
            v-model="itemFormData.replace"
            :validate.sync="itemFormValidate(focusIndex)['replace']"
            :rules="itemRules('replace')"
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
import formTypeText from "@/components/form/formType/form-type-text"; //单、多行文本框
import formTypeRadio from "@/components/form/formType/form-type-radio"; //单选框
import formTypeCheckbox from "@/components/form/formType/form-type-checkbox"; //多选框
import formTypeTime from "@/components/form/formType/form-type-time"; //时间框
import formTypeDate from "@/components/form/formType/form-type-date"; //日期框

//组件
import formList from "@/components/form/form-list";
import formLeft from "@/components/form/form-left";
//js
import formMixin from "@/assets/js/mixins/formMixin";
import Bus from "@/assets/js/bus";
// import FormList from "../components/form-list.vue";

export default {
  components: { formList, formLeft },
  mixins: [formMixin],
  data() {
    return {
      id: 1,
      drag: false, //拖拽状态
      focusIndex: 0, //当前选中下标
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
      //表单数据
      formData: {
        title: "",
        explain: "",
        formList: [
          {
            id: 1,
            replace: "", //替换符
            title: "", //标题
            type: "4", //类型
            value: "", //默认值
            tips: "", //提示
            placeholder: "", //占位符
            rules: "text",
            required: true,
          },
        ],
      },
      //表单字段验证规则
      rules: {
        title: { require: true },
        explain: { require: true },
        formList: [
          {
            replace: { require: true },
            title: { require: true },
          },
        ],
      },
      //表单验证错误名字
      formName: {
        title: "标题",
        explain: "说明",
        formList: [
          {
            replace: "替换符",
          },
        ],
      },
      //验证数据
      formValidateData: {
        title: "",
        explain: "",
        formList: [{}],
      },
    };
  },
  beforeDestroy() {
    Bus.$off("setOptionValue");
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
    Bus.$on("setOptionValue", (res) => {
      // console.log(res);
      // this.$set(this.itemFormData, "optionValue", res);
      this.itemFormData = {
        ...this.itemFormData,
        optionValue: res,
      };
    });
  },
  watch: {
    focusIndex: {
      handler(newValue, oldValue) {
        this.flag = false;
      },
    },
    "formData.formList": {
      handler() {},
    },
    "itemFormData.type": {
      handler(val) {
        if (this.flag) {
          this.initItemForm();
          this.itemFormValidate = {};
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
    //当前选中的数据
    itemFormData: {
      get: function () {
        return this.formData.formList[this.focusIndex];
      },
      set: function (value) {
        // this.formData.formList[this.focusIndex] = value;
        this.$set(this.formData.formList, this.focusIndex, value);
      },
    },
    //当前选中的验证数据
    itemFormValidate: {
      get: function () {
        return function (index) {
          return this.formValidateData.formList[index];
        };
      },
      set: function (value) {
        let formValidateData = this.formValidateData.formList;
        this.$set(formValidateData, this.focusIndex, value);
      },
      // return function(index) {
      //   return this.formValidateData.formList[index];
      // }
    },
    itemRules() {
      return function (key) {
        return this.rules.formList[this.focusIndex][key];
      };
    },
    itemFlag() {
      return function (index) {
        return index == this.focusIndex;
      };
    },
  },
  methods: {
    add() {
      console.log(this.formData);
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
      this.rules.formList.push({
        replace: { require: true },
        title: { require: true },
      });
      this.formName.formList.push({
        replace: "替换符",
      });
      this.formValidateData.formList.push({});
      console.log(this.formValidateData);
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
      this.rules.formList.splice(index, 1);
      this.formName.formList.splice(index, 1);
      this.formData.formList.splice(index, 1);
      this.formValidateData.formList.splice(index, 1);
      this.focusIndex = 0;
    },
    copy(index) {
      let list = this.deepCopy(this.formData.formList[index]);
      this.formData.formList.splice(index + 1, 0, {
        ...list,
        id: ++this.id,
      });
      this.rules.formList.splice(index + 1, 0, {
        ...this.rules.formList[index],
      });
      this.formName.formList.splice(index + 1, 0, {
        ...this.formName.formList[index],
      });
      this.formValidateData.formList.splice(index + 1, 0, {});
    },
    itemFoucIndex(index) {
      this.focusIndex = index;
    },
    initItemForm() {
      this.itemFormData = {
        id: this.itemFormData.id, //id
        type: this.itemFormData.type, //类型
        replace: "", //替换符
        title: "", //标题
        value: "", //默认值
        tips: "", //提示
        placeholder: "", //占位符
        rules: "",
        required: true,
      };
    },
    saveForm(wordFile) {
      this.formValidateData = this.formValidate(
        this.formData,
        this.rules,
        this.formName
      );
      let tmpValidateData = this.deepCopy(this.formValidateData);
      delete tmpValidateData.formList;
      let formListOK = false;
      for (let item of this.formValidateData.formList) {
        if (!this.isEmptyObj(item)) {
          formListOK = true;
          break;
        }
      }
      if (formListOK || !this.isEmptyObj(tmpValidateData)) {
        return;
      }
      if (!wordFile) {
        this.$message({
          message: "请选择文件",
          type: "warning",
        });
      }
      let param = new FormData();
      param.append("title", this.formData.title);
      param.append("explain", this.formData.explain);
      param.append("formList", JSON.stringify(this.formData.formList));
      param.append("wordFile", wordFile);
      this.httpPost(this.$api.Form.add, param).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({
              path: "/form-con",
              query: {
                id: res.data,
              },
            });
          }, 2000);
        }
      });
    },
    preview() {},
    //开始拖拽事件
    onStart(e) {
      this.drag = true;
      // this.focusIndex = e.oldIndex;
    },
    //拖拽结束事件
    onEnd(e) {
      let list = this.formValidateData.formList;
      [list[e.oldIndex], list[e.newIndex]] = [
        list[e.newIndex],
        list[e.oldIndex],
      ];
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
      overflow-y: auto;
      width: 45%;
      background-color: #ffffff;
      padding-bottom: 30px;
    }
    .form-care3 {
      padding: 10px;
      // height: 100%;
      overflow-y: auto;
      width: 25%;
      background-color: #fff;
    }
    // .form-sticky {
    //   position: sticky;
    //   top: 0px;
    //   z-index: 999;
    // }
    .form-care2,
    .form-care3,
    .form-care5 {
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
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
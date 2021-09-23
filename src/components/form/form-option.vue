<template>
  <div>
    <div class="option-card">
      <div class="input-label">
        <label>选项</label>
        <div class="option-laber-fun">
          <span @click="TemplateFlag = true">模板</span>|<span
            @click="addOpenTemp"
            >添加到模板</span
          >
        </div>
      </div>
      <el-checkbox-group class="option-radio" v-model="itemData.optionValue">
        <draggable
          v-model="itemData.optionList"
          chosenClass="chosen"
          forceFallback="true"
          group="people"
          animation="300"
          handle=".option-draggable"
          class="form-care7"
        >
          <div
            class="option-select"
            v-for="(item, index) in itemData.optionList"
            :key="item.id"
          >
            <i class="el-icon-s-unfold option-draggable"></i>
            <el-checkbox
              @click.native.stop.prevent="change(item.id)"
              :label="item.id"
              :class="type == 'radio' ? 'select-radio' : ''"
            >
              <span></span>
            </el-checkbox>
            <la-text v-model="item.value" width="100%"></la-text>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              :disabled="itemData.optionList.length == 1"
              @click="optionDel(index)"
            ></el-button>
          </div>
        </draggable>
      </el-checkbox-group>
      <el-button size="mini" @click="optionAdd(itemData.optionList)"
        >新增</el-button
      >
    </div>
    <div class="option-direction">
      <label class="input-label">
        <em>*</em>
        样式
        <el-popover
          placement="bottom"
          width="200"
          trigger="click"
          :content="explainList.formOptionStyle"
        >
          <i class="el-icon-question" slot="reference"></i>
        </el-popover>
      </label>
      <el-radio-group v-model="itemData.optionStyle" size="small">
        <el-radio-button label="1">列表</el-radio-button>
        <el-radio-button label="2">下拉框</el-radio-button>
      </el-radio-group>
    </div>
    <div class="option-direction" v-if="itemData.optionStyle != 2">
      <label class="input-label">
        <em>*</em>
        排列方向
        <el-popover
          placement="bottom"
          width="200"
          trigger="click"
          :content="explainList.formDirection"
        >
          <i class="el-icon-question" slot="reference"></i>
        </el-popover>
      </label>
      <el-radio-group v-model="itemData.direction" size="small">
        <el-radio-button label="1">纵向</el-radio-button>
        <el-radio-button label="2">横向</el-radio-button>
      </el-radio-group>
    </div>
    <el-dialog
      top="5vh"
      width="600px"
      :modal="false"
      :title="templateTitle"
      :visible.sync="TemplateFlag"
      :before-close="cancel"
    >
      <div class="template-tab" v-show="tabIndex != 3">
        <div
          :class="['tab-item', { 'tab-active': tabIndex == 1 }]"
          @click="tabIndex = 1"
        >
          系统模板
        </div>
        <div
          :class="['tab-item', { 'tab-active': tabIndex == 2 }]"
          @click="tabIndex = 2"
        >
          我的模板
        </div>
      </div>
      <option-template
        :optList="optList"
        @cancel="cancel"
        @confirm="confirm"
      ></option-template>
    </el-dialog>
  </div>
</template>

<script>
//组件
import draggable from "vuedraggable";
import laText from "@/components/el-input";
import optionTemplate from "@/components/form/formType/optionTemplate";

//js
import explainList from "@/assets/js/explain";
import { sysData } from "@/assets/js/optionTemplate";
export default {
  components: {
    laText,
    draggable,
    optionTemplate,
  },
  props: {
    optionData: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      TemplateFlag: false,
      itemData: this.deepCopy(this.optionData),
      explainList,
      tabIndex: 1, //1系统模板 2我的模板 3添加到模板
      addTempName: "", //添加到模板name\
      //我的模板测试数据
      temData: [
        {
          name: "测试",
          list: [
            { id: 1, value: "测试1" },
            { id: 2, value: "测试2" },
          ],
        },
      ],
    };
  },
  computed: {
    // dialog数据
    optList: {
      get: function () {
        switch (this.tabIndex) {
          case 1:
            return sysData;
          case 2:
            return this.temData;
          case 3:
            return [{ name: this.addTempName, list: this.itemData.optionList }];
          default:
            return [];
        }
      },
      set: function (value) {
        this.$emit("onOptionData", value);
      },
    },
    templateTitle() {
      let name = this.addTempName
        ? "添加到我的模板"
        : this.tabIndex == 1
        ? "系统模板"
        : "我的模板";
      return name;
    },
  },
  watch: {
    itemData: {
      handler(newVal) {
        this.$emit("onOptionData", newVal);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    /**
     * 多选框的点击事件
     */
    change(val) {
      let Value = this.itemData.optionValue;
      if (this.type == "checkbox") {
        let index = Value.indexOf(val);
        if (index != "-1") {
          Value.splice(index, 1);
          return;
        }
        Value.push(val);
      } else {
        let index = Value.indexOf(val);
        this.itemData.optionValue = [];
        if (index == "-1") {
          this.itemData.optionValue.push(val);
        }
      }
    },
    /**
     * 删除选项
     */
    optionDel(index) {
      let optionList = this.itemData.optionList;
      if (optionList.length == 1) return;
      optionList.splice(index, 1);
      //如果已选列表存在删除的选项则将其从已选列表删除
      let id = optionList[index].id;
      let Value = this.itemData.optionValue;
      index = Value.indexOf(id);
      if (Value.indexOf(id)) {
        Value.splice(index, 1);
      }
    },
    /**
     * 添加选项
     */
    optionAdd(itemList) {
      itemList.push({
        id: itemList[itemList.length - 1].id + 1,
        value: "选项",
      });
    },
    /**
     * 弹出添加模板
     */
    addOpenTemp() {
      this.$prompt("请输入模板姓名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          this.tabIndex = 3;
          console.log(this.optList, value);
          this.addTempName = value;
          this.TemplateFlag = true;
        })
        .catch(() => {});
    },
    /**
     * 初始化模板弹窗
     */
    cancel() {
      this.tabIndex = 1;
      this.TemplateFlag = false;
      this.addTempName = "";
    },
    /**
     * 模板弹窗确定回调
     */
    confirm(val) {
      this.TemplateFlag = false;
      //添加到我的模板
      if (this.tabIndex == 3) {
        let addtempData = { name: this.addTempName, list: val };
        console.log(JSON.stringify(addtempData));
        console.log(addtempData);
      } else {//模板列表
        this.itemData.optionList = val;
      }
      this.tabIndex = 1;
    },
    //拖拽结束事件
    // onEnd(e) {
    //   this.$emit('onitemData',this.itemData)
    // },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/form";
.option-card {
  border: dotted 1px #d5d5d5;
  margin: 5px 0;
  padding: 5px;
  .option-radio {
    width: 100%;
  }
  .option-select {
    .select-radio {
      /deep/ .el-checkbox__inner {
        border-radius: 50%;
      }
    }
    button {
      margin-left: 5px;
    }
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    /deep/ .el-radio {
      margin-right: 0;
    }
    /deep/ .el-checkbox__label {
      padding-left: 5px;
    }
    /deep/ .el-form-item {
      width: 100%;
    }
    .option-draggable {
      font-size: 15px;
      padding-right: 5px;
    }
  }
  .input-label {
    .option-laber-fun {
      float: right;
      padding-right: 5px;
      span {
        padding: 3px;
        color: #2875e8;
        cursor: pointer;
      }
    }
  }
  input {
    height: 28px;
    line-height: 28px;
    margin-left: 5px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  /deep/ .el-radio {
    display: flex;
    align-items: center;
    .el-radio__label {
      padding-left: 0;
    }
  }
}
.option-direction {
  // margin-top: 5px;
}
.template-tab {
  white-space: nowrap;
  position: relative;
  transition: transform 0.3s;
  float: left;
  margin-bottom: 5px;
  width: 100%;
  z-index: 2;
  .tab-item {
    margin-right: 20px;
    height: 30px;
    box-sizing: border-box;
    line-height: 30px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
  }
  .tab-active {
    color: #409effed;
    border-bottom: 1px solid #409eff;
  }
}
</style>
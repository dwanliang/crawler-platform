<template>
  <div class="option-card">
    <div class="option-card-label">
      <label>选项</label>
      <div class="option-laber-fun">
        <span>模板</span>|<span>添加到模板</span>
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
        <transition-group>
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
        </transition-group>
      </draggable>
    </el-checkbox-group>
    <el-button size="mini" @click="optionAdd(itemData.optionList)"
      >新增</el-button
    >
  </div>
</template>

<script>
//组件
import draggable from "vuedraggable";
import laText from "@/components/el-input";

//js
export default {
  components:{
    laText,
    draggable
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
      itemData: this.deepCopy(this.optionData)
    }
  },

  // computed: {
  //   itemData: {
  //     get: function () {
  //       return this.optionData;
  //     },
  //     set: function (value) {
  //       console.log(value);
  //       this.$emit("onOptionData", value);
  //     },
  //   },
  // },
  watch: {
    itemData: {
      handler(newVal) {
        console.log(newVal);
        this.$emit("onOptionData", newVal);
      },
      deep: true,
    },
  },
  mounted() {
    
  },
  methods: {
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
      // val == Value
      //   ? (this.itemData.optionValue = "")
      //   : (this.itemData.optionValue = val);
    },
    optionDel(index) {
      let optionList = this.itemData.optionList;
      if (optionList.length == 1) return;
      optionList.splice(index, 1);
    },
    optionAdd(itemList) {
      itemList.push({
        id: itemList[itemList.length - 1].id + 1,
        value: "选项",
      });
    },
    //拖拽结束事件
    // onEnd(e) {
    //   this.$emit('onitemData',this.itemData)
    // },
  },
};
</script>

<style lang="scss" scoped>
.option-card {
  border: dotted 1px #d5d5d5;
  margin: 5px;
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
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    /deep/ .el-radio {
      margin-right: 0;
    }
    /deep/ .el-checkbox__label {
      padding-left: 0;
    }
    /deep/ .el-form-item {
      width: 100%;
    }
    .option-draggable {
      font-size: 15px;
      padding-right: 5px;
    }
  }
  .option-card-label {
    width: 100%;
    display: inline-block;
    font-size: 14px;
    color: #606266;
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
</style>
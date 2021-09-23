<template>
  <div class="template-body">
    <div class="template-content">
      <div class="template-left">
        <ul v-if="optionData.length > 0">
          <li
            v-for="(item, index) in optionData"
            :key="index"
            :class="{ 'li-active': changeIndex == index }"
            @click="change(index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="template-right">
        <el-input v-model="value" type="textarea" placeholder=""> </el-input>
      </div>
    </div>
    <span slot="footer" class="template-footer">
      <el-button type="primary" @click="confirm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    optList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      tabIndex: 1,
      changeIndex: 0,
      optionData: this.deepCopy(this.optList),
    };
  },
  mounted() {},
  methods: {
    change(index) {
      this.changeIndex = index;
    },
    confirm() {
      this.$emit("confirm", this.itemOption);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  watch: {
    optList() {
      this.optionData = this.deepCopy(this.optList);
      this.changeIndex = 0;
    },
  },
  computed: {
    itemOption: {
      get: function () {
        return this.optionData[this.changeIndex].list;
      },
      set: function (val) {
        this.optionData[this.changeIndex].list = val
      },
    },
    value: {
      get: function () {
        let data = this.itemOption;
        let str = "";
        data.forEach((item, index) => {
          if (index == data.length - 1) {
            str += item.value;
          } else {
            str += `${item.value}
`;
          }
        });
        return str;
      },
      set: function (val) {
        let arr = val.split(`
`);
        this.itemOption = [];
        arr.forEach((item, index) => {
          this.itemOption.push({
            id: index,
            value: item,
          });
        });
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.template-body {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .template-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .template-left,
    .template-right {
      width: 45%;
      height: 375px;
      border: 1px solid #dfdfdf;
      border-radius: 10px;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
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
    .template-left {
      overflow: auto;
      ul {
        li {
          line-height: 30px;
          padding-left: 14px;
          position: relative;
        }
        .li-active {
          background-color: #f4f4f4;
        }
      }
    }
    .template-right {
      /deep/ .el-textarea {
        height: 100%;
        .el-textarea__inner {
          height: 100%;
          border: none;
          resize: none;
          line-height: 30px;
          padding-left: 14px;
        }
      }
    }
  }
  .template-footer {
    margin-top: 10px;
  }
}
</style>
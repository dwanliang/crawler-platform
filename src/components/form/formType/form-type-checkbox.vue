<template>
  <div v-if="itemFormData">
    <la-text
      label="提示"
      :explain="explainList.formTips"
      v-model="itemFormData.tips"
    ></la-text>
    <form-option
      :optionData="checkboxData"
      @onOptionData="onOptionData"
      type="checkbox"
    ></form-option>
    <with-input
      startText="最少选"
      endText="个选项"
      v-model="checkboxData.minSize"
      :explain="explainList.minSize"
      :checked.sync="checkboxData.minOpen"
      :max="minMax"
    ></with-input>
    <with-input
      startText="最多选"
      endText="个选项"
      v-model="checkboxData.maxSize"
      :explain="explainList.maxSize"
      :checked.sync="checkboxData.maxOpen"
      :max="maxMax"
      :min="maxMin"
    ></with-input>
  </div>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
import formOption from "@/components/form/form-option";
import withInput from "@/components/form/with-input";
import { checkboxList } from "@/assets/js/dictionaries";
export default {
  components: {
    formOption,
    withInput,
  },
  data() {
    return {
      type: "checkbox",
      checkboxData: {
        optionValue: [],
        optionList: checkboxList,
        direction: 1, //排列方向
        optionStyle: 1, //多选样式 1checkbox 2select
        minOpen: false, //是否开启最少选项
        minSize: 0, //最少选多少个选项
        maxOpen: false, //是否开启最多选项
        maxSize: 0, //最多选多少个选项
      },
    };
  },
  props: {
    itemFormData: {
      type: Object,
      default: {},
    },
  },
  mixins: [formMixin],
  created() {
    if (this.itemFormData.direction) {
      for (let i in this.checkboxData) {
        this.checkboxData[i] = this.itemFormData[i];
      }
      // this.checkboxData = {
      //   optionValue: this.itemFormData.optionValue,
      //   optionList: this.itemFormData.optionList,
      //   direction: this.itemFormData.direction,
      //   optionStyle: this.itemFormData.optionStyle,
      //   minOpen: this.itemFormData.minOpen,
      //   minSize: this.itemFormData.minSize,
      //   maxOpen: this.itemFormData.maxOpen,
      //   maxSize: this.itemFormData.maxSize,
      // };
    }
  },
  computed: {
    minMax() {
      let checkboxData = this.checkboxData;
      if (checkboxData.maxOpen) {
        return checkboxData.maxSize;
      }
      return checkboxData.optionList.length;
    },
    maxMax() {
      return this.checkboxData.optionList.length;
    },
    maxMin() {
      if (this.checkboxData.maxOpen) {
        return this.checkboxData.minSize;
      }
    },
  },
  watch: {
    checkboxData: {
      handler(newVal) {
        this.$emit("update:itemFormData", { ...this.itemFormData, ...newVal });
      },
      deep: true,
    },
    "checkboxData.minOpen": {
      handler(newVal) {
        let checkboxData = this.checkboxData;
        if (
          checkboxData.maxOpen &&
          checkboxData.minSize > checkboxData.maxSize &&
          newVal
        ) {
          checkboxData.minSize = 0;
        }
      },
    },
    "checkboxData.maxOpen": {
      handler(newVal) {
        let checkboxData = this.checkboxData;
        if (
          checkboxData.minOpen &&
          checkboxData.minSize > checkboxData.maxSize &&
          newVal
        ) {
          checkboxData.maxSize = checkboxData.minSize;
        }
      },
    },
  },
  methods: {
    //多选列表数据回调
    onOptionData(newVal) {
      this.checkboxData = {
        ...this.checkboxData,
        optionValue: newVal.optionValue,
        optionList: newVal.optionList,
        direction: newVal.direction,
        optionStyle: newVal.optionStyle,
      };
      // this.$emit("update:itemFormData", { ...this.itemFormData, ...newVal });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
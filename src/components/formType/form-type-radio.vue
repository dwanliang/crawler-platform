<template>
  <div v-if="itemFormData">
    <la-text
      label="提示"
      :explain="explainList.formTips"
      v-model="itemFormData.tips"
    ></la-text>
    <form-option
      :optionData="radioData"
      @onOptionData="onOptionData"
      type="radio"
    ></form-option>
  </div>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
import formOption from "@/components/formType/form-option";
import { radioList } from "@/assets/js/dictionaries";
export default {
  components: {
    formOption,
  },
  data() {
    return {
      radioData: {
        optionValue: [],
        optionList: radioList,
        direction: 1, //排列方向
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
      this.radioData = {
        optionValue: this.itemFormData.optionValue,
        optionList: this.itemFormData.optionList,
        direction: this.itemFormData.direction,
      };
    }
  },
  methods: {
    //单选数据回调
    onOptionData(newVal) {
      this.$emit("update:itemFormData", { ...this.itemFormData, ...newVal });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
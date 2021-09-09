<template>
  <div v-if="itemFormData">
    <la-text
      label="提示"
      :explain="explainList.formtips"
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
import formOption from "@/components/form-option";
import {radioList} from "@/assets/js/dictionaries";
export default {
  components: {
    formOption,
  },
  data() {
    return {
      radioData: {
        optionValue: [],
        optionList: radioList,
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
  mounted() {
    console.log(radioList);
  },
  methods: {
    //单选数据回调
    onOptionData(newVal) {
      this.$emit('update:itemFormData', {...this.itemFormData, ...newVal});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
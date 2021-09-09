<template>
  <div v-if="itemFormData">
    <la-text
      label="提示"
      :explain="explainList.formtips"
      v-model="itemFormData.tips"
    ></la-text>
    <form-option
      :optionData="checkboxData"
      @onOptionData="onOptionData"
      type="checkbox"
    ></form-option>
  </div>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
import formOption from "@/components/form-option";
import { checkboxList } from "@/assets/js/dictionaries";
export default {
  components: {
    formOption,
  },
  data() {
    return {
      type: "checkbox",
      checkboxData: {
        optionValue: [],
        optionList: checkboxList
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
    console.log(this.checkboxData);
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
<template>
  <div v-if="itemFormData">
    <la-text label="默认值" :explain="explainList.formValue" v-model="itemFormData.value"></la-text>
    <la-text label="占位符" :explain="explainList.formPlaceholder" v-model="itemFormData.placeholder"></la-text>
    <la-text label="提示" :explain="explainList.formtips" v-model="itemFormData.tips"></la-text>
    <dropDown
      v-if="itemFormData.type == 1"
      label="内容限制"
      yesDel
      v-model="itemFormData.rules"
      :dropdownList="rulesList"
    ></dropDown>
  </div>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
export default {
  components: {

  },
  props:{
    itemFormData:{
      type: Object,
      default:{},
    }
  },
  mixins: [formMixin],
  mounted() {
    console.log(this.rulesList);
  },
  
};
</script>

<style>
</style>
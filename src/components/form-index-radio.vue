<template>
  <div v-if="itemFormData">
    <la-text label="提示" :explain="explainList.formtips" v-model="itemFormData.tips"></la-text>
    
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
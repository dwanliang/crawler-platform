<template>
  <el-form-item :label="label">
    <el-select 
      :style="`width:${width}`"
      v-model="newVal" 
      :disabled="disabled" 
      :placeholder="label"
      :clearable="yesDel"
    >
      <el-option 
        v-for="(item,index) in dropdownList" 
        :key="index" 
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    yesDel: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [ String, Number],
    },
    value: {
      type: [String, Number],
      default: ''
    },
    dropdownList: {
      type: Array,
      default: []
    }
  },
  watch: {
    newVal(newVal){
      this.$emit("input", newVal);
    }
  },
  computed: {
    newVal: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("input", value);
      },
    },
  }
};
</script>

<style>
</style>
<template>
  <span>
    <!-- <label class="input-label">
      <em v-if="itemFormData.required">*</em>
      {{ itemFormData.title ? itemFormData.title : "未命名" }}
    </label> -->
    <form-label :required="itemFormData.required" :title="title"></form-label>
    <template v-if="itemFormData.optionStyle == 1">
      <el-checkbox-group
        :class="itemFormData.direction == 1 ? 'portrait-option' : ''"
        v-model="itemFormData.optionValue"
        v-if="itemFormData.optionValue"
        :min="itemFormData.minSize"
        :max="itemFormData.maxSize"
      >
        <el-checkbox
          v-for="item in itemFormData.optionList"
          @click.native.stop.prevent="change(item.id)"
          :label="item.id"
          :key="item.id"
          >{{ item.value }}</el-checkbox
        >
      </el-checkbox-group>
    </template>
    <template v-if="itemFormData.optionStyle == 2">
      <el-select
        v-model="itemFormData.optionValue"
        clearable
        multiple
        :multiple-limit="
          itemFormData.optionLimit ? itemFormData.optionLimit : 0
        "
        placeholder="请选择"
      >
        <el-option
          v-for="item in itemFormData.optionList"
          :key="item.id"
          :label="item.value"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </template>
    <span class="tips">{{ itemFormData.tips }}</span>
  </span>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
import Bus from "@/assets/js/bus";
export default {
  props: {
    itemFormData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  mixins: [formMixin],
  watch: {
    "itemFormData.optionValue"() {},
  },
  computed: {
    title() {
      let data = this.itemFormData;
      let title = data.title ? data : "未命名";
      //多选
      // minOpen: false, //是否开启最少选项
      //   minSize: 0, //最少选多少个选项
      //   maxOpen: false, //是否开启最多选项
      //   maxSize: 0, //最多选多少个选项
      if (data.type == 4) {
        let temTitle = "";
        if (data.minOpen) {
          temTitle = data.minSize ? `（最少选${data.minSize}项）` : "";
        }
        if (data.maxOpen) {
          temTitle = data.maxSize ? `（最多选${data.maxSize}项）` : "";
        }
        if (data.minOpen && data.maxOpen) {
          temTitle =
            data.minSize || data.maxSize
              ? data.minSize == data.maxSize
                ? `（选${data.maxSize}项）`
                : `（选${data.minSize}~${data.maxSize}项）`
              : "";
        }
        title += temTitle;
      }
      return title;
    },
  },
  methods: {
    /**
     * 多选框的点击事件
     */
    change(val) {
      let Value = this.itemFormData.optionValue;
      let index = Value.indexOf(val);
      if (index != "-1") {
        Value.splice(index, 1);
        return;
      }
      Value.push(val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/form";
</style>
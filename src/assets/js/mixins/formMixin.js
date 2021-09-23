
//组件
import draggable from "vuedraggable";
import laText from "@/components/el-input";
import dropDown from "@/components/drop-down";
import formLabel from '@/components/form/form-label'

//js
import { typeList, rulesList } from "@/assets/js/dictionaries";
import explainList from '@/assets/js/explain'
import { Validation } from "@/assets/js/utils";

export default {
  components: {
    draggable,
    laText,
    dropDown,
    formLabel,
  },
  mounted() {

  },
  data() {
    return {
      msg: null,
      typeList,
      rulesList,
      explainList,
    }
  },
  methods: {
    /**
     * 
     * @param {*} formData 表单数据
     * @param {*} rules 验证规则
     * @param {*} formName 表单名字
     * @param {*} scroll 是否滚动定位
     * @param {*} target 指定元素
     */
    formValidate(formData, rules, formName = [], scroll = true, target = this) {
      let validate = Validation.validateData(formData, rules, formName);
      // for (let key in validate) {
      //   let item = validate[key];
      //   if (Array.isArray(item)) {
      //     console.log(item);
      //     item.forEach( (ele, index) => {
      //       this.$refs[`${key}${index}`][0].$el.style.border = 'none'
      //       if(JSON.stringify(ele) != '{}'){
      //         this.$refs[`${key}${index}`][0].$el.style.border = '1px dotted red'
      //         // for(let k in ele) {
      //         //   console.log(`${k}${index}`);
      //         //   console.log( this.$refs[`${k}${index}`]);
      //         //   this.$refs[`${k}${index}`].$el.style.border = '1px dotted red'
      //         // }
      //       }
      //     });
      //     continue;
      //   }
      // }
      console.log(validate);
      return validate;
    }
  }
}
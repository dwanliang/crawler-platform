
//组件
import draggable from "vuedraggable";
import laText from "@/components/el-input";
import dropDown from "@/components/drop-down";

//js
import {typeList, rulesList} from "@/assets/js/dictionaries";
import explainList from '@/assets/js/explain'

export default {
  components: {
    draggable,
    laText,
    dropDown,
  },
  mounted(){

  },
  data() {
    return {
      msg: null,
      typeList,
      rulesList,
      explainList,
    }
  },
}
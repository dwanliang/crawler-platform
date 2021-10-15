<template>
  <div class="conter">
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ formData.title }}</span>
        <p>{{ formData.explain }}</p>
      </div>
      <el-form
        :model="item"
        v-for="(item, index) in formData.formList"
        :key="item.id"
        size="mini"
      >
        <form-list
          :itemData="item"
          :itemIndex="index"
          :validate="itemFormValidate(index)"
          :ref="`formList${index}`"
        ></form-list>
      </el-form>
      <el-button class="preview-button" type="info" @click="preview"
        >预览</el-button
      >
      <el-button class="preview-button" type="primary" @click="save"
        >提交</el-button
      >
    </el-card>
  </div>
</template>

<script>
import formList from "@/components/form/form-list";
export default {
  components: {
    formList,
  },
  data() {
    return {
      id: "",
      //表单数据
      formData: {
        title: "",
        explain: "",
        fileList: [],
        formList: [
          {
            id: 1,
            replace: "", //替换符
            title: "标题", //标题
            type: "1", //类型
            value: "", //默认值
            tips: "", //提示
            placeholder: "请输入", //占位符
            rules: "text",
            required: true,
          },
        ],
      },
      //验证数据
      formValidateData: {
        title: "",
        explain: "",
        formList: [{}],
      },
    };
  },
  computed: {
    //当前选中的验证数据
    itemFormValidate: {
      get: function () {
        return function (index) {
          return this.formValidateData.formList[index];
        };
      },
      set: function (value) {
        let formValidateData = this.formValidateData.formList;
        this.$set(formValidateData, this.focusIndex, value);
      },
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getFormData(this.id);
  },
  methods: {
    getFormData(id) {
      console.log(id);
      this.httpGet(this.$api.Form.detail, { id }).then((res) => {
        if (res.code == 200) {
          this.formData = res.data;
          this.formData.formList = JSON.parse(this.formData.formList);
        }
      });
    },
    save() {
      this.httpPost(this.$api.Form.preview, { formData: this.formData }).then(
        (res) => {
          if (res.code == 200) {
          }
        }
      );
    },
    preview() {

    }
  },
};
</script>

<style lang="scss" scoped>
.conter {
  width: 800px;
  margin: 0 auto;
  .preview-button {
    margin: 0 auto;
    width: 200px;
  }
  .clearfix {
    span {
      font-weight: 700;
      font-size: 18px;
    }
    p {
      margin-top: 10px;
      font-size: 13px;
      color: rgb(139, 139, 139);
    }
  }
}
</style>
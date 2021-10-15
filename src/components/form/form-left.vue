<template>
  <div>
    <div class="form-list fouc-in">
      <el-form>
        <la-text
          ref="title"
          label="标题"
          v-model="formData.title"
          :validate.sync="formValidateData.title"
          :rules="rules.title"
        ></la-text>
        <la-text
          label="简要说明"
          ref="explain"
          v-model="formData.explain"
          :validate.sync="formValidateData.explain"
          :rules="rules.explain"
          type="textarea"
        ></la-text>
        <div class="form-upload">
          <el-upload
            class="upload-demo"
            ref="uploadWord"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="medium" type="primary"
              >上传文书</el-button
            >
            <div slot="tip" class="el-upload__tip">只能上传word/pdf文件</div>
          </el-upload>
        </div>
      </el-form>
    </div>
    <div class="form-fun">
      <el-button
        type="primary"
        id="add"
        @click="add"
        icon="el-icon-plus"
      ></el-button>
      <el-button type="success" @click="saveForm">保存</el-button>
      
    </div>
  </div>
</template>

<script>
import formMixin from "@/assets/js/mixins/formMixin";
export default {
  mixins: [formMixin],
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
    formValidateData: {
      type: Object,
      default() {
        return {};
      },
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    add() {
      this.$emit("add");
    },
    saveForm() {
      let wordFile = this.$refs.uploadWord.uploadFiles[0];
      if (wordFile) {
        wordFile = wordFile.raw;
      }
      this.$emit("saveForm",wordFile);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-fun {
  margin-top: 20px;
  button {
    width: 100%;
    margin: 5px 0;
  }
}
.form-upload{
  margin-top: 10px;
}
</style>
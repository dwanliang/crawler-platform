<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <h3>爬世界</h3>
      <!-- <el-button type="text">操作按钮</el-button> -->
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="project_name" label="项目" width="180">
      </el-table-column>
      <el-table-column prop="project_explain" label="说明" width="180">
      </el-table-column>
      <el-table-column prop="project_url" label="URL"> </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary">来试试</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import utils from "@/assets/js/utils";
export default {
  data() {
    return {
      tableData: [
        {
          project_name: "饿了么",
          project_explain: "攻坚饿了么文章",
          project_url: "http://baidu.com",
        },
      ],
      formData: {
        username: "",
        password: "",
        email:"1299@qq.com",
        phone:15107778704
      },
      rules: {
        username:{require:true,min:20},
        password:{require:true,max:20},
        email:{require:true,email:true},
        phone:{require:true,tel:true},
      },
      formName: {
        username: "用户名",
        password: "密码",
        email:"邮箱",
        phone:"手机号"
      },
    };
  },
  mounted() {
    utils.validateData(this.formData, this.rules, this.formName).then((res)=>{
      console.log(res);
    });
    this.httpPost(this.$api.User.userList, { uid: 1 }).then((res) => {
      //成功
      console.log(res);
    });
  },
};
</script>

<style lang="sass" scoped>
</style>
<template>
  <!-- <div class="conter"> -->
  <el-card class="box-card conter">
    <el-form
      :inline="true"
      :model="item"
      v-for="(item, index) in form"
      :key="item.id"
      class="demo-form-inline"
    >
      <transition name="fade">
        <el-card class="box-card form-list">
          <span class="form-start">{{ index }}.</span>
          <el-form-item label="替换符">
            <el-input
              v-model="item.replace"
              placeholder="请输入替换符"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input
              width="300"
              v-model="item.user"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="item.region" placeholder="类型">
              <el-option label="文本" value="1"></el-option>
              <el-option label="多行文本" value="2"></el-option>
              <el-option label="单选" value="3"></el-option>
              <el-option label="多选" value="4"></el-option>
              <el-option label="时间" value="5"></el-option>
              <el-option label="日期" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容限制">
            <el-select v-model="item.rules" placeholder="内容限制">
              <el-option label="数字" value="1"></el-option>
              <el-option label="文字" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-switch v-model="item.requires" inactive-text="必填"> </el-switch>
          <div class="form-fun">
            <el-popconfirm title="确定删除吗？" @confirm="del(index)">
              <el-button
                type="danger"
                icon="el-icon-delete"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </div>
        </el-card>
      </transition>
    </el-form>
    <div class="form-fun">
      <el-button type="primary" @click="add" icon="el-icon-plus"></el-button>
    </div>
  </el-card>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      id: 1,
      msg: null,
      form: [
        {
          id: 1,
          replace: "",
          name: "",
          region: "",
          rules: "",
          requires: true,
        },
      ],
    };
  },
  methods: {
    add() {
      this.form.push({
        id: ++this.id,
        replace: "",
        name: "",
        region: "",
        rules: "",
        requires: true,
      });
    },
    del(index) {
      if (this.form.length == 1) {
        if (this.msg) this.msg.close();
        this.msg = this.$message({
          showClose: true,
          message: "至少一条！！！",
          type: "warning",
        });
        return;
      }
      this.form.splice(index, 1);
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang="scss" scoped>
.conter {
  width: 1200px;
  margin: 0 auto;
  .form-list {
    margin-bottom: 30px;
    position: relative;
    .form-start {
      position: absolute;
      top: 5px;
      left: 5px;
      color: #866b6bd5;
      font-weight: 600;
    }
  }
  .form-fun {
    width: 200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
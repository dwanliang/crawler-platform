<template>
  <div>home</div>
</template>

<script>
export default {
  mounted() {
    this.httpPost(this.$api.User.userList,{uid: 1}).then(res => {//成功
        console.log(res)
    });
  }
}
</script>

<style lang="sass" scoped>
</style>
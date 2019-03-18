
<template>
  <div class="login-dialog" v-if="this.$store.state.login.loginVisible==true">
    <el-dialog
      :modal="true"
      title="登陆"
      :visible="true"
      width="25%"
      style="height:700px;"
      @close="cancle"
    >
      <el-form :model="form" class="form-box">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="login">登 录</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "login",
  props: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
    }
  },
  methods: {
    cancle() {
      this.$store.commit("loginVisible", false);
    },
    login() {
      this.$store.commit("loginVisible", false);
    }
  },
}
</script>
<style lang="less" scoped>
.form-box {
  width: 80%;
  margin: 0 auto;
}
</style>



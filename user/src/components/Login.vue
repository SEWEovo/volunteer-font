
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
          <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
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
  props: {

  },
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
      this.form = {
        username: "",
        password: "",
      }
      this.$store.commit("loginVisible", false);
    },
    login() {
      let params = {
        account: this.form.username,
        password: this.form.password
      }

      this.$post('http://localhost:8880/user/login', params)
        .then(res => {
          if (res.code === "ACK") {
            let params = {
              userId: res.data.account
            }
            this.$store.commit("type", res.data.type);
            this.$get('http://localhost:8880/user/findOneInfo', params)
              .then(res2 => {
                if (res2.code === "ACK") {
                  this.$store.commit("username", res2.data.name);
                  this.$store.commit("userId", res2.data.userId);
                  this.$store.commit("phone", res2.data.phone);
                  this.$store.commit("college", res2.data.college);
                  this.$store.commit("profession", res2.data.profession);
                  this.$store.commit("classNum", res2.data.classNum);
                  this.$store.commit("loginVisible", false);
                  this.$message.success('登录成功');
                  this.$emit("show", res2.data);
                  this.form.account = "";
                  this.form.password = "";
                }
              })
              .catch(() => {

              })
            this.$store.commit("username", res.data.account);
            this.$store.commit("userId", res.data.userId);
            this.$store.commit("phone", res.data.phone);
            this.$store.commit("type", res.data.type);
            this.$store.commit("loginVisible", false);
          } else {

          }
        })
        .catch(() => {
          this.$message.error("账户密码错误")
        })

    },
    mounted() {
      this.form = {
        username: "",
        password: "",
      }
    },
  },
}
</script>
<style lang="less" scoped>
.form-box {
  width: 80%;
  margin: 0 auto;
}
</style>



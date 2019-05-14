<template>
  <div id="home">
    <el-container class="index-page">
      <el-header height="80px">
        <div class="title">志愿信息发布平台</div>
        <div class="user-info">
          欢迎,
          <span>{{userName}}</span>
          <a @click="logOut">退出登录</a>
        </div>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div class="colo"></div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>志愿者活动管理</span>
              </template>
              <el-menu-item index="1-1" @click="linkTo('Publish')"  v-if="type==1">志愿者活动发布</el-menu-item>
              <el-menu-item index="1-2" @click="linkTo('History')" >发布历史</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>名单管理</span>
              </template>
              <el-menu-item index="2-1" @click="linkTo('Acitivies')">活动报名名单</el-menu-item>
              <el-menu-item index="2-2" @click="linkTo('VolunteerTime')">志愿者情况统计</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>凭证管理</span>
              </template>
              <el-menu-item index="3-1" @click="linkTo('publishStar')" v-if="type==2">生成星级志愿者</el-menu-item>
              <el-menu-item index="3-2" @click="linkTo('Star')">星级志愿者</el-menu-item>
            </el-submenu>
            <el-submenu index="4" v-if="type==2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>基础设置</span>
              </template>
              <el-menu-item index="4-1" @click="linkTo('Authority')">权限授予管理</el-menu-item>
              <el-menu-item index="4-2" @click="linkTo('Condition')">评比条件设置</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view v-if="true"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      userName: this.$store.state.login.username,
      type:this.$store.state.login.type
    }
  },
  methods: {
    linkTo(rout) {
      this.$router.push({ name: rout })
    },
    logOut() {
      this.$store.commit("username", "");
      this.$store.commit("userId", "");
      this.$store.commit("phone", "");
      this.$store.commit("type", "");
      this.$router.push("/login")
    },
  },
  mounted() {
  },
}
</script>

<style lang="less" scoped>
.index-page {
  height: auto;
  background-color: rgb(84, 92, 100);
  position: relative;
}
.el-header {
  background-color: #fff;
  padding: 15px 20px;
  line-height: 50px;
  z-index: 10;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
.el-menu{
 border: none;
}
.title {
  color: #004394;
  font-size: 24px;
  vertical-align: top;
  margin-left: 10px;
  width: 400px;
  float: left;
}
.user-info {
  float: right;
  a {
    color: #527de2;
    cursor: pointer;
  }
}
.el-main {
  background-color: #eef1f4;
  height: auto;
  // padding: 0;
  // position: absolute;
  // top: 80px;
  // left: 300px;
  // right: 0;
  // bottom: 0;
}
</style>
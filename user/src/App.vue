<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click="goRouter('/')">首页</el-menu-item>
          <el-menu-item index="2" @click="goRouter('list')">志愿活动</el-menu-item>
          <el-menu-item index="3" @click="goRouter('publicity')">信息公示</el-menu-item>
          <el-submenu index="4" v-if="this.$store.state.login.username !==''">
            <template slot="title">个人中心</template>
            <el-menu-item index="4-1" @click="goRouter('basic')">基本资料</el-menu-item>
            <el-menu-item index="4-2" @click="goRouter('history')">报名历史</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: "1",
    }
  },
  methods: {
    goRouter: function (item) {
      this.$router.push(item)
    },
    login() {
      console.log(1);
      this.$store.commit("loginVisible", true);
    }
  }
}
</script>

<style>
.el-header {
  padding: 0px;
  position: fixed;
  z-index: 1000;
  width: 100%;
}
.el-menu-demo {
  padding-left: 25%;
}
.el-main {
  height: auto;
  padding-bottom: 10px;
  height: 1000px;
}
</style>

<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    if (this.$store.state.login.username == null) {
      this.$router.push("/Login")
    }
  }
}
</script>
<style lang="less" scoped>
.index-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eef1f4;
}
.el-header {
  background-color: #fff;
  padding: 15px 20px;
  line-height: 50px;
  z-index: 10;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
.title {
  color: #004394;
  font-size: 24px;
  vertical-align: top;
  margin-left: 10px;
}
.el-main {
  background-color: #eef1f4;
  padding: 0;
  position: absolute;
  top: 80px;
  left: 300px;
  right: 0;
  bottom: 0;
}
</style>
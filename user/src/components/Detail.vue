<template>
  <div id="detail">
    <div class="index">
      <div class="title">{{data.name}}</div>
      <div class="des">{{data.des}}</div>
      <div class="item">志愿时间：{{data.time  | dateformat}}</div>
      <div class="item">志愿地点：{{data.place}}</div>
      <div class="item">志愿内容：{{data.content}}</div>
      <div class="item">
        出行方式：
        <span v-if="data.type==1">集体班车</span>
        <span v-if="data.type==2">自行前往</span>
      </div>
      <div class="item">所需人数：{{data.num}}</div>
      <div class="item">志愿福利：{{data.welfare}}</div>
      <div class="item">报名截止时间：{{data.deadline  | dateformat}}</div>
            <div class="item">发布者：{{data.userName}}</div>
                  <div class="item">发布者联系方式：{{data.phone}}</div>
      <div class="btns">
        <el-button type="primary" @click="apply()">报名</el-button>
        <el-button @click="cancel()">返回</el-button>
      </div>
    </div>
    <div class="index-left">
      <div class="login-info">
        <div class="title-left">欢迎,</div>
        <div v-if="this.$store.state.login.username==''" class="login-btn">
          <el-button type="primary" @click="login()">登录</el-button>
        </div>
        <div class="info" v-else>
          <p>{{this.$store.state.login.username}}</p>
          <p>{{this.$store.state.login.userId}}</p>
          <p>{{this.$store.state.login.profession}}</p>
          <p>{{this.$store.state.login.college}}{{this.$store.state.login.classNum}}</p>
          <div class="btn-group">
            <el-button type @click="goRouter('basic')">个人中心</el-button>
            <el-button type @click="logOut">退出登录</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="请确认个人信息" :visible.sync="dialogVisible" width="30%">
      <div class="form-data">
        <el-form
          :model="peopelData"
          status-icon
          ref="peopelData"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="peopelData.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="number">
            <el-input v-model="peopelData.userId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="college">
            <el-input v-model.number="peopelData.college" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="profession">
            <el-input v-model="peopelData.profession" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model.number="peopelData.classNum" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="peopelData.phone" @change="changeTel=true"></el-input>
            <span class="msg" v-if="changeTel">请及时在个人资料中更新联系电话</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="signUp">报 名</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <login @show="showInfo" :data="data"></login>
  </div>
</template>
<script>
import Login from './Login.vue';
export default {
  name: 'detail',
  components: {
    login: Login
  },
  data() {
    return {
      //电话号码更新flag
      data:{},
      changeTel: false,
      dialogVisible: false,
      activitiesId: "",
      peopelData: {},
      data: {},
    }
  },
  methods: {
        goRouter: function (item) {
      this.$router.push(item)
    },
    showInfo(data){
     this.peopelData=data;
    },
       login: function () {
      this.$store.commit("loginVisible", true);
    },
    getList: function () {
      let params = {
        id: this.activitiesId,
        status: ""
      }
      this.$get('http://localhost:8880/Activities/getAll', params)//此处用post方法 url是我服务器中的一个接口
        .then(res => {
          if (res.code === "ACK") {
            this.data = res.data[0];
          }
        })
        .catch(() => {
        })
    },
    apply: function () {
      if (this.$store.state.login.username !== "") {
        this.dialogVisible = true;
        this.changeTel = false;
      }
      else {
        this.$store.commit("loginVisible", true);
      }
    },
    cancel: function () {
      this.$router.go(-1);
    },
    logOut() {
      this.$store.commit("username", "");
      this.$store.commit("userId", "");
      this.$store.commit("phone", "");
      this.$store.commit("type", "");
    },
    signUp() {
      let info = {
        enterId: "",
        activitesId: this.data.activitesId,
        userId: this.$store.state.login.userId,
      }
      let params = {
        info: JSON.stringify(info)
      }
      this.$post('http://localhost:8880/enter/insertOne', params)
        .then(res => {
          if (res.code === "ACK") {
            this.$message.success(res.msg);
            this.dialogVisible = false;
          }
        })
        .catch(() => {
        })
    }
  },
  mounted() {
    this.activitiesId = this.$route.params.activitiesId;
    this.peopelData.name = this.$store.state.login.username;
    this.peopelData.userId = this.$store.state.login.userId;
    this.peopelData.college = this.$store.state.login.college;
    this.peopelData.profession = this.$store.state.login.profession;
    this.peopelData.classNum = this.$store.state.login.classNum;
    this.peopelData.phone = this.$store.state.login.phone;
    this.getList();
  },
}

</script>
<style lang="less" scoped>
#detail {
  display: flex;
  align-items: flex-start;
  width: 1100px;
  padding: 0 16px;
  margin: 10px auto;
  margin-top: 60px;
  height: 700px;
}
.index {
  flex-shrink: 0;
  margin-right: 10px;
  margin-bottom: 0;
  width: 794px;
  height: auto;
  background-color: white;
  padding: 20px;
}
.index-left {
  flex: 1 1;
  font-size: 14px;
  background-color: white;
  height: 300px;
  .login-btn {
    margin-top: 100px;
    font-size: 12px;
    margin-left: 80px;
  }
  .title-left {
    padding: 10px 20px;
  }
  .info {
    width: 200px;
    height: 200px;
    margin-top: 30px;
    margin-left: 25px;
    p {
      padding-left: 50px;
      text-align: left;
    }
    .btn-group {
      margin-top: 40px;
      margin-left: 20px;
      .el-button {
        width: 80px;
        font-size: 14px;
        padding: 12px 10px;
      }
    }
  }
}
.title {
  padding: 30px 0;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
.des {
  text-indent: 2em;
  padding: 30px 30px;
}
.item {
  padding: 10px 0;
  margin-left: 30px;
}
.el-tag {
  margin-right: 20px;
}
.btns {
  margin: 80px 0 80px 500px;
}
.msg {
  color: #53d661;
}
.form-data {
  width: 90%;
}
</style>
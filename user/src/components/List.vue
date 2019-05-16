<template>
  <div id="list">
    <div class="index">
      <el-tabs style="height:60px;" v-model="status" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="报名中" name="1"></el-tab-pane>
        <el-tab-pane label="已结束" name="2"></el-tab-pane>
      </el-tabs>
      <div
        class="list-item"
        v-for="(item,index ) in datalist.slice((cur-1)*pageSize,cur*pageSize)"
        :key="index"
      >
        <div class="item-left">
          <p class="item-name">{{item.name}}</p>
          <p class="item-content">{{item.des}}</p>
          <p class="time-bottom">
            <span class="item-time">{{item.time | dateformat}}</span>
            <span class="item-status" v-if="item.status===2">报名结束</span>
            <span class="item-status" v-if="item.status===1">报名中</span>
          </p>
        </div>
        <div class="item-bottom">
          <el-button type="info" @click="showDetial(item.activitesId,item.can)">查看详情</el-button>
          <el-button
            type="primary"
            :disabled="item.status==2||item.can==false"
            @click="apply(item.activitesId)"
          >报名</el-button>
        </div>
      </div>
      <div class="index-bottom">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="cur"
            :page-size="6"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="index-left">
      <div class="login-info">
        <div class="title">欢迎,</div>
        <div v-if="this.$store.state.login.username==''" class="login-btn">
          <el-button type="primary" @click="login()">登录</el-button>
        </div>
        <div class="info" v-else>
          <p>{{this.$store.state.login.username}}</p>
          <p>{{this.$store.state.login.userId}}</p>
          <p>{{this.$store.state.login.college}}</p>
          <p>{{this.$store.state.login.profession}}{{this.$store.state.login.classNum}}</p>
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
import moment from "moment";
export default {
  name: 'list',
  components: {
    login: Login
  },
  data() {
    return {
      now: "",
      data: {},
      total: 0,
      pageSize: 5,
      changeTel: false,
      dialogVisible: false,
      peopelData: {},
      cur: 1,
      activitiesId: "",
      status: "0",
      datalist: [],
      userInfo: {}
    }
  },
  methods: {
    goRouter: function (item) {
      this.$router.push(item)
    },
    showInfo(data) {
      this.peopelData = data;
    },
    handleClick(tab, event) {
      this.status = tab.index;
      this.getList();
    },
    logOut() {
      this.$store.commit("username", "");
      this.$store.commit("userId", "");
      this.$store.commit("phone", "");
      this.$store.commit("type", "");
    },
    apply: function (id) {
      if (this.$store.state.login.username !== "") {
        this.dialogVisible = true;
        this.changeTel = false;
        this.activitiesId = id;
      }
      else {
        this.$store.commit("loginVisible", true);
      }
    },
    signUp() {
      let info = {
        enterId: "",
        activitesId: this.activitiesId,
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
    },
    getList() {
      let status;
      status = parseInt(this.status)
      if (status === 0) {
        status = ""
      }
      let params = {
        id: this.activitiesId,
        status: status
      }
      this.$get('http://localhost:8880/Activities/getAll', params)//此处用post方法 url是我服务器中的一个接口
        .then(res => {
          if (res.code === "ACK") {
            this.datalist = res.data;
            this.total = this.datalist.length;
            for (var i = 0; i < this.total; i++) {
              this.datalist[i].deadline = moment(this.datalist[i].deadline).format('YYYY-MM-DD HH:mm:ss');
              this.datalist[i].deadline = new Date(Date.parse(this.datalist[i].deadline));
              this.datalist[i].can = true;
              if (this.datalist[i].deadline < new Date()) {
                this.datalist[i].can = false;
              }
            }
          }
        })
        .catch(() => {
        })
    },
    handleCurrentChange: function () {

    },
    showDetial: function (id, can) {
      console.log(can)
      this.activitiesId = id;
      this.$router.push({ name: 'Detail', params: { activitiesId: this.activitiesId, can: can } })
    },
    login: function () {
      this.$store.commit("loginVisible", true);
    },
  },
  mounted() {
    this.peopelData.name = this.$store.state.login.username;
    this.peopelData.userId = this.$store.state.login.userId;
    this.peopelData.college = this.$store.state.login.college;
    this.peopelData.profession = this.$store.state.login.profession;
    this.peopelData.classNum = this.$store.state.login.classNum;
    this.peopelData.phone = this.$store.state.login.phone;
    this.getList();
  }
}

</script>
<style lang="less" scoped>
#list {
  display: flex;
  align-items: flex-start;
  width: 1100px;
  padding: 0 16px;
  margin: 10px auto;
  margin-top: 60px;
  height: 800px;
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
  .title {
    padding: 10px 20px;
  }
  .el-button {
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
.list-item {
  margin-bottom: 0;
  box-shadow: none;
  border-bottom: 1px solid #f0f2f7;
  position: relative;
  height: 140px;
}
.item-left {
  p {
    margin: 6px;
  }
  p:nth-child(1) {
    margin-bottom: 0px;
  }
  .item-name {
    font-size: 18px;
    font-weight: 600;
  }
  .item-time {
    font-size: 13px;
    color: #949393;
  }
  .item-status {
    font-size: 13px;
    color: #949393;
  }
}
.item-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.time-bottom {
  position: absolute;
  bottom: 10px;
  left: 0px;
}
.item-bottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
  .el-button {
    width: 80px;
    font-size: 12px;
    text-align: center;
    padding: 10px 0;
  }
}
.index-bottom {
  float: right;
  padding-top: 20px;
}
</style>
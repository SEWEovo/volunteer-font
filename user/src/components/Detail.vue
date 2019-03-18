<template>
  <div id="detail">
    <div class="index">
      <div class="title">{{data.name}}</div>
      <div class="des">{{data.des}}</div>
      <div class="item">志愿时间：{{data.time}}</div>
      <div class="item">志愿地点：{{data.place}}</div>
      <div class="item">志愿内容：{{data.content}}</div>
      <div class="item">出行方式：{{data.transportation}}</div>
      <div class="item">所需人数：{{data.number}}</div>
      <div class="item">志愿福利：
        <el-tag v-for="(item,index) in data.welfares" :key="index">{{item.name}}</el-tag>
      </div>
      <div class="item">报名截止时间：{{data.lastTime}}</div>
      <div class="item">备注：{{data.remark}}</div>
      <div class="btns">
        <el-button type="primary" @click="apply()">报名</el-button>
        <el-button @click="cancel()">取消</el-button>
      </div>
    </div>
    <div class="index-left">
      <div class="login-info">
        <div class="title-left">欢迎,</div>
        <div v-if="this.$store.state.login.username==''" class="login-btn">
          <el-button type="primary" @click="login()">登录</el-button>
        </div>
        <div class="info" v-else>
          <p>顾梦佳</p>
          <p>1150299190</p>
          <p>信息与电子工程学院</p>
          <p>软件工程151</p>
          <div class="btn-group">
            <el-button type>个人中心</el-button>
            <el-button type>退出登录</el-button>
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
            <el-input v-model="peopelData.number" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学院" prop="college">
            <el-input v-model.number="peopelData.college" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="profession">
            <el-input v-model="peopelData.profession" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model.number="peopelData.class" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="peopelData.phone" @change="changeTel=true"></el-input>
            <span class="msg" v-if="changeTel">请及时在个人资料中更新联系电话</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">报 名</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <login></login>
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
      changeTel: false,
      dialogVisible: false,
      peopelData: {
        name: "顾梦佳",
        number: "1150299190",
        college: "信息与电子工程学院",
        profession: "软件工程",
        class: "151",
        phone: "13957541768",
      },
      data: {
        name: "红巷长青颐养园活动志愿者招募",
        des: "老吾老以及人之老，幼吾幼以及人之幼。有一天，你也会老，也渴望社会对你的关心与关爱。基于此，电气志协将又一次举办红巷长青颐养院志愿活动，希望通过这一活动给敬老院的老人们献上我们的爱心，呼吁更多人去关注老年人，让他们时时刻刻能感受到社会大家庭的温暖！还等啥呢，快快行动起来，加入我们吧！！！！！",
        place: "红巷长青颐养园",
        content: "陪老人聊天、做手工或者户外活动等。",
        time: " 3月9日14:00-16：00（周六）",
        transportation: "自行前往，可公交B支7转92路/49路（浙医二院站下）",
        lastTime: "3月7日 中午12:00",
        number: 50,
        remark: "报名成功后加群qq3464829404",
        welfares: [
          {
            value: 1,
            name: "综测加分",
          },
          {
            value: 2,
            name: "交通补贴",
          },
        ]
      },
    }
  },
  methods: {
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
    }
  }
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
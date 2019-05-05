<template>
  <div id="basic">
    <div class="index">
      <div class="basic-top">
        <p>个人基本信息</p>
        <div class="form-container">
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
            <el-form-item label="学号" prop="userId">
              <el-input v-model="peopelData.userId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="college">
              <el-input v-model="peopelData.college" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="profession">
              <el-input v-model="peopelData.profession" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="classNum">
              <el-input v-model="peopelData.classNum" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="peopelData.phone" :disabled="phoneDis"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <el-button type @click="edit">编辑</el-button>
            <el-button type @click="save" :disabled="phoneDis">保存</el-button>
          </div>
        </div>
      </div>
      <div class="basic-bottom">
        <p>志愿基本信息</p>
        <div class="basic-list">
          <div>
            <span>参与年份</span>
            <span>参与总时长</span>
            <span>参与总次数</span>
          </div>
          <div v-for="(item,index) in totallist" :key="index">
            <div v-if="item.year != 0">
              <span>{{item.year}}</span>
              <span>{{item.totaltime}}</span>
              <span>{{item.times}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="basic-bottom">
        <p>荣誉基本信息</p>
        <div class="basic-list">
          <div>
            <span>获得年份</span>
            <span>获得荣誉</span>
          </div>
          <div v-for="(item,index) in datalist" :key="index">
            <span>{{item.year}}</span>
            <span v-if="item.level===1">一星级志愿者</span>
            <span v-if="item.level===2">二星级志愿者</span>
            <span v-if="item.level===3">三星级志愿者</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'basic',
  data() {
    return {
      phoneDis: true,
      peopelData: {},
      datalist: [],
      totallist: [],
    }
  },
  methods: {
    //获取个人信息
    getInfo() {
      let params = {
        userId: this.$store.state.login.userId
      }
      this.$get('http://localhost:8880/user/findOneInfo', params)
        .then(res => {
          if (res.code === "ACK") {
            this.peopelData = res.data;
          }
        })
        .catch(() => {
        })
    },
    getList() {
      let params = {
        userId: this.$store.state.login.userId
      }
      this.$get('http://localhost:8880/enter/getUserTotal', params)
        .then(res => {
          if (res.code === "ACK") {
            this.totallist = res.data;
          }
        })
        .catch(() => {
        })
    },
    getAward() {
      let params = {
        id: this.$store.state.login.userId
      }
      this.$get('http://localhost:8880/award/getByUser', params)
        .then(res => {
          if (res.code === "ACK") {
            this.datalist = res.data;
          }
        })
        .catch(() => {
        })
    },
    edit() {
      this.phoneDis = false;
    },
    //编辑个人电话
    save() {
      let params = {
        userId: this.$store.state.login.userId,
        phone: this.peopelData.phone
      }
      this.$post('http://localhost:8880/user/updateInfo', params)
        .then(res => {
          if (res.code === "ACK") {
            this.phoneDis = true;
            this.$message.success('更新成功');
          }
        })
        .catch(() => {
        })
    }
  },
  mounted() {
    this.getInfo();
    this.getAward();
    this.getList();
  }
}
</script>
<style lang="less" scoped>
#basic {
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
  padding: 10px 20px;
}
.index-left {
  flex: 1 1;
  font-size: 14px;
  background-color: white;
  height: 300px;
}
.basic-bottom {
  border-top: 1px solid #d3dce6;
}
.form-container {
  width: 400px;
  margin-left: 100px;
}
.btns {
  margin: 20px 0 20px 150px;
}
span {
  display: inline-block;
  width: 100px;
  text-align: center;
  margin-top: 8px;
}
.basic-list {
  margin: 20px 0 40px 100px;
}
</style>
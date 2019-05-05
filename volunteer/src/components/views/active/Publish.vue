<template>
  <div id="publish">
    <div class="container">
      <el-form :inline="true" ref="form" :model="newFrom" label-width="100px" :rules="rules">
        <div>
          <el-form-item label="名称" prop="name">
            <el-input v-model="newFrom.name"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="简介" prop="des">
          <el-input type="textarea" resize="none" rows="4" v-model="newFrom.des"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="志愿内容" prop="content">
            <el-input type="textarea" resize="none" rows="4" v-model="newFrom.content"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="地点" prop="place">
            <el-input v-model="newFrom.place"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="志愿时间" prop="time">
          <el-date-picker
            v-model="newFrom.time"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择志愿时间"
          ></el-date-picker>
        </el-form-item>
        <div>
          <el-form-item label="志愿时长" prop="longtime">
            <el-input v-model="newFrom.longtime"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="所需人数" prop="num">
            <el-input v-model="newFrom.num"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item prop="welfare">
            <template>
              <span class="welfare">福利</span>
              <el-checkbox-group v-model="newFrom.welfare">
                <el-checkbox v-for="wel in welfares" :label="wel" :key="wel">{{wel}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
        </div>
        <el-form-item label="截止日期" prop="deadline">
          <el-date-picker
            v-model="newFrom.deadline"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择报名截止时间"
          ></el-date-picker>
        </el-form-item>
        <div>
          <el-form-item label="出行方式" prop="type">
            <el-radio v-model="newFrom.type" label="1">集体班车</el-radio>
            <el-radio v-model="newFrom.type" label="2">自行前往</el-radio>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="集合时间" prop="totime">
            <el-date-picker
              v-model="newFrom.totime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择集合时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="集合地点" prop="toplace">
            <el-input v-model="newFrom.toplace"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="btn-group">
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'publish',
  data() {
    return {
      newFrom: {
        activityId: "",
        name: "",
        des: "",
        content: "",
        place: "",
        time: "",
        deadline: "",
        num: "",
        type: '',
        toplace: "",
        totime: "",
        year: "",
        longtime: "",
        welfare: [],
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", tigger: 'blue' }, { mix: 5, max: 20, message: "长度在5-20个字符", tigger: "blue" }],
        des: [{ required: true, message: "请输入活动简介", tigger: 'blue' }, { mix: 2, max: 200, message: "长度在2-200个字符", tigger: "blue" }],
        content: [{ required: true, message: "请输入志愿内容", tigger: 'blue' }, { mix: 2, max: 100, message: "长度在2-100个字符", tigger: "blue" }],
        place: [{ required: true, message: "请输入活动地址", tigger: 'blue' }, { mix: 2, max: 50, message: "长度在2-50个字符", tigger: "blue" }],
        time: [{ required: true, message: "请选择活动时间", tigger: 'blue' }],
        deadline: [{ required: true, message: "请选择报名截止时间", tigger: 'blue' }],
        num: [{ required: true, message: "请输入活动所需人数", tigger: 'blue' }],
        type: [{ required: true, message: "请输入出行方式", tigger: 'blue' }],
        toplace: [{ required: true, message: "请输入集合地点", tigger: 'blue' }, { mix: 2, max: 20, message: "长度在2-20个字符", tigger: "blue" }],
        totime: [{ required: true, message: "请选择集合时间", tigger: 'blue' }],
        longtime: [{ required: true, message: "请输入活动时长", tigger: 'blue' }],
      },
      welfares: ['综测加分', '包饭', '包住', '交通补贴'],
    }
  },
  methods: {
    onSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.publish();
        } else {
          return false;
        }
      });
    },
    publish() {
      let activity = {
        ...this.newFrom,
      }
      var myDate = new Date().getFullYear();
      activity.welfare = activity.welfare.toString();
      activity.phone = this.$store.state.login.phone;
      activity.userId = this.$store.state.login.userId;
      activity.userName = this.$store.state.login.username;
      activity.year = myDate;
      let params = {
        activity: JSON.stringify(activity)
      }
      this.$post('http://localhost:8880/Activities/publish', params)
        .then(res => {
          if (res.code === "ACK") {
            let info = {
              enterId: "",
              activitesId: res.data,
              userId: this.$store.state.login.userId,
            }
            let params2 = {
              info: JSON.stringify(info)
            }
            this.$post('http://localhost:8880/enter/insertOne', params2)
              .then(res2 => {
                if (res2.code === "ACK") {
                  this.$message.success('发布成功！');
                 this.$refs['form'].resetFields();
                }
              })
              .catch(() => {
              })
          }
        })
        .catch(() => {
        })
    }
  }
}

</script>
<style lang="less" scoped>
.container {
  padding-top: 30px;
  padding-left: 50px;
  margin: 30px 30px 0;
  background-color: #fff;
  height: auto;
}
.el-textarea {
  width: 420px;
}
.el-form-item__content {
  padding: 100px;
}
.pick-time {
  width: 400px;
  margin-left: 100px;
}
#publish .el-input__inner {
  width: 200px;
}
.welfare {
  float: left;
  margin-left: 50px;
  margin-right: 23px;
  color: #606266;
}

.el-checkbox-group {
  width: 700px;
}
.btn-group {
  margin: 50px 0 100px 120px;
}
</style>
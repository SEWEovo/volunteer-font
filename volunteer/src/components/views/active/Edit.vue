<template>
  <div id="edit">
    <div class="container">
      <el-form :inline="true" :model="newFrom" label-width="100px">
        <div>
          <el-form-item label="名称">
            <el-input :disabled="disable" v-model="newFrom.name"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="地点">
            <el-input :disabled="disable" v-model="newFrom.place"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="简介">
          <el-input
            :disabled="disable"
            type="textarea"
            resize="none"
            rows="4"
            v-model="newFrom.des"
          ></el-input>
        </el-form-item>
        <div>
          <el-form-item label="志愿内容">
            <el-input
              :disabled="disable"
              type="textarea"
              resize="none"
              rows="4"
              v-model="newFrom.content"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="志愿时间">
          <el-date-picker
            :disabled="disable"
            v-model="newFrom.time"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择志愿时间"
          ></el-date-picker>
        </el-form-item>
        <div>
          <el-form-item label="所需人数">
            <el-input :disabled="disable" v-model="newFrom.num"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="出行方式">
            <el-radio :disabled="disable" v-model="newFrom.type" :label="1">集体班车</el-radio>
            <el-radio :disabled="disable" v-model="newFrom.type" :label="2">自行前往</el-radio>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <template>
              <span class="welfare">福利</span>
              <el-checkbox-group :disabled="disable" v-model="newFrom.welfare">
                <el-checkbox v-for="wel in welfares" :label="wel" :key="wel">{{wel}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
        </div>
        <el-form-item label="截止日期">
          <el-date-picker
            :disabled="disable"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="newFrom.deadline"
            type="datetime"
            placeholder="选择报名截止时间"
          ></el-date-picker>
        </el-form-item>
        <div>
          <el-form-item label="集合时间">
            <el-date-picker
              :disabled="disable"
              v-model="newFrom.totime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择集合时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="集合地点">
            <el-input :disabled="disable" v-model="newFrom.toplace"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="btn-group">
            <el-button v-if="disable==false" type="primary" @click="onSubmit">编辑</el-button>
            <el-button @click="cancle">返回</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'edit',
  data() {
    return {
      disable: false,
      id: '',
      newFrom: {},
      welfares: ['综测加分', '包饭', '包住', '交通补贴'],
    }
  },
  methods: {
    getList(id) {
      let params = {
        id: id,
        status: ""
      }
      this.$get('http://localhost:8880/Activities/getAll', params)
        .then(res => {
          if (res.code === "ACK") {
            this.newFrom = res.data[0];
            this.newFrom.welfare = this.newFrom.welfare.split(",");
          }
        })
        .catch(() => {
        })
    },
    onSubmit() {

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
          }
        })
        .catch(() => {
        })

    },
    cancle() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.disable = this.$route.params.disable;
    this.id = this.$route.params.id;
    this.getList(this.id);
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
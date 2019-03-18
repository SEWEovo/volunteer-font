<template>
  <div id="list">
    <div class="index">
      <el-tabs style="height:60px;">
        <el-tab-pane label="全部"></el-tab-pane>
        <el-tab-pane label="报名中"></el-tab-pane>
        <el-tab-pane label="已结束"></el-tab-pane>
      </el-tabs>
      <div class="list-item" v-for="(item,index ) in datalist" :key="index">
        <div class="item-left">
          <p class="item-name">{{item.name}}</p>
          <p class="item-content">{{item.content}}</p>
          <p class="time-bottom">
            <span class="item-time">{{item.time}}</span>
            <span class="item-status" v-if="item.status===1">已结束</span>
            <span class="item-status" v-if="item.status===0">报名中</span>
          </p>
        </div>
        <div class="item-bottom">
          <el-button type="info" @click="showDetial()">查看详情</el-button>
          <el-button type="primary" :disabled="item.status===0" @click="apply()">报名</el-button>
        </div>
      </div>
      <div class="index-bottom">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000"
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
    <login></login>
  </div>
</template>
<script>
import Login from './Login.vue';
export default {
  name: 'list',
  components: {
    login: Login
  },
  data() {
    return {
      currentPage: 1,
      datalist: [
        {
          name: "西湖志愿者活动",
          time: "2019-10-12",
          content: "每个人都有属于自己的“心灵家园”，守护心灵家园，照耀心灵世界，杭州第七人民医院志愿服务活动仍在继续！相信热心善良的你一定非常想加入我们。现面向全校招募七院志愿者。",
          status: 1
        },
        {
          name: "西湖志愿者活动",
          time: "2019-10-12",
          content: "每每次去医院常会看到长长的挂号队伍，导医台前聚集次去医院常会看到长长的挂号队伍，导医台前聚集着困惑询问的人员，自助挂号机前不会操作的老人小孩，这时披着红色小马甲的志愿者总会如约而至，为他们排忧解难。若你想要加入到这支鲜红的志愿队伍中，为医院贡献一份自己的力量，和白衣天使们共同传递无私神圣的爱，那就行动起来，加入西溪医院志愿者吧！",
          status: 0
        },
        {
          name: "西湖志愿者活动",
          time: "2019-10-12",
          content: "每个人都有属于自己的“心灵家园”，守护心灵家园，照耀心灵世界，杭州第七人民医院志愿服务活动仍在继续！相信热心善良的你一定非常想加入我们。现面向全校招募七院志愿者。",
          status: 1
        },
        {
          name: "西湖志愿者活动",
          time: "2019-10-12",
          content: "每每次去医院常会看到长长的挂号队伍，导医台前聚集次去医院常会看到长长的挂号队伍，导医台前聚集着困惑询问的人员，自助挂号机前不会操作的老人小孩，这时披着红色小马甲的志愿者总会如约而至，为他们排忧解难。若你想要加入到这支鲜红的志愿队伍中，为医院贡献一份自己的力量，和白衣天使们共同传递无私神圣的爱，那就行动起来，加入西溪医院志愿者吧！",
          status: 0
        },
        {
          name: "西湖志愿者活动",
          time: "2019-10-12",
          content: "每每次去医院常会看到长长的挂号队伍，导医台前聚集次去医院常会看到长长的挂号队伍，导医台前聚集着困惑询问的人员，自助挂号机前不会操作的老人小孩，这时披着红色小马甲的志愿者总会如约而至，为他们排忧解难。若你想要加入到这支鲜红的志愿队伍中，为医院贡献一份自己的力量，和白衣天使们共同传递无私神圣的爱，那就行动起来，加入西溪医院志愿者吧！",
          status: 0
        },
        {
          name: "西湖志愿者活动",
          time: "2019-10-12",
          content: "每每次去医院常会看到长长的挂号队伍，导医台前聚集次去医院常会看到长长的挂号队伍，导医台前聚集着困惑询问的人员，自助挂号机前不会操作的老人小孩，这时披着红色小马甲的志愿者总会如约而至，为他们排忧解难。若你想要加入到这支鲜红的志愿队伍中，为医院贡献一份自己的力量，和白衣天使们共同传递无私神圣的爱，那就行动起来，加入西溪医院志愿者吧！",
          status: 0
        },
      ]
    }
  },
  methods: {
    run: function () {
      this.$router.push('/listShow')
    },
    handleCurrentChange: function () {

    },
    showDetial: function () {
      this.$router.push('/Detail')
    },
    apply: function () {
      this.$store.commit("loginVisible", true);
    },
    login: function () {
      this.$store.commit("loginVisible", true);
    },
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
  .login-btn{
    margin-top:100px;
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
  height: 150px;
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
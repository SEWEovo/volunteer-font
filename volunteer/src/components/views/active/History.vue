<template>
  <div id="history">
    <div class="index">
      <div class="container">
        <el-tabs style="height:40px;" v-model="status" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="报名中" name="1"></el-tab-pane>
          <el-tab-pane label="已结束" name="2"></el-tab-pane>
        </el-tabs>
        <div class="history-item" v-for="(item,index) in datalist" :key="index">
          <div class="item-left">
            <p class="item-name">{{item.name}}</p>
            <p>
              <span class="item-time">2016-09-30</span>
              <span class="item-status" v-if="item.status===1">报名中</span>
              <span class="item-status" v-if="item.status===2">报名结束</span>
            </p>
          </div>
          <div class="item-right">
            <el-button @click="detail(item.activitesId,item.userId)">查看详情</el-button>
            <el-button>查看名单</el-button>
            <!-- <el-button @click="del(item.activitesId)">删除</el-button> -->
          </div>
        </div>
        <template>
          <div></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'history',
  data() {
    return {
      datalist: [],
      activitiesId: '',
      status: "0"
    }
  },
  methods: {
    handleClick(tab, event) {
      this.status = tab.index;
      this.getList();
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
      this.$get('http://localhost:8880/Activities/getAll', params)
        .then(res => {
          if (res.code === "ACK") {
            this.datalist = res.data;
          }
        })
        .catch(() => {
        })
    },
    del: function () {
      this.$router.push('/listShow')
    },
    detail: function (id,user) {
      if (user===this.$store.state.login.userId) {
        this.$router.push({
          name: 'Edit',
          params: {
            disable: true,
            id: id
          }
        })
      } else {
        this.$router.push({
          name: 'Edit',
          params: {
            disable: false,
            id: id
          }
        })
      }

    }
  },
  mounted() {
    this.getList();
  },
}

</script>
<style lang="less" scoped>
.container {
  margin: 30px;
  height: 860px;
  background-color: white;
  border-left: 10px;
}
.history-item {
  position: relative;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #cccccc;
  overflow: hidden;
}
.item-left {
  margin: 10px;
  p {
    margin: 6px;
  }
  p:nth-child(1) {
    margin-bottom: 0px;
  }
  .item-name {
  }
  .item-time {
    font-size: 12px;
    color: #949393;
  }
  .item-status {
    font-size: 12px;
    color: #949393;
  }
}

.item-right {
  position: absolute;
  right: 10px;
  top: 14px;
  .el-button {
    width: 80px;
    font-size: 12px;
    text-align: center;
    padding: 10px 0;
  }
}
</style>
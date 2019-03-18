<template>
  <div id="history">
    <div class="index">
      <div class="container">
        <el-tabs type="border-card" style="height:780px;">
          <el-tab-pane label="全部">
            <div class="history-item">
              <div class="item-left">
                <p class="item-name">XXX志愿者活动XXX</p>
                <p>
                  <span class="item-time">2016-09-30</span>
                  <span class="item-status">已结束</span>
                </p>
              </div>
              <div class="item-right">
                <el-button @click="detail()">查看详情</el-button>
                <el-button>查看名单</el-button>
                <el-button @click="run">删除</el-button>
              </div>
            </div>
            <div class="history-item">
              <div class="item-left">
                <p class="item-name">XXX志愿者活动XXX</p>
                <p>
                  <span class="item-time">2016-09-30</span>
                  <span class="item-status">已结束</span>
                </p>
              </div>
              <div class="item-right">
                <el-button>查看详情</el-button>
                <el-button @click="run">查看名单</el-button>
                <el-button @click="run">删除</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="报名中"></el-tab-pane>
          <el-tab-pane label="已结束"></el-tab-pane>
        </el-tabs>
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

    }
  },
  methods: {
    run: function () {
      this.$router.push('/listShow')
    },
    detail: function () {
      if (true) {
        this.$router.push({
          name: 'Edit',
          params: {
            disable: true
          }
        })
      } else {
        this.$router.push({
          name: 'Edit',
          params: {
            disable: false
          }
        })
      }

    }
  }
}

</script>
<style lang="less" scoped>
.container {
  margin: 30px;
}

.history-item {
  position: relative;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #cccccc;
  overflow: hidden;
}

.item-left {
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
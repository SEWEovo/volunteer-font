<template>
  <div id="history">
    <div class="index">
      <div class="list-item">
        <el-row v-for="(item,index ) in datalist" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <div class="header-title">
              <span>{{item.activityName}}</span>
              <el-button
                style="float: right;padding:2px"
                type="text"
                v-if="item.userStatus===0"
                @click="cancle(item.enterId)"
              >报名成功(点击可取消报名)</el-button>
              <el-button style="float: right;padding:2px" type="text" v-if="item.userStatus===1">进行中</el-button>
              <el-button
                style="float: right;padding:2px"
                type="text"
                v-if="item.userStatus===2"
              >参与成功</el-button>
              <el-button
                style="float: right;padding:2px"
                type="text"
                v-if="item.userStatus===-1"
              >报名但未参加</el-button>
            </div>
            <div class="des" v-if="item.userStatus===2">
              <p>参与年份: {{ item.year }}年</p>
              <p>参与时长: {{ item.longtime }}小时</p>
              <p>志愿评价: {{ item.score }}分</p>
            </div>
            <div class="des" v-else>
              <p>暂无数据</p>
            </div>
          </el-card>
        </el-row>
      </div>
      <div class="index-bottom">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="10"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history',
  data() {
    return {
      currentPage: 1,
      datalist: []
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleCurrentChange: function () {

    },
    //取消报名
    cancle(id) {

      this.$confirm("确定取消该活动的报名?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: id
          }
          this.$post('http://localhost:8880/enter/delOne', params)
            .then(res => {
              if (res.code === "ACK") {
                this.$message.success('取消成功');
                this.getList();
              }
            })
            .catch(() => {
              this.$message.error('该活动已开始，请联系负责人取消');
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    getList() {
      let params = {
        userId: this.$store.state.login.userId
      }
      this.$get('http://localhost:8880/enter/getByUser', params)
        .then(res => {
          if (res.code === "ACK") {
            this.datalist = res.data;
          }
        })
        .catch(() => {
        })
    },
  },
}

</script>
<style lang="less" scoped>
#history {
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
.list-item {
  margin-bottom: 0;
  box-shadow: none;
  position: relative;
  height: 720px;
}
.el-row {
  padding-bottom: 10px;
  width: 700px;
  margin: 0 auto;
}
.index-bottom {
  float: right;
  padding-top: 20px;
}
.header-title {
  padding: 12px 20px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.des {
  p {
    margin: 8px 0 8px 20px;
    font-size: 14px;
  }
}
</style>

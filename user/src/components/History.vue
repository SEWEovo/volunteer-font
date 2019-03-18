<template>
  <div id="history">
    <div class="index">
      <div class="list-item">
        <el-row v-for="(item,index ) in datalist" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <div class="header-title">
              <span>{{item.name}}</span>
              <el-button style="float: right;padding:2px" type="text">参与成功</el-button>
            </div>
            <div class="des">
              <p>参与年份: {{ item.time }}年</p>
              <p>参与时长: {{ item.long }}小时</p>
              <p>志愿评价: {{ item.assess }}分</p>
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
    <div class="index-left"></div>
  </div>
</template>

<script>
export default {
  name: 'history',
  data() {
    return {
      currentPage: 1,
      datalist: [
        {
          name: "西湖志愿者活动",
          time: "2019",
          long: 8,
          assess: 80
        },
        {
          name: "篮球志愿者活动",
          time: "2019",
          long: 12,
          assess: 80
        },
        {
          name: "马拉松志愿者活动",
          time: "2019",
          long: 8,
          assess: 70
        },
        {
          name: "当老师志愿者活动",
          time: "2019",
          long: 8,
          assess: 90
        },
        {
          name: "当老师志愿者活动",
          time: "2019",
          long: 8,
          assess: 90
        },
      ]
    }
  },
  methods: {
    handleCurrentChange: function () {

    },
  }
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
.index-left {
  flex: 1 1;
  font-size: 14px;
  background-color: white;
  height: 300px;
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

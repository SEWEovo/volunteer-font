<template>
  <div id="publishStar">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <span>2015年学生志愿者情况概况</span>
        </div>
        <div class="btns">
          <el-button type class="btn" @click="pubilsh">生成名单</el-button>
        </div>
        <div class="table-container">
          <div class="main-table">
            <el-table
              height="750px"
              ref="singleTable"
              :data="tableData.slice((cur-1)*pageSize,cur*pageSize)"
              :stripe="true"
              highlight-current-row
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" width="60"></el-table-column>
              <el-table-column property="userId" label="学号"></el-table-column>
              <el-table-column property="name" label="姓名"></el-table-column>
              <el-table-column property="college" label="学院"></el-table-column>
              <el-table-column property="profession" label="专业"></el-table-column>
              <el-table-column property="classNum" label="年级"></el-table-column>
              <el-table-column property="times" label="参与次数"></el-table-column>
              <el-table-column property="longTime" label="参与时长"></el-table-column>
              <el-table-column property="score" label="总分"></el-table-column>
            </el-table>
          </div>
          <div class="bottom-table">
            <el-pagination
              :current-page="cur"
              :page-sizes="[20, 40, 60]"
              :page-size="pageSize"
              layout="sizes,total, prev, pager, next"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PublishStar',
  data() {
    return {

      cur: 1,
      pageSize: 20,
      tableData: [],
      multipleSelection: [],
    }
  },
  methods: {
    getList() {
      let params = {
        // year:new Date().getFullYear(),
        year:"2018"
      }
      this.$get('http://localhost:8880/user/getTotal', params)
        .then(res => {
          if (res.code === "ACK") {
            this.tableData=res.data;
          }
        })
        .catch(() => {
        })
    },
    pubilsh: function () {
      console.log(this.multipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    itemChange() {

    }
  },
  mounted() {
   this.getList();
  }

}
</script>
<style lang="less" scoped>
.container {
  margin: 30px;
  height: 860px;
}

.table-top {
  width: 100%;
  height: 40px;
  text-align: center;
}

.table-container {
  width: 100%;
  height: 800px;
  background-color: white;
}

.main-table {
  width: 100%;
  height: 760px;
}

.bottom-table {
  width: 100%;
  height: 60px;
  .el-pagination {
    float: right;
    padding-right: 20px;
    font-weight: 500;
  }
}
.btn {
  margin-bottom: 10px;
}
</style>
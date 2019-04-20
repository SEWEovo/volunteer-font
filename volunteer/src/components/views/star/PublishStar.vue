<template>
  <div id="publishStar">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <span>{{new Date().getFullYear()}}年学生志愿者情况概况</span>
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
            >
              <el-table-column type="index" width="60"></el-table-column>
              <el-table-column property="userId" label="学号"></el-table-column>
              <el-table-column property="name" label="姓名"></el-table-column>
              <el-table-column property="college" label="学院"></el-table-column>
              <el-table-column property="profession" label="专业"></el-table-column>
              <el-table-column property="classNum" label="年级"></el-table-column>
              <el-table-column property="times" label="参与次数"></el-table-column>
              <el-table-column property="longTime" label="参与时长"></el-table-column>
              <el-table-column property="score" label="总分"></el-table-column>
              <el-table-column property="level" label="等级">
                <template slot-scope="scope">
                  <span v-if="scope.row.level===1">一星级</span>
                  <span v-if="scope.row.level===2">二星级</span>
                  <span v-if="scope.row.level===3">三星级</span>
                </template>
              </el-table-column>
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
      num1: 0,
      num2: 0,
      num3: 0
    }
  },
  methods: {
    getList() {
      let params = {
        year:new Date().getFullYear(),
      }
      this.$get('http://localhost:8880/user/getTotal', params)
        .then(res => {
          if (res.code === "ACK") {
            this.$get('http://localhost:8880/rule/getRule')
              .then(res2 => {
                if (res2.code === "ACK") {
                  this.num1 = res2.data.num1;
                  this.num2 = res2.data.num2;
                  this.num3 = res2.data.num3;
                  let a = this.num1 + this.num2 + this.num3;
                  this.tableData = res.data.slice(0, a);
                  for (let i = 0; i < this.tableData.length; i++) {
                    if (i <= this.num1 - 1) {
                      this.tableData[i].level = 1;
                    }
                    if (i <= this.num1 + this.num2 - 1 && i >= this.num1) {
                      this.tableData[i].level = 2;
                    }
                    if (i > this.num1 + this.num2 - 1) {
                      this.tableData[i].level = 3;
                    }
                  }
                }
              })
              .catch(() => {
              })
          }
        })
        .catch(() => {
        })
    },
    pubilsh: function () {
      for(var i=0;i<this.tableData.length;i++){
        this.tableData[i].year=new Date().getFullYear();
      }
      let params = {
        info: JSON.stringify(this.tableData)
      }
      this.$post('http://localhost:8880/award/make', params)
        .then(res => {
          if (res.code === "ACK") {
             this.$message.success("发布成功");
          }
        })
        .catch(() => {
        })
    },
    itemChange() { }
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
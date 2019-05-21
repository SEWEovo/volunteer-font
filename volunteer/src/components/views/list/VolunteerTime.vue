<template>
  <div id="VolunteerTime">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年份">
              <el-date-picker v-model="year2" type="year" value-format="yyyy" placeholder="选择年份" @change="searchBy"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-container">
          <div class="main-table">
            <el-table
              ref="singleTable"
              height="760"
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
              <el-table-column property="times" label="志愿次数"></el-table-column>
              <el-table-column property="longTime" label="志愿时长"></el-table-column>
            </el-table>
          </div>
          <div class="bottom-table">
            <el-pagination
              :current-page="cur"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
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
  name: 'VolunteerTime',
  data() {
    return {
      year2:"2019",
      year: "",
      quarter: 0,
      college: 0,
      cur: 1,
      pageSize: 20,
      tableData: [],
    }
  },
  methods: {
    getList() {
      let params = {
        year: this.year,
      }
      this.$get('http://localhost:8880/user/getTotal', params)
        .then(res => {
          if (res.code === "ACK") {
            this.tableData = res.data;
          }
        })
        .catch(() => {
        })
    },
    searchBy: function () {
      this.year=this.year2;
      this.getList();
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
    },
    handleCurrentChange: function (val) {
      this.cur = val;
    }

  },
  mounted() {
    this.year = new Date().getFullYear();
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
  height: 50px;
}
.search-item {
  float: left;
  width: 220px;
  span {
    font-size: 14px;
    color: #606266;
  }
  .el-date-editor.el-input {
    width: 140px;
  }
}

.table-container {
  width: 100%;
  height: 830px;
  background-color: white;
}

.main-table {
  width: 100%;
  height: 780px;
}

.bottom-table {
  width: 100%;
  height: 50px;
  .el-pagination {
    float: right;
    padding-right: 20px;
    font-weight: 500;
  }
}
</style>
<template>
  <div id="Star">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <div class="search-item">
            <span>年份</span>
            <el-date-picker v-model="year2" type="year" placeholder="选择年份" value-format="yyyy" @change="searchBy"></el-date-picker>
          </div>
          <el-button type class="btn" @click="onExport">导出</el-button>
        </div>
        <div class="table-container">
          <div class="main-table">
            <el-table
              ref="singleTable"
              :data="tableData"
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
              <el-table-column property="year" label="获得年份"></el-table-column>
              <el-table-column property="level" label="获得级别">
                <template slot-scope="scope">
                  <span v-if="scope.row.level===1">一星级志愿者</span>
                  <span v-if="scope.row.level===2">二星级志愿者</span>
                  <span v-if="scope.row.level===3">三星级志愿者</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Star',
  data() {
    return {
      year: new Date().getFullYear(),
      year2: "2019",
      tableData: [],
    }
  },
  mounted() {
    this.year = new Date().getFullYear();
    this.getList()
  },
  methods: {
    getList() {
      let params = {
        year: this.year,
      };
      this.$get("http://localhost:8880/award/getByYear", params)
        .then(res => {
          if (res.code === "ACK") {
            this.tableData = res.data;
          }
        })
        .catch(() => { });
    },
    searchBy: function () {
      this.year = this.year2;
      this.getList();
    },
    onExport() {
      this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.excelData = this.tableData //你要导出的数据list。
        this.export2Excel()
      }).catch(() => {

      });
    },
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../excel/Export2Excel'); //这里必须使用绝对路径
        const tHeader = ['学号', '姓名', '学院', '专业', '年级', '获得年份', '获得级别']; // 导出的表头名
        const filterVal = ['userId', 'name', 'college', 'profession', 'classNum', 'year', 'level']; // 导出的表头字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        var year=this.year;
        export_json_to_excel(tHeader, data, year+'星级志愿者');// 导出的表格名称，根据需要自己命名
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
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
  height: 800px;
  background-color: white;
}

.main-table {
  width: 100%;
  height: 700px;
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
.btn {
  float: right;
}
</style>
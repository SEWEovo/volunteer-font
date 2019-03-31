<template>
  <div id="VolunteerTime">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <el-select v-model="value8" filterable placeholder="请选择活动名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type class="btn" @click="onExport">导出</el-button>
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
              <el-table-column property="number" label="学号"></el-table-column>
              <el-table-column property="name" label="姓名"></el-table-column>
              <el-table-column property="college" label="学院"></el-table-column>
              <el-table-column property="profession" label="专业"></el-table-column>
              <el-table-column property="grade" label="年级"></el-table-column>
              <el-table-column property="phone" label="联系方式"></el-table-column>
              <el-table-column property="score" label="评分" width="120px;">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.score" :disabled="scoreable">
                    <el-option :value="1" :label="25"></el-option>
                    <el-option :value="2" :label="50"></el-option>
                    <el-option :value="3" :label="75"></el-option>
                    <el-option :value="4" :label="100"></el-option>
                  </el-select>
                </template>
              </el-table-column>
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
  name: 'Acitivies',
  data() {
    return {
      year: "",
      college: 0,
      cur: 1,
      pageSize: 20,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value8: '',
      colleges: [
        {
          value: 0,
          label: "全部"
        },
        {
          value: 1,
          label: "信息与电子工程学院"
        },
        {
          value: 2,
          label: "艺术设计学院"
        },
        {
          value: 3,
          label: "外国语学院"
        },
        {
          value: 4,
          label: "中德工程师学院"
        },
      ],
      tableData: [{
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 41,
        count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 111,
        count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 12,
        count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 12, count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 41, count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 21, count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 41, count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 111, count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 12, count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",

      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",

      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",

      },],
      scoreable: false,
    }
  },
  mounted() { this.getList() },
  methods: {
    getList() {
      //获取某个志愿者活动报名数据
      if (true) {
        this.scoreable = true;
      }
    },
    search: function () {
      let params = {
        year: this.year,
        college: this.college
      }
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
    },
    handleCurrentChange: function (val) {
      this.cur = val;
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
        const tHeader = ['学号', '姓名', '学院', '专业', '年级', '联系方式', '获得年份', '获得级别']; // 导出的表头名
        const filterVal = ['number', 'name', 'college', 'profession', 'grade', 'phone', 'year', 'level']; // 导出的表头字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '星级志愿者');// 导出的表格名称，根据需要自己命名
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
   height:860px;
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
  height:780px;
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
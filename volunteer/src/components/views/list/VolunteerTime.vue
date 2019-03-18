<template>
  <div id="VolunteerTime">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="年份">
              <el-date-picker
                v-model="searchForm.year"
                type="year"
                placeholder="选择年份"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="学院">
              <el-select v-model="college" placeholder="请选择学院" >
                <el-option
                  v-for="item in colleges"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchBy">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-container">
          <div class="main-table">
            <el-table
              ref="singleTable"
              height="660"
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
              <el-table-column property="phone" label="联系方式" width="120px;"></el-table-column>
              <el-table-column property="time" label="志愿时长"></el-table-column>
              <el-table-column property="count" label="志愿次数"></el-table-column>
              <el-table-column property="average" label="平均评价分"></el-table-column>
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
      year: "",
      quarter: 0,
      college: 0,
      cur: 1,
      pageSize: 20,
      searchForm: {
        year: "",
        name: "",
        college: ''
      },
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
        time: 21,
        count: 2,
        average: 12,
      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        time: 21,
        count: 2,
        average: 12,
      }, {
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
        time: 21,
        count: 2,
        average: 12,
      }, {
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
      },
      {
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
      }],
    }
  },
  methods: {
    searchBy: function () {
      let params = {
        year: this.year,
        quarter: this.quarter,
        college: this.college
      }
    },
    handleSizeChange: function (val) {
      this.pageSize = val;
    },
    handleCurrentChange: function (val) {
      this.cur = val;
    }

  }
}
</script>
<style lang="less" scoped>
.container {
  margin: 30px;
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
  height: 730px;
  background-color: white;
}

.main-table {
  width: 100%;
  height: 680px;
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
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
              ref="singleTable"
              :data="tableData.slice((cur-1)*pageSize,cur*pageSize)"
              :stripe="true"
              highlight-current-row
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" width="60"></el-table-column>
              <el-table-column property="number" label="学号"></el-table-column>
              <el-table-column property="name" label="姓名"></el-table-column>
              <el-table-column property="college" label="学院"></el-table-column>
              <el-table-column property="profession" label="专业"></el-table-column>
              <el-table-column property="grade" label="年级"></el-table-column>
              <el-table-column property="phone" label="联系方式"></el-table-column>
              <el-table-column property="range" label="等级">
                <template slot-scope="scope">
                  <span v-if="scope.row.range==1">一星级</span>
                  <span v-if="scope.row.range==2">二星级</span>
                  <span v-if="scope.row.range==3">三星级</span>
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
      range: [
        {
          name: "一星级",
          value: 1,
        }, {
          name: "二星级",
          value: 2,
        },
        {
          name: "三星级",
          value: 3,
        },
        {
          name: "四星级",
          value: 4,
        }
      ],
      cur: 1,
      pageSize: 20,
      tableData: [{
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        year: "1999",
        range: -1

      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        year: "1999",
        range: -1

      }, {
        number: '1150299192',
        name: '王小虎',
        college: '信息学院',
        profession: '软件工程',
        grade: '2015级',
        phone: "123123412321 ",
        year: "1999",
        level: "一星级",
        range: -1
      }],
      multipleSelection: [],
    }
  },
  methods: {
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
    for (var i = 0; i < 1; i++) {
      this.tableData[i].range = 1;
    }
    for (var i = 1; i < 3; i++) {
      this.tableData[i].range = 2;
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
  height: 40px;
  text-align: center;
}

.table-container {
  width: 100%;
  height: 750px;
  background-color: white;
}

.main-table {
  width: 100%;
  height: 690px;
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
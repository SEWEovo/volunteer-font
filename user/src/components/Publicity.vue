<template>
  <div id="publicity">
    <div class="index">
      <div class="table-title">
        <span>{{year}}年星级志愿者获得名单公示</span>
      </div>
      <div class="description">
        <p>说明: 星级志愿者分为一星级志愿者，二星级志愿者，三星级志愿者，四星级志愿者。其中一星级志愿者荣誉最高</p>
        <p>规则: 总分=志愿时长*30%+志愿次数*30%+服务评价*40%。分值计算仅限当年</p>
      </div>
      <div class="table-top">
        <div class="top-left">
          <div class="block">
            <el-date-picker v-model="year" type="year" value-format="yyyy" placeholder="选择年份"></el-date-picker>
          </div>
        </div>
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
            <el-table-column type="index" width="80" label="序号"></el-table-column>
            <el-table-column property="number" label="学号"></el-table-column>
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="college" label="学院"></el-table-column>
            <el-table-column property="designation" label="荣誉称号"></el-table-column>
            <el-table-column property="year" label="获得年份"></el-table-column>
          </el-table>
        </div>
        <div class="bottom-table">
          <el-pagination
            :current-page="cur"
            layout="total, prev, pager, next"
            :total="tableData.length"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "publicity",
  data() {
    return {
      cur: 1,
      year: "2019",
      tableData: [
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          designation: "一星级志愿者 ",
          year: "2019"
        },
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          designation: "一星级志愿者 ",
          year: "2019"
        },
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          designation: "一星级志愿者 ",
          year: "2019"
        },
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          designation: "二星级志愿者 ",
          year: "2019"
        }
      ],
    };
  },
  methods: {
    add: function () {
      this.addVisible = true;
    },
    onExport: function () { },
    searchHas: function () {
      if (this.searchValue == 1) {
        console.log("搜索学号");
      } else {
        console.log("搜索姓名");
      }
    },
    revoke: function () {
      this.$confirm("确定撤销该对象的权限?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "撤销成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消撤销"
          });
        });
    },
    choose: function (number) {
      this.ifActive = false;
      this.choosePeople = number;
      console.log(this.choosePeople);
    },
    doAdd: function () {
      this.$confirm("确定为" + this.choosePeople + "添加权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.addVisible = false;
          this.ifActive = true;
          this.choosePeople = -1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
          this.addVisible = false;
          this.ifActive = true;
          this.choosePeople = -1;
        });
    },
    searchByNumber: function () { },
    handleClose: function () {
      this.addVisible = false;
      this.ifActive = true;
      this.choosePeople = -1;
    }
  }
};
</script>
<style lang="less" scoped>
#publicity {
  display: flex;
  align-items: flex-start;
  width: 1100px;
  padding: 0 16px;
  margin: 10px auto;
  margin-top: 60px;
  height: 610px;
}
.index {
  flex-shrink: 0;
  margin-right: 10px;
  margin-bottom: 0;
  width: 100%;
  height: auto;
  background-color: white;
  padding: 20px;
}
.table-top {
  width: 100%;
  height: 60px;
}
.table-title {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}
.description {
  color: #949393;
  font-size: 14px;
  text-align: center;
}
.table-container {
  width: 100%;
  height: 600px;
  background-color: white;
}
.main-table {
  width: 100%;
  height: 580px;
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
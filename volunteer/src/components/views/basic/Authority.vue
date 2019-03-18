<template>
  <div id="authority">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <div class="top-left">
            <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
          </div>
          <div class="top-right">
            <el-select v-model="searchValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-model="searchText" placeholder="请输入内容"></el-input>
            <i class="el-icon-search" @click="searchHas"></i>
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
              <el-table-column type="index" width="60"></el-table-column>
              <el-table-column property="number" label="学号"></el-table-column>
              <el-table-column property="name" label="姓名"></el-table-column>
              <el-table-column property="college" label="学院"></el-table-column>
              <el-table-column property="profession" label="专业"></el-table-column>
              <el-table-column property="grade" label="年级"></el-table-column>
              <el-table-column property="phone" label="联系方式"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" class="delete-btn" @click="revoke(scope.row.id)">撤销权限</el-button>
                </template>
              </el-table-column>
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
        <el-dialog title="添加" :visible.sync="addVisible" width="40%" :before-close="handleClose">
          <div class="dialog-container">
            <div class="dialog-top">
              <el-input v-model="searchNumber" placeholder="请输入学号"></el-input>
              <i class="el-icon-search" @click="searchByNumber"></i>
            </div>
            <div class="dialog-middle">
              <div
                v-for="item in peopleData"
                :class=" choosePeople==item.number? 'listcontainer-active':'listcontainer'"
                :key="item.index"
              >
                <div class="people-list" @click="choose(item.number)">
                  <div>{{item.name}}</div>
                  <div>{{item.number}}</div>
                  <div>{{item.college}}</div>
                </div>
              </div>
            </div>
            <div class="dialog-bottom">
              <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="doAdd" :disabled="ifActive">添加权限</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "authority",
  data() {
    return {
      cur: 1,
      searchValue: 1,
      searchText: "",
      searchNumber: -1,
      addVisible: false,
      searchNumber: "",
      activeNumber: "",
      ifActive: true,
      choosePeople: -1,
      peopleData: [
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院"
        },
        {
          number: "1150299191",
          name: "王小虎",
          college: "信息与电子工程学院"
        },
        {
          number: "1150299193",
          name: "王小虎",
          college: "信息学院"
        },
        {
          number: "1150292192",
          name: "王小虎",
          college: "信息学院"
        },
        {
          number: "1150219192",
          name: "王小虎",
          college: "信息学院"
        }
      ],
      tableData: [
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          phone: "123123412321 "
        },
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          phone: "123123412321 "
        },
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          phone: "123123412321 "
        },
        {
          number: "1150299192",
          name: "王小虎",
          college: "信息学院",
          profession: "软件工程",
          grade: "2015级",
          phone: "123123412321 "
        }
      ],
      options: [
        {
          value: 1,
          label: "学号"
        },
        {
          value: 2,
          label: "姓名"
        }
      ]
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
.container {
  margin: 30px;
}
.table-top {
  height: 50px;
  margin: 20px 0 0 40px;
  .el-button {
    width: 70px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    padding: 0;
  }
  .el-icon-plus {
    font-size: 12px;
  }
}

.top-left {
  float: left;
}

.top-right {
  float: right;
  .el-select {
    width: 100px;
    float: left;
  }
  .el-input {
    margin-left: 10px;
    width: 200px;
  }
  .el-icon-search {
    position: absolute;
    color: gray;
    right: 40px;
    top: 40px;
    cursor: pointer;
  }
}
.table-container {
  width: 100%;
  height: 730px;
  background-color: white;
}

.main-table {
  width: 100%;
  height: 690px;
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

.delete-btn {
  padding: 8px;
  font-size: 12px;
}

.dialog-top {
  width: 100%;
  height: 45px;
  position: relative;
  .el-input {
    width: 140px;
    float: right;
  }
  .el-icon-search {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
  }
  .el-input__inner {
    height: 35px !important;
  }
}
.dialog-middle {
  padding: 10px 20px 0 20px;
  width: 90%;
  height: 400px;
  border: 1px solid #cccccc;
}
.listcontainer {
  background-color: white;
}
.listcontainer-active {
  background-color: #ecf8ff;
}
.people-list {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
  div {
    float: left;
  }
  div:nth-child(1) {
    text-align: left;
    width: 80px;
    margin-left: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  div:nth-child(2) {
    width: 120px;
    margin-right: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  div:nth-child(3) {
    width: 130px;
    margin-right: 30px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.people-list:hover {
  background-color: #ecf8ff;
}

.dialog-bottom {
  height: 30px;
  width: 100%;
  .el-pagination {
    font-weight: 500px;
    float: right;
  }
}

.dialog-footer {
  .el-button {
    width: 70px;
    font-size: 12px;
    text-align: center;
    padding: 10px 5px;
  }
}
</style>
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
              <el-table-column property="userId" label="学号"></el-table-column>
              <el-table-column property="name" label="姓名"></el-table-column>
              <el-table-column property="college" label="学院"></el-table-column>
              <el-table-column property="profession" label="专业"></el-table-column>
              <el-table-column property="classNum" label="年级"></el-table-column>
              <el-table-column property="phone" label="联系方式"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" class="delete-btn" @click="revoke(scope.row.userId)">删除权限</el-button>
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
                <div class="people-list" @click="choose(item.userId)">
                  <div>{{item.name}}</div>
                  <div>{{item.userId}}</div>
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
      peopleData: [],
      tableData: [],
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
  created() {
     this.getList();
  },
  methods: {
    //获取权限列表
     getList: function () {
      this.$get('http://localhost:8880/user/selectPermissionStudent')
        .then(res => {
          if (res.code === "ACK") {
            this.tableData = res.data;
          }
        })
        .catch(() => {
        })
    },
    add: function () {
      this.$get('http://localhost:8880/user/selectAll')
        .then(res => {
          if (res.code === "ACK") {
            this.peopleData = res.data;
            this.addVisible = true;
          }
        })
        .catch(() => {
        })

    },
    onExport: function () { },
    searchHas: function () {
      if (this.searchValue == 1) {
        console.log("搜索学号");
      } else {
        console.log("搜索姓名");
      }
    },
    revoke: function (id) {
      this.$confirm("确定撤销该对象的权限?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            userId: id
          }
          this.$post('http://localhost:8880/user/del', params)//此处用post方法 url是我服务器中的一个接口
            .then(res => {
              if (res.code === "ACK") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getList();
              }
            })
            .catch(() => {
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    choose: function (number) {
      this.ifActive = false;
      this.choosePeople = number;
    },
    doAdd: function () {
      this.$confirm("确定为" + this.choosePeople + "添加权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            userId: this.choosePeople
          }
          this.$post('http://localhost:8880/user/add', params)//此处用post方法 url是我服务器中的一个接口
            .then(res => {
              if (res.code === "ACK") {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.getList();
              }
            })
            .catch(() => {
            })
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
  height:860px;
}
.table-top {
  height: 50px;
  width: 100%;
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
  overflow: scroll;
  overflow-x: hidden;
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
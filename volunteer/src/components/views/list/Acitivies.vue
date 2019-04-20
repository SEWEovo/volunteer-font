<template>
  <div id="VolunteerTime">
    <div class="index">
      <div class="container">
        <div class="table-top">
          <el-select
            v-model="value8"
            filterable
            placeholder="请选择活动名称"
            @change="change"
            style="width:300px"
          >
            <el-option
              v-for="item in options"
              :key="item.activitesId"
              :label="item.name"
              :value="item.activitesId"
            ></el-option>
          </el-select>
          <el-button type class="btn" @click="onExport">导出</el-button>
          <el-button type class="btn" :disabled="true" v-if="status==3">已结束且更新</el-button>
          <el-button type class="btn" @click="update" v-else>一键更新</el-button>
        </div>
        <div class="table-container">
          <div class="main-table">
            <el-table
              ref="singleTable"
              height="800px"
              :data="tableData.slice((cur - 1) * pageSize, cur * pageSize)"
              :stripe="true"
              highlight-current-row
            >
              <el-table-column type="index" width="60"></el-table-column>
              <el-table-column property="userName" label="姓名"></el-table-column>
              <el-table-column property="userId" label="学号"></el-table-column>
              <el-table-column property="college" label="学院"></el-table-column>
              <el-table-column property="profession" label="专业"></el-table-column>
              <el-table-column property="classNum" label="年级"></el-table-column>
              <el-table-column property="phone" label="联系方式"></el-table-column>
              <el-table-column property="userStatus" label="状态" width="120px;">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.userStatus" :disabled="status==3">
                    <el-option :value="0" label="报名中"></el-option>
                    <el-option :value="1" label="进行中"></el-option>
                    <el-option :value="2" label="已完成"></el-option>
                    <el-option :value="-1" label="未完成"></el-option>
                  </el-select>
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
  name: "Acitivies",
  data() {
    return {
      year: "",
      college: 0,
      cur: 1,
      pageSize: 20,
      options: [],
      value8: "",
      tableData: [],
      status: 0,
      scoreable: false,
      longtime: 0,
    };
  },
  mounted() {
    this.getLast();
    this.getActivitiesList();
  },
  methods: {
    getLast() {
      let param = {
        userId: this.$store.state.login.userId,
      }
      //获取最新一条数据
      this.$get("http://localhost:8880/Activities/getLast", param)
        .then(res => {
          if (res.code === "ACK") {
            this.value8 = res.data.activitesId;
            this.longtime = res.data.longtime;
            this.status = res.data.status;
            let params = {
              activitesId: res.data.activitesId,
            }
            //获取该活动的名单
            this.$get("http://localhost:8880/enter/getByActivity", params)
              .then(res2 => {
                if (res2.code === "ACK") {
                  this.tableData = res2.data;
                  if (true) {
                    this.scoreable = true;
                  }
                }
              })
              .catch(() => { });
          }
        })
        .catch(() => { });
    },
    change() {
      this.getList()
    },
    getList() {
      //获取某个志愿者活动报名数据
      let params = {
        activitesId: this.value8,
        id: this.value8,
      };
      //获取该活动时长
      this.$get("http://localhost:8880/Activities/getAll", params)
        .then(res2 => {
          if (res2.code === "ACK") {
            this.longtime = res2.data[0].longtime;
            this.status = res2.data[0].status;
          }
        })
      //获取该活动名单
      this.$get("http://localhost:8880/enter/getByActivity", params)
        .then(res => {
          if (res.code === "ACK") {
            this.tableData = res.data;
            if (true) {
              this.scoreable = true;
            }
          }
        })
        .catch(() => { });
    },
    //获取下拉框活动列表
    getActivitiesList() {
      //活动列表
      let type = this.$store.state.login.type;
      if (type == 1) {
        let params = {
          userId: this.$store.state.login.userId,
        };
        this.$get("http://localhost:8880/Activities/selectByPublish", params)
          .then(res => {
            if (res.code === "ACK") {
              this.options = res.data;
              if (true) {
                this.scoreable = true;
              }
            }
          })
          .catch(() => { });
      }
      else {
        let params = {
          acitiviesId: "",
          status: ""
        };
        this.$get("http://localhost:8880/Activities/getAll", params)
          .then(res => {
            if (res.code === "ACK") {
              this.options = res.data;
              if (true) {
                this.scoreable = true;
              }
            }
          })
          .catch(() => { });
      }
    },
    //一键更新学生的志愿情况
    update() {
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].year = new Date().getFullYear();
        this.tableData[i].status = this.tableData[i].userStatus
        if (this.tableData[i].userStatus == 2) {
          this.tableData[i].longtime = this.longtime;
        }
        else {
          this.tableData[i].longtime = 0;
        }
      }
      let params = {
        info: JSON.stringify(this.tableData)
      }
      //更新
      this.$post('http://localhost:8880/enter/updateAll', params)
        .then(res => {
          if (res.code === "ACK") {
            let params = {
              id: this.value8,
            };
            //更新活动状态
            this.$post("http://localhost:8880/Activities/updateStatus", params)
              .then(res => {
                if (res.code === "ACK") {
                  this.$message.success("更新成功");
                  this.getList();
                }
              })
              .catch(() => { });
          }
        })
        .catch(() => {
        })
    },
    onExport() {
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.excelData = this.tableData; //你要导出的数据list。
          this.export2Excel();
        })
        .catch(() => { });
    },
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../../excel/Export2Excel"); //这里必须使用绝对路径
        const tHeader = ["学号", "姓名", "学院", "专业", "年级", "联系方式"]; // 导出的表头名
        const filterVal = [
          "userId",
          "name",
          "college",
          "profession",
          "classNum",
          "phone"
        ]; // 导出的表头字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, this.tableData.name + "活动参与名单"); // 导出的表格名称，根据需要自己命名
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
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
.el-table {
  height: 800px;
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
.btn {
  float: right;
  margin-left: 30px;
}
</style>
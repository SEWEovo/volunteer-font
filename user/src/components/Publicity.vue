<template>
  <div id="publicity">
    <div class="index">
      <div class="table-title">
        <span>{{year}}年星级志愿者获得名单公示</span>
      </div>
      <div class="description">
        <p>说明: 星级志愿者分为一星级志愿者，二星级志愿者，三星级志愿者，四星级志愿者。其中一星级志愿者荣誉最高</p>
        <p>规则: 总分=志愿时长*{{time}}%+志愿次数*{{count}}%。分值计算仅限当年</p>
      </div>
      <div class="table-top">
        <div class="top-left">
          <div class="block">
            <el-date-picker
              v-model="year2"
              type="year"
              value-format="yyyy"
              placeholder="选择年份"
              @change="searchBy"
              :clearable="false"
            ></el-date-picker>
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
            height="700"
            style="width: 100%;"
          >
            <el-table-column type="index" width="80" label="序号"></el-table-column>
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
</template>
<script>
export default {
  name: "publicity",
  data() {
    return {
      year: new Date().getFullYear(),
      time:"",
      count:"",
      year2: "2019",
      tableData: [],
    }
  },
  mounted() {
    this.year = new Date().getFullYear();
    this.getList();
    this.getRule();
  },
  methods: {
    getRule() {
      this.$get('http://localhost:8880/rule/getRule')
        .then(res => {
          if (res.code === "ACK") {
            this.time = res.data.totaltime;
            this.count = res.data.count;
          }
        })
        .catch(() => {
        })
    },
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
  height: 700px;
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
<template>
  <div id="condition">
    <div class="index">
      <div class="container">
        <div class="card">
          <div class="card-top">
            <span>星级志愿者</span>
          </div>
          <div class="card-container">
            <div class="card-left">
              <!-- <div class="row">
                <p>是否按学院分配名额</p>
                <div class="edit-item">
                  <el-radio
                    :disabled="starStandard.edit"
                    v-model="starStandard.ifCollege"
                    label="1"
                  >是</el-radio>
                  <el-radio
                    :disabled="starStandard.edit"
                    v-model="starStandard.ifCollege"
                    label="2"
                  >否</el-radio>
                </div>
              </div> -->
              <div class="row">
                <p>一星级志愿者分配人数</p>
                <div class="edit-item">
                  <el-input-number
                    :disabled="starStandard.edit"
                    v-model="starStandard.numberOne"
                    size="mini"
                    :min="1"
                    :max="100"
                    label="描述文字"
                  ></el-input-number>
                </div>
              </div>
              <div class="row">
                <p>二星级志愿者分配人数</p>
                <div class="edit-item">
                  <el-input-number
                    :disabled="starStandard.edit"
                    v-model="starStandard.numberTwo"
                    size="mini"
                    :min="1"
                    :max="100"
                    label="描述文字"
                  ></el-input-number>
                </div>
              </div>
              <div class="row">
                <p>三星级志愿者分配人数</p>
                <div class="edit-item">
                  <el-input-number
                    :disabled="starStandard.edit"
                    v-model="starStandard.numberThree"
                    size="mini"
                    :min="1"
                    :max="100"
                    label="描述文字"
                  ></el-input-number>
                </div>
              </div>
            </div>
            <div class="card-right">
              <el-button type="primary" @click="editQuarter('star')">编辑</el-button>
              <el-button type="success" @click="saveQuarter('star')">保存</el-button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-top">
            <span>分值计算公式</span>
          </div>
          <div class="card-container">
            <div class="card-left">
              <div class="row">
                <div class="edit-item formula">
                  <span>总分=志愿时长*</span>
                  <el-input
                    :disabled="formulaStandard.edit"
                    size="mini"
                    maxlength="2"
                    v-model="formulaStandard.time"
                  ></el-input>
                  <span>%+志愿次数*10*</span>
                  <el-input
                    :disabled="formulaStandard.edit"
                    size="mini"
                    maxlength="2"
                    v-model="formulaStandard.count"
                  ></el-input>
                  <span>%+志愿评价平均值*</span>
                  <el-input
                    :disabled="formulaStandard.edit"
                    size="mini"
                    maxlength="2"
                    v-model="formulaStandard.average"
                  ></el-input>%
                </div>
              </div>
            </div>
            <div class="card-right">
              <el-button type="primary" @click="editQuarter('formula')">编辑</el-button>
              <el-button type="success" @click="saveQuarter('formula')">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Condition",
  data() {
    return {
      starStandard: {
        ifCollege: "1",
        numberOne: 1,
        numberTwo: 1,
        numberThree: 1,
        edit: true
      },
      formulaStandard: {
        time: 30,
        count: 30,
        average: 40,
        edit: true
      }
    };
  },
  methods: {
    editQuarter: function (item) {
      if (item == "star") {
        this.starStandard.edit = false;
      } else {
        this.formulaStandard.edit = false;
      }
    },
    saveQuarter: function (item) {
      if (item == "star") {
        this.starStandard.edit = true;
      } else {
        let sum =
          this.formulaStandard.time +
          this.formulaStandard.count +
          this.formulaStandard.average;
        if (sum != 100) {
          this.$message.error("比例系数之和必须为100%");
        } else {
          this.formulaStandard.edit = true;
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  margin: 30px;
  height: 780px;
  background-color: white;
}
.card:nth-child(1) {
  width: 100%;
  height: 340px;
  .card-right {
    padding-top: 90px;
  }
}
.card:nth-child(2) {
  width: 100%;
  height: 150px;
  .card-right {
    padding-top: 15px;
  }
}

.card-top {
  padding: 30px;
  height: 30px;
  font-size: 20px;
  color: #004394; 
  border-bottom: 1px dotted #cccccc;
}

.card-container {
  margin-left: 70px;
  padding-top: 20px;
  height: auto;
  color: #606266;
  font-size: 16px;
}

.card-left {
  float: left;
  width: 700px;
  overflow: hidden;
  .row {
    width: 100%;
    height: 45px;
    overflow: hidden;
    .el-input {
      width: 50px;
    }
  }
  p {
    width: 160px;
    float: left;
    height: 30px;
    line-height: 30px;
    text-align: right;
    margin-right: 40px;
  }
}

.edit-item {
  width: 400px;
  height: 30px;
  margin: 14px 0;
  float: left;
  line-height: 30px;
}

.formula {
  width: 590px;
  .el-input__inner {
    padding: 0;
  }
}

.card-right {
  .el-button {
    width: 70px;
    font-size: 12px;
    text-align: center;
    padding: 10px 5px;
  }
}
</style>
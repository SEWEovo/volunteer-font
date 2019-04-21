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
        numberOne: 0,
        numberTwo: 0,
        numberThree: 0,
        edit: true
      },
      formulaStandard: {
        time: 0,
        count: 0,
        edit: true
      }
    };
  },
  methods: {
    getRule: function () {
      this.$get('http://localhost:8880/rule/getRule')
        .then(res => {
          if (res.code === "ACK") {
            this.starStandard.numberOne = res.data.num1;
            this.starStandard.numberTwo = res.data.num2;
            this.starStandard.numberThree = res.data.num3;
            this.formulaStandard.time = res.data.totaltime;
            this.formulaStandard.count = res.data.count;
          }
        })
        .catch(() => {
        })
    },
    editQuarter: function (item) {
      if (item == "star") {

        this.starStandard.edit = false;
      } else {
        this.formulaStandard.edit = false;
      }
    },
    saveQuarter: function (item) {
      if (item == "star") {
        let params = {
          num1: this.starStandard.numberOne,
          num2: this.starStandard.numberTwo,
          num3: this.starStandard.numberThree
        }
        this.$post('http://localhost:8880/rule/num', params)
          .then(res => {
            if (res.code === "ACK") {
              this.starStandard.edit = true;
              this.getRule()
            }
          })
          .catch(() => {
          })

      } else {
        let sum = 100;
          // this.formulaStandard.time +
          // this.formulaStandard.count +
          // this.formulaStandard.average;
        if (sum != 100) {
          this.$message.error("比例系数之和必须为100%");
        } else {
          let params = {
            count: this.formulaStandard.count,
            totaltime: this.formulaStandard.time,
          }
          this.$post('http://localhost:8880/rule/rule', params)
            .then(res => {
              if (res.code === "ACK") {
                this.formulaStandard.edit = true;
                this.getRule()
              }
            })
            .catch(() => {
            })


        }
      }
    }
  },
  mounted() {
    this.getRule();
  },
};
</script>
<style lang="less" scoped>
.container {
  margin: 30px;
  height: 860px;
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
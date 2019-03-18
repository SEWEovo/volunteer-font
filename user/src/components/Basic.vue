<template>
  <div id="basic">
    <div class="index">
      <div class="basic-top">
        <p>个人基本信息</p>
        <div class="form-container">
          <el-form
            :model="peopelData"
            status-icon
            ref="peopelData"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="peopelData.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="学号" prop="number">
              <el-input v-model="peopelData.number" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="学院" prop="college">
              <el-input v-model.number="peopelData.college" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="profession">
              <el-input v-model="peopelData.profession" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="class">
              <el-input v-model.number="peopelData.class" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model.number="peopelData.phone"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <el-button type>编辑</el-button>
            <el-button type>保存</el-button>
          </div>
        </div>
      </div>
      <div class="basic-bottom">
        <p>志愿基本信息</p>
        <div class="basic-list">
          <div>
            <span>志愿年份</span>
            <span>志愿次数</span>
            <span>志愿时长</span>
            <span>志愿评价</span>
            <span>获得荣誉</span>
          </div>
          <div v-for="(item,index) in datalist" :key="index">
            <span>{{item.year}}</span>
            <span>{{item.count}}</span>
            <span>{{item.long}}</span>
            <span>{{item.assess}}</span>
            <span v-if="item.award">{{item.award}}</span>
            <span v-if="item.award=='' ">无</span>
          </div>
        </div>
      </div>
    </div>
    <div class="index-left"></div>
  </div>
</template>
<script>
export default {
  name: 'basic',
  data() {
    return {
      peopelData: {
        name: "顾梦佳",
        number: "1150299190",
        college: "信息与电子工程学院",
        profession: "软件工程",
        class: "151",
        phone: "13957541768",
      },
      datalist: [
        {
          year: "2018",
          count: 2,
          long: 40,
          assess: 80,
          award: ""
        },
        {
          year: "2018",
          count: 2,
          long: 40,
          assess: 80,
          award: "一星级志愿者"
        },
        {
          year: "2018",
          count: 2,
          long: 40,
          assess: 80,
          award: "一星级志愿者"
        },
        {
          year: "2018",
          count: 2,
          long: 40,
          assess: 80,
          award: "一星级志愿者"
        },
      ]
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
#basic {
  display: flex;
  align-items: flex-start;
  width: 1100px;
  padding: 0 16px;
  margin: 10px auto;
  margin-top: 60px;
  height: 700px;
}
.index {
  flex-shrink: 0;
  margin-right: 10px;
  margin-bottom: 0;
  width: 794px;
  height: auto;
  background-color: white;
  padding: 20px;
}
.index-left {
  flex: 1 1;
  font-size: 14px;
  background-color: white;
  height: 300px;
}
.basic-top {
  border-bottom: 1px solid #d3dce6;
}
.form-container {
  width: 400px;
  margin-left: 100px;
}
.btns {
  margin: 50px 0 30px 100px;
}
span {
  display: inline-block;
  width: 100px;
  text-align: center;
  margin-top: 8px;
}
.basic-list {
  margin: 20px 0 40px 100px;
}
</style>
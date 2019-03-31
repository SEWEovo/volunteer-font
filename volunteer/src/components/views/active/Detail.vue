<template>
  <div class="detail">
    <div class="container">
      <div class="detail-page">
        <div class="row">
          <span>名称:</span>
          <span>{{list.name}}</span>
        </div>
        <div class="row">
          <span>地点:</span>
          <span>{{list.place}}</span>
        </div>
        <div class="row">
          <span>简介:</span>
          <span>{{list.des}}</span>
        </div>
        <div class="row">
          <span>志愿内容:</span>
          <span>{{list.content}}</span>
        </div>
        <div class="row">
          <span>人数:</span>
          <span>{{list.num}}</span>
        </div>
        <div class="row">
          <span>志愿时间:</span>
          <span>{{list.date}}</span>
        </div>
        <div class="row">
          <span>报名截止时间:</span>
          <span>{{list.deadline}}</span>
        </div>
        <div class="row">
          <span>集合地点:</span>
          <span>{{list.area}}</span>
        </div>
        <div class="row">
          <span>集合时间:</span>
          <span>{{list.time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail",
  data() {
    return {
      list: {
        name: "太子湾志愿者",
        place: "太子湾",
        des: "一次很好的体验机会",
        content: "负责游客的指导",
        date: "2019年10月20日",
        deadline: "2019年9月25日",
        welfare: "很多福利",
        area: "食堂一楼",
        time: "7:00",
        num: "50"
      },
      id:"",
    }
  },
  methods: {
    
  },
  mounted(){

  }
}
</script>

<style lang="less" scope>
.container {
  margin: 30px;
  background-color: #fff;
  height: 780px;
}
.detail-page {
  padding: 40px 0 0 80px;
}
.row {
  margin-bottom: 30px;
  span:nth-child(1) {
    margin-right: 20px;
    font-size: 18px;
  }
}
</style>

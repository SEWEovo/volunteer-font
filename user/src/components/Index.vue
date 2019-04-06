<template>
  <div class="index">
    <el-carousel :interval="4000" type="card" height="580px" width="500px">
      <el-carousel-item v-for="img in items" :key="img.value">
          <img :src="'../'+img.value">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      items:[
        {
          value:"assets/img/2.jpg",
        }
    
        // "../assets/img/2.jpg",
        // "../assets/img/3.jpg",
        // "../assets/img/4.jpg",
        // "../assets/img/timg.jpg",
        // "../assets/img/timg.jpg",
      ]
    }
  },
  methods: {
  }
}
</script>
<style>
.index{
    padding:100px 100px 0;
    height: 720px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
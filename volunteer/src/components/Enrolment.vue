<template>
  <div class="index">
    <div class="container">
      <button @click="click">获取json</button>
    </div>
  </div>
</template>
<script>
   export default {
  name: 'Enrolment',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name:"123",
      age:12
    }
  },
    methods:{
      click(){
        let params={
          name:this.name,
          age:this.age
        }
          this.$post('http://localhost:3000/test',params)//此处用post方法 url是我服务器中的一个接口
          .then(res => {
                    console.log(res.data);
          })
          .catch(() => {
             })
      //     this.$get('http://localhost:3000/test')//此处用post方法 url是我服务器中的一个接口
      //     .then(res => {
      //               console.log(res);
      //     })
      //     .catch(() => {
      //        })

      }
    }
}
</script>
<style lang="less" scoped>

</style>
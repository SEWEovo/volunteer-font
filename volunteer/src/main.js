// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './axios'
import store from './store'
import Blob from './excel/Blob.js'
import Export2Excel from './excel/Export2Excel.js'
import moment from 'moment'//日期格式处理
import {
  fetchGet,
  fetchPost,
} from './axios/index'
Vue.config.productionTip = false

Vue.filter('dateformat',function(value){

  return moment(value).format('YYYY-MM-DD HH:mm:ss')

})
//定义全局变量
Vue.prototype.$get = fetchGet
Vue.prototype.$post = fetchPost


Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

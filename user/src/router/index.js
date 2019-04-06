import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import List from '@/components/List'
import Basic from '@/components/Basic'
import Publicity from '@/components/Publicity'
import Detail from '@/components/Detail'
import History from '@/components/History'
Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    //志愿活动
    {
      path: '/List',
      name: 'List',
      component: List
    },
    //志愿活动详情
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail,
    },
    //信息公示
    {
      path: '/Publicity',
      name: 'Publicity',
      component: Publicity
    },
    //个人中心-基本资料
    {
      path: '/Basic',
      name: 'Basic',
      component: Basic
    },
    {
      path: '/History',
      name: 'History',
      component: History
    },


    

  ]
})

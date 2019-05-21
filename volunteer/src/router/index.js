import Vue from 'vue'
import Router from 'vue-router'
import Authority from '@/components/views/basic/Authority'
import Condition from '@/components/views/basic/Condition'
import Star from '@/components/views/star/Star'
import publishStar from '@/components/views/star/publishStar'
import History from '@/components/views/active/History'
import Publish from '@/components/views/active/Publish'
import Edit from '@/components/views/active/Edit'
import VolunteerTime from '@/components/views/list/VolunteerTime'
import Acitivies from '@/components/views/list/Acitivies'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)
const router = new Router({
  routes: [
    //登录
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [ //评比条件设置
        {
          path: '/Condition',
          name: 'Condition',
          component: Condition
        },
        //发布权限管理
        {
          path: '/Authority',
          name: 'Authority',
          component: Authority
        },
        //发布历史
        {
          path: '/History',
          name: 'History',
          component: History,
          meta: {
            keepAlive: true // 需要被缓存
          }
      
        },
        {
          path: '/Edit',
          name: 'Edit',
          component: Edit
        },
        //发布历史
        {
          path: '/Star',
          name: 'Star',
          component: Star
        },
        //志愿者概况
        {
          path: '/VolunteerTime',
          name: 'VolunteerTime',
          component: VolunteerTime
        },
        {
          path: '/Acitivies',
          name: 'Acitivies',
          component: Acitivies
        },
        //志愿者活动发布
        {
          path: '/Publish',
          name: 'Publish',
          component: Publish
        },
        //生成当年星级志愿者
        {
          path: '/publishStar',
          name: 'publishStar',
          component: publishStar
        },
      ]
    },

  ]
})
export default router;

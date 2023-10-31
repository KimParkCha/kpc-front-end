import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Create from '@/views/Create'
import Login from '@/views/Login'

Vue.use(Router) // vue 라우터 사용

export default new Router({
  mode: 'history', // history 모드를 사용할시 url에 #이 들어가지 않습니다.
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/create',
      component: Create,
    },
  ],
})

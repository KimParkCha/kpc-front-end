import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Create from '@/components/Create'
import Table from '@/components/Table'

Vue.use(Router) // vue 라우터 사용

export default new Router({
  mode: 'history', // history 모드를 사용할시 url에 #이 들어가지 않습니다.
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/table',
      component: Table,
    },
    {
      path: '/create',
      component: Create,
    },
  ],
})

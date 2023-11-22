import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MapView from '../views/MapView.vue'
import MyPageView from '../views/MyPageView.vue'
import CreateView from '../views/CreateView.vue'
// import TodayNewsView from '../views/TodayNewsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView
    },
    {
      path: '/todayNews',
      name: 'todayNews',
      component: MyPageView
    }
  ]
})

export default router

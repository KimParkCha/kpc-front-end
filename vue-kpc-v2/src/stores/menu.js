import { ref } from 'vue'
import { defineStore } from 'pinia'
import userAPI from '@/api/user'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore

const { user, token } = userStore

export const useMenuStore = defineStore('menuStore', () => {
  const menuList = ref([
    { name: '회원가입', show: true, routeName: 'create' },
    { name: '로그인', show: true, routeName: 'login' },
    { name: '마이페이지', show: false, routeName: 'mypage' },
    { name: '로그아웃', show: false, routeName: 'logout' }
  ])

  const changeMenuState = () => {
    console.log('changeMenuState: ' + user)
    menuList.value = menuList.value.map((item) => ({ ...item, show: !item.show }))
  }
  return {
    menuList,
    changeMenuState
  }
})

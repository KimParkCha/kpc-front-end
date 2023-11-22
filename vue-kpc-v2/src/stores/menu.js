import { ref } from 'vue'
import { defineStore } from 'pinia'
import userAPI from '@/api/user'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore

const { user, token } = userStore

export const useMenuStore = defineStore('menuStore', () => {
  const menuList = ref([])

  const loginMenu = ref([
    { name: '회원가입', isLogin: false, routeName: 'signup' },
    { name: '로그인', isLogin: false, routeName: 'login' }
  ])
  const logoutMenu = ref([
    { name: '마이페이지', isLogin: true, routeName: 'mypage' },
    { name: '로그아웃', isLogin: true, routeName: 'logout' }
  ])
  const changeMenuState = () => {
    // 세션에 데이터가 남아있는지 여부를 통해서 메뉴리스트를 반환
    if (sessionStorage.getItem('accessToken') != null) {
      menuList.value = logoutMenu.value
    } else {
      menuList.value = loginMenu.value
    }
  }
  return {
    menuList,
    changeMenuState
  }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { storeToRefs } from 'pinia'

export const useMenuStore = defineStore('menuStore', () => {

  const userStore = useUserStore();
  const { user, getUserInfo } = userStore;
  const { isLogin } = storeToRefs(userStore)

  const menuList = ref([
    { name: '회원가입', show: true, routeName: 'create' },
    { name: '로그인', show: true, routeName: 'login' },
    { name: '마이페이지', show: false, routeName: 'mypage' },
    { name: '로그아웃', show: false, routeName: 'logout' }
  ])

  const changeMenuState = () => {
    
    console.log("change :" + isLogin.value)
   
    menuList.value = menuList.value.map((item) => ({ ...item, show: !item.show }))
  }
  return {
    menuList,
    changeMenuState
  }
})

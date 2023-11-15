import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import userAPI from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const orgUser = ref(null)
  const orgToken = ref(null)
  const isLogin = ref(false)

  const user = computed(() => {
    return orgUser.value
  })
  const token = computed(() => {
    return orgToken.value
  })
  const setUser = (user) => {
    orgUser.value = user
  }

  const setToken = (token) => {
    orgToken.value = token
  }
  const login = async (userInfo) => {
    console.log('store login')
    await userAPI.loginUser(
      userInfo,
      ({ data }) => {
        console.log(data)
        console.log('data ' + data.response)
        console.log('data status ' + data.status)
        console.log('data token ' + data.token)

        if (data.response === 'success') {
          setUser(data.user)
          setToken(data.token)
          console.log('5')
          sessionStorage.setItem('accessToken', data.token)
        } else {
          console.log('로그인 실패')
          isLogin.value = false
        }
      },
      () => {
        console.log('로그인 실패')
      }
    )
  }

  return { user, token, isLogin, login }
})

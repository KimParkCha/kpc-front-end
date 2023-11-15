import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import userAPI from '@/api/user'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('user', () => {
  const orgUser = ref(null)
  const orgToken = ref(null)
  const isLogin = ref(false)
  const isVaildToken = ref(false)

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
        console.log('data response' + data.response)
        console.log('data message ' + data.message)
        console.log('data ref ' + data.data)

        if (data.response === 'success') {
          // setUser(data.user)
          setToken(data.token)
          console.log('success5')
          sessionStorage.setItem('accessToken', data.accessToken)
          sessionStorage.setItem('refreshToken', data.refreshToken)
          console.log("sessiontStorage에 담았다", isLogin.value);
        } else {
          console.log('로그인 실패2')
          isLogin.value = false
          isVaildToken.value = false
        }
      },
      (error) => {
        console.error(error)
      }
    )
  }



  return { user, token, isLogin, isVaildToken, login }
})

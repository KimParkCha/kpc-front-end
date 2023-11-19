import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import userAPI from '@/api/user'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const orgToken = ref(null)
  const isLogin = ref(false)
  const isValidToken = ref(false)

  const user = computed(() => {
    return userInfo.value
  })
  const token = computed(() => {
    return orgToken.value
  })
  const setUser = (user) => {
    userInfo.value = user
  }

  const setToken = (token) => {
    orgToken.value = token
  }
  const login = async (userInfo) => {
    console.log('store login')
    // setUser({ test: 'test' })
    // setToken({ accessToken: 'asdasdasd' })

    // sessionStorage.setItem('accessToken', 'asdad')
    // sessionStorage.setItem('refreshToken', 'asdasd')
    await userAPI.loginUser(
      userInfo,
      ({ data }) => {
        console.log(data)
        console.log('data response' + data.response)
        console.log('data message ' + data.message)
        console.log('data ref ' + data.data)

        if (data.response === 'success') {
          setUser(data.user)
          setToken(data.accessToken)
          console.log('success5')

          isLogin.value = true
          isValidToken.value = true

          sessionStorage.setItem('accessToken', data.accessToken)
          sessionStorage.setItem('refreshToken', data.refreshToken)
          console.log('sessiontStorage에 담았다', isLogin.value)
        } else {
          console.log('로그인 실패2')
          isLogin.value = false
          isValidToken.value = false
        }
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const getUserInfo = (token) => {
    console.log('1. token', token)
    let decodeToken = jwtDecode(token)
    console.log('2. decodeToken', decodeToken)
    userAPI.getUser(
      decodeToken.email,
      (response) => {
        console.log("data   " + response.data.name)
        if (response.status === 200) {
          userInfo.value = response.data
          setUser(response.data)
          console.log('3. getUserInfo data >> ', response.data)
        } else {
          console.log('유저 정보 없음!!!!')
        }
      },
      async (error) => {
        console.error('getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ')
        isValidToken.value = false

        // await tokenRegenerate()
      }
    )
  }

  return { userInfo, user, token, isLogin, isValidToken, login, getUserInfo }
})

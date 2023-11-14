import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import userAPI from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const orgUser = ref(null)
  const orgToken = ref(null)

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
  const login = (user) => {
    setUser(user)
    setToken('토큰입니다')
    return user
    // userAPI.loginUser(
    //   user,
    //   ({ data }) => {
    //     console.log(data)
    //     console.log('로그인 성공')
    //     setUser(data.user)
    //     setUser(data.token)
    //     router.push({ name: 'home' })
    //   },
    //   () => {
    //     console.log('로그인 실패')
    //   }
    // )
  }

  return { user, token, login }
})

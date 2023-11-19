import axios from 'axios'
// import userAPI from '@/api/user'
// import { useUserStore } from '@/stores/user'

const { VITE_API_BASE_URL } = import.meta.env
// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })

  // Request 발생 시 적용할 내용.
  instance.defaults.headers.common['Authorization'] = ''
  instance.defaults.headers.post['Content-Type'] = 'application/json'
  instance.defaults.headers.put['Content-Type'] = 'application/json'

  // const userStore = useUserStore()
  // const { user, token } = userStore
  // Request, Response 시 설정한 내용을 적용.
  instance.interceptors.request.use((config) => {
    console.log('console' + config)
    // console.log('user: ' + user)
    // console.log('token:' + token)
    return config
  }),
    (error) => {
      return Promise.reject(error)
    }

  let isTokenRefreshing = false

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const {
        config,
        response: { status }
      } = error

      // 페이지가 새로고침되어 저장된 accessToken이 없어진 경우.
      // 토큰 자체가 만료되어 더 이상 진행할 수 없는 경우.
      if (status == httpStatusCode.UNAUTHORIZED) {
        // 요청 상태 저장
        const originalRequest = config
        console.log('console222' + config)
        // Token을 재발급하는 동안 다른 요청이 발생하는 경우 대기.
        // 다른 요청을 진행하면, 새로 발급 받은 Token이 유효하지 않게 됨.
        if (!isTokenRefreshing) {
          isTokenRefreshing = true

          // 에러가 발생했던 컴포넌트의 axios로 이동하고자하는 경우
          // 반드시 return을 붙여주어야한다.
          return await instance.post('/user/refresh').then((response) => {
            const newAccessToken = response.data.Authorization
            console.log('console333' + config)
            instance.defaults.headers.common['Authorization'] = newAccessToken
            originalRequest.headers.Authorization = newAccessToken

            isTokenRefreshing = false

            // 에러가 발생했던 원래의 요청을 다시 진행.
            return instance(originalRequest)
          })
        }
      } else if (status == httpStatusCode.FORBIDDEN) {
        console.log('console444' + config)
        alert(error.response.data.message)
      }

      return Promise.reject(error)
    }
  )

  return instance
}

export { localAxios }

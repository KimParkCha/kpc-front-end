// 비동기 통신하는 코드들을 싹다 모아놓음
import { localAxios } from '@/utils/http-commons'

const userAPI = localAxios()

const registUser = async (user, success, fail) => {
  await userAPI.post(`/user/register`, user).then(success).catch(fail)
}

const loginUser = async (user, success, fail) => {
  console.log('user: ', user)
  await userAPI.post(`/user/login`, user).then(success).catch(fail)
  console.log('api user 성공??')
}

const getUser = async (email, success, fail) => {
  userAPI.defaults.headers['Authorization'] = sessionStorage.getItem('accessToken')
  await userAPI.get(`/user/detailUser/${email}`).then(success).catch(fail)
}

const logout = async (userid, success, fail) => {
  await userAPI.get(`/user/logout/${userid}`).then(success).catch(fail)
}

export default { registUser, loginUser, getUser, logout }

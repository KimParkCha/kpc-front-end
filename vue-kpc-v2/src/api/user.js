// 비동기 통신하는 코드들을 싹다 모아놓음
import { localAxios } from '@/utils/http-commons'

const userAPI = localAxios()

const registUser = (user, success, fail) => {
  userAPI.post(`/user/register`, user).then(success).catch(fail)
}

const loginUser = (user, success, fail) => {
  userAPI.post(`/user/login`, user).then(success).catch(fail)
}

const getUser = (user_id, success, fail) => {
  userAPI.get(`/user/detailUser/${user_id}`).then(success).catch(fail)
}

export default { registUser, loginUser, getUser }

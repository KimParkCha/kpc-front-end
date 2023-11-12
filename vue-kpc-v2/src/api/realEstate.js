import { localAxios } from '@/utils/http-commons'

const deptAPI = localAxios()

// ㅣ키워드를 포함하는 시군구 정보 요청
const getRegions = (keyword, success, fail) => {
  deptAPI
    .get('/api/region/list', {
      params: {
        keyword: keyword
      }
    })
    .then(success)
    .catch(fail)
}

// 부서 조회
const get = (deptno, success, fail) => {
  deptAPI.get(`/api/dept/${deptno}`).then(success).catch(fail)
}

// 부서 삭제
const del = (deptno, success, fail) => {
  deptAPI.delete(`/api/dept/${deptno}`).then(success).catch(fail)
}

// 부서 등록
const register = (dept, success, fail) => {
  deptAPI.post(`/api/dept/`, JSON.stringify(dept)).then(success).catch(fail)
}

// 부서 수정
const modify = (dept, success, fail) => {
  deptAPI.put(`/api/dept/${dept.deptno}`).then(success).catch(fail)
}

export default { getRegions, get, del, register, modify }

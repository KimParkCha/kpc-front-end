import { localAxios, backAxios } from '@/utils/http-commons'

const houseAPI = backAxios()

// ㅣ키워드를 포함하는 시군구 정보 요청
const getRegions = (keyword, success, fail) => {
  houseAPI
    .get('/api/region/list', {
      params: {
        keyword: keyword
      }
    })
    .then(success)
    .catch(fail)
}

// 부서 조회
const getComplexes = (ia, success, fail) => {
  console.log(ia)
  houseAPI
    .get(`/api/complex/list`, {
      params: {
        ha: ia.ha,
        oa: ia.oa,
        pa: ia.pa,
        qa: ia.qa
      }
    })
    .then(success)
    .catch(fail)
}

const getDetail = (complexNo, success, fail) => {
  houseAPI.get(`/api/complex/${complexNo}`).then(success).catch(fail)
}

const getRealPrices = (complexNo, success, fail) => {
  houseAPI.get(`/api/realprice/list/${complexNo}`).then(success).catch(fail)
}

export default { getRegions, getComplexes, getDetail, getRealPrices }

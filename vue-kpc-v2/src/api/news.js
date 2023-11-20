import { newsAxios } from '@/utils/http-commons'

const newsAPI = newsAxios()

// ㅣ키워드를 포함하는 시군구 정보 요청
const getNewsList = (keyword, success, fail) => {
  houseAPI
    .get('/api/region/list', {
      params: {
        keyword: keyword
      }
    })
    .then(success)
    .catch(fail)
}

export default { getNewsList }

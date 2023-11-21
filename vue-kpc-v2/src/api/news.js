import { newsAxios } from '@/utils/http-commons'

const newsAPI = newsAxios()

// ㅣ키워드를 포함하는 시군구 정보 요청
const getNewsList = (cityCode, dsvnCode , success, fail) => {
    newsAPI
    .get(`/localnews/cityCode/${cityCode}/dsvnCode${dsvnCode}`)
    .then(success)
    .catch(fail)
}

export default { getNewsList }

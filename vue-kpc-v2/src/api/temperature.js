import { newsAxios } from '@/utils/http-commons'

const newsAPI = newsAxios()

// ㅣ키워드를 포함하는 시군구 정보 요청
const getTemperature = (success, fail) => {
    newsAPI
    .get(`/localnews/temperature`)
    .then(success)
    .catch(fail)
}

export default { getTemperature }

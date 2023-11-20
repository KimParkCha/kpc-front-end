<script setup>
import { ref, onMounted, watch } from 'vue'
import RealEstateListItem from './RealEstateListItem.vue'
import complexAPI from '@/api/realEstate'
import RealEstateDetail from './RealEstateDetail.vue'
const props = defineProps(['receivedKeyword'])
let map = null
let clusterer = null
let geocoder = null

const keyword = ref('')
const selectedMarker = ref(null)

const detail = ref({
    "complexNo": "14419",
    "complexName": "초당유화1차",
    "cortarNo": "5115011200",
    "realEstateTypeCode": "APT",
    "realEstateTypeName": "아파트",
    "detailAddress": "182-2",
    "roadAddress": "연당길 94-3",
    "latitude": 37.7861,
    "longitude": 128.91371,
    "totalHouseholdCount": 90,
    "totalLeaseHouseholdCount": 0,
    "permanentLeaseHouseholdCount": 0,
    "nationLeaseHouseholdCount": 0,
    "civilLeaseHouseholdCount": 0,
    "publicLeaseHouseholdCount": 0,
    "longTermLeaseHouseholdCount": 0,
    "etcLeaseHouseholdCount": 0,
    "highFloor": 14,
    "lowFloor": 5,
    "useApproveYmd": "19931013",
    "totalDongCount": 1,
    "maxSupplyArea": 71.15,
    "minSupplyArea": 71.15,
    "dealCount": 9,
    "rentCount": 1,
    "leaseCount": 3,
    "shortTermRentCount": 0,
    "isBookmarked": false,
    "batlRatio": "282",
    "btlRatio": "26",
    "parkingPossibleCount": 30,
    "parkingCountByHousehold": 0.33,
    "constructionCompanyName": "(주)유화주택건설",
    "heatMethodTypeCode": "HT001",
    "heatFuelTypeCode": "HF007",
    "pyoengNames": "71",
    "managementOfficeTelNo": "033-653-9687",
    "address": "강원도 강릉시 초당동",
    "roadAddressPrefix": "강원도 강릉시",
    "roadZipCode": "25469"
})
watch(props.receivedKeyword, (keyword) => {
  console.log(props.receivedKeyword.key)
  keyword.value = props.receivedKeyword.key
  const latlng = new kakao.maps.LatLng(keyword.value.centerLat, keyword.value.centerLon)
  moveLatLng(latlng, 3)
  getComplexes()
})
watch(selectedMarker, (newVal) => {
  console.log(newVal)
  moveLatLng(newVal.latlng, 1)
  getDetail(newVal.complexNo)

})

const selectedComplex = (payload) => {
  console.log(payload.item)
  selectedMarker.value = payload.item
}
const initMap = () => {
  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 4,
    maxLevel: 6
  }

  map = new kakao.maps.Map(container, options)
  
  geocoder = new kakao.maps.services.Geocoder()
  kakao.maps.event.addListener(map, 'idle', () => {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo)
    getComplexes()
    addClusterMarkers()
  })

  // 마커 클러스터러를 생성합니다 
  clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        minLevel: 2// 클러스터 할 최소 지도 레벨 
    });
}

const addClusterMarkers = () => {
  items.value.map((item) => {
    console.log(item)
    clusterer.addMarkers(item.latlng)
  })
}
const searchAddrFromCoords = (coords, callback) => {
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
}
const displayCenterInfo = (result, status) => {
  if (status === kakao.maps.services.Status.OK) {
    for (var i = 0; i < result.length; i++) {
      // 행정동의 region_type 값은 'H' 이므로
      if (result[i].region_type === 'H') {
        console.log(result[i].address_name)
        break
      }
    }
  }
}
const moveLatLng = (data, level) => {
  map.setCenter(data)
  map.setLevel(level);
}
const getComplexes = () => {
  console.log(map.getBounds())
  complexAPI.getComplexes(
    map.getBounds(),
    (data) => {
      const processsed = data.data.map((complexes) => ({
        ...complexes,
        latlng: new kakao.maps.LatLng(complexes.latitude, complexes.longitude)
      }))
      console.log(data.data)
      items.value = processsed
      addMarkers()
    },
    () => {}
  )
}
const getDetail = (complexNo) => {
  complexAPI.getDetail(
    complexNo,
    (data) => {
      console.log(data)
      detail.value = data.data
    },
    () => {}
  )
}
const addMarkers = () => {
  clusterer.clear()
  const overlays = items.value.map((data) => {
    const position = data.latlng
    const hgroup = document.createElement("hgroup")
    hgroup.className ='speech-bubble'
    const content = `
      <p class='overlay-h2'>${data.complexName}</p>
      <p class='overlay-p'>${data.cortarAddress}</p>
    `
    hgroup.innerHTML = content
    hgroup.addEventListener('click', () => {
      console.log(data)
      selectedMarker.value = data
    })
    
    return new kakao.maps.CustomOverlay({
        position : position, 
        content : hgroup,
    });
  })
  clusterer.addMarkers(overlays)
}

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap()
  } else {
    const script = document.createElement('script')
    /* global kakao */
    script.onload = () => kakao.maps.load(initMap)
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b0350300fd8a48810b080f1c100cf33b&libraries=services,clusterer'
    document.head.appendChild(script)
  }
})

const items = ref([])
</script>
<template>
  <div class="map-wrap">
    <v-row>
      <v-col class="map-items">
        <RealEstateListItem :data="items" @selectedComplex="selectedComplex"/>
      </v-col>
      <div id="map"></div>
    </v-row>
    
    <!-- <v-container v-if="keyword != ''" class="mt-12"> -->
      <RealEstateDetail :data="detail" />
      <!-- <v-row>
        <progress-card
          :progressVal="50"
          :width="500"
          :height="200"
          :title="keyword + ' 지역의 투자상황'"
        >
        </progress-card>
        <v-spacer></v-spacer>
        <v-card class="analyze-card" elevation="2" outlined>
          <v-card-title>{{ keyword }} 지역의 투자상황을 분석해봤어요</v-card-title>
          <ul>
            <li>최근에 사건사고가 많이 있네요</li>
            <li>밥집이 많이 생겼어요</li>
            <li>치킨집이 생겼네요</li>
          </ul>
          <v-card-subtitle>김박차는 해당 지역의 투자를 추천해요.</v-card-subtitle>
        </v-card>
      </v-row>
      <news-list-with-thumbnail></news-list-with-thumbnail> -->
    <!-- </v-container> -->
  </div>
</template>

<style scoped>
#map {
  position: relative;
  width: 100%;
  height: 600px;
}
.map-wrap {
  position: relative;
  z-index: 100;
  width: 100%;
  margin-bottom: 200px;
}
.v-col {
  position: absolute;
  width: 400px;
  height: 600px;
  z-index: 100;
  box-sizing: border-box;
  background: white;
  overflow-y: auto;
}
.analyze-card {
  padding: 20px;
  border-radius: 25px;
}
.v-sheet.v-card {
  padding: 20px;
  border-radius: 25px;
} 
:deep() .speech-bubble {
	position: relative;
	background: #7ae9ff;
	border-radius: 75px;
  padding: 5px 15px 5px 15px;
}

:deep() .speech-bubble:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 28px solid transparent;
	border-top-color: #7ae9ff;
	border-bottom: 0;
	border-right: 0;
	margin-left: -14px;
	margin-bottom: -28px;
}
:deep() .overlay-h2 {
  font-weight: bold;
  color: white;
}
:deep() .overlay-p {
  color: white;
}
</style>

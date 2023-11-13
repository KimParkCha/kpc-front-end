<script setup>
import { ref, onMounted, watch } from 'vue'
import RealEstateListItem from './RealEstateListItem.vue'
import complexAPI from '@/api/realEstate'
const props = defineProps(['receivedKeyword'])
let map = null
let clusterer = null
let geocoder = null

const keyword = ref('')
const selectedMarker = ref(null)
watch(props.receivedKeyword, (keyword) => {
  console.log(props.receivedKeyword.key)
  keyword.value = props.receivedKeyword.key
  panTo(props.receivedKeyword.key)
  getComplexes()
})
watch(selectedMarker, (newVal) => {
  const selectedLatLng = newVal.getPosition()
  map.panTo(newVal.getPosition())
  console.log(selectedLatLng)
})
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
const panTo = (data) => {
  const moveLatLon = new kakao.maps.LatLng(data.centerLat, data.centerLon)
  map.panTo(moveLatLon)
  map.setLevel(3);
}
const getComplexes = () => {
  // console.log(map.getBounds())
  complexAPI.getComplexes(
    map.getBounds(),
    (data) => {
      const processsed = data.data.map((complexes) => ({
        ...complexes,
        latlng: new kakao.maps.LatLng(complexes.latitude, complexes.longitude)
      }))
      items.value = processsed
      addMarkers()
    },
    () => {}
  )
}
const addMarkers = () => {
  const overlays = items.value.map((data) => {
    const position = data.latlng
    const hgroup = document.createElement("hgroup")
    hgroup.className ='speech-bubble'
    const content = `
      <p>${data.complexName}</p>
      <p>${data.cortarAddress}</p>
    `
    hgroup.innerHTML = content
    hgroup.addEventListener('click', () => {
      map.panTo(positon)
    })
    

    return new overlay = new kakao.maps.CustomOverlay({
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
        <RealEstateListItem :data="items" />
      </v-col>
      <div id="map"></div>
    </v-row>
    

    <v-container v-if="keyword != ''" class="mt-12">
      <v-row>
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
      <news-list-with-thumbnail></news-list-with-thumbnail>
    </v-container>
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
</style>

<script setup>
import { ref, onMounted, watch } from 'vue'
import RealEstateListItem from './RealEstateListItem.vue'
import complexAPI from '@/api/realEstate'
import TabTest from './TabTest.vue'
import '@/assets/three-dots.css'
import '@/assets/snack.css'

const props = defineProps(['receivedKeyword'])
let map = null
let clusterer = null
let geocoder = null

const keyword = ref('')
const selectedMarker = ref(null)
const selectedNo = ref(null)
const items = ref([])

const loadingIcon = ref('./src/assets/ripple.gif')

const loading = ref(false)
function getImageUrl() {
  return new URL(`/../assets/house1.png`, import.meta.url).href
}
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
  selectedNo.value = newVal.complexNo

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
    loading.value = true
    searchAddrFromCoords(map.getCenter(), displayCenterInfo)
    getComplexes()
    addClusterMarkers()
  })

  // 마커 클러스터러를 생성합니다
  clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 2 // 클러스터 할 최소 지도 레벨
  })
}

const addClusterMarkers = () => {
  items.value.map((item) => {
    clusterer.addMarkers(item.latlng)
  })
}
const searchAddrFromCoords = (coords, callback) => {
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
}
const displayCenterInfo = (result, status) => {

}
const moveLatLng = (data, level) => {
  map.setCenter(data)
  map.setLevel(level)
}
const getComplexes = () => {
  complexAPI.getComplexCoords(
    map.getBounds(),
    (data) => {
      const processsed = data.data.map((complexes) => ({
        ...complexes,
        latlng: new kakao.maps.LatLng(complexes.latitude, complexes.longitude)
      }))
      items.value = processsed
      addMarkers()
      loading.value = false
    },
    () => {}
  )
}

const addMarkers = () => {
  const src = './src/assets/house2.png'
  const icon = new kakao.maps.MarkerImage(
    src,
    new kakao.maps.Size(31, 35),
    {
        offset: new kakao.maps.Point(16, 34),
        shape: "poly",
        coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
    }
);
  clusterer.clear()
  const overlays = items.value.map((data) => {
    const position = data.latlng
    const marker = new kakao.maps.Marker({
      position: position,
      image: icon
    })

    kakao.maps.event.addListener(marker, 'click', function() {
      console.log(data)
      selectedMarker.value = data
    });

    return marker;
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

</script>
<template>
  <div class="map-wrap">
    <v-row>
      <v-col class="map-items">
        <RealEstateListItem :data="items" @selectedComplex="selectedComplex" />
      </v-col>
      <div id="map">
        <div class="stage" v-if="loading">
          <img :src="loadingIcon" width="64" height="64">  
        </div>
      </div>
    </v-row>

    <TabTest :complex-no="selectedNo"></TabTest>
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
.v-row {
  display: flex;
  flex-direction: row;
}
.analyze-card {
  padding: 20px;
  border-radius: 25px;
}
.v-sheet.v-card {
  padding: 20px;
  border-radius: 25px;
}
.stage {
  width: 100%;
  height: 100%;
  z-index: 150;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  margin-left: 128px;
  margin-bottom: 256px;
}

</style>

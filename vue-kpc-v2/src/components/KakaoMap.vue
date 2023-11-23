<script setup>
import { ref, onMounted, watch } from 'vue'
import RealEstateListItem from './RealEstateListItem.vue'
import complexAPI from '@/api/realEstate'
import TabTest from './TabTest.vue'
// import '@/assets/three-dots.css'
// import '@/assets/snack.css'

const props = defineProps(['receivedKeyword'])
let map = null
let clusterer = null
let geocoder = null
let ps = null
let placeOverlay = null
let currCategory = ''
let markers = []
const contentNode = document.createElement('div')

const keyword = ref('')
const selectedMarker = ref(null)
const selectedNo = ref(null)
const cortarNo = ref(null)
const items = ref([])
const loadingIcon = ref('./src/assets/ripple.gif')
const loading = ref(false)
const tab = ref('')
const toBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const closeDetail = () => {
  tab.value = 'one'
}

watch(props.receivedKeyword, (keyword) => {
  console.log(props.receivedKeyword.key)
  keyword.value = props.receivedKeyword.key
  const latlng = new kakao.maps.LatLng(keyword.value.centerLat, keyword.value.centerLon)
  moveLatLng(latlng, 3)
  getComplexes()
})

watch(selectedMarker, (newVal) => {
  if (newVal != null) {
    console.log(newVal)
    moveLatLng(newVal.latlng, 1)
    selectedNo.value = newVal.complexNo
    cortarNo.value = newVal.cortarNo
    // toBottom()
  }
})

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

const initMap = () => {
  const container = document.getElementById('map')
  const options = {
    center: new kakao.maps.LatLng(37.50120980488759, 127.03585281505912),
    level: 4,
    maxLevel: 6
  }
  map = new kakao.maps.Map(container, options)

  geocoder = new kakao.maps.services.Geocoder()
  getComplexes()
  kakao.maps.event.addListener(map, 'idle', () => {
    loading.value = true
    searchAddrFromCoords(map.getCenter(), displayCenterInfo)
    console.log(map.getCenter())
    getComplexes()
    addClusterMarkers()
  })
  // 마커 클러스터러를 생성합니다
  clusterer = new kakao.maps.MarkerClusterer({
    map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
    averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
    minLevel: 2 // 클러스터 할 최소 지도 레벨
  })

  // set placeOverlay
  contentNode.className = 'placeinfo_wrap'
  ps = new kakao.maps.services.Places(map)

  // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
  ;(placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 })),
    contentNode, // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
    markers, // 마커를 담을 배열입니다
    currCategory // 현재 선택된 카테고리를 가지고 있을 변수입니다

  placeOverlay.setContent(contentNode)

  addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap)
  addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap)
}
const displayCenterInfo = () => {}
const moveLatLng = (data, level) => {
  map.setCenter(data)
  map.setLevel(level)
}

const selectedComplex = (payload) => {
  console.log(payload.item)
  selectedMarker.value = payload.item
  tab.value = 'two'
}

const addClusterMarkers = () => {
  items.value.map((item) => {
    clusterer.addMarkers(item.latlng)
  })
}

const searchAddrFromCoords = (coords, callback) => {
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
}

const addHouseMarkers = () => {
  const src = './src/assets/house2.png'
  const icon = new kakao.maps.MarkerImage(src, new kakao.maps.Size(31, 35), {
    offset: new kakao.maps.Point(16, 34),
    shape: 'poly',
    coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33'
  })
  clusterer.clear()
  const overlays = items.value.map((data) => {
    const position = data.latlng
    const marker = new kakao.maps.Marker({
      position: position,
      image: icon
    })

    kakao.maps.event.addListener(marker, 'click', function () {
      console.log(data)
      selectedMarker.value = data
    })

    return marker
  })
  clusterer.addMarkers(overlays)
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
      addHouseMarkers()
      loading.value = false
    },
    () => {}
  )
}
// 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
const addEventHandle = (target, type, callback) => {
  if (target.addEventListener) {
    target.addEventListener(type, callback)
  } else {
    target.attachEvent('on' + type, callback)
  }
}

// 카테고리 검색을 요청하는 함수입니다
const searchPlaces = () => {
  if (!currCategory) {
    return
  }

  // 커스텀 오버레이를 숨깁니다
  placeOverlay.setMap(null)

  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker()

  ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true })
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
const placesSearchCB = (data, status, pagination) => {
  if (status === kakao.maps.services.Status.OK) {
    // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
    displayPlaces(data)
  } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
  } else if (status === kakao.maps.services.Status.ERROR) {
    // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
  }
}

// 지도에 마커를 표출하는 함수입니다
const displayPlaces = (places) => {
  // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
  // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
  var order = document.getElementById(currCategory).getAttribute('data-order')

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order)

    // 마커와 검색결과 항목을 클릭 했을 때
    // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
    ;(function (marker, place) {
      kakao.maps.event.addListener(marker, 'click', function () {
        displayPlaceInfo(place)
      })
    })(marker, places[i])
  }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
const addMarker = (position, order) => {
  var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage
    })

  marker.setMap(map) // 지도 위에 마커를 표출합니다
  markers.push(marker) // 배열에 생성된 마커를 추가합니다

  return marker
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
const removeMarker = () => {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  markers = []
}

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
const displayPlaceInfo = (place) => {
  var content =
    '<div class="placeinfo">' +
    '   <a class="title" href="' +
    place.place_url +
    '" target="_blank" title="' +
    place.place_name +
    '">' +
    place.place_name +
    '</a>'

  if (place.road_address_name) {
    content +=
      '    <span title="' +
      place.road_address_name +
      '">' +
      place.road_address_name +
      '</span>' +
      '  <span class="jibun" title="' +
      place.address_name +
      '">(지번 : ' +
      place.address_name +
      ')</span>'
  } else {
    content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>'
  }

  content +=
    '    <span class="tel">' + place.phone + '</span>' + '</div>' + '<div class="after"></div>'

  contentNode.innerHTML = content
  placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x))
  placeOverlay.setMap(map)
}

// 카테고리를 클릭했을 때 호출되는 함수입니다
const onClickCategory = (e) => {
  placeOverlay.setMap(null)

  if (e.srcElement.localName === 'span') {
    console.log(e.target.parentElement)
    e = e.target.parentElement
  }
  if (e.srcElement.className === 'on') {
    currCategory = ''
    changeCategoryClass()
    removeMarker()
  } else {
    currCategory = e.target.id
    changeCategoryClass(e.srcElement)
    searchPlaces()
  }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
const changeCategoryClass = (el) => {
  var category = document.getElementById('category'),
    children = category.children,
    i

  for (i = 0; i < children.length; i++) {
    children[i].className = ''
  }

  if (el) {
    el.className = 'on'
  }
}
</script>
<template>
  <div class="map-wrap">
    <v-row>
      <v-col class="map-items">
        <v-window v-model="tab">
          <v-window-item value="one"
            ><RealEstateListItem :data="items" @selectedComplex="selectedComplex" />
          </v-window-item>
          <v-window-item value="two">
            <TabTest
              class="map-detail-items"
              :complex-no="selectedNo"
              :cortar-no="cortarNo"
              @closeDetail="closeDetail"
            ></TabTest>
          </v-window-item>
        </v-window>
      </v-col>
      <div id="map">
        <div class="stage" v-if="loading">
          <img :src="loadingIcon" width="64" height="64" />
        </div>
      </div>
      <ul id="category">
        <li id="BK9" data-order="0" @click="onClickCategory($event)" class="">
          <span class="category_bg bank"></span>
          은행
        </li>
        <li id="MT1" data-order="1" @click="onClickCategory($event)" class="">
          <span class="category_bg mart"></span>
          마트
        </li>
        <li id="PM9" data-order="2" @click="onClickCategory($event)" class="">
          <span class="category_bg pharmacy"></span>
          약국
        </li>
        <li id="OL7" data-order="3" @click="onClickCategory($event)" class="">
          <span class="category_bg oil"></span>
          주유소
        </li>
        <li id="CE7" data-order="4" @click="onClickCategory($event)" class="">
          <span class="category_bg cafe"></span>
          카페
        </li>
        <li id="CS2" data-order="5" @click="onClickCategory($event)" class="">
          <span class="category_bg store"></span>
          편의점
        </li>
      </ul>
    </v-row>
  </div>
</template>

<style scoped>
#map {
  position: relative;
  width: 100%;
  height: 630px;
}
.map-wrap {
  position: relative;
  z-index: 100;
  width: 100%;
}
.map-items {
  position: absolute;
  width: 500px;
  height: 630px;
  z-index: 100;
  box-sizing: border-box;
  background: white;
  overflow-y: auto;
}
.map-detail-items {
  position: absolute;
  width: 100%;
  height: 100%;
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
#category {
  position: absolute;
  top: 10px;
  left: 500px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
  pointer-events: none;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
</style>

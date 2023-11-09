<script setup>
import { ref, reactive, onMounted, watch } from 'vue'; 
import RealEstateListItem from './RealEstateListItem.vue';
const props = defineProps({ receivedKeyword: Object })
let map = null
let ps = null
let geocoder = null
let infowindow = null

const keyword = ref("")

watch(props.receivedKeyword, () => {
    console.log(props.receivedKeyword)
    keyword.value = props.receivedKeyword.value
})
const initMap = () => {
    const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      map = new kakao.maps.Map(container, options);
      ps = new kakao.maps.services.Places();
      geocoder = new kakao.maps.services.Geocoder();
      console.log(map.getBounds());
      console.log(map.getCenter());
      kakao.maps.event.addListener(map, "idle", () => {
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);
        console.log(map.getBounds());
      });
}

const searchAddrFromCoords = (coords, callback) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
}
const displayCenterInfo = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            console.log(result[i].address_name);
            break;
          }
        }
      }
}
onMounted(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=b0350300fd8a48810b080f1c100cf33b&libraries=services";
      document.head.appendChild(script);
    }
})

const items = reactive([
        { header: "30개의 부동산 매물이 있습니다." },
        {
          src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "제주첨단과학단지 꿈에그린2차 아파트",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "JDC 제주첨단 리슈빌아파트",
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "JDC 제주첨단 행복주택 아파트",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "제주의료원",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "제주대학교 아라캠퍼스",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
        { divider: true, inset: true },
        {
          src: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "제주첨단과학단지 꿈에그린2차 아파트",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "JDC 제주첨단 리슈빌아파트",
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "JDC 제주첨단 행복주택 아파트",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "제주의료원",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "제주대학교 아라캠퍼스",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        }
])

</script>
<template>
<div class="map-wrap">
    <div class="map-panel">
      <RealEstateListItem :data="items"/>
      <!-- <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

          <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list> -->
    </div>
    <div id="map"></div>

    <v-container v-if="keyword != ''" class="mt-12">
      <v-row>
        <progress-card :progressVal="50" :width="500" :height="200" :title="keyword + ' 지역의 투자상황'">
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
.div {
  display: block;
}
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
.map-panel {
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
</style>
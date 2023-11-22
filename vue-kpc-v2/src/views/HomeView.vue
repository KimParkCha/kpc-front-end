<script setup>
import ParallaxBanner from '../components/ParallaxBanner.vue'
import KakaoMap from '../components/KakaoMap.vue'
import KakaoMapView from '../components/KakaoMapView.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import FloatingButton from '../components/FloatingButton.vue'
import NewsView from '../components/NewsView.vue'
import ToggleAppBar from '../components/ToggleAppBar.vue'

const topTitle = ref({
  isActive: false,
  title: '매번 직접 분석해야했던 부동산 정보',
  body: '이제 김박차에서 쉽고, 빠르고, 간편하게 확인하세요.'
})
const bottomTitle = ref({
  isActive: false,
  title: '지금바로 김박차를 사용해보세요.'
})
const posts = ref([
  {
    isActive: false,
    title: '원하는 매물 정보를 김박차에서 검색하세요!',
    body: '매물 정보를 검색 및 지도 이동을 통해 확인할 수 있어요.',
    img: 'https://imagescdn.gettyimagesbank.com/500/202203/jv12563551.jpg'
  },
  {
    isActive: false,
    title: '해당 매물 및 지역의 투자 상황 분석정보를<br> 김박차 AI를 통해 확인하세요!',
    body: '김박차 AI가 해당 매물 및 지역의 투자 정보를 분석하여 투자의 방향성에 도움을 받아보세요.',
    img: 'https://imagescdn.gettyimagesbank.com/500/202203/jv12563550.jpg'
  },
  {
    isActive: false,
    title: '해당 매물 및 지역의 실거래가를 확인하고<br> 상하향 추세를 확인하세요!',
    body: '가격 변동사항을 확인할 수 있어요',
    img: 'https://imagescdn.gettyimagesbank.com/500/202203/jv12563554.jpg'
  }
])
const drawer = ref(null)
</script>

<template>
  <!-- <ToggleAppBar></ToggleAppBar> -->

  <ParallaxBanner />
  <FloatingButton />

  <v-sheet
    class="d-flex flex-column justify-center align-center fill-height"
    color="transparent"
    min-height="500"
  >
    <v-lazy v-model="topTitle.isActive">
      <v-card-text class="ma-0 pa-3">
        <v-row>
          <v-col class="d-flex flex-column justify-center align-center fade-view">
            <h1 class="title" v-html="topTitle.title"></h1>
            <br /><br />
            <h1 class="" v-html="topTitle.body"></h1>
          </v-col>
        </v-row>
      </v-card-text>
    </v-lazy>
  </v-sheet>
  <v-col class="ma-0 pa-0" v-for="(post, index) in posts" :key="index">
    <v-sheet class="fill-height" color="transparent">
      <v-lazy
        v-if="index % 2 === 0"
        color=""
        v-model="post.isActive"
        :options="{
          threshold: 0.5
        }"
        class="fill-height"
      >
        <v-card-text class="ma-16 pa-16">
          <v-row align="center" :key="index" justify="center">
            <v-col>
              <v-img :src="post.img" max-width="600" max-height="600" class="rounded-circle" />
            </v-col>

            <v-col mx-auto>
              <h1 v-html="post.title"></h1>
              <br />
              <h4 v-html="post.body"></h4>
            </v-col>
          </v-row>
        </v-card-text>
      </v-lazy>
      <v-lazy
        v-else
        v-model="post.isActive"
        :options="{
          threshold: 0.5
        }"
        class="fill-height"
      >
        <v-card-text class="ma-16 pa-16">
          <v-row align="center" :key="index" justify="center">
            <v-col mx-auto>
              <h1 v-html="post.title"></h1>
              <br />
              <h4 v-html="post.body"></h4>
            </v-col>

            <v-col>
              <v-img :src="post.img" max-width="600" max-height="600" class="rounded-circle" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-lazy>
    </v-sheet>
  </v-col>
  <v-sheet
    class="d-flex flex-column justify-center align-center fill-height"
    color="transparent"
    min-height="500"
  >
    <v-lazy v-model="bottomTitle.isActive" :options="{ threshold: 0.5 }">
      <v-card-text class="ma-0 pa-3">
        <v-row class="fade-in-box">
          <v-col class="d-flex flex-column justify-center align-center fade-view">
            <h1 class="title" v-html="bottomTitle.title"></h1>
            <br />
            <RouterLink to="/map"><v-btn rounded="xl" size="x-large">시작하기</v-btn></RouterLink>
          </v-col>
        </v-row>
      </v-card-text>
    </v-lazy>
  </v-sheet>
  <!-- <KakaoMapView /> -->
</template>
<style scoped>
.v-navigation-drawer {
  z-index: 999999;
}

.fade-view {
  animation: fadein 1s;
  -moz-animation: fadein 1s; /* Firefox */
  -webkit-animation: fadein 1s; /* Safari and Chrome */
  -o-animation: fadein 1s; /* Opera */
}
</style>

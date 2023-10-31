<template>
  <v-container fluid class="text-center ma-0 pa-0">
    <parallax-banner />
    <v-container fluid class="ma-6">
      <v-row>
        <progress-card title="오늘 온도 봐보자" progressVal="70" />
        <news-list-card></news-list-card>
      </v-row>
    </v-container>

    <kakao-map-wrapper></kakao-map-wrapper>
  </v-container>
</template>
<script>
import KakaoMapWrapper from '../components/KakaoMapWrapper.vue'
import NewsListCard from '../components/NewsListCard.vue'
import ParallaxBanner from '../components/ParallaxBanner.vue'
import ProgressCard from '../components/ProgressCard.vue'

export default {
  name: 'ComponentHome',
  components: {
    NewsListCard,
    ProgressCard,
    KakaoMapWrapper,
    ParallaxBanner,
  },
}
</script>

<style>
.v-container {
  padding: 10px;
}
</style>

<template>
  <v-container fluid class="text-center ma-0 pa-0">
    <map-header />
    <kakao-map />
  </v-container>
</template>
<script>
import KakaoMap from './KakaoMap.vue'
import MapHeader from './MapHeader.vue'

export default {
  name: 'KakaoMapWrapper',
  components: {
    KakaoMap,
    MapHeader,
  },
}
</script>

<style></style>

<script setup>
import KakaoMap from './KakaoMap.vue'
import KakaoMapHeader from './KakaoMapHeader.vue'
import { ref, reactive } from 'vue'

const keyword = reactive({})
const search = (payload) => {
  keyword.key = payload.value
  console.log(payload.value)
}
</script>
<template>
  <div>
    <KakaoMapHeader @search="search" />
    <KakaoMap :receivedKeyword="keyword" />
  </div>
</template>

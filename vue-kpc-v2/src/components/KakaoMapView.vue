<script setup>
import KakaoMap from './KakaoMap.vue'
import KakaoMapHeader from './KakaoMapHeader.vue'
import { ref, reactive } from 'vue'

const keyword = reactive({})
const search = (payload) => {
  console.log(payload)
  keyword.key = payload
}
</script>
<template>
  <div>
    <KakaoMapHeader @search="search" />
    <KakaoMap :receivedKeyword="keyword" />
  </div>
</template>

<script setup>
import KakaoMap from './KakaoMap.vue'
import KakaoMapHeader from './KakaoMapHeader.vue'
import { ref, reactive } from 'vue'

const keyword = reactive({})
const showState = ref(true)
const src = ref('./src/assets/house2.png')
const search = (payload) => {
  console.log(payload)
  keyword.key = payload
}
const show = (payload) => {
  console.log(payload.value)
  showState.value = payload.value
}
</script>
<template>
  <div>
    <KakaoMapHeader @search="search" @show="show"/>
    <KakaoMap :receivedKeyword="keyword" v-if="showState" />
    <div class="not-supported" v-else>
      <img :src="src" width="96" height="96">
      <br>
        <h2>현재 지원하지 않는 기능이에요...</h2>
    </div>
  </div>
</template>
<style scoped>
.not-supported {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 700px;
  position: relative;
  z-index: 100;
  width: 100%;
  margin-bottom: 200px;
}
</style>

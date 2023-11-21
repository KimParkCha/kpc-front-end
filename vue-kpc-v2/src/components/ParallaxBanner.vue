<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const fname = ref('banner')

function getImageUrl(name) {
  return new URL(`/src/assets/${name}.jpg`, import.meta.url).href
}
</script>

<template>
  <v-parallax :src="getImageUrl(fname)" height="700">
    <v-row rows="12" align="center" justify="center" style="height: 100%">
      <v-col cols="7" align="left">
        <h1 class="text-h2 font-weight-bold mb-4">
          오늘의 부동산 분석 정보를 <br /><br />김박차에서 확인하세요.
        </h1>
      </v-col>
      <v-col cols="5" class="mx-auto">
        <RouterLink to="/map"> <v-btn size="x-large" rounded="xl">시작하기</v-btn></RouterLink>
      </v-col>
    </v-row>
  </v-parallax>
</template>
<style scoped>
.text-h2 {
  margin-left: 30px;
  color: white;
}
</style>

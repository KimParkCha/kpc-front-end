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
        <h1 class="mb-4">오늘의 부동산 분석 정보를 <br /><br />김박차에서 확인하세요.</h1>
      </v-col>
    </v-row>
  </v-parallax>
</template>
<style scoped></style>

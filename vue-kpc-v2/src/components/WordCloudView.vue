<script setup>
import WordCloud from 'wordcloud'
import { onMounted } from 'vue'
import wordcloudApi from '../api/wordcloud.js'

const wordcloudCall = () => {
  const canvas = document.getElementById('wordcloud')
  wordcloudApi.getWordCloud(
    (result) => {
      console.log(result)
      const data = result.data

      WordCloud(canvas, {
    list: data,
    gridSize: 50,
    weightFactor: 3,
    fontFamily: 'Noto Sans KR',
    rotateRatio: 0,
    shape: 'square',
    color: (word, weight) => {
      if (weight > 80) {
        return '#1565c0'
      } else if (weight > 50) {
        return '#42a5f5'
      } else {
        return '#bbdefb'
      }
    }
  })
  console.log("끝")
    },
    () => {
      console.log('error')
    }
  )
}

onMounted(() => {
  wordcloudCall()
})
</script>
<template>
  <canvas id="wordcloud" width="1280" height="720"></canvas>
</template>
<style scoped></style>

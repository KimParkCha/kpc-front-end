<script setup>
import WordCloud from 'wordcloud'
import { onMounted } from 'vue'
const data = [
  ['Document Object Model', 12],
  ['<audio>', 12],
  ['<video>', 12],
  ['Web Technologies', 26],
  ['HTML', 20],
  ['<canvas>', 20],
  ['CSS', 15],
  ['JavaScript', 15],
  ['Web Workers', 12],
  ['Geolocation', 9],
  ['setTimeout', 7],
  ['CORS', 5]
]
const wordList = [
  ['고기', 8],
  ['가족', 7],
  ['낫', 6],
  ['쥐', 6],
  ['캣', 6],
  ['스마트폰', 6],
  ['고양이', 5],
  ['강아지', 5],
  ['반가워', 3],
  ['와이파이', 3]
]

onMounted(() => {
  const canvas = document.getElementById('wordcloud')

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
})
</script>
<template>
  <canvas id="wordcloud" width="1280" height="720"></canvas>
</template>
<style scoped></style>

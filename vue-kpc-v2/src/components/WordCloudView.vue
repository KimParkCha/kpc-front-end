<script setup>
import WordCloud from 'wordcloud'
import { onMounted } from 'vue'
import wordcloudApi from '../api/wordcloud.js'
const data = [
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

const wordcloudCall = () => {
  wordcloudApi.getWordCloud(
    (result) => {
      console.log(result)
      data.values = result.data
      WordCloud(canvas, {
    list: data.values[0],
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
      
    },
    () => {
      console.log('error')
    }
  )
}

onMounted(() => {
  const canvas = document.getElementById('wordcloud')
  wordcloudCall()
})
</script>
<template>
  <canvas id="wordcloud" width="1280" height="720"></canvas>
</template>
<style scoped></style>

<script setup>
import WordCloud from 'wordcloud'
import { onMounted } from 'vue'
import wordcloudApi from '../api/wordcloud.js'
const data = []
const wordList = [
  ['고기2', 8],
  ['가족2', 7],
  ['낫2', 6],
  ['쥐2', 6],
  ['캣2', 6],
  ['스마2트폰', 6],
  ['고2양이', 5],
  ['강아3지', 5],
  ['반가3워', 3],
  ['와이1파이', 3],
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
    list: wordList,
    gridSize: 50,
    weightFactor: function (size) {
      return (Math.pow(size, 2.3) * 300) / 500
    },
    fontFamily: 'dohyeon',
    color: function (word, weight) {
      return weight === 12 ? '#f02222' : '#c09292'
    },
    rotateRatio: 0.5,
    rotationSteps: 2,
    backgroundColor: '#ffe0e0'
  })
})
</script>
<template>
  <canvas id="wordcloud" width="500" height="400"></canvas>
</template>
<style scoped></style>

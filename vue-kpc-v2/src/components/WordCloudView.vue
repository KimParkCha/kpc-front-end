<script setup>
import WordCloud from 'wordcloud'
import { onMounted } from 'vue'
import wordcloudApi from '../api/wordcloud.js'
const wordList = [
  ['고기2', 15],
  ['가족2', 12],
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
const getWordCloud = () => {
  wordcloudApi.getWordCloud(
    (result) => {
      const canvas = document.getElementById('wordcloud')
      WordCloud(canvas, {
        list: result.data,
        gridSize: 15,
        weightFactor: function (size) {
          return (Math.pow(size, 2.3) * 300) / 400
        },
        fontFamily: 'dohyeon',
        color: function (word, weight) {
          console.log(weight)
          return weight >= 7 ? 'rgb(255, 48, 48)' : 'rgb(99, 122, 255)'
        },
        rotateRatio: 0.8,
        rotationSteps: 10,
        backgroundColor: 'rgb(255, 255, 255)'
      })
    },
    () => {
      console.log('failed to get wordCloud')
    }
  )
}

onMounted(() => {
  getWordCloud()
})
</script>
<template>
  <v-card elevated hover class="rounded-xl ma-6 pa-6">
    <canvas id="wordcloud" width="400" height="400"></canvas>
  </v-card>
</template>
<style scoped>
a {
  background-color: rgb(99, 122, 255));
}
</style>

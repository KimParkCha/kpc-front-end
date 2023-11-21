<script setup>
import { ref, watch } from 'vue'
import newsApi from '../api/news.js'

const props = defineProps(['cityCode', 'dsvnCode'])

console.log(props.cityCode)
console.log(props.dsvnCode)

const news = ref()

watch(props, (receivedData) => {
  console.log(receivedData)
  console.log(props.cityCode)
  console.log(props.dsvnCode)
  newsCall(props.cityCode, props.dsvnCode)
  // show.value = true
})

const newsCall = (cityCode, dsvnCode) => {
  console.log('realprice call')
  newsApi.getNewsList(
    cityCode,
    dsvnCode,
    (data) => {
      console.log('뉴스가져와')
      console.log(data.data)
      news.value = data.data
    },
    () => {
      console.log('error')
    }
  )
}

// newsCall(props.cityCode, props.dsvnCode)
// houseAPI.get(`/localnews/cityCode${cityCode}/dsvnCode${dsvnCode}`).then(success).catch(fail)
</script>

<template>
  <v-container>
    <div><h2>뉴스 정보</h2></div>
    <v-row align="center" justify="center">
      <v-col v-for="(newsinfo, i) in news" :key="i" cols="auto">
        <v-card
          v-if="i < 6"
          class="mx-auto my-8"
          max-width="500"
          :title="newsinfo.title"
          :href="newsinfo.link"
          target="_blank"
          rel="noopener"
        >
          <v-card-subtitle class="subtitle">{{ newsinfo.joinDate }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  background-color: #fff;
  height: 100px;
  padding: 30px;
}

.subtitle {
  text-align: right;
}
</style>

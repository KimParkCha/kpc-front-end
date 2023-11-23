<script setup>
import { ref, watch } from 'vue'
import newsApi from '../api/news.js'

const props = defineProps(['cityCode', 'dsvnCode'])

console.log(props.cityCode)
console.log(props.dsvnCode)

const news = ref()
const show = ref(false)
const datashow = ref(false)

watch(props, (receivedData) => {
  console.log('watchNews')
  console.log(receivedData)
  console.log('시코드 ' + receivedData.cityCode)
  console.log('도코드 ' + receivedData.dsvnCode)
  newsCall(receivedData.cityCode, receivedData.dsvnCode)
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
      if (data.data == '') {
        console.log('뉴스정보가 없습니다.')
      } else {
        show.value = true
        news.value = data.data
        console.log(news.value)
      }
    },
    () => {
      console.log('error')
    }
  )
}

newsCall(props.cityCode, props.dsvnCode)
</script>

<template>
  <v-container v-show="show">
    <div>
      <h2>뉴스 정보</h2>
      <br />
    </div>
    <v-row align="center" justify="center">
      <v-col v-for="(newsinfo, i) in news" :key="i" cols="8">
        <v-card v-if="i < 8 && newsinfo.title != ''">
          <v-card-title
            ><a :href="newsinfo.link" target="_blank">{{ newsinfo.title }}</a></v-card-title
          >
          <v-card-subtitle class="subtitle">{{ newsinfo.joinDate }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-show="!show"> <h2>뉴스정보가 없습니다.</h2> </v-container>
</template>

<style scoped>
.v-col {
  margin-right: 150px;
}

.v-card {
  background-color: rgb(248, 250, 247);
  color: wheat;
  font-weight: bold;
  width: 400px;
}

.subtitle {
  text-align: right;
  font-size: 17px;
  color: rgb(12, 12, 11);
}

a {
  text-decoration: none;
  color: rgb(99, 90, 73);
  font-family: 'dohyeon';
}
</style>

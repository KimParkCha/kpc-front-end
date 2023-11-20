<script setup>
import { ref, watch } from 'vue'
import realPriceView from './RealPriceView.vue'
import RealEstateDetail from './RealEstateDetail.vue'
import NewsView from './NewsView.vue'

const props = defineProps(['complexNo'])

const tab = ref("")
const complexNo = ref(null)
watch(props, (receivedData) => {
  console.log(receivedData)
  complexNo.value = receivedData
})

const RealPriceDetail = {
  tradeYear: '2021',
  tradeMonth: '12',
  tradeDate: '14',
  formattedPrice: '1억 4000',
  floor: '4'
}
</script>

<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="white">
      <v-tab value="one"><h2>단지 정보</h2></v-tab>
      <v-tab value="two"><h2>실거래가 정보</h2></v-tab>
      <v-tab value="three"><h2>뉴스</h2></v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"> <RealEstateDetail :complex-no="complexNo" /> </v-window-item>

        <v-window-item value="two"> <realPriceView :complex-no="complexNo" /> </v-window-item>

        <v-window-item value="three"> <NewsView :complex-no="complexNo" /> </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>

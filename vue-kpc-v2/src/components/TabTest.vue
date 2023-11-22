<script setup>
import { ref, watch } from 'vue'
import realPriceView from './RealPriceView.vue'
import RealEstateDetail from './RealEstateDetail.vue'
import NewsView from './NewsView.vue'

const props = defineProps(['complexNo', 'cortarNo'])
// const props = defineProps({
//   complexNo: String,
//   cortarNo: String
// })

const tab = ref('')
const complexNo = ref(null)
const cortarNo = ref(null)

const cityCode = ref(null)
const dsvnCode = ref(null)

watch(props, (receivedData) => {
  console.log(receivedData.complexNo)
  console.log(receivedData.cortarNo)
  console.log(receivedData.cortarNo.toString().substring(0, 2))

  complexNo.value = receivedData.complexNo
  cortarNo.value = receivedData.cortarNo
  cityCode.value = receivedData.cortarNo.toString().substring(0, 2) + '00000000'
  dsvnCode.value = receivedData.cortarNo.toString().substring(0, 4) + '00000000'
})

// const code = {
//   // cityCode: '4100000000',
//   // dsvnCode: '4137000000'
//   cityCode: cityCode.value,
//   dsvnCode: dsvnCode.value
// }
</script>

<template>
  <v-card class="ma-12 pa-12">
    <v-tabs v-model="tab" bg-color="white">
      <v-tab value="one"><h3>단지 정보</h3></v-tab>
      <v-tab value="two"><h3>실거래가 정보</h3></v-tab>
      <v-tab value="three"><h3>뉴스</h3></v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"> <RealEstateDetail :complex-no="complexNo" /> </v-window-item>

        <v-window-item value="two"> <realPriceView :complex-no="complexNo" /> </v-window-item>

        <v-window-item value="three">
          <NewsView :city-code="cityCode" :dsvn-code="dsvnCode" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card {
  margin-top: 24px;
}
</style>

<script setup>
import { ref, watch, onMounted } from 'vue'
import RealPriceView from './RealPriceView.vue'
import RealEstateDetail from './RealEstateDetail.vue'
import NewsView from './NewsView.vue'

const props = defineProps(['complexNo', 'cortarNo'])
const emit = defineEmits(['closeDetail'])

const tab = ref('')
const complexNo = ref(null)
const cortarNo = ref(null)

const cityCode = ref(null)
const dsvnCode = ref(null)

watch(props, (receivedData) => {
  console.log(receivedData)
  console.log(receivedData.complexNo)
  console.log(receivedData.cortarNo)
  console.log(receivedData.cortarNo.toString().substring(0, 2))

  complexNo.value = receivedData.complexNo
  cortarNo.value = receivedData.cortarNo
  cityCode.value = receivedData.cortarNo.toString().substring(0, 2) + '00000000'
  dsvnCode.value = receivedData.cortarNo.toString().substring(0, 4) + '000000'
})
const closeDetail = () => {
  emit('closeDetail')
}
</script>

<template>
  <v-row class="align-center justify-center">
    <v-tabs v-model="tab" bg-color="white">
      <v-tab value="one"><h3>단지 정보</h3></v-tab>
      <v-tab value="two"><h3>실거래가 정보</h3></v-tab>
      <v-tab value="three"><h3>뉴스</h3></v-tab>
    </v-tabs>
    <v-spacer> </v-spacer>
    <v-btn width="48" height="48" variant="text" @click="closeDetail"
      ><v-icon size="x-large">mdi-close-circle</v-icon>
    </v-btn>
  </v-row>
  <v-card-text>
    <v-window v-model="tab">
      <v-window-item eager value="one">
        <RealEstateDetail :complex-no="complexNo" />
      </v-window-item>

      <v-window-item eager value="two"> <RealPriceView :complex-no="complexNo" /> </v-window-item>

      <v-window-item eager value="three">
        <NewsView :city-code="cityCode" :dsvn-code="dsvnCode" />
      </v-window-item>
    </v-window>
  </v-card-text>
</template>

<style scoped></style>

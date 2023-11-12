<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import regionAPI from '@/api/realEstate'
const emit = defineEmits(['search'])

const keyword = ref('')
const items = ref([])
const snackbarData = reactive({
  snackbar: false,
  text: '검색어에 해당하는 지역 정보가 존재하지 않습니다.',
  timeout: 2000
})
// watch(keyword, (newKeyword) => {
//   keyword.value = newKeyword
//   console.log(newKeyword)
//   regionAPI.getRegions(
//     keyword.value,
//     (data) => {
//       console.log(data)
//     },
//     () => {}
//   )
//   // if (!userInput.value) {
//   //   return
//   // }
//   // this.fetchEntriesDebounced()
// })

const search = () => {
  console.log(keyword.value.constructor)
  if (keyword.value.constructor == Object) {
    console.log('it is object')
  } else if (keyword.value.constructor == String) {
    console.log('it is String')
  }

  regionAPI.getRegions(
    keyword.value,
    (data) => {
      if (data.data.length == 0) {
        console.log('데이터 없음')
        snackbarData.snackbar = true
      }
      console.log(data)
      items.value = data.data
    },
    () => {}
  )
  emit('search', keyword)
}
</script>

<template>
  <div>
    <v-tabs bg-color="#BBDEFB" fixed-tabs>
      <v-tab>아파트, 오피스텔</v-tab>
      <v-tab>빌라, 주택</v-tab>
      <v-tab>원룸, 투룸</v-tab>
      <v-tab>상가</v-tab>
      <v-tab>내가 찜한 지역</v-tab>
    </v-tabs>
    <v-col class="container" align="center" justify="center">
      <v-row align="center">
        <v-col cols="12" sm="6" md="4" align="center">
          <v-combobox
            v-model="keyword"
            v-on:keyup.enter="search($event)"
            :items="items"
            item-title="cortarName"
            rounded
            theme="light"
            variant="solo"
            return-object
            validate-on="lazy"
            placeholder="원하는 매물을 검색해보세요"
          >
          </v-combobox>
        </v-col>

        <v-chip-group v-model="amenities" column multiple>
          <v-chip large filter outlined> 아파트 </v-chip>
          <v-chip large filter outlined> 아파트 분양권 </v-chip>
          <v-chip large filter outlined> 재건축 </v-chip>
          <v-chip large filter outlined> 오피스텔 </v-chip>
          <v-chip large filter outlined> 오피스텔 분양권 </v-chip>
        </v-chip-group>
      </v-row>
    </v-col>
    <v-snackbar v-model="snackbarData.snackbar" :timeout="snackbarData.timeout">
      {{ snackbarData.text }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbarData.snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style scoped>
.v-tabs {
  margin: 10px;
}
.v-chip-group {
  margin-bottom: 24px;
}
.container {
  background-color: '#BBDEFB';
}
</style>
